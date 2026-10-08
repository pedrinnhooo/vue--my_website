```vue
<template>
    <div
        class="brand-logo"
        :class="[`size-${size}`, `variant-${variant}`]"
    >
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <!-- Outer tech frame -->
            <rect
                x="7"
                y="7"
                width="50"
                height="50"
                rx="14"
                stroke="url(#techGradient)"
                stroke-width="1.2"
                opacity="0.3"
            />

            <!-- Circuit nodes -->
            <circle
                cx="12"
                cy="20"
                r="2"
                fill="#67E8F9"
            />

            <circle
                cx="52"
                cy="44"
                r="2"
                fill="#A78BFA"
            />

            <circle
                cx="44"
                cy="12"
                r="1.5"
                fill="#E879F9"
            />

            <!-- Circuit lines -->
            <path
                d="M12 20H18L23 25"
                stroke="url(#techGradient)"
                stroke-width="1"
                opacity="0.6"
            />

            <path
                d="M52 44H46L41 39"
                stroke="url(#techGradient)"
                stroke-width="1"
                opacity="0.6"
            />

            <!-- Main symbol -->
            <path
                d="M27 19L18 32L27 45"
                stroke="url(#techGradient)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <path
                d="M37 19L46 32L37 45"
                stroke="url(#techGradient)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- Center slash -->
            <path
                d="M35 17L29 47"
                stroke="white"
                stroke-width="2.4"
                stroke-linecap="round"
                opacity="0.9"
            />

            <!-- Small center node -->
            <circle
                cx="32"
                cy="32"
                r="2.2"
                fill="#67E8F9"
            />

            <defs>
                <linearGradient
                    id="techGradient"
                    x1="12"
                    y1="10"
                    x2="52"
                    y2="54"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stop-color="#67E8F9" />
                    <stop offset="48%" stop-color="#818CF8" />
                    <stop offset="100%" stop-color="#E879F9" />
                </linearGradient>
            </defs>
        </svg>

        <div
            class="glow-effect"
            v-if="variant === 'glow'"
        ></div>
    </div>
</template>

<script setup>

defineProps({
    size: {
        type: String,
        default: 'medium',
        validator: (value) =>
            ['small', 'medium', 'large'].includes(value)
    },

    variant: {
        type: String,
        default: 'gradient',
        validator: (value) =>
            ['solid', 'gradient', 'glow'].includes(value)
    }
})

</script>

<style scoped>

.brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
}

.brand-logo svg {
    position: relative;
    z-index: 2;
    transition:
        transform 0.35s ease,
        filter 0.35s ease;
}

/* ================================
   Hover
================================ */

.brand-logo:hover svg {
    transform: scale(1.06);
    filter:
        drop-shadow(0 0 8px rgba(103, 232, 249, 0.35))
        drop-shadow(0 0 18px rgba(129, 140, 248, 0.25));
}

/* ================================
   Sizes
================================ */

.size-small svg {
    width: 32px;
    height: 32px;
}

.size-medium svg {
    width: 44px;
    height: 44px;
}

.size-large svg {
    width: 64px;
    height: 64px;
}

/* ================================
   Solid
================================ */

.variant-solid svg {
    filter: none;
}

/* ================================
   Gradient
================================ */

.variant-gradient svg {
    filter:
        drop-shadow(0 0 8px rgba(129, 140, 248, 0.18));
}

/* ================================
   Glow
================================ */

.variant-glow svg {
    animation: logoGlow 3s ease-in-out infinite alternate;
}

.glow-effect {
    position: absolute;
    inset: -12px;

    background:
        radial-gradient(
            circle,
            rgba(103, 232, 249, 0.18) 0%,
            rgba(129, 140, 248, 0.10) 35%,
            transparent 70%
        );

    border-radius: 50%;

    animation: pulseGlow 2.8s ease-in-out infinite;

    pointer-events: none;
}

/* ================================
   Animations
================================ */

@keyframes logoGlow {

    0% {
        filter:
            drop-shadow(0 0 7px rgba(103, 232, 249, 0.25));
    }

    100% {
        filter:
            drop-shadow(0 0 18px rgba(129, 140, 248, 0.45))
            drop-shadow(0 0 28px rgba(232, 121, 249, 0.18));
    }

}

@keyframes pulseGlow {

    0%,
    100% {
        opacity: 0.35;
        transform: scale(0.95);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.08);
    }

}

/* ================================
   Mobile
================================ */

@media (max-width: 768px) {

    .size-medium svg {
        width: 38px;
        height: 38px;
    }

    .size-large svg {
        width: 52px;
        height: 52px;
    }

}

</style>
```
