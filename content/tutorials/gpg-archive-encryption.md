---
id: "gpg-archive-encryption"
path: "/tutorials/gpg-archive-encryption"
created: "2022-01-09"
updated: "2024-01-20"
title: "Security - Encrypt and decrypt files with GPG"
description: "Security - Tutorial about encrypting and decrypting files or archives using GPG."
author: "Simon Scholz"
tags: ["gpg", "tar", "archive", "encryption", "security"]
vgWort: "vg08.met.vgwort.de/na/02907f362c054753bcd6be722b03301c"
---

## Securing your files with gpg

GPG or GnuPG is an open source software that let's you encrypt your files, which should be protected.

Please visit https://gnupg.org/ for more information.

## Encrypt single file

```bash
gpg -cv --no-symkey-cache desired-file
```

|                    | gpg command parameter                 |
| ------------------ | ------------------------------------- |
| -c                 | encryption only with symmetric cipher |
| -v                 | verbose (get more output)             |
| --no-symkey-cache  | do NOT cache the password             |

Then you´ll be promted to enter a password.
This will result in a `desired-file.gpg`  file, which can be decrypted again as follows:

```bash
gpg --no-symkey-cache desired-file.gpg
```

|                    | gpg command parameter                 |
| ------------------ | ------------------------------------- |
| --no-symkey-cache  | do NOT cache the password             |


In case you´d omit the `--no-symkey-cache` flag the given password will be cached in the gpg-agent
and you won´t be promted for the password when decrypting the file.

## Create an encrypted archive

```bash
tar -cvzf - desired-directory | gpg -cv > encrypted-archive.tar.gz.gpg
```

This command basically creates a tar file containing the files in the `desired-directory` and due to `-` this tar will be piped to the gpg command.
This gpg command will then take the piped tar and encrypt it and write the result into `encrypted-archive.tar.gz.gpg`.

|     | tar command parameter                               |
| --- | --------------------------------------------------- |
| -c  | Is used to create an archive                        |
| -v  | verbose (get more output)                           |
| -z  | Compress the file for smaller size                  |
| -f  | Specifies that the file name will be mentioned next |

|     | gpg command parameter                 |
| --- | ------------------------------------- |
| -c  | encryption only with symmetric cipher |
| -v  | verbose (get more output)             |

## Decrypt and decompress a gpg protected file

```bash
gpg -dv encrypted-archive.tar.gz.gpg | tar -xvzf -
```

`gpg -dv encrypted-archive.tar.gz.gpg` will cause a prompt, which asks for the password and then extracts the archive.

|     | gpg command parameter     |
| --- | ------------------------- |
| -d  | stands for decrypt        |
| -v  | verbose (get more output) |

|     | tar command parameter       |
| --- | --------------------------- |
| -x  | Extract the archive         |
| -v  | verbose (get more output)   |
| -z  | Decompress the archive      |
| -f  | Where to put the file/files |
