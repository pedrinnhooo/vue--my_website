import { initScrollAnimations } from '~/composables/useAnimations'

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  document.documentElement.style.scrollBehavior = 'smooth'

  const observeScrollAnimations = () => {
    initScrollAnimations()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeScrollAnimations)
  } else {
    observeScrollAnimations()
  }

  window.addEventListener('nuxt:page:finish', observeScrollAnimations)
})