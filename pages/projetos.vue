<template>
  <div class="apple-projects">
    <section class="projects-hero page-hero">
      <div class="container-apple">
        <div class="hero-row scroll-animate">
          <div class="hero-copy">
            <p class="kicker">Work</p>
            <h1 class="text-large-title gradient-text mb-lg">{{ t('projects.hero.title') }}</h1>
            <p class="hero-subtitle">
              {{ t('projects.hero.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section section-padding">
      <div class="container-apple">
        <div class="shelf-toolbar" role="tablist" :aria-label="t('projects.hero.title')">
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            role="tab"
            class="filter-badge"
            :class="{ 'filter-badge--active': activeSurface === filter.id }"
            :aria-selected="activeSurface === filter.id"
            @click="activeSurface = filter.id"
          >
            <i :class="filter.icon" aria-hidden="true"></i>
            {{ filter.label }}
            <span class="filter-count">{{ filter.count }}</span>
          </button>
        </div>

        <div v-if="visibleProjects.length" class="store-shelf">
          <ProjectStoreRow
            v-for="project in visibleProjects"
            :key="`project-${project.id}`"
            :project="project"
            :get-label="t('projects.modal.get')"
            :view-label="viewLabel"
            @open="openProjectModal"
          />
        </div>

        <p v-else class="shelf-empty">{{ t('projects.filters.empty') }}</p>
      </div>
    </section>

    <ProjectStoreDrawer
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useAnimations'

const { t, locale } = useI18n()
useScrollAnimation()

const selectedProject = ref(null)
const activeSurface = ref('all')
const { projects, getProjectById } = useProjects()

const viewLabel = computed(() => (locale.value === 'pt' ? 'Ver' : 'View'))

const countSurface = (surface) =>
  projects.value.filter((project) => project.surface === surface).length

const filters = computed(() => [
  { id: 'all', label: t('projects.filters.all'), icon: 'bi bi-grid', count: projects.value.length },
  { id: 'mobile', label: t('projects.filters.mobile'), icon: 'bi bi-phone', count: countSurface('mobile') },
  { id: 'web', label: t('projects.filters.web'), icon: 'bi bi-globe2', count: countSurface('web') },
  { id: 'system', label: t('projects.filters.system'), icon: 'bi bi-hdd-stack', count: countSurface('system') }
])

const visibleProjects = computed(() => {
  if (activeSurface.value === 'all') return projects.value
  return projects.value.filter((project) => project.surface === activeSurface.value)
})

const openProjectModal = (project) => {
  selectedProject.value = getProjectById(project.id) || project
}

const closeProjectModal = () => {
  selectedProject.value = null
}
</script>

<style scoped>
.apple-projects {
  background: transparent;
}

.projects-hero {
  position: relative;
  padding-bottom: 12px;
}

.hero-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.hero-copy {
  max-width: 720px;
}

.hero-subtitle {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 560px;
}

.projects-section {
  background: transparent;
  padding-top: 12px;
}

.shelf-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 48px;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--apple-text-secondary);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.filter-badge i {
  font-size: 0.9rem;
}

.filter-count {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--apple-text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
}

.filter-badge:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

.filter-badge--active,
.filter-badge--active:hover,
.filter-badge--active:focus,
.filter-badge--active:focus-visible,
.filter-badge--active:active {
  background: #fff;
  border-color: #fff;
  color: #111;
}

.filter-badge--active .filter-count {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.store-shelf {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 36px;
}

.shelf-empty {
  margin: 28px 0 0;
  color: var(--apple-text-tertiary);
  font-size: 0.95rem;
}

@media (max-width: 1100px) {
  .store-shelf {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 28px;
  }
}

@media (max-width: 768px) {
  .projects-hero.page-hero {
    padding-top: calc(var(--page-top-mobile) + 18px);
  }

  .hero-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .projects-hero .kicker {
    justify-content: center;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .shelf-toolbar {
    justify-content: center;
  }

  .store-shelf {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
}
</style>
