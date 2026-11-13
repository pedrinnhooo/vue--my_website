<template>
  <div class="cta-avatar" aria-hidden="true">
    <svg
      class="cta-avatar-svg"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ctaSkin" x1="120" y1="70" x2="210" y2="210" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f3e9df" />
          <stop offset="1" stop-color="#e2cfc0" />
        </linearGradient>
        <linearGradient id="ctaHood" x1="90" y1="40" x2="230" y2="180" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2a2038" />
          <stop offset="1" stop-color="#15101f" />
        </linearGradient>
        <linearGradient id="ctaAccent" x1="80" y1="180" x2="240" y2="280" gradientUnits="userSpaceOnUse">
          <stop stop-color="#cbb8ea" />
          <stop offset="1" stop-color="#8b6fc0" />
        </linearGradient>
        <radialGradient id="ctaGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 170) rotate(90) scale(120)">
          <stop stop-color="#b7a3e3" stop-opacity="0.35" />
          <stop offset="1" stop-color="#b7a3e3" stop-opacity="0" />
        </radialGradient>
      </defs>

      <circle class="orb orb-a" cx="160" cy="168" r="118" fill="url(#ctaGlow)" />
      <circle class="ring ring-a" cx="160" cy="168" r="126" stroke="rgba(183,163,227,0.28)" stroke-width="1.2" />
      <circle class="ring ring-b" cx="160" cy="168" r="108" stroke="rgba(232,226,240,0.12)" stroke-width="1" stroke-dasharray="6 10" />

      <g class="figure">
        <!-- torso / hoodie -->
        <path
          d="M96 268c8-46 28-72 64-72s56 26 64 72"
          fill="url(#ctaHood)"
        />
        <path
          d="M112 268c7-34 22-52 48-52s41 18 48 52"
          fill="url(#ctaAccent)"
          opacity="0.22"
        />

        <!-- hood -->
        <path
          d="M98 148c8-54 36-86 62-86s54 32 62 86c-14-18-36-28-62-28s-48 10-62 28Z"
          fill="url(#ctaHood)"
        />

        <!-- face -->
        <ellipse cx="160" cy="148" rx="42" ry="48" fill="url(#ctaSkin)" />

        <!-- hair fringe -->
        <path
          d="M122 128c10-28 28-40 38-40 8 0 18 6 28 18 4-10 12-16 22-16 2 22-4 40-16 52-18-8-42-10-72-14Z"
          fill="#1a1424"
        />

        <!-- eyes -->
        <g class="eyes">
          <ellipse class="eye" cx="144" cy="148" rx="4.2" ry="5" fill="#1c1526" />
          <ellipse class="eye" cx="176" cy="148" rx="4.2" ry="5" fill="#1c1526" />
          <circle class="glint" cx="145.5" cy="146.5" r="1.2" fill="#fff" />
          <circle class="glint" cx="177.5" cy="146.5" r="1.2" fill="#fff" />
        </g>

        <!-- smile -->
        <path class="smile" d="M148 168c6 8 18 8 24 0" stroke="#9a7d6a" stroke-width="2.2" stroke-linecap="round" />

        <!-- laptop -->
        <g class="laptop">
          <rect x="108" y="214" width="104" height="58" rx="8" fill="#1a1424" stroke="rgba(183,163,227,0.35)" />
          <rect x="118" y="222" width="84" height="36" rx="4" fill="#0d0a14" />
          <g class="code-lines">
            <rect class="line line-1" x="126" y="230" width="42" height="3" rx="1.5" fill="#b7a3e3" />
            <rect class="line line-2" x="126" y="238" width="58" height="3" rx="1.5" fill="#8b6fc0" opacity="0.8" />
            <rect class="line line-3" x="126" y="246" width="28" height="3" rx="1.5" fill="#e8e2f0" opacity="0.55" />
          </g>
          <path d="M100 274h120l-8 10H108l-8-10Z" fill="#241b33" />
        </g>
      </g>

      <!-- floating chips -->
      <g class="chip chip-a">
        <rect x="42" y="112" width="46" height="22" rx="11" fill="rgba(183,163,227,0.16)" stroke="rgba(183,163,227,0.4)" />
        <text x="65" y="127" text-anchor="middle" fill="#d8c8f0" font-size="10" font-family="ui-monospace, monospace">vue</text>
      </g>
      <g class="chip chip-b">
        <rect x="236" y="96" width="58" height="22" rx="11" fill="rgba(183,163,227,0.16)" stroke="rgba(183,163,227,0.4)" />
        <text x="265" y="111" text-anchor="middle" fill="#d8c8f0" font-size="10" font-family="ui-monospace, monospace">flutter</text>
      </g>
      <g class="chip chip-c">
        <rect x="248" y="210" width="46" height="22" rx="11" fill="rgba(183,163,227,0.14)" stroke="rgba(183,163,227,0.35)" />
        <text x="271" y="225" text-anchor="middle" fill="#d8c8f0" font-size="10" font-family="ui-monospace, monospace">nuxt</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.cta-avatar {
  width: min(100%, 340px);
  margin-inline: auto;
  user-select: none;
  pointer-events: none;
}

.cta-avatar-svg {
  width: 100%;
  height: auto;
  display: block;
}

.figure {
  transform-origin: 160px 220px;
  animation: figureFloat 5.5s ease-in-out infinite;
}

.orb {
  animation: orbPulse 4.5s ease-in-out infinite;
}

.ring-a {
  transform-origin: 160px 168px;
  animation: ringSpin 18s linear infinite;
}

.ring-b {
  transform-origin: 160px 168px;
  animation: ringSpin 28s linear infinite reverse;
}

.eyes {
  transform-origin: 160px 148px;
  animation: blink 5.2s ease-in-out infinite;
}

.laptop {
  animation: laptopBob 5.5s ease-in-out infinite;
}

.line-1 { animation: codePulse 2.4s ease-in-out infinite; }
.line-2 { animation: codePulse 2.4s ease-in-out 0.35s infinite; }
.line-3 { animation: codePulse 2.4s ease-in-out 0.7s infinite; }

.chip-a { animation: chipFloat 4.2s ease-in-out infinite; }
.chip-b { animation: chipFloat 5s ease-in-out 0.4s infinite; }
.chip-c { animation: chipFloat 4.6s ease-in-out 0.8s infinite; }

@keyframes figureFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes orbPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.06); }
}

@keyframes ringSpin {
  to { transform: rotate(360deg); }
}

@keyframes blink {
  0%, 42%, 46%, 100% { transform: scaleY(1); }
  44% { transform: scaleY(0.12); }
}

@keyframes laptopBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes codePulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}

@keyframes chipFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  .figure,
  .orb,
  .ring-a,
  .ring-b,
  .eyes,
  .laptop,
  .line-1,
  .line-2,
  .line-3,
  .chip-a,
  .chip-b,
  .chip-c {
    animation: none;
  }
}
</style>
