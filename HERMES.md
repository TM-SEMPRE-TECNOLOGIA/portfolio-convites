# HERMES — Memória do Projeto: Ecossistema de Convites Digitais Interativos

**Data de Atualização:** 15/08/2026  
**Responsável:** Thiago (`62 9 9604-6458`)  
**Status do Projeto:** 100% Concluído e Pronto para Produção/Vendas.

---

## 🎯 Visão Geral do Sistema
Construção de uma solução completa de ponta a ponta para comercialização, briefing, demonstração de planos e produção de convites de casamento digitais interativos de alto padrão.

---

## 📂 Arquivos Principais e Responsabilidades

1. `index.html` (Vitrine de Vendas Principal):
   - Design: *Dark Luxury Gold* com fontes `Cormorant Garamond` e `Inter`.
   - Recursos: Mockups de iPhone com 8 vídeos mobile em loop (`assets/videos/template_01.webm` a `template_08.webm`), animações GSAP 3 com ScrollTrigger, badges superiores destacados (`.card-badge-container`), simulador de celular em modal interativo com iframe.
   - Contato de Vendas: WhatsApp configurado para `5562996046458`.

2. `briefing.html` (Web App de Briefing do Cliente):
   - Mobile-First e 100% responsivo para smartphone.
   - Formulário guiado em 5 etapas: Os Noivos & Modelo (seletor dos 8 templates), Data/Local/Maps, Dress Code/Cronograma/RSVP, Presentes/PIX, Mídias/Música/Fotos.
   - Disparo automático com modal de revisão e envio com 1 clique direto para o WhatsApp `5562996046458`.

3. `manual_operacional_e_briefings.html` (Painel Interno):
   - Tabela de precificação detalhada (R$ 99, R$ 149, R$ 199, R$ 250).
   - Briefing universal com botão 1-clique para copiar para o WhatsApp.
   - Checklists detalhados e particulares dos 8 modelos.
   - Passo a passo da esteira de produção e hospedagem gratuita (Vercel / Netlify).

4. `exemplos_entregaveis/` (Central de Demos por Plano de Entrega):
   - `exemplos_entregaveis/index.html`: Hub comparativo com iframes dos 4 planos.
   - `01_plano_light/index.html` (R$ 99): 1 Foto, data, contagem regressiva, GPS e RSVP WhatsApp.
   - `02_plano_silver/index.html` (R$ 149): Player de música flutuante (.mp3), galeria de fotos, cronograma visual, dress code com paleta e botão PIX copia e cola.
   - `03_plano_gold/index.html` (R$ 199): Vídeo vertical do casal em loop no banner principal, storytelling ("Nossa História"), guia de hotéis/salões parceiros e recursos do Silver.
   - `04_plano_premium/index.html` (R$ 250 - Teto): Vídeo vertical de abertura + Trilha sonora contínua + Linha do tempo histórica (Storyline) + Múltiplos locais (Catedral + Recepção com Waze e Maps) + RSVP Inteligente com seleção de acompanhantes + PIX com QR Code dinâmico + Botão para download de Cartão Digital PDF.

5. `styles.css` e `app.js`:
   - Sistema de design centralizado, tokens de cor (`--accent-gold: #e5b869`), tipografia de luxo e controle do modal de preview.

---

## 🏷️ Mapeamento dos 8 Templates Matrizes

- `01-template-2/index.html` ➔ **Royal Gold** (Clássico / Ouro)
- `02-light-design/index.html` ➔ **Minimalist** (Clean Editorial)
- `03-viktor-paula/template5.html` ➔ **Vibrant Vows** (Fashion / Revista)
- `04-thanu-jathu/jathuandthanu.html` ➔ **Eternal Romance** (Romântico / Floral)
- `05-the-sacred-garden/thesacredgarden.html` ➔ **The Sacred Garden** (Campo / Botânico)
- `06-dolce-vita/dolcevita.html` ➔ **Dolce Vita** (Italiano / Praia)
- `07-blossom-oud/blossomoud.html` ➔ **Blossom & Oud** (Dark Luxury / Noite)
- `08-destination-love/destinationlove.html` ➔ **Destination Love** (Destination Wedding)

---

## 💰 Tabela de Precificação & Entregáveis

- **Plano Light (R$ 99):** Entrada econômica essencial (Foto de capa, dados, GPS, RSVP WhatsApp).
- **Plano Silver (R$ 149):** Música ambiente com player flutuante (.mp3), galeria de fotos, cronograma e botão PIX.
- **Plano Gold (R$ 199):** Vídeo vertical do casal em loop no banner principal, storytelling, dicas de hospedagem e animações.
- **Plano Premium (R$ 250 - Teto):** Vídeo vertical HD + Trilha sonora contínua + Linha do tempo animada + Múltiplos locais com rotas Maps/Waze + RSVP Inteligente + QR Code PIX + Cartão Digital PDF de brinde.
