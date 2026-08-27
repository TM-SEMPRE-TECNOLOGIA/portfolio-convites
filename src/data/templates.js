// ==========================================================================
// CATÁLOGO DE TEMPLATES E PLANOS — ATELIER DOS NOIVOS
// ==========================================================================

export const TEMPLATES_DATA = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    tagline: "Clássico Nobre • Marfim & Dourado Imperial",
    category: "classico",
    description: "Tipografia nobre serifada, contagem regressiva sofisticada e acabamento com paleta de ouro e marfim.",
    badge: "Dourado Imperial",
    featured: true,
    video: "assets/videos/template_01.webm",
    demoUrl: "templates/royal-gold/index.html",
    palette: ["#E5B869", "#F7F5F0", "#1A1A1A"]
  },
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Design Editorial • Atemporal & Clean",
    category: "minimalista",
    description: "Design limpo e moderno com ênfase na fotografia do casal, tipografia leve e navegação ultrarrápida.",
    badge: "Favorito dos Noivos 🤍",
    featured: true,
    video: "assets/videos/template_02.webm",
    demoUrl: "templates/minimalist/index.html",
    palette: ["#D4AF37", "#FFFFFF", "#2B2B2B"]
  },
  {
    id: "vibrant-vows",
    name: "Vibrant Vows",
    tagline: "Editorial Moderno • Alta Costura",
    category: "moderno",
    description: "Estilo revista contemporânea, dinâmico, layouts arrojados e transições que valorizam a história do casal.",
    badge: "Moderno & Vibrante",
    featured: true,
    video: "assets/videos/template_03.webm",
    demoUrl: "templates/vibrant-vows/index.html",
    palette: ["#E07A5F", "#F4F1DE", "#3D405B"]
  },
  {
    id: "eternal-romance",
    name: "Eternal Romance",
    tagline: "Romântico Floral • Trilha Sonora & RSVP",
    category: "romantico",
    description: "Atmosfera romântica com detalhes florais suaves, música de fundo flutuante e confirmação de presença completa.",
    badge: "Romântico Floral",
    featured: true,
    video: "assets/videos/template_04.webm",
    demoUrl: "templates/eternal-romance/index.html",
    palette: ["#DDA15E", "#FEFAE0", "#606C38"]
  },
  {
    id: "sacred-garden",
    name: "The Sacred Garden",
    tagline: "Casamento ao Ar Livre • Campo & Praia",
    category: "ao-ar-livre",
    description: "Elementos botânicos orgânicos, paleta terrosa e estrutura perfeita para cerimônias em sítios, praia e campo.",
    badge: "Campo & Praia",
    featured: false,
    video: "assets/videos/template_05.webm",
    demoUrl: "templates/sacred-garden/index.html",
    palette: ["#84A98C", "#CAD2C5", "#2F3E46"]
  },
  {
    id: "dolce-vita",
    name: "Dolce Vita",
    tagline: "Inspiração Mediterrânea • Elegância Italiana",
    category: "destination",
    description: "Estética solar da Costa Amalfitana com elementos rústicos finos e guia de hospedagem para convidados.",
    badge: "Mediterrâneo",
    featured: false,
    video: "assets/videos/template_06.webm",
    demoUrl: "templates/dolce-vita/index.html",
    palette: ["#F4A261", "#E76F51", "#264653"]
  },
  {
    id: "blossom-oud",
    name: "Blossom & Oud",
    tagline: "Dark Luxury • Atmosfera Noturna e Ouro",
    category: "luxo",
    description: "Estética noturna imponente, dourado marcante sobre tons escuros e rica experiência audiovisual.",
    badge: "Dark Luxury",
    featured: false,
    video: "assets/videos/template_07.webm",
    demoUrl: "templates/blossom-oud/index.html",
    palette: ["#D4AF37", "#121212", "#1F1F1F"]
  },
  {
    id: "destination-love",
    name: "Destination Love",
    tagline: "Destination Wedding • Guia de Viagem & Mapas",
    category: "destination",
    description: "Guia completo com roteiro de dias, hotéis conveniados, dress code para múltiplos eventos e rotas Maps/Waze.",
    badge: "Destination Wedding",
    featured: false,
    video: "assets/videos/template_08.webm",
    demoUrl: "templates/destination-love/index.html",
    palette: ["#C5A880", "#F9F8F6", "#4A4036"]
  }
];

export const PLANOS_DATA = [
  {
    id: "light",
    name: "Plano Light",
    price: 99,
    formattedPrice: "R$ 99",
    tagline: "Essencial & Elegante",
    description: "Ideal para casais que buscam um convite digital ágil, direto e com confirmação em tempo real.",
    popular: false,
    features: [
      "Foto principal do casal em alta definição",
      "Contagem regressiva interativa para o grande dia",
      "Localização com botão direto para Waze & Google Maps",
      "Confirmação de presença (RSVP) direta",
      "Hospedagem rápida e link seguro (HTTPS)"
    ]
  },
  {
    id: "silver",
    name: "Plano Silver",
    price: 149,
    formattedPrice: "R$ 149",
    tagline: "Mais Vendido • Completo",
    description: "A experiência favorita com música ambiente, galeria de fotos e presente via PIX.",
    popular: true,
    features: [
      "Tudo incluído no Plano Light",
      "Player com a música especial do casal (.mp3)",
      "Galeria de fotos interativa com momentos do casal",
      "Cronograma visual da cerimônia e recepção",
      "Guia de trajes recomendados (Dress Code)",
      "Botão de Presente via Chave PIX (Copia e Cola)"
    ]
  },
  {
    id: "gold",
    name: "Plano Gold",
    price: 199,
    formattedPrice: "R$ 199",
    tagline: "Storytelling & Vídeo",
    description: "Para noivos que desejam contar sua história de amor em vídeo e encantar cada convidado.",
    popular: false,
    features: [
      "Tudo incluído no Plano Silver",
      "Vídeo vertical dos noivos em loop no topo (Hero)",
      "Sessão especial 'Nossa História' com fotos e texto",
      "Dicas úteis de salões de beleza e hospedagem",
      "Mural de mensagens e recados dos convidados"
    ]
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: 250,
    formattedPrice: "R$ 250",
    tagline: "Experiência de Luxo Absoluta",
    description: "O teto de sofisticação com múltiplos locais, QR Code animado e cartão digital brinde.",
    popular: false,
    features: [
      "Tudo incluído no Plano Gold",
      "Vídeo vertical em Ultra HD + Trilha sonora masterizada",
      "Linha do tempo animada com marcos do relacionamento",
      "Múltiplos locais (Cerimônia religiosa + Festa com rotas)",
      "RSVP Inteligente com seleção de acompanhantes e restrições",
      "QR Code PIX interativo para lista de presentes",
      "Brinde: Cartão Digital Interativo em PDF de alta qualidade"
    ]
  }
];
