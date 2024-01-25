---
id: "gradle-plugins-from-maven-local"
path: "/tutorials/gradle-plugins-from-maven-local"
created: "2024-01-20"
updated: "2024-01-20"
title: "Using Gradle plugins from Maven local repository"
description: "How to use Gradle plugins from a Maven local repository without publishing them to a remote repository or the Gradle plugin portal."
author: "Simon Scholz"
tags: ["gradle", "maven", "local", "testing"]
vgWort: ""
---

Sometimes you want to test a Gradle plugin locally before publishing it to a remote repository or the Gradle plugin portal. This tutorial shows you how to do that.

And besides local testing I recently created a Pull Request for a Gradle plugin and wanted to make use of it before it was merged and published to the Gradle plugin portal.

## Prerequisites

- Gradle
- Java and/or Kotlin

## Create a Gradle plugin

First, we need a Gradle plugin to test. We can create one with the [Gradle plugin development plugin](https://docs.gradle.org/current/userguide/java_gradle_plugin.html#sec:java_gradle_plugin). Create a new directory and run the following command in it:

```bash
gradle init

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 4

Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6] 4

Generate multiple subprojects for application? (default: no) [yes, no] no
Select build script DSL:
  1: Kotlin
  2: Groovy
Enter selection (default: Kotlin) [1..2] 1

Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit Jupiter) [1..4] 4

Project name (default: tutorial): gradle-plugins-to-publish
Source package (default: tutorial): io.github.simonscholz
Enter target version of Java (min. 7) (default: 17): 17
Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no] no
```

With this you can start developing your Gradle plugin.
Feel to choose Java or other options if you prefer.

For this tutorial we will use the following code:

```kotlin
package io.github.simonscholz

import org.gradle.api.Plugin
import org.gradle.api.Project

```

## Sources

- https://docs.gradle.org/current/userguide/plugins.html#sec:custom_plugin_repositories
