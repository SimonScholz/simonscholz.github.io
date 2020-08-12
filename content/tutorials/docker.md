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

# List containers and images

Running containers

```shell
docker ps
```

Existing containers

```shell
docker ps -a
```

Existing containers' ids

```shell
docker ps -aq
```

Show existing images.

```shell
docker images
```

Only query images ids:

```shell
docker images -q
```

# Stop and remove container

With `docker ps` you also get the ids of the container, which can be used to stop a certain container like this:

```shell
docker stop <your-desired-id>
```

To stop all running container the following command can be used:

```shell
docker stop $(docker ps -aq)
```

To remove a container `docker rm` can be used.

```shell
docker rm <your-desired-id>
```

So removing all containers would look like this:

```shell
docker rm $(docker ps -aq)
```

In case you also want to remove a docker image from your machine the `docker rmi` command can be used.
To see the images and its ids the `docker images` command can be used.

```shell
docker rmi <your-desired-id>
```

To remove all images the following command can be used.

```shell
docker rmi $(docker images -q)
```

# Access Docker Container

```shell
docker exec -it <container name> /bin/bash
```

# Docker Network

Find out the ip address of a certain container:

```shell
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' your-container-id
```

# Sources

- https://thispointer.com/how-to-get-ip-address-of-running-docker-container-from-host-using-inspect-command/
- https://phase2.github.io/devtools/common-tasks/ssh-into-a-container/
