---
id: "java-kotlin-json"
path: "/tutorials/java-kotlin-json"
created: "2025-07-20"
updated: "2025-07-20"
title: "Working with Json using Java or Kotlin"
description: "Tools and libraries to work with Json in Java or Kotlin"
author: "Simon Scholz"
tags: ["json", "jackson", "open api", "java", "kotlin", "gradle"]
vgWort: ""
---

Java and Kotlin offer a large variety of tools to work with Json data, e.g., Jackson, Gson or Kotlinx Serialization Json.

## Prerequisites

- Java / Kotlin
- Jbang or Gradle

## Using Jackson´s JsonNode

In case you only need a small fraction of a json document you can utilize the `at` method instead of having to create a DTO object.

```kotlin
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

val jsonBody =
    """
    {
      "payload": {
        "resource": {
          "id": "12345",
          "typeId": "order"
        }
      }
    }
    """.trimIndent()
val objectMapper = jacksonObjectMapper()
val jsonNode: JsonNode? = objectMapper.readTree(jsonBody)

val resourceId =
    jsonNode?.at("/payload/resource/id")?.let {
        if (it.isMissingNode) {
            null
        } else {
            it.asText()
        }
    }
```

## Sources

- https://github.com/FasterXML/jackson
- https://github.com/Kotlin/kotlinx.serialization
- https://kotlinlang.org/api/kotlinx.serialization/kotlinx-serialization-json/kotlinx.serialization.json/-json/
