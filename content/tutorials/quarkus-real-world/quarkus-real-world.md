---
path: '/tutorials/quarkus-real-world'
date: '2020-12-29'
title: 'Create a Warehouse application based on reactive Quarkus'
description: 'Reactive Quarkus real world warehouse application'
author: 'Simon Scholz'
tags: ['Maven', 'Quarkus', 'Reactive', 'Mutiny', 'Real world']
---

# Setup

Make sure that the maven tooling in your IDE is present and install Quarkus IDE extensions/tooling if appropriate.

For example the Eclipse IDE offers Quarkus Tools for this in its marketplace:

![Eclipse marketplace quarkus tooling](./install-quarkus-tooling.png)

Once the tooling is installed Quarkus Project will appear in the New Project wizard.

![New Project Wizard > Quarkus](./quarkus-project-wizard.png)

On the next page choose Maven and call the project quarkus-warehouse.

![New Project Wizard > Maven + Name](./maven-project-wizard.png)

![New Project Wizard > Maven Artifact + rest resource](./maven-artifact-wizard.png)

Then choose the following quarkus extensions and press finish.

![New Project Wizard > Quarkus extensions](./quarkus-extensions-wizard.png)

## Sources

- https://quarkus.io/blog/eclipse-got-quarkused/
