<template>
  <button
    type="button"
    class="shelf-item"
    @click="$emit('open', project)"
  >
    <span class="shelf-icon" :style="{ background: project.coverColor || '#1a1028' }">
      <img
        :src="project.icon || project.thumbnail"
        :alt="project.name"
        :class="{ 'shelf-icon-img--contain': project.thumbnailContain }"
        loading="lazy"
      >
    </span>

    <span class="shelf-copy">
      <span class="shelf-title">
        <span class="shelf-name">{{ project.name }}</span>
        <span v-if="ratingLabel" class="shelf-rate">
          <i class="bi bi-star-fill" aria-hidden="true"></i>
          {{ ratingLabel }}
        </span>
        <span v-if="installsLabel" class="shelf-installs">
          <i class="bi bi-download" aria-hidden="true"></i>
          {{ installsLabel }}
        </span>
      </span>
      <span class="shelf-desc">{{ project.shortDescription }}</span>
    </span>

    <span class="shelf-action">
      <span class="shelf-get">{{ actionLabel }}</span>
      <span class="shelf-hint">{{ project.category }}</span>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  getLabel: { type: String, default: 'Obter' },
  viewLabel: { type: String, default: 'Ver' }
})

defineEmits(['open'])

const actionLabel = computed(() => {
  const project = props.project
  const hasLink = project.appleLink || project.googleLink || project.websiteLink
  return hasLink ? props.getLabel : props.viewLabel
})

const ratingLabel = computed(() => {
  const rating = Number(props.project?.store?.rating)
  if (!rating) return ''
  return rating.toFixed(1).replace('.', ',')
})

const installsLabel = computed(() => props.project?.store?.installs || '')
</script>

<style scoped>
.shelf-item {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr) 84px;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 16px 4px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.shelf-item:hover {
  background: rgba(255, 255, 255, 0.035);
}

.shelf-icon {
  width: 62px;
  height: 62px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 8px 18px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}

.shelf-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.shelf-icon-img--contain {
  object-fit: contain;
  padding: 8px;
}

.shelf-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.shelf-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.shelf-name {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--apple-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shelf-rate {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  color: #fbbf24;
  font-size: 0.72rem;
  font-weight: 600;
}

.shelf-installs {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  color: var(--apple-text-tertiary);
  font-size: 0.68rem;
  font-weight: 500;
}

.shelf-installs i {
  font-size: 0.6rem;
  opacity: 0.75;
}

.shelf-desc {
  color: var(--apple-text-secondary);
  font-size: 0.78rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shelf-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.shelf-get {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 28px;
  padding: 0 14px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.shelf-item:hover .shelf-get {
  filter: brightness(0.96);
  transform: scale(1.04);
}

.shelf-hint {
  max-width: 84px;
  color: var(--apple-text-tertiary);
  font-size: 0.62rem;
  line-height: 1.2;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .shelf-item {
    grid-template-columns: 54px minmax(0, 1fr) 76px;
    gap: 12px;
    padding: 14px 0;
  }

  .shelf-icon {
    width: 54px;
    height: 54px;
    border-radius: 12px;
  }
}
</style>
