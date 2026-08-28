import os, shutil

mapping = {
    "templates/royal-gold/index.html": "01-template-2/index.html",
    "templates/minimalist/index.html": "02-light-design/index.html",
    "templates/vibrant-vows/index.html": "03-viktor-paula/template5.html",
    "templates/sacred-garden/index.html": "05-the-sacred-garden/thesacredgarden.html",
    "templates/dolce-vita/index.html": "06-dolce-vita/dolcevita.html",
    "templates/blossom-oud/index.html": "07-blossom-oud/blossomoud.html",
    "templates/destination-love/index.html": "08-destination-love/destinationlove.html"
}

for src, dst in mapping.items():
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        print(f"Synced {src} -> {dst}")

print("All template duplicates synchronized successfully!")
