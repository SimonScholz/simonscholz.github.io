---
id: "open-api-parsing-normalizing"
path: "/tutorials/open-api-parsing-normalizing"
created: "2026-03-18"
updated: "2026-03-18"
title: "Parsing, normalizing and/or filtering an Open Api specification"
description: "How to parse, normalize and filter Open Api specifications and prepare for Open Api generators."
author: "Simon Scholz"
tags:
  [
    "gradle",
    "openapi",
    "kotlin",
    "openapi generator",
    "fulfillmenttools"
  ]
vgWort: "vg02.met.vgwort.de/na/0bb707fabbaa40f99c0a9ac3c688f762"
---

## Parsing an Open Api Specification

Since Open Api specifications are defined using structured data for example json or yaml, it can easily be parsed.
For the JVM [swagger-parser](https://github.com/swagger-api/swagger-parser) can be used for this purpose.

### Prerequisites

#### Install Kotlin

For the sake of simplicity I want to do kotlin scripting for this purpose.
Kotlin can be installed by using SDKman!: [SDKman! Docs for Kotlin ](https://sdkman.io/sdks/kotlin/)

```bash
sdk install kotlin
```

For plain Java JBANG could also be used for creating a similar script.

#### Install Open Api Generator:

One option is to use the bash launcher script:

```bash
mkdir -p ~/bin/openapitools
curl https://raw.githubusercontent.com/OpenAPITools/openapi-generator/master/bin/utils/openapi-generator-cli.sh > ~/bin/openapitools/openapi-generator-cli
chmod u+x ~/bin/openapitools/openapi-generator-cli
export PATH=$PATH:~/bin/openapitools/
```

Besides of using the bash installation depicted above there are many more options:

https://openapi-generator.tech/docs/installation/

### Sample Open Api specification

Since I´ve been working a lot with [fulfillmentstools](https://fulfillmenttools.com/) recently and they do have a pretty huge and complex Open Api specification, we´ll take this as an example for this tutorial.

https://fulfillmenttools.github.io/fulfillmenttools-api-reference-ui/

The raw Open Api specification can be seen and downloaded here: https://raw.githubusercontent.com/fulfillmenttools/fulfillmenttools-api-reference/master/api.swagger.yaml

At the time of writing this tutorial the Open Api specification consists of 77100 lines of YAML and has 2,5 MB as file size, which is quite a lot.
And will result in a lot more generated code, when trying to generate code from it using the [Open Api Generator](https://openapi-generator.tech/).

### Try to generate code from the fulfillmenttools Open Api Specification

First let´s download the [fulfillmenttools Open Api specification](https://raw.githubusercontent.com/fulfillmenttools/fulfillmenttools-api-reference/master/api.swagger.yaml) and save it to `raw-fft-api.yaml`.

```bash
curl https://raw.githubusercontent.com/fulfillmenttools/fulfillmenttools-api-reference/master/api.swagger.yaml > raw-fft-api.yaml
```

Then run the Open Api Code Generator:

```bash
openapi-generator-cli generate \
    -i fft-api-raw.yaml \
    -g kotlin-spring \
    -o out \
    --additional-properties=library=spring-boot,beanValidations=true,serviceImplementation=true \
    --import-mappings=DateTime=java.time.LocalDateTime \
    --type-mappings=DateTime=java.time.LocalDateTime
```

Now when you try to compile the code or open it in your favorite IDE there might be plenty of errors,
because often not every specification detail can be represented in code.
Sometimes also due to limitations of the target programming language itself, e.g., some inheritance constrains in Java,
often caused by `allOf`, `anyOf` properties inside the Open Api specification.

### Creating the script

Create a file called `OpenApiParsing.main.kts`:

```kotlin[OpenApiParsing.main.kts]
#!/usr/bin/env kotlin

@file:DependsOn("io.swagger.parser.v3:swagger-parser:2.1.39")

import io.swagger.v3.core.util.Yaml
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.Paths
import io.swagger.v3.oas.models.media.Schema
import io.swagger.v3.parser.OpenAPIV3Parser
import io.swagger.v3.parser.core.models.ParseOptions
import io.swagger.v3.parser.core.models.SwaggerParseResult
import java.io.File

// ================= CONFIG =================

val inputFile = "./raw-fft-api.yaml"
val outputFile = "./stripped-fft-api.yaml"

// Only keep these paths (empty = keep all)
val pathsToKeep =
    setOf(
        "/api/orders",
        "/api/orders/{orderId}",
    )

// ===========================================

println("Parsing OpenAPI file: $inputFile")

val options =
    ParseOptions().apply {
        isResolve = true
        isResolveFully = false
        isFlatten = true
    }

val result: SwaggerParseResult = OpenAPIV3Parser().readLocation(inputFile, null, options)

if (result.messages.isNotEmpty()) {
    println("Parser messages:")
    result.messages.forEach { println(" - $it") }
}

var openAPI: OpenAPI = result.openAPI ?: error("Failed to parse OpenAPI spec")

println("Applying OpenAPI Generator normalization...")

// ================= PATH FILTERING =================
if (pathsToKeep.isNotEmpty()) {
    println("Filtering paths...")

    val newPaths = Paths()

    openAPI.paths
        ?.filterKeys { it in pathsToKeep }
        ?.forEach { (path, item) ->
            newPaths.addPathItem(path, item)
        }

    openAPI.paths = newPaths
}

// ================= COLLECT USED SCHEMAS =================

val usedSchemas = mutableSetOf<String>()

fun collectSchema(schema: Schema<*>?) {
    if (schema == null) return

    // Handle $ref
    schema.`$ref`?.let {
        val name = it.substringAfterLast("/")
        if (usedSchemas.add(name)) {
            val refSchema = openAPI.components?.schemas?.get(name)
            collectSchema(refSchema)
        }
        return
    }

    // Properties
    schema.properties?.values?.forEach {
        collectSchema(it as Schema<*>)
    }

    // Array items
    schema.items?.let {
        collectSchema(it)
    }

    // Composed schemas
    schema.allOf?.forEach { collectSchema(it as Schema<*>) }
    schema.oneOf?.forEach { collectSchema(it as Schema<*>) }
    schema.anyOf?.forEach { collectSchema(it as Schema<*>) }

    when (val additional = schema.additionalProperties) {
        is Schema<*> -> collectSchema(additional)
    }

    // Not required but safe: map value schemas
    schema.not?.let { collectSchema(it) }

    schema.discriminator?.mapping?.values?.forEach { ref ->
        val name = ref.substringAfterLast("/")
        if (usedSchemas.add(name)) {
            collectSchema(openAPI.components?.schemas?.get(name))
        }
    }
}

// Traverse paths
openAPI.paths?.values?.forEach { pathItem ->
    pathItem.readOperations().forEach { op ->
        op.requestBody?.content?.values?.forEach {
            collectSchema(it.schema)
        }
        op.responses?.values?.forEach { response ->
            response.content?.values?.forEach {
                collectSchema(it.schema)
            }
        }
        op.parameters?.forEach { param ->
            collectSchema((param)?.schema)
        }
    }
}

println("Used schemas: ${usedSchemas.size}")

// ================= REMOVE UNUSED SCHEMAS =================

val schemas = openAPI.components?.schemas ?: emptyMap()

val pruned = schemas.filterKeys { it in usedSchemas }

openAPI.components.schemas = pruned.toMutableMap()

println("Pruned schemas from ${schemas.size} to ${pruned.size}")

// Remove redundant components due to allOf flattening
openAPI.components?.schemas?.values?.forEach { schema ->

    val composed = schema.allOf ?: return@forEach

    // If schema uses allOf and has inline properties
    composed.forEach { part ->
        if (part is Schema<*>) {
            val props = part.properties ?: return@forEach
            if (props.containsKey("action")) {
                props.remove("action")
            }
        }
    }
}

// ================= WRITE OUTPUT =================

val yaml: String = Yaml.pretty(openAPI)
File(outputFile).writeText(yaml)

println("Cleaned OpenAPI written to $outputFile")
println("Done.")
```

### Execute the script

Since Kotlin has been installed using SDKman! you can simply run this script from the terminal.

```bash
kotlin OpenApiParsing.main.kts
```

The output should then look similar to this:


```bash
Parsing OpenAPI file: ./raw-fft-api.yaml
Applying OpenAPI Generator normalization...
Filtering paths...
Used schemas: 63
Pruned schemas from 2064 to 63
Cleaned OpenAPI written to ./stripped-fft-api.yaml
Done.
```

And the file is now significantly smaller:

77100 Lines of YAML ==> 1773
2,5 MB Size         ==> 59,5 KB

## Using the Open Api generator to generate Code

Now that we stripped the existing Open Api specification to the minimum we actually need,
we can generate code from it.

```bash
openapi-generator-cli generate \
    -i stripped-fft-api.yaml \
    -g kotlin-spring \
    -o out \
    --additional-properties=library=spring-boot,beanValidations=true,serviceImplementation=true \
    --import-mappings=DateTime=java.time.LocalDateTime \
    --type-mappings=DateTime=java.time.LocalDateTime
```

Now we only have those http endpoints left we´re actually interested in, less code, less built time etc. 🙌

## Further tutorials

This modified Open Api specification can now be used to generate the code you actually need.
This is especially useful for huge Open Api specifications, where you only need to call a certain fraction of the provided endpoints.

Also see my tutorial on how to use the Open Api Quarkus Generator Extension,
where you can generate the whole Quarkus rest client based on an Open Api specification.

## Sources

- https://github.com/swagger-api/swagger-parser
- https://plugins.gradle.org/plugin/org.openapi.generator
- https://swagger.io/specification/#schema
- https://github.com/OpenAPITools/openapi-generator/blob/master/modules/openapi-generator-maven-plugin/README.md
- https://openapi-generator.tech/
