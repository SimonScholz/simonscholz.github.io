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

# Start and run container

Running a certain docker image:

```shell
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

- `-d` says that the container application is supposed to run in detached mode
- `--name` applies a custom name for the container
- `-p` enables port forwarding from the host machine, where docker runs on
- `grafana/grafana` is the name of the docker container

With `docker run` docker also will be downloading the desired docker image from docker hub in case it is not already available on the machine.

Also see https://hub.docker.com/r/grafana/grafana

You can also pull the docker image from docker hub by using the following command:

```shell
docker pull grafana/grafana
```

To start a docker container, which already has been running on your machine you can use:

```shell
docker start <your-desired-container-id>
```

# Stop and remove container

With `docker ps` you also get the ids of the container, which can be used to stop a certain container like this:

```shell
docker stop <your-desired-container-id>
```

To stop all running container the following command can be used:

```shell
docker stop $(docker ps -aq)
```

To remove a container `docker rm` can be used.

```shell
docker rm <your-desired-container-id>
```

So removing all containers would look like this:

```shell
docker rm $(docker ps -aq)
```

In case you also want to remove a docker image from your machine the `docker rmi` command can be used.
To see the images and its ids the `docker images` command can be used.

```shell
docker rmi <your-desired-container-id>
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
