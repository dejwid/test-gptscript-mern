#!/bin/bash

audio_file=${audio_file:-""}
model=${model:-"whisper-1"}
response_format=${response_format:-"json"}
output_file=${output_file:-"transcription"}

if [ -z "$OPENAI_API_KEY" ]; then
echo "OPENAI_API_KEY is not set. Unable to transcribe audio. Please set the OPENAI_API_KEY as an environment variable."
exit 1
fi

if [ -z "$audio_file" ]; then
echo "audio_file argument is empty, but required. Unable to transcribe audio. Please provide the audio_file arg."
exit 1
fi

print the curl with values instead of variable names before running it

curl --request POST --verbose --url https://api.openai.com/v1/audio/transcriptions --header "Authorization: Bearer $OPENAI_API_KEY" --header "Content-Type: multipart/form-data" -F "file=@${audio_file}" -F "model=whisper-1" -F "timestamp_granularities[]=word" -F response_format="verbose_json" --output "$output_file"