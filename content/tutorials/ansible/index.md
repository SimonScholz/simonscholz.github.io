---
id: "ansible"
path: "/tutorials/ansible"
created: "2024-10-26"
updated: "2024-10-26"
title: "Ansible - IaC using SSH"
description: "Tutorial about using Ansible to setup your VPS server using Ubuntu"
author: "Simon Scholz"
tags: ["ansible", "ubuntu", "IaC", "ssh"]
vgWort: "vg01.met.vgwort.de/na/337ffc7aa04840c4a7de2224b55cfb34"
---

Ansible is a IaC (infrastructure as code) tool, which can automate a lot of tasks and makes setups reproducible.
Ansible has a concept of playbooks to be run to apply certain workflows, e.g., setting up a server using a VPS provider.
It is good practice to use a distributed version control system, e.g., GIT, to store all ansible files.

![Ansible Architecture](./ansible-architecture.excalidraw.png)

## Install

There are several ways to install ansible, which can be found here: https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html

For Ubuntu it can be done like this:

```bash
# Install pipx (if not already installed)
sudo apt install pipx

# Install Ansible
pipx install --include-deps ansible
```

To validate if Ansible is installed properly on your machine just run `ansible ---version`

## Install Virtualbox (optional)

In case you already have a server, which you intend to use you can skip this step.

In order to test ansible you can run an Ubuntu server in Virtualbox on your local machine.

```bash
sudo apt install virtualbox virtualbox-qt virtualbox-dkms
```

Now you can download the latest ubuntu server version here: https://ubuntu.com/download/server

Once the Ubuntu iso file is downloaded you can start Virtualbox and hit the `New` button.

![New virtualbox](./virtual-box-new.png)

Then just follow the steps and finally run the Ubuntu server in Virtualbox.

When installing Ubuntu server please make sure to select and install OpenSSH server
by checking the box "Install OpenSSH server".

There are plenty of tutorials out there in case you face issues.
I myself found this Video really helpful: [How to Run an Ubuntu Server VM with VirtualBox (and login via SSH)](https://www.youtube.com/watch?v=wqm_DXh0PlQ)

### Virtualbox network issues

In case port 22 is already occupied or you face other network issues you can configure the network of your VM.

![Virtualbox Network](./virtual-box-network.png)

And then you can change the port to talk to by using port forwarding:

![Virtualbox port forwarding](./virtual-box-port-forwarding.png)

## Setup ssh key

For better security and convenience it is highly recommended to use ssh keys to connect to a machine via ssh.

```bash
ssh-keygen -t ed25519 -C "ansible"
```

Now you´ll be prompted to enter the file path.
Since there usually already is a default file you might want to choose a different file name, e.g., `/home/your-username/.ssh/ansible`.

In order to let ansible do it´s job later on we won´t add a passphrase for this ssh key.

Please keep this ssh secret, since this will be the credential/password to your server.

## Copy ssh key to the server

Now the generated ssh key has to be propagated to the server.

```bash
ssh-copy-id -i ~/.ssh/ansible.pub -p 22222 localhost
```

In case that did not work you can also ssh into your server using the password and then copy the contents of your `~/.ssh/ansible.pub` file and write it to `~/.ssh/authorized_keys`:

```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIM0IWm4fVLFOYFydagOnkqaEvu9jnTUARRUYfQ0XnxFR ansible" >> authorized_keys
```

Now you can ssh into your server using your ssh key:

```bash
ssh -i ~/.ssh/ansible -p 22222 localhost
```

## Sources

- https://www.ansible.com/
- https://www.youtube.com/watch?v=GROqwFFLl3s
