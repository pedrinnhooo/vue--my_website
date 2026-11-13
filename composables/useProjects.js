import { computed, ref, watch } from 'vue'

/**
 * Escala adicionando um item em `baseProjects` + traduções em
 * `home.projectsData.<key>` (name, shortDescription, longDescription, subtitle?).
 *
 * Imagens: public/images/projects/<key>/icon.* + 1..4 previews.
 * Prudential (backoffice) fica sem screenshots de propósito.
 */
export const useProjects = () => {
  const { t, locale } = useI18n()

  const baseProjects = [
    {
      id: 1,
      key: 'bnb',
      thumbnail: '/images/bnb-thumb.jpg',
      icon: '/images/projects/bnb/icon.webp',
      cover: null,
      coverColor: '#C8102E',
      technologies: ['Flutter', 'Firebase', 'Clean Architecture', 'GitLab'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/bnb-cartões/id6701303533',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.bnb&hl=pt',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.7,
        ratingCount: '1.2K',
        ageRating: '4+',
        chartRank: 42,
        chartCategoryKey: 'finance',
        developer: 'CSU',
        languages: 'PT + 2',
        size: '78 MB',
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
      thumbnail: '/images/banpara-thumb.jpg',
      icon: '/images/projects/banpara/icon.webp',
      cover: null,
      coverColor: '#0B3D91',
      technologies: ['Flutter', '.NET', 'Firebase', 'Docker', 'Nuxt.js'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/banpar%C3%A1-cart%C3%A3o/id6737286836',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.banpara&hl=pt',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.6,
        ratingCount: '890',
        ageRating: '4+',
        chartRank: 68,
        chartCategoryKey: 'finance',
        developer: 'CSU',
        languages: 'PT',
        size: '82 MB',
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
      appleLink: 'https://apps.apple.com/br/app/losango/id1456294810?l=en-GB',
      googleLink: 'https://play.google.com/store/apps/details?id=com.csu.losango&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.5,
        ratingCount: '3.4K',
        ageRating: '4+',
        chartRank: 55,
        chartCategoryKey: 'finance',
        developer: 'CSU',
        languages: 'PT + 1',
        size: '95 MB',
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
      thumbnail: '/images/heineken-thumb.jpg',
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
        rating: 4.5,
        ratingCount: '120',
        ageRating: '18+',
        chartRank: null,
        chartCategoryKey: 'lifestyle',
        developer: 'Heineken',
        languages: 'PT',
        size: '71 MB',
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
      thumbnail: '/images/prudential-thumb.jpeg',
      icon: '/images/prudential-thumb.jpeg',
      cover: null,
      coverColor: '#1D4ED8',
      technologies: ['Flutter Web', 'Firebase', 'Docker', 'XLSX'],
      category: 'Backoffice',
      appleLink: null,
      googleLink: null,
      websiteLink: null,
      featured: false,
      store: {
        rating: 4.9,
        ratingCount: '—',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'productivity',
        developer: 'Prudential',
        languages: 'PT + EN',
        size: '—',
        platformKey: 'web'
      },
      screenshots: []
    },
    {
      id: 6,
      key: 'afinz',
      thumbnail: '/images/afinz-thumb.png',
      icon: '/images/projects/afinz/icon.webp',
      cover: null,
      coverColor: '#7C3AED',
      technologies: ['Flutter', 'Firebase', 'Vue.js', 'UI/UX', 'JWT'],
      category: 'Fintech',
      appleLink: 'https://apps.apple.com/br/app/afinz/id1416167782',
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.sorocred.sorocredapp&hl=en_US',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.6,
        ratingCount: '5.8K',
        ageRating: '4+',
        chartRank: 37,
        chartCategoryKey: 'finance',
        developer: 'Afinz',
        languages: 'PT + 1',
        size: '88 MB',
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
      thumbnail: '/images/h2club-thumb.png',
      icon: '/images/projects/h2club/icon.webp',
      cover: null,
      coverColor: '#3B0764',
      technologies: ['Flutter', 'BigQuery', 'JWT', 'Docker', 'PHP'],
      category: 'IGaming',
      appleLink: 'https://apps.apple.com/br/app/h2-club/id6466628886',
      googleLink: 'https://play.google.com/store/apps/details?id=com.h2.app&hl=pt_BR&pli=1',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.8,
        ratingCount: '2.1K',
        ageRating: '18+',
        chartRank: 12,
        chartCategoryKey: 'lifestyle',
        developer: 'Groupe H2',
        languages: 'PT + 3',
        size: '112 MB',
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
      thumbnail: '/images/bluec-thumb.avif',
      icon: '/images/projects/bluec/icon.webp',
      cover: null,
      coverColor: '#2563EB',
      technologies: ['Flutter', 'Docker', 'Google Pay', 'Apple Pay', 'Firebase'],
      category: 'Fintech',
      appleLink: null,
      googleLink: 'https://play.google.com/store/apps/details?id=br.com.csu.baas&hl=pt_BR',
      websiteLink: null,
      featured: true,
      store: {
        rating: 4.4,
        ratingCount: '640',
        ageRating: '4+',
        chartRank: 91,
        chartCategoryKey: 'finance',
        developer: 'CSU',
        languages: 'PT',
        size: '64 MB',
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
      thumbnail: '/images/komus-thumb.jpeg',
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
        rating: 4.3,
        ratingCount: '210',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'lifestyle',
        developer: 'Pitzi',
        languages: 'PT',
        size: '54 MB',
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
      thumbnail: '/images/neopdv-thumb.jpg',
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
        rating: 4.7,
        ratingCount: '340',
        ageRating: '4+',
        chartRank: null,
        chartCategoryKey: 'business',
        developer: 'NeoPDV',
        languages: 'PT',
        size: '61 MB',
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

  const projectsData = ref([])

  const translateOptional = (path) => {
    const value = t(path)
    return value === path ? null : value
  }

  const updateProjects = () => {
    projectsData.value = baseProjects.map((project) => {
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
  }

  watch(locale, updateProjects, { immediate: true })

  const projects = computed(() => projectsData.value)
  const featuredProjects = computed(() =>
    projects.value.filter((p) => p.featured).slice(0, 6)
  )

  return {
    projects,
    featuredProjects,
    baseProjects
  }
}
