---
id: 'kotlin-coroutines'
path: '/tutorials/kotlin-coroutines'
created: '2024-07-26'
updated: '2024-07-26'
title: 'Kotlin Coroutines'
description: 'Using Kotlin Coroutines to run tasks concurrently'
author: 'Simon Scholz'
tags: ['kotlin', 'jvm', 'concurrency', 'coroutines']
vgWort: 'vg07.met.vgwort.de/na/c6334982163249fa8f4df39d5a5f73c9"'
---

## General Kotlin Coroutines

Kotlin coroutines allow to write asynchronous/concurrent code in a sequential style.
So you can write concurrent code with a well known syntax, which is familiar to the majority of developers.
This simplicity let´s coroutines shine compared to many reactive programming libraries, e.g., RxJava, Project Reactor or Mutiny.

## Prerequisites

- Gradle
- Kotlin

## Creating a project and configure the IDE

```bash
mkdir kotlin-coroutines-tutorial
cd kotlin-coroutines-tutorial

gradle init \
    --type kotlin-library \
    --dsl kotlin \
    --test-framework junit-jupiter \
    --project-name kotlin-coroutines-tutorial \
    --package com.example \
    --no-split-project \
    --no-incubating \
    --java-version 21
```

Once the *kotlin-coroutines-tutorial* project is created you can open it in IntelliJ.
Then open the Libary class and add a suspending main function:

```kotlin [Library.kt]
package com.example

suspend fun main() {

}
```

Then you can hit the "play button" (1) to implicitly create a launch configuration to be edited (2)

![Create Launch Config](create-launch-config-debug-coroutines.png)

In the launch configuration the VM Option `-Dkotlinx.coroutines.debug` can be used to output additional coroutine meta data in the logs.

![Launch Config debug flag for coroutines](launch-config-debug-coroutines.png)

## Adding the necessary dependencies

Basically the following dependencies are needed:

- org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0-RC
- org.slf4j:slf4j-api:2.0.13
- ch.qos.logback:logback-classic:1.5.6

In case the project has been created by the `gradle init` from above the `libs.versions.toml` file can be adjusted like this:

```toml [libs.versions.toml]
[versions]
kotlin-coroutines = "1.9.0-RC"
slf4j = "2.0.13"
logback = "1.5.6"

[libraries]
kotlin-coroutines = {module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlin-coroutines"}
slf4j = {module = "org.slf4j:slf4j-api", version.ref = "slf4j"}
logback = {module = "ch.qos.logback:logback-classic", version.ref = "logback"}
```

In the `build.gradle.kts` file these dependencies have to be added like this to the `dependencies` closure:

```kotlin [build.gradle.kts]
dependencies {
    implementation(libs.kotlin.coroutines)
    implementation(libs.slf4j)
    implementation(libs.logback)

    // ... other dependencies
}
```

Once these dependencies are added to the existing generated ones, we actually are prepared to get our hands dirty and code...

## Coroutine Examples

Launching a coroutine is as easy as this:

```kotlin

```

### Run tasks concurrently

```kotlin

```

### Join tasks sequentially

```kotlin

```

## Compare to reactive libraries

```kotlin

```

## Sources

- https://kotlinlang.org/docs/coroutines-guide.html
- https://www.youtube.com/watch?v=Wpco6IK1hmY

