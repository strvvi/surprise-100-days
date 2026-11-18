#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/upload_story.sh <path_to_video_or_image>"
  exit 1
fi

FILE="$1"
if [ ! -f "$FILE" ]; then
  echo "Error: File $FILE does not exist!"
  exit 1
fi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

FILENAME=$(basename "$FILE")
TARGET_PATH="photos/$FILENAME"

echo "📸 Copying $FILENAME to photos/..."
cp "$FILE" "$TARGET_PATH"

echo "⚙️ Running process_new_stories.py..."
python3 scripts/process_new_stories.py

echo "🚀 Committing and pushing to GitHub..."
git add photos/ thumbnails/ js/config.js index.html
git commit -m "✨ Add new story: $FILENAME"
git push origin main

echo "🎉 Done! Story uploaded and published to https://strvvi.github.io/surprise-100-days/"
