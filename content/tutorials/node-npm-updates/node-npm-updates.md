---
path: '/tutorials/node-npm-updates'
date: '2022-03-19'
title: 'Update node + npm and package.json dependencies'
description: 'Tutorial on updating node and npm and package.json dependencies.'
author: 'Simon Scholz'
tags: ['npm', 'node', 'Dependencies', 'updates', 'dependabot']
---

Node and NPM are usually used for project written in JavaScript or TypeScript (which is transpiled to JavaScript).
In the JavaScript universe the updates come quite often and should be applied as soon as possible to avoid security issues and technical dept.

# Install and Update Node + NPM using NVM

nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.

The easiest way to install nvw is by using the command line:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

More information about NVM can be found here: https://github.com/nvm-sh/nvm#intro

Once NVM is successfully installed the latest version of node and npm can be installed like this:

```shell
nvm install node
```

You can then check if node and npm is installed properly by checking the versions.

```shell
node --version

npm --version
```

# Updating project dependencies

Before updating the dependencies you can check for outdated dependencies by using

```shell
npm outdated
```

This will then indicate which packages should be updated.

![npm outdated result](./npm-outdated.png)

This screenshot shows that the current and wanted versions are currently the same.
But only because I ran a `npm update` in advance.

Running `npm update` will update the versions to the onces mentioned in the _Wanted_ column.

# Update all dependencies to their latest version

This includes updating to a new major version, e.g., 1.2.3 to 2.3.4.

In order to archive this the `npm-check-updates` package has to be installed globally.

```shell
npm install -g npm-check-updates
```

Then you can run the `npm-check-updates` tool to update your package.json file's major versions.

```shell
ncu -u
```

Once the _package.json_ file is updated you can run `npm update` to update your _node_modules_ and the _package-lock.json_ file.
If these are not present you can simply run `npm install`, which will create the _node_modules_ and the _package-lock.json_ file.

| CAUTION: Updating all dependencies to the latest version will most likely break your project. Major version updates usually introduce breaking changes, which need to be adapted manually. Often bigger frameworks offer detailed migration guides for major version updates. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

# Sources

- https://github.com/nvm-sh/nvm#intro
- https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version
