<template>
    <div class="apple-home">
        <section class="hero-section parallax-container">
            <div class="hero-orbs" aria-hidden="true">
                <span class="orb orb-a"></span>
                <span class="orb orb-b"></span>
                <span class="orb orb-c"></span>
            </div>

            <div class="hero-content">
                <div class="hero-text scroll-animate">
                    <p class="kicker">Flutter · Nuxt · UI/UX</p>
                    <h1 class="text-large-title gradient-text mb-lg">
                        {{ displayText }}
                        <span class="cursor" :class="{ 'blink': !isTypewriterComplete }">|</span>
                    </h1>
                    <p class="hero-subtitle mb-xl">
                        {{ t('home.hero.subtitle') }}
                    </p>
                    <div class="hero-buttons">
                        <NuxtLink to="/projetos" class="btn-apple btn-apple-primary">
                            {{ t('home.hero.buttons.viewProjects') }}
                        </NuxtLink>
                        <NuxtLink to="/contato" class="btn-apple btn-apple-secondary">
                            {{ t('home.hero.buttons.talkToMe') }}
                        </NuxtLink>
                    </div>
                </div>

                <div class="hero-portrait scroll-animate">
                    <div class="portrait-ring">
                        <img :src="mePhoto" alt="Pedro Ruffo" />
                    </div>
                    <div class="portrait-chip">
                        <span class="chip-dot"></span>
                        São Paulo · available
                    </div>
                </div>
            </div>
        </section>

        <section class="stats-section section-padding">
            <div class="container-apple">
                <div class="stats-grid grid-apple grid-3">
                    <div class="stat-card glass-card scroll-animate" v-for="stat in stats" :key="stat.key">
                        <div class="stat-number text-title-1 gradient-text">{{ stat.displayValue.value }}+</div>
                        <div class="stat-label text-callout">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="projects-section section-padding">
            <div class="container-apple">
                <div class="section-header text-center mb-2xl scroll-animate">
                    <p class="kicker" style="justify-content: center;">Portfolio</p>
                    <h2 class="text-title-1 mb-md">{{ t('home.projects.title') }}</h2>
                    <p class="text-body" style="color: var(--apple-text-secondary);">
                        {{ t('home.projects.subtitle') }}
                    </p>
                </div>

                <div class="projects-grid">
                    <div v-for="(project, index) in featuredProjects" :key="`featured-${project.id}`"
                        class="project-card glass-card scroll-animate" :style="{ animationDelay: `${index * 0.1}s` }"
                        @click="openProjectModal(project)">
                        <div class="project-image">
                            <img :src="project.thumbnail" :alt="project.name" />
                            <div class="project-overlay">
                                <div class="project-links">
                                    <a v-if="project.appleLink" :href="project.appleLink" target="_blank" @click.stop>
                                        <i class="bi bi-apple"></i>
                                    </a>
                                    <a v-if="project.googleLink" :href="project.googleLink" target="_blank" @click.stop>
                                        <i class="bi bi-google-play"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="project-content">
                            <div class="project-header">
                                <h3 class="text-headline mb-sm">{{ project.name }}</h3>
                                <span class="project-category">{{ project.category }}</span>
                            </div>
                            <p class="text-subhead mb-md" style="color: var(--apple-text-secondary);">
                                {{ project.shortDescription }}
                            </p>
                            <div class="project-tech">
                                <span v-for="tech in project.technologies.split(', ').slice(0, 3)" :key="tech"
                                    class="tech-tag">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-xl">
                    <NuxtLink to="/projetos" class="btn-apple btn-apple-secondary">
                        {{ t('home.projects.viewAll') }}
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="services-section section-padding">
            <div class="container-apple">
                <div class="services-content">
                    <div class="services-text scroll-animate">
                        <h2 class="text-title-1 mb-lg">
                            {{ t('home.services.title') }} <span class="gradient-text">{{
                                t('home.services.titleHighlight') }}</span>{{ t('home.services.titleEnd') }}
                        </h2>
                        <p class="text-body mb-xl" style="color: var(--apple-text-secondary);">
                            {{ t('home.services.description') }}
                        </p>

                        <div class="services-list">
                            <div v-for="service in services" :key="service.key" class="service-item scroll-animate">
                                <div class="service-icon">
                                    <i :class="service.icon"></i>
                                </div>
                                <div class="service-content">
                                    <h4 class="text-callout mb-sm">{{ service.title }}</h4>
                                    <p class="text-subhead" style="color: var(--apple-text-secondary);">
                                        {{ service.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section section-padding">
            <div class="container-apple">
                <div class="cta-content glass-card text-center scroll-animate">
                    <h2 class="text-title-1 mb-lg">
                        {{ t('home.cta.title') }} <span class="gradient-text">{{ t('home.cta.titleHighlight')
                        }}</span>{{ t('home.cta.titleEnd') }}
                    </h2>
                    <p class="text-body mb-xl" style="color: var(--apple-text-secondary);">
                        {{ t('home.cta.subtitle') }}
                    </p>
                    <NuxtLink to="/contato" class="btn-apple btn-apple-primary">
                        {{ t('home.cta.button') }}
                    </NuxtLink>
                </div>
            </div>
        </section>

        <transition name="modal">
            <div v-if="selectedProject" class="modal-overlay" @click="closeProjectModal">
                <div class="modal-content glass-card" @click.stop>
                    <button class="modal-close" @click="closeProjectModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <div class="modal-header">
                        <img :src="selectedProject.thumbnail" :alt="selectedProject.name" class="modal-image">
                        <div class="modal-info">
                            <h3 class="text-title-2 mb-sm">{{ selectedProject.name }}</h3>
                            <span class="modal-category">{{ selectedProject.category }}</span>
                            <p class="text-body mt-md" style="color: var(--apple-text-secondary);">
                                {{ selectedProject.longDescription }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-headline mb-md">{{ t('home.modal.techTitle') }}</h4>
                        <div class="modal-tech">
                            <span v-for="tech in selectedProject.technologies.split(', ')" :key="tech" class="tech-tag">
                                {{ tech }}
                            </span>
                        </div>
                        <div class="modal-links mt-lg" v-if="selectedProject.appleLink || selectedProject.googleLink">
                            <a v-if="selectedProject.appleLink" :href="selectedProject.appleLink" target="_blank"
                                class="btn-apple btn-apple-secondary">
                                <i class="bi bi-apple"></i> {{ t('home.modal.appStore') }}
                            </a>
                            <a v-if="selectedProject.googleLink" :href="selectedProject.googleLink" target="_blank"
                                class="btn-apple btn-apple-secondary">
                                <i class="bi bi-google-play"></i> {{ t('home.modal.googlePlay') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useScrollAnimation, useTypewriter, useCountUp } from '~/composables/useAnimations'
import mePhoto from '~/assets/img/me.jpeg'

useScrollAnimation()

const { t } = useI18n()

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
    statsData.map(stat => ({
        ...stat,
        label: t(`home.stats.${stat.key}`)
    }))
)

const servicesData = [
    { key: 'mobile', icon: 'bi bi-phone' },
    { key: 'web', icon: 'bi bi-laptop' },
    { key: 'architecture', icon: 'bi bi-diagram-3' },
    { key: 'backend', icon: 'bi bi-server' },
    { key: 'design', icon: 'bi bi-palette' }
]

const services = computed(() => {
    return servicesData.map(service => ({
        ...service,
        title: t(`home.services.items.${service.key}.title`),
        description: t(`home.services.items.${service.key}.description`)
    }))
})

const { featuredProjects } = useProjects()
const selectedProject = ref(null)

const openProjectModal = (project) => {
    selectedProject.value = project
    document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
    selectedProject.value = null
    document.body.style.overflow = ''
}

watch(typewriterText, (newText) => {
    if (newText) {
        setTimeout(() => {
            startTypewriter()
        }, 100)
    }
}, { immediate: false })

onMounted(() => {
    setTimeout(() => {
        startTypewriter()
    }, 500)

    setTimeout(() => {
        statsData.forEach((stat, index) => {
            const { current, startCountUp } = useCountUp(stat.value, 2000)
            setTimeout(() => {
                startCountUp()
                const updateStat = () => {
                    stat.displayValue.value = current.value
                    if (current.value < stat.value) {
                        requestAnimationFrame(updateStat)
                    }
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
.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 120px 24px 64px;
}

.hero-orbs {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.55;
    animation: float 10s ease-in-out infinite;
}

.orb-a {
    width: 280px;
    height: 280px;
    background: #7c3aed;
    top: 8%;
    right: 12%;
}

.orb-b {
    width: 220px;
    height: 220px;
    background: #22d3ee;
    bottom: 12%;
    left: 8%;
    animation-delay: 1.4s;
    opacity: 0.28;
}

.orb-c {
    width: 160px;
    height: 160px;
    background: #e879f9;
    top: 42%;
    left: 42%;
    animation-delay: 2s;
    opacity: 0.22;
}

.hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
    align-items: center;
}

.hero-subtitle {
    color: var(--apple-text-secondary);
    font-size: 1.15rem;
    max-width: 560px;
}

.hero-buttons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.hero-portrait {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
}

.portrait-ring {
    width: min(360px, 100%);
    aspect-ratio: 1;
    padding: 6px;
    border-radius: 32% 68% 40% 60% / 42% 30% 70% 58%;
    background: linear-gradient(135deg, #67e8f9, #a855f7, #e879f9);
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.45), 0 20px 50px rgba(0, 0, 0, 0.4);
    animation: morph 8s ease-in-out infinite;
}

.portrait-ring img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 12%;
    border-radius: inherit;
    display: block;
    background: #05030b;
}

.portrait-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(16, 8, 26, 0.8);
    border: 1px solid rgba(103, 232, 249, 0.3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--neon-cyan);
}

.chip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 10px #34d399;
}

@keyframes morph {
    0%, 100% { border-radius: 32% 68% 40% 60% / 42% 30% 70% 58%; }
    50% { border-radius: 60% 40% 58% 42% / 30% 62% 38% 70%; }
}

.cursor { opacity: 1; }
.cursor.blink { animation: blink 1s infinite; }

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.stat-card {
    text-align: center;
    padding: var(--spacing-xl);
}

.stat-label { color: rgba(255, 255, 255, 0.7); }

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xl);
}

.project-card {
    cursor: pointer;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-direction: column;
}

.project-image {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
}

.project-card:hover .project-image img { transform: scale(1.06); }

.project-overlay {
    position: absolute;
    inset: 0;
    background: rgba(7, 4, 15, 0.62);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-normal);
}

.project-card:hover .project-overlay { opacity: 1; }

.project-links {
    display: flex;
    gap: var(--spacing-md);
}

.project-links a {
    width: 48px;
    height: 48px;
    background: rgba(168, 85, 247, 0.35);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    text-decoration: none;
}

.project-content {
    padding: var(--spacing-md);
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-sm);
}

.project-category,
.modal-category {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(103, 232, 249, 0.1);
    border: 1px solid rgba(103, 232, 249, 0.3);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    color: var(--neon-cyan);
    font-weight: 500;
    white-space: nowrap;
}

.project-tech,
.modal-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
}

.tech-tag {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(168, 85, 247, 0.12);
    border-radius: 20px;
    font-size: 0.75rem;
    color: var(--neon-purple);
    border: 1px solid rgba(168, 85, 247, 0.3);
}

.services-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.service-item {
    display: flex;
    gap: var(--spacing-md);
    align-items: flex-start;
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--line);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    transition: all 0.35s ease;
}

.service-item:hover {
    transform: translateX(8px);
    border-color: rgba(168, 85, 247, 0.4);
}

.service-icon {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, #7c3aed, #22d3ee);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.4rem;
    flex-shrink: 0;
}

.cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-3xl);
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 3, 11, 0.86);
    backdrop-filter: blur(22px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: var(--spacing-lg);
}

.modal-content {
    max-width: 700px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.modal-close {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--line);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.modal-header {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.modal-image {
    width: 140px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--radius-md);
    flex-shrink: 0;
}

.modal-links {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.modal-enter-active,
.modal-leave-active { transition: all var(--transition-normal); }

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.94);
}

@media (max-width: 1024px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .hero-subtitle { margin-inline: auto; }
    .hero-buttons { justify-content: center; }
    .kicker { justify-content: center; }
    .projects-grid { grid-template-columns: 1fr; }
    .modal-header { flex-direction: column; }
    .modal-image { width: 100%; height: 200px; }
}
</style>
