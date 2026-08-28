import os, glob, re

for html in glob.glob("templates/*/index.html") + glob.glob("0*/*.html"):
    with open(html, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()
    imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', c)
    print(f"File: {html}")
    for img in imgs:
        if any(x in img for x in ["chapel", "swans", "story", "pexels", "ChatGPT", "Gemini"]):
            print(f"  [IMG] {img}")
