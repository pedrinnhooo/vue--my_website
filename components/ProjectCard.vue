<template>
  <article
    class="pcard"
    :style="{ '--cover': project.coverColor || '#1a1028' }"
    @click="$emit('open', project)"
  >
    <div
      class="pcard-media"
      :class="{ 'pcard-media--contain': project.thumbnailContain }"
    >
      <img :src="project.thumbnail" :alt="project.name" loading="lazy" />

      <div class="pcard-actions" @click.stop>
        <a
          v-if="project.appleLink"
          :href="project.appleLink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="App Store"
        >
          <i class="bi bi-apple"></i>
        </a>
        <a
          v-if="project.googleLink"
          :href="project.googleLink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
        >
          <i class="bi bi-google-play"></i>
        </a>
        <a
          v-if="project.websiteLink"
          :href="project.websiteLink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
        >
          <i class="bi bi-globe2"></i>
        </a>
      </div>
    </div>

    <div class="pcard-body">
      <div class="pcard-meta">
        <span class="pcard-cat">{{ project.category }}</span>
        <span v-if="project.store?.rating" class="pcard-rating">
          <i class="bi bi-star-fill"></i>
          {{ project.store.rating }}
        </span>
      </div>

      <h3 class="pcard-title">{{ project.name }}</h3>
      <p class="pcard-desc">{{ project.shortDescription }}</p>

      <div class="pcard-footer">
        <div class="pcard-tech">
          <span
            v-for="tech in project.technologies.slice(0, techLimit)"
            :key="tech"
            class="pcard-chip"
          >
            {{ tech }}
          </span>
        </div>
        <span class="pcard-cta">
          {{ openLabel }}
          <i class="bi bi-arrow-up-right"></i>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
  techLimit: { type: Number, default: 4 },
  openLabel: { type: String, default: 'View' }
})

defineEmits(['open'])
</script>

<style scoped>
.pcard {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--glass-border, rgba(192, 132, 252, 0.18));
  background: var(--glass-bg, rgba(14, 8, 24, 0.72));
  backdrop-filter: var(--glass-blur, blur(18px));
  -webkit-backdrop-filter: var(--glass-blur, blur(18px));
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.pcard:hover {
  transform: translateY(-6px);
  border-color: rgba(192, 132, 252, 0.42);
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(103, 232, 249, 0.08);
}

.pcard-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.08), transparent 45%),
    var(--cover);
}

.pcard-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.pcard-media--contain img {
  object-fit: contain;
  padding: 18% 16%;
}

.pcard:hover .pcard-media img {
  transform: scale(1.05);
}

.pcard-actions {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.pcard:hover .pcard-actions {
  opacity: 1;
  transform: translateY(0);
}

.pcard-actions a {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 6, 18, 0.72);
  color: #fff;
  text-decoration: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background 0.2s ease, transform 0.2s ease;
}

.pcard-actions a:hover {
  background: rgba(168, 85, 247, 0.45);
  transform: scale(1.06);
}

.pcard-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 18px 16px;
  flex: 1;
}

.pcard-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pcard-cat {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--neon-cyan);
}

.pcard-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #fbbf24;
}

.pcard-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--apple-text-primary);
}

.pcard-desc {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pcard-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 6px;
}

.pcard-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}

.pcard-chip {
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid rgba(168, 85, 247, 0.28);
  background: rgba(168, 85, 247, 0.1);
  color: #d8b4fe;
  font-size: 0.68rem;
  font-family: var(--font-mono);
}

.pcard-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--apple-text-tertiary);
  transition: color 0.25s ease;
}

.pcard:hover .pcard-cta {
  color: var(--neon-cyan);
}

@media (max-width: 720px) {
  .pcard-actions {
    opacity: 1;
    transform: none;
  }
}
</style>
