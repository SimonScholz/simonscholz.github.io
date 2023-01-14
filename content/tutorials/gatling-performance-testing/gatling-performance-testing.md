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

# Create a new Quarkus project

Go to https://code.quarkus.io/ and add the following Quarkus modules:

![Quarkus Starter Code](./quarkus-starter-code.png)

After downloading the Quarkus starter code it can be opened in IntelliJ.

# Add the Gatling Gradle plugin

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

# Performance test the hello endpoint

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

    private val baseUrl = System.getProperty("gatlingBaseUrl", "http://localhost:8080")

    private val httpProtocol =
        http.baseUrl(baseUrl)
            .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") /**/
            .acceptLanguageHeader("en-US,en;q=0.5")
            .acceptEncodingHeader("gzip, deflate")
            .userAgentHeader(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0"
            )

    init {
        setUp(
            hello.injectOpen(CoreDsl.rampUsers(10).during(30)),
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


# Passing dynamic data

## Pass values to the Gradle task

The `HelloSimulation` class uses the `gatlingBaseUrl` system property to obtain the baseUrl for http requests.
This property can be set using `-D` to provide properties:

```bash
./gradlew gRun -DgatlingBaseUrl="http://localhost:8080
```

## Utilize a csv feeder

Feeders enable you to inject dynamic data into your simulation and to choose this data in a random fashion, e.g., a list of product ids to be used.

Let's create an endpoint, which returns availability information of certain products.

```kotlin
package io.github.simonscholz

import java.util.concurrent.TimeUnit
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.QueryParam
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path("/availability")
class AvailabilityResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun productAvailability(@QueryParam("productId") productId: String): Response = when (productId) {
        "1234" -> Response.ok(AvailabilityDTO(productId, 10)).build()
        "5678" -> Response.ok(AvailabilityDTO(productId, 30)).build()
        "91011" -> Response.ok(AvailabilityDTO(productId, 50)).build()
        "121314" -> Response.ok(AvailabilityDTO(productId, 70)).build()
        "151617" -> {
            TimeUnit.SECONDS.sleep(2)
            Response.ok(AvailabilityDTO(productId, 90)).build()
        }
        else -> Response.status(Response.Status.NOT_FOUND).build()
    }

    data class AvailabilityDTO(val productId: String, val quantity: Int)
}
```

Then we'd place a `productIds.csv` file inside the `src/gatling/resources` folder to feed the Gating simulation with dynamic product ids.

```csv
productId
1234
5678
91011
121314
151617
181920
```

The next step would be to create a scenario, which calls the new `/availability` API and utilizes the product ids given in the `productIds.csv` file.

```kotlin
package io.github.simonscholz.scenario

import io.gatling.javaapi.core.CoreDsl.feed
import io.gatling.javaapi.core.CoreDsl.scenario
import io.gatling.javaapi.http.HttpDsl.http

object CSVFeederProductAvailabilityScenario {
    private val csvProductFeeder = csv("productIds.csv").circular()

    private val hitAvailability =
        feed(csvProductFeeder)
            .exec(
                http("Hit Availability").get("/availability?productId=#{productId}"),
            ).pause(1) // Gatling's default is seconds

    val productAvailabilityScenario = scenario("ProductAvailabilityScenario").exec(hitAvailability)
}
```

Also see https://gatling.io/docs/gatling/reference/current/core/session/feeder/

You can now add this `productAvailabilityScenario` to the simulation.

```kotlin
package io.github.simonscholz.simulation

import io.gatling.javaapi.core.CoreDsl.rampUsers
import io.gatling.javaapi.core.Simulation
import io.github.simonscholz.config.Config.HTTP_PROTOCOL
import io.github.simonscholz.scenario.CSVFeederProductAvailabilityScenario.productAvailabilityScenario
import io.github.simonscholz.scenario.HelloScenario.hello
import java.time.Duration

class HelloSimulation : Simulation() {

    init {
        val users = 10
        val duration = Duration.ofSeconds(30)
        setUp(
            hello.injectOpen(rampUsers(users).during(duration)),
            productAvailabilityScenario.injectOpen(rampUsers(users).during(duration)),
        ).protocols(HTTP_PROTOCOL)
    }
}
```

# GitHub action to run a performance test

Let's copy over some parts from this sample: https://github.com/gatling/gatling-gradle-plugin-demo-kotlin

```kotlin
package io.github.simonscholz.simulation

import io.gatling.javaapi.core.CoreDsl.* // ktlint-disable no-wildcard-imports
import io.gatling.javaapi.core.Simulation
import io.gatling.javaapi.http.HttpDsl.http

class ComputerDatabaseSimulation : Simulation() {
    private val AT_ONCE_USERS: Int = Integer.getInteger("atOnceUsers", 10)
    private val RAMP_UP_USERS: Int = Integer.getInteger("rampUpUsers", 10)
    private val DURATION: Int = Integer.getInteger("duration", 10)

    private val browse =
        repeat(4, "i").on(
            exec(
                http("Page #{i}").get("/computers?p=#{i}"),
            ).pause(1),
        )

    private val httpProtocol =
        http.baseUrl("https://computer-database.gatling.io")
            .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
            .acceptLanguageHeader("en-US,en;q=0.5")
            .acceptEncodingHeader("gzip, deflate")
            .userAgentHeader(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0",
            )

    private val users = scenario("Users").exec(browse)

    init {
        setUp(
            users.injectOpen(
                atOnceUsers(AT_ONCE_USERS),
                rampUsers(RAMP_UP_USERS).during(DURATION.toLong())),
        ).protocols(httpProtocol)
    }
}
```

The following GitHub action (`./github/workflows/gatling-performance.yaml`) can be used to run the Gatling simulation and upload the report:


```yaml
name: Run Gatling performance test

# Controls when the workflow will run
on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
    inputs:
      atOnceUsers:
        type: number
        description: Amount of initial users for the performance test
        default: 10
      rampUpUsers:
        type: number
        description: Amount of ramp up users for the performance test
        default: 10
      duration:
        type: number
        description: Duration of the performance test
        default: 20

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  performance-test:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Use Gradle packages cache
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches/
            ~/.gradle/wrapper/
          key: ${{ runner.os }}-gradle-release-${{ hashFiles('**/build.gradle.kts') }}
          restore-keys: ${{ runner.os }}-gradle-release

      - name: Execute Gradle
        run: ./gradlew gRun -DatOnceUsers=${{ inputs.atOnceUsers }} -DrampUpUsers=${{ inputs.rampUpUsers }} -Dduration=${{ inputs.duration }}

      - name: Upload Gatling report
        uses: actions/upload-artifact@v3
        with:
          name: gatling-report
          path: ./build/reports/gatling/
```

This workflow can be run manually and the report can be downloaded afterwards.

![Gatling GitHub action](./gatling-github-action.png)

# Sources

* https://github.com/SimonScholz/performance-analysis
* https://gatling.io/docs/
* https://gatling.io/docs/gatling/reference/current/extensions/gradle_plugin/
* https://github.com/gatling/gatling-gradle-plugin-demo-kotlin
