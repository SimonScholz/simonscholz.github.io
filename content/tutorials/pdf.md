---
id: 'pdf'
path: '/tutorials/pdf'
date: '2020-10-09'
title: 'PDF Tools'
description: 'Tutorial about tools for editing PDF files.'
author: 'Simon Scholz'
tags: ['pdf', 'tools']
vgWort: 'vg08.met.vgwort.de/na/d28e8e3bf7d1405c93c9db0cb9181e21'
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

# Inkscape

## Install Inkscape

```bash
sudo apt install inkscape
```

# PDF Arranger

## Install PDF Arranger

```bash
sudo apt install pdfarranger
```

## Merge several PDFs into one

Open PDF Arranger, press the + button, choose the pdfs, which should be merged, arrange them and then save one single pdf.

# Decrease size of PDF files

[Ghostscript](https://www.ghostscript.com/doc/current/Use.htm) can be used to do several things with PDF files.
For example also decreasing its' size.

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
-dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```

More details can be found here: https://www.ghostscript.com/doc/current/VectorDevices.htm#PSPDF_IN

# Sources

- https://www.ghostscript.com/doc/current/Use.htm
- https://www.ghostscript.com/doc/current/VectorDevices.htm#PSPDF_IN
- https://askubuntu.com/questions/113544/how-can-i-reduce-the-file-size-of-a-scanned-pdf-file#answer-256449
