---
id: "quarkus-mcp-server"
path: "/tutorials/quarkus-mcp-server"
created: "2025-10-08"
updated: "2025-10-08"
title: "Quarkus MCP Server"
description: "Creating an AI tool using quarkus mcp extensions and a respective ai client"
author: "Simon Scholz"
tags: ["quarkus", "ai", "mcp", "ollama", "oidc", "kotlin", "gradle"]
vgWort: ""
---

This tutorial covers the creation of a MCP server using Quarkus and a client calling this AI, which then will call the MCP server.

## Prerequisites

* ollama
* Quarkus CLI (optional)
* Quarkus application
  * Quarkiverse MCP extension
* Java / Kotlin
* Gradle

## Ollama

In order to obtain a LLM Ollama can be used to pull it.

### Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Also see https://ollama.com/download

### Pull a model

```bash
ollama pull qwen3:1.7b
```

## Quarkus MCP Server

The easiest way to create a Quarkus project locally is using the [Quarkus CLI](https://quarkus.io/guides/cli-tooling#project-creation), which I'd usually install using [SDKMan!](https://simonscholz.dev/tutorials/ubuntu-dev-setup#sdkman).

```bash
quarkus create app dev.simonscholz:quarkus-mcp-server --gradle-kotlin-dsl --kotlin --extensions=quarkus-config-yaml,quarkus-mcp-server-sse
```

Alternatively you also can go to https://code.quarkus.io/ to create a new Quarkus project.

Feel free to add any extension you'd like.

### Configure mcp server path

The application.yml will configure the root-path for server sent events (sse) of the MCP server:

```yml[application.yml]
quarkus:
  mcp:
    server:
      sse:
        root-path: /mcp
```

### Implement a QrCodeTool MCP Tool

First of all a small `QrCodeService` using my qr code library:

```kotlin[QrCodeService.kt]
package dev.simonscholz

import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class QrCodeService {
    fun generateQrCode(data: String): ByteArray {
        // Implement QR code generation logic here
        // This is a placeholder implementation
        return data.toByteArray()
    }
}
```

Now the actual `QrCodeTool`, which uses the `QrCodeService`.

```kotlin[QrCodeTool.kt]
package dev.simonscholz

import io.quarkiverse.mcp.server.McpLog
import io.quarkiverse.mcp.server.Tool
import io.quarkiverse.mcp.server.ToolArg
import io.smallrye.common.annotation.RunOnVirtualThread
import jakarta.inject.Singleton

@Singleton
class QrCodeTool(
    private val qrCodeService: QrCodeService,
) {
    @Tool(name = "generateQrCode", description = "Generates a QR code for the given data and returns it as a byte array.")
    @RunOnVirtualThread
    fun generateQrCode(
        @ToolArg(description = "QrCodeContent") qrCodeContent: String,
        log: McpLog,
    ): String {
        log.info("Generating QR code for content: $qrCodeContent")
        return qrCodeService.generateQrCode(qrCodeContent).toString(Charsets.UTF_8)
    }
}
```

### Start the application

```
./gradlew qDev
```

This will start the application:

```bash
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2025-10-09 00:53:05,035 INFO  [io.qua.mcp.server] (executor-thread-1) MCP HTTP transport endpoints [streamable: http://localhost:8080/mcp, SSE: http://localhost:8080/mcp/sse]
2025-10-09 00:53:05,035 INFO  [io.quarkus] (Quarkus Main Thread) quarkus-mcp-server 1.0.0-SNAPSHOT on JVM (powered by Quarkus 3.28.2) started in 3.124s. Listening on: http://localhost:8080                                  
2025-10-09 00:53:05,039 INFO  [io.quarkus] (Quarkus Main Thread) Profile dev activated. Live Coding activated.                                                                                                                
2025-10-09 00:53:05,039 INFO  [io.quarkus] (Quarkus Main Thread) Installed features: [cdi, config-yaml, kotlin, mcp-server-sse, rest, rest-client, rest-client-jackson, smallrye-context-propagation, vertx]    
```

As you can see in these logs there are two MCP HTTP transport endpoints pointing to `http://localhost:8080/mcp` for streamable and to `http://localhost:8080/mcp/sse` for SSE.

## Inspect MCP Server

There are several tools to inspect the MCP Server, e.g., `@modelcontextprotocol/inspector`.

You can run it using: 

```bash
npx @modelcontextprotocol/inspector
```

A guide on how to install npx can be found in my other tutorial: https://simonscholz.dev/tutorials/node-npm-updates

The mcp inspector will automatically be opened in the browser and can connect for our mcp server:

![mcp inspector connect](./mcp-inspector-connect.png)

Once connect has been clicked, you can list all the tools and also invoke them:

![mcp inspector list tools](./mcp-inspector-list-tools.png)

## Add MCP Server to VS Code

When you hit `CTRL + SHIFT + P` and enter "mcp" the option "MCP: Add Server..." will be listed:

![VS Code tool menu](./vs-code-add-mcp-server.png)

When "MCP: Add Server..." is used "HTTP (HTTP or Server-Sent Events)" can be chosen.

![VS Code add http mcp server](./vs-code-add-http-mcp-server.png)

Then the `http://localhost:8080/mcp/sse` url can be entered:

![VS Code enter mcp server url](./vs-code-enter-http-mcp-server-uri.png)

## Sources

- https://www.the-main-thread.com/p/java-quarkus-langchain4j-ollama-mcp-tutorial
