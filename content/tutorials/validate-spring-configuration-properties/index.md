---
id: "validate-spring-configuration-properties"
path: "/tutorials/validate-spring-configuration-properties"
created: "2023-08-22"
updated: "2023-08-22"
title: "Add validation to @ConfigurationProperties in Spring Boot"
description: "Often configuration properties need to be in a certain shape in order to be used properly. So why not validate them upfront?"
author: "Simon Scholz"
tags: ["kotlin", "jvm", "Spring Boot", "Spring", "Properties", "Config"]
vgWort: "vg08.met.vgwort.de/na/638dddc6b6ca4d719c046ceabcfa6b40"
---

There are various ways to configure your Spring Boot application.
In many cases the "fail fast" paradigm helps to spot issues early on
and makes problems easier to fix, because you'd show a descriptive error message on what went wrong.
That's were also validations of configuration properties comes into play.

To find out more about the various ways to inject configuration properties into your classes please check out my other tutorial about configuration properties in Spring Boot: https://simonscholz.github.io/tutorials/spring-configuration-properties

## Prerequisites

- JDK
- Kotlin
- Spring Boot
- Gradle or Maven
- An Integrated Development Environment (IDE) such as IntelliJ IDEA or Eclipse or VS Code

## Adjust the Spring Boot Project

I'd recommend to use the existing project of the [Spring Configuration Properties Tutorial](https://simonscholz.github.io/tutorials/spring-configuration-properties)

But of course you could also start by creating a new Spring Boot project. You can use the Spring Initializer (https://start.spring.io/) or your IDE to generate a new project.

## Add validation dependencies

In order to introduce validation for the properties the `org.springframework.boot:spring-boot-starter-validation` dependency has to be added:

```kotlin[build.gradle.kts]
implementation("org.springframework.boot:spring-boot-starter-validation")
```

## Add validation to the SimonScholzProperties

The `SimonScholzProperties` can implement the `org.springframework.validation.Validator` interface like this:

```kotlin
import com.nimbusds.jwt.JWTParser
import jakarta.validation.Valid
import java.time.Clock
import java.time.temporal.ChronoUnit
import java.util.Date
import java.net.URL
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.validation.Errors
import org.springframework.validation.Validator

@ConfigurationProperties(prefix = "simonscholz")
data class SimonScholzProperties(
    @Valid val thirdPartyUrl: String,
    @Valid val thirdPartyAuth: String,
) : Validator {

    override fun supports(clazz: Class<*>): Boolean =
        this.javaClass.isAssignableFrom(clazz)

    override fun validate(target: Any, errors: Errors) {
        val simonScholzProperties = target as SimonScholzProperties

        validateUrl(simonScholzProperties.thirdPartyUrl)
        validateJWT(simonScholzProperties.thirdPartyAuth)
    }

    private fun validateUrl(url: String, errors: Errors) {
        try {
            URL(url).toURI();
        } catch (e: Exception) {
            errors.rejectValue(
                "thirdPartyUrl",
                "field.thirdPartyUrl.notValid",
                "The given url is not valid."
            )
        }
    }

    private fun validateJWT(jwt: String, errors: Errors) {
        val parsedJWT = JWTParser.parse(jwt)

        val claim = parsedJWT.jwtClaimsSet.getClaim("exp") as Date
        if (Clock.systemUTC().instant().plus(7, ChronoUnit.DAYS).isAfter(claim.toInstant())) {
            errors.rejectValue(
                "thirdPartyAuth",
                "field.jwt.expired",
                "The jwt token is about to expire. Please consider creating a new one before you proceed."
            )
        }
    }
}
```

So in case the url is not valid or the jwt token is about to expire the application will crash at startup and enforces the fix these properties.

## Sources

- https://reflectoring.io/spring-boot-configuration-properties/
- https://reflectoring.io/validate-spring-boot-configuration-parameters-at-startup/
