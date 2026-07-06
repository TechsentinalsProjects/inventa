import re

files = [
    '/Users/smit/Desktop/inventa-main/src/pages/ApplicationsPage.css',
    '/Users/smit/Desktop/inventa-main/src/pages/ApplicationDetailPage.css'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will change object-fit: cover to object-fit: contain for images
    # But only for .corp-wf-img img, .corp-modal-main-img, .adp-wf-img img, .adp-modal-main-img, .adp-qv-img
    
    # Alternatively, just add object-position: top center; or change to object-fit: contain;
    content = re.sub(r'object-fit:\s*cover;', 'object-fit: cover;\n  object-position: top;', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("CSS updated")
