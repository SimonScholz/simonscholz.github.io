---
id: 'ocr-tess4J-tesseract-ubuntu'
path: '/tutorials/ocr-tess4J-tesseract-ubuntu'
date: '2023-11-28'
title: 'Doing ocr using Tess4J on Ubuntu'
description: 'This tutorial shows how to do ocr using Tess4J on Ubuntu'
author: 'Simon Scholz'
tags:
  [
    'OCR',
    'Tess4J',
    'Tesseract',
    'Java',
    'Kotlin',
    'Ubuntu',
  ]
vgWort: 'vg02.met.vgwort.de/na/83c3222727584220b01c07bbf3366c14'
---

Tess4J is a Java wrapper for Tesseract OCR. It provides Java and Kotlin APIs for doing OCR on images.

## Setup

### Installing Dependencies

```bash

sudo apt install tesseract-ocr tesseract-ocr-deu

# using nala

sudo nala install tesseract-ocr tesseract-ocr-deu
```

### Cloning tessdata

```bash
# using https
git clone https://github.com/tesseract-ocr/tessdata.git

# using ssh
git clone git@github.com:tesseract-ocr/tessdata.git
```

### Add tess4J dependency

You can obtain tess4J from maven central: https://mvnrepository.com/artifact/net.sourceforge.tess4j/tess4j

In case you have a Gradle project or create a new one using `gradle init` you can add the dependency like so:

```kotlin [build.gradle.kts]
implementation("net.sourceforge.tess4j:tess4j:5.8.0")
```

When you have a maven project simply add the dependency like so:

```xml [pom.xml]
<dependency>
    <groupId>net.sourceforge.tess4j</groupId>
    <artifactId>tess4j</artifactId>
    <version>5.8.0</version>
</dependency>
```

## Reading text from an image

```kotlin
import net.sourceforge.tess4j.Tesseract
import java.io.File

fun main() {
    Tesseract().apply {
        setDatapath("/home/simon/git/ocr/tessdata/")
        setLanguage("deu")
    }.run {
        doOCR(File("/home/simon/Pictures/png-with-text.png"))
    }.run {
        println(this)
    }
}
```

`/home/simon/git/ocr/tessdata/` is the path to the tessdata folder, which was cloned earlier.

`/home/simon/Pictures/png-with-text.png` is the path to the image you want to do ocr on.

These are the supported image formats:

- PNG - requires libpng, libz
- JPEG - requires libjpeg / libjpeg-turbo
- TIFF - requires libtiff, libz
- JPEG 2000 - requires libopenjp2
- GIF - requires libgif (giflib)
- WebP requires libwebp
- BMP - no library required*
- PNM - no library required*

* Except Leptonica

Also see: https://tesseract-ocr.github.io/tessdoc/InputFormats.html

## Sources

- https://github.com/nguyenq/tess4j
- https://tesseract-ocr.github.io/tessdoc
- https://wiki.ubuntuusers.de/tesseract-ocr/
- https://github.com/tesseract-ocr/tessdata
