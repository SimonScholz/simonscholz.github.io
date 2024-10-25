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

Now you'll be prompted to enter the file path.
Since there usually already is a default file you might want to choose a different file name, e.g., `/home/your-username/.ssh/ansible`.

In order to let ansible do it's job later on we won't add a passphrase for this ssh key.

⚠️ Please keep this ssh secret, since this will be the credential/password to your server.

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

`-p 22222` is used to set 22222 as port, because otherwise the default ssh port 22 is used.

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
# optional if not using default 22 port
remote_port = 22222
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

In case you do not want to consider apt update as a change, since it is normal that this changes, `changed_when: false` can be used:

```yml [first_playbook.yml]
---
- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
    changed_when: false
```

1. `changed_when: false` means that this task won't be considered as change, since apt update usually changes a lot

## Adding files to the system

In order to work with files a `files` directory needs to be added.

So let's create a `files` directory and create a `README.md` file in it.

```bash
mkdir files
echo "## My Ansible Setup" >> files/README.md
```

Now that the README.md is in place another `Add README.md` task can be added to our playbook.

```yml [first_playbook.yml]
---
- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
    changed_when: false
    when: ansible_distribution == "Ubuntu"

  - name: Add README.md
    copy:
      src: README.md
      dest: /home/simon
      owner: root
      group: root
```

Please note that `src:` assumes that the files are located in the `files` directory.

```bash
ansible-playbook --ask-become-pass first_playbook.yml
```

After running the playbook the `README.md` file can be found in `/home/simon/` on the server.

## Dedicated ansible user

It is considered good practice to have a dedicated user to run the ansible playbooks.

Since that new user should also be a sudoer (allowed to run sudo commands),
we'll add a `sudoer_simon_ansible` file to the `files` directory.

```bash
echo "simon-ansible ALL=(ALL) NOPASSWD: ALL" >> files/sudoer_simon_ansible
```

This `sudoer_simon_ansible` will now also be used in the playbook:

```yml [first_playbook.yml]
---
- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
    changed_when: false
    when: ansible_distribution == "Ubuntu"

  - name: Add README.md
    copy:
      src: README.md
      dest: /home/simon
      owner: root
      group: root

  - name: Add simon-ansible user
    user:
      name: simon-ansible
      groups:
        - root

  - name: Add ssh key (user simon-ansible)
    authorized_key:
      user: simon-ansible
      key: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIM0IWm4fVLFOYFydagOnkqaEvu9jnTUARRUYfQ0XnxFR ansible"

  - name: Add sudoers file (user simon-ansible)
    copy:
      src: sudoer_simon_ansible
      dest: /etc/sudoers.d/simon-ansible
      owner: root
      group: root
```

1. The `Add simon-ansible user` task just creates a user called `simon-ansible` and adds it to the root group.
2. `Add ssh key (user simon-ansible)` adds our public key `~/.ssh/ansible.pub` for the user `simon-ansible` as authorized_key
3. `Add sudoers file (user simon-ansible)` will copy the contents of `sudoer_simon_ansible` into `/etc/sudoers.d/simon-ansible`.

⚠️ Please be cautious adding a user to the root group, but we'll elaborate on security later on.

Now we can run the playbook once again to create the `simon-ansible` user.

```bash
ansible-playbook --ask-become-pass first_playbook.yml
```

Once the user is in place we can tell ansible to use this user using the `remote_user` property.

`remote_user:` can either be added to any task, but I prefer to simply add it to the `ansible.cfg` file:

```ini [ansible.cfg]
[defaults]
inventory = inventory
private_key_file = ~/.ssh/ansible
remote_user=simon-ansible
# optional if not using default 22 port
remote_port = 22222
```

Once this is done `--ask-become-pass` can be omitted, since the `simon-ansible` is authorized by the ssh key:

```bash
ansible-playbook first_playbook.yml
```

## Using roles

Having all tasks inside one playbook will decrease the readability
and harder to maintain.
Roles can be used to organize certain tasks in a dedicated file structure,
which make them reusable and fosters proper separation of concerns.

Basically our current playbook does 3 things right now:

* apt update
* copy a file
* creates and configures a dedicated ansible user

We now intend to move these tasks into respective roles and just let the playbook delegate to these roles:

![playbook to roles](./playbook-to-roles.excalidraw.png)

Therefore we create the following directories and files:

```bash
mkdir -p roles/apt-update/tasks/ \
         roles/copy-readme/tasks/ \
         roles/copy-readme/files/ \
         roles/user-create/tasks/ \
         roles/user-create/files/ \
&& touch roles/apt-update/tasks/main.yml \
         roles/copy-readme/tasks/main.yml \
         roles/user-create/tasks/main.yml \
&& mv files/README.md roles/copy-readme/files/README.md \
&& mv files/sudoer_simon_ansible roles/user-create/files/sudoer_simon_ansible \
&& rm -r files
```

After that the folder structure should look like this:

![VS code folder structure with roles](./roles-folder-structure-vs-code.png)

Now that the folder structure is in place we can copy the tasks from `first_playbook.yml` to the respective `main.yml` files.

`/roles/apt-update/tasks/main.yml`:

```yml [/roles/apt-update/tasks/main.yml]
- name: update repository index
  apt:
    update_cache: yes
  changed_when: false
  when: ansible_distribution == "Ubuntu"
```

`/roles/copy-readme/tasks/main.yml`:

```yml [/roles/copy-readme/tasks/main.yml]
- name: Add README.md
  copy:
    src: README.md
    dest: /home/simon
    owner: root
    group: root
```

`/roles/user-create/tasks/main.yml`:

```yml [/roles/user-create/tasks/main.yml]
- name: Add simon-ansible user
  user:
    name: simon-ansible
    groups:
      - root

- name: Add ssh key (user simon-ansible)
  authorized_key:
    user: simon-ansible
    key: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIM0IWm4fVLFOYFydagOnkqaEvu9jnTUARRUYfQ0XnxFR ansible"

- name: Add sudoers file (user simon-ansible)
  copy:
    src: sudoer_simon_ansible
    dest: /etc/sudoers.d/simon-ansible
    owner: root
    group: root
```

The `first_playbook.yml` file can now use the `roles:` property to delegate to the roles:

```yml [first_playbook.yml]
---
- hosts: all
  become: true
  roles:
    - apt-update
    - copy-readme
    - user-create
```

When you now run the playbook...

```bash
ansible-playbook first_playbook.yml
```
... nothing should've changed and the outcome should still be the same.
But we now have cleaned up a bit and have clear separation of concerns.

![Ansible roles run](./ansible-roles-run.png)

Note that the roles are also mentioned in the console output.

## Sources

- https://www.ansible.com/
- https://www.youtube.com/watch?v=GROqwFFLl3s
