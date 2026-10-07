<template>
    <div class="brand-logo" :class="[`size-${size}`, `variant-${variant}`]">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" stroke="url(#brandGradient)" stroke-width="1.5" fill="none" opacity="0.35"/>
            <path d="M30 8 L45 18 L45 42 L30 52 L15 42 L15 18 Z"
                  fill="url(#brandFill)"
                  stroke="url(#brandGradient)"
                  stroke-width="1.2"/>
            <path d="M22 20 L22 40 M22 20 L32 20 C35 20 37 22 37 25 C37 28 35 30 32 30 L22 30"
                  stroke="white"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
            <circle cx="40" cy="24" r="2.2" fill="#67e8f9" opacity="0.95"/>
            <defs>
                <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#67e8f9" />
                    <stop offset="50%" stop-color="#c084fc" />
                    <stop offset="100%" stop-color="#e879f9" />
                </linearGradient>
                <linearGradient id="brandFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6d28d9" />
                    <stop offset="100%" stop-color="#a21caf" />
                </linearGradient>
            </defs>
        </svg>
        <div class="glow-effect" v-if="variant === 'glow'"></div>
    </div>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
        type: String,
        default: 'gradient',
        validator: (value) => ['solid', 'gradient', 'glow'].includes(value)
    }
})
</script>

<style scoped>
.brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.brand-logo svg {
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.45));
}

.brand-logo:hover svg {
    transform: scale(1.05) rotate(-4deg);
    filter: drop-shadow(0 0 22px rgba(103, 232, 249, 0.45));
}

.size-small svg { width: 32px; height: 32px; }
.size-medium svg { width: 44px; height: 44px; }
.size-large svg { width: 64px; height: 64px; }

.variant-glow svg {
    animation: logoGlow 3s ease-in-out infinite alternate;
}

.glow-effect {
    position: absolute;
    inset: -8px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulseGlow 2.4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes logoGlow {
    0% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.35)); }
    100% { filter: drop-shadow(0 0 22px rgba(103, 232, 249, 0.5)); }
}

@keyframes pulseGlow {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50% { opacity: 0.85; transform: scale(1.18); }
}

@media (max-width: 768px) {
    .size-medium svg { width: 38px; height: 38px; }
    .size-large svg { width: 52px; height: 52px; }
}
</style>
