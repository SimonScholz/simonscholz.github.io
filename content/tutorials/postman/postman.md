---
path: '/tutorials/postman'
date: '2022-05-14'
title: 'Usage of the Postman rest client'
description: 'This tutorial is supposed to guide you through the usage and configuration of the Postman rest client user interface'
author: 'Simon Scholz'
tags: ['postman', 'rest-client', 'newman']
vgWort: 'vg05.met.vgwort.de/na/051f9c6c291a4229a93dd5863e3845bc'
---

Postman (https://www.postman.com/) is a great tool with a user interface for testing your REST apis.
It uses so called "Collections", which usually consist of several requests.
These collections can also be exported and imported and even different formats are supported, e.g., postman json files, but also OpenAPI specifications can be imported.
Since most APIs have generic data, which is usually the same among different requests, e.g., auth tokens, you can specify environment variables, which can be referenced in the requests.

# Using the newman CLI

Also see my other tutorial about running postman collections automatically with newman CLI and GitHub actions: https://simonscholz.github.io/tutorials/newman-postman

# Sources

- https://www.postman.com/
- https://postman-quick-reference-guide.readthedocs.io/en/latest/
