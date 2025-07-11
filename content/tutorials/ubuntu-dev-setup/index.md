---
id: "ubuntu-dev-setup"
path: "/tutorials/ubuntu-dev-setup"
created: "2023-08-23"
updated: "2025-01-16"
title: "My Ubuntu dev setup"
description: "How do I setup my fresh Ubuntu installation for development"
author: "Simon Scholz"
tags: ["ubuntu", "os", "tools", "dev setup"]
vgWort: "vg04.met.vgwort.de/na/989995905b7e49428a551fec44aa0b61"
---

Here I'd like to share how I'd setup my freshly installed OS, namely Ubuntu, for development.

## Backup data in advance

You might want to maintain a list of files or folders to backup.

```txt[folders-to-backup.txt]
Documents/
Pictures/
Videos/
.config/
.ssh/
hosts
.ansible.cfg
.gitconfig
```

Once the `folders-to-backup.txt` file is in place we can use rsync to copy the files to an usb stick or different hard drive.
But first do this using the `--dry-run` flag to test it without actually copying anything.

```bash
rsync -a --dry-run --stats --info=progress2 --exclude='.cache' --files-from=folders-to-backup.txt ~ /media/{your-username}/{hard-drive-name}/backup/
```

- `-a` is a shortcut for `-rlptgoD`, which will ensure that all settings of files and folders remain as is.
- `--info=progress2` will also show a nice progress bar for the overall sync process.
- `--dry-run` to do a test run first to check the config and paths
- `--stats` to see file sizes and amount of files being sent

For the actual backup sync `--dry-run` needs to be removed:

```bash
rsync -a --stats --info=progress2 --exclude='.cache' --files-from=folders-to-backup.txt ~ /media/{your-username}/{hard-drive-name}/backup/
```

Please note the `~` so everything is relative to your user home folder.

## Ubuntu

You can go to https://ubuntu.com/download/desktop to get the latest version of Ubuntu.

Once the download button has been pressed you'll also see a link about how to create a bootable usb stick to install Ubuntu.

## Nala as apt alternative

Nala is a nice tool for installing and updating like apt does, but with a better UI, which gives better insights on what is happening.
And it offers a history, which can be undone. This can be helpful especially in cases when an update broke your system.

Fun fact, Nala can be installed using apt ;-)

```bash
sudo apt update && sudo apt install nala
```

Also see https://gitlab.com/volian/nala

## Curl

Curl is a really helpful cli tool for sending network requests.

```bash
sudo apt install curl
# or using nala
sudo nala install curl
```

## KeePassXC

One of the first things to do is installing KeePassXC where I usually store the majority of my passwords in a secure manner.

```bash
sudo add-apt-repository ppa:phoerious/keepassxc
sudo apt update
sudo apt install keepassxc
```

Also see: https://keepassxc.org/download/#linux

## Git

Nowadays almost every developer uses Git as distributed version control system (DVCS).
More details on Git can be found here: https://simonscholz.dev/tutorials/git

## Lazy Git

Easy to use git client within the terminal.

```bash
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
sudo install lazygit /usr/local/bin
```

Also see https://github.com/jesseduffield/lazygit

## SDKMan!

SDKMan! is a really easy to use tool to maintain an overview of SDKs being installed on your system.

To install SDKMan! simply run:

```bash
curl -s "https://get.sdkman.io" | bash
```

Also see https://sdkman.io/install

SDKs (https://sdkman.io/sdks) I usually install are:

- sdk install java
- sdk install gradle
- sdk install maven
- sdk install quarkus
- sdk install asciidoctorj

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

## Docker + Docker Compose

Here I will only refer to the excellent articles of Digital Ocean:

- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04

In these tutorials you can even choose your Operating System / Linux Distro, where you intend to install docker + docker compose.

## Postman

A great tool to call different rest or graphql APIs with a nice user interface.

```bash
snap install postman
```

The following link also describes how to create a proper `[Desktop Entry]` for Postman.
https://learning.postman.com/docs/getting-started/installation-and-updates/#installing-postman-on-linux

## VS Code

Great Code editor from Microsoft, which I do use for coding this homepage using Gatsby and TypeScript + coding Flutter Apps.

Steps to install VS Code can be found here: https://code.visualstudio.com/docs/setup/linux

VS Code itself offers a large variety of extensions and plug-ins.
Let me list the ones I'd currently use:

- AsciiDoc: https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode
- Flutter
  - https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
  - https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
  - https://marketplace.visualstudio.com/items?itemName=FelixAngelov.bloc
- GitOps with Flux: https://marketplace.visualstudio.com/items?itemName=Weaveworks.vscode-gitops-tools
- Docker: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
- Kubernetes: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools
- Icons for file explorer: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme
- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- YAML: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml
- XML: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
- Spell Checker: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
- Base 64 Encoder: https://marketplace.visualstudio.com/items?itemName=adamhartford.vscode-base64
- Tailwind CSS IntelliSense: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Iconify IntelliSense: https://marketplace.visualstudio.com/items?itemName=antfu.iconify
- Vue Language Features (Volar): https://marketplace.visualstudio.com/items?itemName=Vue.volar
- Excalidraw: https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor

## IntelliJ

IntelliJ is a powerful IDE for using Java and/or Kotlin.

```bash
# Use ultimate
sudo snap install intellij-idea-ultimate --classic
# or community
sudo snap install intellij-idea-community --classic
```

## Node JS + NPM

To run Node and NPM you can follow the steps from my other tutorial:

https://simonscholz.dev/tutorials/node-npm-updates

## Flameshot

Even though Ubuntu 22.04 ships with an improved good to use Screenshot tool out of the box, I'd still prefer using Flameshot.

```bash
# using apt
sudo apt install flameshot

# using nala
sudo nala install flameshot
```

Also see: https://flameshot.org/docs/installation/installation-linux/

When having issues with Wayland, you might want to turn it off.

```bash
sudo nano /etc/gdm3/custom.conf
```

In the `custom.conf` file set:

```bash[custom.conf]
WaylandEnable=false
```

Then restart GDM:

```bash
sudo systemctl restart gdm3
```

And verify it works:

```bash
echo $XDG_SESSION_TYPE
```

This should output `x11` now.

## Kubernetes

### kubectl

In order to interact with Kubernetes kubectl is a must have.

Follow steps from https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/ to install kubectl.

For me on Ubuntu it works like this:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

kubectl version
```

The usage of kubectl is nicely depicted by the kubectl cheatsheet: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

### k9s

[K9s](https://github.com/derailed/k9s) provides a terminal UI to interact with your Kubernetes clusters.

The easiest way to install k9s is via [Webi](https://webinstall.dev/)

```bash
curl -sS https://webinstall.dev/k9s | bash
```

For other options also see https://github.com/derailed/k9s#installation

## Sqlite browser

convenient tool to view data of a Sqlite database.

```bash
snap install sqlitebrowser
```

--> https://sqlitebrowser.org/dl/

## Dropbox

Dropbox offers a really convenient way to store data in the cloud by integrating a dropbox client into the system file explorer.

Also see: https://www.dropbox.com/install-linux

You might also need to install, which is required by the dropbox client.

```bash
sudo apt install libpango
# or using nala
sudo nala install libpango
```

## Chrome

One of the most popular browsers can be found here: https://www.google.com/chrome/de/download-chrome/

## Fish Shell

Using the default terminal of Ubuntu is usually sufficient, but there are alternatives like Fish Shell, which offers powerful features like a command history with auto completion and much more.

Also see my dedicated tutorial about the fish shell: https://simonscholz.dev/tutorials/fishshell

## Messenger

### Telegram

A nice alternative to WhatsApp, which is pretty popular and also has a desktop client.

```bash
# using apt
sudo apt install telegram-desktop

# using nala
sudo nala install telegram-desktop
```

Also see https://wiki.ubuntuusers.de/Telegram/

### Teams for Linux

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

# OBS Studio

OBS Studio is a free and open-source, cross-platform screencasting and streaming app, which I use for recording tutorials.

```bash
sudo add-apt-repository ppa:obsproject/obs-studio

sudo apt install obs-studio

# using nala
sudo nala install obs-studio
```

# Scanner

```bash
sudo apt install simple-scan

# using nala
sudo nala install simple-scan
```

# upx

Upx is a tool to compress executables, which can be helpful in case you want to distribute your application as a single executable.
You can download the latest version from GitHub: [UPX Releases](https://github.com/upx/upx/releases)

For ubuntu you'll most likely want to use `upx-{latest-upx-version}-amd64_linux.tar.xz`.

You can simply move the `upx` executable to `/usr/local/bin`:

```bash
tar -xf upx-{latest-upx-version}-amd64_linux.tar.xz upx

sudo mv upx /usr/local/bin
```

## Useful aliases and functions

Update your applications and packages with one command:

```bash [~/.bashrc]

alias uAll='sudo snap refresh && sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y'

# alternatively use nala

alias uAll='sudo snap refresh && sudo nala update && sudo nala upgrade -y'

# including auto remove and clean

alias uAll='sudo snap refresh && sudo nala update && sudo nala upgrade -y && sudo nala autoremove -y'
```

This updates all apt packages, upgrades them and also refreshes the snap installations.

In case you're working with kubernetes and the gcloud cli then this tutorial is for you: [Easily switch gcloud config and kubectl context](https://simonscholz.dev/tutorials/switch-gcloud-kubectl-configs)