# Portfolio Convites Digitais & Interativos — Atelier dos Noivos

Documentação técnica e operacional do ecossistema de convites de casamento digitais de alto padrão.

---

## 📱 Estrutura do Ecossistema (Tudo em 1 Hospedagem)

| Página | Arquivo | Finalidade |
| :--- | :--- | :--- |
| **Vitrine de Vendas** | [`index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/index.html) | Landing page de alta conversão (*Dark Luxury Gold*), com vídeos mobile dos convites em mockups de iPhone, animações GSAP 3 e simulador interativo em modal. |
| **Briefing do Cliente** | [`briefing.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/briefing.html) | Formulário interativo *mobile-first* enviado aos noivos após o fechamento, com seleção dos 8 templates, coleta de dados e disparo automático formatado para o WhatsApp do Thiago (`62 9 9604-6458`). |
| **Manual Operacional & Preços** | [`manual_operacional_e_briefings.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/manual_operacional_e_briefings.html) | Painel interno com tabela de precificação, pacote de valores (R$ 99 a R$ 250), checklists por pacote e roteiro de produção/deploy. |
| **Central de Entregáveis (Demos)** | [`exemplos_entregaveis/index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/exemplos_entregaveis/index.html) | Hub de demonstração dos 4 planos de entrega (Light R$ 99, Silver R$ 149, Gold R$ 199 e Premium R$ 250) baseados no modelo Royal Gold. |
| **Estilos & Scripts** | `styles.css`, `app.js` | Design system com tokens de luxo, paleta dourada e controle de animações/modais. |

---

## 🎨 Mapeamento dos 8 Templates de Convite

| # | Pasta | Arquivo Principal | Nome Comercial | Estilo / Identidade |
|---|---|---|---|---|
| **01** | `01-template-2/` | `index.html` | **Royal Gold** | Clássico nobre, marfim & ouro, contagem regressiva formal. |
| **02** | `02-light-design/` | `index.html` | **Minimalist** | Design limpo editorial, foco em fotografia e tipografia refinada. |
| **03** | `03-viktor-paula/` | `template5.html` | **Vibrant Vows** | Estilo revista de alta costura, colorido e vibrante. |
| **04** | `04-thanu-jathu/` | `jathuandthanu.html` | **Eternal Romance** | Romântico, floral delicado, música ambiente e RSVP completo. |
| **05** | `05-the-sacred-garden/` | `thesacredgarden.html` | **The Sacred Garden** | Casamentos ao ar livre, campo, praia e elementos botânicos. |
| **06** | `06-dolce-vita/` | `dolcevita.html` | **Dolce Vita** | Inspiração italiana, ensolarado e clima mediterrâneo. |
| **07** | `07-blossom-oud/` | `blossomoud.html` | **Blossom & Oud** | Dark luxury, estética opulenta noturna e riqueza de detalhes. |
| **08** | `08-destination-love/` | `destinationlove.html` | **Destination Love** | Destination wedding, guia de viagens, hospedagem e múltiplos mapas. |

---

## 💎 Entregáveis dos 4 Planos (Base: Royal Gold)

1. **Plano Light (R$ 99):** [`exemplos_entregaveis/01_plano_light/index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/exemplos_entregaveis/01_plano_light/index.html) — 1 Foto, dados essenciais, GPS e RSVP WhatsApp.
2. **Plano Silver (R$ 149):** [`exemplos_entregaveis/02_plano_silver/index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/exemplos_entregaveis/02_plano_silver/index.html) — Player de música (.mp3), galeria de fotos, cronograma visual, dress code e botão PIX copia e cola.
3. **Plano Gold (R$ 199):** [`exemplos_entregaveis/03_plano_gold/index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/exemplos_entregaveis/03_plano_gold/index.html) — Vídeo vertical do casal em loop no banner principal, storytelling ("Nossa História") e dicas para convidados.
4. **Plano Premium (R$ 250 - Teto):** [`exemplos_entregaveis/04_plano_premium/index.html`](file:///C:/Users/thiag/Desktop/_projetos/_portfolio_convites/exemplos_entregaveis/04_plano_premium/index.html) — Vídeo vertical HD + Trilha Sonora + Linha do tempo animada + Múltiplos locais (Catedral + Recepção com Waze e Maps) + RSVP Inteligente com acompanhantes + QR Code PIX + Cartão Digital PDF de brinde.

---

## 🚀 Fluxo Operacional de Produção

1. **Venda & Onboarding:** Cliente escolhe o modelo na vitrine e recebe o link `seusite.com/briefing.html`.
2. **Recebimento de Dados:** Os dados preenchidos chegam formatados no WhatsApp `62 9 9604-6458`.
3. **Customização do Template:** Duplica-se a pasta do template escolhido para `clientes/nome-dos-noivos/` e personalizam-se textos, fotos, música e links.
4. **Hospedagem Gratuita & Deploy:** Upload da pasta na Vercel / Netlify gerando link imediato sem custo de servidor.
5. **Tempo Médio de Produção:** ~20 a 35 minutos por convite.
