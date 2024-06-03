import sys
import torch
from TTS.api import TTS
import numpy as np

# Check if the correct number of arguments is provided
if len(sys.argv) != 4:
    print("Usage: python tts_script.py <text_file_path> <audio_file_path> <output_file_path>")
    sys.exit(1)

# Get the file paths from the command line arguments
text_file_path = sys.argv[1]
audio_file_path = sys.argv[2]
output_file_path = sys.argv[3]

# Read the text from the file
with open(text_file_path, 'r', encoding='utf-8') as file:
    text = file.read()

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Init TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", progress_bar=True).to(device)

# Run TTS and save to file
tts.tts_to_file(text=text, speaker_wav=audio_file_path, language="pl", file_path=output_file_path)

print(f"{output_file_path}")
