<template>
  <footer class="apple-footer">
    <div class="container-apple footer-grid">
      <div class="footer-brand-section">
        <NuxtLink to="/" class="footer-brand">
          <OrangeLogo size="large" variant="gradient" />
          <span class="brand-text">{{ t('footer.brand') }}</span>
        </NuxtLink>
        <p class="brand-description">
          {{ t('footer.description') }}
        </p>
      </div>

      <div class="nav-column">
        <h4 class="nav-title">{{ t('footer.columns.navigation.title') }}</h4>
        <ul class="nav-list">
          <li><NuxtLink to="/" class="nav-link">{{ t('footer.columns.navigation.links.home') }}</NuxtLink></li>
          <li><NuxtLink to="/sobre" class="nav-link">{{ t('footer.columns.navigation.links.about') }}</NuxtLink></li>
          <li><NuxtLink to="/projetos" class="nav-link">{{ t('footer.columns.navigation.links.projects') }}</NuxtLink></li>
          <li><NuxtLink to="/contato" class="nav-link">{{ t('footer.columns.navigation.links.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div class="nav-column">
        <h4 class="nav-title">{{ t('footer.columns.services.title') }}</h4>
        <ul class="nav-list">
          <li v-for="service in t('footer.columns.services.items')" :key="service">
            <span class="nav-link">{{ service }}</span>
          </li>
        </ul>
      </div>

      <div class="nav-column footer-tech-col">
        <h4 class="nav-title">{{ t('footer.columns.tech.title') }}</h4>
        <ul class="nav-list">
          <li v-for="tech in t('footer.columns.tech.items')" :key="tech">
            <span class="nav-link">{{ tech }}</span>
          </li>
        </ul>
      </div>

      <div class="footer-rule" aria-hidden="true"></div>

      <p class="copyright">
        &copy; {{ currentYear }} Pedro Ruffo. {{ t('footer.bottom.copyright') }}
      </p>

      <div class="social-links">
        <a
          href="https://github.com/pedrinnhooo"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="t('footer.social.github')"
        >
          <i class="bi bi-github"></i>
        </a>
        <a
          href="https://linkedin.com/in/pedro-ruffo-501385181"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="t('footer.social.linkedin')"
        >
          <i class="bi bi-linkedin"></i>
        </a>
        <a
          href="https://wa.me/5511912117442"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="t('footer.social.whatsapp')"
        >
          <i class="bi bi-whatsapp"></i>
        </a>
        <a
          href="https://discord.gg/NwWySEJF"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="t('footer.social.discord')"
        >
          <i class="bi bi-discord"></i>
        </a>
        <a
          href="mailto:pedro.ruffo.dev@gmail.com"
          class="social-link"
          :aria-label="t('footer.social.email')"
        >
          <i class="bi bi-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.apple-footer {
  background: transparent;
  border-top: 1px solid rgba(183, 163, 227, 0.16);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
  margin-top: auto;
  position: relative;
  width: 100%;
}

.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) repeat(2, minmax(0, 1fr)) max-content;
  column-gap: 28px;
  row-gap: 0;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

.footer-brand-section {
  max-width: 260px;
  margin-bottom: var(--spacing-2xl);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  color: var(--apple-text-primary);
  margin-bottom: var(--spacing-lg);
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--apple-text-primary);
}

.brand-description {
  color: var(--apple-text-secondary);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 0;
}

.nav-column {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-2xl);
}

.footer-tech-col {
  align-items: flex-start;
  width: max-content;
  max-width: 100%;
  justify-self: start;
}

.nav-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--apple-text-primary);
  margin: 0 0 var(--spacing-md);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-link {
  color: var(--apple-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color var(--transition-normal);
  cursor: pointer;
}

.nav-link:hover {
  color: #d8c8f0;
}

.footer-rule {
  grid-column: 1 / -1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 0 var(--spacing-xl);
}

.copyright {
  grid-column: 1 / -1;
  margin: 0 0 14px;
  color: var(--apple-text-tertiary);
  font-size: 0.875rem;
  text-align: center;
  justify-self: center;
}

.social-links {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: center;
  justify-self: center;
  align-self: center;
  width: max-content;
  max-width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.social-link {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  border: 1px solid rgba(226, 220, 235, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(232, 226, 240, 0.72);
  text-decoration: none;
  font-size: 0.86rem;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.social-link:hover {
  transform: translateY(-2px);
  color: #f4f1f8;
  border-color: rgba(183, 163, 227, 0.45);
  background: rgba(183, 163, 227, 0.16);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand-section {
    grid-column: 1 / -1;
    max-width: none;
  }

  .footer-tech-col {
    grid-column: 1 / -1;
    width: 100%;
    max-width: none;
    justify-self: stretch;
    align-items: center;
    text-align: center;
  }

  .footer-tech-col .nav-list {
    align-items: center;
  }
}

@media (max-width: 720px) {
  .apple-footer {
    padding: var(--spacing-2xl) 0 var(--spacing-lg);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }

  .footer-brand-section {
    width: 100%;
    max-width: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand {
    flex-direction: column;
    text-align: center;
  }

  .brand-description,
  .copyright {
    text-align: center;
  }

  .nav-column,
  .footer-tech-col {
    width: 100%;
    max-width: none;
    justify-self: stretch;
    align-items: center;
    text-align: center;
  }

  .nav-list {
    align-items: center;
  }

  .copyright,
  .social-links {
    grid-column: 1 / -1;
    justify-self: center;
  }
}
</style>
