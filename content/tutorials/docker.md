---
path: '/tutorials/docker'
date: '2020-08-01'
title: 'Docker'
description: 'Tutorial on Docker concerning containers and networking.'
author: 'Simon Scholz'
tags: ['Docker']
---

# Docker Install

# Docker Setup

# Docker Hub

# Docker Network

Find out the ip address of a certain container:

```shell
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' your-container-id
```

# Sources

- https://thispointer.com/how-to-get-ip-address-of-running-docker-container-from-host-using-inspect-command/
