import os
import re

data_file = '/Users/smit/Desktop/inventa-main/src/data/applicationsData.js'
images_dir = '/Users/smit/Desktop/inventa-main/public/applicaion_images'

with open(data_file, 'r', encoding='utf-8') as f:
    content = f.read()

images = []
for folder in os.listdir(images_dir):
    if folder.startswith('.'): continue
    folder_path = os.path.join(images_dir, folder)
    if os.path.isdir(folder_path):
        for file in os.listdir(folder_path):
            if file.startswith('.'): continue
            name = re.sub(r'\.(jpg|png|jpeg)$', '', file, flags=re.IGNORECASE)
            web_path = f'/applicaion_images/{folder}/{file}'
            images.append({
                'name': name,
                'normalized': re.sub(r'[^a-z0-9]', '', name.lower()),
                'path': web_path
            })

lines = content.split('\n')
current_title = None

def get_best_match(title):
    norm_title = re.sub(r'[^a-z0-9]', '', title.lower())
    for img in images:
        if img['normalized'] in norm_title or norm_title in img['normalized']:
            return img['path']
        
        # some hardcoded matches based on known images and titles
        words = img['normalized']
        if len(words) > 3 and words in norm_title:
            return img['path']
            
    # Try more aggressive matching
    for img in images:
        # e.g., "Pesticide" in "Pesticide & Residue Testing"
        if img['name'].lower() in title.lower():
            return img['path']
            
    return None

for i in range(len(lines)):
    title_match = re.search(r"title:\s*['\"](.*?)['\"]", lines[i])
    if title_match:
        current_title = title_match.group(1)
        
    image_match = re.search(r"(image:\s*['\"])(.*?)(['\"])", lines[i])
    if image_match and current_title:
        # check if it already has applicaion_images
        if 'applicaion_images' in image_match.group(2):
            continue
            
        best_path = get_best_match(current_title)
        if best_path:
            lines[i] = re.sub(r"(image:\s*['\"])(.*?)(['\"])", rf"\g<1>{best_path}\g<3>", lines[i])
        else:
            print(f"No match for: {current_title}")

with open(data_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Update complete")
