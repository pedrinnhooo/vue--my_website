<template>
    <header class="apple-header" :class="{ 'scrolled': isScrolled }">
        <nav class="header-nav">
            <div class="container-apple">
                <div class="nav-content">
                    <!-- Logo -->
                    <NuxtLink to="/" class="logo-link">
                        <div class="logo">
                            <OrangeLogo size="medium" variant="glow" />
                            <span class="logo-text">{{ t('header.brand') }}</span>
                        </div>
                    </NuxtLink>

                    <!-- Desktop Navigation -->
                    <div class="nav-links desktop-nav">
                        <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link"
                            :class="{ 'active': $route.path === link.path }">
                            {{ link.name }}
                        </NuxtLink>
                        <LanguageSelector />
                    </div>

                    <!-- Mobile Menu Button (APARECE APENAS COM MENU FECHADO) -->
                    <button v-show="!isMobileMenuOpen" class="mobile-menu-btn" @click.stop.prevent="toggleMobileMenu">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
            <!-- Close Button -->
            <button class="mobile-close-btn" @click="closeMobileMenu">
                <i class="bi bi-x-lg"></i>
            </button>

            <div class="mobile-menu-content">
                <div class="mobile-nav-links">
                    <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" class="mobile-nav-link"
                        @click="closeMobileMenu">
                        {{ link.name }}
                    </NuxtLink>

                    <!-- Mobile Language Selector -->
                    <div class="mobile-language-section">
                        <h4 class="mobile-language-title">{{ t('common.language') || 'Idioma' }}</h4>
                        <div class="mobile-language-options">
                            <button class="mobile-language-btn" :class="{ 'active': locale === 'pt' }"
                                @click="selectLanguage('pt')">
                                <span class="flag-emoji">🇧🇷</span>
                                <span>Português</span>
                            </button>
                            <button class="mobile-language-btn" :class="{ 'active': locale === 'en' }"
                                @click="selectLanguage('en')">
                                <span class="flag-emoji">🇺🇸</span>
                                <span>English</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const { t, locale, setLocale } = useI18n()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = computed(() => [
    { name: t('header.links.home'), path: '/' },
    { name: t('header.links.about'), path: '/sobre' },
    { name: t('header.links.projects'), path: '/projetos' },
    { name: t('header.links.contact'), path: '/contato' }
])

const toggleMobileMenu = (event) => {
    if (event) {
        event.preventDefault()
        event.stopPropagation()
    }
    
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    
    // Prevent body scroll when menu is open
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
        document.body.classList.add('menu-open')
    } else {
        document.body.style.overflow = ''
        document.body.classList.remove('menu-open')
    }
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
}

const selectLanguage = (lang) => {
    setLocale(lang)
    closeMobileMenu()
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
})
</script>

<style scoped>

/* =========================================================
   FLOATING TECH HEADER
   ========================================================= */

.apple-header {
    position: fixed !important;
    top: 18px !important;
    left: 0 !important;
    right: 0 !important;

    z-index: 1000 !important;

    display: flex;
    justify-content: center;

    background: transparent;
    border: none;

    pointer-events: none;

    transition:
        top 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}


/* =========================================================
   HEADER NAV — FLOATING PILL
   ========================================================= */

.header-nav {
    width: min(1214px, calc(100% - 40px));

    padding: 8px;

    background: rgba(10, 6, 18, 0.94);

    border: 1px solid rgba(192, 132, 252, 0.16);

    border-radius: 18px;

    box-shadow:
        0 12px 35px rgba(0, 0, 0, 0.35),
        0 2px 0 rgba(255, 255, 255, 0.03) inset;

    pointer-events: auto;

    transition:
        width 0.35s ease,
        padding 0.35s ease,
        border-radius 0.35s ease,
        box-shadow 0.35s ease,
        background 0.35s ease;
}


/* =========================================================
   SCROLLED STATE
   ========================================================= */

.apple-header.scrolled {
    top: 10px !important;
}

.apple-header.scrolled .header-nav {
    width: min(1080px, calc(100% - 32px));

    padding: 6px;

    background: rgba(9, 5, 16, 0.98);

    border-color: rgba(192, 132, 252, 0.22);

    border-radius: 16px;

    box-shadow:
        0 16px 45px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(168, 85, 247, 0.04);
}


/* =========================================================
   CONTAINER
   ========================================================= */

.header-nav .container-apple {
    width: 100%;
    max-width: none;

    padding: 0;

    zoom: 1;
}


/* =========================================================
   NAV CONTENT
   ========================================================= */

.nav-content {
    min-height: 54px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 10px;
}


/* =========================================================
   LOGO
   ========================================================= */

.logo-link {
    display: inline-flex;
    align-items: center;

    text-decoration: none;
    color: inherit;

    position: relative;
}

.logo {
    display: flex;
    align-items: center;

    gap: 10px;
}

.logo-text {
    font-family: var(--font-display);

    font-size: 1.05rem;
    font-weight: 700;

    letter-spacing: -0.025em;

    color: var(--apple-text-primary);

    transition: color 0.25s ease;
}

.logo-link:hover .logo-text {
    color: #d8b4fe;
}


/* =========================================================
   DESKTOP NAV
   ========================================================= */

.desktop-nav {
    display: flex;
    align-items: center;

    gap: 4px;
}


/* =========================================================
   NAV LINK
   ========================================================= */

.nav-link {
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 38px;

    padding: 0 14px;

    border-radius: 10px;

    border: 1px solid transparent;

    color: var(--apple-text-secondary);

    text-decoration: none;

    font-family: var(--font-system);
    font-size: 0.82rem;
    font-weight: 500;

    transition:
        color 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
}


/* subtle bottom indicator */

.nav-link::after {
    content: '';

    position: absolute;

    left: 50%;
    bottom: 5px;

    width: 0;
    height: 2px;

    border-radius: 999px;

    background: linear-gradient(
        90deg,
        var(--neon-cyan),
        var(--neon-purple)
    );

    transform: translateX(-50%);

    transition: width 0.25s ease;

    box-shadow:
        0 0 8px rgba(103, 232, 249, 0.45);
}


/* hover */

.nav-link:hover {
    color: var(--apple-text-primary);

    background: rgba(192, 132, 252, 0.07);

    border-color: rgba(192, 132, 252, 0.12);

    transform: translateY(-1px);
}

.nav-link:hover::after {
    width: 18px;
}


/* active */

.nav-link.active {
    color: #ffffff;

    background:
        linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.14),
            rgba(103, 232, 249, 0.05)
        );

    border-color: rgba(192, 132, 252, 0.2);

    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.nav-link.active::after {
    width: 20px;
}


/* =========================================================
   MOBILE BUTTON
   ========================================================= */

.mobile-menu-btn {
    display: none;

    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    padding: 0;

    border: 1px solid rgba(192, 132, 252, 0.15);
    border-radius: 10px;

    background: rgba(255, 255, 255, 0.03);

    cursor: pointer;

    z-index: 999999 !important;

    pointer-events: auto !important;

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
}

.mobile-menu-btn:hover {
    background: rgba(192, 132, 252, 0.1);

    border-color: rgba(192, 132, 252, 0.3);

    transform: translateY(-1px);
}


/* hamburger */

.hamburger-line {
    display: block;

    width: 18px;
    height: 1.5px;

    margin: 2.5px 0;

    border-radius: 999px;

    background: var(--apple-text-primary);

    transition: all 0.25s ease;
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

.mobile-menu {
    position: fixed !important;

    top: 0 !important;
    left: 0 !important;

    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;

    background: #07040f !important;

    z-index: 999999 !important;

    opacity: 0;
    visibility: hidden;

    pointer-events: none;

    transition:
        opacity 0.3s ease,
        visibility 0.3s ease;

    overscroll-behavior: contain;
}

.mobile-menu.open {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;
}


/* =========================================================
   MOBILE CLOSE
   ========================================================= */

.mobile-close-btn {
    position: absolute;

    top: 24px;
    right: 24px;

    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    border: 1px solid rgba(192, 132, 252, 0.18);

    background: rgba(255, 255, 255, 0.04);

    color: white;

    cursor: pointer;

    font-size: 1rem;

    z-index: 2147483647 !important;

    opacity: 0;

    transform: scale(0.9);

    transition:
        opacity 0.3s ease,
        transform 0.3s ease,
        background 0.25s ease;
}

.mobile-menu.open .mobile-close-btn {
    opacity: 1;

    transform: scale(1);

    transition-delay: 0.15s;
}

.mobile-close-btn:hover {
    background: rgba(192, 132, 252, 0.12);

    transform: scale(1.05);
}


/* =========================================================
   MOBILE CONTENT
   ========================================================= */

.mobile-menu-content {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 80px 24px;

    transform: translateY(15px);

    transition:
        transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.open .mobile-menu-content {
    transform: translateY(0);
}


/* ambient glow */

.mobile-menu-content::before {
    content: '';

    position: absolute;

    width: 500px;
    height: 500px;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    background:
        radial-gradient(
            circle,
            rgba(168, 85, 247, 0.12),
            transparent 68%
        );

    pointer-events: none;
}


/* =========================================================
   MOBILE LINKS
   ========================================================= */

.mobile-nav-links {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: min(360px, 100%);

    gap: 8px;

    text-align: center;
}

.mobile-nav-link {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    padding: 15px 20px;

    border-radius: 12px;

    border: 1px solid rgba(255, 255, 255, 0.06);

    background: rgba(255, 255, 255, 0.025);

    color: var(--apple-text-primary);

    text-decoration: none;

    font-size: 1.05rem;
    font-weight: 600;

    opacity: 0;
    transform: translateY(12px);

    transition:
        opacity 0.45s ease,
        transform 0.45s ease,
        background 0.25s ease,
        border-color 0.25s ease;
}

.mobile-menu.open .mobile-nav-link {
    opacity: 1;
    transform: translateY(0);
}

.mobile-menu.open .mobile-nav-link:nth-child(1) {
    transition-delay: 0.08s;
}

.mobile-menu.open .mobile-nav-link:nth-child(2) {
    transition-delay: 0.14s;
}

.mobile-menu.open .mobile-nav-link:nth-child(3) {
    transition-delay: 0.20s;
}

.mobile-menu.open .mobile-nav-link:nth-child(4) {
    transition-delay: 0.26s;
}

.mobile-nav-link:hover {
    background: rgba(168, 85, 247, 0.08);

    border-color: rgba(192, 132, 252, 0.2);
}


/* =========================================================
   MOBILE LANGUAGE
   ========================================================= */

.mobile-language-section {
    position: relative;
    z-index: 2;

    width: min(360px, 100%);

    margin-top: 30px;

    text-align: center;

    opacity: 0;
    transform: translateY(12px);

    transition:
        opacity 0.45s ease,
        transform 0.45s ease;
}

.mobile-menu.open .mobile-language-section {
    opacity: 1;

    transform: translateY(0);

    transition-delay: 0.32s;
}

.mobile-language-title {
    margin-bottom: 12px;

    color: var(--apple-text-tertiary);

    font-family: var(--font-mono);

    font-size: 0.65rem;

    font-weight: 500;

    letter-spacing: 0.15em;

    text-transform: uppercase;
}

.mobile-language-options {
    display: flex;

    justify-content: center;

    gap: 8px;
}

.mobile-language-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 8px;

    min-width: 120px;

    padding: 11px 16px;

    border-radius: 10px;

    border: 1px solid rgba(255, 255, 255, 0.07);

    background: rgba(255, 255, 255, 0.03);

    color: var(--apple-text-secondary);

    cursor: pointer;

    font-family: var(--font-system);

    font-size: 0.85rem;

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease;
}

.mobile-language-btn:hover {
    transform: translateY(-1px);

    background: rgba(192, 132, 252, 0.08);

    border-color: rgba(192, 132, 252, 0.2);

    color: var(--apple-text-primary);
}

.mobile-language-btn.active {
    background:
        linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.2),
            rgba(103, 232, 249, 0.08)
        );

    border-color: rgba(192, 132, 252, 0.3);

    color: white;

    box-shadow:
        0 6px 20px rgba(168, 85, 247, 0.12);
}

.flag-emoji {
    font-size: 1.05rem;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 768px) {

    .apple-header {
        top: 12px !important;
    }

    .header-nav {
        width: calc(100% - 24px);

        padding: 6px;

        border-radius: 15px;
    }

    .apple-header.scrolled {
        top: 8px !important;
    }

    .apple-header.scrolled .header-nav {
        width: calc(100% - 20px);

        padding: 5px;

        border-radius: 14px;
    }

    .nav-content {
        min-height: 50px;

        padding: 0 6px;
    }

    .logo {
        gap: 8px;
    }

    .logo-text {
        font-size: 0.95rem;
    }

    .desktop-nav {
        display: none !important;
    }

    .mobile-menu-btn {
        display: flex !important;
    }
}


/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 420px) {

    .apple-header {
        top: 8px !important;
    }

    .header-nav {
        width: calc(100% - 16px);
    }

    .logo-text {
        font-size: 0.9rem;
    }

    .mobile-menu-btn {
        width: 38px;
        height: 38px;
    }

}


/* =========================================================
   ACCESSIBILITY
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

    .apple-header,
    .header-nav,
    .nav-link,
    .mobile-menu,
    .mobile-menu-content,
    .mobile-nav-link {
        transition: none !important;
    }

}

</style>
