---
id: "cloud-scheduler-oidc-security-quarkus"
path: "/tutorials/cloud-scheduler-oidc-security-quarkus"
created: "2025-03-15"
updated: "2025-03-15"
title: "GCP Cloud Schduler using OIDC with Quarkus"
description: "Calling Quarkus REST endpoint protected by OIDC triggered by a Cloud Scheduler"
author: "Simon Scholz"
tags: ["quarkus", "gcp", "service account", "oidc", "kotlin", "cloud scheduler", "gradle"]
vgWort: "vg08.met.vgwort.de/na/c5334ae68233484cb31d6c7c432f8baa"
---

This tutorial covers the creation of a GCP Cloud Scheduler using Terraform, which hits an OIDC protected endpoint of a Quarkus application.

## Prerequisites

* Quarkus CLI (optional)
* Quarkus application
  * Quarkus OIDC extension
* Terraform
* Java / Kotlin
* Gradle

## Terraform Setup

My assumption is that an existing Google Cloud project is already being configured by Terraform.
So here I´ll only explain how to setup the service account used to obtain an OIDC token and to setup the Cloud Scheduler itself. 

### Service Account with token permission

```hcl[service_accounts.tf]
# Service Account for the Scheduler
resource "google_service_account" "example_scheduler_sa" {
  account_id   = "example-scheduler-sa"
  display_name = "Example Cloud Scheduler Service Account"
}

# Assign serviceAccountTokenCreator role to example_scheduler_sa
resource "google_project_iam_member" "example_scheduler_token_creator" {
  project = var.project_id
  role    = "roles/iam.serviceAccountTokenCreator"
  member  = "serviceAccount:${google_service_account.example_scheduler_sa.email}"
}
```

### Creating a Cloud Scheduler

```hcl[scheduler.tf]
resource "google_cloud_scheduler_job" "example_scheduler_job" {
  name        = "example-scheduler-job"
  description = "Cloud Scheduler job calling OIDC-protected Quarkus endpoint"
  schedule    = "0 1 * * *" # 1
  time_zone   = "Europe/Berlin"

  http_target {
    uri         = "https://example-backend.gke.${var.environment}.example.io/api/example?country=DE" # 2
    http_method = "POST"
    oidc_token {
      service_account_email = google_service_account.example_scheduler_sa.email # 3
      audience              = "https://example-backend.gke.${var.environment}.example.io" # 4
    }
  }
}
```

1. Define when to run the scheduled job, e.g., every day at 1 am
2. http uri to be called when scheduled job is supposed to be run. The ${var.environment} variable could be defined in a `dev.tfvars` or `prod.tfvars` file, so that we target the right uri depending on the environment.
3. Service account with `serviceAccountTokenCreator` role, which has be created earlier. Used to obtain a token to call the http uri.
4. The `aud` attribute of the token, which will be double checked by the Quarkus application later on.

Once the terraform script is being applied the Cloud Scheduler should appear here:
https://console.cloud.google.com/cloudscheduler

## Quarkus application with OIDC

Now let´s generate the Quarkus application, which provides the OIDC protected `https://example-backend.gke.${var.environment}.example.io/api/example?country=DE` endpoint.

The easiest way to create a Quarkus project locally is using the [Quarkus CLI](https://quarkus.io/guides/cli-tooling#project-creation), which I'd usually install using [SDKMan!](https://simonscholz.dev/tutorials/ubuntu-dev-setup#sdkman).

```bash
quarkus create app dev.simonscholz:cloud-scheduler-oidc --gradle-kotlin-dsl --kotlin --extensions=quarkus-config-yaml,quarkus-rest,quarkus-oidc
```

Alternatively you also can go to https://code.quarkus.io/ to create a new Quarkus project.

Feel free to add any extension you'd like.

### Configure the OIDC extension

The following config will be used to check the authentication based on the bearer token, which will be sent by the cloud scheduler.

```yml[application.yml]
quarkus:
  keycloak:
    devservices:
      enabled: false # 1
  oidc:
    auth-server-url: https://accounts.google.com # 2
    token:
      issuer: https://accounts.google.com # 3
      audience: ${OIDC_AUDIENCE:https://example-backend.gke.dev.example.io} # 4
    application-type: service # 5
```

1. The quarkus-oidc extension usually causes to start a keycloak dev container, which we want to avoid for now.
2. The auth server will be the one from google
3. This auth server will then also issue the OIDC bearer token
4. The audience, which is also part of the bearer token will also be double checked. Also see audience config in terraform above.
5. Explicitly mention the `application-type`, which defaults to `service` anyhow

### Provide the rest endpoint

```kotlin[ExampleResource.kt]
package dev.simonscholz

import io.quarkus.security.Authenticated
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam
import jakarta.ws.rs.core.Response
import org.jboss.logging.Logger

@Path("/api")
class ExampleResource(
    private val logger: Logger,
) {
    @POST
    @Path("/example")
    @Authenticated // 1
    fun example(
        @HeaderParam("Authorization") token: String?, // 2
        @QueryParam("country") country: String?, // 3
    ): Response {
        logger.info { "Authorization $token" } // 4

        CoroutineScope(Dispatchers.IO).launch { // 5
            // call a service and pass country from request
        }

        return Response.accepted().build() // 6
    }
}
```

1. @Authenticated to ensure the check against configured OIDC to only allow authorized access
2. Optionally also obtain Authorization header
3. Sample to depict that query params can be sent using the Cloud Scheduler
4. Just for debugging, do not do this on production
5. Optionally do the actual processing on a dedicated Thread to immediately respond to the cloud scheduler. But there might be situations where you´d also want to reflect a failure on Cloud Scheduler side, so that you also can see failures in the Cloud Scheduler Overview.
6. Respond with 202 Accepted to indicate to the Cloud Scheduler run that everything went well

## Run and Test

For testing purposes you can also impersonate the service account with `serviceAccountTokenCreator` and then obtain a token using gcloud to test the authorization locally.

Alternatively the cloud scheduler can also be run forcefully via the cloud console: 
https://console.cloud.google.com/cloudscheduler

## Sources

- https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_scheduler_job
- https://quarkus.io/guides/security-oidc-configuration-properties-reference
