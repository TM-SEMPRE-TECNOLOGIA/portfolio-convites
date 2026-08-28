# -*- coding: utf-8 -*-
import os, re

def fix_destination_love():
    path = "templates/destination-love/index.html"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()

    # 1. Translate boarding pass / info cards
    c = c.replace("If you have any questions, you can always contact our wedding organizer - Emma", "Para dúvidas sobre hospedagem ou roteiro, contate nossa assessoria - Mariana")
    c = c.replace("+33 687539754", "(73) 99988-7766")
    c = c.replace("CONTACT INFORMATION", "ASSESSORIA")
    c = c.replace("GIFT PREFERENCES", "LISTA DE PRESENTES")
    c = c.replace("CONGRATULATIONS", "HOMENAGENS")
    c = c.replace("Celebrating with you is the greatest gift for us. If you would still like to gift us something, we would be happy to receive a contribution for our honeymoon.", "Sua presen\u00e7a \u00e9 nosso maior presente! Se desejar nos presentear, criamos nossa chave PIX para cotas de lua de mel.")
    c = c.replace("We\u2019d love to see your creativity in your congratulations! For example, hare a funny story about us with the guests so we can all laugh together", "Queremos celebrar cada segundo com voc\u00ea! Prepare suas melhores mem\u00f3rias e venha pronto para viver dias inesquec\u00edveis conosco.")
    c = c.replace("We'd love to see your creativity in your congratulations! For example, hare a funny story about us with the guests so we can all laugh together", "Queremos celebrar cada segundo com voc\u00ea! Prepare suas melhores mem\u00f3rias e venha pronto para viver dias inesquec\u00edveis conosco.")

    # 2. Passport machine-readable line & times
    c = c.replace("<<WE CAN\u2019T<<<<<<<<<<WAIT<<<<<<<<<<TO<<<<<<<<<<<<<<<<<< CELEBRATE<<<<<<<<<WITH<<<<<<<YOU<<<<<<<<<", "<<TRANCOSO<<<<<<<<<BRASIL<<<<<<<<<<ISABELLA<<<<<<<<<HENRIQUE<<<<<<<<<<2025<<<<<<<<")
    c = c.replace("<<WE CAN'T<<<<<<<<<<WAIT<<<<<<<<<<TO<<<<<<<<<<<<<<<<<< CELEBRATE<<<<<<<<<WITH<<<<<<<YOU<<<<<<<<<", "<<TRANCOSO<<<<<<<<<BRASIL<<<<<<<<<<ISABELLA<<<<<<<<<HENRIQUE<<<<<<<<<<2025<<<<<<<<")
    c = c.replace("2 PM - 10 PM", "16:00 \u00e0s 02:00")
    c = c.replace("2 PM", "16:00")
    c = c.replace("2:30 PM", "16:30")
    c = c.replace("5 PM", "18:00")
    c = c.replace("7 PM", "20:00")
    c = c.replace("7:30 PM - 10 PM", "21:00 \u00e0s 02:00")
    c = c.replace("Address:", "Endere\u00e7o:")
    c = c.replace("Elisabeth Swan and Marcus Lagarde", "Isabella & Henrique Lagarde")
    c = c.replace("Elisabeth Swan and Marcus", "Isabella & Henrique")

    # 3. Fix CSS overlaps for passaporte & address
    css_fix = """<style>
    .tn-elem { overflow: visible !important; }
    .tn-atom { word-break: normal !important; line-height: 1.3 !important; }
    /* Fix passaporte cursive overlap */
    [data-elem-id="1714995964893"], [data-elem-id="1714995964894"], [data-elem-id="1714995964895"] {
        margin-top: 5px !important;
    }
    </style>"""
    c = c.replace("</head>", css_fix + "\n</head>")

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Fixed destination-love completely")

def fix_blossom_oud():
    path = "templates/blossom-oud/index.html"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()

    # Remove arabic bismillah text and diamonds
    c = re.sub(r'[\u0600-\u06FF]+', '', c)
    c = re.sub(r'✦(\s*✦)+', '', c)
    c = c.replace("20  2027", "20 de Novembro de 2027")
    c = c.replace("20 ✦ 2027", "20 de Novembro de 2027")
    c = c.replace("✦", "")

    # Dress code translation
    c = c.replace("We kindly invite you to dress in elegant attire that reflects the style and spirit of our special day.", "Convidamos voc\u00ea a vestir um traje elegante que reflita a sofistica\u00e7\u00e3o e o encanto do nosso grande dia.")
    c = c.replace("Paleta de cores", "Paleta de Cores")

    # Form in French -> Portuguese
    c = c.replace(">Nom<", ">Nome Completo<")
    c = c.replace(">Nombre de personnes<", ">N\u00famero de Pessoas<")
    c = c.replace(">Serez-vous pr\u00e9sent?<", ">Voc\u00ea estar\u00e1 presente?<")
    c = c.replace(">Serez-vous present?<", ">Voc\u00ea estar\u00e1 presente?<")
    c = c.replace("Oui, je serai pr\u00e9sent(e)", "Sim, confirmo minha presen\u00e7a!")
    c = c.replace("Oui, je serai present(e)", "Sim, confirmo minha presen\u00e7a!")
    c = c.replace("D\u00e9sol\u00e9(e), je ne pourrai pas \u00eatre pr\u00e9sent(e)", "Infelizmente n\u00e3o poderei comparecer")
    c = c.replace("Desole(e), je ne pourrai pas etre present(e)", "Infelizmente n\u00e3o poderei comparecer")
    c = c.replace("SOUMETTRE", "CONFIRMAR PRESEN\u00c7A")

    # Couple names
    c = c.replace("SOFIA &amp; LEONARDO", "SOFIA &amp; LEONARDO")
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Fixed blossom-oud completely")

def fix_sacred_garden():
    path = "templates/sacred-garden/index.html"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()

    # Remove arabic bismillah and mosque address
    c = re.sub(r'[\u0600-\u06FF]+', '', c)
    c = c.replace("Islamic Center of Melville", "Capela dos Milagres")
    c = c.replace("Address: 118 Old East Neck Road Melville, NY 11747", "Praia do Toque, S\u00e3o Miguel dos Milagres - AL")
    c = c.replace("Address: 118 Old East Neck Road Melville, NY", "S\u00e3o Miguel dos Milagres - AL")
    c = c.replace("Open in Maps", "Abrir no Maps")
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Fixed sacred-garden completely")

def fix_minimalist():
    path = "templates/minimalist/index.html"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()

    # Fix typos
    c = c.replace("Tran\u00f3sporte", "Transporte")
    c = c.replace("Tranosporte", "Transporte")
    c = c.replace("Homen\u00f3s", "Homens")
    c = c.replace("Homenos", "Homens")
    c = c.replace("s\u00e3ociais", "sociais")
    c = c.replace("saociais", "sociais")
    c = c.replace("Ton\u00f3s", "Tons")
    c = c.replace("Tonos", "Tons")

    # Fix overlapping timeline items
    css_fix = """<style>
    .t396__artboard { height: auto !important; min-height: 100% !important; }
    .tn-atom { line-height: 1.4 !important; overflow: visible !important; }
    /* Un-overlap ceremony and address */
    [data-elem-id="1746701376962"] { top: 0px !important; }
    [data-elem-id="1746701376970"] { margin-top: 15px !important; }
    </style>"""
    c = c.replace("</head>", css_fix + "\n</head>")

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Fixed minimalist completely")

def fix_buttons_and_names():
    # Fix Vibrant Vows button & names
    p_vib = "templates/vibrant-vows/index.html"
    if os.path.exists(p_vib):
        with open(p_vib, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Viktor and Paula", "Vit\u00f3ria & Paulo")
        c = c.replace("Viktor &amp; Paula", "Vit\u00f3ria &amp; Paulo")
        c = c.replace("Viktor & Paula", "Vit\u00f3ria & Paulo")
        # Fix button cut off
        btn_fix = """<style>
        .t-btn, .t-submit, [data-elem-type="button"] .tn-atom { 
            white-space: nowrap !important; 
            padding: 12px 24px !important;
            height: auto !important; 
            display: inline-flex !important; 
            align-items: center !important; 
            justify-content: center !important;
            line-height: 1 !important;
        }
        </style>"""
        c = c.replace("</head>", btn_fix + "\n</head>")
        with open(p_vib, "w", encoding="utf-8") as f: f.write(c)
        print("Fixed vibrant-vows")

    # Fix Dolce Vita button & names
    p_dol = "templates/dolce-vita/index.html"
    if os.path.exists(p_dol):
        with open(p_dol, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        c = c.replace("Alexa &amp; Richard", "Alessandra &amp; Ricardo")
        c = c.replace("Alexa & Richard", "Alessandra & Ricardo")
        btn_fix = """<style>
        .t-btn, .t-submit, [data-elem-type="button"] .tn-atom { 
            white-space: nowrap !important; 
            padding: 12px 24px !important; 
            height: auto !important; 
            display: inline-flex !important; 
            align-items: center !important; 
            justify-content: center !important;
            line-height: 1 !important;
        }
        </style>"""
        c = c.replace("</head>", btn_fix + "\n</head>")
        with open(p_dol, "w", encoding="utf-8") as f: f.write(c)
        print("Fixed dolce-vita")

    # Fix Eternal Romance overlaps
    p_ete = "templates/eternal-romance/index.html"
    if os.path.exists(p_ete):
        with open(p_ete, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        css_fix = """<style>
        .tn-elem { overflow: visible !important; }
        .tn-atom { line-height: 1.4 !important; }
        </style>"""
        c = c.replace("</head>", css_fix + "\n</head>")
        with open(p_ete, "w", encoding="utf-8") as f: f.write(c)
        print("Fixed eternal-romance")

fix_destination_love()
fix_blossom_oud()
fix_sacred_garden()
fix_minimalist()
fix_buttons_and_names()
