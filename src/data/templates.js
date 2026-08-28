// ==========================================================================
// TEMPLATES & PLANS DATA - ATELIER DOS NOIVOS
// ==========================================================================

export const TEMPLATES_DATA = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    tagline: "Classico Nobre | Ouro & Marfim",
    category: "classico",
    description: "Tipografia nobre, contagem regressiva sofisticada e acabamento com paleta de ouro e marfim.",
    featured: true,
    badge: "Mais Procurado",
    video: "assets/videos/template_01.webm",
    demoUrl: "templates/royal-gold/index.html",
    palette: ["#D4AF37", "#FAF8F5", "#1C1917"]
  },
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Design Editorial | Atemporal & Clean",
    category: "minimalista",
    description: "Design moderno com foco na fotografia do casal, tipografia leve e navegacao ultrarrapida.",
    featured: true,
    badge: "Destaque da Colecao",
    video: "assets/videos/template_02.webm",
    demoUrl: "templates/minimalist/index.html",
    palette: ["#4A5D4A", "#FFFFFF", "#2B2B2B"]
  },
  {
    id: "vibrant-vows",
    name: "Vibrant Vows",
    tagline: "Editorial Contemporaneo | Alta Costura",
    category: "moderno",
    description: "Estilo revista de noivas com layouts arrojados e transicoes que valorizam a historia do casal.",
    featured: false,
    badge: "Moderno",
    video: "assets/videos/template_03.webm",
    demoUrl: "templates/vibrant-vows/index.html",
    palette: ["#E07A5F", "#F4F1DE", "#3D405B"]
  },
  {
    id: "eternal-romance",
    name: "Eternal Romance",
    tagline: "Romantico Floral | Trilha Sonora",
    category: "romantico",
    description: "Atmosfera romantica com detalhes florais suaves, musica de fundo e confirmacao de presenca.",
    featured: false,
    badge: "Floral Suave",
    video: "assets/videos/template_04.webm",
    demoUrl: "templates/eternal-romance/index.html",
    palette: ["#DDA15E", "#FEFAE0", "#606C38"]
  },
  {
    id: "sacred-garden",
    name: "The Sacred Garden",
    tagline: "Ao Ar Livre | Campo & Praia",
    category: "ao-ar-livre",
    description: "Elementos botanicos organicos, paleta terrosa e estrutura para cerimonias em sitios e praia.",
    featured: false,
    badge: "Botanico",
    video: "assets/videos/template_05.webm",
    demoUrl: "templates/sacred-garden/index.html",
    palette: ["#84A98C", "#CAD2C5", "#2F3E46"]
  },
  {
    id: "dolce-vita",
    name: "Dolce Vita",
    tagline: "Inspiracao Mediterranea | Elegancia",
    category: "destination",
    description: "Estetica solar da Costa Amalfitana com elementos rusticos finos e guia de hospedagem.",
    featured: false,
    badge: "Mediterraneo",
    video: "assets/videos/template_06.webm",
    demoUrl: "templates/dolce-vita/index.html",
    palette: ["#F4A261", "#E76F51", "#264653"]
  },
  {
    id: "blossom-oud",
    name: "Blossom & Oud",
    tagline: "Noturno Sofisticado | Atmosfera & Ouro",
    category: "luxo",
    description: "Estetica noturna com dourado marcante sobre tons escuros e experiencia audiovisual envolvente.",
    featured: false,
    badge: "Dark Luxury",
    video: "assets/videos/template_07.webm",
    demoUrl: "templates/blossom-oud/index.html",
    palette: ["#D4AF37", "#121212", "#1F1F1F"]
  },
  {
    id: "destination-love",
    name: "Destination Love",
    tagline: "Destination Wedding | Guia de Viagem",
    category: "destination",
    description: "Guia completo com roteiro de dias, hoteis parceiros, dress code e rotas para Maps e Waze.",
    featured: false,
    badge: "Destination",
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
    tagline: "Essencial & Agil",
    description: "Convite digital direto com confirmacao de presenca e localizacao integrada.",
    popular: false,
    badge: "",
    features: [
      "Foto principal do casal em alta resolucao",
      "Contagem regressiva interativa para o grande dia",
      "Localizacao exata com rota direta para Waze e Google Maps",
      "Confirmacao de presenca direta em tempo real",
      "Hospedagem inclusa com link seguro (HTTPS)"
    ]
  },
  {
    id: "silver",
    name: "Plano Silver",
    price: 149,
    formattedPrice: "R$ 149",
    tagline: "O Mais Escolhido pelos Noivos",
    description: "A combinacao perfeita com musica ambiente, galeria de fotos e presentes via PIX.",
    popular: true,
    badge: "Mais Escolhido",
    features: [
      "Tudo incluido no Plano Light",
      "Player de musica com a cancao especial do casal",
      "Galeria de fotos interativa com momentos do casal",
      "Cronograma visual completo da cerimonia e festa",
      "Guia de trajes recomendados (Dress Code)",
      "Botao de Presente via PIX com chave Copia e Cola"
    ]
  },
  {
    id: "gold",
    name: "Plano Gold",
    price: 199,
    formattedPrice: "R$ 199",
    tagline: "Experiencia com Video & Historia",
    description: "Video vertical dos noivos, pagina da historia do casal e mural de recados.",
    popular: false,
    badge: "Alta Experiencia",
    features: [
      "Tudo incluido no Plano Silver",
      "Video vertical dos noivos em loop no topo",
      "Secao especial Nossa Historia com fotos e linha do tempo",
      "Guia util de saloes de beleza e hospedagens parceiras",
      "Mural interativo de mensagens dos convidados"
    ]
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: 250,
    formattedPrice: "R$ 250",
    tagline: "Experiencia VIP Completa",
    description: "Multiplos locais, gestao inteligente de acompanhantes e cartao digital em alta definicao.",
    popular: false,
    badge: "Exclusivo",
    features: [
      "Tudo incluido no Plano Gold",
      "Video vertical em Ultra HD com trilha sonora masterizada",
      "Linha do tempo animada com os marcos do relacionamento",
      "Multiplos locais com rotas separadas (Igreja + Recepcao)",
      "Confirmacao de presenca com selecao de acompanhantes",
      "QR Code PIX exclusivo para lista de presentes",
      "Brinde: Cartao Digital Interativo em PDF de alta qualidade"
    ]
  }
];
