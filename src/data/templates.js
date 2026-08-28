// ==========================================================================
// TEMPLATES & PLANS DATA - ATELIER DOS NOIVOS (VERSAO OFERTA UNICA R$ 87,90)
// ==========================================================================

export const TEMPLATES_DATA = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    tagline: "Classico Nobre | Ouro & Marfim",
    category: "classico",
    description: "Tipografia nobre, contagem regressiva sofisticada e acabamento com paleta de ouro e marfim.",
    featured: true,
    badge: "Mais Escolhido",
    video: "assets/videos/template_01.webm",
    poster: "assets/imagens_convites/story_1_luxo_dourado.png",
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
    badge: "Destaque Editorial",
    video: "assets/videos/template_02.webm",
    poster: "assets/imagens_convites/story_3_moderno_minimalista.png",
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
    poster: "assets/imagens_convites/story_1_luxo_dourado.png",
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
    poster: "assets/imagens_convites/story_2_romantico_floral.png",
    demoUrl: "templates/eternal-romance/index.html",
    palette: ["#DDA15E", "#FEFAE0", "#606C38"]
  },
  {
    id: "sacred-garden",
    name: "The Sacred Garden",
    tagline: "Ao Ar Livre | Campo & Praia",
    category: "ao-ar-livre",
    description: "Elementos botanicos organicos, capela ilustrada e estrutura para cerimonias em sitios e praia.",
    featured: false,
    badge: "Botanico",
    video: "assets/videos/template_05.webm",
    poster: "assets/images/chapel-garden.jpg",
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
    poster: "assets/imagens_convites/story_3_moderno_minimalista.png",
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
    poster: "assets/imagens_convites/story_1_luxo_dourado.png",
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
    poster: "assets/imagens_convites/story_2_romantico_floral.png",
    demoUrl: "templates/destination-love/index.html",
    palette: ["#C5A880", "#F9F8F6", "#4A4036"]
  }
];

export const PLANOS_DATA = [
  {
    id: "completo",
    name: "Convite Digital Completo",
    price: 87.90,
    formattedPrice: "R$ 87,90",
    tagline: "Tudo Incluido • Oferta Unica",
    description: "Seu convite de casamento digital, bonito de verdade, pronto para compartilhar em ate 48 horas.",
    popular: true,
    badge: "Oferta Exclusiva",
    features: [
      "Qualquer modelo autoral da colecao a sua escolha",
      "Foto e historia dos noivos em alta definicao",
      "Confirmacao de presenca em tempo real (WhatsApp)",
      "Rotas com clique direto para Google Maps e Waze",
      "Trilha sonora do casal (player com musica de fundo)",
      "Galeria de fotos e momentos especiais",
      "Cronograma visual da cerimonia e festa",
      "Guia de trajes recomendados (Dress Code)",
      "Botao de Presente via PIX com Copia e Cola",
      "Link exclusivo e seguro (HTTPS) ativo ate o casamento",
      "Entrega expressa em ate 48h uteis apos o briefing"
    ]
  }
];
