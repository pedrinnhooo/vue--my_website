<template>
    <div class="apple-about">
        <section class="about-hero page-hero">
            <div class="container-apple">
                <div class="about-hero-grid">
                    <div class="about-photo scroll-animate">
                        <div class="photo-frame">
                            <img :src="mePhoto" alt="Pedro Ruffo" />
                        </div>
                    </div>
                    <div class="about-intro scroll-animate">
                        <p class="kicker">{{ t('about.hero.title') }}</p>
                        <h1 class="text-large-title gradient-text mb-lg">Pedro Ruffo</h1>
                        <p class="text-title-3 mb-lg" style="color: var(--apple-text-secondary);">
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

        <section class="education-summary-section section-padding">
            <div class="container-apple">
                <div class="education-summary-grid">
                    <div class="glass-card glass-only-style scroll-animate">
                        <h2 class="text-title-2 mb-lg">{{ t('about.education.title') }}</h2>
                        <div class="edu-list">
                            <div v-for="item in education" :key="item.key" class="edu-item">
                                <img :src="item.logo" :alt="item.school" class="edu-logo" />
                                <div>
                                    <h3 class="text-headline">{{ item.school }}</h3>
                                    <p class="text-subhead" style="color: var(--apple-text-secondary);">{{ item.course }}</p>
                                    <p class="edu-period">{{ item.period }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card glass-only-style scroll-animate">
                        <h2 class="text-title-2 mb-lg">{{ t('about.summary.title') }}</h2>
                        <p class="text-body" style="color: var(--apple-text-secondary); line-height: 1.8;">
                            {{ t('about.summary.content') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="experience-section section-padding">
            <div class="container-apple">
                <p class="kicker" style="justify-content: center;">Career</p>
                <h2 class="text-title-1 text-center mb-2xl scroll-animate">{{ t('about.experience.title') }}</h2>

                <div class="experience-timeline">
                    <div v-for="job in jobs" :key="job.key" class="experience-item linkedin-card scroll-animate">
                        <div class="company-logo">
                            <img :src="job.logo" :alt="t(`about.experience.items.${job.key}.company`)" />
                        </div>
                        <div class="experience-details">
                            <div class="experience-header">
                                <h3 class="company-name">{{ t(`about.experience.items.${job.key}.company`) }}</h3>
                                <span class="experience-period">{{ t(`about.experience.items.${job.key}.period`) }}</span>
                            </div>
                            <ul class="experience-list">
                                <li v-for="bullet in t(`about.experience.items.${job.key}.bullets`)" :key="bullet">{{ bullet }}</li>
                            </ul>
                            <div class="tech-tags">
                                <span v-for="tag in t(`about.experience.items.${job.key}.tags`)" :key="tag" class="tech-tag">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="skills-section section-padding">
            <div class="container-apple">
                <h2 class="text-title-1 text-center mb-2xl scroll-animate">{{ t('about.skills.title') }}</h2>

                <div class="skills-grid grid-apple grid-3">
                    <div v-for="skill in skillCategories" :key="skill.key" class="skill-category glass-card glass-only-style scroll-animate">
                        <div class="skill-icon">
                            <i :class="skill.icon"></i>
                        </div>
                        <h3 class="text-headline mb-md">{{ t(`about.skills.categories.${skill.key}.title`) }}</h3>
                        <div class="skill-tags">
                            <span v-for="tag in t(`about.skills.categories.${skill.key}.tags`)" :key="tag" class="skill-tag">{{ tag }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="contact-section section-padding">
            <div class="container-apple">
                <div class="contact-card glass-card glass-only-style text-center scroll-animate">
                    <h2 class="text-title-1 mb-lg gradient-text">{{ t('about.contactCta.title') }}</h2>
                    <div class="contact-info grid-apple grid-2">
                        <div class="contact-item">
                            <div class="contact-icon"><i class="bi bi-telephone"></i></div>
                            <div class="contact-details">
                                <h4 class="text-callout">{{ t('about.contactCta.phone') }}</h4>
                                <p class="text-subhead">+55 (11) 91211-7442</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon"><i class="bi bi-envelope"></i></div>
                            <div class="contact-details">
                                <h4 class="text-callout">{{ t('about.contactCta.email') }}</h4>
                                <p class="text-subhead">
                                    <a href="mailto:pedro.ruffo.dev@gmail.com">pedro.ruffo.dev@gmail.com</a>
                                </p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon"><i class="bi bi-geo-alt"></i></div>
                            <div class="contact-details">
                                <h4 class="text-callout">{{ t('about.contactCta.location') }}</h4>
                                <p class="text-subhead">São Paulo, Brasil</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon"><i class="bi bi-github"></i></div>
                            <div class="contact-details">
                                <h4 class="text-callout">{{ t('about.contactCta.github') }}</h4>
                                <p class="text-subhead">
                                    <a href="https://github.com/pedrinnhooo" target="_blank">github.com/pedrinnhooo</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-xl">
                        <NuxtLink to="/contato" class="btn-apple btn-apple-primary">
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

const jobs = [
    { key: 'h2', logo: logoH2 },
    { key: 'foursys', logo: logoFoursys },
    { key: 'ey', logo: logoEy },
    { key: 'komus', logo: logoKomus },
    { key: 'neopdv', logo: logoNeo }
]

const skillCategories = [
    { key: 'mobile', icon: 'bi bi-phone' },
    { key: 'web', icon: 'bi bi-laptop' },
    { key: 'backend', icon: 'bi bi-server' },
    { key: 'architecture', icon: 'bi bi-diagram-3' },
    { key: 'design', icon: 'bi bi-palette' },
    { key: 'methods', icon: 'bi bi-gear' }
]
</script>

<style scoped>
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
    background: linear-gradient(135deg, #67e8f9, #a855f7 45%, #e879f9);
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

.experience-period {
    color: var(--neon-cyan);
    font-size: 0.85rem;
    font-weight: 500;
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

.skill-category { text-align: center; }

.skill-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #7c3aed, #22d3ee);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-md);
    font-size: 1.4rem;
    color: white;
}

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
    background: linear-gradient(135deg, #7c3aed, #22d3ee);
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

@media (max-width: 768px) {
    .about-hero-grid,
    .education-summary-grid {
        grid-template-columns: 1fr;
    }

    .about-photo { max-width: 280px; margin: 0 auto; }
    .about-intro { text-align: center; }
    .intro-meta { justify-content: center; }
    .kicker { justify-content: center; }

    .linkedin-card {
        flex-direction: column;
        text-align: center;
    }

    .company-logo { align-self: center; }
    .experience-header { flex-direction: column; align-items: center; }
    .experience-list { text-align: left; }
    .contact-info { grid-template-columns: 1fr; }
}
</style>
