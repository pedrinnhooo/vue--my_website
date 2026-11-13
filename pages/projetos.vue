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
          <div class="hero-stat" aria-hidden="true">
            <strong>{{ projects.length }}</strong>
            <span>apps & products</span>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section section-padding">
      <div class="container-apple">
        <div class="projects-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="`project-${project.id}`"
            class="scroll-animate"
            :style="{ animationDelay: `${index * 0.06}s` }"
            :project="project"
            :open-label="viewLabel"
            @open="openProjectModal"
          />
        </div>
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
const { projects } = useProjects()

const viewLabel = computed(() => (locale.value === 'pt' ? 'Ver' : 'View'))

const openProjectModal = (project) => {
  selectedProject.value = project
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

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  min-width: 120px;
}

.hero-stat strong {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat span {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--apple-text-tertiary);
}

.projects-section {
  background: transparent;
  padding-top: 28px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .hero-stat {
    align-items: center;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
