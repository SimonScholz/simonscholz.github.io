---
path: '/tutorials/gatling-performance-testing'
date: '2022-04-02'
title: 'Performance testing with Gatling using Gradle and Kotlin'
description: 'Tutorial on how to create a project for Gatling performance testing with Gradle and Kotlin'
author: 'Simon Scholz'
tags: ['kotlin', 'jvm', 'gatling', 'testing', 'performance']
vgWort: 'vg08.met.vgwort.de/na/395304c41e1e46fc92d41791863dc07e'
---

## Start a new project using Gradle

To create a new project the `gradle init` task can be used.

![Run Gradle's init task](./gradle-init.png)

Then you can open the project in IntelliJ and add the gatling source folder. This is necessary because the gatling plugin provides the gatling dependencies for this source set by default. This of course could also be adjusted, but usually it's best to stick to the conventions.

![gatling source folder](./gatling-source-folder.png)

More information on this can be found here: https://gatling.io/docs/gatling/reference/current/extensions/gradle_plugin/

## Creating general classes for performance testing

## Gatling Scenario setup

## Gatling Simulations

## Sources

- https://gatling.io/docs/
- https://gatling.io/docs/gatling/reference/current/extensions/gradle_plugin/
