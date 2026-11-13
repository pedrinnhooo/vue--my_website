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
      technologies: ['Flutter', 'Firebase', 'Clean Architecture', 'GitLab'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/bnb-cart%C3%B5es/id6701303533',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.bnbcartoes&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR · lookup id6701303533
        rating: 3.6,
        ratingCount: '14',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Banco do Nordeste',
        languages: 'EN',
        size: '101,3 MB',
        platformKey: 'iphone'
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
      technologies: ['Flutter', '.NET', 'Firebase', 'Docker', 'Nuxt.js'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/banpar%C3%A1-cart%C3%A3o/id6737286836',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.banparacartoes&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR · lookup id6737286836
        rating: 3.7,
        ratingCount: '84',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Banpará',
        languages: 'EN',
        size: '89,2 MB',
        platformKey: 'iphone'
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
      technologies: ['Flutter', 'Vue.js', 'Clean Architecture', 'BigQuery'],
      category: 'Fintech',
      // Listing antigo removido das lojas; app white-label CSU (histórico)
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: true,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'CSU',
        languages: 'PT',
        size: null,
        platformKey: 'iphone'
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
      technologies: ['Flutter', '.NET', 'Docker', 'UI/UX'],
      category: 'Loyalty',
      appleLink: null,
      googleLink: null,
      websiteLink: 'https://clube.heineken.com.br',
      featured: false,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '18+',
        chartRank: null,
        chartCategoryKey: 'lifestyle',
        developer: 'Heineken',
        languages: 'PT',
        size: null,
        platformKey: 'web'
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
      technologies: ['Flutter Web', 'Firebase', 'Docker', 'XLSX'],
      category: 'Backoffice',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'productivity',
        developer: 'Prudential',
        languages: 'PT + EN',
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
      technologies: ['Flutter', 'Firebase', 'Vue.js', 'UI/UX', 'JWT'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/afinz/id1416167782',
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.sorocred.sorocredapp&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR · lookup id1416167782
        rating: 3.2,
        ratingCount: '8,2 mil',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'Afinz',
        languages: 'EN',
        size: '109 MB',
        platformKey: 'iphone'
      },
      screenshots: [
        '/images/projects/afinz/1.webp',
        '/images/projects/afinz/2.webp',
        '/images/projects/afinz/3.webp',
        '/images/projects/afinz/4.webp'
      ]
    },
    {
      id: 7,
      key: 'h2club',
      thumbnail: '/images/projects/h2club/thumb.png',
      icon: '/images/projects/h2club/icon.webp',
      cover: null,
      coverColor: '#3B0764',
      technologies: ['Flutter', 'BigQuery', 'JWT', 'Docker', 'PHP'],
      category: 'IGaming',
      appleLink: 'https://apps.apple.com/br/app/h2-club/id6466628886',
      googleLink: 'https://play.google.com/store/apps/details?id=com.h2.app&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        // App Store BR · lookup id6466628886 · chart Sports #79
        rating: 3.0,
        ratingCount: '20',
        ageRating: '17+',
        chartRank: 79,
        chartCategoryKey: 'sports',
        developer: 'H2 Grupo',
        languages: 'PT',
        size: '65,8 MB',
        platformKey: 'iphone'
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
      technologies: ['Flutter', 'Docker', 'Google Pay', 'Apple Pay', 'Firebase'],
      category: 'Fintech',
      // App white-label / listing público indisponível
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: true,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'finance',
        developer: 'CSU · Blue C',
        languages: 'PT',
        size: null,
        platformKey: 'android'
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
      technologies: ['Flutter', 'Vue.js', 'Node.js', 'TypeScript', 'UI/UX'],
      category: 'Insurance',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'lifestyle',
        developer: 'Pitzi',
        languages: 'PT',
        size: null,
        platformKey: 'iphone'
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
      technologies: ['Flutter', 'Vue.js', 'Node.js', 'HTML/CSS', 'UI/UX'],
      category: 'PDV',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        rating: null,
        ratingCount: null,
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'business',
        developer: 'NeoPDV',
        languages: 'PT',
        size: null,
        platformKey: 'iphone'
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
            : null
        }
      }
    })

  const syncProjects = () => {
    projectsData.value = buildProjects()
  }

  watch(locale, syncProjects, { immediate: true })

  const projects = computed(() => projectsData.value)
  const featuredProjects = computed(() =>
    projects.value.filter((p) => p.featured).slice(0, 6)
  )

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
