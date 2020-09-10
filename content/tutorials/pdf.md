---
path: '/tutorials/pdf'
date: '2020-10-09'
title: 'PDF'
description: 'Tutorial about tools for editing PDF files.'
author: 'Simon Scholz'
tags: ['PDF']
---

# Editing Tools for PDF files

- LibreOffice Draw
- Inkscape
- Gimp
- and many more ...

It also depends on the PDF file itself whether one of these tools properly visualizes the original PDF file.
So depending on the PDF files you might choose one tool over another.
Recently I've been using Inkscape, because LibreOffice Draw tends to screw the text alignment of a PDF files sometimes.
A drawback of using Inkscape is that it is only capable to open one page at a time.
So in case you want to modify several pages with Inkscape, you'll have to do it one by one and use tools like PDF Arranger to merge the resulting PDFs afterwards again.
Since many forms have between 2 or 3 pages it might be worth the effort.

# PDF Arranger

## Install PDF Arranger

```shell
sudo apt install pdfarranger
```

## Merge several PDFs into one

Open PDF Arranger, press the + button, choose the pdfs, which should be merged, arrange them and then save one single pdf.
