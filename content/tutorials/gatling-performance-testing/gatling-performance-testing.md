---
path: '/tutorials/gatling-performance-testing'
date: '2023-01-11'
title: 'Performance testing with Gatling using Gradle and Kotlin'
description: 'Tutorial on how to create a project for Gatling performance testing with Gradle and Kotlin'
author: 'Simon Scholz'
tags: ['kotlin', 'jvm', 'gatling', 'testing', 'performance', 'gradle']
vgWort: 'vg08.met.vgwort.de/na/395304c41e1e46fc92d41791863dc07e'
---

Gatling is an open source project (Apache License 2.0), which offers capabilities to performance test several things, e.g., http endpoints, JMS and more.

Also see the great documentation of Gatling here: https://gatling.io/docs/gatling/

This tutorial will be a step by step guide to:

* Create a web application (using Quarkus)
* Add the `io.gatling.gradle` gradle plug-in to the project
* Setup Gatling simulations with scenarios, feeder and more
* Passing dynamic data to the performance test
* Use a GitHub action to run the Gatling performance test

## Create a new Quarkus project

Go to https://code.quarkus.io/ and add the following Quarkus modules:

![Quarkus Starter Code](./quarkus-starter-code.png)

After downloading the Quarkus starter code it can be opened in IntelliJ.

## Add the Gatling Gradle plugin

Besides the other plugins the `io.gatling.gradle` needs to be added:

```kotlin
plugins {
    kotlin("jvm") version "1.7.21"
    kotlin("plugin.allopen") version "1.7.21"
    id("io.quarkus")

    id("io.gatling.gradle") version "3.9.0.2"
}
```

Once the plugin is added a `gatling` source folder can easily be created. This is necessary because the gatling plugin provides the gatling dependencies for this source set by default. This of course could also be adjusted, but usually it's best to stick to the conventions.

![gatling source folder](./gatling-source-folder.png)

More information on this can be found here: https://gatling.io/docs/gatling/reference/current/extensions/gradle_plugin/

## Performance test the hello endpoint

To have a quick win, let's create a small simulation for the hello endpoint, which comes with the Quarkus starter code.

First create a `HelloScenario` object to provide a scenario:

```kotlin
package io.github.simonscholz.scenario

import io.gatling.javaapi.core.CoreDsl.exec
import io.gatling.javaapi.core.CoreDsl.scenario
import io.gatling.javaapi.http.HttpDsl.http

object HelloScenario {
    private val hitHello =
        exec(
            http("Hit Hello").get("/hello")
        ).pause(1) // Gatling's default is seconds

    val hello = scenario("Hello").exec(hitHello)
}
```

And then a `Simulation`, which runs the scenario:

```kotlin
package io.github.simonscholz.simulation

/* ktlint-disable no-wildcard-imports */
import io.gatling.javaapi.core.CoreDsl
import io.gatling.javaapi.core.Simulation
import io.gatling.javaapi.http.HttpDsl.http
import io.github.simonscholz.scenario.HelloScenario.hello
/* ktlint-disable no-wildcard-imports */

class HelloSimulation : Simulation() {

    private val httpProtocol =
        http.baseUrl("http://localhost:8080")
            .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") /**/
            .acceptLanguageHeader("en-US,en;q=0.5")
            .acceptEncodingHeader("gzip, deflate")
            .userAgentHeader(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0"
            )

    init {
        setUp(
            hello.injectOpen(CoreDsl.rampUsers(50000).during(30)),
        ).protocols(httpProtocol)
    }
}
```

Note what the documentation says about the imports: https://gatling.io/docs/gatling/reference/current/core/simulation/#dsl-imports
But for me the simulation even works without these wild card imports.

Now that the first simulation is in place we can run the Quarkus application and afterwards run the Gatling performance test.

```bash
# Start quarkus application
./gradlew qDev

# Run gatling performance test
./gradlew gRun
```

Then click on the link at the end of the output of the gatlingRun task and enjoy the beautiful html report.

![Gatling HTML report](./gatling-html-report.png)


## Creating general classes for performance testing

Too be added...

## Gatling Scenario setup

Too be added...

## Gatling Simulations

Too be added...

## GitHub action to run a performance test

Too be added...

## Sources

* https://github.com/SimonScholz/performance-analysis
* https://gatling.io/docs/
* https://gatling.io/docs/gatling/reference/current/extensions/gradle_plugin/
