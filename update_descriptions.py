import re

file_path = '/Users/smit/Desktop/inventa-main/src/data/applicationsData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Flow Cytometry
desc1 = 'The 2020 Attune NxT Flow Cytometer has expanded functionalities to drive your research forward. Designed and developed to remove common barriers associated with flow cytometry, the evolutionary capabilities of the Attune NxT Flow Cytometer offer adaptable optical configuration options so you can get the most out of your multicolor analysis.\\n\\n• New CytKick and CytKick Max autosampler—more efficiency for high-throughput assays\\n• New 21 CFR part 11 compliant software for regulated laboratories on Windows 10 operating system\\n• Improved workflow for run protocol and instrument settings management'

content = re.sub(
    r"(title:\s*'Flow Cytometry',\s*description:.*?\s*extendedDescription:\s*').*?(')",
    lambda m: m.group(1) + desc1 + m.group(2),
    content,
    flags=re.DOTALL
)

# 2. Toxicology
desc2 = 'More than 1600 unique compounds of interest to the food safety and environmental testing communities:\\nCompound Class and Number of Compounds:\\nPesticides: 698 compounds\\nEmerging contaminants: 756 compounds\\nVeterinary drugs: 108 compounds\\nMycotoxins: 44 compounds\\nPFCs: 21 compounds'

content = re.sub(
    r"(title:\s*'Toxicology',\s*description:.*?\s*extendedDescription:\s*').*?(')",
    lambda m: m.group(1) + desc2 + m.group(2),
    content,
    flags=re.DOTALL
)

# 3. Water Purification Systems
desc3 = 'A variety of complete systems implementing state-of-the-art technologies to meet critical and everyday water purification needs.'

content = re.sub(
    r"(title:\s*'Water Purification Systems',\s*description:.*?\s*extendedDescription:\s*').*?(')",
    lambda m: m.group(1) + desc3 + m.group(2),
    content,
    flags=re.DOTALL
)

# 4. Cold Chain & Storage (TDE freezer package)
desc4 = 'Thermo Scientific™ TDE -40°C ultra-low temperature freezer packages include one ULT freezer and two shelves of sliding drawer racks and boxes.\\nPackage includes:\\nOne Thermo Scientific TDE -40°C Ultra-Low temperature freezer\\n2 shelves of sliding drawer racks with 2-inch cryoboxes and 100-count cell dividers. (see product specifications for details)'

content = re.sub(
    r"(title:\s*'Cold Chain & Storage',\s*description:.*?\s*extendedDescription:\s*').*?(')",
    lambda m: m.group(1) + desc4 + m.group(2),
    content,
    flags=re.DOTALL
)

# 5. Wireless Data Loggers
desc5 = 'Ensuring that the cold chain has been preserved, whether your products are in storage or in transit, just makes sense. Thermo Scientific™ Smart-Tracker™ makes temperature monitoring in the cold chain easy.'

content = re.sub(
    r"(title:\s*'Wireless Data Loggers',\s*description:.*?\s*extendedDescription:\s*').*?(')",
    lambda m: m.group(1) + desc5 + m.group(2),
    content,
    flags=re.DOTALL
)

# Remove the specific links
# The format is usually like: { text: '...', url: '...' },
# We can just remove lines containing the specific URLs.

urls_to_remove = [
    'A28997?SID=srch-srp-A28997',
    'IQLAAEGABSFAPYMBHL?SID=srch-srp-IQLAAEGABSFAPYMBHL',
    '90177050?gptExactMatch=true',
    'TDE50040LARK?SID=srch-srp-TDE50040LARK',
    'ST100-102?SID=srch-srp-ST100-102',
    'lab-construction-information.html?SID=fr-labequip-4'
]

lines = content.split('\n')
new_lines = []
for line in lines:
    keep = True
    for url in urls_to_remove:
        if url in line:
            keep = False
            break
    if keep:
        new_lines.append(line)

content = '\n'.join(new_lines)

# One edge case: removing an item from an array might leave a trailing comma before a closing bracket if it was the last item.
# But trailing commas are valid in JS arrays (though maybe it violates a linter). It's generally fine.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Update complete")
