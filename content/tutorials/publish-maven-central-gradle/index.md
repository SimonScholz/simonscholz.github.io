---
id: "publish-maven-central-gradle"
path: "/tutorials/publish-maven-central-gradle"
date: "2023-10-07"
title: "Publish library to Maven Central with Gradle and GitHub Actions"
description: "Creating a library using Gradle, register at Maven Central and publish it to Maven Central using GitHub Actions"
author: "Simon Scholz"
tags: ["gradle", "maven-central", "library", "publish", "github-actions"]
vgWort: "vg07.met.vgwort.de/na/55e92b5d1a3f466ea0cc172f2d3d5f6c"
---

When you want to publish a library to Maven Central you have to follow a few steps. This tutorial will guide you through the process of creating a library using Gradle, register at Maven Central and publish it to Maven Central using GitHub Actions.

## Prerequisites:

- Gradle installed on your local machine. You can download it from [here](https://gradle.org/install/) or use [SDKMan](https://simonscholz.github.io/tutorials/ubuntu-dev-setup#sdkman) for this.
- A GitHub repository where you'll host your library.
- A Sonatype OSS account (required for publishing to Maven Central).
- A GPG key for signing your artifacts.

## Create a library using Gradle (optional)

If you already have a library you can skip this step.

Create a new Gradle library project using the following command:

```bash
gradle init --type kotlin-library
```

Besides kotling-library you can also use various other types, which you can find here: [supported gradle build types](https://docs.gradle.org/current/userguide/build_init_plugin.html#supported_gradle_build_types)

## Publishing your library on GitHub

In order to publish to maven central you need to publish your library in public, e.g., on [GitHub](https://github.com), [GitLab](https://about.gitlab.com/), [Sourceforge](https://sourceforge.net/) or others.
I'd recommend using GitHub for this, since we'll also use GitHub Actions to publish the library to Maven Central.

When creating the repository on GitHub, make sure to add a `README` file and pick a proper `License` (e.g., Apache 2.0).

## Using the com.vanniktech.maven.publish plugin

### Add the plugin

To publish your library to Maven Central you can use the [com.vanniktech.maven.publish](https://github.com/vanniktech/gradle-maven-publish-plugin) plugin. This plugin will take care of all the necessary steps to publish your library to Maven Central.

The `build.gradle.kts` file should besides everything else contain this:

```kotlin [build.gradle.kts]
plugins {
    // other plugins

    id("com.vanniktech.maven.publish") version "0.25.3"
    id("org.jetbrains.dokka") version "1.9.0"
}
```

Adding `org.jetbrains.dokka` is used to generate the kdoc for a `kotlin-library`. Without it the kdoc in the library will not be part of the generated javadoc.

### Configure the plugin

```kotlin [build.gradle.kts]
import com.vanniktech.maven.publish.SonatypeHost

mavenPublishing {
    publishToMavenCentral(SonatypeHost.S01)

    signAllPublications()
}
```

`SonatypeHost.S01` is used here, since all new projects are forced to use this host.

Maven Central requires that all non `-SNAPSHOT` artifacts are signed. Therefore we need to sign all publications.

It is also required to add certain meta data, which can either be specified within the `build.gradle.kts` file or `gradle.properties` like this:

```properties [gradle.properties]
GROUP=io.github.simonscholz
POM_ARTIFACT_ID=qr-code-with-logo
VERSION_NAME=0.1.0-SNAPSHOT

POM_NAME=QR Code with logo
POM_DESCRIPTION=Customizable qr code generatation with different colors and shapes and logos using awt
POM_INCEPTION_YEAR=2023
POM_URL=https://github.com/simonscholz/qr-code-with-logo/

POM_LICENSE_NAME=The Apache Software License, Version 2.0
POM_LICENSE_URL=https://www.apache.org/licenses/LICENSE-2.0.txt
POM_LICENSE_DIST=repo

POM_SCM_URL=https://github.com/SimonScholz/qr-code-with-logo
POM_SCM_CONNECTION=scm:git:git://github.com/simonscholz/qr-code-with-logo.git
POM_SCM_DEV_CONNECTION=scm:git:ssh://git@github.com/simonscholz/qr-code-with-logo.git

POM_DEVELOPER_ID=simonscholz
POM_DEVELOPER_NAME=Simon Scholz
POM_DEVELOPER_URL=https://github.com/simonscholz/
```

Make sure to replace the values with your own values.

## Sign up at Sonatype JIRA

Sign up at [Sonatype JIRA](https://issues.sonatype.org/secure/Signup!default.jspa).

The credentials you use here will be used later on to sign in at [S1 Sonatype OSS](https://s01.oss.sonatype.org/).

## Create an issue at Sonatype JIRA

Then you can create an issue at [Sonatype JIRA](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134) to get your project whitelisted.

Here you have different options:

- Register your own domain as groupId
- Use the groupId `io.github.<your-github-username>`
- And other options

Here is a screenshot of the issue I created for myself using the groupId `io.github.simonscholz`:

![Screenshot of the jira issue ](./sonatype-jira-issue.png)

In order to prove that you're the owner of this GitHub account you'll be asked to create a git repositoy with the name of the Jira issue.
So in my case I created a repository called `OSSRH-95529` directly after ticket creation to speed up the process.

A few minutes later the `Bot Central-OSSRH` commented the following on my issue:

![Screenshot of the bot comment in jira issue](./bot-comment-jira-issue.png)

## Publish a SNAPSHOT of your library to Maven Central

Now you can already publish SNAPSHOTs of your library to Maven Central.
In order to do so the version of the library needs to end with `-SNAPSHOT`.
Also see the `VERSION_NAME` property, which equals `0.1.0-SNAPSHOT` above in the `gradle.properties` file. 

Just add the credentials into your `~/.gradle/gradle.properties` file:

```properties [~/.gradle/gradle.properties]
mavenCentralUsername=username
mavenCentralPassword=the_password
```

Do **not** put these credentials into the `gradle.properties` file located in the project folder, since this file will be committed to your repository and therefore the credentials will be public.

Then in your project folder you can run:

```bash
./gradlew publishAllPublicationsToMavenCentral
```

Besides using `gradle.properties` you can also use environment variables:

```bash
export mavenCentralUsername=username
export mavenCentralPassword=the_password

./gradlew publishAllPublicationsToMavenCentral
```

This approach will also be used later on in the GitHub Actions workflow.

## Create a GPG key

We'll now walk through the whole process creating a GPG key, but you can also have a look at the [GPG documentation on central.sonatype.org](https://central.sonatype.org/publish/requirements/gpg/#releasing-to-central)

### Install GnuPG

You'll not have many users of your library if you only provide snapshots. Therefore you'll need to publish releases of your library to Maven Central, which requires you to sign your artifacts.

First of all GnuPG needs to be installed: [https://gnupg.org/download/](https://gnupg.org/download/index.html#sec-1-2)

Verify installation of gpg:

```bash
gpg --version

# Should produce a similar output:
gpg (GnuPG) 2.2.27
libgcrypt 1.9.4
Copyright (C) 2021 Free Software Foundation, Inc.
License GNU GPL-3.0-or-later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: /home/simon/.gnupg
Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2
```

### Generating gpg key

You'll be prompted to enter your real name, your email address and a passphrase, when generating a key:

```bash
gpg --gen-key
```

The output will look similar to this:

![Output of gpg --gen-key](./gpg-generate.png)

Make sure to keep your passphrase and private key protected!

Run `gpg --list-keys` to show your GPG keys.

### Distribute the public key

Other people and maven central need your public key to verify your files.
Therefore you have to distribute your public key to a key server:

```bash
gpg --keyserver ${target-key-server} --send-keys ${keyid-of-public-gpg-key}

# e.g.

gpg --keyserver keyserver.ubuntu.com --send-keys 93118BDD624014E8EF9A83847D0C56D86BBFCAA3
```

For more information see [distributing your public key](https://central.sonatype.org/publish/requirements/gpg/#distributing-your-public-key) in the official sonatype docs.

## Sources 

- https://github.com/vanniktech/gradle-maven-publish-plugin
- https://github.com/SimonScholz/qr-code-with-logo
- https://central.sonatype.org/publish/publish-guide/
