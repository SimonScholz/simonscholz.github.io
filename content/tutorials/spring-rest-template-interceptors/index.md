---
id: "spring-rest-template-interceptors"
path: "/tutorials/spring-rest-template-interceptors"
date: "2023-09-30"
title: "Using interceptors in RestTemplate to modify the request"
description: "Modify requests of RestTemplate by adjusting the request, e.g., by the auth header and custom headers."
author: "Simon Scholz"
tags: ["kotlin", "jvm", "Spring Boot", "Spring", "RestTempalte", "rest", "requests"]
vgWort: "vg07.met.vgwort.de/na/d8851a18fac6489699da7d786a0402ce"
---

Interceptors in Spring's RestTemplate allow you to intercept and modify HTTP requests and responses sent and received by your application. They are useful for tasks like authentication, logging, adding headers, or customizing requests before they are sent to a remote server.

## Creating the project

Start by creating a new Spring Boot project or use an existing one. You can use the Spring Initializer (https://start.spring.io/) or your IDE to generate a new project.

Just ensure to have the `RestTemplate` at hand for example by adding the `org.springframework.boot:spring-boot-starter-web` dependency to your project.

## RestTemplate @Configuration

Let's have a dedicated `RestTemplateConfig` class, which looks similar to this:

```kotlin showLineNumbers [RestTemplateConfig.kt]
import java.time.Duration
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate


@Configuration
class RestTemplateConfig {

    @Bean
    fun restTemplateBuilder(): RestTemplateBuilder = RestTemplateBuilder()

    @Bean
    fun defaultRestTemplate(restTemplateBuilder: RestTemplateBuilder): RestTemplate = restTemplateBuilder
        .setConnectTimeout(Duration.ofMillis(600))
        .setReadTimeout(Duration.ofMillis(1200))
        .build()
}
```

## Interceptor to add headers

The `ClientHttpRequestInterceptor` functional interface can be used to implement an interceptor for the `RestTemplate`.

In the following example each request sent by the `RestTemplate` will include a `X-Client-ID` header telling each called service, who the client actually is.

```kotlin [RestTemplateConfig.kt]{18}
import java.time.Duration
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate


@Configuration
class RestTemplateConfig {

    @Bean
    fun restTemplateBuilder(): RestTemplateBuilder = RestTemplateBuilder()

    @Bean
    fun defaultRestTemplate(restTemplateBuilder: RestTemplateBuilder): RestTemplate = restTemplateBuilder
        .setConnectTimeout(Duration.ofMillis(600))
        .setReadTimeout(Duration.ofMillis(1200))
        .interceptors(customHeadersInterceptor())
        .build()

    private fun customHeadersInterceptor() = ClientHttpRequestInterceptor { request, body, execution ->
        request.headers.set("X-Client-ID", "EXAMPLE-SERVICE-1")
        execution.execute(request, body)
    }
}
```

### Forward headers using RequestContextHolder

When working with several services it can also be helpful to to simply route through certain headers from incoming requests.
This is often also used for tracing purposes by using a [X-Request-ID](https://http.dev/x-request-id), which is passed through all backend services.

In Spring WebMVC the `RequestContextHolder` can be used to obtain information like headers from the originating request:

```kotlin [RestTemplateConfig.kt]{21-29}
import java.time.Duration
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate


@Configuration
class RestTemplateConfig {

    @Bean
    fun restTemplateBuilder(): RestTemplateBuilder = RestTemplateBuilder()

    @Bean
    fun defaultRestTemplate(restTemplateBuilder: RestTemplateBuilder): RestTemplate = restTemplateBuilder
        .setConnectTimeout(Duration.ofMillis(600))
        .setReadTimeout(Duration.ofMillis(1200))
        .interceptors(customHeadersInterceptor())
        .build()

    private fun customHeadersInterceptor() = ClientHttpRequestInterceptor { request, body, execution ->
        request.headers.set("X-Client-ID", "EXAMPLE-SERVICE-1")
        if (RequestContextHolder.getRequestAttributes() is ServletRequestAttributes) {
            val originatingRequest = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
            request.headers.set("X-Request-ID", originatingRequest.getHeader("X-Request-ID"))
        }
        execution.execute(request, body)
    }
}
```

In case you're having a service mesh in place, your infrastructure is also usually capable of intercepting requests and route through certain headers. Maybe that's a better option for your use case.

### Forward authorization using SecurityContextHolder

In some scenarios you'd also want to pass through the authorization to other internal services, so that they can also check authorization and implement authentication based on the original client, which obtained an auth token.

This can be accomplished by using the `SecurityContextHolder`.

```kotlin [RestTemplateConfig.kt]{30-40}
import java.time.Duration
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate


@Configuration
class RestTemplateConfig {

    @Bean
    fun restTemplateBuilder(): RestTemplateBuilder = RestTemplateBuilder()

    @Bean
    fun defaultRestTemplate(restTemplateBuilder: RestTemplateBuilder): RestTemplate = restTemplateBuilder
        .setConnectTimeout(Duration.ofMillis(600))
        .setReadTimeout(Duration.ofMillis(1200))
        .interceptors(customHeadersInterceptor(), createAuthInterceptor())
        .build()

    private fun customHeadersInterceptor() = ClientHttpRequestInterceptor { request, body, execution ->
        request.headers.set("X-Client-ID", "EXAMPLE-SERVICE-1")
        if (RequestContextHolder.getRequestAttributes() is ServletRequestAttributes) {
            val originatingRequest = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
            request.headers.set("X-Request-ID", originatingRequest.getHeader("X-Request-ID"))
        }
        execution.execute(request, body)
    }

    private fun createAuthInterceptor(): ClientHttpRequestInterceptor = ClientHttpRequestInterceptor { request, body, execution ->
        val authentication: Authentication = SecurityContextHolder.getContext().authentication ?: 
            return@ClientHttpRequestInterceptor execution.execute(request, body)

        if (authentication.credentials !is AbstractOAuth2Token) {
            return@ClientHttpRequestInterceptor execution.execute(request, body)
        }

        request.headers.setBearerAuth((authentication.credentials as AbstractOAuth2Token).tokenValue)
        execution.execute(request, body)
    }
}
```

## Using the RestTemplate to send requests

```kotlin [ExampleApiAdapter.kt]
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Component
class ExampleApiAdapter(private val restTemplate: RestTemplate) {

    fun callExampleApi(): String {
        val url = "https://example.com/api/resource"

        // Make an HTTP GET request with the customized RestTemplate
        val response: String? = restTemplate.getForObject(url, String::class.java)

        return response ?: "Error"
    }
}
```
