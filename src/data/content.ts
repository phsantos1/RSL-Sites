import { ServiceItem, ProjectItem, TestimonialItem, DifferentialItem, PricingPlan } from '../types';

export const WHATSAPP_NUMBER = '5537998304238';
export const WHATSAPP_DISPLAY = '(37) 99830-4238';
export const INSTAGRAM_HANDLE = '@rslsites';
export const INSTAGRAM_URL = 'https://instagram.com/rslsites';
export const EMAIL_CONTACT = 'rsldigital.contato@gmail.com';

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = 'Olá! Gostaria de solicitar um orçamento para o meu site com a RSL Sites.';
  const message = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plano-simples',
    name: 'Plano Simples',
    price: 'R$ 300',
    priceValue: 300,
    period: 'pagamento único',
    badge: 'Entrada Rápida',
    isPopular: false,
    shortDesc: 'A solução ideal para quem precisa de presença digital profissional com agilidade extrema e baixo investimento.',
    deliveryTime: '12 a 24 horas',
    idealFor: 'Autônomos, prestadores de serviço e comércios locais que querem ser encontrados rapidamente.',
    features: [
      'Landing Page One-Page direta e objetiva',
      '100% responsivo para celulares e computadores',
      'Botão flutuante de WhatsApp com link direto',
      'Apresentação de serviços/produtos essenciais',
      'Carregamento veloz e código limpo',
      'Entrega express em 12 a 24 horas',
      'Sem mensalidades obrigatórias de manutenção'
    ],
    notIncluded: [
      'Múltiplas páginas internas',
      'Catálogo interativo com filtros',
      'Configuração avançada de Pixel de Anúncios'
    ],
    whatsappMessage: 'Olá! Tenho interesse no Plano Simples de R$ 300 (Entrega em 12 a 24h). Gostaria de iniciar meu site!'
  },
  {
    id: 'plano-essencial',
    name: 'Plano Essencial',
    price: 'R$ 600',
    priceValue: 600,
    period: 'pagamento único',
    badge: 'Mais Escolhido',
    isPopular: true,
    shortDesc: 'Estrutura completa com forte autoridade de marca para pequenas e médias empresas atraírem clientes qualificados.',
    deliveryTime: '24 a 36 horas',
    idealFor: 'Empresas, clínicas, consultorias e negócios que buscam autoridade e credibilidade sólida.',
    features: [
      'Site institucional completo ou Landing Page Avançada (até 4 seções/páginas)',
      'Seções estratégicas: Início, Sobre, Serviços/Diferenciais e Contato',
      'Otimização de SEO Local para buscas no Google da sua cidade',
      'Integração com Google Maps, WhatsApp e Redes Sociais',
      'Formulário dinâmico de orçamento/proposta',
      'Design moderno e personalizado com a identidade da sua marca',
      'Entrega garantida em 24 a 36 horas',
      'Condições facilitadas de pagamento'
    ],
    notIncluded: [
      'Catálogo comercial avançado de múltiplos produtos'
    ],
    whatsappMessage: 'Olá! Gostaria de contratar o Plano Essencial de R$ 600 (Entrega em 24 a 36h) para minha empresa.'
  },
  {
    id: 'plano-premium',
    name: 'Plano Premium',
    price: 'R$ 800',
    priceValue: 800,
    period: 'pagamento único',
    badge: 'Máxima Conversão',
    isPopular: false,
    shortDesc: 'A máquina de vendas digital definitiva: vitrine completa, alta conversão para tráfego pago e acabamento de alto padrão.',
    deliveryTime: '24 a 36 horas',
    idealFor: 'Negócios consolidados, lojas com catálogo, restaurantes com cardápio ou empresas investindo em anúncios.',
    features: [
      'Site de Alta Conversão ou Catálogo Comercial/Cardápio Digital (até 6 seções/páginas)',
      'Galeria de produtos/serviços com botões de pedido direto no WhatsApp',
      'Integração de Pixel do Meta (Facebook/Instagram) e Google Tag Manager',
      'Copywriting persuasivo focado em converter cliques em orçamentos',
      'Otimização de performance extrema (PageSpeed score elevado)',
      'Design de alto luxo com microinterações refinadas',
      'Entrega express em 24 a 36 horas',
      'Suporte prioritário pós-entrega'
    ],
    whatsappMessage: 'Olá! Quero o Plano Premium de R$ 800 (Entrega em 24 a 36h) para colocar meu negócio no nível máximo.'
  },
  {
    id: 'plano-sob-medida',
    name: 'Projeto Sob Medida',
    price: 'A Negociar',
    period: 'orçamento personalizado',
    badge: 'Customizado',
    isPopular: false,
    shortDesc: 'Desenvolvimento específico para projetos complexos, portais corporativos, integrações especiais ou redesign completo.',
    deliveryTime: 'A combinar (sob medida)',
    idealFor: 'Empresas com demandas peculiares, portais multi-páginas ou sistemas integrados sob consulta.',
    features: [
      'Arquitetura e número de páginas 100% flexíveis',
      'Consultoria estratégica e levantamento de requisitos',
      'Integrações com APIs ou sistemas externos',
      'Projetos especiais de redesign ou migração',
      'Cronograma e escopo definidos em conjunto',
      'Atendimento executivo exclusivo no WhatsApp'
    ],
    whatsappMessage: 'Olá! Tenho uma demanda específica e gostaria de negociar um Projeto Personalizado / Sob Medida com a RSL Sites.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'sites-profissionais',
    title: 'Criação de Sites Profissionais',
    shortDesc: 'Estrutura completa sob medida para posicionar seu negócio com autoridade imediata no mercado.',
    fullDesc: 'Desenvolvimento do zero de sites institucionais completos, com visual moderno, código limpo e arquitetura pensada para transmitir credibilidade e gerar negócios constantes.',
    badge: 'Mais Solicitado',
    deliverables: [
      'Design exclusivo alinhado à sua marca',
      'Até 6 páginas estratégicas completas',
      'Integração direta com WhatsApp e redes',
      'Indexação e configuração no Google',
      'Entrega em tempo recorde de 12 a 36 horas'
    ],
    idealFor: 'Empresas consolidadas, comércios locais e prestadores de serviços de alto padrão.',
    iconName: 'Globe',
    whatsappMessage: 'Olá! Gostaria de um orçamento para a Criação de um Site Profissional para minha empresa.'
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages de Alta Conversão',
    shortDesc: 'Páginas diretas e persuasivas criadas especificamente para campanhas de anúncios e vendas rápidas.',
    fullDesc: 'Páginas focadas em um único objetivo: transformar cliques em mensagens no seu WhatsApp ou leads qualificados. Copywriting persuasivo, carregamento ultrarrápido e botões de chamada estratégicos.',
    badge: 'Foco em Vendas',
    deliverables: [
      'Estrutura com técnicas de conversão direta',
      'Carregamento instantâneo para anúncios (Google e Meta Ads)',
      'Formulário inteligente e botão WhatsApp fixo',
      'Integração de Pixel do Facebook e Google Tag Manager',
      'Pronto no ar em 12 a 24 horas'
    ],
    idealFor: 'Lançamento de produtos, prestadores de serviços, campanhas promocionais e consultorias.',
    iconName: 'Zap',
    whatsappMessage: 'Olá! Quero um orçamento para uma Landing Page de alta conversão para meu negócio.'
  },
  {
    id: 'sites-institucionais',
    title: 'Sites Institucionais para Empresas',
    shortDesc: 'Apresentação formal e corporativa para empresas que necessitam fechar parcerias e contratos.',
    fullDesc: 'Seu cartão de visitas moderno e interativo. Apresente a história, a equipe, os valores e o portfólio da sua organização de forma impecável, fortalecendo a reputação da marca.',
    deliverables: [
      'Seções estruturadas: Quem Somos, Serviços, Equipe, Clientes e Contato',
      'Design corporativo com acabamento premium',
      'Certificado de Segurança SSL incluso',
      'Formulários formais de solicitação de proposta',
      'Entrega rápida em 24 a 36 horas'
    ],
    idealFor: 'Indústrias, escritórios de advocacia, consultorias empresariais, clínicas e construtoras.',
    iconName: 'Building2',
    whatsappMessage: 'Olá! Gostaria de solicitar uma proposta para um Site Institucional Corporativo.'
  },
  {
    id: 'catalogo-produtos',
    title: 'Páginas para Produtos e Serviços',
    shortDesc: 'Vitrines digitais interativas para exibir seu cardápio, catálogo ou portfólio comercial.',
    fullDesc: 'Permita que seus clientes explorem seus produtos ou serviços com fotos de alta qualidade, detalhes e preços, com botão de pedido direto no WhatsApp sem taxas abusivas de marketplaces.',
    deliverables: [
      'Galeria visual com filtros por categoria',
      'Botão "Pedir no WhatsApp" ou "Consultar Preço" em cada item',
      'Cardápio digital ou catálogo de produtos sem comissão',
      'Atualização simples e rápida de fotos e valores',
      'Entrega em 24 a 36 horas'
    ],
    idealFor: 'Lojas de roupas, restaurantes, bistrôs, marcenarias, oficinas e artesãos.',
    iconName: 'ShoppingBag',
    whatsappMessage: 'Olá! Tenho interesse em uma Página de Apresentação de Produtos/Catálogo Comercial.'
  },
  {
    id: 'sites-responsivos',
    title: 'Design Responsivo para Celular e Computador',
    shortDesc: 'Experiência fluida e impecável em smartphones, tablets, notebooks e grandes monitores.',
    fullDesc: 'Mais de 80% do tráfego atual vem de celulares. Todos os projetos da RSL Sites são construídos mobile-first, garantindo botões confortáveis de tocar, textos legíveis e zero quebras visuais.',
    deliverables: [
      'Layout adaptável a qualquer tamanho de tela',
      'Navegação por toque ergonômica para smartphone',
      'Imagens otimizadas com compactação sem perda de nitidez',
      'Testado em iOS, Android, Windows e Mac',
      'Barra inferior de contato rápido para celular'
    ],
    idealFor: 'Qualquer negócio que receba visitas pelo Instagram, Google ou anúncios no celular.',
    iconName: 'Smartphone',
    whatsappMessage: 'Olá! Gostaria de modernizar meu site para que funcione perfeitamente no celular.'
  },
  {
    id: 'otimizacao-digital',
    title: 'Otimização da Presença Digital & SEO',
    shortDesc: 'Configurações para seu negócio ser encontrado no Google da sua região com facilidade.',
    fullDesc: 'Não basta ter um site bonito: as pessoas precisam encontrá-lo. Estruturamos os metadados, títulos, tags do Google, velocidade de abertura e integração com o perfil do Google Meu Negócio.',
    deliverables: [
      'SEO on-page para buscas locais da sua cidade/região',
      'Conexão com Google Search Console e Google Analytics',
      'Orientação para otimização do perfil Google Meu Negócio',
      'Tempo de carregamento veloz (PageSpeed score elevado)',
      'Cards elegantes de compartilhamento no WhatsApp e redes'
    ],
    idealFor: 'Empresas locais que desejam atrair novos clientes da sua cidade organicamente.',
    iconName: 'Search',
    whatsappMessage: 'Olá! Gostaria de entender mais sobre a Otimização da Presença Digital e SEO para meu site.'
  }
];

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    iconName: 'MonitorCheck',
    title: 'Sites modernos e profissionais',
    description: 'Design de alto padrão que transmite autoridade imediata e diferencia sua empresa dos concorrentes amadores.',
    benefit: 'Seus clientes sentem confiança logo no primeiro segundo de visita.'
  },
  {
    iconName: 'Coins',
    title: 'Preços acessíveis e ótimo custo-benefício',
    description: 'Planos a partir de R$ 300, R$ 600 e R$ 800. Sem taxas surpresas ou mensalidades ocultas.',
    benefit: 'Retorno sobre o investimento acessível para qualquer negócio.'
  },
  {
    iconName: 'Smartphone',
    title: '100% Responsivo no Celular',
    description: 'Arquitetura mobile-first pensada para telas de toque, botões ergonômicos e carregamento ultrarrápido.',
    benefit: 'Nenhum cliente é perdido por site quebrado ou botão difícil de clicar.'
  },
  {
    iconName: 'Sparkles',
    title: 'Projetos personalizados para cada negócio',
    description: 'Não usamos receitas de bolo. Cada site respeita as cores, tom de voz, público e objetivos do seu segmento.',
    benefit: 'Sua marca com personalidade própria e identidade marcante.'
  },
  {
    iconName: 'Flame',
    title: 'Agilidade Recorde no Desenvolvimento',
    description: 'Metodologia direta e descomplicada. Entregamos seu site pronto no ar entre 12 a 36 horas.',
    benefit: 'Seu negócio começa a vender e receber orçamentos de imediato.'
  },
  {
    iconName: 'HeartHandshake',
    title: 'Atendimento próximo e personalizado',
    description: 'Você fala diretamente com quem está construindo seu site. Suporte pelo WhatsApp sem robôs ou chamados frios.',
    benefit: 'Acompanhamento claro em cada etapa com total tranquilidade.'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'lumina-saude',
    title: 'Lumina Odontologia & Estética',
    client: 'Clínica Lumina Odonto',
    category: 'health',
    categoryLabel: 'Clínicas & Saúde',
    image: '/src/assets/images/project_clinic_health_1793191788962.jpg',
    overview: 'Website institucional e catálogo de procedimentos estéticos e odontológicos modernos, com foco em agendamentos diretos pelo WhatsApp e transmissão de biossegurança e requinte.',
    challenge: 'A clínica recebia muitas mensagens confusas no Instagram de pessoas que não sabiam os tratamentos disponíveis nem a localização exata.',
    solution: 'Criamos um portal limpo com fotos dos consultórios, lista detalhada de especialidades, depoimentos de pacientes e botão fixo de agendamento que direciona para a recepcionista com a especialidade já selecionada.',
    metric: '+140%',
    metricLabel: 'Aumento em consultas particulares agendadas em 60 dias',
    features: [
      'Agendamento direto para WhatsApp com mensagem personalizada',
      'Página de tratamentos com explicações simples para o paciente',
      'Integração com Google Maps para rota rápida',
      'Entregue e publicado em menos de 36 horas'
    ],
    tags: ['Clínica Odontológica', 'Design Limpo', 'Agendamento WhatsApp', 'SEO Local']
  },
  {
    id: 'daily-grind-bistro',
    title: 'The Daily Grind Bistrô & Café',
    client: 'The Daily Grind Gastronomia',
    category: 'local',
    categoryLabel: 'Comércio Local & Gastronomia',
    image: '/src/assets/images/project_cafe_bistro_1793191788542.jpg',
    overview: 'Página moderna e cardápio digital interativo para cafeteria artesanal e bistrô gourmet, permitindo consulta rápida de itens, fotos apetitosas e reservas de mesa.',
    challenge: 'O estabelecimento pagava taxas de 27% para aplicativos de entrega e perdia vendas de clientes que procuravam pelo cardápio nos horários de pico.',
    solution: 'Desenvolvemos uma vitrine digital leve e responsiva com fotos reais dos pratos, tabela de preços atualizada em tempo real e botão de pedido direto no WhatsApp sem intermediação.',
    metric: '-65%',
    metricLabel: 'Redução em custos com taxas de plataformas terceirizadas',
    features: [
      'Cardápio digital dinâmico separado por categorias',
      'QR Code nas mesas apontando direto para o site',
      'Sistema de reserva de mesas com confirmação por mensagem',
      'Entrega recorde realizada em 24 horas'
    ],
    tags: ['Gastronomia Local', 'Cardápio Digital', 'Economia de Taxas', 'QR Code']
  },
  {
    id: 'terra-oak-boutique',
    title: 'Terra & Oak Concept Store',
    client: 'Terra & Oak Moda e Decoração',
    category: 'catalog',
    categoryLabel: 'Vitrines & Catálogos',
    image: '/src/assets/images/project_local_store_1793191791562.jpg',
    overview: 'Catálogo comercial minimalista para loja de vestuário e itens de decoração artesanal, focado em destacar novas coleções e converter o interesse do Instagram em vendas concretas.',
    challenge: 'Muitos seguidores no Instagram desistiam da compra porque a vendedora demorava a responder valores e tamanhos por Direct.',
    solution: 'Montamos uma vitrine visual onde o cliente navega pelas fotos, seleciona tamanho e variação, e clica em "Comprar esta peça" para iniciar a conversa já com a foto e o código do produto.',
    metric: '3.4x',
    metricLabel: 'Mais agilidade no atendimento de vendas pelo WhatsApp',
    features: [
      'Vitrine visual moderna com fotos em alta resolução',
      'Filtro rápido por departamento (Roupas, Calçados, Decoração)',
      'Link direto de checkout para o WhatsApp da atendente',
      'Finalizado e publicado em 36 horas'
    ],
    tags: ['Moda & Varejo', 'Vitrine Digital', 'Catálogo Comercial', 'Mobile-First']
  },
  {
    id: 'lexington-consultoria',
    title: 'Lexington Consultoria & Estratégia',
    client: 'Lexington Business Advisory',
    category: 'institutional',
    categoryLabel: 'Institucional Corporativo',
    image: '/src/assets/images/project_corporate_firm_1793191789580.jpg',
    overview: 'Site corporativo de alto padrão para escritório de consultoria jurídica e estratégica empresarial, com foco em fechamento de contratos corporativos.',
    challenge: 'O escritório concorria com bancas renomadas mas seu site antigo parecia desatualizado e não passava o peso de sua experiência de mais de 10 anos.',
    solution: 'Redesenhamos a presença digital com tipografia sofisticada, artigos de liderança de pensamento, histórico de cases e formulário de diagnóstico confidencial.',
    metric: '100%',
    metricLabel: 'Percepção de valor e qualificação dos novos contratos',
    features: [
      'Design institucional sóbrio com paleta preta e detalhes executivos',
      'Seção de áreas de atuação com propostas de valor claras',
      'Formulário estruturado para solicitação de parecer técnico',
      'Entrega express realizada em 36 horas'
    ],
    tags: ['Corporativo', 'B2B', 'Alta Autoridade', 'Consultoria']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'dep-1',
    name: 'Dra. Camila Nogueira',
    role: 'Fundadora e Cirurgiã-Dentista',
    company: 'Lumina Odonto',
    segment: 'Saúde & Estética',
    quote: 'A agilidade da RSL Sites me surpreendeu demais: enviamos o material pela manhã e em menos de 24 horas o site já estava no ar e funcionando! Nossos pacientes elogiam direto a facilidade de agendar consulta no WhatsApp.',
    highlightMetric: 'Site no ar em 24h e +140% contatos',
    rating: 5
  },
  {
    id: 'dep-2',
    name: 'Marcos Vinícius Costa',
    role: 'Sócio-Proprietário',
    company: 'The Daily Grind Bistrô',
    segment: 'Alimentação & Comércio Local',
    quote: 'Contratamos o plano para cardápio digital e foi a melhor decisão. O site foi entregue em 30 horas com QR Code para as mesas. Economizamos milhares de reais em taxas de aplicativos.',
    highlightMetric: 'R$ 3.800 economizados por mês',
    rating: 5
  },
  {
    id: 'dep-3',
    name: 'Renata Albuquerque',
    role: 'Diretora Comercial',
    company: 'Terra & Oak Concept',
    segment: 'Moda & Varejo',
    quote: 'O que mais me impressionou foi a pontualidade da entrega e a paciência no atendimento. Em pouco mais de um dia nosso catálogo estava perfeito no ar e nossas vendas pelo Instagram deram um salto.',
    highlightMetric: 'Entrega em 36 horas e vendas dobradas',
    rating: 5
  }
];

export const FAQS = [
  {
    question: 'A entrega do site realmente é feita em 12 a 36 horas?',
    answer: 'Sim! Nosso processo é 100% otimizado e sem enrolação. Assim que você escolhe o plano (Simples de R$ 300, Essencial de R$ 600 ou Premium de R$ 800) e nos envia os dados básicos da sua empresa (logo, serviços, contatos e fotos), colocamos seu site no ar no prazo de 12 a 36 horas úteis garantido.'
  },
  {
    question: 'Qual é a diferença exata entre os planos de R$ 300, R$ 600 e R$ 800?',
    answer: '• Plano Simples (R$ 300): Landing page direta de uma página (one-page), ideal para autônomos começarem com presença profissional e botão de WhatsApp imediato (12 a 24h).\n• Plano Essencial (R$ 600): Estrutura completa de até 4 seções/páginas para empresas (Sobre, Serviços, Galeria e Contato) com SEO no Google e formulário (24 a 36h).\n• Plano Premium (R$ 800): Solução de alta conversão ou catálogo comercial/cardápio de até 6 seções com botões de pedido direto, Pixel de anúncios do Facebook/Google e velocidade máxima (24 a 36h).'
  },
  {
    question: 'Como funciona o Projeto Personalizado / Sob Medida a Negociar?',
    answer: 'Se você precisa de um portal com muitas páginas, integrações personalizadas com sistemas internos, redesign complexo ou regras específicas do seu nicho, nós montamos uma proposta sob medida com escopo e valor negociados diretamente no WhatsApp.'
  },
  {
    question: 'Eu preciso saber programar ou mexer em computador para ter um site?',
    answer: 'Absolutamente não! Nós cuidamos de toda a parte técnica, hospedagem, configuração e layout. Você só nos envia fotos, textos básicos ou as ideias do seu negócio e nós entregamos tudo funcionando pronto para usar.'
  },
  {
    question: 'O site funciona bem em celulares de todos os tipos?',
    answer: 'Sim, 100%. Todos os sites da RSL Sites são construídos com foco prioritário no celular (mobile-first), pois sabemos que a imensa maioria dos seus clientes virá do Instagram, WhatsApp ou buscas no smartphone.'
  },
  {
    question: 'Vou pagar mensalidades eternas para manter o site no ar?',
    answer: 'Não cobramos taxas ocultas. Você paga pelo desenvolvimento do site e nós auxiliamos você a manter os custos básicos oficiais de domínio (.com.br custa apenas R$ 40 por ano no Registro.br) e hospedagem de baixo custo. Sem surpresas no seu orçamento.'
  },
  {
    question: 'Como funciona o pagamento do projeto?',
    answer: 'Trabalhamos com condições facilitadas pensadas para o empreendedor e autônomo brasileiro: Pix com entrada + saldo na entrega aprovada, ou parcelamento em até 12x no cartão de crédito via link seguro.'
  }
];
