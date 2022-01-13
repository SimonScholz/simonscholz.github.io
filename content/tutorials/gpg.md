---
path: '/tutorials/gpg-archive-encryption'
date: '2022-01-09'
title: 'Security - Encrypt archive files with GPG'
description: 'Tutorial about encrypting archive files using GPG.'
author: 'Simon Scholz'
tags: ['GPG', 'TAR', 'ARCHIVE', 'SECURITY']
---

# Securing your files with gpg

GPG or GnuPG is an open source software that let's you encrypt your files, which should be protected.

Please visit https://gnupg.org/ for more information.

# Create an encrypted archive

```shell
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

# Decrypt and decompress a gpg protected file

```shell
gpg -d folder.tar.gz.gpg | tar -xvzf -
```

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