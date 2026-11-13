<template>
  <Teleport to="body">
    <transition name="store-drawer">
      <div
        v-if="project"
        class="store-drawer-overlay"
        @click="emit('close')"
      >
        <aside
          class="store-drawer"
          role="dialog"
          aria-modal="true"
          :aria-label="project.name"
          @click.stop
        >
          <div class="store-drawer-scroll">
            <!-- Capa + header estilo App Store -->
            <section class="store-cover" :style="coverStyle">
              <header class="store-drawer-topbar store-drawer-topbar--overlay">
                <button
                  type="button"
                  class="store-icon-btn"
                  :aria-label="t('projects.modal.close')"
                  @click="emit('close')"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>

                <div class="store-topbar-actions">
                  <a
                    v-if="shareUrl"
                    :href="shareUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="store-icon-btn"
                    :aria-label="t('projects.modal.share')"
                  >
                    <i class="bi bi-box-arrow-up"></i>
                  </a>
                  <button
                    type="button"
                    class="store-icon-btn"
                    :aria-label="t('projects.modal.close')"
                    @click="emit('close')"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </header>

              <div class="store-header">
                <img
                  :src="project.icon || project.thumbnail"
                  :alt="project.name"
                  class="store-app-icon"
                >

                <div class="store-header-meta">
                  <h2 class="store-app-title">{{ project.name }}</h2>
                  <p class="store-app-subtitle">{{ project.subtitle }}</p>
                  <p class="store-app-developer">
                    {{ project.store?.developer }}
                    <span v-if="project.store?.platform"> · {{ project.store.platform }}</span>
                  </p>

                  <div class="store-get-row">
                    <a
                      v-if="primaryStoreLink"
                      :href="primaryStoreLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="store-get-btn"
                    >
                      {{ t('projects.modal.get') }}
                    </a>
                    <span v-else class="store-get-btn store-get-btn--muted">
                      {{ t('projects.modal.private') }}
                    </span>

                    <div class="store-platform-links">
                      <a
                        v-if="project.appleLink"
                        :href="project.appleLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="store-mini-link"
                        :title="t('projects.modal.appStore')"
                      >
                        <i class="bi bi-apple"></i>
                      </a>
                      <a
                        v-if="project.googleLink"
                        :href="project.googleLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="store-mini-link"
                        :title="t('projects.modal.googlePlay')"
                      >
                        <i class="bi bi-google-play"></i>
                      </a>
                      <a
                        v-if="project.websiteLink"
                        :href="project.websiteLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="store-mini-link"
                        :title="t('projects.modal.website')"
                      >
                        <i class="bi bi-globe2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Stats strip -->
            <section v-if="statItems.length" class="store-stats">
              <div
                v-for="(stat, index) in statItems"
                :key="stat.label"
                class="store-stat"
                :class="{ 'store-stat--border': index > 0 }"
              >
                <div class="store-stat-value">
                  <template v-if="stat.type === 'rating'">
                    <span>{{ formatRating(stat.value) }}</span>
                    <i class="bi bi-star-fill store-stat-star"></i>
                  </template>
                  <template v-else-if="stat.type === 'age'">
                    <span class="store-age-badge">{{ stat.value }}</span>
                  </template>
                  <template v-else>
                    {{ stat.value }}
                  </template>
                </div>
                <div class="store-stat-label">{{ stat.label }}</div>
                <div v-if="stat.hint" class="store-stat-hint">{{ stat.hint }}</div>
              </div>
            </section>

            <!-- Screenshots (máx. 4) -->
            <section v-if="screenshotsLimited.length" class="store-section">
              <div class="store-section-heading">
                <h3>{{ t('projects.modal.screenshotsTitle') }}</h3>
                <span class="store-section-count">{{ screenshotsLimited.length }}</span>
              </div>

              <div class="store-gallery">
                <button
                  v-for="(shot, index) in screenshotsLimited"
                  :key="`${shot}-${index}`"
                  type="button"
                  class="store-shot"
                  @click="openLightbox(shot)"
                >
                  <img :src="shot" :alt="`${project.name} — ${index + 1}`">
                </button>
              </div>
            </section>

            <!-- Ratings -->
            <section v-if="project.store?.rating" class="store-section">
              <div class="store-section-heading">
                <h3>{{ t('projects.modal.ratings') }}</h3>
              </div>

              <div class="store-ratings">
                <div class="store-ratings-score">
                  <span class="store-ratings-number">{{ formatRating(project.store.rating) }}</span>
                  <div class="store-ratings-stars" aria-hidden="true">
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="bi"
                      :class="starClass(n, project.store.rating)"
                    ></i>
                  </div>
                  <span class="store-ratings-count">
                    {{ project.store.ratingCount }} {{ t('projects.modal.ratingsCount') }}
                  </span>
                </div>

                <div class="store-ratings-bars">
                  <div
                    v-for="bar in ratingBars"
                    :key="bar.stars"
                    class="store-rating-bar"
                  >
                    <span>{{ bar.stars }}</span>
                    <div class="store-rating-track">
                      <div
                        class="store-rating-fill"
                        :style="{ width: `${bar.percent}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Description -->
            <section class="store-section">
              <div class="store-section-heading">
                <h3>{{ t('projects.modal.about') }}</h3>
                <span class="store-category-pill">{{ project.category }}</span>
              </div>
              <p class="store-description">{{ project.longDescription }}</p>
            </section>

            <!-- Technologies -->
            <section class="store-section store-section--last">
              <div class="store-section-heading">
                <h3>{{ t('projects.modal.techTitle') }}</h3>
              </div>
              <div class="store-tech">
                <span
                  v-for="tech in techList"
                  :key="tech"
                  class="store-tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </transition>

    <transition name="lightbox">
      <div
        v-if="lightboxSrc"
        class="store-lightbox"
        @click="lightboxSrc = null"
      >
        <button
          type="button"
          class="store-lightbox-close"
          :aria-label="t('projects.modal.close')"
          @click="lightboxSrc = null"
        >
          <i class="bi bi-x-lg"></i>
        </button>
        <img :src="lightboxSrc" :alt="project?.name" @click.stop>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])
const { t } = useI18n()

const lightboxSrc = ref(null)

const screenshots = computed(() => {
  if (!props.project?.screenshots?.length) return []
  return props.project.screenshots.map((shot) =>
    typeof shot === 'string' ? shot : shot.image
  )
})

const techList = computed(() => {
  const tech = props.project?.technologies
  if (!tech) return []
  return Array.isArray(tech) ? tech : String(tech).split(', ')
})

const primaryStoreLink = computed(() => {
  if (!props.project) return null
  return (
    props.project.appleLink ||
    props.project.googleLink ||
    props.project.websiteLink ||
    null
  )
})

const shareUrl = computed(() => primaryStoreLink.value)

const screenshotsLimited = computed(() => screenshots.value.slice(0, 4))

const statItems = computed(() => {
  const store = props.project?.store
  if (!store) return []

  const items = []

  if (store.rating != null) {
    items.push({
      type: 'rating',
      value: store.rating,
      label: t('projects.store.labels.ratings'),
      hint: store.ratingCount
    })
  }

  if (store.ageRating) {
    items.push({
      type: 'age',
      value: store.ageRating,
      label: t('projects.store.labels.age')
    })
  }

  if (store.chartRank) {
    items.push({
      type: 'chart',
      value: `Nº ${store.chartRank}`,
      label: store.chartCategory || t('projects.store.labels.charts')
    })
  }

  if (store.developer) {
    items.push({
      type: 'developer',
      value: store.developer,
      label: t('projects.store.labels.developer')
    })
  }

  if (store.languages) {
    items.push({
      type: 'language',
      value: store.languages,
      label: t('projects.store.labels.language')
    })
  }

  if (store.size) {
    items.push({
      type: 'size',
      value: store.size,
      label: t('projects.store.labels.size')
    })
  }

  return items.slice(0, 6)
})

const coverStyle = computed(() => {
  const cover = props.project?.cover
  const color = props.project?.coverColor || '#6d28d9'

  if (cover) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(8,5,14,0.92) 100%), url(${cover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }

  return {
    background: `linear-gradient(135deg, ${color} 0%, ${color}cc 42%, #0a0612 100%)`
  }
})

/** Barras de distribuição visual (estilo App Store), derivadas da nota */
const ratingBars = computed(() => {
  const rating = Number(props.project?.store?.rating) || 0
  const weights = [5, 4, 3, 2, 1].map((stars) => {
    const distance = Math.abs(stars - Math.round(rating))
    const weight = Math.max(0.08, 1 - distance * 0.28)
    return { stars, weight }
  })
  const total = weights.reduce((sum, item) => sum + item.weight, 0)
  return weights.map((item) => ({
    stars: item.stars,
    percent: Math.round((item.weight / total) * 100)
  }))
})

const formatRating = (value) => {
  const num = Number(value)
  if (Number.isNaN(num)) return value
  return num.toFixed(1).replace('.', ',')
}

const starClass = (index, rating) => {
  const value = Number(rating) || 0
  if (index <= Math.floor(value)) return 'bi-star-fill'
  if (index - 0.5 <= value) return 'bi-star-half'
  return 'bi-star'
}

const openLightbox = (src) => {
  lightboxSrc.value = src
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    if (lightboxSrc.value) {
      lightboxSrc.value = null
      return
    }
    emit('close')
  }
}

watch(
  () => props.project,
  (value) => {
    lightboxSrc.value = null
    if (value) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.store-drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  background:
    radial-gradient(circle at 80% 10%, rgba(168, 85, 247, 0.12), transparent 40%),
    rgba(3, 1, 8, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.store-drawer {
  width: min(1120px, 94vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(180deg, rgba(18, 12, 28, 0.98) 0%, rgba(8, 5, 14, 0.99) 100%);
  border-left: 1px solid rgba(192, 132, 252, 0.18);
  box-shadow: -24px 0 80px rgba(0, 0, 0, 0.55);
  color: var(--apple-text-primary);
}

.store-drawer-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  flex-shrink: 0;
}

.store-drawer-topbar--overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  border-bottom: none;
}

.store-cover {
  position: relative;
  padding-top: 56px;
  margin: 0;
  overflow: hidden;
}

.store-topbar-actions {
  display: flex;
  gap: 8px;
}

.store-icon-btn {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.store-icon-btn:hover {
  background: rgba(192, 132, 252, 0.22);
  transform: scale(1.04);
}

.store-drawer-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 40px;
  scrollbar-width: thin;
  scrollbar-color: rgba(192, 132, 252, 0.3) transparent;
}

.store-header {
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 24px;
  padding: 28px 36px 28px;
  align-items: center;
}

.store-app-icon {
  width: 148px;
  height: 148px;
  border-radius: 32px;
  object-fit: cover;
  box-shadow:
    0 18px 44px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.12);
}

.store-app-title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.4vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #fff;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
}

.store-app-subtitle {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.store-app-developer {
  margin: 0 0 16px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.88rem;
}

.store-get-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.store-get-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 34px;
  padding: 0 18px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform var(--transition-fast), filter var(--transition-fast);
}

.store-get-btn:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.store-get-btn--muted {
  background: rgba(255, 255, 255, 0.12);
  color: var(--apple-text-secondary);
  cursor: default;
}

.store-platform-links {
  display: flex;
  gap: 8px;
}

.store-mini-link {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  text-decoration: none;
  transition: background var(--transition-fast);
}

.store-mini-link:hover {
  background: rgba(192, 132, 252, 0.25);
}

.store-stats {
  display: flex;
  gap: 0;
  margin: 8px 28px 8px;
  padding: 18px 8px;
  overflow-x: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  scrollbar-width: none;
}

.store-stats::-webkit-scrollbar {
  display: none;
}

.store-stat {
  flex: 1 0 auto;
  min-width: 88px;
  padding: 0 14px;
  text-align: center;
}

.store-stat--border {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.store-stat-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 28px;
  color: var(--apple-text-primary);
  font-size: 0.95rem;
  font-weight: 700;
}

.store-stat-star {
  font-size: 0.7rem;
  color: var(--apple-text-secondary);
}

.store-age-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  font-size: 0.78rem;
  font-weight: 700;
}

.store-stat-label,
.store-stat-hint {
  color: var(--apple-text-tertiary);
  font-size: 0.68rem;
  line-height: 1.2;
  margin-top: 2px;
}

.store-section {
  padding: 22px 36px 0;
}

.store-section--last {
  padding-bottom: 8px;
}

.store-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.store-section-heading h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.store-section-count {
  color: var(--apple-text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.store-category-pill {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.28);
  color: var(--neon-cyan);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.store-gallery {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 2px 10px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(192, 132, 252, 0.3) transparent;
}

.store-shot {
  flex: 0 0 auto;
  width: 190px;
  height: 412px;
  padding: 0;
  border: none;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  cursor: zoom-in;
  scroll-snap-align: start;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.store-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.store-shot:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.store-ratings {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 18px;
  align-items: center;
}

.store-ratings-score {
  text-align: center;
}

.store-ratings-number {
  display: block;
  font-size: 3.4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.store-ratings-stars {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin: 8px 0 6px;
  color: var(--apple-text-secondary);
  font-size: 0.78rem;
}

.store-ratings-count {
  color: var(--apple-text-tertiary);
  font-size: 0.72rem;
}

.store-ratings-bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.store-rating-bar {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 8px;
  align-items: center;
  color: var(--apple-text-tertiary);
  font-size: 0.7rem;
}

.store-rating-track {
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.store-rating-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--apple-text-secondary);
}

.store-description {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

.store-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.store-tech-tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--apple-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.store-lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(12px);
}

.store-lightbox img {
  max-width: min(420px, 100%);
  max-height: 90vh;
  border-radius: 20px;
  object-fit: contain;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.store-lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
}

.store-drawer-enter-active,
.store-drawer-leave-active {
  transition: opacity 0.28s ease;
}

.store-drawer-enter-active .store-drawer,
.store-drawer-leave-active .store-drawer {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.store-drawer-enter-from,
.store-drawer-leave-to {
  opacity: 0;
}

.store-drawer-enter-from .store-drawer,
.store-drawer-leave-to .store-drawer {
  transform: translateX(100%);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .store-drawer {
    width: min(100%, 94vw);
  }

  .store-shot {
    width: 168px;
    height: 364px;
  }
}

@media (max-width: 640px) {
  .store-drawer {
    width: 100%;
  }

  .store-header {
    grid-template-columns: 88px 1fr;
    gap: 14px;
    padding: 18px 18px 22px;
  }

  .store-app-icon {
    width: 88px;
    height: 88px;
    border-radius: 20px;
  }

  .store-app-title {
    font-size: 1.2rem;
  }

  .store-stats {
    margin-inline: 12px;
  }

  .store-section {
    padding-left: 18px;
    padding-right: 18px;
  }

  .store-shot {
    width: 148px;
    height: 320px;
  }

  .store-ratings {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .store-ratings-number {
    font-size: 2.8rem;
  }
}
</style>
