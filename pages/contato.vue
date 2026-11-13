<template>
  <div class="apple-contact">
    <section class="contact-hero page-hero">
      <div class="container-apple">
        <div class="hero-row scroll-animate">
          <div class="hero-copy">
            <p class="kicker">Contact</p>
            <h1 class="text-large-title gradient-text mb-lg">{{ t('contact.hero.title') }}</h1>
            <p class="hero-subtitle">{{ t('contact.hero.subtitle') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-main section-padding">
      <div class="container-apple contact-layout">
        <aside class="contact-side scroll-animate">
          <div class="side-card">
            <h2 class="side-title">{{ t('contact.info.title') }}</h2>
            <p class="side-desc">{{ t('contact.info.description') }}</p>

            <div class="contact-items">
              <a href="tel:+5511912117442" class="contact-item">
                <span class="icon-tile icon-tile--sm"><i class="bi bi-telephone"></i></span>
                <span class="contact-details">
                  <strong>{{ t('contact.info.items.phone.label') }}</strong>
                  <span>{{ t('contact.info.items.phone.value') }}</span>
                </span>
              </a>

              <a href="mailto:pedro.ruffo.dev@gmail.com" class="contact-item">
                <span class="icon-tile icon-tile--sm"><i class="bi bi-envelope"></i></span>
                <span class="contact-details">
                  <strong>{{ t('contact.info.items.email.label') }}</strong>
                  <span>{{ t('contact.info.items.email.value') }}</span>
                </span>
              </a>

              <div class="contact-item contact-item--static">
                <span class="icon-tile icon-tile--sm"><i class="bi bi-geo-alt"></i></span>
                <span class="contact-details">
                  <strong>{{ t('contact.info.items.location.label') }}</strong>
                  <span>{{ t('contact.info.items.location.value') }}</span>
                </span>
              </div>

              <div class="contact-item contact-item--static">
                <span class="icon-tile icon-tile--sm"><i class="bi bi-clock"></i></span>
                <span class="contact-details">
                  <strong>{{ t('contact.info.items.availability.label') }}</strong>
                  <span>{{ t('contact.info.items.availability.value') }}</span>
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div class="contact-form-wrap scroll-animate">
          <div class="form-card">
            <h3 class="form-title">{{ t('contact.form.title') }}</h3>

            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">{{ t('contact.form.labels.name') }}</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    :placeholder="t('contact.form.placeholders.name')"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">{{ t('contact.form.labels.email') }}</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    :placeholder="t('contact.form.placeholders.email')"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="phone" class="form-label">{{ t('contact.form.labels.phone') }}</label>
                <div class="phone-input-container">
                  <select v-model="form.countryCode" class="form-input country-select">
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+52">🇲🇽 +52</option>
                  </select>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="form-input phone-input"
                    :placeholder="getPhonePlaceholder()"
                    :maxlength="getMaxLength()"
                    required
                    @input="formatPhoneNumber"
                    @keypress="validatePhoneInput"
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">{{ t('contact.form.labels.subject') }}</label>
                <select id="subject" v-model="form.subject" class="form-input form-select" required>
                  <option value="" disabled>{{ t('contact.form.subject.placeholder') }}</option>
                  <option value="projeto">{{ t('contact.form.subject.options.projeto') }}</option>
                  <option value="consultoria">{{ t('contact.form.subject.options.consultoria') }}</option>
                  <option value="colaboracao">{{ t('contact.form.subject.options.colaboracao') }}</option>
                  <option value="outros">{{ t('contact.form.subject.options.outros') }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">{{ t('contact.form.labels.message') }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-textarea"
                  :placeholder="t('contact.form.placeholders.message')"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn-apple btn-apple-primary form-submit" :disabled="isSubmitting">
                <span v-if="!isSubmitting">
                  <i class="bi bi-send"></i> {{ t('contact.form.button.submit') }}
                </span>
                <span v-else>
                  <i class="bi bi-hourglass-split"></i> {{ t('contact.form.button.submitting') }}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
        <div class="modal-content" @click.stop>
          <div class="success-icon">
            <i class="bi bi-check-circle"></i>
          </div>
          <h3 class="text-title-2 mb-md">{{ t('contact.modal.success.title') }}</h3>
          <p class="text-body mb-lg" style="color: var(--apple-text-secondary);">
            {{ t('contact.modal.success.description') }}
          </p>
          <button class="btn-apple btn-apple-primary" @click="closeSuccessModal">
            {{ t('contact.modal.success.close') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScrollAnimation } from '~/composables/useAnimations'

const { t } = useI18n()
useScrollAnimation()

const form = ref({
  name: '',
  email: '',
  countryCode: '+55',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    const response = await $fetch('/api/send-contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        phone: `${form.value.countryCode} ${form.value.phone}`,
        subject: getSubjectLabel(form.value.subject),
        message: form.value.message
      }
    })

    if (response.success) {
      form.value = {
        name: '',
        email: '',
        countryCode: '+55',
        phone: '',
        subject: '',
        message: ''
      }
      showSuccessModal.value = true
    } else {
      throw new Error(t('contact.form.feedback.sendFail'))
    }
  } catch (error) {
    const status = error?.statusCode || error?.response?.status
    const apiMessage =
      error?.statusMessage ||
      error?.data?.statusMessage ||
      error?.data?.message

    if (status === 429) {
      alert(apiMessage || t('contact.form.feedback.rateLimited'))
    } else {
      alert(apiMessage || t('contact.form.feedback.sendError'))
    }
  } finally {
    isSubmitting.value = false
  }
}

const getSubjectLabel = (value) => {
  const subjects = {
    projeto: t('contact.form.subject.options.projeto'),
    consultoria: t('contact.form.subject.options.consultoria'),
    colaboracao: t('contact.form.subject.options.colaboracao'),
    outros: t('contact.form.subject.options.outros')
  }
  return subjects[value] || value
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')

  const maxDigits = {
    '+55': 11,
    '+1': 10,
    '+44': 11,
    '+33': 10,
    '+49': 11,
    '+34': 9,
    '+39': 10,
    '+351': 9,
    '+54': 10,
    '+52': 10
  }

  const maxDigit = maxDigits[form.value.countryCode] || 11
  value = value.slice(0, maxDigit)

  let formattedValue = ''

  if (form.value.countryCode === '+55') {
    if (value.length >= 11) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`
    } else if (value.length >= 10) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`
    } else if (value.length >= 6) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`
    } else if (value.length >= 2) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length >= 1) {
      formattedValue = `(${value}`
    }
  } else if (form.value.countryCode === '+1') {
    if (value.length >= 10) {
      formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
    } else if (value.length >= 6) {
      formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
    } else if (value.length >= 3) {
      formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`
    } else if (value.length >= 1) {
      formattedValue = `(${value}`
    }
  } else if (value.length >= 9) {
    formattedValue = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`
  } else if (value.length >= 6) {
    formattedValue = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`
  } else if (value.length >= 3) {
    formattedValue = `${value.slice(0, 3)} ${value.slice(3)}`
  } else {
    formattedValue = value
  }

  form.value.phone = formattedValue || value
}

const validatePhoneInput = (event) => {
  const char = String.fromCharCode(event.which)
  if (!/[0-9]/.test(char)) event.preventDefault()
}

const getPhonePlaceholder = () => {
  const placeholders = {
    '+55': '(11) 99999-9999',
    '+1': '(123) 456-7890',
    '+44': '20 1234 5678',
    '+33': '1 23 45 67 89',
    '+49': '30 12345678',
    '+34': '91 123 45 67',
    '+39': '06 1234 5678',
    '+351': '21 123 4567',
    '+54': '11 1234-5678',
    '+52': '55 1234 5678'
  }
  return placeholders[form.value.countryCode] || '123456789'
}

const getMaxLength = () => {
  const maxLengths = {
    '+55': 15,
    '+1': 14,
    '+44': 15,
    '+33': 16,
    '+49': 15,
    '+34': 15,
    '+39': 15,
    '+351': 15,
    '+54': 15,
    '+52': 15
  }
  return maxLengths[form.value.countryCode] || 15
}

watch(() => form.value.countryCode, () => {
  form.value.phone = ''
})
</script>

<style scoped>
.apple-contact {
  background: transparent;
  min-height: 100vh;
}

.hero-row {
  max-width: 760px;
}

.hero-subtitle {
  margin: 0;
  color: var(--apple-text-secondary);
  font-size: 1.05rem;
  line-height: 1.6;
}

.contact-main {
  padding-top: 12px;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.2fr);
  gap: 48px;
  align-items: start;
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.side-card {
  border: none;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.form-card {
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.side-title,
.form-title {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.side-desc {
  margin: 0 0 20px;
  color: var(--apple-text-secondary);
  font-size: 0.92rem;
  line-height: 1.55;
  max-width: 420px;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: none;
  background: transparent;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.contact-item:hover {
  opacity: 0.88;
}

.contact-item--static {
  cursor: default;
}

.contact-item--static:hover {
  opacity: 1;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.contact-details strong {
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--apple-text-primary);
}

.contact-details span {
  font-size: 0.82rem;
  color: var(--link-accent);
  overflow-wrap: anywhere;
}

.contact-item--static .contact-details span {
  color: var(--apple-text-secondary);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--apple-text-secondary);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid rgba(192, 132, 252, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: var(--apple-text-primary);
  font-family: var(--font-system);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(192, 132, 252, 0.55);
  background: rgba(168, 85, 247, 0.08);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.16);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--apple-text-tertiary);
}

.phone-input-container {
  display: grid;
  grid-template-columns: 118px 1fr;
  gap: 10px;
}

.country-select,
.form-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c084fc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  padding-right: 36px;
  cursor: pointer;
}

.country-select option,
.form-select option {
  background: #12081f;
  color: #f7f2ff;
}

.form-submit {
  width: 100%;
  min-height: 48px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(5, 3, 11, 0.72);
  backdrop-filter: blur(8px);
}

.modal-content {
  width: min(420px, 100%);
  padding: 28px;
  border-radius: 22px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur);
  text-align: center;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--icon-tile-soft);
  color: var(--neon-purple);
  font-size: 1.8rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .contact-hero.page-hero {
    padding-top: calc(var(--page-top-mobile) + 18px);
  }

  .contact-hero .hero-row {
    max-width: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-hero .kicker {
    justify-content: center;
  }

  .contact-hero .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .side-desc {
    max-width: none;
  }

  .contact-form-wrap {
    order: -1;
  }

  .contact-side {
    text-align: center;
    align-items: center;
    margin-top: 36px;
    margin-bottom: 40px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .side-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .side-desc {
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-items {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 14px;
    width: 100%;
    max-width: none;
    margin-top: 36px;
  }

  .contact-item {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-width: 0;
  }

  .contact-details {
    align-items: center;
    text-align: center;
  }

  .contact-details span {
    font-size: 0.75rem;
  }
}

@media (max-width: 720px) {
  .form-row,
  .phone-input-container {
    grid-template-columns: 1fr;
  }

  .form-card {
    padding: 18px;
  }
}
</style>
