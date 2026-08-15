# -*- coding: utf-8 -*-
import os
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

BASE_DIR = r"C:\Users\thiag\Desktop\_projetos\_portfolio_convites"
VIDEOS_DIR = os.path.join(BASE_DIR, "assets", "videos")
os.makedirs(VIDEOS_DIR, exist_ok=True)

# Templates mapping
TEMPLATES = [
    {"id": "01", "folder": "01-template-2", "file": "index.html", "name": "Royal Gold"},
    {"id": "02", "folder": "02-light-design", "file": "index.html", "name": "Minimalist"},
    {"id": "03", "folder": "03-viktor-paula", "file": "template5.html", "name": "Vibrant Vows"},
    {"id": "04", "folder": "04-thanu-jathu", "file": "jathuandthanu.html", "name": "Eternal Romance"},
    {"id": "05", "folder": "05-the-sacred-garden", "file": "thesacredgarden.html", "name": "The Sacred Garden"},
    {"id": "06", "folder": "06-dolce-vita", "file": "dolcevita.html", "name": "Dolce Vita"},
    {"id": "07", "folder": "07-blossom-oud", "file": "blossomoud.html", "name": "Blossom & Oud"},
    {"id": "08", "folder": "08-destination-love", "file": "destinationlove.html", "name": "Destination Love"},
]

PORT = 8099

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)
        
    def log_message(self, format, *args):
        pass # Silenciar logs

def start_server():
    server = HTTPServer(('127.0.0.1', PORT), CustomHandler)
    server.serve_forever()

def record_all():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)
    print(f"Servidor HTTP local rodando na porta {PORT}...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        for item in TEMPLATES:
            output_dir = os.path.join(VIDEOS_DIR, f"temp_{item['id']}")
            os.makedirs(output_dir, exist_ok=True)
            
            # Viewport mobile padrão iPhone 14 Pro
            context = browser.new_context(
                viewport={"width": 390, "height": 844},
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
                is_mobile=True,
                has_touch=True,
                device_scale_factor=2,
                record_video_dir=output_dir,
                record_video_size={"width": 390, "height": 844}
            )
            
            page = context.new_page()
            url = f"http://127.0.0.1:{PORT}/{item['folder']}/{item['file']}"
            print(f"Gravando {item['id']} - {item['name']} ({url})...")
            
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                print(f"Aviso de timeout de rede, continuando: {e}")

            time.sleep(2) # Espera carregar fontes e animações de entrada
            
            # Scroll suave até o final da página
            page.evaluate("""
                async () => {
                    await new Promise((resolve) => {
                        let totalHeight = 0;
                        let distance = 30;
                        let timer = setInterval(() => {
                            let scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;

                            if (totalHeight >= scrollHeight) {
                                clearInterval(timer);
                                resolve();
                            }
                        }, 50);
                    });
                }
            """)
            
            time.sleep(2) # Pequena pausa no final
            
            # Fechar contexto para salvar o vídeo
            video_path = page.video.path()
            context.close()
            
            # Renomear vídeo para o nome final
            final_video_name = f"template_{item['id']}.webm"
            final_video_path = os.path.join(VIDEOS_DIR, final_video_name)
            
            if os.path.exists(final_video_path):
                os.remove(final_video_path)
                
            if os.path.exists(video_path):
                os.rename(video_path, final_video_path)
                print(f"Salvo: {final_video_name}")
                
            # Limpar pasta temporária
            try:
                os.rmdir(output_dir)
            except:
                pass

        browser.close()
    print("Todas as gravações foram finalizadas com sucesso!")

if __name__ == "__main__":
    record_all()
