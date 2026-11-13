<template>
  <Analytics />
  <SpeedInsights />

  <div class="site-shell">
    <div class="site-bg" aria-hidden="true"></div>

    <Header />

    <main class="main-content">
      <transition name="page" mode="out-in">
        <NuxtPage />
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from '@vercel/speed-insights/nuxt';

import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
</script>

<style>
.site-shell {
  min-height: 100vh;
  width: 100%;
  background: transparent;
  color: var(--apple-text-primary);
  font-family: var(--font-system);
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
}

.site-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -2;
  pointer-events: none;
  background-color: #05030b;
  background-image:
    linear-gradient(180deg, rgba(5, 3, 11, 0.22) 0%, rgba(5, 3, 11, 0.4) 42%, rgba(5, 3, 11, 0.62) 100%),
    url('/images/site/earth-milky-way-galaxy-night.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
  transform: translateZ(0);
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Floating scrollbar — transparent track so bg shows through (no black gap) */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.85), rgba(232, 121, 249, 0.75));
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #c084fc, #e879f9);
  background-clip: padding-box;
  border: 2px solid transparent;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::selection {
  background: rgba(168, 85, 247, 0.55);
  color: white;
}

::-moz-selection {
  background: rgba(168, 85, 247, 0.55);
  color: white;
}
</style>