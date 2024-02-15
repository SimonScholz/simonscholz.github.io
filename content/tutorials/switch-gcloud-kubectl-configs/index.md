---
id: "switch-gcloud-kubectl-configs"
path: "/tutorials/switch-gcloud-kubectl-configs"
created: "2023-12-20"
updated: "2023-12-20"
title: "Easily switch gcloud config and kubectl context"
description: "Switching both gcloud and kubectl config at once via command line"
author: "Simon Scholz"
tags: ["gke", "kubernetes", "gcloud", "tool", "cli", "kubectl", "bash"]
vgWort: "vg07.met.vgwort.de/na/b04c627883b44b4fa1d2b1f7c55d75a0"
---

In this tutorial, we'll guide you through setting up gcloud configurations and managing kubectl contexts to simplify the management of Google Cloud resources and Kubernetes clusters. This will enable you to easily switch between different environments or projects.

## Prerequisites

Before you begin, ensure you have the following:

- Google Cloud SDK (gcloud): Install it from [Google Cloud SDK Installation](https://cloud.google.com/sdk/docs/install).
- Kubernetes (kubectl): Install kubectl following the instructions at [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
- Two different gcp projects are being used, e.g., dev and prod.

## Authenticate with Google Cloud

Open a terminal and run the following command to authenticate with your Google Cloud account:

```bash
gcloud auth login
```

Follow the on-screen prompts to log in with your Google account and grant necessary permissions.

## Configure kubectl with Google Cloud

To configure kubectl to use your GKE cluster, run the following command:

```bash
gcloud container clusters get-credentials CLUSTER_NAME --zone ZONE --project PROJECT_ID
```

Replace the placeholders with your specific cluster information:

- CLUSTER_NAME: The name of your GKE cluster.
- ZONE: The Google Cloud zone where your cluster is located, e.g., europe-west1.
- PROJECT_ID: Your Google Cloud Project ID.

You can verify if `kubectl` is properly configured by looking at the contexts:

```bash
kubectl config get-contexts
```

You should see a list of available contexts, with an asterisk (*) next to the current one.
The context should correspond to your GKE cluster.

## Create gcloud Configurations

Before we proceed, let's create gcloud configurations for your development and production environments.

Before we proceed let's have a look at all currently available configurations:

```bash
gcloud config configurations list
```

By default only the `default` configuration is present, which is sufficient when only working with one project:

```bash
NAME     IS_ACTIVE  ACCOUNT            PROJECT          COMPUTE_DEFAULT_ZONE  COMPUTE_DEFAULT_REGION
default  True       simon@example.com  YOUR_PROJECT_ID  europe-west1-b        europe-west1
```

### Create dev-config

```bash
gcloud config configurations create dev-config
gcloud config set account YOUR_DEV_ACCOUNT # e.g. simon@example.com
gcloud config set project YOUR_DEV_PROJECT_ID
gcloud config set compute/zone YOUR_DEV_COMPUTE_ZONE
gcloud config set compute/region YOUR_DEV_COMPUTE_REGION
# Configure other properties as needed
```

Replace `YOUR_DEV_PROJECT_ID` and `YOUR_DEV_COMPUTE_ZONE` with the appropriate values for your development environment. Configure other properties, such as credentials or region, as needed for your use case.

### Create prod-config

```bash
gcloud config configurations create prod-config
gcloud config set account YOUR_PROD_ACCOUNT # e.g. simon@example.com
gcloud config set project YOUR_PROD_PROJECT_ID
gcloud config set compute/zone YOUR_PROD_COMPUTE_ZONE
gcloud config set compute/region YOUR_PROD_COMPUTE_REGION
# Configure other properties as needed
```

Replace `YOUR_PROD_PROJECT_ID` and `YOUR_PROD_COMPUTE_ZONE` with the appropriate values for your production environment. Configure other properties as needed.

After this has been done running `gcloud config configurations list` should result in something similar to this:

```bash
NAME         IS_ACTIVE  ACCOUNT              PROJECT            COMPUTE_DEFAULT_ZONE  COMPUTE_DEFAULT_REGION
default      False      simon@example.com    YOUR_PROJECT_ID    europe-west1-b        europe-west1
dev-config   False      simon@example.com    YOUR_PROJECT_ID    europe-west1-b        europe-west1
prod-config  True       simon@example.com    YOUR_PROJECT_ID    europe-west1-b        europe-west1
```

## Renaming k8s context name (optional)

Usually the k8s context names are pretty long by default.
But you can change this by navigating to `~/.kube/config`:

The `config` file uses yaml to define certain properties.
And one property is the `name`:

```yaml [~/.kube/config]
contexts:
- context:
    cluster: gke_your-dev-project_europe-west1_your-dev-project-autopilot-cluster
    user: gke_your-dev-project_europe-west1_your-dev-project-autopilot-cluster
  name: gke_dev
- context:
    cluster: gke_your-dev-project_europe-west1_your-dev-project-autopilot-cluster
    user: gke_your-dev-project_europe-west1_your-dev-project-autopilot-cluster
  name: gke_prod
```

`gke_dev` and `gke_prod` are way shorter names than the default used to be.

Be sure to configure kubectl for your development and production gcp project as described in the previous section: [Configure kubectl with Google Cloud](https://simonscholz.github.io/tutorials/switch-gcloud-kubectl-configs#configure-kubectl-with-google-cloud)

## Alias for switching both, gcloud and kubectl

To simplify context switching and ensure that both gcloud and kubectl are using the correct configurations, you can create aliases that activate the appropriate Google Cloud configuration and switch the kubectl context simultaneously.

Open your shell configuration file (e.g., ~/.bashrc or ~/.zshrc) and add alias commands for your contexts:

```bash [~/.bashrc]
# Example aliases for gcloud and kubectl context switching
alias switch-dev='gcloud config configurations activate dev-config && kubectl config use-context gke_dev'
alias switch-prod='gcloud config configurations activate prod-config && kubectl config use-context gke_prod'
```

`gke_prod` or `gke_prod` can be substituted with the appropriate value for your development and production environments.

After saving your configuration file, you can use these aliases to switch both gcloud configurations and kubectl contexts easily:

```bash
switch-dev  # Switch to the "dev" environment
switch-prod # Switch to the "prod" environment
```

Now, when you run switch-dev, it will activate the dev-config for gcloud, configure kubectl for the development cluster, and set the appropriate kubectl context.
This ensures that both gcloud and kubectl are using the appropriate configurations for your desired environment.

With these steps, you have a complete setup for easily switching between different gcloud configurations and kubectl contexts for different environments.

## Using a function instead of an alias

If you're dealing with a lot of different projects and contexts, then maintaining a lot of `alias` in your shell might be cumbersome.
Then using a function might be easier:

```bash [~/.bashrc]
function switch() {
  gcloud config configurations activate $1-config
  kubectl config use-context gke_$1
}
```

Now running `switch prod` will switch to prod and `switch dev` will switch to dev.

## Sources

- https://cloud.google.com/sdk/docs/configurations
- https://kubernetes.io/docs/reference/kubectl/cheatsheet/
