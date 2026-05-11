---
id: "quarkus-observability-open-telemetry"
path: "/tutorials/quarkus-observability-open-telemetry"
created: "2025-10-18"
updated: "2025-10-18"
title: "Quarkus observability with Open Telemetry"
description: "Getting metrics, traces and logs from your Quarkus application using Open Telemetry"
author: "Simon Scholz"
tags: ["quarkus", "otel", "open telemetry", "observability", "kotlin", "gradle"]
vgWort: ""
---

This tutorial covers observability of your Quarkus application by providing metrics, traces and logs using Open Telemetry.

## Prerequisites

* Quarkus CLI (optional)
* Quarkus application
  * Micrometer Open Telemetry
  * Grafana LGTM Stack
* Java / Kotlin
* Gradle

## Creating a new Quarkus project

The easiest way to create a Quarkus project locally is using the [Quarkus CLI](https://quarkus.io/guides/cli-tooling#project-creation), which I'd usually install using [SDKMan!](https://simonscholz.dev/tutorials/ubuntu-dev-setup#sdkman).

```bash
quarkus create app dev.simonscholz:quarkus-otel --gradle-kotlin-dsl --kotlin --extensions=quarkus-config-yaml,quarkus-micrometer-opentelemetry,quarkus-smallrye-openapi,quarkus-rest-jackson,quarkus-observability-devservices
```

Alternatively you also can go to https://code.quarkus.io/ to create a new Quarkus project.

Feel free to add any extension you'd like.

### Start the application

```
./gradlew qDev
```

## Sources

- https://quarkus.io/guides/observability-devservices-lgtm
- https://docs.quarkiverse.io/quarkus-langchain4j/dev/observability.html
