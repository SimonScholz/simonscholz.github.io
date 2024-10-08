---
id: "spring-quarkus-google-pubsub"
path: "/tutorials/spring-quarkus-google-pubsub"
created: "2023-11-11"
updated: "2024-08-21"
title: "Google Cloud Pub/Sub (emulator) with Spring Boot and Quarkus"
description: "Make use of the Google Cloud Pub/Sub (emulator) with Spring Boot and Quarkus"
author: "Simon Scholz"
tags: ["kotlin", "jvm", "Spring Boot", "Spring", "Quarkus", "Google Cloud", "Pub/Sub", "PubSub"]
vgWort: "vg09.met.vgwort.de/na/6f076d8ae6c94cabb754f02cab413c70"
---

In this tutorial, we'll learn how to use the Google Cloud Pub/Sub with Spring Boot and Quarkus.

Google Cloud Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications. It is a scalable, durable, and highly available messaging service that can be used to decouple applications and components deployed on Google Cloud.

## Prerequisites

- JDK
- Kotlin
- Spring Boot
- Quarkus
- Gradle
- Docker and Docker Compose
- An Integrated Development Environment (IDE) such as IntelliJ IDEA or Eclipse or VS Code

## Run the Google Cloud Pub/Sub Emulator

To run the Google Cloud Pub/Sub Emulator, you can use the following Docker Compose file:

```yaml [docker-compose.yml]
version: '3.9'

services:
  
  pubsub-emulator:
    image: gcr.io/google.com/cloudsdktool/cloud-sdk:488.0.0-emulators
    container_name: pubsub-emulator
    ports:
      - "8685:8685"
    volumes:
      - ./init-pubsub.sh:/init-pubsub.sh
    entrypoint: ["/init-pubsub.sh"]
    restart: always
```

The `init-pubsub.sh` script is used to start the emulator, create a topic and a subscription:

```bash [init-pubsub.sh]
#!/bin/sh

# Start the Pub/Sub emulator
gcloud beta emulators pubsub start --host-port 0.0.0.0:8685 --project=sample-project-id &

# Wait for the emulator to start (adjust sleep time as needed)
sleep 5

# Create Pub/Sub topics
curl -s -X PUT 'http://0.0.0.0:8685/v1/projects/sample-project-id/topics/event-topic'

curl -s -X PUT 'http://0.0.0.0:8685/v1/projects/sample-project-id/topics/json-topic'

# Create Pub/Sub subscriptions
curl -s -X PUT 'http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions/event-topic-sub' \
    -H 'Content-Type: application/json' \
    --data '{"topic":"projects/sample-project-id/topics/event-topic"}'

curl -s -X PUT 'http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions/json-topic-sub' \
    -H 'Content-Type: application/json' \
    --data '{"topic":"projects/sample-project-id/topics/json-topic"}'

# Keep the script running to keep the container alive
tail -f /dev/null
```

Make sure that the `init-pubsub.sh` script is executable:

```bash
chmod +x init-pubsub.sh
```

The `&` at the end of the emulator start command is used to run the emulator in the background. The `tail -f /dev/null` command is used to keep the container alive.

Check if topics and subscriptions were created successfully:

```bash
curl -X GET 'http://0.0.0.0:8685/v1/projects/sample-project-id/topics'

curl -X GET 'http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions'
```

## Publish to a Google Cloud Pub/Sub Topic

To publish to a Google Cloud Pub/Sub topic, you can use the following `curl` command:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/topics/event-topic:publish" \
-H "Content-Type: application/json" \
-d '{
  "messages": [
    {
      "attributes": {
        "DOMAIN_OBJECT_ID": "12345",
        "anotherKey": "anotherValue"
      }
    }
  ]
}'
```

Or using json data:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/topics/json-topic:publish" \
-H "Content-Type: application/json" \
-d '{
  "messages": [
    {
      "attributes": {
        "DOMAIN_OBJECT_ID": "12345",
        "anotherKey": "anotherValue"
      },
      "data": "eyJpZCI6ICIxMjM0NSIsICJtZXNzYWdlIjogIkpvaG4gRG9lIn0="
    }
  ]
}'
```

The actual json data is `{"DOMAIN_OBJECT_ID": "12345", "name": "John Doe"}`, but it must be base64 encoded.
Also see [Publishing json message to PubSub](https://cloud.google.com/knowledge/kb/publishing-json-message-to-pub-sub-topic-fails-with-400-bad-request-error-000004171)

The first example does not use the `data` property, since it is optional. 
You'll have to use at least one property in `attributes` or `data` or both.

Later, we'll use a Spring Boot application and a Quarkus application to publish to a Google Cloud Pub/Sub topic.

## Pull from a Google Cloud Pub/Sub Subscription

To pull from a Google Cloud Pub/Sub subscription, you can use the following `curl` command:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions/event-topic-sub:pull" \
-H "Content-Type: application/json" \
-d '{
  "maxMessages": 10
}'
```

Or from the `user-created-json-topic` subscription:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions/json-topic-sub:pull" \
-H "Content-Type: application/json" \
-d '{
  "maxMessages": 10
}'
```

When the message is only pulled, PubSub will keep the message, unless it is `acked`.
The return value of a pull should look similar to this:

```json
{
  "receivedMessages": [{
    "ackId": "projects/sample-project-id/subscriptions/json-topic-sub:1",
    "message": {
      "attributes": {
        "DOMAIN_OBJECT_ID": "12345",
        "anotherKey": "anotherValue"
      },
      "messageId": "1",
      "publishTime": "2023-11-07T23:04:40.028Z"
    }
  }]
}
```

You can acknowledge these messages by using the given `ackId` and calling the following:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/subscriptions/json-topic-sub:acknowledge" \
-H "Content-Type: application/json" \
-d '{
  "ackIds": [
    "projects/sample-project-id/subscriptions/json-topic-sub:1"
  ]
}'
```

Later, we'll use a Spring Boot application and a Quarkus application to pull from a Google Cloud Pub/Sub subscription.

## Spring Boot Project

Start by creating a new Spring Boot project. You can use the Spring Initializer (https://start.spring.io/) or your IDE to generate a new project.

![Spring Initializr](./spring-initializr.png)

You just need to make sure to add the following dependencies:

```kotlin [build.gradle.kts]
implementation("org.springframework.boot:spring-boot-starter-integration")
implementation("com.google.cloud:spring-cloud-gcp-starter-pubsub")

// optional, but helpful to use rest to test publishing
implementation("org.springframework.boot:spring-boot-starter-webflux")
```

### Configure Application Properties

In the `application.properties` or `application.yml` file we need to configure the Google Cloud Pub/Sub project ID and the Google Cloud Pub/Sub emulator host:

```yaml [application.yml]
---
spring:
  cloud:
    gcp:
      project-id: sample-project-id
      pubsub:
        emulator-host: "localhost:8685"
```

### General GCP Configuration

To configure the Google Cloud project ID and credentials, we need to create a `@Configuration` like this:

```kotlin [GcpConfig.kt]
package dev.simonscholz.pubsub.config

import com.google.api.gax.core.CredentialsProvider
import com.google.api.gax.core.NoCredentialsProvider
import com.google.cloud.spring.core.GcpProjectIdProvider
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GcpConfig {
    @Bean
    fun projectIdProvider(
        @Value("\${spring.cloud.gcp.project-id}") projectId: String?,
    ): GcpProjectIdProvider {
        return GcpProjectIdProvider { projectId }
    }

    @Bean
    fun credentialsProvider(): CredentialsProvider {
        return NoCredentialsProvider.create()
    }
}
```

Of course this only applies for the use of the Google Cloud Pub/Sub emulator.
If you want to use the Google Cloud Pub/Sub in production, you can configure the Google Cloud project ID and credentials differently.
On how to do this with secrets, environment variables and terraform see later sections of this tutorial.

### Subscribe to a Google Cloud Pub/Sub Topic

To subscribe to a Google Cloud Pub/Sub topic, we need to create a `@Configuration` like this:

```kotlin [PubSubConfig.kt]
package dev.simonscholz.pubsub

import com.google.cloud.spring.pubsub.core.PubSubTemplate
import com.google.cloud.spring.pubsub.integration.AckMode
import com.google.cloud.spring.pubsub.integration.inbound.PubSubInboundChannelAdapter
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.integration.channel.DirectChannel
import org.springframework.messaging.MessageChannel


@Configuration
class PubSubConfig {

    @Bean
    fun messageChannelAdapter(
        @Qualifier("pubsubInputChannel") inputChannel: MessageChannel,
        pubSubTemplate: PubSubTemplate,
    ): PubSubInboundChannelAdapter =
        PubSubInboundChannelAdapter(pubSubTemplate, "json-topic-sub").apply {
            outputChannel = inputChannel
            setAckMode(AckMode.MANUAL)
        }

    @Bean
    fun pubsubInputChannel(): MessageChannel = DirectChannel()
}
```

When having the `PubSubInboundChannelAdapter` bean and `MessageChannel` bean, the `@ServiceActivator` bean will be called when a message arrives.

There are many different ways to use a `@ServiceActivator`, the following examples will illustrate some of them.

#### Using a MessageHandler bean

You can use a `MessageHandler` instance to subscribe to a Google Cloud Pub/Sub topic:

```kotlin [PubSubConfig.kt]
package dev.simonscholz.pubsub

import com.google.cloud.spring.pubsub.core.PubSubTemplate
import com.google.cloud.spring.pubsub.integration.AckMode
import com.google.cloud.spring.pubsub.integration.inbound.PubSubInboundChannelAdapter
import com.google.cloud.spring.pubsub.support.BasicAcknowledgeablePubsubMessage
import com.google.cloud.spring.pubsub.support.GcpPubSubHeaders
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.integration.annotation.ServiceActivator
import org.springframework.integration.channel.DirectChannel
import org.springframework.messaging.MessageChannel
import org.springframework.messaging.MessageHandler


@Configuration
class PubSubConfig {

    @Bean
    fun messageChannelAdapter(
        @Qualifier("pubsubInputChannel") inputChannel: MessageChannel,
        pubSubTemplate: PubSubTemplate,
    ): PubSubInboundChannelAdapter =
        PubSubInboundChannelAdapter(pubSubTemplate, "json-topic-sub").apply {
            outputChannel = inputChannel
            setAckMode(AckMode.MANUAL)
        }

    @Bean
    fun pubsubInputChannel(): MessageChannel = DirectChannel()

    @Bean
    @ServiceActivator(inputChannel = "pubsubInputChannel")
    fun messageReceiver(): MessageHandler =
        MessageHandler { message ->
            LOGGER.info("Message arrived! Payload: ${String((message.payload as ByteArray))}")
            LOGGER.info("Headers: ${message.headers}")
            val originalMessage: BasicAcknowledgeablePubsubMessage? = message.headers.get(GcpPubSubHeaders.ORIGINAL_MESSAGE, BasicAcknowledgeablePubsubMessage::class.java)
            LOGGER.info("Data: ${originalMessage?.pubsubMessage?.data?.toStringUtf8()}")
            LOGGER.info("Attributes: ${originalMessage?.pubsubMessage?.attributesMap}")
            originalMessage?.ack()
        }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(PubSubConfig::class.java)
    }
}
```

#### Using a `@ServiceActivator` with `@Payload` and `@Header` annotations

You can use a `@ServiceActivator` with `@Payload` and `@Header` annotations to subscribe to a Google Cloud Pub/Sub topic:

```kotlin [Receiver.kt]
package dev.simonscholz.pubsub

import com.google.cloud.spring.pubsub.support.BasicAcknowledgeablePubsubMessage
import com.google.cloud.spring.pubsub.support.GcpPubSubHeaders
import org.slf4j.LoggerFactory
import org.springframework.integration.annotation.ServiceActivator
import org.springframework.messaging.handler.annotation.Header
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.stereotype.Component

@Component
class Receiver {

    @ServiceActivator(inputChannel = "pubsubInputChannel")
    fun messageReceiver(
        @Header(GcpPubSubHeaders.ORIGINAL_MESSAGE) message: BasicAcknowledgeablePubsubMessage,
        @Header("DOMAIN_OBJECT_ID") domainObjectId: String,
        @Payload payload: String,
    ) {
        LOGGER.info("Message arrived! ORIGINAL_MESSAGE: $message")
        LOGGER.info("DOMAIN_OBJECT_ID: $domainObjectId")
        LOGGER.info("Payload: $payload")
        message.ack()
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Receiver::class.java)
    }
}
```

It is convenient to use the `@Header` and `@Payload` annotations to obtain the message payload and headers.
There this is my preferred way to use the `@ServiceActivator` annotation.

#### Just obtain the message payload

You can even just obtain the message payload in the `@ServiceActivator` method:

```kotlin [Receiver.kt]
package dev.simonscholz.pubsub

import org.slf4j.LoggerFactory
import org.springframework.integration.annotation.ServiceActivator
import org.springframework.stereotype.Component

@Component
class Receiver {

    @ServiceActivator(inputChannel = "pubsubInputChannel")
    fun messageReceiver(payload: String) {
        LOGGER.info("Message arrived! Payload: $payload")
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Receiver::class.java)
    }
}
```

This is less explicit, but it is possible to obtain the message payload directly without using the `@Header` and `@Payload` annotations.

### Test the Subscription

To test the subscription, you can use the following `curl` command:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/topics/json-topic:publish" -H "Content-Type: application/json" -d '{
  "messages": [
    {
      "attributes": {
        "DOMAIN_OBJECT_ID": "12345",
        "anotherKey": "anotherValue"
      },
      "data": "eyJpZCI6ICIxMjM0NSIsICJtZXNzYWdlIjogIkpvaG4gRG9lIn0="
    }
  ]
}'
```

Watch the logs of the Spring Boot application to see the message being received.

### Publish to a Google Cloud Pub/Sub Topic

The `PubSubConfig` can be adjusted to also provide a `MessageHandler` instance for outgoing messages:

```kotlin [PubSubConfig.kt]
  
  // ... other existing code

  @Bean
  @ServiceActivator(inputChannel = "pubsubOutputChannel")
  fun messageSender(pubsubTemplate: PubSubTemplate): MessageHandler {
      return PubSubMessageHandler(pubsubTemplate, "json-topic")
  }
```

This `pubsubOutputChannel` can then be used by a `MessagingGateway` interface:

```kotlin [PubsubOutboundGateway.kt]
package dev.simonscholz.pubsub

import org.springframework.integration.annotation.MessagingGateway
import org.springframework.messaging.handler.annotation.Header

@MessagingGateway(defaultRequestChannel = "pubsubOutputChannel")
interface PubsubOutboundGateway {
    fun sendToPubsub(text: String, @Header("DOMAIN_OBJECT_ID") domainObjectId: String)
}
```

Note that instead of using plain text and `@Header` domainObjectId as parameters, you can also use a `import org.springframework.messaging.Message` object as parameter to get more fine grained control over the message being sent.

The `PubsubOutboundGateway` can then be injected into a `@Service` or `@RestController`, so that it can be used to send messages to the Google Cloud Pub/Sub topic:

```kotlin [SampleRestController.kt]
package dev.simonscholz.pubsub

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SampleRestController(
    private val pubsubOutboundGateway: PubsubOutboundGateway,
) {

    @PostMapping("/send")
    fun sendToPubsub() {
        pubsubOutboundGateway.sendToPubsub(
            text = "{\"DOMAIN_OBJECT_ID\": \"12345\", \"name\": \"John Doe\"}",
            domainObjectId = "12345"
        )
    }
}
```

The following `curl` command can be used to test the `SampleRestController`:

```bash
curl -X POST -H "Content-Type: application/json" --data '{"DOMAIN_OBJECT_ID": "12345", "name": "John Doe"}' http://localhost:8080/send
```

This will then send a message to the Google Cloud Pub/Sub topic and the former created `@ServiceActivator` will receive the message.

### Using low level Google Cloud Pub/Sub API

If you want to use the low level Google Cloud Pub/Sub API, you can use the `PubSubTemplate` bean to publish messages to a Google Cloud Pub/Sub topic:

```kotlin [Publisher.kt]
package dev.simonscholz.pubsub

import com.google.api.core.ApiFutureCallback
import com.google.api.core.ApiFutures
import com.google.api.gax.core.CredentialsProvider
import com.google.api.gax.rpc.TransportChannelProvider
import com.google.cloud.pubsub.v1.Publisher
import com.google.cloud.spring.core.GcpProjectIdProvider
import com.google.common.util.concurrent.MoreExecutors
import com.google.pubsub.v1.ProjectTopicName
import com.google.pubsub.v1.PubsubMessage
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class Publisher(
    gcpProjectIdProvider: GcpProjectIdProvider,
    credentialsProvider: CredentialsProvider,
    publisherTransportChannelProvider: TransportChannelProvider,
) {

    private val publisher = Publisher.newBuilder(
        ProjectTopicName.ofProjectTopicName(
            gcpProjectIdProvider.projectId,
            "json-topic",
        )
    )
        .setChannelProvider(publisherTransportChannelProvider)
        .setCredentialsProvider(credentialsProvider)
        .build()

    fun publishUserCreated() {
        val pubsubMessage = PubsubMessage.newBuilder()
            .putAttributes("DOMAIN_OBJECT_ID", "12345")
            .setData(ByteString.copyFrom("{\"DOMAIN_OBJECT_ID\": \"12345\", \"name\": \"John Doe\"}".toByteArray()))
            .build()

        val apiFuture = publisher.publish(pubsubMessage)
        ApiFutures.addCallback(
            apiFuture,
            object : ApiFutureCallback<String?> {
                override fun onFailure(throwable: Throwable) {
                    LOGGER.error("Error publishing user created event: $pubsubMessage", throwable)
                }

                override fun onSuccess(messageId: String?) {
                    LOGGER.trace("Published user created event, messageId: $messageId, PubSub-Message: $pubsubMessage")
                }
            },
            MoreExecutors.directExecutor(),
        )
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Publisher::class.java)
    }
}
```

## Quarkus Project

Start by creating a new Quarkus project. You can use the Quarkus Initializer (https://code.quarkus.io/) or your IDE to generate a new project.

![Quarkus Code Generator](./code-quarkus-generator.png)

This will then have the following dependencies in your `build.gradle.kts` file:

```kotlin [build.gradle.kts]
dependencies {
    implementation(enforcedPlatform("${quarkusPlatformGroupId}:${quarkusPlatformArtifactId}:${quarkusPlatformVersion}"))
    implementation(enforcedPlatform("${quarkusPlatformGroupId}:quarkus-google-cloud-services-bom:${quarkusPlatformVersion}"))
    implementation("io.quarkus:quarkus-kotlin")
    implementation("io.quarkiverse.googlecloudservices:quarkus-google-cloud-pubsub")
    implementation("io.quarkus:quarkus-config-yaml")
    implementation("io.quarkus:quarkus-rest-kotlin-serialization")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.quarkus:quarkus-arc")
    implementation("io.quarkus:quarkus-rest")
    implementation("dev.oshai:kotlin-logging-jvm:7.0.0")
    testImplementation("io.quarkus:quarkus-junit5")
    testImplementation("io.rest-assured:rest-assured")
}
```

NOTE: I´ve added `implementation("dev.oshai:kotlin-logging-jvm:7.0.0")` to also have logging in place.

### Creating the model dto class

In order to pass around data let´s reuse the `Event` class from the Spring Boot example:

```kotlin [Event.kt]
package dev.simonscholz.model

data class Event(val id: String, val message: String)
```

### Creating an event handler

In order to have proper separation of concerns, let´s create a dedicated `UserEventHandler` class:

```kotlin [UserEventHandler.kt]
package dev.simonscholz

import dev.simonscholz.model.Event
import dev.oshai.kotlinlogging.KotlinLogging
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class UserEventHandler {
    private val logger = KotlinLogging.logger {}

    fun handleUserEvent(event: Event) {
        logger.info { "Event: $event" }
    }
}
```

### application.yml adjustments and .env

By default all google cloud extensions provided by quarkus share the `quarkus.google.cloud.project-id` property and can utilize this under the hood.
Also see https://docs.quarkiverse.io/quarkus-google-cloud-services/main/index.html

```yaml [application.yml]
quarkus:
  google:
    cloud:
      project-id: ${GCP_PROJECT_ID}

pubsub:
  user:
    subscription-id: ${PUBSUB_USER_SUBSCRIPTION_ID}
```

The `pubsub.user.subscription-id` is a custom property in order to declaratively define the desired subscription-id.

In the root folder of the project a `.env` file can be created and provide the `GCP_PROJECT_ID` and `PUBSUB_USER_SUBSCRIPTION_ID` environment variables.

```shell [.env]
GCP_PROJECT_ID=sample-project-id
PUBSUB_USER_SUBSCRIPTION_ID=json-topic-sub
```

### Start subscribing with QuarkusPubSub

In order to initialize the PubSub subscription the startup event is observed:

```kotlin [PubSubInitializer.kt]
package dev.simonscholz

import com.google.cloud.pubsub.v1.AckReplyConsumer
import com.google.cloud.pubsub.v1.MessageReceiver
import com.google.cloud.pubsub.v1.Subscriber
import com.google.pubsub.v1.PubsubMessage
import dev.simonscholz.model.Event
import dev.oshai.kotlinlogging.KotlinLogging
import io.quarkiverse.googlecloudservices.pubsub.QuarkusPubSub
import io.quarkus.runtime.ShutdownEvent
import io.quarkus.runtime.StartupEvent
import jakarta.enterprise.event.Observes
import jakarta.inject.Singleton
import kotlinx.serialization.json.Json
import org.eclipse.microprofile.config.inject.ConfigProperty

@Singleton
class PubSubInitializer(
    private val userEventHandler: UserEventHandler,
    private val quarkusPubSub: QuarkusPubSub,
    @ConfigProperty(name = "pubsub.user.subscription-id")
    private val gcpSubscriptionId: String,
) {
    private val logger = KotlinLogging.logger {}

    private lateinit var subscriber: Subscriber

    fun onStart(@Observes ev: StartupEvent) {
        val receiver = MessageReceiver { message: PubsubMessage, consumer: AckReplyConsumer ->
            runCatching {
                logger.debug { "Data: " + message.data.toStringUtf8() }
                logger.debug { "Attributes: " + message.attributesMap }
                val eventObject = Json.decodeFromString<Event>(message.data.toStringUtf8())
                logger.debug { "event: $eventObject" }
                userEventHandler.handleUserEvent(eventObject)
            }.onSuccess {
                consumer.ack()
                logger.debug { "Successfully processed pubsub event ${message.messageId}" }
            }.onFailure {
                logger.error(it) { "Failed to process pubsub event ${message.messageId}. Message data: ${message.data.toStringUtf8()}" }
                consumer.nack()
            }
        }

        runCatching {
            subscriber = quarkusPubSub.subscriber(gcpSubscriptionId, receiver)
            subscriber.startAsync().awaitRunning()
        }.onFailure {
            logger.error(it) { "Subscribing to $gcpSubscriptionId failed." }
        }
    }

    fun onShutdown(@Observes ev: ShutdownEvent) {
        subscriber.stopAsync()
    }
}
```

Here the `UserEventHandler`, `QuarkusPubSub` and the `gcpSubscriptionId` is injected.

Within the onStart method a `MessageReceiver` instance is created, which will receive the `PubsubMessage` and `AckReplyConsumer`.

The `PubsubMessage` consists of the data being send and Kotlinx Serialization is being used to parse the json object, which is then passed to the `UserEventHandler`, which is supposed to cover the business logic of handling the event.

If this is successful the `AckReplyConsumer` can be used to `ack` the massage.

On failure the `nack` function of the `AckReplyConsumer` is called, which indicates an error,
which will then usually trigger Google PubSub to retry delivering the message.
The allowed amount of `nacks` can be individually configured and even a dead letter queue can be added for massages, that cannot be delivered for later recovery. Sometimes it is also applicable to just also `ack` on failure and by that kind of "throw away" the message.

### Send a message and let the Quarkus app consume it

Like in the Spring Example from above the same `curl` can be used:

```bash
curl -X POST "http://0.0.0.0:8685/v1/projects/sample-project-id/topics/json-topic:publish" \
-H "Content-Type: application/json" \
-d '{
  "messages": [
    {
      "attributes": {
        "DOMAIN_OBJECT_ID": "12345",
        "anotherKey": "anotherValue"
      },
      "data": "eyJpZCI6ICIxMjM0NSIsICJtZXNzYWdlIjogIkpvaG4gRG9lIn0="
    }
  ]
}'
```

This should then log the message data and attributes.

## Putting it all together

Please feel free to play around and let the Spring app send messages to the Quarkus app and the other way round.

## Sources

- https://cloud.google.com/pubsub/docs/publisher#rest
- https://cloud.google.com/pubsub/docs/emulator
- https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics
- https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions
- https://spring.io/guides/gs/messaging-gcp-pubsub/
- https://docs.quarkiverse.io/quarkus-google-cloud-services/main/pubsub.html
