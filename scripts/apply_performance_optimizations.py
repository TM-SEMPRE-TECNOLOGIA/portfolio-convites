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

TARGET_DIRS = [
    r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites\exemplos_entregaveis",
    r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites\_adm\exemplos_entregaveis"
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

for root_dir in TARGET_DIRS:
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".html"):
                optimize_html(os.path.join(root, file))

print("All demo pages optimized successfully!")
