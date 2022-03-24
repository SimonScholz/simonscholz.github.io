---
path: '/tutorials/kotlin-extension-functions'
date: '2022-03-26'
title: 'Using Kotlin extension functions/methods'
description: 'Using Kotlin extension functions/methods and create your own custom ones'
author: 'Simon Scholz'
tags: ['kotlin', 'jvm', 'extensions']
---

## General kotlin extension functions/methods

Kotlin itself comes with a lot of extension functions to add additional useful methods to general classes provided by the JDK.

Let's have a look at a bunch of examples:

```kotlin

// Java
Optional<String> first = list.stream().map(String::trim).filter(String::isEmpty).findFirst()

// kotlin
val first: String? = list.firstOrNull { it.isBlank() }

```

## Extend custom functions for existing classes

Adding new functions to classes from external libraries usually is not that easy.
In Java you usually have to derive from the class and add additional methods or use composition.
Of course you'd rather use "Composition over inheritance" ;-)

With Kotlin you can easily craft your own custom extension functions to adjust functionalities like we've seen in the former section.

Since we'd all love testing our beautiful code I'd take Wiremock as an example here.
I'd over and over had to write `.withHeader("Content-Type", "application/json")` to add the "Content-Type" header to my response stubs:

```kotlin
WireMock.post(WireMock.urlPathMatching("/v1/my-dependency-api")).willReturn(
    WireMock.aResponse().withStatus(200).withHeader("Content-Type", "application/json")
        .withBody(someJsonResponse))
)
```

This can even lead to undesired errors since there might be typos in the strings. Sure there are frameworks coming up with constants for these Strings, but I'd rather avoid dependencies towards certain libraries/frameworks just for utilizing the constants they provide.

To make this shorter and less error prone a `WiremockExtensions` class like this helps:

```kotlin
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder
import com.github.tomakehurst.wiremock.client.WireMock
import com.github.tomakehurst.wiremock.client.WireMock.aResponse

/**
 * Create a Wiremock response with the header "Content-Type" = "application/json"
 */
fun WireMock.jsonResponse() : ResponseDefinitionBuilder = aResponse().withHeader("Content-Type", "application/json")

/**
 * Adjust the header "Content-Type" = "application/json" to given ResponseDefinitionBuilder
 */
fun ResponseDefinitionBuilder.withJsonContentTypeHeader() : ResponseDefinitionBuilder = withHeader("Content-Type", "application/json")
```

Now the code from above could be written in a shorter manner:

```kotlin
WireMock.post(WireMock.urlPathMatching("/v1/my-dependency-api")).willReturn(
    WireMock.jsonResponse().withStatus(200).withBody(someJsonResponse))
)
```

But even better than adding extension functions to classes of open source libraries is to be awesome and contribute certain features to the open source community in the library itself.
That's also why Wiremock provides certain features in their fluent api since version 2.6.0:

```kotlin
WireMock.post(WireMock.urlPathMatching("/v1/my-dependency-api")).willReturn(WireMock.okJson(someJsonResponse)))
```

Lessons learnt here:

1. Check if you're using the latest stable version of the library being used (Dependabot from GitHub is really helpful here!)
2. Before creating extension functions watch out for existing methods within the library being used
3. In case the library is open source, then try to contribute the functionality to the community. ❤️
4. In case the libraries' maintainers do not want your extension and do not offer a better approach for you, you can utilize these extensions
