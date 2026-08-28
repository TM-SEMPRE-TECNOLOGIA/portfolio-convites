import os, re

with open("templates/sacred-garden/index.html", "r", encoding="utf-8", errors="ignore") as f:
    c = f.read()

imgs = re.findall(r'<img[^>]+(?:data-original|src)=[\'"]([^\'"]+)[\'"][^>]*>', c)
for i in imgs:
    print(i)
