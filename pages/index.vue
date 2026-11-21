<template>
  <div class="apple-home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-veil" aria-hidden="true"></div>

      <div class="container-apple hero-shell">
        <div class="hero-copy scroll-animate">
          <p class="hero-kicker">Flutter · Nuxt · UI/UX</p>

          <h1 class="hero-title">
            <span class="hero-title-sizer" aria-hidden="true">{{ typewriterText }}|</span>
            <span class="hero-title-live">
              <span class="hero-title-line">{{ displayText }}</span>
              <span class="hero-caret" :class="{ blink: !isTypewriterComplete }">|</span>
            </span>
          </h1>

          <p class="hero-lead">
            {{ t('home.hero.subtitle') }}
          </p>

          <div class="hero-actions">
            <NuxtLink to="/projetos" class="home-btn home-btn--solid">
              {{ t('home.hero.buttons.viewProjects') }}
            </NuxtLink>
            <NuxtLink to="/contato" class="home-btn home-btn--ghost">
              {{ t('home.hero.buttons.talkToMe') }}
            </NuxtLink>
          </div>

          <div class="hero-metrics">
            <div v-for="stat in stats" :key="stat.key" class="hero-metric">
              <strong>{{ stat.displayValue.value }}+</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <aside class="hero-aside scroll-animate">
          <div class="portrait">
            <img :src="mePhoto" alt="Pedro Ruffo" />
          </div>
          <div class="portrait-meta">
            <span class="status-dot"></span>
            <span>São Paulo · available</span>
          </div>
        </aside>
      </div>
    </section>

    <!-- PROJECTS -->
    <section class="band projects-band">
      <div class="container-apple">
        <header class="band-head scroll-animate">
          <div>
            <p class="hero-kicker">Portfolio</p>
            <h2 class="band-title">{{ t('home.projects.title') }}</h2>
            <p class="band-sub">{{ t('home.projects.subtitle') }}</p>
          </div>
          <NuxtLink to="/projetos" class="band-link">
            {{ t('home.projects.viewAll') }}
            <i class="bi bi-arrow-up-right"></i>
          </NuxtLink>
        </header>

        <div class="store-shelf">
          <ProjectStoreRow
            v-for="project in featuredProjects"
            :key="`featured-${project.id}`"
            :project="project"
            :get-label="t('projects.modal.get')"
            :view-label="projectViewLabel"
            @open="openProjectModal"
          />
        </div>
      </div>
    </section>

    <!-- PUB.DEV PACKAGE -->
    <section class="band still-band">
      <div class="container-apple">
        <header class="band-head scroll-animate">
          <div>
            <p class="hero-kicker">{{ t('home.package.kicker') }}</p>
            <h2 class="band-title">{{ t('home.package.title') }}</h2>
            <p class="band-sub">{{ t('home.package.subtitle') }}</p>
          </div>
        </header>

        <article class="still-card scroll-animate">
          <div class="still-title-row">
            <h3 class="band-title still-name">still</h3>
            <span class="still-version">0.1.5</span>
          </div>

          <div class="still-copy">
            <p class="still-tagline">{{ t('home.package.tagline') }}</p>
            <div class="still-prose">
              <p v-for="(para, i) in packageParagraphs" :key="i" class="band-sub">{{ para }}</p>
            </div>

            <div class="still-topics">
              <span v-for="topic in packageTopics" :key="topic" class="still-topic">{{ topic }}</span>
            </div>

            <div class="still-kit">
              <p class="still-kit-label">{{ t('home.package.kit.label') }}</p>
              <div class="still-kit-widgets">
                <code v-for="widget in packageWidgets" :key="widget">{{ widget }}</code>
              </div>
              <div class="still-kit-modes" aria-label="Motion modes">
                <span class="still-kit-modes-lead">{{ t('home.package.kit.modesLead') }}</span>
                <span
                  v-for="(mode, index) in packageModes"
                  :key="mode"
                  class="still-kit-mode"
                >
                  <span v-if="index > 0" class="still-kit-mode-sep" aria-hidden="true">/</span>
                  {{ mode }}
                </span>
              </div>
              <p class="still-kit-note">{{ t('home.package.kit.note') }}</p>
            </div>

            <ul class="still-points">
              <li v-for="(point, index) in packagePoints" :key="point.title">
                <span class="still-point-idx">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <strong>{{ point.title }}</strong>
                  <span>{{ point.text }}</span>
                </div>
              </li>
            </ul>

            <div class="still-actions">
              <a
                href="https://pub.dev/packages/still"
                target="_blank"
                rel="noopener noreferrer"
                class="home-btn home-btn--solid"
              >
                {{ t('home.package.pubdev') }}
                <i class="bi bi-arrow-up-right"></i>
              </a>
              <a
                href="https://github.com/pedrinnhooo/still-pubdev"
                target="_blank"
                rel="noopener noreferrer"
                class="home-btn home-btn--ghost"
              >
                <i class="bi bi-github"></i>
                {{ t('home.package.github') }}
              </a>
            </div>
          </div>

          <aside class="still-panel" aria-label="still">
            <CopySnippet
              :label="t('home.package.guides.wrap.label')"
              :lead="t('home.package.guides.wrap.lead')"
              :note="t('home.package.guides.wrap.note')"
              :code="wrapSnippet"
              :copy-label="t('home.package.copy')"
              :copied-label="t('home.package.copied')"
            />
            <div class="still-snippets">
              <CopySnippet
                :label="t('home.package.pubspecLabel')"
                :code="pubspecSnippet"
                :copy-label="t('home.package.copy')"
                :copied-label="t('home.package.copied')"
              />
              <CopySnippet
                :label="t('home.package.cliLabel')"
                :code="cliSnippet"
                :copy-label="t('home.package.copy')"
                :copied-label="t('home.package.copied')"
              />
            </div>
            <p class="still-platforms">{{ t('home.package.platforms') }}</p>
            <div class="still-meta">
              <span>Flutter</span>
              <span>BSD-3</span>
              <span>SDK</span>
            </div>
          </aside>
        </article>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="band services-band">
      <div class="container-apple services-shell">
        <header class="band-head scroll-animate">
          <div>
            <p class="hero-kicker">Services</p>
            <h2 class="band-title">
              {{ t('home.services.title') }}
              <em>{{ t('home.services.titleHighlight') }}</em>{{ t('home.services.titleEnd') }}
            </h2>
            <p class="band-sub">{{ t('home.services.description') }}</p>
          </div>
        </header>

        <div class="services-grid">
          <article
            v-for="(service, index) in services"
            :key="service.key"
            class="service-tile scroll-animate"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="service-tile-top">
              <span class="service-idx">{{ String(index + 1).padStart(2, '0') }}</span>
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="band cta-band">
      <div class="container-apple">
        <div class="cta-shell scroll-animate">
          <div class="cta-block">
            <p class="cta-eyebrow">Next chapter</p>
            <h2 class="cta-title">
              {{ t('home.cta.title') }}
              <span>{{ t('home.cta.titleHighlight') }}</span>{{ t('home.cta.titleEnd') }}
            </h2>
            <p class="cta-sub">{{ t('home.cta.subtitle') }}</p>
            <div class="cta-row">
              <NuxtLink to="/contato" class="home-btn home-btn--solid cta-btn">
                {{ t('home.cta.button') }}
                <i class="bi bi-arrow-up-right"></i>
              </NuxtLink>
              <span class="cta-note">Usually replies within 24h</span>
            </div>
          </div>

          <div class="cta-visual">
            <CtaAvatar />
          </div>
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
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useScrollAnimation, useTypewriter, useCountUp } from '~/composables/useAnimations'
import mePhoto from '~/assets/img/me.png'

useScrollAnimation()

const { t, locale } = useI18n()

const typewriterText = computed(() => t('home.typewriter'))
const { displayText, isComplete: isTypewriterComplete, startTypewriter, cleanup } = useTypewriter(
  typewriterText,
  100
)

const statsData = [
  { key: 'yearsExperience', value: 7, displayValue: ref(0) },
  { key: 'projectsDone', value: 80, displayValue: ref(0) },
  { key: 'happyClients', value: 700, displayValue: ref(0) }
]

const stats = computed(() =>
  statsData.map((stat) => ({
    ...stat,
    label: t(`home.stats.${stat.key}`)
  }))
)

const servicesData = [
  { key: 'mobile', icon: 'bi bi-phone' },
  { key: 'web', icon: 'bi bi-laptop' },
  { key: 'architecture', icon: 'bi bi-diagram-3' },
  { key: 'backend', icon: 'bi bi-server' },
  { key: 'design', icon: 'bi bi-palette' },
  { key: 'devops', icon: 'bi bi-cloud-arrow-up' }
]

const services = computed(() =>
  servicesData.map((service) => ({
    ...service,
    title: t(`home.services.items.${service.key}.title`),
    description: t(`home.services.items.${service.key}.description`)
  }))
)

const packagePoints = computed(() => {
  const points = t('home.package.points')
  return Array.isArray(points) ? points : []
})

const packageTopics = computed(() => {
  const topics = t('home.package.topics')
  return Array.isArray(topics) ? topics : []
})

const packageWidgets = ['StillSwitcher', 'StillEntrance', 'StillStagger', 'StillPageRoute']
const packageModes = ['slide', 'fade', 'cut']

const packageParagraphs = computed(() =>
  String(t('home.package.description'))
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean)
)

const pubspecSnippet = 'dependencies:\n  still: ^0.1.5'
const cliSnippet = 'flutter pub add still'
const wrapSnippet = `void main() {
  runApp(
    const MotionScope(
      // optional — omit and the phone decides
      preference: MotionPreference.reduced,
      child: MaterialApp(
        home: HomePage(),
      ),
    ),
  );
}`

const { featuredProjects, getProjectById } = useProjects()
const selectedProject = ref(null)
const projectViewLabel = computed(() => (locale.value === 'pt' ? 'Ver' : 'View'))

const openProjectModal = (project) => {
  selectedProject.value = getProjectById(project.id) || project
}

const closeProjectModal = () => {
  selectedProject.value = null
}

watch(typewriterText, (newText) => {
  if (newText) {
    setTimeout(() => startTypewriter(), 100)
  }
}, { immediate: false })

onMounted(() => {
  setTimeout(() => startTypewriter(), 500)

  setTimeout(() => {
    statsData.forEach((stat, index) => {
      const { current, startCountUp } = useCountUp(stat.value, 2000)
      setTimeout(() => {
        startCountUp()
        const updateStat = () => {
          stat.displayValue.value = current.value
          if (current.value < stat.value) requestAnimationFrame(updateStat)
        }
        updateStat()
      }, index * 200)
    })
  }, 1000)
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
/* Home palette: refined mist + soft amethyst — complements About purple without neon scream */
.apple-home {
  --home-ink: #f4f1f8;
  --home-mute: rgba(232, 226, 240, 0.72);
  --home-soft: rgba(196, 181, 253, 0.88);
  --home-line: rgba(226, 220, 235, 0.14);
  --home-glass: rgba(18, 14, 28, 0.42);
  --home-glass-strong: rgba(16, 12, 26, 0.55);
  --home-accent: #b7a3e3;
  --home-accent-deep: #8b6fc0;
  background: transparent;
  color: var(--home-ink);
}

.hero {
  position: relative;
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  padding: 48px 0 72px;
  overflow: hidden;
}

.hero-veil {
  position: absolute;
  inset: auto 8% 8% auto;
  width: min(42vw, 520px);
  height: min(42vw, 520px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 111, 192, 0.18), transparent 68%);
  filter: blur(8px);
  pointer-events: none;
  animation: homeFloat 12s ease-in-out infinite;
}

.hero-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 56px;
  align-items: center;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--home-soft);
}

.hero-kicker::before {
  content: '';
  width: 18px;
  height: 1px;
  background: var(--home-accent);
  opacity: 0.85;
}

.hero-title {
  position: relative;
  margin: 0 0 22px;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.6vw, 3.8rem);
  font-weight: 650;
  letter-spacing: -0.045em;
  line-height: 1.08;
  color: var(--home-ink);
  max-width: 14ch;
}

.hero-title-sizer {
  display: block;
  visibility: hidden;
  pointer-events: none;
  white-space: pre-wrap;
}

.hero-title-live {
  position: absolute;
  inset: 0;
  display: block;
}

.hero-title-line {
  background: linear-gradient(120deg, #f7f4fb 0%, #e8dff7 45%, #c9b8ea 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-caret {
  margin-left: 2px;
  color: var(--home-accent);
  font-weight: 400;
  -webkit-text-fill-color: var(--home-accent);
}

.hero-caret.blink {
  animation: caretBlink 1s steps(1) infinite;
}

.hero-lead {
  margin: 0 0 28px;
  max-width: 34rem;
  color: var(--home-mute);
  font-size: 1.05rem;
  line-height: 1.7;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 36px;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 22px;
  border-radius: 999px;
  font-family: var(--font-system);
  font-size: 0.9rem;
  font-weight: 560;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.home-btn--solid {
  color: #111;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
  font-weight: 700;
}

.home-btn--solid:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

.home-btn--ghost {
  color: var(--home-ink);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--home-line);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.home-btn--ghost:hover {
  transform: translateY(-2px);
  border-color: rgba(183, 163, 227, 0.45);
  background: rgba(183, 163, 227, 0.08);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 460px;
  padding-top: 8px;
  border-top: 1px solid var(--home-line);
}

.hero-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-metric strong {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 650;
  letter-spacing: -0.03em;
  color: var(--home-ink);
}

.hero-metric span {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--home-mute);
}

.hero-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.portrait {
  width: min(340px, 78%);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid #3a3a3f;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  background: #0a0810;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 12%;
  display: block;
}

.portrait-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--home-line);
  background: var(--home-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--home-mute);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #86efac;
  box-shadow: 0 0 10px rgba(134, 239, 172, 0.55);
}

.band {
  padding: 72px 0;
}

.band-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.band-title {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 650;
  letter-spacing: -0.035em;
  color: var(--home-ink);
}

.band-title em {
  font-style: normal;
  color: var(--home-accent);
}

.band-sub {
  margin: 0;
  max-width: 36rem;
  color: var(--home-mute);
  font-size: 0.98rem;
  line-height: 1.6;
}

.band-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: var(--home-soft);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.band-link:hover {
  color: #fff;
}

.store-shelf {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 36px;
}

.still-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(240px, 0.8fr);
  grid-template-areas:
    "title title"
    "copy panel";
  column-gap: 36px;
  row-gap: 8px;
  align-items: stretch;
  padding: 32px;
  border-radius: 28px;
  border: 1px solid rgba(1, 117, 194, 0.28);
  background:
    radial-gradient(ellipse 50% 80% at 100% 0%, rgba(19, 185, 253, 0.12), transparent 60%),
    var(--home-glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.still-title-row {
  grid-area: title;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
}

.still-copy {
  grid-area: copy;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
}

.still-name {
  margin: 0;
  font-size: 1.7rem;
  letter-spacing: -0.05em;
}

.still-version {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(19, 185, 253, 0.35);
  background: rgba(19, 185, 253, 0.1);
  color: #7dd3fc;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.still-tagline {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 560;
  letter-spacing: -0.02em;
  color: var(--home-ink);
}

.still-prose {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.still-prose .band-sub {
  max-width: none;
}

.still-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.still-topic {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--home-mute);
  font-size: 0.72rem;
  font-family: var(--font-mono);
}

.still-topic::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.28);
  flex-shrink: 0;
}

.still-kit {
  margin-top: 22px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(19, 185, 253, 0.18);
  background:
    linear-gradient(160deg, rgba(19, 185, 253, 0.08), transparent 55%),
    rgba(255, 255, 255, 0.03);
}

.still-kit-label {
  margin: 0 0 12px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(186, 230, 253, 0.72);
}

.still-kit-widgets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.still-kit-widgets code {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.28);
  color: #e0f2fe;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: -0.01em;
}

.still-kit-modes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
}

.still-kit-modes-lead {
  margin-right: 4px;
  color: var(--home-mute);
  font-size: 0.8rem;
}

.still-kit-mode {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #7dd3fc;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
}

.still-kit-mode-sep {
  color: rgba(186, 230, 253, 0.35);
}

.still-kit-note {
  margin: 12px 0 0;
  color: var(--home-mute);
  font-size: 0.84rem;
  line-height: 1.5;
}

.still-points {
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.still-points li {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  align-items: start;
}

.still-points li:last-child {
  margin-bottom: 22px;
}

.still-point-idx {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: #7dd3fc;
  padding-top: 3px;
}

.still-points strong {
  display: block;
  margin-bottom: 2px;
  font-size: 0.92rem;
  font-weight: 650;
  color: var(--home-ink);
}

.still-points span {
  display: block;
  color: var(--home-mute);
  font-size: 0.86rem;
  line-height: 1.5;
}

.still-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.still-actions .home-btn {
  gap: 8px;
}

.still-panel {
  grid-area: panel;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.still-snippets {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.still-platforms {
  margin: 0;
  color: rgba(186, 230, 253, 0.72);
  font-size: 0.78rem;
  line-height: 1.5;
}

.still-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.still-meta span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(232, 226, 240, 0.7);
}

.services-shell {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.service-tile {
  min-height: 210px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--home-line);
  background: var(--home-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.service-tile:hover {
  transform: translateY(-4px);
  border-color: rgba(183, 163, 227, 0.35);
  background: var(--home-glass-strong);
}

.service-tile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.service-idx {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: rgba(232, 226, 240, 0.4);
}

.service-tile-top i {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(183, 163, 227, 0.14);
  border: 1px solid rgba(183, 163, 227, 0.22);
  color: var(--home-accent);
  font-size: 1rem;
}

.service-tile h3 {
  margin: 0 0 8px;
  font-size: 1.02rem;
  font-weight: 650;
  color: var(--home-ink);
}

.service-tile p {
  margin: 0;
  color: var(--home-mute);
  font-size: 0.88rem;
  line-height: 1.55;
}

.cta-band {
  padding-bottom: 96px;
}

.cta-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(220px, 0.85fr);
  gap: 28px 40px;
  align-items: center;
}

.cta-block {
  max-width: 40rem;
  padding: 8px 0 0;
  border-left: 1px solid rgba(183, 163, 227, 0.35);
  padding-left: 22px;
}

.cta-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}

.cta-eyebrow {
  margin: 0 0 12px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--home-soft);
}

.cta-title {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: var(--home-ink);
}

.cta-title span {
  color: var(--home-accent);
}

.cta-sub {
  margin: 0 0 22px;
  color: var(--home-mute);
  font-size: 0.98rem;
  line-height: 1.6;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 18px;
}

.cta-btn {
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
}

.cta-note {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: rgba(232, 226, 240, 0.45);
}

@keyframes caretBlink {
  0%, 45% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes homeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
}

@media (max-width: 1024px) {
  .hero-shell {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-aside {
    order: -1;
  }

  .portrait {
    width: min(260px, 70%);
  }

  .still-card {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "copy"
      "panel";
    column-gap: 0;
    row-gap: 20px;
    padding: 24px;
  }

  .still-kit {
    margin-top: 18px;
  }

  .still-points {
    margin-top: 18px;
  }

  .still-points li:last-child {
    margin-bottom: 18px;
  }

  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .store-shelf {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 28px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--page-top-mobile) 0 56px;
  }
}

@media (max-width: 720px) {
  .hero {
    min-height: auto;
  }

  .hero-copy {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-kicker {
    justify-content: center;
  }

  .hero-title {
    max-width: 16ch;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-title-live {
    text-align: center;
  }

  .hero-lead {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-metric {
    align-items: center;
  }

  .portrait-meta {
    justify-content: center;
  }

  .still-card {
    text-align: left;
  }

  .still-actions {
    width: 100%;
    flex-wrap: nowrap;
    gap: 8px;
  }

  .still-actions .home-btn {
    flex: 1 1 0;
    justify-content: center;
    min-width: 0;
    width: auto;
    padding-inline: 12px;
    font-size: 0.86rem;
  }

  .band-head {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .band-sub {
    margin-left: auto;
    margin-right: auto;
  }

  .band-link {
    justify-content: center;
  }

  .services-grid,
  .store-shelf {
    grid-template-columns: 1fr;
  }

  .service-tile {
    text-align: center;
  }

  .service-tile-top {
    justify-content: center;
    gap: 12px;
  }

  .cta-shell {
    grid-template-columns: 1fr;
    gap: 18px;
    text-align: center;
  }

  .cta-block {
    padding-left: 0;
    border-left: none;
    margin: 0 auto;
    text-align: center;
  }

  .cta-eyebrow {
    justify-content: center;
  }

  .cta-row {
    justify-content: center;
  }

  .cta-visual {
    order: -1;
    min-height: 0;
    max-width: 260px;
    margin: 0 auto;
  }
}
</style>
