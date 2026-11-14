import { computed, watch } from 'vue'

/**
 * Fonte única de projetos para Home + /projetos + ProjectStoreDrawer.
 * Escala adicionando um item em `baseProjects` + traduções em
 * `home.projectsData.<key>` (name, shortDescription, longDescription, subtitle?).
 *
 * Imagens em public/images/projects/<key>/:
 *   thumb.* (card), icon.* (store), 1..4 (previews).
 * Prudential (backoffice) fica sem screenshots de propósito.
 */
const baseProjects = [
    {
      id: 1,
      key: 'bnb',
      thumbnail: '/images/projects/bnb/thumb.jpg',
      icon: '/images/projects/bnb/icon.webp',
      cover: null,
      coverColor: '#C8102E',
      technologies: ['Flutter', 'Clean Architecture'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/bnb-cart%C3%B5es/id6701303533',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.bnbcartoes&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR 3,6 (14) · Play 3,9 (100) · nov 2026
        rating: 3.6,
        ratingCount: '14',
        ageRating: 'AL',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Banco do Nordeste',
        languages: 'Inglês',
        size: '101,3 MB',
        installs: '50 mil+',
        users: '~62 mil',
        platformKey: 'iphone',
        apple: { rating: 3.6, count: '14' },
        play: { rating: 3.9, count: '100' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'Engineerbello', text: 'Interface é intuitiva e o design é ótimo.' },
          { source: 'appstore', rating: 5, author: 'Deiaispak', text: 'Adorei a experiência! O APP é rápido e muito eficiente.' },
          { source: 'appstore', rating: 3, author: 'AndiJúnior', text: 'O aplicativo não está enviando notificações de compras. E está tudo autorizado nas configurações do aparelho.' }
        ]
      },
      screenshots: [
        '/images/projects/bnb/1.webp',
        '/images/projects/bnb/2.webp',
        '/images/projects/bnb/3.webp',
        '/images/projects/bnb/4.webp'
      ]
    },
    {
      id: 2,
      key: 'banpara',
      thumbnail: '/images/projects/banpara/thumb.jpg',
      icon: '/images/projects/banpara/icon.webp',
      cover: null,
      coverColor: '#0B3D91',
      technologies: ['Flutter', 'Clean Architecture'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/banpar%C3%A1-cart%C3%A3o/id6737286836',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.banparacartoes&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR 3,7 (84) · Play 2,8 (621) · nov 2026
        rating: 3.7,
        ratingCount: '84',
        ageRating: 'AL',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Banpará',
        languages: 'Inglês',
        size: '89,2 MB',
        installs: '50 mil+',
        users: '~98 mil',
        platformKey: 'iphone',
        apple: { rating: 3.7, count: '84' },
        play: { rating: 2.8, count: '621' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'idmarcos', text: 'Melhorou muito quanto ao tempo de resposta no aplicativo. O App tem coisas a melhorar, principalmente quanto às opções de pagamento. No entanto, tem ótimas opções de configuração para não precisar ligar na central.' },
          { source: 'appstore', rating: 4, author: 'mitoilton', text: 'App é bom. Mas falta a opção de pagamento no PIX para melhorar e ser mais cômodo para o cliente. Quando vão fazer essa atualização?' },
          { source: 'appstore', rating: 2, author: 'Deyv15', text: 'O app piorou. Nem mostra mais as notificações na hora da compra, tal como valores, estabelecimentos e limite que resta no cartão.' }
        ]
      },
      screenshots: [
        '/images/projects/banpara/1.webp',
        '/images/projects/banpara/2.webp',
        '/images/projects/banpara/3.webp',
        '/images/projects/banpara/4.webp'
      ]
    },
    {
      id: 3,
      key: 'losango',
      thumbnail: '/images/projects/losango/icon.webp',
      icon: '/images/projects/losango/icon.webp',
      thumbnailContain: true,
      cover: null,
      coverColor: '#CC092F',
      technologies: ['Flutter', 'Clean Architecture'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/bradesco-seguros/id1256508403',
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.bradseg.bscelular&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR 4,3 (16,9 mil) · Play 4,7 (83,9 mil) · nov 2026
        rating: 4.3,
        ratingCount: '16,9 mil',
        ageRating: 'A12',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Bradesco Seguros',
        languages: 'Português',
        size: '207 MB',
        installs: '5 mi+',
        users: '~6,8 mi',
        platformKey: 'iphone',
        apple: { rating: 4.3, count: '16,9 mil' },
        play: { rating: 4.7, count: '83,9 mil' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'Alexandre Stresser', text: 'Ótima usabilidade, melhor app de seguros.' },
          { source: 'appstore', rating: 2, author: 'Michelle.kroto', text: 'Não consigo solicitar reembolso pelo app, a validação dos documentos não carrega e quando ligo na central dizem que vão transferir para o setor responsável e a ligação cai.' },
          { source: 'play', author: 'Glads Sampaio', text: 'Considero a apresentação de opções de médicos/ clínicas pela proximidade com um endereço muito ruim. Gostaria de ter uma lista de opções ampla e com a escolha de critérios.' }
        ]
      },
      screenshots: [
        '/images/projects/losango/1.webp',
        '/images/projects/losango/2.webp',
        '/images/projects/losango/3.webp',
        '/images/projects/losango/4.webp'
      ]
    },
    {
      id: 4,
      key: 'heiclub',
      thumbnail: '/images/projects/heiclub/thumb.jpg',
      icon: '/images/projects/heiclub/icon.webp',
      cover: null,
      coverColor: '#047857',
      technologies: ['Flutter', '.NET'],
      category: 'Loyalty',
      surface: 'web',
      appleLink: 'https://apps.apple.com/br/app/heishop/id1470577964',
      googleLink: null,
      websiteLink: 'https://clube.heineken.com.br',
      featured: false,
      store: {
        // App Store BR · Heishop · id1470577964 · 4,8 (48.010) · nov 2026
        rating: 4.84,
        ratingCount: '48 mil',
        ageRating: 'A16',
        chartRank: null,
        chartCategoryKey: 'business',
        developer: 'Heineken',
        languages: 'PT + 2',
        size: '37,9 MB',
        platformKey: 'iphone',
        apple: { rating: 4.84, count: '48 mil' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'Jim keith lopez salon', text: 'Mais facil e rapido para atender' },
          { source: 'appstore', rating: 3, author: 'Abilio Jr', text: 'Paguei no pix e me cobraram boleto' },
          { source: 'appstore', rating: 1, author: 'Fláviaferreira1234', text: 'Não dar pra saber se vem ou não a mercadoria, não consigo cancelar um pedido e refazer outro, poucas opções de produtos para a troca de pontos, já fiquei várias vezes sem receber mercadoria.' }
        ]
      },
      screenshots: [
        '/images/projects/heiclub/1.png',
        '/images/projects/heiclub/2.png',
        '/images/projects/heiclub/3.png',
        '/images/projects/heiclub/4.png'
      ]
    },
    {
      id: 5,
      key: 'prudential',
      thumbnail: '/images/projects/prudential/thumb.jpeg',
      icon: '/images/projects/prudential/thumb.jpeg',
      cover: null,
      coverColor: '#1D4ED8',
      technologies: ['Flutter', 'Flutter Web', 'XLSX', 'CSV'],
      category: 'Backoffice',
      surface: 'system',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: null,
        chartRank: null,
        chartCategoryKey: 'productivity',
        developer: 'Prudential',
        languages: null,
        size: null,
        platformKey: 'web'
      },
      screenshots: []
    },
    {
      id: 6,
      key: 'afinz',
      thumbnail: '/images/projects/afinz/thumb.png',
      icon: '/images/projects/afinz/icon.webp',
      cover: null,
      coverColor: '#7C3AED',
      technologies: ['Flutter', 'UI/UX', 'Product Design', 'Digital Banking', 'Card Tokenization'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/afinz/id1416167782',
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.sorocred.sorocredapp&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR 3,2 (8,2 mil) · Play 3,2 (37,8 mil) · nov 2026
        rating: 3.2,
        ratingCount: '8,2 mil',
        ageRating: 'AL',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Sorocred',
        languages: 'Inglês',
        size: '109 MB',
        installs: '1 mi+',
        users: '~3,8 mi',
        platformKey: 'iphone',
        apple: { rating: 3.2, count: '8,2 mil' },
        play: { rating: 3.2, count: '37,8 mil' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'Aleselma', text: 'Adorei a nova versão, mais fácil de usar!' },
          { source: 'appstore', rating: 3, author: 'RodrigoAlmeidaa', text: 'App nao abre no iPhone 15 pro max. Tive que instalar o app em um celular com Android para poder acessar.' },
          { source: 'play', author: 'Elidia maria Hentz Domingues', text: 'Não consigo visualizar boleto! Gostaria de receber via correio! Vocês cobram taxas muitas taxas! O cartão não e aceito em qualquer estabelecimento!' }
        ]
      },
      screenshots: [
        '/images/projects/afinz/1.webp',
        '/images/projects/afinz/2.webp',
        '/images/projects/afinz/3.webp',
        '/images/projects/afinz/4.webp'
      ]
    },
    {
      id: 11,
      key: 'bb',
      thumbnail: '/images/projects/bb/icon.webp',
      icon: '/images/projects/bb/icon.webp',
      cover: null,
      coverColor: '#FFED00',
      technologies: ['Flutter', 'UI/UX', 'Product Design', 'Digital Banking', 'Card Tokenization'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/bb-banco-cart%C3%A3o-cr%C3%A9dito/id330984271',
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.bb.android&hl=pt_BR',
      websiteLink: null,
      featured: false,
      store: {
        // App Store BR 4,8 (4,3 mi) · Play 4,7 (8,6 mi) · nov 2026
        rating: 4.8,
        ratingCount: '4,3 mi',
        ageRating: 'AL',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Banco do Brasil',
        languages: 'Inglês',
        size: '416,6 MB',
        installs: '100 mi+',
        users: '~130 mi',
        platformKey: 'iphone',
        apple: { rating: 4.8, count: '4,3 mi' },
        play: { rating: 4.7, count: '8,6 mi' },
        ratingHistogram: [3773098, 257257, 85752, 42876, 128628],
        reviews: [
          { source: 'appstore', rating: 5, author: 'RG187', text: 'Muito prático e ágil o app do BB.' },
          { source: 'appstore', rating: 5, author: 'Alexandre0777', text: 'App muito intuitivo' },
          { source: 'appstore', rating: 4, author: 'Carolinaqd', text: 'Aplicativo bom, intuitivo, mas apresenta algumas instabilidades.' }
        ]
      },
      screenshots: [
        '/images/projects/bb/1.webp',
        '/images/projects/bb/2.webp',
        '/images/projects/bb/3.webp',
        '/images/projects/bb/4.webp'
      ]
    },
    {
      id: 7,
      key: 'h2club',
      thumbnail: '/images/projects/h2club/thumb.png',
      icon: '/images/projects/h2club/icon.webp',
      cover: null,
      coverColor: '#3B0764',
      technologies: [
        'Flutter',
        'Riverpod',
        'React',
        'Geolocation',
        'Secure Storage',
        'Face ID',
        'JWT',
        'FCM',
        'Firebase',
        'BigQuery',
        'Salesforce Mobile Push',
        'WebView',
        'iOS',
        'Android',
        'UI/UX',
        'LGPD',
        'App Store'
      ],
      category: 'IGaming',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/h2-club/id6466628886',
      googleLink: 'https://play.google.com/store/apps/details?id=com.h2.app&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR 3,0 (20) · Play 2,9 (124) · nov 2026
        rating: 3.0,
        ratingCount: '20',
        ageRating: 'A18',
        chartRank: 79,
        chartCategoryKey: 'sports',
        developer: 'H2 Grupo',
        languages: 'Português',
        size: '65,8 MB',
        installs: '100 mil+',
        users: '~112 mil',
        platformKey: 'iphone',
        apple: { rating: 3.0, count: '20' },
        play: { rating: 2.9, count: '124' },
        reviews: [
          { source: 'appstore', rating: 5, author: 'Castellon89', text: 'Agora faço meus depósitos e saques direto pelo app.' },
          { source: 'appstore', rating: 1, author: 'Molinari95', text: 'Não permite realizar o cadastro (senha inválida) com senha contendo todas as exigências.' },
          { source: 'play', author: 'Rosangela Sousa', text: 'O aplicativo é ruim, não tem suporte, trava muito, não tem atendimento ao jogador, não dá pra tirar dúvidas.' }
        ]
      },
      screenshots: [
        '/images/projects/h2club/1.webp',
        '/images/projects/h2club/2.webp',
        '/images/projects/h2club/3.webp',
        '/images/projects/h2club/4.webp'
      ]
    },
    {
      id: 8,
      key: 'bluec',
      thumbnail: '/images/projects/bluec/thumb.avif',
      icon: '/images/projects/bluec/icon.webp',
      cover: null,
      coverColor: '#2563EB',
      technologies: ['Flutter', 'Apple Pay', 'Google Pay', 'Samsung Pay'],
      category: 'Fintech',
      surface: 'mobile',
      appleLink: 'https://apps.apple.com/br/app/cart%C3%A3o-csu/id6670409488',
      googleLink: null,
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR · Cartão CSU · id6670409488 · 5,0 (3) · nov 2026
        rating: 5,
        ratingCount: '3',
        ageRating: 'AL',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'CSU Digital',
        languages: 'Inglês',
        size: '86,4 MB',
        platformKey: 'iphone',
        apple: { rating: 5, count: '3' },
        ratingHistogram: [3, 0, 0, 0, 0],
        reviews: []
      },
      screenshots: [
        '/images/projects/bluec/1.webp',
        '/images/projects/bluec/2.webp',
        '/images/projects/bluec/3.webp',
        '/images/projects/bluec/4.webp'
      ]
    },
    {
      id: 9,
      key: 'komus',
      thumbnail: '/images/projects/komus/thumb.jpeg',
      icon: '/images/projects/komus/icon.jpeg',
      cover: null,
      coverColor: '#0F766E',
      technologies: [
        'Flutter',
        'Clean Architecture',
        'Nuxt.js',
        'Vue.js',
        'Node.js',
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript'
      ],
      category: 'Insurance',
      surface: 'mobile',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        // Play br.com.pitzi.pitzionboarding · removido em abr/2024 · 3,67 em 288 notas
        rating: 3.67,
        ratingCount: '288',
        ageRating: 'Livre',
        chartRank: null,
        chartCategoryKey: 'lifestyle',
        developer: 'Pitzi',
        languages: 'Português',
        size: '7,5 MB',
        installs: '140 mil',
        users: '~140 mil',
        platformKey: 'android',
        noteKey: 'komus',
        play: { rating: 3.67, count: '288' },
        ratingHistogram: [160, 26, 14, 6, 78],
        reviews: []
      },
      screenshots: [
        '/images/projects/komus/1.png',
        '/images/projects/komus/2.png',
        '/images/projects/komus/3.png',
        '/images/projects/komus/4.png'
      ]
    },
    {
      id: 10,
      key: 'neopdv',
      thumbnail: '/images/projects/neopdv/thumb.jpg',
      icon: '/images/projects/neopdv/icon.jpeg',
      cover: null,
      coverColor: '#7C3AED',
      technologies: ['Flutter', 'UI/UX', 'HTML', 'CSS', 'JavaScript', 'PDV', 'POS'],
      category: 'PDV',
      surface: 'system',
      appleLink: null,
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.neopdv.neopdv_app&hl=pt_BR',
      websiteLink: null,
      featured: false,
      store: {
        // Play BR · 4,3 (125) · 50 mil+ · atualizado 22 out 2026
        rating: 4.3,
        ratingCount: '125',
        ageRating: 'Livre',
        chartRank: null,
        chartCategoryKey: 'business',
        developer: 'POS2Go · NeoPDV',
        languages: 'Português',
        size: null,
        installs: '50 mil+',
        users: '~56 mil',
        platformKey: 'android',
        play: { rating: 4.3, count: '125' },
        reviews: [
          { source: 'play', rating: 5, author: 'D. CARLOS', text: 'Muiito bom o App, suporte atencioso, tenho percebido evolução e melhoras ao longo do tempo de uso, nota 10 para o aplicativo.' },
          { source: 'play', rating: 5, author: 'Raul', text: 'muito bom o aplicativo,fácil de usar e não cobra mensalidade obrigatório,grato aos desenvolvedores' },
          { source: 'play', rating: 5, author: 'Theila Silva', text: 'App muito bom, fácil de manusear...mas poderia melhorar...por exemplo abrir campo no cadastro do cliente para foto rosto.' }
        ]
      },
      screenshots: [
        '/images/projects/neopdv/1.webp',
        '/images/projects/neopdv/2.webp',
        '/images/projects/neopdv/3.webp',
        '/images/projects/neopdv/4.webp'
      ]
    }
]

export const useProjects = () => {
  const { t, locale } = useI18n()

  // Shared across Home + Projetos so the drawer always sees the same store data
  const projectsData = useState('portfolio-projects', () => [])

  const translateOptional = (path) => {
    const value = t(path)
    return value === path ? null : value
  }

  const buildProjects = () =>
    baseProjects.map((project) => {
      const dataPath = `home.projectsData.${project.key}`
      const store = project.store || {}
      const chartCategoryKey = store.chartCategoryKey
      const platformKey = store.platformKey
      const screenshots = (project.screenshots || []).slice(0, 4)

      return {
        ...project,
        screenshots,
        name: t(`${dataPath}.name`),
        subtitle:
          translateOptional(`${dataPath}.subtitle`) ||
          t(`${dataPath}.shortDescription`),
        shortDescription: t(`${dataPath}.shortDescription`),
        longDescription: t(`${dataPath}.longDescription`),
        store: {
          ...store,
          chartCategory: chartCategoryKey
            ? t(`projects.store.categories.${chartCategoryKey}`)
            : null,
          platform: platformKey
            ? t(`projects.store.platforms.${platformKey}`)
            : null,
          note: store.noteKey
            ? translateOptional(`projects.store.notes.${store.noteKey}`)
            : null
        }
      }
    })

  const syncProjects = () => {
    projectsData.value = buildProjects()
  }

  watch(locale, syncProjects, { immediate: true })

  const projects = computed(() => projectsData.value)
  const featuredProjects = computed(() => projects.value.slice(0, 9))

  const getProjectById = (id) =>
    projects.value.find((project) => project.id === id) || null

  const getProjectByKey = (key) =>
    projects.value.find((project) => project.key === key) || null

  return {
    projects,
    featuredProjects,
    baseProjects,
    getProjectById,
    getProjectByKey,
    syncProjects
  }
}
