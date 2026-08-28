# -*- coding: utf-8 -*-
import os, re

def fix_all_templates():
    templates_dir = "templates"
    
    # 1. FIX MINIMALIST
    p_min = os.path.join(templates_dir, "minimalist", "index.html")
    if os.path.exists(p_min):
        with open(p_min, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        
        # Remove debug text artifact
        c = c.replace("58 px - to check the hight at the bottom of the block", "")
        # Fix foreign location and contact
        c = c.replace("El Poble Espanyol, Av. de Francesc Ferrer i Guàrdia, 13, 08 Barcelona", "Espaço Klaine, R. Antônio Escorsin, 1855 - Curitiba, PR")
        c = c.replace("El Poble Espanyol", "Espaço Klaine")
        c = c.replace("Barcelona", "Curitiba")
        c = c.replace("At the Racó Montblanc restaurant", "Espaço Gastronômico Klaine")
        c = c.replace("+31 6845965887", "(41) 99888-7766")
        c = c.replace("Erika &amp; Kylian", "Erika &amp; Lucas")
        c = c.replace("Erika & Kylian", "Erika & Lucas")
        c = c.replace("date", "Data")
        c = c.replace("place", "Local")
        # Fix encoding artifacts
        c = c.replace("Neste vero", "Neste ano")
        c = c.replace(" impossvel", "É impossível")
        c = c.replace("vo se casar", "vão se casar")
        c = c.replace("PROGRAMAO", "PROGRAMAÇÃO")
        c = c.replace("Cerimnia", "Cerimônia")
        c = c.replace("Dana", "Dança")
        c = c.replace("comea", "começa")
        c = c.replace("INFORMAES", "INFORMAÇÕES")
        c = c.replace("dvidas", "dúvidas")
        c = c.replace("histria", "história")
        c = c.replace("ns", "nós")
        c = c.replace("PRESENA", "PRESENÇA")
        c = c.replace("celebrao", "celebração")
        c = c.replace("ser", "será")
        c = c.replace("tambm", "também")
        c = c.replace("so", "são")
        c = c.replace("voc", "você")
        
        # Inject CSS to fix any overlapping text
        fix_css = """<style>
        .t396__elem { overflow: visible !important; }
        .tn-atom { word-break: break-word !important; white-space: normal !important; }
        </style>"""
        c = c.replace("</head>", fix_css + "\n</head>")
        
        with open(p_min, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed minimalist")

    # 2. FIX BLOSSOM OUD
    p_blo = os.path.join(templates_dir, "blossom-oud", "index.html")
    if os.path.exists(p_blo):
        with open(p_blo, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        # Remove arabic chars and replace foreign terms
        c = re.sub(r'[\u0600-\u06FF]+', '✦', c)
        c = c.replace("Nikah Cerimônia", "Cerimônia Religiosa")
        c = c.replace("Nikah Cerimnia", "Cerimônia Religiosa")
        c = c.replace("Beldi Country Club Marrakech, Morocco", "Palácio dos Cedros - Ipiranga, São Paulo - SP")
        c = c.replace("Beldi Country Club", "Palácio dos Cedros")
        c = c.replace("Marrakech, Morocco", "São Paulo, SP")
        c = c.replace("Marrakech", "São Paulo")
        c = c.replace("Morocco", "Brasil")
        
        with open(p_blo, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed blossom-oud")

    # 3. FIX DESTINATION LOVE
    p_des = os.path.join(templates_dir, "destination-love", "index.html")
    if os.path.exists(p_des):
        with open(p_des, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Puerto Vallarta, MX", "Trancoso, Bahia - Brasil")
        c = c.replace("Casa Karma", "Pousada Bahia Bonita")
        c = c.replace("Elisabeth Swan and Marcus", "Isabella & Henrique")
        c = c.replace("Elisabeth Swan and Marcus La", "Isabella & Henrique")
        c = c.replace("MÉXICO", "TRANCOSO")
        c = c.replace("MEXICO", "TRANCOSO")
        with open(p_des, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed destination-love")

    # 4. FIX ETERNAL ROMANCE
    p_ete = os.path.join(templates_dir, "eternal-romance", "index.html")
    if os.path.exists(p_ete):
        with open(p_ete, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Jathu and Thanu", "Juliana & Rafael")
        c = c.replace("Jathu & Thanu", "Juliana & Rafael")
        c = c.replace("Jathu &amp; Thanu", "Juliana &amp; Rafael")
        c = c.replace("JATHU & THANU", "JULIANA & RAFAEL")
        with open(p_ete, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed eternal-romance")

    # 5. FIX DOLCE VITA
    p_dol = os.path.join(templates_dir, "dolce-vita", "index.html")
    if os.path.exists(p_dol):
        with open(p_dol, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Ravello, Amalfi Coast, Italy", "Vila Salga - Ilhabela, SP")
        c = c.replace("Ravello, Amalfi Coast", "Ilhabela, Litoral Norte - SP")
        c = c.replace("Amalfi Coast, Italy", "Ilhabela, SP")
        with open(p_dol, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed dolce-vita")

    # 6. FIX SACRED GARDEN
    p_sac = os.path.join(templates_dir, "sacred-garden", "index.html")
    if os.path.exists(p_sac):
        with open(p_sac, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Cotswolds, UK", "Fazenda Vila Rica - Itatiba, SP")
        c = c.replace("United Kingdom", "Brasil")
        with open(p_sac, "w", encoding="utf-8") as f:
            f.write(c)
        print("Fixed sacred-garden")

fix_all_templates()
