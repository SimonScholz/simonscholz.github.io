---
id: "validate-spring-configuration-properties"
path: "/tutorials/validate-spring-configuration-properties"
date: "2023-08-22"
title: "Add validation to @ConfigurationProperties in Spring Boot"
description: "Often configuration properties need to be in a certain shape in order to be used properly. So why not validate them upfront?"
author: "Simon Scholz"
tags: ["kotlin", "jvm", "Spring Boot", "Spring", "Properties", "Config"]
vgWort: ""
---

There are various ways to configure your Spring Boot application.
In many cases the "fail fast" paradigm helps to spot issues early on
and makes problems easier to fix, because you'd show a descriptive error message on what went wrong.#
That's were also validations of configuration properties comes into play.

To find out more about the various ways to inject configuration properties into your classes please check out my other tutorial about configuration properties in Spring Boot: https://simonscholz.github.io/tutorials/spring-configuration-properties
