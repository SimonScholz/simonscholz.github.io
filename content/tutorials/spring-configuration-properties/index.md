---
id: "spring-configuration-properties"
path: "/tutorials/spring-configuration-properties"
date: "2023-09-05"
title: "Using @ConfigurationProperties or @Value in Spring Boot"
description: "Make use of @ConfigurationProperties or @Value in Spring Boot applications"
author: "Simon Scholz"
tags: ["kotlin", "jvm", "Spring Boot", "Spring", "Properties", "Config"]
vgWort: "vg08.met.vgwort.de/na/755bbdc6a6c54ac3a4278a26d75c584d"
---

In Spring Boot, `@ConfigurationProperties` is a powerful feature that allows you to externalize configuration properties and bind them to Kotlin data classes. This tutorial will walk you through the steps of using `@ConfigurationProperties` to simplify configuration management in your Spring Boot application.

I'd favor the `@ConfigurationProperties` annotation over using `@Value` or the `Environment` bean.
On advantage is that `@ConfigurationProperties` are type safe and you can validate `@ConfigurationProperties` on startup of the application: https://simonscholz.github.io/tutorials/validate-spring-configuration-properties


## Prerequisites

- JDK
- Kotlin
- Spring Boot
- Gradle or Maven
- An Integrated Development Environment (IDE) such as IntelliJ IDEA or Eclipse or VS Code

## Create a Spring Boot Project

Start by creating a new Spring Boot project. You can use the Spring Initializer (https://start.spring.io/) or your IDE to generate a new project.

## Configure Application Properties

In the `application.properties` or `application.yml` file we'd define some properties, we want to read.

```yaml
simonscholz:
    third-party-url: ${THIRD_PARTY_URL}
    third-party-auth: ${THIRD_PARTY_JWT_TOKEN}

```

## Define Configuration Properties Data Class

Create a Kotlin data class to represent your configuration properties. This class will be annotated with `@ConfigurationProperties` and will contain properties corresponding to your configuration properties.

```kotlin
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@ConfigurationProperties(prefix = "simonscholz")
data class SimonScholzProperties(
    val thirdPartyUrl: String = "",
    val thirdPartyAuth: String = "",
)
```

In this example, we've created a `SimonScholzProperties` data class with two properties: thirdPartyUrl and thirdPartyAuth. The @ConfigurationProperties annotation specifies a prefix that will be used to bind properties from the configuration file.

Make sure to use the prefix, in this case `simonscholz`, specified in your `@ConfigurationProperties` annotation.

## Enable Configuration Properties

The `@EnableConfigurationProperties` annotation must be used to enable the initialization of the data classes annotated with `@ConfigurationProperties`. The `@EnableConfigurationProperties` annotation can be used in any `@Configuration` class, e.g., `@SpringBootApplication`.

```kotlin
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(SimonScholzProperties::class)
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
```

or

```kotlin
@Configuration
@EnableConfigurationProperties(SimonScholzProperties::class)
class ApplicationConfigurationProperties
```

# Sources

- https://reflectoring.io/spring-boot-configuration-properties/
