import os
import shutil
import re

BASE_DIR = r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites"
TARGET_ROOTS = [
    os.path.join(BASE_DIR, "exemplos_entregaveis"),
    os.path.join(BASE_DIR, "_adm", "exemplos_entregaveis")
]

PDF_SCRIPT = """
<!-- html2pdf.js library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
function baixarPDFCompleto(titulo) {
  const opt = {
    margin: [5, 5, 5, 5],
    filename: (titulo || 'convite_lucas_e_mariana') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  const watermark = document.getElementById('demo-top-bar');
  if (watermark) watermark.style.display = 'none';
  
  html2pdf().set(opt).from(document.body).save().then(() => {
    if (watermark) watermark.style.display = 'flex';
  });
}
</script>
"""

def make_top_bar(plano_label, preco, pdf_name):
    return f"""
<div id="demo-top-bar" style="position:fixed; top:12px; left:50%; transform:translateX(-50%); z-index:999999; display:flex; gap:10px; align-items:center; background:rgba(11,12,16,0.92); border:1px solid rgba(229,184,105,0.4); padding:6px 14px; border-radius:50px; box-shadow:0 6px 20px rgba(0,0,0,0.6); backdrop-filter:blur(10px); font-family:'Inter', sans-serif;">
  <span style="color:#e5b869; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">{plano_label} • R$ {preco}</span>
  <button onclick="baixarPDFCompleto('{pdf_name}')" style="background:#e5b869; color:#0b0c10; border:none; padding:5px 12px; border-radius:30px; font-weight:700; font-size:11px; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
    📄 Baixar PDF
  </button>
</div>
"""

def adapt_light(target_dir):
    os.makedirs(target_dir, exist_ok=True)
    src = os.path.join(BASE_DIR, "02-light-design", "index.html")
    with open(src, "r", encoding="utf-8") as f:
        html = f.read()

    # Adapt names & dates
    html = html.replace("Light design", "Lucas & Mariana — Convite de Casamento (Plano Light)")
    html = html.replace("Laura &amp; Stephan", "Lucas &amp; Mariana")
    html = html.replace("Laura & Stephan", "Lucas & Mariana")
    html = html.replace("19.09.2026", "21.11.2026")
    html = html.replace("5511999999999", "5562996046458")
    
    # Inject Top Bar & PDF Script
    top_bar = make_top_bar("PLANO LIGHT (Template Minimalist)", "99", "convite_light_lucas_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out_path = os.path.join(target_dir, "index.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created: {out_path}")

def adapt_silver(target_dir):
    os.makedirs(target_dir, exist_ok=True)
    src = os.path.join(BASE_DIR, "04-thanu-jathu", "jathuandthanu.html")
    with open(src, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("Thanu and Jathu", "Lucas & Mariana — Convite (Plano Silver)")
    html = html.replace("Thanu &amp; Jathu", "Lucas &amp; Mariana")
    html = html.replace("Thanu & Jathu", "Lucas & Mariana")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("PLANO SILVER (Template Eternal Romance)", "149", "convite_silver_lucas_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out_path = os.path.join(target_dir, "index.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created: {out_path}")

def adapt_gold(target_dir):
    os.makedirs(target_dir, exist_ok=True)
    src_html = os.path.join(BASE_DIR, "05-the-sacred-garden", "thesacredgarden.html")
    src_css = os.path.join(BASE_DIR, "05-the-sacred-garden", "custom.css")
    
    if os.path.exists(src_css):
        shutil.copy2(src_css, os.path.join(target_dir, "custom.css"))

    with open(src_html, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("The Sacred Garden", "Lucas & Mariana — Convite (Plano Gold)")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("PLANO GOLD (Template Sacred Garden)", "199", "convite_gold_lucas_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out_path = os.path.join(target_dir, "index.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created: {out_path}")

def adapt_premium(target_dir):
    os.makedirs(target_dir, exist_ok=True)
    src_html = os.path.join(BASE_DIR, "08-destination-love", "destinationlove.html")
    src_css = os.path.join(BASE_DIR, "08-destination-love", "custom.css")
    
    if os.path.exists(src_css):
        shutil.copy2(src_css, os.path.join(target_dir, "custom.css"))

    with open(src_html, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("Destination Love", "Lucas & Mariana — Convite Exclusivo (Plano Premium)")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("PLANO PREMIUM (Template Destination Love)", "250", "convite_premium_lucas_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out_path = os.path.join(target_dir, "index.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created: {out_path}")

for root in TARGET_ROOTS:
    adapt_light(os.path.join(root, "01_plano_light"))
    adapt_silver(os.path.join(root, "02_plano_silver"))
    adapt_gold(os.path.join(root, "03_plano_gold"))
    adapt_premium(os.path.join(root, "04_plano_premium"))

print("All 4 distinct demos successfully generated!")
