<template>
  <div class="about-page">
    <!-- PROFILE HEADER -->
    <section class="profile-hero">
      <div class="profile-banner" aria-hidden="true"></div>

      <div class="container-apple profile-shell">
        <div class="profile-card scroll-animate">
          <div class="profile-top">
            <div class="profile-avatar">
              <img :src="mePhoto" alt="Pedro Ruffo" />
            </div>

            <div class="profile-actions">
              <a
                href="https://www.linkedin.com/in/pedroruffo/"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apple btn-apple-primary profile-btn"
              >
                <i class="bi bi-linkedin"></i>
                LinkedIn
              </a>
              <NuxtLink to="/contato" class="btn-apple btn-apple-secondary profile-btn">
                {{ t('about.contactCta.button') }}
              </NuxtLink>
            </div>
          </div>

          <div class="profile-identity">
            <p class="kicker">{{ t('about.hero.title') }}</p>
            <h1 class="profile-name">Pedro Ruffo</h1>
            <p class="profile-headline">{{ t('about.hero.headline') }}</p>
            <p class="profile-location">
              <i class="bi bi-geo-alt"></i>
              {{ t('about.hero.location') }}
            </p>

            <div class="profile-links">
              <a
                v-for="link in socialLinks"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="profile-link"
              >
                <i :class="link.icon"></i>
                <span>{{ link.label }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container-apple about-layout">
      <div class="about-main">
        <!-- ABOUT -->
        <section class="li-card scroll-animate">
          <h2 class="li-title">{{ t('about.summary.title') }}</h2>
          <div class="li-body summary-body">
            <p v-for="(para, i) in summaryParagraphs" :key="i">{{ para }}</p>
          </div>
        </section>

        <!-- EXPERIENCE -->
        <section class="li-card scroll-animate">
          <h2 class="li-title">{{ t('about.experience.title') }}</h2>

          <article
            v-for="job in jobs"
            :key="job.key"
            class="exp-company"
          >
            <div class="exp-company-head">
              <img :src="job.logo" :alt="job.company" class="exp-logo" />
              <div>
                <h3 class="exp-company-name">{{ job.company }}</h3>
                <p class="exp-meta">{{ job.employment }}</p>
                <p class="exp-meta muted">{{ job.location }}</p>
              </div>
            </div>

            <div
              v-for="(role, roleIndex) in job.roles"
              :key="`${job.key}-${roleIndex}`"
              class="exp-role"
            >
              <div class="exp-role-rail" aria-hidden="true"></div>
              <div class="exp-role-body">
                <h4 class="exp-role-title">{{ role.title }}</h4>
                <p class="exp-meta">{{ role.period }}</p>

                <div
                  v-for="(section, si) in role.sections"
                  :key="si"
                  class="exp-section"
                  :class="{ 'exp-section--intro': !section.title }"
                >
                  <h5 v-if="section.title" class="exp-section-title">
                    <span class="exp-section-icon" aria-hidden="true">🔸</span>
                    {{ section.title }}
                  </h5>
                  <p
                    v-if="!section.title && section.items.length === 1"
                    class="exp-intro"
                  >
                    {{ section.items[0] }}
                  </p>
                  <ul
                    v-else
                    class="exp-bullets"
                  >
                    <li v-for="(item, ii) in section.items" :key="ii">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="exp-tags">
              <span v-for="(tag, ti) in job.tags" :key="ti" class="chip">{{ tag }}</span>
            </div>
          </article>
        </section>

        <!-- EDUCATION -->
        <section class="li-card scroll-animate">
          <h2 class="li-title">{{ t('about.education.title') }}</h2>

          <article
            v-for="item in education"
            :key="item.key"
            class="edu-row"
          >
            <img :src="item.logo" :alt="item.school" class="edu-logo" />
            <div>
              <h3 class="edu-school">{{ item.school }}</h3>
              <p class="edu-course">{{ item.course }}</p>
              <p class="exp-meta">{{ item.period }}</p>
              <p v-if="item.grade" class="edu-extra">{{ item.grade }}</p>
              <p v-if="item.activities" class="edu-extra">{{ item.activities }}</p>
              <span v-if="item.status" class="edu-status">{{ item.status }}</span>
            </div>
          </article>
        </section>

        <!-- CYBERSECURITY -->
        <section class="cyber-terminal scroll-animate">
          <div class="cyber-terminal-glow" aria-hidden="true"></div>

          <div class="cyber-head">
            <div>
              <p class="cyber-prompt">{{ t('about.cyber.prompt') }}</p>
              <h2 class="li-title">{{ t('about.cyber.title') }}</h2>
              <p class="li-subtitle">{{ t('about.cyber.subtitle') }}</p>
            </div>
            <div class="cyber-links">
              <a
                href="https://tryhackme.com/p/padin"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apple btn-apple-secondary profile-btn"
              >
                <i class="bi bi-shield-lock"></i>
                {{ t('about.cyber.tryhackme') }}
              </a>
              <a
                href="https://www.secfocus.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apple btn-apple-secondary profile-btn"
              >
                <i class="bi bi-bug"></i>
                {{ t('about.cyber.secfocus') }}
              </a>
            </div>
          </div>

          <div class="cyber-metrics">
            <div
              v-for="(metric, mi) in cyberMetrics"
              :key="mi"
              class="cyber-metric"
            >
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </div>
          </div>

          <div class="cyber-board">
            <figure class="cyber-panel cyber-panel--rooms">
              <figcaption class="cyber-panel-head">
                <span class="cyber-dot"></span>
                <h3>{{ t('about.cyber.rooms') }}</h3>
              </figcaption>
              <img
                :src="thmRooms"
                alt="TryHackMe completed rooms"
                class="cyber-shot"
                loading="lazy"
              />
            </figure>

            <div class="cyber-side">
              <figure class="cyber-panel cyber-panel--badges">
                <figcaption class="cyber-panel-head">
                  <span class="cyber-dot"></span>
                  <h3>{{ t('about.cyber.badges') }}</h3>
                </figcaption>
                <img
                  :src="thmBadges"
                  alt="TryHackMe badges"
                  class="cyber-shot"
                  loading="lazy"
                />
              </figure>

              <figure class="cyber-panel cyber-panel--activity">
                <figcaption class="cyber-panel-head">
                  <span class="cyber-dot"></span>
                  <h3>{{ t('about.cyber.activity') }}</h3>
                </figcaption>
                <img
                  :src="thmActivity"
                  alt="TryHackMe yearly activity"
                  class="cyber-shot"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>
      </div>

      <aside class="about-side">
        <!-- SKILLS -->
        <section class="li-card scroll-animate">
          <h2 class="li-title">{{ t('about.skills.title') }}</h2>
          <p class="li-subtitle">{{ t('about.skills.description') }}</p>

          <div
            v-for="skill in skillCategories"
            :key="skill.key"
            class="skill-block"
          >
            <h3 class="skill-block-title">
              <i :class="skill.icon"></i>
              {{ skill.title }}
            </h3>
            <div class="exp-tags">
              <span v-for="(tag, i) in skill.tags" :key="i" class="chip">{{ tag }}</span>
            </div>
          </div>
        </section>

        <!-- CONTACT -->
        <section class="li-card scroll-animate">
          <h2 class="li-title">{{ t('about.contactCta.title') }}</h2>
          <ul class="contact-list">
            <li>
              <i class="bi bi-envelope"></i>
              <a href="mailto:pedro.ruffo.dev@gmail.com">pedro.ruffo.dev@gmail.com</a>
            </li>
            <li>
              <i class="bi bi-telephone"></i>
              <a href="tel:+5511912117442">+55 (11) 91211-7442</a>
            </li>
            <li>
              <i class="bi bi-geo-alt"></i>
              <span>São Paulo, SP, Brazil</span>
            </li>
            <li>
              <i class="bi bi-github"></i>
              <a href="https://github.com/pedrinnhooo" target="_blank" rel="noopener noreferrer">
                github.com/pedrinnhooo
              </a>
            </li>
            <li>
              <i class="bi bi-linkedin"></i>
              <a href="https://www.linkedin.com/in/pedroruffo/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/pedroruffo
              </a>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollAnimation } from '~/composables/useAnimations'

import mePhoto from '~/assets/img/me.png'
import logoH2 from '~/assets/img/h2.jpeg'
import logoFoursys from '~/assets/img/4.jpeg'
import logoEy from '~/assets/img/ey.jpeg'
import logoKomus from '~/assets/img/kms.jpeg'
import logoNeo from '~/assets/img/neo.jpeg'
import logoFiap from '~/assets/img/fiap.jpeg'
import logoMindset from '~/assets/img/mindset.jpeg'
import logoImc from '~/assets/img/imcpta.jpeg'
import thmRooms from '~/assets/img/cyber/thm-rooms.png'
import thmBadges from '~/assets/img/cyber/thm-badges.png'
import thmActivity from '~/assets/img/cyber/thm-activity.png'

const { t } = useI18n()
useScrollAnimation()

const summaryParagraphs = computed(() =>
  String(t('about.summary.content'))
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
)

const socialLinks = computed(() => [
  {
    href: 'https://www.linkedin.com/in/pedroruffo/',
    icon: 'bi bi-linkedin',
    label: t('about.links.linkedin')
  },
  {
    href: 'https://github.com/pedrinnhooo',
    icon: 'bi bi-github',
    label: t('about.links.github')
  },
  {
    href: 'https://pedro-ruffodev.vercel.app/',
    icon: 'bi bi-globe2',
    label: t('about.links.website')
  },
  {
    href: 'https://tryhackme.com/p/padin',
    icon: 'bi bi-shield-lock',
    label: t('about.links.tryhackme')
  },
  {
    href: 'https://www.secfocus.com.br',
    icon: 'bi bi-bug',
    label: t('about.links.secfocus')
  }
])

const education = computed(() => {
  const items = t('about.education.items')
  return [
    { key: 'fiap', logo: logoFiap, ...items.fiap },
    { key: 'mindset', logo: logoMindset, ...items.mindset },
    { key: 'imcpta', logo: logoImc, ...items.imcpta }
  ]
})

const jobs = computed(() => {
  const experience = t('about.experience.items')
  return [
    { key: 'h2', logo: logoH2, ...experience.h2 },
    { key: 'foursys', logo: logoFoursys, ...experience.foursys },
    { key: 'ey', logo: logoEy, ...experience.ey },
    { key: 'komus', logo: logoKomus, ...experience.komus },
    { key: 'neopdv', logo: logoNeo, ...experience.neopdv }
  ]
})

const skillIcons = {
  mobile: 'bi bi-phone',
  web: 'bi bi-laptop',
  backend: 'bi bi-server',
  architecture: 'bi bi-diagram-3',
  design: 'bi bi-palette',
  methods: 'bi bi-gear',
  devops: 'bi bi-cloud-arrow-up',
  cyber: 'bi bi-shield-lock'
}

const skillCategories = computed(() => {
  const categories = t('about.skills.categories')
  return Object.entries(categories).map(([key, value]) => ({
    key,
    icon: skillIcons[key] || 'bi bi-code-slash',
    title: value.title,
    tags: value.tags
  }))
})

const cyberMetrics = computed(() => {
  const metrics = t('about.cyber.metrics')
  return Array.isArray(metrics) ? metrics : Object.values(metrics || {})
})
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding-bottom: 64px;
  background: transparent;
  overflow: visible;
}

.profile-hero {
  position: relative;
  margin-bottom: 28px;
  overflow: visible;
}

.profile-banner {
  height: clamp(120px, 18vw, 180px);
  width: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(5, 3, 11, 0.2) 70%, rgba(5, 3, 11, 0.4) 100%);
}

.profile-shell {
  margin-top: -88px;
  position: relative;
  z-index: 2;
}

.profile-card {
  padding: 24px 28px 28px;
  border-radius: 22px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.profile-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 18px;
}

.profile-avatar {
  width: 148px;
  height: 148px;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  margin-top: -96px;
  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 12%;
  border-radius: 50%;
  display: block;
  background: #05030b;
  border: 1.5px solid #3a3a3f;
}

.profile-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.profile-btn {
  min-height: 40px;
  padding: 0 16px;
  font-size: 0.85rem;
}

.profile-name {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.profile-headline {
  margin: 0 0 10px;
  color: var(--apple-text-secondary);
  font-size: 1.05rem;
  line-height: 1.45;
  max-width: 820px;
}

.profile-location {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  color: var(--neon-cyan);
  font-size: 0.9rem;
}

.profile-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.profile-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--apple-text-secondary);
  text-decoration: none;
  font-size: 0.82rem;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.profile-link:hover {
  color: #fff;
  border-color: rgba(192, 132, 252, 0.4);
  background: rgba(168, 85, 247, 0.12);
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.9fr);
  gap: 22px;
  align-items: start;
}

.about-main,
.about-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.li-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
}

.li-title {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.li-subtitle {
  margin: -6px 0 16px;
  color: var(--apple-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.summary-body p {
  margin: 0 0 14px;
  color: var(--apple-text-secondary);
  line-height: 1.75;
  font-size: 0.98rem;
}

.summary-body p:last-child {
  margin-bottom: 0;
}

.exp-company + .exp-company {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.exp-company-head {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;
  margin-bottom: 16px;
}

.exp-logo,
.edu-logo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.exp-company-name,
.edu-school {
  margin: 0 0 4px;
  font-size: 1.05rem;
  font-weight: 700;
}

.exp-meta {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 0.86rem;
}

.exp-meta.muted {
  color: var(--apple-text-tertiary);
}

.exp-role {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  margin-bottom: 18px;
}

.exp-role-rail {
  width: 10px;
  margin-left: 4px;
  position: relative;
}

.exp-role-rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  border-radius: 2px;
  background: rgba(192, 132, 252, 0.35);
}

.exp-role-rail::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translateX(-50%);
  background: var(--neon-purple);
  box-shadow: 0 0 10px rgba(192, 132, 252, 0.6);
}

.exp-role-title {
  margin: 0 0 4px;
  font-size: 0.98rem;
  font-weight: 650;
}

.exp-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.exp-section:first-of-type,
.exp-section--intro {
  margin-top: 10px;
  padding-top: 0;
  border-top: none;
}

.exp-section-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--apple-text-primary);
  letter-spacing: 0.01em;
  line-height: 1.35;
}

.exp-section-icon {
  flex-shrink: 0;
  line-height: 1.35;
  font-size: 0.85rem;
}

.exp-intro {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.exp-bullets {
  margin: 0;
  padding-left: 18px;
  color: var(--apple-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.exp-bullets li + li {
  margin-top: 8px;
}

.exp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
  padding-top: 4px;
}

.chip {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--apple-text-secondary);
  font-size: 0.72rem;
  font-family: var(--font-mono);
}

.edu-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;
}

.edu-row + .edu-row {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.edu-course {
  margin: 0 0 4px;
  color: var(--apple-text-secondary);
  font-size: 0.92rem;
}

.edu-extra {
  margin: 6px 0 0;
  color: var(--apple-text-tertiary);
  font-size: 0.84rem;
  line-height: 1.45;
}

.edu-status {
  display: inline-flex;
  margin-top: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: #34d399;
  font-size: 0.72rem;
  font-weight: 600;
}

.cyber-terminal {
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: 22px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.cyber-terminal-glow {
  pointer-events: none;
  position: absolute;
  top: -40%;
  left: -30%;
  width: 120%;
  height: 90%;
  background: radial-gradient(
    ellipse 55% 50% at 18% 22%,
    rgba(52, 211, 153, 0.2),
    transparent 68%
  );
  opacity: 0.95;
}

.cyber-head {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.cyber-prompt {
  margin: 0 0 8px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: #34d399;
}

.cyber-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cyber-metrics {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: 16px;
  border: 1px solid rgba(52, 211, 153, 0.18);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.cyber-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 10px;
  text-align: center;
}

.cyber-metric + .cyber-metric {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.cyber-metric strong {
  font-family: var(--font-mono);
  font-size: 1.35rem;
  font-weight: 700;
  color: #f0fdf4;
}

.cyber-metric span {
  font-size: 0.72rem;
  color: var(--apple-text-tertiary);
}

.cyber-board {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 14px;
  align-items: stretch;
}

.cyber-side {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
}

.cyber-panel {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(52, 211, 153, 0.16);
  background: rgba(0, 0, 0, 0.32);
}

.cyber-panel--rooms {
  height: 100%;
}

.cyber-panel--badges,
.cyber-panel--activity {
  flex: 1 1 0;
}

.cyber-panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
}

.cyber-panel-head h3 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #86efac;
}

.cyber-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.8);
}

.cyber-shot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  background: #0b1220;
  object-fit: contain;
}

.cyber-panel--rooms .cyber-shot {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  object-position: top center;
}

.cyber-panel--badges .cyber-shot,
.cyber-panel--activity .cyber-shot {
  flex: 1;
  width: 100%;
  min-height: 160px;
  object-fit: contain;
  object-position: center;
  background: #0b1220;
}

.skill-block + .skill-block {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.skill-block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 0.88rem;
  font-weight: 650;
  color: var(--apple-text-primary);
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--apple-text-secondary);
  font-size: 0.88rem;
  line-height: 1.4;
}

.contact-list i {
  color: var(--neon-purple);
  margin-top: 2px;
}

.contact-list a {
  color: inherit;
  text-decoration: none;
}

.contact-list a:hover {
  color: #fff;
}

@media (max-width: 980px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .cyber-board {
    grid-template-columns: 1fr;
  }

  .cyber-side {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .cyber-panel--rooms .cyber-shot {
    min-height: 0;
    height: auto;
    object-fit: contain;
  }

  .cyber-panel--badges .cyber-shot,
  .cyber-panel--activity .cyber-shot {
    min-height: 0;
  }

  .cyber-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cyber-metric {
    border-left: none;
  }

  .cyber-metric:nth-child(2n) {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  .cyber-metric:nth-child(n + 3) {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
}

@media (max-width: 768px) {
  .about-page {
    padding-top: var(--page-top-mobile);
    min-height: calc(100dvh - 0px);
  }

  .profile-banner {
    height: 72px;
  }

  .profile-shell {
    margin-top: -28px;
  }

  .profile-avatar {
    width: 112px;
    height: 112px;
    margin-top: 8px;
  }

  .profile-card {
    padding-top: 20px;
  }
}

@media (max-width: 720px) {
  .profile-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-card {
    padding: 22px 18px 18px;
  }

  .li-card {
    padding: 18px;
  }

  .cyber-terminal {
    padding: 16px;
    border-radius: 18px;
    overflow: hidden;
  }

  .cyber-terminal-glow {
    top: -35%;
    left: -40%;
    width: 160%;
    height: 95%;
    background: radial-gradient(
      ellipse 70% 55% at 30% 18%,
      rgba(52, 211, 153, 0.18),
      transparent 70%
    );
  }

  .cyber-head {
    flex-direction: column;
  }

  .cyber-links {
    width: 100%;
  }

  .cyber-links .profile-btn {
    flex: 1;
    justify-content: center;
  }

  .cyber-side {
    grid-template-columns: 1fr;
  }

  .cyber-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cyber-metric {
    padding: 14px 8px;
  }

  .cyber-metric strong {
    font-size: 1.15rem;
  }

  .cyber-metric span {
    font-size: 0.66rem;
  }
}

@media (max-width: 420px) {
  .cyber-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cyber-metric + .cyber-metric {
    border-left: none;
  }

  .cyber-metric:nth-child(2n) {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  .cyber-metric:nth-child(n + 3) {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
