import os, re

def inspect_minimalist():
    path = os.path.join("templates", "minimalist", "index.html")
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    
    atoms = re.findall(r"field=[\"']tn_text_([0-9]+)[\"'][^>]*>(.*?)</div>", html, flags=re.DOTALL)
    print(f"Minimalist text elements found: {len(atoms)}")
    for elem_id, content in atoms:
        clean = re.sub(r"<[^>]+>", " ", content).strip()
        print(f"[{elem_id}]: {clean}")

inspect_minimalist()
