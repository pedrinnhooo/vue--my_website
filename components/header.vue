<template>
    <!-- =====================================================
         HEADER
         ===================================================== -->
    <header
        class="apple-header"
        :class="{ scrolled: isScrolled }"
    >
        <nav class="header-nav">
            <div class="container-apple">

                <div class="nav-content">

                    <!-- LOGO -->
                    <NuxtLink
                        to="/"
                        class="logo-link"
                        @click="closeMobileMenu"
                    >
                        <div class="logo">

                            <OrangeLogo
                                size="medium"
                                variant="glow"
                            />

                            <span class="logo-text">
                                {{ t('header.brand') }}
                            </span>

                        </div>
                    </NuxtLink>


                    <!-- =================================================
                         DESKTOP NAV
                         ================================================= -->
                    <div class="nav-links desktop-nav">

                        <NuxtLink
                            v-for="link in navLinks"
                            :key="link.path"
                            :to="link.path"
                            class="nav-link"
                            :class="{
                                active: $route.path === link.path
                            }"
                        >
                            {{ link.name }}
                        </NuxtLink>

                        <LanguageSelector />

                    </div>


                    <!-- =================================================
                         MOBILE BUTTON
                         ================================================= -->
                    <button
                        type="button"
                        class="mobile-menu-btn"
                        :class="{ open: isMobileMenuOpen }"
                        :aria-label="
                            isMobileMenuOpen
                                ? 'Fechar menu'
                                : 'Abrir menu'
                        "
                        :aria-expanded="isMobileMenuOpen"
                        @click.stop.prevent="toggleMobileMenu"
                    >
                        <i
                            :class="
                                isMobileMenuOpen
                                    ? 'bi bi-x-lg'
                                    : 'bi bi-list'
                            "
                        ></i>
                    </button>

                </div>

            </div>
        </nav>
    </header>


    <!-- =========================================================
         MOBILE FULLSCREEN MENU
         FICA FORA DO HEADER
         ========================================================= -->
    <Teleport to="body">

        <Transition name="mobile-menu-transition">

            <div
                v-if="isMobileMenuOpen"
                class="mobile-menu"
                @click.self="closeMobileMenu"
            >

                <!-- =================================================
                     BACKGROUND
                     ================================================= -->
                <div class="mobile-menu-background">

                    <div class="mobile-grid"></div>

                    <div class="mobile-orb mobile-orb-one"></div>

                    <div class="mobile-orb mobile-orb-two"></div>

                    <div class="mobile-glow-line"></div>

                </div>


                <!-- =================================================
                     MENU SHELL
                     ================================================= -->
                <div class="mobile-menu-shell">


                    <!-- =================================================
                         MOBILE HEADER
                         ================================================= -->
                    <header class="mobile-menu-header">

                        <!-- LOGO -->
                        <NuxtLink
                            to="/"
                            class="mobile-menu-logo"
                            @click="closeMobileMenu"
                        >

                            <OrangeLogo
                                size="medium"
                                variant="glow"
                            />

                            <span>
                                {{ t('header.brand') }}
                            </span>

                        </NuxtLink>


                        <!-- CLOSE -->
                        <button
                            type="button"
                            class="mobile-close-btn"
                            aria-label="Fechar menu"
                            @click="closeMobileMenu"
                        >
                            <i class="bi bi-x-lg"></i>
                        </button>

                    </header>


                    <!-- =================================================
                         MAIN
                         ================================================= -->
                    <main class="mobile-menu-main">


                        <!-- LABEL -->
                        <div class="mobile-menu-eyebrow">

                            <span>
                                MENU
                            </span>

                            <span class="eyebrow-line"></span>

                            <span>
                                2026
                            </span>

                        </div>


                        <!-- =================================================
                             NAVIGATION
                             ================================================= -->
                        <nav class="mobile-nav-links">

                            <NuxtLink
                                v-for="(link, index) in navLinks"
                                :key="link.path"
                                :to="link.path"
                                class="mobile-nav-link"
                                :style="{
                                    '--delay': `${index * 70}ms`
                                }"
                                @click="closeMobileMenu"
                            >

                                <span class="mobile-link-number">
                                    0{{ index + 1 }}
                                </span>

                                <span class="mobile-link-name">
                                    {{ link.name }}
                                </span>

                                <span class="mobile-link-arrow">
                                    ↗
                                </span>

                            </NuxtLink>

                        </nav>


                        <!-- =================================================
                             LANGUAGE
                             ================================================= -->
                        <div class="mobile-language">

                            <div class="mobile-language-title">
                                {{ t('common.language') || 'Idioma' }}
                            </div>

                            <div class="mobile-language-options">

                                <button
                                    type="button"
                                    class="mobile-language-btn"
                                    :class="{
                                        active: locale === 'pt'
                                    }"
                                    @click="selectLanguage('pt')"
                                >

                                    <span class="flag-emoji">
                                        🇧🇷
                                    </span>

                                    <span>
                                        Português
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    class="mobile-language-btn"
                                    :class="{
                                        active: locale === 'en'
                                    }"
                                    @click="selectLanguage('en')"
                                >

                                    <span class="flag-emoji">
                                        🇺🇸
                                    </span>

                                    <span>
                                        English
                                    </span>

                                </button>

                            </div>

                        </div>

                    </main>


                    <!-- =================================================
                         FOOTER
                         ================================================= -->
                    <footer class="mobile-menu-footer">

                        <span>
                            TECH · MOBILE · BACKEND
                        </span>

                        <span class="mobile-footer-line"></span>

                        <span>
                            2026
                        </span>

                    </footer>

                </div>

            </div>

        </Transition>

    </Teleport>

</template>


<script setup>

import {
    ref,
    computed,
    onMounted,
    onUnmounted
} from 'vue'


/* =========================================================
   I18N
   ========================================================= */

const {
    t,
    locale,
    setLocale
} = useI18n()


/* =========================================================
   STATE
   ========================================================= */

const isMobileMenuOpen = ref(false)

const isScrolled = ref(false)


/* =========================================================
   NAVIGATION
   ========================================================= */

const navLinks = computed(() => [

    {
        name: t('header.links.home'),
        path: '/'
    },

    {
        name: t('header.links.about'),
        path: '/sobre'
    },

    {
        name: t('header.links.projects'),
        path: '/projetos'
    },

    {
        name: t('header.links.contact'),
        path: '/contato'
    }

])


/* =========================================================
   MOBILE MENU
   ========================================================= */

const toggleMobileMenu = () => {

    isMobileMenuOpen.value =
        !isMobileMenuOpen.value

    updateBodyScroll()

}


const closeMobileMenu = () => {

    isMobileMenuOpen.value = false

    updateBodyScroll()

}


const updateBodyScroll = () => {

    if (typeof document === 'undefined') {
        return
    }

    if (isMobileMenuOpen.value) {

        document.body.style.overflow = 'hidden'

        document.documentElement.style.overflow = 'hidden'

        document.body.classList.add(
            'mobile-menu-open'
        )

    } else {

        document.body.style.overflow = ''

        document.documentElement.style.overflow = ''

        document.body.classList.remove(
            'mobile-menu-open'
        )

    }

}


/* =========================================================
   LANGUAGE
   ========================================================= */

const selectLanguage = (lang) => {

    setLocale(lang)

    closeMobileMenu()

}


/* =========================================================
   SCROLL
   ========================================================= */

const handleScroll = () => {

    isScrolled.value =
        window.scrollY > 30

}


/* =========================================================
   MOUNT
   ========================================================= */

onMounted(() => {

    handleScroll()

    window.addEventListener(
        'scroll',
        handleScroll,
        {
            passive: true
        }
    )

})


/* =========================================================
   UNMOUNT
   ========================================================= */

onUnmounted(() => {

    window.removeEventListener(
        'scroll',
        handleScroll
    )

    document.body.style.overflow = ''

    document.documentElement.style.overflow = ''

    document.body.classList.remove(
        'mobile-menu-open'
    )

})

</script>


<style scoped>

/* =========================================================
   HEADER
   ========================================================= */

.apple-header {

    position: fixed !important;

    top: 18px !important;

    left: 0 !important;
    right: 0 !important;

    width: 100%;

    z-index: 1000 !important;

    display: flex;

    justify-content: center;

    background: transparent;

    pointer-events: none;

}


/* =========================================================
   NAV BAR
   ========================================================= */

.header-nav {

    position: relative;

    width:
        min(
            1214px,
            calc(100% - 40px)
        );

    padding: 8px;

    pointer-events: auto;

    background: #0b0713;

    border:
        1px solid
        rgba(192,132,252,.18);

    border-radius: 18px;

    box-shadow:

        0 10px 30px
        rgba(0,0,0,.32),

        0 2px 0
        rgba(255,255,255,.035)
        inset,

        0 0 0 1px
        rgba(255,255,255,.015);

    transition:

        background .3s ease,

        border-color .3s ease,

        box-shadow .3s ease;

}


/* linha superior */

.header-nav::before {

    content: '';

    position: absolute;

    top: 0;

    left: 20px;
    right: 20px;

    height: 1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(103,232,249,.35),
            rgba(192,132,252,.45),
            transparent
        );

    opacity: .65;

    pointer-events: none;

}


/* =========================================================
   SCROLLED
   IMPORTANTE:
   NÃO ALTERA TAMANHO
   ========================================================= */

.apple-header.scrolled .header-nav {

    background: #0a0611;

    border-color:
        rgba(192,132,252,.24);

    box-shadow:

        0 16px 42px
        rgba(0,0,0,.46),

        0 2px 0
        rgba(255,255,255,.035)
        inset,

        0 0 30px
        rgba(168,85,247,.035);

}


/* =========================================================
   CONTAINER
   ========================================================= */

.header-nav .container-apple {

    width: 100%;

    max-width: none;

    padding: 0;

    margin: 0;

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

    position: relative;

    z-index: 5;

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

    flex-shrink: 0;

}


.logo {

    display: flex;

    align-items: center;

    gap: 10px;

}


.logo-text {

    font-family:
        var(--font-display);

    font-size: 1.05rem;

    font-weight: 700;

    letter-spacing: -.025em;

    color:
        var(--apple-text-primary);

    white-space: nowrap;

    transition:
        color .25s ease;

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

    gap: 3px;

}


/* =========================================================
   DESKTOP LINKS
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

    color:
        var(--apple-text-secondary);

    text-decoration: none;

    font-family:
        var(--font-system);

    font-size: .82rem;

    font-weight: 500;

    transition:

        color .25s ease,

        background .25s ease,

        border-color .25s ease,

        transform .25s ease;

}


.nav-link::after {

    content: '';

    position: absolute;

    left: 50%;

    bottom: 5px;

    width: 0;

    height: 2px;

    border-radius: 999px;

    background:
        linear-gradient(
            90deg,
            var(--neon-cyan),
            var(--neon-purple)
        );

    transform:
        translateX(-50%);

    transition:
        width .25s ease;

    box-shadow:
        0 0 8px
        rgba(103,232,249,.45);

}


.nav-link:hover {

    color:
        var(--apple-text-primary);

    background:
        rgba(192,132,252,.07);

    border-color:
        rgba(192,132,252,.13);

    transform:
        translateY(-1px);

}


.nav-link:hover::after {

    width: 18px;

}


.nav-link.active {

    color: #fff;

    background:
        linear-gradient(
            135deg,
            rgba(168,85,247,.16),
            rgba(103,232,249,.055)
        );

    border-color:
        rgba(192,132,252,.22);

    box-shadow:
        inset
        0 1px 0
        rgba(255,255,255,.045);

}


.nav-link.active::after {

    width: 20px;

}


/* =========================================================
   MOBILE BUTTON
   ========================================================= */

.mobile-menu-btn {

    display: none;

    width: 42px;
    height: 42px;

    padding: 0;

    align-items: center;
    justify-content: center;

    border-radius: 11px;

    border:
        1px solid
        rgba(192,132,252,.18);

    background:
        rgba(255,255,255,.035);

    color:
        var(--apple-text-primary);

    cursor: pointer;

    font-size: 1.35rem;

    line-height: 1;

    flex-shrink: 0;

    position: relative;

    z-index: 2;

    transition:

        background .25s ease,

        border-color .25s ease,

        color .25s ease,

        transform .25s ease;

}


.mobile-menu-btn i {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 100%;
    height: 100%;

    pointer-events: none;

}


.mobile-menu-btn:hover {

    background:
        rgba(168,85,247,.12);

    border-color:
        rgba(192,132,252,.35);

    color: #fff;

}


.mobile-menu-btn.open {

    background:
        rgba(168,85,247,.14);

    border-color:
        rgba(192,132,252,.34);

    color: #fff;

}


/* =========================================================
   FULLSCREEN MOBILE MENU
   ========================================================= */

.mobile-menu {

    position: fixed !important;

    inset: 0 !important;

    /* width: 100vw !important; */

    /* height: 100vh !important; */

    /* height: 100dvh !important; */

    margin: 0 !important;

    padding: 0 !important;

    overflow: hidden !important;

    background:
        #07040f !important;

    z-index: 999999 !important;

    isolation: isolate;

}


/* =========================================================
   BACKGROUND
   ========================================================= */

.mobile-menu-background {

    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    pointer-events: none;

}


.mobile-grid {

    position: absolute;

    inset: 0;

    opacity: .16;

    background-image:

        linear-gradient(
            rgba(192,132,252,.045) 1px,
            transparent 1px
        ),

        linear-gradient(
            90deg,
            rgba(192,132,252,.045) 1px,
            transparent 1px
        );

    background-size: 48px 48px;

    mask-image:
        linear-gradient(
            to bottom,
            black 0%,
            black 55%,
            transparent 100%
        );

}


.mobile-orb {

    position: absolute;

    border-radius: 50%;

    pointer-events: none;

}


.mobile-orb-one {

    width: 520px;
    height: 520px;

    top: -280px;
    right: -230px;

    background:
        radial-gradient(
            circle,
            rgba(168,85,247,.18),
            rgba(168,85,247,.06) 35%,
            transparent 70%
        );

    filter: blur(10px);

}


.mobile-orb-two {

    width: 460px;
    height: 460px;

    bottom: -260px;
    left: -240px;

    background:
        radial-gradient(
            circle,
            rgba(103,232,249,.10),
            rgba(103,232,249,.025) 40%,
            transparent 70%
        );

    filter: blur(12px);

}


.mobile-glow-line {

    position: absolute;

    top: 84px;

    left: 24px;
    right: 24px;

    height: 1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(103,232,249,.25),
            rgba(192,132,252,.45),
            transparent
        );

    opacity: .6;

}


/* =========================================================
   MENU SHELL
   ========================================================= */

.mobile-menu-shell {

    position: relative;

    width: 100%;

    height: 100%;

    min-height: 100dvh;

    display: flex;

    flex-direction: column;

    box-sizing: border-box;

}


/* =========================================================
   MOBILE HEADER
   ========================================================= */

.mobile-menu-header {

    position: relative;

    width: 100%;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding:

        max(
            18px,
            env(safe-area-inset-top)
        )

        24px

        18px;

    box-sizing: border-box;

    border-bottom:
        1px solid
        rgba(255,255,255,.055);

    background:
        rgba(7,4,15,.72);

}


.mobile-menu-logo {

    display: inline-flex;

    align-items: center;

    gap: 10px;

    color:
        var(--apple-text-primary);

    text-decoration: none;

}


.mobile-menu-logo span {

    font-family:
        var(--font-display);

    font-size: 1rem;

    font-weight: 700;

    letter-spacing: -.02em;

}


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

.mobile-close-btn {

    width: 48px;
    height: 48px;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 0;

    border-radius: 14px;

    border:
        1px solid
        rgba(192,132,252,.35);

    background:
        linear-gradient(
            135deg,
            rgba(168,85,247,.14),
            rgba(103,232,249,.025)
        );

    color: #fff;

    cursor: pointer;

    font-size: 1.15rem;

    box-shadow:

        0 0 0 1px
        rgba(255,255,255,.025)
        inset,

        0 10px 30px
        rgba(0,0,0,.25);

    transition:

        transform .25s ease,

        background .25s ease,

        border-color .25s ease;

}


.mobile-close-btn:hover {

    transform:
        rotate(4deg);

    background:
        linear-gradient(
            135deg,
            rgba(168,85,247,.24),
            rgba(103,232,249,.06)
        );

    border-color:
        rgba(192,132,252,.55);

}


.mobile-close-btn i {

    pointer-events: none;

}


/* =========================================================
   MAIN
   ========================================================= */

.mobile-menu-main {

    position: relative;

    flex: 1;

    width: 100%;

    display: flex;

    flex-direction: column;

    justify-content: center;

    box-sizing: border-box;

    padding:

        38px

        24px

        100px;

}


/* =========================================================
   EYEBROW
   ========================================================= */

.mobile-menu-eyebrow {

    width:
        min(
            620px,
            100%
        );

    display: flex;

    align-items: center;

    gap: 14px;

    margin:
        0 auto 18px;

    font-family:
        var(--font-mono);

    font-size: .58rem;

    letter-spacing: .18em;

    text-transform: uppercase;

    color:
        var(--apple-text-tertiary);

}


.eyebrow-line {

    flex: 1;

    height: 1px;

    background:
        linear-gradient(
            90deg,
            rgba(192,132,252,.35),
            transparent
        );

}


/* =========================================================
   MOBILE LINKS
   ========================================================= */

.mobile-nav-links {

    width:
        min(
            620px,
            100%
        );

    margin: 0 auto;

    display: flex;

    flex-direction: column;

    gap: 8px;

}


.mobile-nav-link {

    position: relative;

    width: 100%;

    min-height: 72px;

    display: grid;

    grid-template-columns:
        42px
        1fr
        40px;

    align-items: center;

    padding: 0 20px;

    box-sizing: border-box;

    border-radius: 14px;

    border:
        1px solid
        rgba(255,255,255,.055);

    background:
        linear-gradient(
            90deg,
            rgba(255,255,255,.025),
            rgba(255,255,255,.012)
        );

    color:
        var(--apple-text-primary);

    text-decoration: none;

    opacity: 0;

    transform:
        translateY(12px);

    animation:
        mobileLinkIn
        .45s
        cubic-bezier(.2,.8,.2,1)
        forwards;

    animation-delay:
        var(--delay);

    transition:

        transform .25s ease,

        background .25s ease,

        border-color .25s ease;

}


.mobile-nav-link:hover {

    transform:
        translateX(5px);

    border-color:
        rgba(192,132,252,.28);

    background:
        linear-gradient(
            90deg,
            rgba(168,85,247,.13),
            rgba(103,232,249,.025)
        );

}


.mobile-link-number {

    font-family:
        var(--font-mono);

    font-size: .62rem;

    letter-spacing: .08em;

    color:
        var(--apple-text-tertiary);

}


.mobile-link-name {

    font-family:
        var(--font-display);

    font-size: 1.18rem;

    font-weight: 650;

    letter-spacing: -.025em;

}


.mobile-link-arrow {

    justify-self: end;

    font-size: 1.3rem;

    color:
        var(--apple-text-tertiary);

    transition:

        transform .25s ease,

        color .25s ease;

}


.mobile-nav-link:hover
.mobile-link-arrow {

    color:
        var(--neon-cyan);

    transform:
        translate(3px,-3px);

}


/* =========================================================
   LANGUAGE
   ========================================================= */

.mobile-language {

    width:
        min(
            620px,
            100%
        );

    margin:
        30px auto 0;

    opacity: 0;

    transform:
        translateY(10px);

    animation:
        mobileLanguageIn
        .45s
        ease
        .35s
        forwards;

}


.mobile-language-title {

    margin-bottom: 10px;

    font-family:
        var(--font-mono);

    font-size: .58rem;

    letter-spacing: .18em;

    text-transform: uppercase;

    color:
        var(--apple-text-tertiary);

}


.mobile-language-options {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 8px;

}


.mobile-language-btn {

    min-height: 48px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    border-radius: 12px;

    border:
        1px solid
        rgba(255,255,255,.06);

    background:
        rgba(255,255,255,.02);

    color:
        var(--apple-text-secondary);

    cursor: pointer;

    font-family:
        var(--font-system);

    font-size: .82rem;

    transition:

        background .25s ease,

        border-color .25s ease,

        color .25s ease;

}


.mobile-language-btn:hover {

    color: #fff;

    border-color:
        rgba(192,132,252,.25);

    background:
        rgba(168,85,247,.08);

}


.mobile-language-btn.active {

    color: #fff;

    border-color:
        rgba(192,132,252,.4);

    background:
        linear-gradient(
            135deg,
            rgba(168,85,247,.16),
            rgba(103,232,249,.04)
        );

}


.flag-emoji {

    font-size: 1rem;

}


/* =========================================================
   FOOTER
   ========================================================= */

.mobile-menu-footer {

    position: absolute;

    left: 24px;

    right: 24px;

    bottom:
        max(
            20px,
            env(safe-area-inset-bottom)
        );

    display: flex;

    align-items: center;

    gap: 12px;

    font-family:
        var(--font-mono);

    font-size: .52rem;

    letter-spacing: .14em;

    color:
        var(--apple-text-tertiary);

}


.mobile-footer-line {

    flex: 1;

    height: 1px;

    background:
        linear-gradient(
            90deg,
            rgba(192,132,252,.35),
            transparent
        );

}


/* =========================================================
   ANIMATIONS
   ========================================================= */

.mobile-menu-transition-enter-active,
.mobile-menu-transition-leave-active {

    transition:
        opacity .28s ease,
        transform .28s ease;

}


.mobile-menu-transition-enter-from,
.mobile-menu-transition-leave-to {

    opacity: 0;

    transform:
        scale(.985);

}


@keyframes mobileLinkIn {

    from {

        opacity: 0;

        transform:
            translateY(14px);

    }

    to {

        opacity: 1;

        transform:
            translateY(0);

    }

}


@keyframes mobileLanguageIn {

    from {

        opacity: 0;

        transform:
            translateY(12px);

    }

    to {

        opacity: 1;

        transform:
            translateY(0);

    }

}


/* =========================================================
   TABLET / MOBILE
   ========================================================= */

@media (max-width: 768px) {

    .apple-header {

        top: 12px !important;

    }


    .header-nav,
    .apple-header.scrolled .header-nav {

        width:
            calc(100% - 24px);

        padding: 6px;

        border-radius: 15px;

    }


    .nav-content {

        min-height: 50px;

        padding: 0 6px;

    }


    .logo {

        gap: 8px;

    }


    .logo-text {

        font-size: .95rem;

    }


    .desktop-nav {

        display: none !important;

    }


    .mobile-menu-btn {

        display: flex;

    }

}


/* =========================================================
   SMALL PHONES
   ========================================================= */

@media (max-width: 420px) {

    .apple-header {

        top: 9px !important;

    }


    .header-nav,
    .apple-header.scrolled .header-nav {

        width:
            calc(100% - 18px);

    }


    .logo-text {

        font-size: .9rem;

    }


    .mobile-menu-btn {

        width: 40px;

        height: 40px;

    }


    .mobile-menu-header {

        padding-left: 18px;

        padding-right: 18px;

    }


    .mobile-menu-main {

        padding-left: 18px;

        padding-right: 18px;

        padding-top: 28px;

    }


    .mobile-menu-eyebrow {

        margin-bottom: 14px;

    }


    .mobile-nav-link {

        min-height: 62px;

        grid-template-columns:
            34px
            1fr
            30px;

        padding-left: 15px;

        padding-right: 15px;

    }


    .mobile-link-name {

        font-size: 1.05rem;

    }


    .mobile-menu-footer {

        left: 18px;

        right: 18px;

        bottom: 18px;

    }

}


/* =========================================================
   VERY SMALL PHONES
   ========================================================= */

@media (max-width: 360px) {

    .mobile-menu-main {

        padding-top: 20px;

        padding-bottom: 90px;

    }


    .mobile-nav-links {

        gap: 6px;

    }


    .mobile-nav-link {

        min-height: 56px;

    }


    .mobile-language {

        margin-top: 20px;

    }


    .mobile-language-btn {

        min-height: 42px;

        font-size: .76rem;

    }


    .mobile-menu-footer {

        font-size: .45rem;

    }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

    .mobile-menu,
    .mobile-nav-link,
    .mobile-language,
    .mobile-menu-transition-enter-active,
    .mobile-menu-transition-leave-active {

        animation: none !important;

        transition: none !important;

    }

}

</style>