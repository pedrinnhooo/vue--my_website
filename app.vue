<template>
  <Analytics />
  <SpeedInsights />

  <div class="site-shell">
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

import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
</script>

<style>
.site-shell {
  min-height: 100vh;
  width: 100%;
  background: transparent;
  color: var(--apple-text-primary);
  font-family: var(--font-system);
  position: relative;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
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

/* Global Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--apple-dark-2);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7, #67e8f9);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c084fc;
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