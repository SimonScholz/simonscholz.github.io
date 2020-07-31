---
path: '/tutorials/github'
date: '2020-08-08'
title: 'GitHub'
description: 'Using GitHub as distributed version control system'
author: 'Simon Scholz'
tags: ['github', 'git', 'fork', 'scm']
---

# Sync fork with upstream

## Add remote

See existing remotes:

```shell
git remote -v
```

Add upstream remote:

```shell
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git

e.g.

git remote add upstream git@github.com:stempler/bnd-platform.git
```

## Sync fork with the upstream master

```shell
git checkout master
git fetch upstream
git merge upstream/master
git push origin master
```

# Git Actions

## Run build

## Webhook
