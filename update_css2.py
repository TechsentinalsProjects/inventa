import re

files = [
    '/Users/smit/Desktop/inventa-main/src/pages/ApplicationsPage.css',
    '/Users/smit/Desktop/inventa-main/src/pages/ApplicationDetailPage.css'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'object-fit:\s*cover;\n\s*object-position:\s*top;', 'object-fit: contain;', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("CSS updated to contain")
