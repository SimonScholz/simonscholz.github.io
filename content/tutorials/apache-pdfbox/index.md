---
id: "apache-pdfbox"
path: "/tutorials/apache-pdfbox"
created: "2025-01-28"
updated: "2025-01-28"
title: "Using Apache PDFBox to manipulate PDF files"
description: "Using Apache PDFBox to manipulate PDF files, such as merging multiple pdfs into one or merge pdf pages or add text etc."
author: "Simon Scholz"
tags: ["pdf", "PDFBox", "kotlin", "apache", "gradle"]
vgWort: "vg01.met.vgwort.de/na/22e73a62f4bc4a4a93a7b343c84eff16"
---

Apache PDFBox is a really powerful tool to work with PDF files and create or manipulate them.

## Prerequisites

- Java / Kotlin
- Gradle

## Create a project and adding dependencies

The following command will generate a kotlin application project called `jlama-example`.

```bash
gradle init \
    --type kotlin-application \
    --dsl kotlin \
    --test-framework junit-jupiter \
    --project-name pdfbox-example \
    --package dev.simonscholz \
    --no-split-project \
    --no-incubating \
    --java-version 21
```

For other options run `gradle help --task init`.

Now that we have a project in place we can add the required dependencies to it.

First the `libs.versions.toml` file in the `gradle` folder needs to be modified:

```toml[libs.versions.toml]
[versions]
kotlin = "2.1.0"
pdfbox = "3.0.3"

[libraries]
pdfbox = { module = "org.apache.pdfbox:pdfbox", version.ref = "pdfbox" }

[plugins]
kotlin-jvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
```

Feel free to leave the existing declarations in the `libs.versions.toml` file as is, but we do not need them for this tutorial.

The `build.gradle.kts` can be adjusted accordingly:

```kotlin[build.gradle.kts]
dependencies {
    implementation(libs.pdfbox)
}
```

For more information on how to use toml files in Gradle please see my other tutorial on this topic: https://simonscholz.dev/tutorials/gradle-toml-version-catalogs

## Generate multiple pdfs with simple text

As a first exercise lets create 10 pdf files with text in it including positioning of the text.

```kotlin[App.kt]
package dev.simonscholz

import org.apache.pdfbox.Loader
import org.apache.pdfbox.multipdf.PDFMergerUtility
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.PDPage
import org.apache.pdfbox.pdmodel.PDPageContentStream
import org.apache.pdfbox.pdmodel.PDResources
import org.apache.pdfbox.pdmodel.common.PDRectangle
import org.apache.pdfbox.pdmodel.font.PDType1Font
import org.apache.pdfbox.pdmodel.font.Standard14Fonts
import org.apache.pdfbox.pdmodel.graphics.form.PDFormXObject
import org.apache.pdfbox.util.Matrix
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.createDirectories

fun main() {
    generatePdfs(Paths.get("/home/simon/tutorials").createDirectories()) // 1
}

fun generatePdfs(path: Path) {
    val font = PDType1Font(Standard14Fonts.FontName.HELVETICA)
    val fontSize = 24f
    for (i in 1..10) {
        PDDocument().use { targetPdf ->
            val page = PDPage(PDRectangle.A4)
            targetPdf.addPage(page) // 2

            val mediaBox = page.mediaBox // 3
            val text = "Pdf number $i"
            val textWidth = font.getStringWidth(text) / 1000 * fontSize // 4

            PDPageContentStream(targetPdf, page, PDPageContentStream.AppendMode.APPEND, true).use { contentStream ->
                contentStream.beginText()
                contentStream.setFont(font, fontSize)
                contentStream.newLineAtOffset(mediaBox.width / 2 - textWidth / 2, mediaBox.height / 4 * 3) // 5
                contentStream.showText(text)
                contentStream.endText()
            }

            targetPdf.save(path.resolve("${i.toString().padStart(2, '0')}-pdf.pdf").toFile()) // 6
        }
    }
}
```

1. Specify where to put the pdfs
2. Add a new A4 page to the new pdf document
3. Get the diamentions of the page
4. Calculate the text width on the page considering the font and font fontSize
5. Calculate desired position of the text.
x: center of the page minus half of the text width, y: get the quarter of the height and multiply by 3 to move the text up
6. Save the pdf file including the number prefixed by 0 for 1 - 9 (used for sorting later on)


This code will result in 10 pdf files with text stating "Pdf number $i".

## Merge multiple pdfs in one pdf

In some cases you'd have multiple pdfs and want to combine these in a single pdf with multiple pages.

Now lets take those 10 pdf files from the former section and merge those into 1 pdf file with 10 pages.


```kotlin[App.kt]
package dev.simonscholz

import org.apache.pdfbox.Loader
import org.apache.pdfbox.multipdf.PDFMergerUtility
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.PDPage
import org.apache.pdfbox.pdmodel.PDPageContentStream
import org.apache.pdfbox.pdmodel.PDResources
import org.apache.pdfbox.pdmodel.common.PDRectangle
import org.apache.pdfbox.pdmodel.font.PDType1Font
import org.apache.pdfbox.pdmodel.font.Standard14Fonts
import org.apache.pdfbox.pdmodel.graphics.form.PDFormXObject
import org.apache.pdfbox.util.Matrix
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.createDirectories
import kotlin.io.path.listDirectoryEntries

fun main() {
    generatePdfs(Paths.get("/home/simon/tutorials").createDirectories())

    val listDirectoryEntries = Paths.get("/home/simon/tutorials").listDirectoryEntries("*.pdf").sorted() // 1
    mergePdfs(listDirectoryEntries, "/home/simon/tutorials/merged-pdf.pdf")
}

fun generatePdfs(path: Path) {
    val font = PDType1Font(Standard14Fonts.FontName.HELVETICA)
    val fontSize = 24f
    for (i in 1..10) {
        PDDocument().use { targetPdf ->
            val page = PDPage(PDRectangle.A4)
            targetPdf.addPage(page)

            val mediaBox = page.mediaBox
            val text = "Pdf number $i"
            val textWidth = font.getStringWidth(text) / 1000 * fontSize

            PDPageContentStream(targetPdf, page, PDPageContentStream.AppendMode.APPEND, true).use { contentStream ->
                contentStream.beginText()
                contentStream.setFont(font, fontSize)
                contentStream.newLineAtOffset(mediaBox.width / 2 - textWidth / 2, mediaBox.height / 4 * 3)
                contentStream.showText(text)
                contentStream.endText()
            }

            targetPdf.save(path.resolve("${i.toString().padStart(2, '0')}-pdf.pdf").toFile())
        }
    }
}

fun mergePdfs(
    pdfs: List<Path>,
    destinationFileName: String,
) {
    val merger = PDFMergerUtility()
    merger.destinationFileName = destinationFileName // 2

    pdfs.forEach { pdfFile ->
        merger.addSource(pdfFile.toFile()) // 3
        println("Added $pdfFile")
    }

    merger.mergeDocuments(null) // 4
}
```

1. Get all pdfs of the directory and sort the paths
2. Specify the name of the merged pdf file
3. Add the given pdf files to the merger
4. Run the actual merge action

Running this code will first generate the 10 pdf files and then merge those pdfs into one single pdf using the `PDFMergerUtility`.

## Render pdf page onto another page

Recently I wanted to create a PDF page with some custom text on it and also embed a [delivery label from fulfillmenttools](https://github.com/fulfillmenttools/fulfillmenttools-api-reference/blob/ab9b6f8ed7845775588e39e8741533bd5a0eaa71/api.swagger.yaml#L5694), which itself also is a pdf file.

Here is the code, which actually puts a pdf page, e.g. a delivery label, onto a newly created pdf page and also adds some text besides it.

```kotlin[App.kt]
package dev.simonscholz

import org.apache.pdfbox.Loader
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.PDPage
import org.apache.pdfbox.pdmodel.PDPageContentStream
import org.apache.pdfbox.pdmodel.PDResources
import org.apache.pdfbox.pdmodel.common.PDRectangle
import org.apache.pdfbox.pdmodel.font.PDType1Font
import org.apache.pdfbox.pdmodel.font.Standard14Fonts
import org.apache.pdfbox.pdmodel.graphics.form.PDFormXObject
import org.apache.pdfbox.util.Matrix
import java.io.File

fun main() {
    renderSourcePdfOntoNewPdfPage(
        sourcePdfPath = "/home/simon/parcel-label.pdf",
        outputPdfPath = "/home/simon/tutorial.pdf",
    )
}

fun renderSourcePdfOntoNewPdfPage(
    sourcePdfPath: String,
    outputPdfPath: String,
) {
    PDDocument().use { targetPdf ->
        val page = PDPage(PDRectangle.A4)
        targetPdf.addPage(page)

        val sourcePdf = Loader.loadPDF(File(sourcePdfPath))

        val sourcePage = sourcePdf.getPage(0)

        val resources = sourcePage.resources
        val mediaBox = sourcePage.mediaBox
        val formXObject = PDFormXObject(targetPdf)
        formXObject.bBox = mediaBox
        formXObject.resources = PDResources(resources.cosObject)

        val sourceStream = sourcePage.contents
        val formStream = formXObject.stream.createOutputStream()
        formStream.use { output ->
            sourceStream.use { input ->
                input.copyTo(output)
            }
        }

        val targetPage = targetPdf.getPage(0)
        PDPageContentStream(targetPdf, targetPage, PDPageContentStream.AppendMode.APPEND, true).use { contentStream ->
            val margin = 20f
            contentStream.saveGraphicsState()
            contentStream.transform(
                Matrix(
                    1f,
                    0f,
                    0f,
                    1f,
                    margin,
                    targetPage.mediaBox.height - mediaBox.height - margin,
                ),
            )
            contentStream.drawForm(formXObject)
            contentStream.restoreGraphicsState()

            // Write text beside the embedded PDF
            val font = PDType1Font(Standard14Fonts.FontName.HELVETICA)
            contentStream.beginText()
            contentStream.setFont(font, 12f)
            contentStream.newLineAtOffset(
                mediaBox.width + margin + 10f,
                targetPage.mediaBox.height - margin - 20f,
            )
            contentStream.showText("Text beside the embedded PDF :)")
            contentStream.endText()
        }

        targetPdf.save(outputPdfPath)

        sourcePdf.close()
    }
}
```

The result could then look like this:

![Embedded PDF](./embedded-pdf-delivery-label.png)

## Sources

- https://pdfbox.apache.org/
