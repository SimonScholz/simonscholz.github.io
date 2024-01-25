---
id: "youtube-dl"
path: "/tutorials/youtube-dl"
created: "2023-09-12"
updated: "2023-09-12"
title: "Youtube-dl - Download videos or audio from youtube"
description: "CLI Tool to download youtube videos or audio"
author: "Simon Scholz"
tags: ["youtube", "youtube-dl", "cli", "linux", "ubuntu"]
vgWort: "vg08.met.vgwort.de/na/6ea8599f9ad74fb4b9fb2b53f661da4a"
---

YouTube-DL is a powerful command-line tool for downloading videos and audio from various websites, including YouTube, Vimeo, SoundCloud, and many others. It's a versatile tool that can be used on Windows, macOS, and Linux.

## Install youtube-dl

Download it directly:

```shell
sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl

sudo chmod a+rx /usr/local/bin/youtube-dl
```

In case you´d prefer apt package manager:

```shell
sudo add-apt-repository ppa:tomtomtom/youtube-dl

sudo apt install youtube-dl
```

For other operating systems see https://github.com/ytdl-org/youtube-dl#installation

## Download video contents


Find out about different formats, which can be downloaded:

```shell
youtube-dl -F [youtube-video-url]

# e.g.

youtube-dl -F https://www.youtube.com/watch?v=2M4cd8EvFqg
```

The output of the example above should look similar to this:

```shell
[youtube] 2M4cd8EvFqg: Downloading API JSON
[info] Available formats for 2M4cd8EvFqg:
format code  extension  resolution note
249          webm       audio only tiny   51k , webm_dash container, opus  (48000Hz), 1.26MiB
250          webm       audio only tiny   65k , webm_dash container, opus  (48000Hz), 1.60MiB
251          webm       audio only tiny  124k , webm_dash container, opus  (48000Hz), 3.04MiB
140          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2 (44100Hz), 3.15MiB
278          webm       256x144    144p   77k , webm_dash container, vp9, 25fps, video only, 1.87MiB
160          mp4        256x144    144p   79k , mp4_dash container, avc1.4d400c, 25fps, video only, 1.92MiB
242          webm       426x240    240p  122k , webm_dash container, vp9, 25fps, video only, 2.97MiB
133          mp4        426x240    240p  174k , mp4_dash container, avc1.4d4015, 25fps, video only, 4.22MiB
243          webm       640x360    360p  199k , webm_dash container, vp9, 25fps, video only, 4.84MiB
134          mp4        640x360    360p  322k , mp4_dash container, avc1.4d401e, 25fps, video only, 7.81MiB
244          webm       854x480    480p  329k , webm_dash container, vp9, 25fps, video only, 8.00MiB
135          mp4        854x480    480p  602k , mp4_dash container, avc1.4d401e, 25fps, video only, 14.62MiB
18           mp4        640x360    360p  450k , avc1.42001E, 25fps, mp4a.40.2 (44100Hz) (best)
```

The `format code` at the beginning can now be used to download the actually desired format.

```shell
youtube-dl -f [format-code] [youtube-video-url]

# e.g.

youtube-dl -f 135 https://www.youtube.com/watch?v=2M4cd8EvFqg
```

## Extract audio from video

You can either choose to download an `audio only` format listed above or use the `-x` flag:

```shell
youtube-dl -x [youtube-video-url]

# e.g.

youtube-dl -x https://www.youtube.com/watch?v=2M4cd8EvFqg
```

You can also change the format of the audio file:

```shell
youtube-dl -x --audio-format mp3 --audio-quality 0 [youtube-video-url]

# e.g.

youtube-dl -x --audio-format mp3 --audio-quality 0 https://www.youtube.com/watch?v=2M4cd8EvFqg
```

## Sources

- Run `youtube-dl --help`
- https://github.com/ytdl-org/youtube-dl
- https://wiki.ubuntuusers.de/youtube-dl/
