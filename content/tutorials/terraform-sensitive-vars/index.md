---
id: "terraform-sensitive-vars"
path: "/tutorials/terraform-sensitive-vars"
date: "2023-09-31"
title: "Reading .env file and use it for sensitive vars in Terraform"
description: "Terraform can apply env variables prefixed with TF_VAR_, so a bash script reading a .env file is helpful to provide sensitive data"
author: "Simon Scholz"
tags: ["bash", "terraform", "variables", "environment", "devops", "cloud"]
vgWort: "vg06.met.vgwort.de/na/715998ce7e6140ca8adcdba657d44053"
---

In this tutorial, I'll walk you through the process of reading variables from a .env file and using those variables in a Terraform run. This approach can help you manage sensitive or environment-specific configuration values more securely.

## Prerequisites

- Terraform installed on your local machine. (https://developer.hashicorp.com/terraform/downloads)
- A text editor for creating .tf and .env files (e.g., Visual Studio Code, Sublime Text, or any other of your choice).
- Optionally use the [HashiCorp Terraform
](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) VS Code extension.

## Specifying variables in terraform

In the `variables.tf` file the variables of your terraform script are listed:

```hcl [variables.tf]
variable "project_id" {
  type        = string
  description = "Project ID of the Google project"
}

variable "region" {
  type        = string
  description = "The region of your project"
}

variable "zone" {
  type        = string
  description = "The zone of your project"
}

variable "cloud_sql_database_username" {
  type        = string
  description = "Username of the cloud sql database"
  sensitive   = true
}

variable "cloud_sql_database_password" {
  type        = string
  description = "Password of the cloud sql database"
  sensitive   = true
}
```

While the first 3 examples `project_id`, `region` and `zone` are safe to share in a repository, the other two are not.
When setting the `sensitive` property to `true` the contents of this variable will **not** be printed in clear text in none of the outputs or state storage.

Non confidential or non secret values are usually specified in a `terraform.tfvars` file:

```hcl [terraform.tfvars]
project_id = "example-gcp-project"
region     = "europe-west4"
zone       = "europe-west4-b"
```

## Run terraform plan/apply without the variables being specified

When running `terraform plan` or `terraform apply` without specified `cloud_sql_database_username` and `cloud_sql_database_password` variables,
you'll be prompted to enter the values of these variables.
In case you run these commands more often in a row due to errors or for whatever reason this can be really annoying.

## Use an .env file

It is common practice to use an `.env` file to declare certain environment variables.
Usually this `.env` file is added to the `.gitignore` file so that it will not be pushed accidentally to a remote repository.

```bash [.env]
TF_VAR_cloud_sql_database_username=simon
TF_VAR_cloud_sql_database_password=top-secret
```

Note that the `TF_VAR_` prefix is crucial to let terraform pick up these environment variables.

## Bash script to apply properties from .env file

```bash [terraform-apply.sh]
#!/bin/bash

# The properties in the .env file must be prefixed with TF_VAR_ so that Terraform picks them up.

# Load environment variables from .env file
if [ -f .env ]; then
  set -a
  . .env
else
  echo "Error: .env file not found."
  exit 1
fi

terraform fmt
terraform apply
```

- `-a` flag specifies the following: "Mark variables which are modified or created for export."
- `.` then reads the `.env` file and exports the variables defined in it for the local shell.
- `terraform fmt` comes in handy to always format the `.tf` files properly
- `terraform apply` applies the instructions of the terraform scripts

Besides applying `terraform plan` can be used in another script file:

```bash [terraform-plan.sh]
#!/bin/bash

# The properties in the .env file must be prefixed with TF_VAR_ so that Terraform picks them up.

# Load environment variables from .env file
if [ -f .env ]; then
  set -a
  . .env
else
  echo "Error: .env file not found."
  exit 1
fi

terraform fmt
terraform plan
```

Do not forget to do a `terraform init` for the very first time.

To make the scripts runnable usually `chmod +x` is needed:

```bash
chmod +x terraform-apply.sh

chmod +x terraform-plan.sh
```

Wish you happy "terraforming" without repetitive entering of data in the prompts. ;)

## Automatically generate a .env.example file (optional)

It it convenient for others if you provide an `.env.example` file, which is checked into version control.
With that in place one can simply remove the `.exmaple` from the file name and add the secrets.

Therefore we add the following to the bash scripts:

```bash [terraform-apply.sh]
#!/bin/bash

# The properties in the .env file must be prefixed with TF_VAR_ so that Terraform picks them up.

if [ -f .env ]; then
  # Load environment variables from .env file
  set -a
  . .env

  # remove existing example file
  rm -f .env.example

  # write all keys to the .env.example file
  while IFS='=' read -r key value || [[ -n "$value" ]]
  do
      echo "$key=" >> .env.example
  done < .env
else
  echo "Error: .env file not found."
  exit 1
fi

terraform fmt
terraform apply
```

The resulting `.env.example` file might look like this:

```bash [.env.example]
TF_VAR_cloud_sql_database_username=
TF_VAR_cloud_sql_database_password=
```

## Make script more generic with variables (optional)

Instead of repeating `.env` and `.env.example` everywhere we might want to use variables.
This would make it easier to change the file name:

```bash [terraform-apply.sh]
#!/bin/bash

# The properties in the .env file must be prefixed with TF_VAR_ so that Terraform picks them up.

file=".env"
example=".env.example"

if [ -f "$file" ]; then
  # Load environment variables from .env file
  set -a
  . "$file"

  # remove existing example file
  rm -f "$example"

  # write all keys to the .env.example file
  while IFS='=' read -r key value || [[ -n "$value" ]]
  do
      echo "$key=" >> "$example"
  done < "$file"
else
  echo "Error: '$file' file not found."
  exit 1
fi

terraform fmt
terraform apply
```

## Other strategies

Of course there are also other (mostly commercial) options to work with sensitive data in terraform, e.g., KMS from Google or AWS etc, which are worth looking at.

Or you can have a look at [Terraform Enterprise](https://developer.hashicorp.com/terraform/enterprise), which I'd consider the most sophisticated solution.
