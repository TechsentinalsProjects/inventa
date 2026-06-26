import re

with open(r'C:\Users\solan\.gemini\antigravity-ide\brain\68488ae9-5240-4168-a1cf-cbf81bc26972\.system_generated\steps\32\content.md', encoding='utf-8', errors='ignore') as f:
    content = f.read()

urls = set(re.findall(r'https?://[^\s"\'<>]+?\.(?:jpg|png|jpeg|gif)', content))
for u in urls:
    print(u)
