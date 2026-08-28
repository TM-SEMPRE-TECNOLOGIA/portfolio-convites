import os, re

for t in ["sacred-garden", "blossom-oud", "destination-love"]:
    p = os.path.join("templates", t, "index.html")
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', c)
        print(f"=== {t} ({len(imgs)} imgs) ===")
        for img in imgs[:8]:
            print("  ", img)
