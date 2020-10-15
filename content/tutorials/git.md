---
path: '/tutorials/git'
date: '2020-08-08'
title: 'Git'
description: 'Commonly used git commands'
author: 'Simon Scholz'
tags: ['git', 'fork', 'scm']
---

# Deleting already merged branches on remote repository

```shell
git branch -r --merge
```

This will show all branches, which already have been merged to your current `HEAD`.

To remove a certain branch use the following command then:

```shell
git push origin --delete "<branch-name>"
```
