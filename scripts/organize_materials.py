import os
import shutil

SRC_DOC = r"C:\Users\thiag\Downloads\estrategia_campanhas_meta_convites.md"
SRC_IMG_DIR = r"C:\Users\thiag\Downloads\imagens_convites"

# Target 1: Hermes Reference
HERMES_REF_DIR = r"C:\Users\thiag\AppData\Local\hermes\references"
HERMES_REF_FILE = os.path.join(HERMES_REF_DIR, "estrategia-campanhas-meta-convites.md")

# Target 2: Project Marketing & Assets
PROJ_DIR = r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites"
PROJ_MKT_DIR = os.path.join(PROJ_DIR, "marketing")
PROJ_ASSETS_IMG = os.path.join(PROJ_DIR, "assets", "imagens_convites")
PROJ_MKT_FILE = os.path.join(PROJ_MKT_DIR, "estrategia_campanhas_meta_convites.md")
PROJ_MKT_IMG = os.path.join(PROJ_MKT_DIR, "imagens_convites")

os.makedirs(HERMES_REF_DIR, exist_ok=True)
os.makedirs(PROJ_MKT_DIR, exist_ok=True)
os.makedirs(PROJ_ASSETS_IMG, exist_ok=True)

# Copy Document
if os.path.exists(SRC_DOC):
    shutil.copy2(SRC_DOC, HERMES_REF_FILE)
    shutil.copy2(SRC_DOC, PROJ_MKT_FILE)
    print("Copied doc to Hermes references and Project marketing!")
else:
    print(f"Warning: {SRC_DOC} not found")

# Copy Images Directory
if os.path.exists(SRC_IMG_DIR):
    if os.path.exists(PROJ_ASSETS_IMG):
        shutil.rmtree(PROJ_ASSETS_IMG)
    shutil.copytree(SRC_IMG_DIR, PROJ_ASSETS_IMG)

    if os.path.exists(PROJ_MKT_IMG):
        shutil.rmtree(PROJ_MKT_IMG)
    shutil.copytree(SRC_IMG_DIR, PROJ_MKT_IMG)
    print(f"Copied images directory ({len(os.listdir(SRC_IMG_DIR))} files) to assets and marketing!")
else:
    print(f"Warning: {SRC_IMG_DIR} not found")

print("Organization completed!")
