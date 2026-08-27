// ==========================================================================
// TEMPLATES & PLANS DATA - ATELIER DOS NOIVOS
// ==========================================================================

export const TEMPLATES_DATA = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    tagline: "Classico nobre, marfim e dourado",
    category: "classico",
    description: "Tipografia serifada, contagem regressiva sofisticada e acabamento com paleta de ouro e marfim.",
    featured: true,
    video: "assets/videos/template_01.webm",
    demoUrl: "templates/royal-gold/index.html",
    palette: ["#E5B869", "#F7F5F0", "#1A1A1A"]
  },
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Design editorial, atemporal e limpo",
    category: "minimalista",
    description: "Design moderno com foco na fotografia do casal, tipografia leve e navegacao rapida.",
    featured: true,
    video: "assets/videos/template_02.webm",
    demoUrl: "templates/minimalist/index.html",
    palette: ["#D4AF37", "#FFFFFF", "#2B2B2B"]
  },
  {
    id: "vibrant-vows",
    name: "Vibrant Vows",
    tagline: "Editorial moderno, alta costura",
    category: "moderno",
    description: "Estilo revista contemporanea com layouts arrojados e transicoes que valorizam a historia do casal.",
    featured: false,
    video: "assets/videos/template_03.webm",
    demoUrl: "templates/vibrant-vows/index.html",
    palette: ["#E07A5F", "#F4F1DE", "#3D405B"]
  },
  {
    id: "eternal-romance",
    name: "Eternal Romance",
    tagline: "Romantico floral com trilha sonora",
    category: "romantico",
    description: "Atmosfera romantica com detalhes florais suaves, musica de fundo e confirmacao de presenca.",
    featured: false,
    video: "assets/videos/template_04.webm",
    demoUrl: "templates/eternal-romance/index.html",
    palette: ["#DDA15E", "#FEFAE0", "#606C38"]
  },
  {
    id: "sacred-garden",
    name: "The Sacred Garden",
    tagline: "Casamento ao ar livre, campo e praia",
    category: "ao-ar-livre",
    description: "Elementos botanicos organicos, paleta terrosa e estrutura para cerimonias em sitios e praia.",
    featured: false,
    video: "assets/videos/template_05.webm",
    demoUrl: "templates/sacred-garden/index.html",
    palette: ["#84A98C", "#CAD2C5", "#2F3E46"]
  },
  {
    id: "dolce-vita",
    name: "Dolce Vita",
    tagline: "Inspiracao mediterranea, elegancia italiana",
    category: "destination",
    description: "Estetica solar da Costa Amalfitana com elementos rusticos finos e guia de hospedagem.",
    featured: false,
    video: "assets/videos/template_06.webm",
    demoUrl: "templates/dolce-vita/index.html",
    palette: ["#F4A261", "#E76F51", "#264653"]
  },
  {
    id: "blossom-oud",
    name: "Blossom and Oud",
    tagline: "Luxo noturno, atmosfera e ouro",
    category: "luxo",
    description: "Estetica noturna com dourado marcante sobre tons escuros e experiencia audiovisual.",
    featured: false,
    video: "assets/videos/template_07.webm",
    demoUrl: "templates/blossom-oud/index.html",
    palette: ["#D4AF37", "#121212", "#1F1F1F"]
  },
  {
    id: "destination-love",
    name: "Destination Love",
    tagline: "Destination wedding, guia de viagem",
    category: "destination",
    description: "Guia completo com roteiro de dias, hoteis, dress code e rotas para Maps e Waze.",
    featured: false,
    video: "assets/videos/template_08.webm",
    demoUrl: "templates/destination-love/index.html",
    palette: ["#C5A880", "#F9F8F6", "#4A4036"]
  }
];

export const PLANOS_DATA = [
  {
    id: "light",
    name: "Light",
    price: 99,
    formattedPrice: "R$ 99",
    tagline: "Essencial",
    description: "Convite digital com confirmacao de presenca e localizacao integrada.",
    popular: false,
    visible: false,
    features: [
      "Foto principal do casal",
      "Contagem regressiva interativa",
      "Localizacao com Waze e Google Maps",
      "Confirmacao de presenca (RSVP)",
      "Link seguro HTTPS"
    ]
  },
  {
    id: "silver",
    name: "Silver",
    price: 149,
    formattedPrice: "R$ 149",
    tagline: "Recomendado",
    description: "Musica ambiente, galeria de fotos e presente via PIX integrados.",
    popular: true,
    visible: true,
    features: [
      "Tudo do plano Light",
      "Player com a musica do casal",
      "Galeria de fotos interativa",
      "Cronograma visual da cerimonia",
      "Guia de trajes (Dress Code)",
      "Presente via PIX (Copia e Cola)"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    price: 199,
    formattedPrice: "R$ 199",
    tagline: "Completo",
    description: "Video do casal, secao de historia e mural de recados dos convidados.",
    popular: false,
    visible: true,
    features: [
      "Tudo do plano Silver",
      "Video vertical dos noivos no topo",
      "Secao Nossa Historia com fotos",
      "Dicas de saloes e hospedagem",
      "Mural de mensagens dos convidados"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 250,
    formattedPrice: "R$ 250",
    tagline: "Sofisticado",
    description: "Multiplos locais, timeline animada, RSVP inteligente e cartao digital brinde.",
    popular: false,
    visible: false,
    features: [
      "Tudo do plano Gold",
      "Video Ultra HD com trilha masterizada",
      "Timeline animada do relacionamento",
      "Multiplos locais com rotas separadas",
      "RSVP com acompanhantes e restricoes",
      "QR Code PIX para lista de presentes",
      "Cartao digital em PDF de alta qualidade"
    ]
  }
];
