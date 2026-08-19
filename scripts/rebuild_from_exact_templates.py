import os
import shutil
import re

BASE_DIR = r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites"
TARGET_DIRS = [
    os.path.join(BASE_DIR, "exemplos_entregaveis"),
    os.path.join(BASE_DIR, "_adm", "exemplos_entregaveis")
]

PDF_SCRIPT = """
<!-- html2pdf.js library & Dynamic Sync -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="../../supabase-config.js"></script>
<script>
function baixarPDFCompleto(titulo) {
  const opt = {
    margin: [0, 0, 0, 0],
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

// Dynamic Price Sync
async function syncDemoPrice(planoKey, elementId) {
  if (!window.ConvitesDB) return;
  try {
    const planos = await ConvitesDB.carregarPlanos();
    if (planos && planos[planoKey]) {
      const el = document.getElementById(elementId);
      if (el) el.innerText = planos[planoKey].nome + ' • R$ ' + planos[planoKey].preco;
    }
  } catch(e) {}
}
</script>
"""

def make_top_bar(plano_key, plano_label, preco, pdf_name):
    badge_id = f"demo-badge-{plano_key}"
    return f"""
<div id="demo-top-bar" style="position:fixed; top:12px; left:50%; transform:translateX(-50%); z-index:2147483647; display:flex; gap:10px; align-items:center; background:rgba(11,12,16,0.92); border:1px solid rgba(229,184,105,0.5); padding:6px 14px; border-radius:50px; box-shadow:0 6px 20px rgba(0,0,0,0.7); backdrop-filter:blur(10px); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <span id="{badge_id}" style="color:#e5b869; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">{plano_label} • R$ {preco}</span>
  <button onclick="baixarPDFCompleto('{pdf_name}')" style="background:#e5b869; color:#0b0c10; border:none; padding:5px 12px; border-radius:30px; font-weight:700; font-size:11px; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
    📄 Baixar PDF
  </button>
</div>
<script>
window.addEventListener('DOMContentLoaded', () => syncDemoPrice('{plano_key}', '{badge_id}'));
</script>
"""

# ==========================================
# 1. PLANO LIGHT (Origem: 02-light-design)
# ==========================================
def build_light(dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    src_file = os.path.join(BASE_DIR, "02-light-design", "index.html")
    with open(src_file, "r", encoding="utf-8") as f:
        html = f.read()

    # Personalizações respeitando a matriz original
    html = html.replace("<title>Light design</title>", "<title>Lucas & Mariana — Convite (Plano Light)</title>")
    html = html.replace("Laura &amp; Stephan", "Lucas &amp; Mariana")
    html = html.replace("Laura & Stephan", "Lucas & Mariana")
    html = html.replace("Laura e Stephan", "Lucas e Mariana")
    html = html.replace("19.09.2026", "21.11.2026")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("light", "Plano Light", "99", "convite_light_lucas_e_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out = os.path.join(dest_dir, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("Built Light at:", out)

# ==========================================
# 2. PLANO SILVER (Origem: 04-thanu-jathu)
# ==========================================
def build_silver(dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    src_file = os.path.join(BASE_DIR, "04-thanu-jathu", "jathuandthanu.html")
    with open(src_file, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("<title>Thanu and Jathu</title>", "<title>Lucas & Mariana — Convite (Plano Silver)</title>")
    html = html.replace("Thanu &amp; Jathu", "Lucas &amp; Mariana")
    html = html.replace("Thanu & Jathu", "Lucas & Mariana")
    html = html.replace("Thanu and Jathu", "Lucas e Mariana")
    html = html.replace("17.03.2025", "21.11.2026")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("silver", "Plano Silver", "149", "convite_silver_lucas_e_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out = os.path.join(dest_dir, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("Built Silver at:", out)

# ==========================================
# 3. PLANO GOLD (Origem: 05-the-sacred-garden)
# ==========================================
def build_gold(dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    src_file = os.path.join(BASE_DIR, "05-the-sacred-garden", "thesacredgarden.html")
    src_css = os.path.join(BASE_DIR, "05-the-sacred-garden", "custom.css")
    if os.path.exists(src_css):
        shutil.copy2(src_css, os.path.join(dest_dir, "custom.css"))

    with open(src_file, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("<title>The Sacred Garden</title>", "<title>Lucas & Mariana — Convite (Plano Gold)</title>")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("gold", "Plano Gold", "199", "convite_gold_lucas_e_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out = os.path.join(dest_dir, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("Built Gold at:", out)

# ==========================================
# 4. PLANO PREMIUM (Origem: 08-destination-love)
# ==========================================
def build_premium(dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    src_file = os.path.join(BASE_DIR, "08-destination-love", "destinationlove.html")
    src_css = os.path.join(BASE_DIR, "08-destination-love", "custom.css")
    if os.path.exists(src_css):
        shutil.copy2(src_css, os.path.join(dest_dir, "custom.css"))

    with open(src_file, "r", encoding="utf-8") as f:
        html = f.read()

    html = html.replace("<title>Destination Love</title>", "<title>Lucas & Mariana — Convite Exclusivo (Plano Premium)</title>")
    html = html.replace("5511999999999", "5562996046458")

    top_bar = make_top_bar("premium", "Plano Premium", "250", "convite_premium_lucas_e_mariana")
    html = html.replace("<body", "<body" + top_bar, 1) if "<body" in html else top_bar + html
    html = html.replace("</body>", PDF_SCRIPT + "</body>")

    out = os.path.join(dest_dir, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("Built Premium at:", out)

for base in TARGET_DIRS:
    build_light(os.path.join(base, "01_plano_light"))
    build_silver(os.path.join(base, "02_plano_silver"))
    build_gold(os.path.join(base, "03_plano_gold"))
    build_premium(os.path.join(base, "04_plano_premium"))

print("All exact template deliverables built successfully!")
