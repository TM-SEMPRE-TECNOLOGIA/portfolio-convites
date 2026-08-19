import os
import re

PRECONNECT_TAGS = """
  <!-- DNS Preconnect & Prefetch for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://static.tildacdn.net">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
"""

BASE_DIR = r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites"

TEMPLATE_FOLDERS = [
    "01-template-2",
    "02-light-design",
    "03-viktor-paula",
    "04-thanu-jathu",
    "05-the-sacred-garden",
    "06-dolce-vita",
    "07-blossom-oud",
    "08-destination-love",
]

def optimize_html(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add preconnect if not present
    if "<!-- DNS Preconnect & Prefetch for Performance -->" not in content and "<head>" in content:
        content = content.replace("<head>", "<head>\n" + PRECONNECT_TAGS, 1)

    # Ensure font-display: swap in Google Fonts links
    content = re.sub(r'(fonts\.googleapis\.com/css2\?[^"\']*)', lambda m: m.group(1) if '&display=swap' in m.group(1) else m.group(1) + '&display=swap', content)

    # Ensure loading="lazy" for images that are not above the fold or don't have it
    def add_lazy(img_tag):
        if 'loading=' not in img_tag and 'hero' not in img_tag.lower():
            return img_tag.replace('<img ', '<img loading="lazy" ')
        return img_tag

    content = re.sub(r'<img [^>]+>', lambda m: add_lazy(m.group(0)), content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Optimized: {filepath}")

# 1. Optimize public showcase landing page
optimize_html(os.path.join(BASE_DIR, "index.html"))

# 2. Optimize all 8 template files
for folder in TEMPLATE_FOLDERS:
    folder_path = os.path.join(BASE_DIR, folder)
    if os.path.exists(folder_path):
        for file in os.listdir(folder_path):
            if file.endswith(".html"):
                optimize_html(os.path.join(folder_path, file))

print("Public showcase and all 8 templates optimized successfully!")
