import { ref, onMounted, onUnmounted } from 'vue'

let standardObserver = null
let observerGeneration = 0

const revealOnIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('in-view')
    observer.unobserve(entry.target)
  })
}

// Threshold is 0 so a tall card (experience) starts with the same fade as a
// short one (still) when its top enters. A 10% threshold waited for hundreds
// of pixels of the experience block and made that card feel late.
export const initScrollAnimations = () => {
  if (typeof window === 'undefined') return () => {}

  const generation = ++observerGeneration
  standardObserver?.disconnect()

  standardObserver = new IntersectionObserver(revealOnIntersect, {
    threshold: 0,
    rootMargin: '0px 0px -32px 0px'
  })

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    if (el.classList.contains('in-view')) return
    standardObserver.observe(el)
  })

  return () => {
    if (generation !== observerGeneration) return
    standardObserver?.disconnect()
  }
}

export const useScrollAnimation = () => {
  const elements = ref([])
  let stop = () => {}

  onMounted(() => {
    elements.value = document.querySelectorAll('.scroll-animate')
    stop = initScrollAnimations()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    elements
  }
}

export const useParallax = () => {
  const parallaxElements = ref([])
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset
    
    parallaxElements.value.forEach((element) => {
      const rate = scrolled * -0.5
      element.style.transform = `translateY(${rate}px)`
    })
  }
  
  onMounted(() => {
    parallaxElements.value = document.querySelectorAll('.parallax-element')
    window.addEventListener('scroll', updateParallax)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateParallax)
  })
  
  return {
    parallaxElements
  }
}

export const useMouseTracker = () => {
  const mouseX = ref(0)
  const mouseY = ref(0)
  
  const updateMouse = (event) => {
    mouseX.value = event.clientX
    mouseY.value = event.clientY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })
  
  return {
    mouseX,
    mouseY
  }
}

export const useTypewriter = (text, speed = 100) => {
  const displayText = ref('')
  const isComplete = ref(false)
  let currentTimer = null
  
  const startTypewriter = () => {
    // Clear any existing timer
    if (currentTimer) {
      clearInterval(currentTimer)
      currentTimer = null
    }
    
    // Reset state
    displayText.value = ''
    isComplete.value = false
    
    // Get current text value (handle computed refs)
    let currentText = ''
    if (typeof text === 'function') {
      currentText = text()
    } else if (text && typeof text === 'object' && text.value !== undefined) {
      currentText = text.value
    } else {
      currentText = text || ''
    }
    
    if (!currentText) return
    
    let i = 0
    currentTimer = setInterval(() => {
      if (i < currentText.length) {
        displayText.value += currentText.charAt(i)
        i++
      } else {
        clearInterval(currentTimer)
        currentTimer = null
        isComplete.value = true
      }
    }, speed)
  }
  
  // Cleanup function
  const cleanup = () => {
    if (currentTimer) {
      clearInterval(currentTimer)
      currentTimer = null
    }
  }
  
  return {
    displayText,
    isComplete,
    startTypewriter,
    cleanup
  }
}

export const useCountUp = (target, duration = 2000) => {
  const current = ref(0)
  
  const startCountUp = () => {
    const start = Date.now()
    const end = start + duration
    
    const timer = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max((end - now) / duration, 0)
      const progress = 1 - remaining
      
      current.value = Math.round(progress * target)
      
      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16)
  }
  
  return {
    current,
    startCountUp
  }
}