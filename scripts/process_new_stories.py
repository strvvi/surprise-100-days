#!/usr/bin/env python3
import os
import sys
import re
import subprocess
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS_DIR = os.path.join(ROOT_DIR, 'photos')
THUMBS_DIR = os.path.join(ROOT_DIR, 'thumbnails')
CONFIG_PATH = os.path.join(ROOT_DIR, 'js', 'config.js')
INDEX_PATH = os.path.join(ROOT_DIR, 'index.html')

IGNORED_FILES = {
    '.DS_Store', 'avatar.svg', 'sanrio.svg', 'usagi.png', 'usagi.svg',
    'usagi_cute.png', 'usagi_running.jpg', 'momonga.png', 'momonga_avatar.png',
    'og_cover.png', 'story1.svg', 'story2.svg', 'story3.svg', 'story4.svg', 'story5.svg'
}

def get_existing_media():
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    matches = re.findall(r'media:\s*["\']photos/([^"\']+)["\']', content)
    return set(matches), content

def generate_thumbnail(media_path, thumb_path):
    os.makedirs(THUMBS_DIR, exist_ok=True)
    ext = os.path.splitext(media_path)[1].lower()
    if ext in ['.mov', '.mp4', '.m4v']:
        cmd = ['ffmpeg', '-y', '-i', media_path, '-ss', '00:00:01', '-vframes', '1', '-q:v', '2', thumb_path]
        try:
            res = subprocess.run(cmd, capture_output=True)
            if res.returncode == 0 and os.path.exists(thumb_path):
                return True
        except Exception:
            pass
        try:
            cmd = ['qlmanage', '-t', '-s', '600', '-o', '/tmp', media_path]
            subprocess.run(cmd, capture_output=True)
            base = os.path.basename(media_path)
            tmp_thumb = f'/tmp/{base}.png'
            if os.path.exists(tmp_thumb):
                import shutil
                shutil.move(tmp_thumb, thumb_path)
                return True
        except Exception:
            pass
    elif ext in ['.png', '.jpg', '.jpeg']:
        import shutil
        shutil.copy2(media_path, thumb_path)
        return True
    return False

def get_media_date(media_path):
    try:
        res = subprocess.run(['mdls', '-name', 'kMDItemContentCreationDate', media_path], capture_output=True, text=True)
        if res.returncode == 0 and 'kMDItemContentCreationDate' in res.stdout:
            date_str = res.stdout.split('=')[-1].strip()
            dt = datetime.strptime(date_str[:10], '%Y-%m-%d')
            return f'{dt.month}月{dt.day}日', dt.strftime('%Y.%m.%d')
    except Exception:
        pass
    now = datetime.now()
    return f'{now.month}月{now.day}日', now.strftime('%Y.%m.%d')

def main():
    existing_media, config_content = get_existing_media()
    all_files = sorted(os.listdir(PHOTOS_DIR))
    
    new_files = []
    for f in all_files:
        if f in IGNORED_FILES or f.startswith('.'):
            continue
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.mov', '.mp4', '.png', '.jpg', '.jpeg', '.heic']:
            if f not in existing_media:
                new_files.append(f)
                
    if not new_files:
        print('No new media files found. Everything is up to date!')
        return 0

    print(f'Found {len(new_files)} new story media files: {new_files}')

    story_ids = [int(m) for m in re.findall(r'id:\s*(\d+)', config_content)]
    last_id = max(story_ids) if story_ids else 0

    new_stories_js = []
    new_polaroids_js = []

    for f in new_files:
        last_id += 1
        media_rel = f'photos/{f}'
        full_path = os.path.join(PHOTOS_DIR, f)
        thumb_path = os.path.join(THUMBS_DIR, f'{f}.png')
        
        generate_thumbnail(full_path, thumb_path)
        date_display, date_full = get_media_date(full_path)
        
        story_entry = (
            "    {\n"
            f"      id: {last_id},\n"
            f"      media: \"{media_rel}\",\n"
            "      type: \"video\",\n"
            f"      date: \"{date_display}\",\n"
            "      location: \"我們的回憶足跡 📍\",\n"
            "      caption: \"每一天都要一起記錄美好回憶 ✨ 走過的每一天都有妳的笑容。\",\n"
            "      likes: \"520\",\n"
            "      avatar: \"photos/momonga_avatar.png\"\n"
            "    }"
        )
        new_stories_js.append(story_entry)

        polaroid_entry = (
            "    {\n"
            f"      media: \"{media_rel}\",\n"
            "      title: \"專屬兩人的美好時光\",\n"
            f"      date: \"{date_full}\",\n"
            "      rotate: \"2deg\"\n"
            "    }"
        )
        new_polaroids_js.append(polaroid_entry)

    # Insert into config.js stories
    stories_end_pattern = r'(\s+likes:\s*"520",\s+avatar:\s*"[^"]+"\s+\}\s+)(\],\s+// 拍立得)'
    match = re.search(stories_end_pattern, config_content)
    if match:
        insert_text = ',\n' + ',\n'.join(new_stories_js) + '\n  '
        config_content = config_content[:match.end(1)] + insert_text + config_content[match.start(2):]
    else:
        print('Could not find insertion point for stories!')
        return 1

    # Insert into polaroids
    polaroid_end_pattern = r'(\s+rotate:\s*"[^"]+"\s+\}\s+)(\],\s+// 專屬約會願望兌換券)'
    match2 = re.search(polaroid_end_pattern, config_content)
    if match2:
        insert_polaroid = ',\n' + ',\n'.join(new_polaroids_js) + '\n  '
        config_content = config_content[:match2.end(1)] + insert_polaroid + config_content[match2.start(2):]

    # Update counts in config.js
    config_content = re.sub(r'共 \d+ 部', f'共 {last_id} 部', config_content)

    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        f.write(config_content)
    print(f'Updated {CONFIG_PATH} with {len(new_files)} new stories (total: {last_id})!')

    # Update index.html count & cache buster
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        index_content = f.read()

    index_content = re.sub(r'✨ \d+ 部真實限動影片收錄', f'✨ {last_id} 部真實限動影片收錄', index_content)
    v_timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    index_content = re.sub(r'\?v=\d{8}_[a-zA-Z0-9]+', f'?v={v_timestamp}', index_content)

    with open(INDEX_PATH, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print(f'Updated {INDEX_PATH} (badge: {last_id} 部, cache version: {v_timestamp})!')

    return 0

if __name__ == '__main__':
    sys.exit(main())
