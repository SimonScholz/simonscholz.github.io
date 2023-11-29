---
id: 'ocr-tess4j-tesseract-ubuntu'
path: '/tutorials/ocr-tess4j-tesseract-ubuntu'
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

### Installing tesseract

Tesseract is an open source OCR engine. It is available for Linux, Windows and macOS.
This is the actual OCR engine, which Tess4J uses under the hood.

```bash
# using apt
sudo apt install tesseract-ocr
# using nala
sudo nala install tesseract-ocr
```

### Installing leptonica (optional)

For certain operations Tess4J requires leptonica, which is a library for image processing and image analysis.

```bash
# using apt
sudo apt install libleptonica-dev
# using nala
sudo nala install libleptonica-dev
```

### Install language data

In this example we will install the german language data:

```bash
# using apt
sudo apt install tesseract-ocr-deu
# using nala
sudo nala install tesseract-ocr-deu
```

You can check installed languages using `tesseract --list-langs`, which should output something like this:

```bash
List of available languages (3):
deu
eng
osd
```

This language data will be installed to `/usr/share/tesseract-ocr/4.00/tessdata/`.

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
        setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/")
        setLanguage("deu")
    }.run {
        doOCR(File("/home/simon/Pictures/png-with-text.png"))
    }.run {
        println(this)
    }
}
```

`/usr/share/tesseract-ocr/4.00/tessdata/` is the path to the tessdata folder, which was installed earlier.

`/home/simon/Pictures/png-with-text.png` is the path to the image you want to do ocr on.

The `doOCR` method is overloaded and can also take a `BufferedImage` or a `ByteBuffer` as input, which is pretty handy if you want to do ocr on images in memory, e.g., on a web server.

### Cloning tessdata (optional)

If you want to use the latest version of the language data you can clone the tessdata repository.
But this repository is quite big (about 5 GB) and you will need to set the datapath for Tess4J.

```bash
# using https
git clone https://github.com/tesseract-ocr/tessdata.git

# using ssh
git clone git@github.com:tesseract-ocr/tessdata.git
```

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

Here the `setDatapath` is set to `/home/simon/git/ocr/tessdata/` to point to the cloned tessdata repository.

## Additional Tesseract Configuration

Now let's have a look at some additional configuration options for Tesseract.

```kotlin
import net.sourceforge.tess4j.Tesseract
import net.sourceforge.tess4j.TesseractException
import java.io.File
import net.sourceforge.tess4j.ITessAPI

fun main() {
    val tesseract = Tesseract().apply {
        setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/")

        // set language to german and english
        setLanguage("deu+eng")

        // set ocr engine mode to default
        setOcrEngineMode(ITessAPI.TessOcrEngineMode.OEM_DEFAULT)

        // set dpi to 300
        setVariable("user_defined_dpi", "300")

        // only recognize numbers
        setVariable("tessedit_char_whitelist", "0123456789")
    }

    val image = File("/home/simon/Pictures/png-with-text-and-numbers.png")

    try {
        val result = tesseract.doOCR(image)
        println(result)
    } catch (e: TesseractException) {
        println(e.message)
    }
}
```

Here we specified multiple languages using `setLanguage("deu+eng")`.

We also set the ocr engine mode to default using `setOcrEngineMode(ITessAPI.TessOcrEngineMode.OEM_DEFAULT)`.

The dpi is set to 300 using `setVariable("user_defined_dpi", "300")`.

And we only recognize numbers using `setVariable("tessedit_char_whitelist", "0123456789")`.
Feel free to restrict the characters according to your needs.

## Creating documents from multiple images

The following example creates a text and a pdf document from each image.

```kotlin
import net.sourceforge.tess4j.ITessAPI
import net.sourceforge.tess4j.ITesseract
import net.sourceforge.tess4j.Tesseract

fun main() {
    val tesseract = Tesseract().apply {
        setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/")
        setLanguage("deu")
    }

    val images = arrayOf(
        "/home/simon/playground/ocr/joke.jpg",
        "/home/simon/playground/ocr/salary.jpg",
        "/home/simon/playground/ocr/png-with-text.png",
    )

    val output = arrayOf(
        "/home/simon/playground/ocr/output/joke",
        "/home/simon/playground/ocr/output/salary",
        "/home/simon/playground/ocr/output/png-with-text",
    )

    tesseract.createDocuments(images, output, listOf(
        ITesseract.RenderedFormat.TEXT,
        ITesseract.RenderedFormat.PDF
    ))
}
```

Note that the output path must not contain the file extension, because the file extension is added automatically depending on the output format.
This will create the respective txt and pdf files in the output folder.

Just have a look at the `RenderedFormat` enum to see which output file formats are supported.
The nice thing about pdf generation is that the text is search- and selectable in the pdf, but the image is still visible.
This is pretty handy since the majority of images do not only contain text, but also some kind of graphics.

## Find position of text in image

The following example shows how to find the position of text in an image.

```kotlin
import net.sourceforge.tess4j.Tesseract
import java.io.File
import javax.imageio.ImageIO
import net.sourceforge.tess4j.ITessAPI

fun main() {
    val imageFile = File("/home/simon/Pictures/more-complex.png")
    if(imageFile.exists()) {
        Tesseract().apply {
            setDatapath("/home/simon/git/ocr/tessdata/")
            setLanguage("deu")
            setVariable("user_defined_dpi", "300")
        }.run {
            val bufferedImage = ImageIO.read(imageFile)
            getWords(bufferedImage, ITessAPI.TessPageIteratorLevel.RIL_TEXTLINE)
        }.run {
            this.forEach {
                println("""
                    -----------------------------------------------------------------------------------------
                    Word: ${it.text} 
                    ${it.boundingBox?.let { box ->
                        "BoundingBox: x: ${box.x}, y: ${box.y}, width: ${box.width}, height: ${box.height}"
                    }}
                """.trimIndent())
            }
        }
    } else {
        println("File does not exist")
    }
}
```

Getting this information is pretty handy, if you want to do some kind of image analysis.

In case the images have a standardized format, you can only look at the position of the text and ignore the rest of the image.
The next sections will show how to do this.

## Targeting specific areas of an image

The following example shows how to target specific areas of an image.
The doOCR method can take a `Rectangle` as second parameter, which specifies the area of the image to be analyzed.

```kotlin
import java.awt.Rectangle
import net.sourceforge.tess4j.Tesseract
import java.io.File

fun main() {
    val image = File("/home/simon/playground/ocr/energieausweis.jpg")
    if(image.exists()) {
        Tesseract().apply {
            setDatapath("/home/simon/git/ocr/tessdata/")
            setLanguage("deu")
            setVariable("user_defined_dpi", "300")
        }.run {
            val imageAreaIamInterestedIn = Rectangle(80, 60, 500, 35)
            doOCR(image, imageAreaIamInterestedIn)
        }.run {
            println(this)
        }
    }
}
```

With this it is less likely that the ocr engine will recognize text, which is not relevant for your purpose.

You can try to find the right area by using the `getWords` method, which was shown in the previous section and then use the `Rectangle` class to create a rectangle, which contains the text you are interested in.

## Supported image formats

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
- https://tess4j.sourceforge.net/
- https://tesseract-ocr.github.io/tessdoc
- https://wiki.ubuntuusers.de/tesseract-ocr/
- https://github.com/tesseract-ocr/tessdata
