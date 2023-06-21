---
id: 'ubuntu-dev-setup'
path: '/tutorials/ubuntu-dev-setup'
date: '2027-04-29'
title: 'My Ubuntu dev setup'
description: 'How do I setup my fresh Ubuntu installation for development'
author: 'Simon Scholz'
tags: ['ubuntu', 'os', 'tools', 'dev setup']
vgWort: ''
---

Here I'd like to share how I'd setup my freshly installed OS, namely Ubuntu, for development.

# Ubuntu

You can go to https://ubuntu.com/download/desktop to get the latest version of Ubuntu.

Once the download button has been pressed you'll also see a link about how to create a bootable usb stick to install Ubuntu.

# Nala as apt alternative

Nala is a nice tool for installing and updating like apt does, but with a better UI, which gives better insights on what is happening.
And it offers a history, which can be undone. This can be helpful especially in cases when an update broke your system.

Fun fact, Nala can be installed using apt ;-)

```bash
sudo apt update && sudo apt install nala
```

Also see https://gitlab.com/volian/nala

# KeePassXC

One of the first things to do is installing KeePassXC where I usually store the majority of my passwords in a secure manner.

```bash
sudo add-apt-repository ppa:phoerious/keepassxc
sudo apt update
sudo apt install keepassxc 
```

Also see: https://keepassxc.org/download/#linux

# Git

Nowadays almost every developer uses Git as distributed version control system (DVCS).
More details on Git can be found here: https://simonscholz.github.io/tutorials/git

# SDKMan!

SDKMan! is a really easy to use tool to maintain an overview of SDKs being installed on your system.

To install SDKMan! simply run: 

```bash
curl -s "https://get.sdkman.io" | bash
```
Also see https://sdkman.io/install

SDKs (https://sdkman.io/sdks) I usually install are:

* sdk install java
* sdk install gradle
* sdk install maven 
* sdk install quarkus
* sdk install asciidoctorj

And of course there are several different JDKs to choose from: https://sdkman.io/jdks

```bash
# show different JDK vendors and versions
sdk list java

# Install specific Java version from the list
sdk install java 20.0.1-tem

# Install latest Java version
sdk install java
```

Also see https://sdkman.io/usage for the usage of SDKMan!

# Docker + Docker Compose

Here I will only refer to the excellent articles of Digital Ocean:

* https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04
* https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04

In these tutorials you can even choose your Operating System / Linux Distro, where you intend to install docker + docker compose.

# Postman

A great tool to call different rest or graphql APIs with a nice user interface.

```bash
snap install postman
```

The following link also describes how to create a proper `[Desktop Entry]` for Postman.
https://learning.postman.com/docs/getting-started/installation-and-updates/#installing-postman-on-linux

# VS Code

Great Code editor from Microsoft, which I do use for coding this homepage using Gatsby and TypeScript + coding Flutter Apps.

Steps to install VS Code can be found here: https://code.visualstudio.com/docs/setup/linux

VS Code itself offers a large variety of extensions and plug-ins.
Let me list the ones I'd currently use:

* AsciiDoc: https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode
* Flutter
  * https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
  * https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
  * https://marketplace.visualstudio.com/items?itemName=FelixAngelov.bloc
* GitOps with Flux: https://marketplace.visualstudio.com/items?itemName=Weaveworks.vscode-gitops-tools
* Docker: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
* Kubernetes: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools
* Icons for file explorer: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme
* Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
* YAML: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml
* XML: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
* Spell Checker: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

# Node JS + NPM

To run Node and NPM you can follow the steps from my other tutorial: 

https://simonscholz.github.io/tutorials/node-npm-updates

# Flameshot

Even though Ubuntu 22.04 ships with an improved good to use Screenshot tool out of the box, I'd still prefer using Flameshot.

```bash
# using apt
sudo apt install flameshot

# using nala
sudo nala install flameshot
```

Also see: https://flameshot.org/docs/installation/installation-linux/

# kubectl

In order to interact with Kubernetes kubectl is a must have.

Follow steps from https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/ to install kubectl.

The usage of kubectl is nicely depicted by the kubectl cheatsheet: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

# Dropbox

Dropbox offers a really convenient way to store data in the cloud by integrating a dropbox client into the system file explorer.

Also see: https://www.dropbox.com/install-linux

# Chrome

One of the most popular browsers can be found here: https://www.google.com/chrome/de/download-chrome/

# Fish Shell

Using the default terminal of Ubuntu is usually sufficient, but there are alternatives like Fish Shell, which offers powerful features like a command history with auto completion and much more.

Also see my dedicated tutorial about the fish shell: https://simonscholz.github.io/tutorials/fishshell

# Messenger

## Telegram

A nice alternative to WhatsApp, which is pretty popular and also has a desktop client.

```bash
# using apt
sudo apt install telegram-desktop 

# using nala
sudo nala install telegram-desktop 
```

Also see https://wiki.ubuntuusers.de/Telegram/

## Teams for Linux

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/teams-for-linux/packages/setup.deb.sh' | sudo -E bash

# using apt
sudo apt update
sudo apt install teams-for-linux

# using nala
sudo nala update
sudo nala install teams-for-linux
```


Also see https://github.com/IsmaelMartinez/teams-for-linux
