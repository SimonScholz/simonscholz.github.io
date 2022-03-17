---
path: '/tutorials/git'
date: '2020-08-08'
title: 'Git'
description: 'Tutorial for commonly used git commands'
author: 'Simon Scholz'
tags: ['git', 'fork', 'scm']
---

Git is a commonly used DVCS (distributed version control system), which was introduced by Linus Torvalds.
GitHub, GitLab, Bitbucket and others are services, where you can easily create a remote git repository.

# Install Git

On Ubuntu is is fairly easy:

```shell
sudo apt install git
```

For Windows you'll have to install the following:

https://git-scm.com/download/win

# Configure Git

It is good practice to apply a common global Git config:

```shell
git config --global user.name "Simon Scholz"
git config --global user.email opensource.simon@gmail.com

git config --global branch.autosetuprebase always

git config --global gpg.program gpg
git config --global commit.gpgsign true
```

In case you want to make use of SSH for cloning a SSH key needs to be created:

```shell
ssh-keygen -q -t rsa -b 4096 -f ~/.ssh/id_rsa -C $USER
```

The created public key needs to be configured on the remote origin, e.g., GitHub.

# Clone a remote Git repository

```shell
git clone {uri-of-your-desired-repo}

e.g.

# ssh
git clone git@github.com:SimonScholz/tutorials.git

# https
git clone https://github.com/SimonScholz/tutorials.git
```

# Creating a Git repository locally

Besides cloning a remote repository, you can also initialize it locally.
And on demand this local Git repository can be pushed to a remote origin.

```shell
cd desired-folder-for-git-repo

git init
```

# Adding files to the staging area and commit changes

Before files can be commited locally, the desired files have to reside in the staging area.

Using `git add desired-file` adds a particular file to the staging area.
But you can also add each and every changed file inside the current folder by using `git add .`
And with `git add -A` all changed files of the whole repo will be added.

Once there are the desired files inside the staging area they can be commited:

```shell
git commit -m "Message, which describes what will be commited"
```

NOTE: When changes are commited, they only reside in your local git repository.

# Add a remote origin to your local git repository

# Pushing changes to a remote repository

```shell
git push origin master
```

# Deleting already merged branches on remote repository

```shell
git branch -r --merge
```

This will show all branches, which already have been merged to your current `HEAD`.

To remove a certain branch use the following command then:

```shell
git push origin --delete "<branch-name>"
```
