---
id: "ipp-print-java-kotlin"
path: "/tutorials/ipp-print-java-kotlin"
created: "2024-09-09"
updated: "2024-09-09"
title: "Print documents using ipp with Java/Kotlin"
description: "This tutorial depicts how to print documents, e.g., PDFs or Images, using IPP (Internet Printing Protocol) with Java/Kotlin"
author: "Simon Scholz"
tags: ["ipp", "print", "java", "kotlin", "ipp-client"]
vgWort: "vg09.met.vgwort.de/na/742c851decbe4dd7b099d218ba767bb5"
---

IPP (Internet Printing Protocol) can be used to send jobs to a printer via internet or local network.
For Java and Kotlin there are several libraries, which support finding printer in a network and finally printing documents.
In this tutorial we´ll walk through the concepts of finding printers in the network and derive the capabilities of that printer.
And then trying to print documents such as images and PDF files by honoring the printer´s capabilities.

## Prerequisites

- Java / Kotlin
- Gradle
- A printer that supports IPP (Internet Printing Protocol)

## Create a project and adding dependencies

The following command will generate a kotlin application project called `ipp-print`.

```bash
gradle init \
    --type kotlin-application \
    --dsl kotlin \
    --test-framework junit-jupiter \
    --project-name ipp-print \
    --package com.example \
    --no-split-project \
    --no-incubating \
    --java-version 21
```

For other options run `gradle help --task init`.

Now that we have a project in place we can add the required dependencies to it.

First the `libs.versions.toml` file in the `gradle` folder needs to be modified:

```toml[libs.versions.toml]
[versions]
ipp-client = "3.1"
jmdns = "3.5.12"
jipp = "0.7.16"
pdfbox = "3.0.3"

[libraries]
ipp-client = { group = "de.gmuth", name = "ipp-client", version.ref = "ipp-client" }
jmdns = { group = "org.jmdns", name = "jmdns", version.ref = "jmdns" }
jipp-core = { group = "com.hp.jipp", name = "jipp-core", version.ref = "jipp" }
jipp-pdl = { group = "com.hp.jipp", name = "jipp-pdl", version.ref = "jipp" }
pdfbox = { group = "org.apache.pdfbox", name = "pdfbox", version.ref = "pdfbox" }
logging = { group = "io.github.oshai", name = "kotlin-logging-jvm", version = "7.0.0" }
```

Feel free to leave the existing declarations in the `libs.versions.toml` file as is, but we do not need them for this tutorial.

```kotlin[build.gradle.kts]
dependencies {

    // ... other dependencies ...

    // printer libs
    implementation(libs.ipp.client)
    implementation(libs.jmdns)
    implementation(libs.jipp.core)
    implementation(libs.jipp.pdl)
    implementation(libs.pdfbox)
    implementation(libs.logging)
}
```

For more information on how to use toml files in Gradle please see my other tutorial on this topic: https://simonscholz.dev/tutorials/gradle-toml-version-catalogs

## Finding printers in your local network

The `org.jmdns:jmdns:3.5.12` dependency is used to find the printers in your network.

Let´s create a simple `Printer` data class first to store printers being found in your network:

```kotlin[Printer.kt]
import java.net.URI

data class Printer(
    val name: String,
    val ipAddress: URI,
)
```

Then we´ll have a `PrinterLookup` class, which listens for printers in the network:

```kotlin[PrinterLookup.kt]
import io.github.oshai.kotlinlogging.KotlinLogging
import java.net.InetAddress
import java.net.URI
import javax.jmdns.JmDNS
import javax.jmdns.ServiceEvent
import javax.jmdns.ServiceListener

class PrinterLookup {
    private val jmdns: JmDNS = JmDNS.create(InetAddress.getLocalHost())
    private val printerSet = mutableSetOf<Printer>()

    val printers get() = printerSet.toSet()

    private val printerServiceListener =
        object : ServiceListener {
            override fun serviceAdded(event: ServiceEvent) {
                logger.debug { "Service added: ${event.info}" }
            }

            override fun serviceRemoved(event: ServiceEvent) {
                logger.debug { "Service removed: ${event.info}" }
            }

            override fun serviceResolved(event: ServiceEvent) {
                logger.info { "Service resolved: ${event.info}" }
                val printerUri = URI.create("ipp:/${event.info.inet4Addresses.first()}/ipp/printer")
                printerSet.add(Printer(event.info.name, printerUri))
            }
        }

    fun registerPrinterListener() {
        jmdns.addServiceListener(SERVICE_LISTENER_TYPE, printerServiceListener)
    }

    fun unRegisterPrinterListener() {
        jmdns.unregisterAllServices()
        jmdns.removeServiceListener(SERVICE_LISTENER_TYPE, printerServiceListener)
    }

    companion object {
        private const val SERVICE_LISTENER_TYPE = "_http._tcp.local."
        private val logger = KotlinLogging.logger {}
    }
}

```

Whenever a printer is resolved, we´ll create an instance of the `Printer` data class and add it to a `Set<Printer>` in order to avoid duplicate entries.
In the next steps the printers being found will actually be used.

## Analyze printer capabilities

The `main` function in the generated `App.kt` file can now be modified like this:

```kotlin[App.kt]
import de.gmuth.ipp.client.IppPrinter
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.logging.Logger

private val javaLogger: Logger = Logger.getLogger("PrinterLogger")

fun main() {
    val lookup = PrinterLookup()
    try {
        lookup.registerPrinterListener()
        val scheduler = Executors.newSingleThreadScheduledExecutor()
        scheduler.scheduleAtFixedRate({
            printPrinterData(lookup)
        }, 10, 20, TimeUnit.SECONDS)

        Thread.sleep(Long.MAX_VALUE)
    } finally {
        lookup.unRegisterPrinterListener()
    }
}

private fun printPrinterData(lookup: PrinterLookup) {
    if (lookup.printers.isNotEmpty()) {
        lookup.printers.forEach {
            javaLogger.info { "Log properties of printer: ${it.name}" }
            val ippPrinter = IppPrinter(it.ipAddress)
            ippPrinter.log(javaLogger)
        }
    } else {
        javaLogger.warning { "Haven´t found any printer yet" }
    }
}
```

Here a `PrinterLookup` instance is created and the `registerPrinterListener` is being called.
Since the listing for printer services might take some time a `Scheduler` with an initial delay of 10 seconds is being used to allow waiting for printers to be found.

The `printPrinterData` function then creates an instance of `IppPrinter`, which is capable to log out the capabilities and settings of the found printers.

For my printer, which is an HP ENVY 4520, the logs look like this:

```log
[JmDNS pool-1-thread-1] INFO com.example.PrinterLookup - Service resolved: [ServiceInfoImpl@1142157680 name: 'HP ENVY 4520 series [B519A4]._http._tcp.local.' address: '/192.168.35.29:80 ' status: 'NO DNS state: probing 1 task: null' is persistent, has data, empty]
[JmDNS pool-1-thread-1] INFO com.example.PrinterLookup - Service resolved: [ServiceInfoImpl@1291222132 name: 'HP ENVY 4520 series [B519A4]._http._tcp.local.' address: '/192.168.35.29:80 /fe80:0:0:0:ee8e:b5ff:feb5:19a4:80 ' status: 'NO DNS state: probing 1 task: null' is persistent, has data, empty]
[JmDNS pool-1-thread-1] INFO com.example.PrinterLookup - Service resolved: [ServiceInfoImpl@2040285764 name: 'HP ENVY 4520 series [B519A4]._http._tcp.local.' address: '/192.168.35.29:80 /fe80:0:0:0:ee8e:b5ff:feb5:19a4:80 /2003:c4:b701:1400:ee8e:b5ff:feb5:19a4:80 ' status: 'NO DNS state: probing 1 task: null' is persistent, has data, empty]
Sep 10, 2024 11:13:09 AM com.example.AppKt printPrinterData
INFO: Log properties of printer: HP ENVY 4520 series [B519A4]
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO: PRINTER HPB519A4 (HP ENVY 4520 series)
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-uri-supported (1setOf uri) = ipp://192.168.35.29/ipp/print,ipps://192.168.35.29:443/ipp/print
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   uri-security-supported (1setOf keyword) = none,tls
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   uri-authentication-supported (1setOf keyword) = requesting-user-name,requesting-user-name
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-settable-attributes-supported (1setOf keyword) = none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-wifi-ssid (nameWithoutLanguage) = Himbeereis
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-wifi-state (enum) = 8
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-name (nameWithoutLanguage) = HPB519A4
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-location (textWithoutLanguage) = 
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-more-info (uri) = http://192.168.35.29/#hId-pgAirPrint
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-info (textWithoutLanguage) = HP ENVY 4520 series [B519A4]
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-dns-sd-name (nameWithoutLanguage) = HP ENVY 4520 series [B519A4]
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-make-and-model (textWithoutLanguage) = HP ENVY 4520 series
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-state (enum) = idle
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-state-reasons (1setOf keyword) = none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-state-message (textWithoutLanguage) = 
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   ipp-versions-supported (1setOf keyword) = 1.0,1.1,2.0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   operations-supported (1setOf enum) = Print-Job,Validate-Job,Cancel-Job,Cancel-My-Jobs,Get-Job-Attributes,Get-Jobs,Get-Printer-Attributes,Create-Job,Send-Document,Set-Printer-Attributes,Print-URI,Send-URI,Resubmit-Job,Identify-Printer
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   charset-configured (charset) = us-ascii
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   charset-supported (1setOf charset) = us-ascii,utf-8
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   natural-language-configured (naturalLanguage) = en
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   generated-natural-language-supported (1setOf naturalLanguage) = en
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   document-format-default (mimeMediaType) = application/octet-stream
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   document-format-supported (1setOf mimeMediaType) = application/vnd.hp-PCL,image/jpeg,application/PCLm,image/urf,image/pwg-raster,application/octet-stream
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   document-format-version-supported (1setOf textWithoutLanguage) = PCL3GUI,PJL,Automatic,JPEG,PCLM,AppleRaster,PWGRaster
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-is-accepting-jobs (boolean) = true
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   queued-job-count (integer) = 0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pdl-override-supported (keyword) = attempted
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-up-time (integer) = 2689 (1970-01-01T00:44:49Z)
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-current-time (no-value) = no-value
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   compression-supported (1setOf keyword) = none,deflate,gzip
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   color-supported (boolean) = true
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   job-creation-attributes-supported (1setOf keyword) = copies,finishings,sides,orientation-requested,media,print-quality,printer-resolution,output-bin,media-col,output-mode,print-content-optimize,pclm-source-resolution,print-color-mode,ipp-attribute-fidelity,job-name,page-ranges,multiple-document-handling,print-rendering-intent,print-scaling
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   reference-uri-schemes-supported (1setOf uriScheme) = http,https
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-device-id (textWithoutLanguage) = MFG:HP;MDL:ENVY 4520 series;CMD:PCL3GUI,PJL,Automatic,JPEG,PCLM,AppleRaster,PWGRaster,DW-PCL,802.11,DESKJET,DYN;CLS:PRINTER;DES:F0V63B;CID:HPIJVIPAV4;LEDMDIS:USB#FF#CC#00,USB#07#01#02,USB#FF#04#01;SN:TH66S3D16K0660;S:038080C480a00001002c2400014c140003c;Z:05000009000009,12000,17000000000000,181;
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-alert (1setOf octetString) = code=unknown;severity=otherother,code=unknown;severity=otherother,code=unknown;severity=other;group=other,code=unknown;severity=other;group=other,code=unknown;severity=otherother,code=unknown;severity=warning;group=other,code=printerReadyToPrint;severity=other;group=generalPrinter,code=unknown;severity=other;group=other
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-alert-description (1setOf textWithoutLanguage) = supplyInkLevelChange,inkSystemReady,genuineHP,genuineHP,inkSystemReady,calibrationRequired,ready,inPowerSave
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-uuid (uri) = urn:uuid:1c852a4d-b800-1f08-abcd-ec8eb5b519a4
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   landscape-orientation-requested-preferred (enum) = 5
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   job-constraints-supported (1setOf collection) = {resolver-name=duplex-sizes sides=two-sided-short-edge,two-sided-long-edge media=na_legal_8.5x14in,na_govt-letter_8x10in,na_invoice_5.5x8.5in,jpn_hagaki_100x148mm,na_index-4x6_4x6in,na_monarch_3.875x7.5in,na_number-10_4.125x9.5in,iso_dl_110x220mm,iso_c5_162x229mm,iso_c6_114x162mm,na_a2_4.375x5.75in,jpn_chou3_120x235mm,jpn_chou4_90x205mm,oe_photo-l_3.5x5in,na_5x7_5x7in,na_personal_3.625x6.5in,iso_b5_176x250mm,om_small-photo_100x150mm,oe_photo_4x5in,na_foolscap_8.5x13in}
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   job-resolvers-supported (1setOf collection) = {resolver-name=duplex-sizes sides=one-sided}
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   ipp-features-supported (1setOf keyword) = airprint-1.4,ipp-everywhere
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   which-jobs-supported (1setOf keyword) = completed,not-completed,all
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   job-ids-supported (boolean) = true
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   requesting-user-uri-supported (boolean) = true
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   multiple-operation-time-out-action (keyword) = process-job
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-geo-location (unknown) = no-value
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   mopria-certified (textWithoutLanguage) = 1.3
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   preferred-attributes-supported (boolean) = false
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-config-change-date-time (no-value) = no-value
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-config-change-time (integer) = 0 (1970-01-01T00:00Z)
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-state-change-date-time (no-value) = no-value
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-state-change-time (integer) = 0 (1970-01-01T00:00Z)
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   document-password-supported (integer) = 0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-kind (1setOf keyword) = document,envelope,photo,postcard
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-supported (1setOf keyword) = na_executive_7.25x10.5in,na_letter_8.5x11in,na_legal_8.5x14in,na_govt-letter_8x10in,na_invoice_5.5x8.5in,iso_a5_148x210mm,iso_a4_210x297mm,jis_b5_182x257mm,jpn_hagaki_100x148mm,iso_a6_105x148mm,na_index-4x6_4x6in,na_index-5x8_5x8in,na_index-3x5_3x5in,na_monarch_3.875x7.5in,na_number-10_4.125x9.5in,iso_dl_110x220mm,iso_c5_162x229mm,iso_c6_114x162mm,na_a2_4.375x5.75in,jpn_chou3_120x235mm,jpn_chou4_90x205mm,oe_photo-l_3.5x5in,na_5x7_5x7in,na_personal_3.625x6.5in,iso_b5_176x250mm,om_small-photo_100x150mm,oe_photo_4x5in,na_foolscap_8.5x13in,custom_min_3x5in,custom_max_8.5x14in
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-default (keyword) = iso_a4_210x297mm
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-col-supported (1setOf keyword) = media-type,media-size,media-top-margin,media-left-margin,media-right-margin,media-bottom-margin,media-source,media-size-name
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-col-default (collection) = {media-size={x-dimension=21000 y-dimension=29700} media-top-margin=296 media-bottom-margin=296 media-left-margin=296 media-right-margin=296 media-source=main media-type=stationery}
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-left-margin-supported (1setOf integer) = 296,0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-right-margin-supported (1setOf integer) = 296,0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-top-margin-supported (1setOf integer) = 296,0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-bottom-margin-supported (1setOf integer) = 296,0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-source-supported (1setOf keyword) = main
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-type-supported (1setOf keyword) = stationery,photographic-glossy,com.hp.specialty-glossy,com.hp.specialty-matte
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-size-supported (1setOf collection) = {x-dimension=18415 y-dimension=26670},{x-dimension=21590 y-dimension=27940},{x-dimension=21590 y-dimension=35560},{x-dimension=20320 y-dimension=25400},{x-dimension=13970 y-dimension=21590},{x-dimension=14800 y-dimension=21000},{x-dimension=21000 y-dimension=29700},{x-dimension=18200 y-dimension=25700},{x-dimension=10000 y-dimension=14800},{x-dimension=10500 y-dimension=14800},{x-dimension=10160 y-dimension=15240},{x-dimension=12700 y-dimension=20320},{x-dimension=7620 y-dimension=12700},{x-dimension=9842 y-dimension=19050},{x-dimension=10477 y-dimension=24130},{x-dimension=11000 y-dimension=22000},{x-dimension=16200 y-dimension=22900},{x-dimension=11400 y-dimension=16200},{x-dimension=11112 y-dimension=14605},{x-dimension=12000 y-dimension=23500},{x-dimension=9000 y-dimension=20500},{x-dimension=8890 y-dimension=12700},{x-dimension=12700 y-dimension=17780},{x-dimension=9207 y-dimension=16510},{x-dimension=17600 y-dimension=25000},{x-dimension=10000 y-dimension=15000},{x-dimension=10160 y-dimension=12700},{x-dimension=21590 y-dimension=33020},{x-dimension=7620..21590 y-dimension=12700..35560}
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-ready (1setOf keyword) = iso_a4_210x297mm
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   media-col-ready (1setOf collection) = {media-size={x-dimension=21000 y-dimension=29700} media-top-margin=296 media-bottom-margin=296 media-left-margin=296 media-right-margin=296 media-source=main media-type=stationery},{media-size={x-dimension=21000 y-dimension=29700} media-top-margin=0 media-bottom-margin=0 media-left-margin=0 media-right-margin=0 media-source=main media-type=stationery},{media-size={x-dimension=21000 y-dimension=29700} media-top-margin=296 media-bottom-margin=296 media-left-margin=296 media-right-margin=296 media-source=main media-type=stationery}
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pages-per-minute (integer) = 9
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pages-per-minute-color (integer) = 6
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   jpeg-k-octets-supported (rangeOfInteger) = 0-12288
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   jpeg-x-dimension-supported (rangeOfInteger) = 0-8192
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   jpeg-y-dimension-supported (rangeOfInteger) = 1-8192
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pdf-versions-supported (1setOf keyword) = none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   urf-supported (1setOf keyword) = CP1,MT1-2-8-9-10-11,PQ3-4-5,RS300,SRGB24,OB9,OFU0,W8-16,DEVW8-16,DEVRGB24-48,ADOBERGB24-48,DM3,IS1,V1.4
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-names (1setOf nameWithoutLanguage) = tri-color ink,black ink
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-colors (1setOf nameWithoutLanguage) = #00FFFF#FF00FF#FFFF00,#000000
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-types (1setOf keyword) = ink-cartridge,ink-cartridge
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-low-levels (1setOf integer) = 1,1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-high-levels (1setOf integer) = 100,100
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   marker-levels (1setOf integer) = 20,60
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-supply (1setOf octetString) = type=inkCartridge;maxcapacity=100;level=20;class=supplyThatIsConsumed;unit=percent;colorantname=multi-color;,type=inkCartridge;maxcapacity=100;level=60;class=supplyThatIsConsumed;unit=percent;colorantname=black;
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-supply-description (1setOf textWithoutLanguage) = ,
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-firmware-name (1setOf nameWithoutLanguage) = CFP1FN2023BR
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-firmware-string-version (1setOf textWithoutLanguage) = CFP1FN2023BR
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-firmware-version (1setOf octetString) = CFP1FN2023BR
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-input-tray (1setOf octetString) = type=sheetFeedAutoNonRemovable;dimunit=micrometers;mediafeed=297000;mediaxfeed=210000;maxcapacity=-2;level=-2;status=0;name=InputTray1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-output-tray (1setOf octetString) = type=unknown;maxcapacity=-2;remaining=-2;status=5;stackingorder=unknown;pagedelivery=faceUp;name=OutputTray1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   copies-default (integer) = 1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   finishings-default (1setOf enum) = none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   orientation-requested-default (enum) = portrait
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-quality-default (enum) = normal
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-resolution-default (resolution) = 300 dpi
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   sides-default (keyword) = one-sided
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   output-bin-default (keyword) = face-up
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   output-mode-default (keyword) = auto
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-color-mode-default (keyword) = auto
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   multiple-document-handling-default (keyword) = separate-documents-uncollated-copies
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   number-up-default (integer) = 1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   presentation-direction-number-up-default (keyword) = toright-tobottom
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-rendering-intent-default (keyword) = auto
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-scaling-default (keyword) = auto
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   copies-supported (rangeOfInteger) = 1-99
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   finishings-supported (1setOf enum) = none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   orientation-requested-supported (1setOf enum) = portrait
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-quality-supported (1setOf enum) = draft,normal,high
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-resolution-supported (1setOf resolution) = 300 dpi
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   sides-supported (1setOf keyword) = one-sided,two-sided-short-edge,two-sided-long-edge
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   output-bin-supported (1setOf keyword) = face-up
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   output-mode-supported (1setOf keyword) = auto,auto-monochrome,monochrome,color
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-color-mode-supported (1setOf keyword) = auto,auto-monochrome,monochrome,color,process-monochrome
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   page-ranges-supported (boolean) = true
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   multiple-document-handling-supported (1setOf keyword) = separate-documents-uncollated-copies,separate-documents-collated-copies
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   number-up-supported (1setOf integer) = 1
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   presentation-direction-number-up-supported (1setOf keyword) = toright-tobottom
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-rendering-intent-supported (1setOf keyword) = auto,perceptual
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-scaling-supported (1setOf keyword) = auto,auto-fit,fill,fit,none
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-icons (1setOf uri) = http://192.168.35.29/webApps/images/printer-small.png,http://192.168.35.29/webApps/images/printer.png,http://192.168.35.29/webApps/images/printer-large.png
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-supply-info-uri (uri) = http://192.168.35.29/#hId-pgInkConsumables
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-content-optimize-default (keyword) = auto
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   print-content-optimize-supported (1setOf keyword) = auto,photo,graphics,text,text-and-graphics
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pwg-raster-document-sheet-back (keyword) = rotated
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pwg-raster-document-type-supported (1setOf keyword) = sgray_8,srgb_8,adobe-rgb_8,sgray_16,srgb_16,adobe-rgb_16,rgb_8,rgb_16
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pwg-raster-document-resolution-supported (1setOf resolution) = 300 dpi
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   epcl-version-supported (textWithoutLanguage) = 1.0
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   manual-duplex-supported (boolean) = false
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-source-resolution-supported (1setOf resolution) = 300 dpi,600 dpi
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-source-resolution-default (resolution) = 600 dpi
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-strip-height-supported (integer) = 16
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-strip-height-preferred (1setOf integer) = 16
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-raster-back-side (keyword) = rotated
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   pclm-compression-method-preferred (1setOf keyword) = jpeg,flate,rle
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   document-format-varying-attributes (1setOf keyword) = copies
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-get-attributes-supported (1setOf keyword) = document-format
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-organization (1setOf textWithoutLanguage) = 
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   printer-organizational-unit (1setOf textWithoutLanguage) = 
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   identify-actions-default (1setOf keyword) = display
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   identify-actions-supported (1setOf keyword) = display,pin
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   limit-operations-supported (enum) = 10
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   multiple-operation-time-out (integer) = 120
Sep 10, 2024 11:13:09 AM de.gmuth.ipp.core.IppAttributesGroup log
INFO:   multiple-document-jobs-supported (boolean) = false
```

## Printing documents

In order to print documents the logs above can give you important insights what your printer is capable of.
Especially the supported formats listed as `mimeMediaType` are important to honor, because the printer might otherwise raise errors.

```log
INFO:   document-format-supported (1setOf mimeMediaType) = application/vnd.hp-PCL,image/jpeg,application/PCLm,image/urf,image/pwg-raster,application/octet-stream
```

The `de.gmuth.ipp.attributes.DocumentFormat` class consists of the most commonly used document format mediaMimeTypes:

* application/octet-stream
* application/postscript
* application/pdf
* image/pwg-raster
* image/tiff
* image/jpeg
* image/png
* vnd.hp-PCL

### Printing an image



### Printing a pdf

### Cope with pdf printing issues

My printer does not directly support `application/pdf` as format that´s why I need to convert my pdf files into `pwg-raster` files.
Doing so can be done using [JIPP](https://github.com/HPInc/jipp).

## Visualize pwg files

In order to visualize pwg files tools like [Rasterview](https://github.com/michaelrsweet/rasterview) can be used.

I installed it using snap on my Ubuntu OS.

```bash
sudo snap install rasterview
```

## Sources

- https://github.com/gmuth/ipp-client-kotlin
- https://github.com/jmdns/jmdns
- https://github.com/HPInc/jipp
- https://github.com/michaelrsweet/rasterview
- https://manpages.debian.org/testing/poppler-utils/pdftocairo.1.en.html#pdf