---
id: "ai-qwen3-tts"
path: "/tutorials/ai-qwen3-tts"
created: "2026-02-26"
updated: "2026-02-26"
title: "QWEN3 TTS (text to speech)"
description: "Turn text into speech using AI with Qwen3 TTS. E.g. PDF scripts you rather listen to instead of reading them."
author: "Simon Scholz"
tags: ["ai", "qwen", "qwen3", "tts", "text to speech"]
vgWort: "vg02.met.vgwort.de/na/4e6405a0e8d5448b8d778c417aabc544"
---

Nowadays I´d rather gain my knowledge by listening instead of reading through a blog post or script.
Especially lightweight content can be consumed while walking or going other physical activities.

Recently my nephew, who is currently studying at a university, asked me if I could turn the scripts, he got from his professor, into audio.

I tried different things like [piper tts](https://github.com/OHF-Voice/piper1-gpl) and [parler tts](https://github.com/huggingface/parler-tts) and then heard of [qwen3 tts](https://qwen.ai/blog?id=qwen3tts-0115).

## Install Dependencies

```bash
# audio processing
sudo apt update && sudo apt install sox libsox-dev
```

## Setup Python Environment

Ensure that you have Python installed on your system.

```bash
# create a directory for the project
mkdir qwen-tts
cd qwen-tts

# create a virtual environment
python -m venv qwen_tts_env

# activate the virtual environment
source qwen_tts_env/bin/activate

# install packages
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
pip install qwen-tts soundfile
```

Since I want to run this on my local machine, I installed the CPU version of PyTorch. If you have a compatible GPU, you can install the GPU version for better performance.

## Convert Text to Speech

Inside the project directory, create a Python script named `text_to_speech.py`.
In the following code snippet, we load the Qwen3 TTS model, generate speech from a sample text, and save the output as a WAV file.

```python
import os
import time
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import transformers

# --- CONFIGURATION ---
SPEAKER = "Aiden"
NUM_THREADS = 6
MODEL_ID = "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice"
OUTPUT_FILE = "output.wav"
# ---------------------

# How many threads to use for CPU processing (adjust based on your CPU cores)
torch.set_num_threads(NUM_THREADS)

# Omit verbose logging from the model
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
transformers.logging.set_verbosity_error()


print(f"--- Running with {torch.get_num_threads()} threads ---")

# track overall time of the process
overall_start = time.perf_counter()

model = Qwen3TTSModel.from_pretrained(
    MODEL_ID,
    device_map="cpu",
    torch_dtype=torch.float32,
)

print("--- Model Loaded. Starting Generation... ---")

wavs, sr = model.generate_custom_voice(
    text="Hallo! Danke, dass du meine Tutorials liest. Probier doch mal verschiedene Sprecher aus.",
    language="German",
    speaker="Aiden",
)

# 4. Save the result
sf.write(OUTPUT_FILE, wavs[0], sr)
print(f"--- Finished! Audio saved as {OUTPUT_FILE} in {time.perf_counter() - overall_start:.2f} seconds ---")

```

In the configuration section, you can specify the speaker, number of threads for CPU processing, model ID, and output file name.

Available speakers include 

- Aiden
- Lenn
- Ryan
- and more. 

Also see https://qwen.ai/blog?id=qwen3-tts-1128 for more details.

For this german example I consider Aiden to be the best choice.
Let me know in the comments which speaker you like best.

### Run the script

```bash
python text_to_speech.py
```

## Convert wav to m4a

To decrease the file size, you can convert the generated WAV file to M4A format using the `sox` command-line tool:

```bash
sox output.wav output.m4a
# specify bitrate
sox output.wav -C 128 output.m4a
```

The popular `ffmpeg` tool can also be used for this purpose:

```bash
ffmpeg -i output.wav -c:a aac -q:a 128k output.m4a
```
- `-i output.wav`: Specifies the input WAV file.
- `-c:a aac`: Use the AAC codec for audio encoding.
- `-q:a 128k`: Set the audio quality to 128 kbps

# Sources

- https://qwen.ai/blog?id=qwen3-tts-1128
- https://github.com/QwenLM/Qwen3-TTS
- https://huggingface.co/collections/Qwen/qwen3-tts

