<template>
  <div class="copy-box" :class="{ 'is-copied': copied }">
    <div class="copy-box-bar">
      <span class="copy-box-label">{{ label }}</span>
      <button
        type="button"
        class="copy-btn"
        :aria-label="copied ? copiedLabel : copyLabel"
        @click="copy"
      >
        <i :class="copied ? 'bi bi-check2' : 'bi bi-clipboard'" aria-hidden="true"></i>
        <span class="copy-btn-text">{{ copied ? copiedLabel : copyLabel }}</span>
      </button>
    </div>
    <p v-if="lead" class="copy-box-lead">{{ lead }}</p>
    <pre class="copy-box-code" :class="{ 'is-middle': middle }"><code>{{ code }}</code></pre>
    <p v-if="note" class="copy-box-note">{{ note }}</p>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  code: { type: String, required: true },
  copyLabel: { type: String, default: 'Copy' },
  copiedLabel: { type: String, default: 'Copied' },
  lead: { type: String, default: '' },
  note: { type: String, default: '' },
  middle: { type: Boolean, default: false }
})

const copied = ref(false)
let timer

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    const field = document.createElement('textarea')
    field.value = props.code
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }

  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.copy-box {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(19, 185, 253, 0.22);
  background: rgba(4, 8, 16, 0.55);
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}

.copy-box.is-copied {
  border-color: rgba(52, 211, 153, 0.55);
  box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.18), 0 0 28px rgba(52, 211, 153, 0.16);
}

.copy-box-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.copy-box-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(186, 230, 253, 0.72);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0;
  min-height: 28px;
  padding: 0 8px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #e0f2fe;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
}

.copy-btn:hover {
  background: rgba(19, 185, 253, 0.16);
}

.copy-btn i {
  font-size: 0.9rem;
  line-height: 1;
}

.copy-box.is-copied .copy-btn {
  background: rgba(52, 211, 153, 0.16);
  color: #86efac;
}

.copy-box.is-copied .copy-btn i {
  animation: copyPop 0.45s cubic-bezier(0.2, 0.85, 0.2, 1);
}

.copy-btn-text {
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  white-space: nowrap;
  transition: max-width 0.35s ease, opacity 0.25s ease, margin 0.35s ease;
}

.copy-box.is-copied .copy-btn-text {
  max-width: 7rem;
  margin-left: 6px;
  opacity: 1;
}

.copy-box-lead,
.copy-box-note {
  margin: 0 2px 10px;
  color: rgba(224, 242, 254, 0.78);
  font-size: 0.8rem;
  line-height: 1.5;
}

.copy-box-note {
  margin: 10px 2px 0;
}

.copy-box-code {
  flex: 1;
  margin: 0;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
  color: #e0f2fe;
  font-family: var(--font-mono);
  font-size: 0.86rem;
  line-height: 1.65;
  overflow-x: auto;
  white-space: pre;
  text-align: left;
}

.copy-box-code.is-middle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

@keyframes copyPop {
  0% { transform: scale(0.35) rotate(-16deg); opacity: 0; }
  55% { transform: scale(1.28) rotate(0); opacity: 1; }
  100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .copy-box,
  .copy-btn-text {
    transition: none;
  }

  .copy-box.is-copied .copy-btn i {
    animation: none;
  }
}
</style>
