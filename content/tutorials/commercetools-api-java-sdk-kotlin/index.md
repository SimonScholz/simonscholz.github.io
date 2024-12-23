---
id: "commercetools-api-java-sdk-kotlin"
path: "/tutorials/commercetools-api-java-sdk-kotlin"
created: "2024-12-24"
updated: "2024-12-24"
title: "Using the Commercetools API with the Java SDK"
description: "This tutorial shows examples on how to use the Java SDK of Commercetools to update different domain objects"
author: "Simon Scholz"
tags: ["commercetools", "sdk", "java", "kotlin", "e-commerce"]
vgWort: "vg05.met.vgwort.de/na/c6b3dee365184aba916e4e2f53c447b7"
---

Commercetools is a cloud-based headless commerce platform that provides APIs to handle commerce processes like customer management, order management, product catalogs and many more commerce related properties.

The Commercetools Java SDK overview can be found [here](https://docs.commercetools.com/sdk/jvm-sdk)

## Prerequisites

- Java / Kotlin
- Gradle
- Commercetools Java SDK

## Create a project and adding dependencies

The following command will generate a kotlin application project called `ipp-print`.

```bash
gradle init \
    --type kotlin-application \
    --dsl kotlin \
    --test-framework junit-jupiter \
    --project-name commercetools-example \
    --package dev.simonscholz \
    --no-split-project \
    --no-incubating \
    --java-version 21
```

For other options run `gradle help --task init`.

Now that we have a project in place we can add the required dependencies to it.

First the `libs.versions.toml` file in the `gradle` folder needs to be modified:

```toml[libs.versions.toml]
[versions]
kotlin = "2.1.0"
commercetools = "latest.release"

[libraries]
commercetools-client = { module = "com.commercetools.sdk:commercetools-http-client", version.ref = "commercetools"}
commercetools-api = { module = "com.commercetools.sdk:commercetools-sdk-java-api", version.ref = "commercetools"}

[plugins]
jvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
```

Feel free to leave the existing declarations in the `libs.versions.toml` file as is, but we do not need them for this tutorial.

```kotlin[build.gradle.kts]
dependencies {

    // ... other dependencies ...

    implementation(libs.commercetools.api)
    implementation(libs.commercetools.client)
}
```

For more information on how to use toml files in Gradle please see my other tutorial on this topic: https://simonscholz.dev/tutorials/gradle-toml-version-catalogs

## Creating the general purpose client

Usually you´d add an instance of `ProjectApiRoot` as bean to your application context, e.g. for Spring or Quarkus, but in this tutorial we´ll stick to the basics and therefore simply create a `ProjectApiRootFactory`.

```kotlin[ProjectApiRootFactory.kt]
import com.commercetools.api.client.ProjectApiRoot
import com.commercetools.api.defaultconfig.ApiRootBuilder
import com.commercetools.api.defaultconfig.ServiceRegion

object ProjectApiRootFactory {
    fun commerceToolsProjectApiRoot(
        clientID: String,
        clientSecret: String,
        projectKey: String,
    ): ProjectApiRoot =
        ApiRootBuilder
            .of()
            .defaultClient(
                ClientCredentials
                    .of()
                    .withClientId(clientID)
                    .withClientSecret(clientSecret)
                    .build(),
                ServiceRegion.GCP_EUROPE_WEST1,
            ).build(projectKey)
}
```

Here I´d leave the `ServiceRegion` hard coded as `ServiceRegion.GCP_EUROPE_WEST1`, but feel free to adjust it according to your needs.

## Adding a middleware to log requests and responses (optional)

During the creation of a `ProjectApiRoot` a middleware can be added:

```kotlin[ProjectApiRootFactory.kt]
import com.commercetools.api.client.ProjectApiRoot
import com.commercetools.api.defaultconfig.ApiRootBuilder
import com.commercetools.api.defaultconfig.ServiceRegion
import io.vrap.rmf.base.client.http.Middleware
import io.vrap.rmf.base.client.oauth2.ClientCredentials
import kotlin.text.Charsets.UTF_8

object ProjectApiRootFactory {
    fun commerceToolsProjectApiRoot(
        clientID: String,
        clientSecret: String,
        projectKey: String,
    ): ProjectApiRoot =
        ApiRootBuilder
            .of()
            .defaultClient(
                ClientCredentials
                    .of()
                    .withClientId(clientID)
                    .withClientSecret(clientSecret)
                    .build(),
                ServiceRegion.GCP_EUROPE_WEST1,
            ).addMiddleware(createLoggingMiddleware())
            .build(projectKey)

    private fun createLoggingMiddleware(): Middleware =
        Middleware { request, next ->
            println("Request:")
            println("  URL: ${request.url}")
            println("  Method: ${request.method}")
            request.body?.let {
                println("  Payload: ${it.toString(UTF_8)}")
            }

            next.apply(request).thenApply { response ->
                println("Response:")
                println("  Status Code: ${response.statusCode}")
                response.body?.let {
                    println("  Payload: ${it.toString(UTF_8)}")
                }
                response
            }
        }
}
```

## Creating a CommercetoolsOrderAdapter

To have proper separation of concerns let´s create a `CommercetoolsOrderAdapter` class for updating orders in Commercetools.

In the following code the postal code of the billing address of the order can be updated.

```kotlin[CommercetoolsOrderAdapter.kt]
import com.commercetools.api.client.ProjectApiRoot
import com.commercetools.api.models.order.Order
import com.commercetools.api.models.order.OrderSetBillingAddressAction
import com.commercetools.api.models.order.OrderUpdate
import com.commercetools.api.models.order.OrderUpdateAction

class CommercetoolsOrderAdapter(
    private val apiRoot: ProjectApiRoot,
) {
    fun updateOrderBillingAddressPostalCode(
        orderId: String,
        newPostalCode: String,
    ) {
        val order = order(orderId) // 1

        val addressDraft = // 2
            order.billingAddress
                .toDraftBuilder()
                .postalCode(newPostalCode)
                .build()

        val setBillingAddressAction = // 3
            OrderSetBillingAddressAction
                .builder()
                .address(addressDraft)
                .build()

        executeOrderUpdate(order, listOf(setBillingAddressAction)) // 4
    }

    private fun executeOrderUpdate(
        order: Order,
        orderUpdateActions: List<OrderUpdateAction>,
    ) {
        require(orderUpdateActions.isNotEmpty()) { "orderUpdateActions must not be empty." }

        val orderUpdate =
            OrderUpdate
                .builder()
                .version(order.version)
                .actions(orderUpdateActions.toMutableList())
                .build()

        val response =
            apiRoot
                .orders()
                .withId(order.id)
                .post(orderUpdate)
                .executeBlocking()

        println("Reponse: $response")

        println("Body: ${response.body}")
    }

    private fun order(orderId: String): Order =
        apiRoot
            .orders()
            .withId(orderId)
            .get()
            .executeBlocking()
            .body
}
```

1. Get the latest order object from Commercetools
2. Copy the existing billing address by creating a draft object and only modify the postal code
3. Create an instance of `OrderSetBillingAddressAction`
4. Execute the update on the order using the `ProjectApiRoot`, which has been passed to the constructor

## Run the code

```kotlin[App.kt]
package dev.simonscholz

fun main() {
    val apiRoot =
        ProjectApiRootFactory.commerceToolsProjectApiRoot(
            clientID = "your-client-id",
            clientSecret = "your-client-secret",
            projectKey = "your-project-key",
        )

    val orderAdapter = CommercetoolsOrderAdapter(apiRoot)

    orderAdapter.updateOrderBillingAddressPostalCode("51a570ee-e10a-4ee6-b4d0-94c9bc014bd3", "22415")
}
```

This will then print the response to the console and in case you added the middleware both the request data and response data is printed.

## Exploring the API further

Thanks to the strong typing it is pretty straight forward to find the proper actions, by using content assist and looking at the class hierarchy.

In IntelliJ you can click on the `OrderUpdateAction` and press `CTRL+H` in order to see the subclasses of `OrderUpdateAction` to figure out that specific actions can be applied to an order.
The same logic can be applied to any other `ResourceUpdateAction` like `CartUpdateAction`, `CustomerUpdateAction`, `ProductUpdateAction` or many others.

![Order update action class hierarchy](order-update-action-class-hierarchy.png)

### Resetting values

To reset/remove a certain value it can usually be set to `null` and then send the update.
But be aware that commercetools has a lot of validations when doing API requests and will give insights what failed in the response in case the request causes any problems.

## Using kotlin coroutines

Besides the `executeBlocking()` method the Commercetools SDK also offers an `execute()` method, which returns a `CompletableFuture`.
When adding Kotlin Coroutines as dependency the `CompletableFuture` can be turned into a suspending function using the `await()` extension function.

```toml[libs.versions.toml]
[versions]
kotlin = "2.1.0"
kotlinx-coroutines = "1.10.1" // 1
commercetools = "latest.release"

[libraries]
kotlinx-coroutines = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" } // 2
commercetools-client = { module = "com.commercetools.sdk:commercetools-http-client", version.ref = "commercetools"}
commercetools-api = { module = "com.commercetools.sdk:commercetools-sdk-java-api", version.ref = "commercetools"}

[plugins]
jvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
```

1. Add kotlinx-coroutines version
2. Add `org.jetbrains.kotlinx:kotlinx-coroutines-core` library

```kotlin[build.gradle.kts]
dependencies {

    // ... other dependencies ...

    implementation(libs.kotlinx.coroutines)

    implementation(libs.commercetools.api)
    implementation(libs.commercetools.client)
}
```

After adding the dependency getting an order can be modified as follows:

```kotlin
private suspend fun order(orderId: String): Order = // 1
    apiRoot
        .orders()
        .withId(orderId)
        .get()
        .execute() // 2
        .await() // 3
        .body
```

1. The function needs to have the `suspending` modifier
2. `execute()` returns the `CompletableFuture`
3. `await()` turns the `CompletableFuture` into a suspending function call

Feel free to adjust the rest of the code to be suspending.

## Sources

- https://docs.commercetools.com/docs/
- https://docs.commercetools.com/sdk/jvm-sdk
