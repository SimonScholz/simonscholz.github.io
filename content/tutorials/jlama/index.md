---
id: "jlama"
path: "/tutorials/jlama"
created: "2024-12-05"
updated: "2024-12-05"
title: "Using jlama and new java vector api to run LLMs with native Java/Kotlin"
description: "Using jlama and new java vector api to run LLMs with native Java/Kotlin"
author: "Simon Scholz"
tags: ["ai", "llm", "jlama", "java", "kotlin", "gradle"]
vgWort: "vg08.met.vgwort.de/na/e8df68c672cb40e8b4905ea0b35dc007"
---

If you´re seeking to use LLMs with plain or native Java/Kotlin this tutorial is for you.

## Prerequisites

- Java / Kotlin
- Gradle

## Create a project and adding dependencies

The following command will generate a kotlin application project called `jlama-example`.

```bash
gradle init \
    --type kotlin-application \
    --dsl kotlin \
    --test-framework junit-jupiter \
    --project-name jlama-example \
    --package dev.simonscholz \
    --no-split-project \
    --no-incubating \
    --java-version 21
```

For other options run `gradle help --task init`.

Now that we have a project in place we can add the required dependencies to it.

First the `libs.versions.toml` file in the `gradle` folder needs to be modified:

```toml[libs.versions.toml]
[versions]
jlama = "0.8.3"
junit-jupiter = "5.10.2"
slf4j = "2.0.16"

[libraries]
jlama-core = { module = "com.github.tjake:jlama-core", version.ref = "jlama" }
jlama-native = { module = "com.github.tjake:jlama-native", version.ref = "jlama" }
junit-jupiter = { module = "org.junit.jupiter:junit-jupiter", version.ref = "junit-jupiter" }
slf4j-api = { module = "org.slf4j:slf4j-api", version.ref = "slf4j" }
slf4j-simple = { module = "org.slf4j:slf4j-simple", version.ref = "slf4j" }

[plugins]
jvm = { id = "org.jetbrains.kotlin.jvm", version = "2.1.0" }
```

Feel free to leave the existing declarations in the `libs.versions.toml` file as is, but we do not need them for this tutorial.

The `build.gradle.kts` can be adjusted accordingly:

```kotlin[build.gradle.kts]
plugins {
    alias(libs.plugins.jvm)
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.jlama.core)
    implementation(libs.jlama.native)
    implementation(libs.slf4j.api)
    runtimeOnly(libs.slf4j.simple)

    testImplementation(libs.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

application {
    // Define the main class for the application.
    mainClass = "dev.simonscholz.AppKt"
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}

tasks.withType<JavaCompile> {
    options.compilerArgs.addAll(listOf("--enable-preview"))
}

tasks.named<JavaExec>("run") {
    jvmArgs = listOf("--enable-preview", "--add-modules", "jdk.incubator.vector")
}
```

Adding `--enable-preview` and the `jdk.incubator.vector` module is crucial to make it work.

For more information on how to use toml files in Gradle please see my other tutorial on this topic: https://simonscholz.dev/tutorials/gradle-toml-version-catalogs

## Quickstart - Sending a first prompt to your local LLM

As a quickstart let´s just download a LLM, like https://huggingface.co/tjake/Llama-3.2-1B-Instruct-JQ4,
and pass a prompt to it.

```kotlin[App.kt]
package dev.simonscholz

import com.github.tjake.jlama.model.ModelSupport
import com.github.tjake.jlama.safetensors.DType
import com.github.tjake.jlama.safetensors.SafeTensorSupport
import org.slf4j.LoggerFactory
import java.util.UUID

enum class LLM(
    val modelName: String,
) {
    // https://huggingface.co/tjake/Llama-3.2-1B-Instruct-JQ4
    LLAMA("tjake/Llama-3.2-1B-Instruct-JQ4"),
    // https://huggingface.co/tjake/Llama-3.2-1B-Instruct-Jlama-Q4
    JLAMA("tjake/Llama-3.2-1B-Instruct-Jlama-Q4"),
}

fun main() {
    val logger = LoggerFactory.getLogger("dev.simonscholz.App")
    val llmModelPath = "/home/simon/llms/"
    val localModelPath =
        SafeTensorSupport
            .maybeDownloadModel(
                llmModelPath,
                LLM.JLAMA.modelName,
            )
    val model = ModelSupport.loadModel(localModelPath, DType.F32, DType.I8)

    val promptContext =
        model
            .promptSupport()
            .orElseThrow()
            .builder()
            .addSystemMessage(
                """
                Your response must only consist of the following enum values: BABY, CHILD, ADOLESCENT, ADULT or ELDERLY
                Please derive to which ENUM category the user belongs.
                Do not write a whole sentence, but only respond with one of the enum values according
                to the derived category of the following statement:
                """.trimIndent(),
            ).addUserMessage(
                """
                I am too old for this and I forgot where I put my teeth.
                """.trimIndent(),
            ).build()

    val sessionId = UUID.randomUUID()
    val temperature = 0.0f
    val maxTokenLength = 256

    val response = model.generate(sessionId, promptContext, temperature, maxTokenLength) { _, _ -> }

    logger.info("Time to generate response: ${response.promptTimeMs} ms")
    logger.info("Response Text: ${response.responseText}")
}
```

Now this code can simply be run by executing `./gradlew run` in your terminal.

The output should then look similar to this:

```shell
[main] INFO com.github.tjake.jlama.model.AbstractModel - Model type = Q4, Working memory type = F32, Quantized memory type = I8
[main] INFO dev.simonscholz.App - Time to generate response: 7431 ms
[main] INFO dev.simonscholz.App - Response Text: ELDERLY
```

Based on the response text an enum could be used for further decisions made by followup code:

```kotlin
enum class AGEGROUP {
    BABY,
    CHILD,
    ADOLESCENT,
    ADULT,
    ELDERLY,
}


// ... other code from above
val ageGroup = AGEGROUP.valueOf(response.responseText.uppercase())
logger.info("The AGEGROUP is ${ageGroup.name}")
```

The follow up code could now improve the user experience by responding to the users according to their age group.

## Sources

- https://github.com/tjake/Jlama
