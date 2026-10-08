<template>
    <div class="apple-about">

        <!-- =========================================
             HERO
        ========================================== -->
        <section class="about-hero page-hero">
            <div class="container-apple">
                <div class="about-hero-grid">

                    <div class="about-photo scroll-animate">
                        <div class="photo-frame">
                            <img :src="mePhoto" alt="Pedro Ruffo" />
                        </div>
                    </div>

                    <div class="about-intro scroll-animate">
                        <p class="kicker">
                            {{ t('about.hero.title') }}
                        </p>

                        <h1 class="text-large-title gradient-text mb-lg">
                            Pedro Ruffo
                        </h1>

                        <p
                            class="text-title-3 mb-lg"
                            style="color: var(--apple-text-secondary);"
                        >
                            {{ t('about.hero.subtitle') }}
                        </p>

                        <div class="intro-meta">
                            <span>São Paulo, Brasil</span>
                            <span>Mobile Software Engineer</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- =========================================
             EDUCATION + SUMMARY
        ========================================== -->
        <section class="education-summary-section section-padding">
            <div class="container-apple">

                <div class="education-summary-grid">

                    <!-- Education -->
                    <div class="glass-card glass-only-style scroll-animate">

                        <h2 class="text-title-2 mb-lg">
                            {{ t('about.education.title') }}
                        </h2>

                        <div class="edu-list">

                            <div
                                v-for="item in education"
                                :key="item.key"
                                class="edu-item"
                            >
                                <img
                                    :src="item.logo"
                                    :alt="item.school"
                                    class="edu-logo"
                                />

                                <div>
                                    <h3 class="text-headline">
                                        {{ item.school }}
                                    </h3>

                                    <p
                                        class="text-subhead"
                                        style="color: var(--apple-text-secondary);"
                                    >
                                        {{ item.course }}
                                    </p>

                                    <p class="edu-period">
                                        {{ item.period }}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <!-- Summary -->
                    <div class="glass-card glass-only-style scroll-animate">

                        <h2 class="text-title-2 mb-lg">
                            {{ t('about.summary.title') }}
                        </h2>

                        <p
                            class="text-body"
                            style="
                                color: var(--apple-text-secondary);
                                line-height: 1.8;
                            "
                        >
                            {{ t('about.summary.content') }}
                        </p>

                    </div>

                </div>
            </div>
        </section>


        <!-- =========================================
             EXPERIENCE
        ========================================== -->
        <section class="experience-section section-padding">
  <div class="container-apple">

    <p
      class="kicker"
      style="justify-content: center;"
    >
      Career
    </p>

    <h2 class="text-title-1 text-center mb-2xl scroll-animate">
      {{ t('about.experience.title') }}
    </h2>

    <div class="experience-timeline">

      <div
        v-for="job in jobs"
        :key="job.key"
        class="experience-item linkedin-card scroll-animate"
      >

        <!-- LOGO -->
        <div class="company-logo">
          <img
            :src="job.logo"
            :alt="job.company"
          />
        </div>

        <div class="experience-details">

          <!-- COMPANY -->
          <div class="experience-header">
            <h3 class="company-name">
              {{ job.company }}
            </h3>
          </div>

          <!-- ROLES -->
          <div
            v-for="(role, roleIndex) in job.roles"
            :key="`${job.key}-${roleIndex}`"
            class="experience-role"
          >

            <div class="role-header">

              <div>
                <h4 class="role-title">
                  {{ role.title }}
                </h4>

                <span class="role-period">
                  {{ role.period }}
                </span>
              </div>

            </div>

            <ul class="experience-list">

              <li
                v-for="(bullet, bulletIndex) in role.bullets"
                :key="`${job.key}-${roleIndex}-${bulletIndex}`"
              >
                {{ bullet }}
              </li>

            </ul>

          </div>

          <!-- TECHNOLOGIES -->
          <div class="tech-tags">

            <span
              v-for="(tag, tagIndex) in job.tags"
              :key="`${job.key}-tag-${tagIndex}`"
              class="tech-tag"
            >
              {{ tag }}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

        <!-- =========================================
             SKILLS
        ========================================== -->
        <section class="skills-section section-padding">
  <div class="container-apple">

    <div class="skills-header scroll-animate">

      <span class="kicker">
        Tech Stack
      </span>

      <h2 class="text-title-1">
        {{ t('about.skills.title') }}
      </h2>

      <p class="skills-subtitle">
        Tecnologias e ferramentas que utilizo para construir
        produtos digitais, aplicações mobile e soluções backend.
      </p>

    </div>

    <div class="skills-layout">

      <article
        v-for="(skill, index) in skillCategories"
        :key="skill.key"
        class="skill-card scroll-animate"
        :class="{
          'skill-featured': index === 0
        }"
      >

        <div class="skill-number">
          {{ String(index + 1).padStart(2, '0') }}
        </div>

        <div class="skill-icon">
          <i :class="skill.icon"></i>
        </div>

        <div class="skill-content">

          <div class="skill-title-row">

            <h3>
              {{ skill.title }}
            </h3>

            <i class="bi bi-arrow-up-right"></i>

          </div>

          <div class="skill-tags">

            <span
              v-for="(tag, tagIndex) in skill.tags"
              :key="`${skill.key}-${tagIndex}`"
              class="skill-tag"
            >
              {{ tag }}
            </span>

          </div>

        </div>

      </article>

    </div>

  </div>
</section>


        <!-- =========================================
             CONTACT
        ========================================== -->
        <section class="contact-section section-padding">
            <div class="container-apple">

                <div
                    class="contact-card glass-card glass-only-style text-center scroll-animate"
                >

                    <h2 class="text-title-1 mb-lg gradient-text">
                        {{ t('about.contactCta.title') }}
                    </h2>


                    <div class="contact-info grid-apple grid-2">

                        <!-- Phone -->
                        <div class="contact-item">

                            <div class="contact-icon">
                                <i class="bi bi-telephone"></i>
                            </div>

                            <div class="contact-details">

                                <h4 class="text-callout">
                                    {{ t('about.contactCta.phone') }}
                                </h4>

                                <p class="text-subhead">
                                    +55 (11) 91211-7442
                                </p>

                            </div>

                        </div>


                        <!-- Email -->
                        <div class="contact-item">

                            <div class="contact-icon">
                                <i class="bi bi-envelope"></i>
                            </div>

                            <div class="contact-details">

                                <h4 class="text-callout">
                                    {{ t('about.contactCta.email') }}
                                </h4>

                                <p class="text-subhead">
                                    <a
                                        href="mailto:pedro.ruffo.dev@gmail.com"
                                    >
                                        pedro.ruffo.dev@gmail.com
                                    </a>
                                </p>

                            </div>

                        </div>


                        <!-- Location -->
                        <div class="contact-item">

                            <div class="contact-icon">
                                <i class="bi bi-geo-alt"></i>
                            </div>

                            <div class="contact-details">

                                <h4 class="text-callout">
                                    {{ t('about.contactCta.location') }}
                                </h4>

                                <p class="text-subhead">
                                    São Paulo, Brasil
                                </p>

                            </div>

                        </div>


                        <!-- Github -->
                        <div class="contact-item">

                            <div class="contact-icon">
                                <i class="bi bi-github"></i>
                            </div>

                            <div class="contact-details">

                                <h4 class="text-callout">
                                    {{ t('about.contactCta.github') }}
                                </h4>

                                <p class="text-subhead">
                                    <a
                                        href="https://github.com/pedrinnhooo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        github.com/pedrinnhooo
                                    </a>
                                </p>

                            </div>

                        </div>

                    </div>


                    <div class="mt-xl">

                        <NuxtLink
                            to="/contato"
                            class="btn-apple btn-apple-primary"
                        >
                            {{ t('about.contactCta.button') }}
                        </NuxtLink>

                    </div>

                </div>

            </div>
        </section>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollAnimation } from '~/composables/useAnimations'

import mePhoto from '~/assets/img/me.jpeg'
import logoH2 from '~/assets/img/h2.jpeg'
import logoFoursys from '~/assets/img/4.jpeg'
import logoEy from '~/assets/img/ey.jpeg'
import logoKomus from '~/assets/img/kms.jpeg'
import logoNeo from '~/assets/img/neo.jpeg'

import logoFiap from '~/assets/img/fiap.jpeg'
import logoMindset from '~/assets/img/mindset.jpeg'
import logoImc from '~/assets/img/imcpta.jpeg'

const { t } = useI18n()

useScrollAnimation()

/* =========================
   EDUCATION
========================= */

const education = computed(() => [
  {
    key: 'fiap',
    logo: logoFiap,
    school: t('about.education.items.fiap.school'),
    course: t('about.education.items.fiap.course'),
    period: t('about.education.items.fiap.period')
  },
  {
    key: 'mindset',
    logo: logoMindset,
    school: t('about.education.items.mindset.school'),
    course: t('about.education.items.mindset.course'),
    period: t('about.education.items.mindset.period')
  },
  {
    key: 'imcpta',
    logo: logoImc,
    school: t('about.education.items.imcpta.school'),
    course: t('about.education.items.imcpta.course'),
    period: t('about.education.items.imcpta.period')
  }
])

/* =========================
   EXPERIENCE
========================= */

const jobs = computed(() => {
  const experience = t('about.experience.items', {}, {
    returnObjects: true
  })

  return [
    {
      key: 'h2',
      logo: logoH2,
      ...experience.h2
    },
    {
      key: 'foursys',
      logo: logoFoursys,
      ...experience.foursys
    },
    {
      key: 'ey',
      logo: logoEy,
      ...experience.ey
    },
    {
      key: 'komus',
      logo: logoKomus,
      ...experience.komus
    },
    {
      key: 'neopdv',
      logo: logoNeo,
      ...experience.neopdv
    }
  ]
})

/* =========================
   SKILLS
========================= */

const skillCategories = [
  {
    key: 'mobile',
    icon: 'bi bi-phone',
    title: 'Mobile',
    tags: [
      'Flutter',
      'Dart',
      'GetX',
      'MobX',
      'MVVM',
      'Flutter Modular'
    ]
  },
  {
    key: 'web',
    icon: 'bi bi-laptop',
    title: 'Web',
    tags: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'JavaScript',
      'HTML/CSS',
      'Bootstrap'
    ]
  },
  {
    key: 'backend',
    icon: 'bi bi-server',
    title: 'Backend',
    tags: [
      'Firebase',
      '.NET',
      'BigQuery',
      'SQL',
      'PHP',
      'Node.js'
    ]
  },
  {
    key: 'architecture',
    icon: 'bi bi-diagram-3',
    title: 'Arquitetura',
    tags: [
      'Clean Architecture',
      'Microfrontend',
      'MVVM',
      'Design Patterns'
    ]
  },
  {
    key: 'design',
    icon: 'bi bi-palette',
    title: 'Design',
    tags: [
      'UI/UX',
      'Figma',
      'Marvel App',
      'Prototyping'
    ]
  },
  {
    key: 'methods',
    icon: 'bi bi-gear',
    title: 'Metodologias',
    tags: [
      'Scrum',
      'Kanban',
      'GitLab',
      'Docker'
    ]
  }
]
</script>

<style scoped>

/* =========================================================
   EXPERIENCE
========================================================= */

.experience-role {
    position: relative;
    padding: 0 0 var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}

.experience-role:not(:last-child) {
    border-bottom: 1px solid var(--line);
}

.role-header {
    margin-bottom: var(--spacing-md);
}

.role-title {
    margin: 0 0 6px;
    color: var(--apple-text-primary);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
}

.role-period {
    display: block;
    color: var(--neon-cyan);
    font-size: 0.8rem;
    font-weight: 500;
}

.experience-role:last-of-type {
    margin-bottom: var(--spacing-lg);
}

.experience-details .company-name {
    margin-bottom: var(--spacing-lg);
}


/* =========================================================
   HERO
========================================================= */

.about-hero-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 56px;
    align-items: center;
}

.photo-frame {
    width: 100%;
    aspect-ratio: 1;
    padding: 5px;
    border-radius: 28px;
    background: linear-gradient(
        135deg,
        #67e8f9,
        #a855f7 45%,
        #e879f9
    );
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.4);
}

.photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 10%;
    border-radius: 24px;
    display: block;
    background: #05030b;
}

.intro-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.intro-meta span {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    color: var(--neon-cyan);
}


/* =========================================================
   EDUCATION
========================================================= */

.education-summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
}

.edu-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.edu-item {
    display: flex;
    gap: 14px;
    align-items: center;
}

.edu-logo {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid var(--line);
}

.edu-period {
    color: var(--neon-purple);
    font-size: 0.8rem;
    margin-top: 2px;
}


/* =========================================================
   EXPERIENCE
========================================================= */

.experience-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.linkedin-card {
    display: flex;
    gap: var(--spacing-lg);
    padding: var(--spacing-xl);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--line);
    border-radius: 18px;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
}

.linkedin-card:hover {
    transform: translateY(-4px);
    border-color: rgba(168, 85, 247, 0.4);
}

.company-logo {
    flex-shrink: 0;
}

.company-logo img {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    object-fit: cover;
    border: 1px solid var(--line);
    background: #0b0614;
}

.experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-sm);
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.company-name {
    color: var(--apple-text-primary);
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
}

.experience-list {
    list-style: none;
    padding: 0;
    margin-bottom: var(--spacing-lg);
}

.experience-list li {
    position: relative;
    padding-left: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
    color: var(--apple-text-secondary);
    line-height: 1.6;
}

.experience-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 6px;
    height: 6px;
    background: var(--neon-purple);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--neon-purple);
}


/* =========================================================
   TAGS
========================================================= */

.tech-tags,
.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
}

.tech-tag,
.skill-tag {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(168, 85, 247, 0.12);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    color: var(--neon-purple);
    font-weight: 500;
}


/* =========================================================
   CONTACT
========================================================= */

.contact-card {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-3xl);
}

.contact-info {
    gap: var(--spacing-xl);
    margin: var(--spacing-2xl) 0;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    text-align: left;
}

.contact-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(
        135deg,
        #7c3aed,
        #22d3ee
    );
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.contact-details a {
    color: var(--neon-cyan);
    text-decoration: none;
}


/* =========================================================
   SKILLS HEADER
========================================================= */

.skills-section {
    position: relative;
}

.skills-header {
    max-width: 760px;
    margin: 0 auto var(--spacing-3xl);
    text-align: center;
}

.skills-header .kicker {
    margin-bottom: 14px;
}

.skills-subtitle {
    max-width: 620px;
    margin: 18px auto 0;
    color: var(--apple-text-secondary);
    font-size: 1rem;
    line-height: 1.7;
}


/* =========================================================
   SKILLS GRID
========================================================= */

.skills-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 1050px;
    margin: 0 auto;
}


/* =========================================================
   SKILL CARD
========================================================= */

.skill-card {
    position: relative;

    display: grid;
    grid-template-columns: 48px 52px 1fr;
    align-items: center;
    gap: 18px;

    min-height: 170px;
    padding: 26px 28px;

    overflow: hidden;

    border: 1px solid rgba(192, 132, 252, 0.14);
    border-radius: 22px;

    background:
        linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.045),
            rgba(255, 255, 255, 0.015)
        );

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    transition:
        transform 0.3s ease,
        border-color 0.3s ease,
        background 0.3s ease,
        box-shadow 0.3s ease;
}


/* Glow */

.skill-card::before {
    content: '';

    position: absolute;

    width: 180px;
    height: 180px;

    top: -100px;
    right: -70px;

    background:
        radial-gradient(
            circle,
            rgba(168, 85, 247, 0.16),
            transparent 70%
        );

    pointer-events: none;
}


/* Hover */

.skill-card:hover {
    transform: translateY(-5px);

    border-color: rgba(192, 132, 252, 0.35);

    background:
        linear-gradient(
            135deg,
            rgba(192, 132, 252, 0.08),
            rgba(255, 255, 255, 0.025)
        );

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.3),
        0 0 35px rgba(168, 85, 247, 0.08);
}


/* =========================================================
   FEATURED SKILL
========================================================= */

.skill-featured {
    grid-column: span 2;
    min-height: 190px;
    grid-template-columns: 48px 60px 1fr;
}


/* =========================================================
   SKILL NUMBER
========================================================= */

.skill-number {
    align-self: flex-start;
    padding-top: 4px;

    color: var(--apple-text-tertiary);

    font-family: var(--font-mono);
    font-size: 0.7rem;

    letter-spacing: 0.08em;

    opacity: 0.7;
}


/* =========================================================
   SKILL ICON
========================================================= */

.skill-icon {
    width: 52px;
    height: 52px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 15px;

    background:
        linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.16),
            rgba(103, 232, 249, 0.07)
        );

    border: 1px solid rgba(192, 132, 252, 0.18);

    color: var(--neon-purple);

    font-size: 1.35rem;

    transition:
        transform 0.3s ease,
        background 0.3s ease;
}

.skill-card:hover .skill-icon {
    transform: scale(1.08);

    background:
        linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.28),
            rgba(103, 232, 249, 0.12)
        );
}


/* =========================================================
   SKILL CONTENT
========================================================= */

.skill-content {
    min-width: 0;
}

.skill-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 12px;
    margin-bottom: 15px;
}

.skill-title-row h3 {
    font-family: var(--font-display);

    font-size: 1.15rem;
    font-weight: 700;

    letter-spacing: -0.02em;

    color: var(--apple-text-primary);
}

.skill-title-row > i {
    color: var(--apple-text-tertiary);
    font-size: 0.9rem;

    transition:
        transform 0.3s ease,
        color 0.3s ease;
}

.skill-card:hover .skill-title-row > i {
    color: var(--neon-cyan);
    transform: translate(3px, -3px);
}


/* =========================================================
   SKILL TAGS
========================================================= */

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}

.skill-tag {
    display: inline-flex;
    align-items: center;

    padding: 6px 10px;

    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;

    background: rgba(255, 255, 255, 0.035);

    color: var(--apple-text-secondary);

    font-family: var(--font-mono);
    font-size: 0.7rem;

    line-height: 1;

    transition:
        color 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease;
}

.skill-tag:hover {
    color: var(--apple-text-primary);

    border-color: rgba(192, 132, 252, 0.3);

    background: rgba(168, 85, 247, 0.08);
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

    .about-hero-grid,
    .education-summary-grid {
        grid-template-columns: 1fr;
    }

    .about-photo {
        max-width: 280px;
        margin: 0 auto;
    }

    .about-intro {
        text-align: center;
    }

    .intro-meta {
        justify-content: center;
    }

    .kicker {
        justify-content: center;
    }


    /* Experience */

    .linkedin-card {
        flex-direction: column;
        text-align: center;
    }

    .company-logo {
        align-self: center;
    }

    .experience-header {
        flex-direction: column;
        align-items: center;
    }

    .experience-list {
        text-align: left;
    }


    /* Contact */

    .contact-info {
        grid-template-columns: 1fr;
    }


    /* Skills */

    .skills-layout {
        grid-template-columns: 1fr;
    }

    .skill-featured {
        grid-column: span 1;
    }

    .skill-card,
    .skill-featured {
        grid-template-columns: 40px 48px 1fr;
        padding: 22px;
        min-height: 150px;
    }

    .skill-icon {
        width: 46px;
        height: 46px;
        font-size: 1.15rem;
    }
}


@media (max-width: 520px) {

    .skill-card,
    .skill-featured {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    .skill-number {
        display: none;
    }

    .skill-title-row {
        margin-bottom: 12px;
    }
}

</style>