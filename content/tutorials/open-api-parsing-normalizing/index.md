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
        "/api/inboundprocesses/{inboundProcessId}",
        "/api/inboundprocesses/{inboundProcessId}/purchaseorder",
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

// Remove redundant components due to allOf flattening and anyOf simplification
openAPI.components?.schemas?.values?.forEach { schema ->

    // Remove duplicate discriminator property
    schema.allOf?.forEach { part ->
        if (part is Schema<*>) {
            val props = part.properties
            if (props != null && props.containsKey("action")) {
                props.remove("action")
            }
        }
    }

    // Remove useless anyOf (only required constraints)
    val anyOf = schema.anyOf
    if (anyOf != null) {
        val onlyRequiredConstraints =
            anyOf.all { sub ->
                sub is Schema<*> &&
                    sub.required != null &&
                    sub.properties == null
            }

        if (onlyRequiredConstraints) {
            schema.anyOf = null
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

| Filename | Lines of YAML | File Size |
| -------- | ------------- | ----------|
| raw-fft-api.yaml | 77100 | 2,5 MB    |
| stripped-fft-api.yaml | 1758 | 59,2 KB |

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

## Application generating code by using Gradle

```bash
gradle init \
  --type kotlin-application \
  --dsl kotlin \
  --test-framework junit-jupiter \
  --package dev.simonscholz \
  --project-name open-api-generator-runner  \
  --no-split-project  \
  --java-version 25
```

Add open api dependencies:

```toml[libs.versions.toml]
# This file was generated by the Gradle 'init' task.
# https://docs.gradle.org/current/userguide/platforms.html#sub::toml-dependencies-format

[versions]
dotenv = "6.5.1"
jackson = "2.21.2"
jakarta-annotation= "3.0.0"
open-api = "7.22.0"

[libraries]
dotenv = { module = "io.github.cdimascio:dotenv-kotlin", version.ref = "dotenv" }
jackson = { module = "com.fasterxml.jackson.core:jackson-databind", version.ref = "jackson" }
jackson-jsr310 = { module = "com.fasterxml.jackson.datatype:jackson-datatype-jsr310", version.ref = "jackson" }
jakarta-annotation = { module = "jakarta.annotation:jakarta.annotation-api", version.ref = "jakarta-annotation" }

[plugins]
kotlin-jvm = { id = "org.jetbrains.kotlin.jvm", version = "2.2.0" }
openapi = { id = "org.openapi.generator", version.ref = "open-api" }

```

Now let´s add the open api generator configuration to the `build.gradle.kts`:

```kotlin[build.gradle.kts]
import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    // Apply the org.jetbrains.kotlin.jvm Plugin to add support for Kotlin.
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.openapi)

    // Apply the application plugin to add support for building a CLI application in Java.
    application
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // This dependency is used by the application.
    implementation(libs.dotenv)
    implementation(libs.jackson)
    implementation(libs.jackson.jsr310)
    implementation(libs.jakarta.annotation)
}

// Apply a specific Java toolchain to ease working on different environments.
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

application {
    // Define the main class for the application.
    mainClass = "dev.simonscholz.AppKt"
}

configureOpenApiClient(
    taskName = "generateFftApiClient",
    spec = "$rootDir/stripped-fft-api.yaml",
    basePackage = "dev.simonscholz.api.client.fft",
)

fun configureOpenApiClient(
    taskName: String,
    spec: String,
    basePackage: String,
) {
    tasks.register(taskName, GenerateTask::class.java) {
        generatorName.set("java")

        inputSpec.set(spec)
        outputDir.set("${layout.buildDirectory.get()}/generated")

        packageName.set(basePackage)
        apiPackage.set("$basePackage.api")
        modelPackage.set("$basePackage.model")
        modelNameSuffix.set("DTO")
        invokerPackage.set("$basePackage.invoker")

        // Use Java 11 HttpClient
        library.set("native")

        generateModelTests.set(false)
        generateApiTests.set(false)

        configOptions.set(
            mapOf(
                "library" to "native",
                "enumPropertyNaming" to "MACRO_CASE",
                "dateLibrary" to "java8",
                "openApiNullable" to "false",
                "useJakartaEe" to "true",
                "serializationLibrary" to "jackson",
                "hideGenerationTimestamp" to "true",
            ),
        )

        globalProperties.set(
            mapOf(
                "models" to "", // generate DTOs
                "apis" to "", // generate API interfaces
                "supportingFiles" to "",
            ),
        )

        generateModelTests.set(false)
        generateApiTests.set(false)
        generateModelDocumentation.set(false)
        generateApiDocumentation.set(false)
    }
}

sourceSets {
    main {
        java {
            srcDir("${layout.buildDirectory.get()}/generated/src/main/java")
        }
    }
}
```

This will add a new gradle task called `generateFftApiClient` which can be executed to generate the client code from the Open Api specification.
The `sourceSets` configuration will then make sure that the generated code is included in the compilation of the main source set.

Please feel free to adjust the configureOpenApiClient function to your needs, e.g., if you want to generate a client for a different Open Api specification or want to use different generator options.

### Using the generated client

In this small example application we will use the generated client to call the FFT API and update the quantity of a purchase order item in an inbound process.

```kotlin[App.kt]
package dev.simonscholz

import dev.simonscholz.api.client.fft.api.InboundInventoryApi
import dev.simonscholz.api.client.fft.invoker.ApiClient
import dev.simonscholz.api.client.fft.model.InboundProcessPurchaseOrderForUpsertDTO
import io.github.cdimascio.dotenv.dotenv

fun main() {
    val dotenv = dotenv()

    val baseUri = dotenv["baseUri"]
    val bearerToken = dotenv["bearerToken"]
    val inboundProcessId = "019d728c-7bf4-74ed-998a-54ca02999463"
    val newQty = 15

    val authorizationHeader =
        mapOf(
            "Authorization" to "Bearer $bearerToken",
        )

    val apiClient = ApiClient()
    apiClient.updateBaseUri(baseUri)
    val api = InboundInventoryApi(apiClient)
    val inboundProcess = api.getInboundProcess(inboundProcessId, authorizationHeader)

    val purchaseOrder =
        requireNotNull(inboundProcess.purchaseOrder) {
            "Purchase order must not be null for inbound process with id $inboundProcessId"
        }

    val requestedItems =
        purchaseOrder.requestedItems.map {
            println("Current quantity for item ${it.tenantArticleId} is ${it.quantity.value} and will be updated to $newQty")
            val modifiedQty =
                it.quantity.apply {
                    value = newQty
                }
            it.quantity(modifiedQty)
        }

    val updateDTO =
        InboundProcessPurchaseOrderForUpsertDTO()
            .version(inboundProcess.version)
            .requestedItems(
                requestedItems,
            ).orderDate(purchaseOrder.orderDate)
            .requestedDate(purchaseOrder.requestedDate)

    val response =
        api.upsertInboundProcessPurchaseOrder(
            inboundProcessId,
            updateDTO,
            authorizationHeader,
        )

    println("Response from FFT:")
    println(response)
}
```

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
