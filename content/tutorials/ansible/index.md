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

## Git Repository

As mentioned earlier it makes sense to use version control to store the ansible config and playbooks.

```bash
mkdir ansible
cd ansible
git init
```

To let Ansible know, which servers it should ssh into an `inventory` file can be created:

```txt [inventory]
localhost

{other-ip-addresses-or-domains}
```

To let Ansible implicitly pickup the `inventory` file an `ansible.cfg` config file can be created:

```ini [ansible.cfg]
[defaults]
inventory = inventory
private_key_file = ~/.ssh/ansible
```

## First Ansible commands

Within the git repository `ansible` folder the following commands can be run:

```bash
# Simply ping all servers
ansible all -m ping

# Gather meta data from all servers
ansible all -m gather_facts
```

The ping command will result in the following:

![Ansible ping](./ansible-ping.png)

In case you do not have the `ansible.cfg` in place you can reference the key file and inventory.

```bash
# Simply ping all servers
ansible all --key-file ~/.ssh/ansible -i inventory -m ping

# Gather meta data from all servers
ansible all --key-file ~/.ssh/ansible -i inventory -m gather_facts
```

### Grep dedicated facts

When running `gather_facts` the list is quite long 
and using `grep` can help to target certain meta data.

```bash
ansible all -m gather_facts | grep ansible_distribution
```

![grep ansible_distribution](./grep-ansible_distribution.png)

In case you're having multiple servers in your inventory
and want to target a certain server the `--limit` flag can be used:

```bash
ansible all -m gather_facts --limit localhost | grep ansible_distribution
```

## Using VS Code (optional)

Red Hat provides a helpful Ansible extension for VS Code in the [Extension marketplace](https://marketplace.visualstudio.com/items?itemName=redhat.ansible).

This extension comes with reasonable syntax highlighting and code completion for Ansible files.

The following rules apply to make the Ansible extension work out of the box.

* yaml files under /playbooks dir.
* files with the following double extension: .ansible.yml or .ansible.yaml.
* notable yaml names recognized by ansible like site.yml or site.yaml
* yaml files having playbook in their filename: *playbook*.yml or *playbook*.yaml

That's the reason why I add `playbook` to the file name of a playbook in the next chapter.

## First Ansible playbook

Let's create our first Ansible playbook called `first_playbook.yml` inside the git repository.

```yml [first_playbook.yml]
---

- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
    when: ansible_distribution == "Ubuntu"
```

1. `become: true` is used since we need `sudo` for the `apt` commands.
2. Then we simply give the one task a `name`.
3. Using the `apt` instruction. See [ansible apt module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html).
4. The `when` expression can be used to specify for which kind of server this task applies.

The `first_playbook.yml` playbook can be run like this:

```bash
ansible-playbook --ask-become-pass first_playbook.yml
```

Running this should lead to a similar result:

![ansible playbook run](./ansible-first-playbook.png)

Any time a playbook is run the `gather_facts` task will be run implicitly to make use of the facts within the playbooks,
e.g., in the `when` expression.

We can also see here that the apt cache is updated, so we successfully ran our first playbook. 🙌

## Sources

- https://www.ansible.com/
- https://www.youtube.com/watch?v=GROqwFFLl3s
