// VESSEL showcase: drawings in SVG. The product, the heat trace and the origin landscapes are drawn in code,
// so the showcase needs no photography and no paid image generation. Replace them with real photos when you have them.

const TONES = {
  slate: { hi: '#58606b', lo: '#15181c', side: ['#202328', '#0b0c0e'], ink: '#0b0d10' },
  bone: { hi: '#f1ebe1', lo: '#b7aa95', side: ['#a89a83', '#6f6452'], ink: '#8a7e69' },
  ash: { hi: '#b4b1ab', lo: '#55524e', side: ['#5e5b56', '#2c2a28'], ink: '#3a3835' },
  glacier: { hi: '#e6eef5', lo: '#8297ab', side: ['#7d91a5', '#435466'], ink: '#5d7083' },
};
let uid = 0;

// Seal-like stone puck, seen from above (view 'top') or at three-quarters ('side').
export function puck({ tone = 'slate', view = 'top', wear = 0, mark = 'V', ring = 'VESSEL · SOLID SCENT · GLACIER PINE ASH · ', size = 400, shadow = true } = {}) {
  const t = TONES[tone];
  const id = `p${uid++}`;
  const r = 170 * (1 - wear * 0.32);
  const rough = 5 + wear * 26;
  const emb = Math.max(0, 1 - wear * 1.15);
  const defs = `<defs>
    <radialGradient id="${id}g" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${t.hi}"/><stop offset="1" stop-color="${t.lo}"/></radialGradient>
    <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="${t.side[1]}"/><stop offset=".35" stop-color="${t.side[0]}"/><stop offset="1" stop-color="${t.side[1]}"/></linearGradient>
    <filter id="${id}t" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="${uid}" result="n"/>
      <feDiffuseLighting in="n" surfaceScale="1.6" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="48"/></feDiffuseLighting>
      <feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1.05" k2="0" k3="0" k4="0" result="m"/><feComposite in="m" in2="SourceGraphic" operator="in"/></filter>
    <filter id="${id}e" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="${uid + 3}"/><feDisplacementMap in="SourceGraphic" scale="${rough}"/></filter>
    <filter id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
    <path id="${id}c" d="M200 ${200 - r * 0.78} a${r * 0.78} ${r * 0.78} 0 1 1 -0.1 0"/>
  </defs>`;
  const face = (cy, sy) => `<g transform="translate(0 ${cy}) scale(1 ${sy}) translate(0 -200)">
    <g filter="url(#${id}e)"><circle cx="200" cy="200" r="${r}" fill="url(#${id}g)"/><circle cx="200" cy="200" r="${r}" fill="url(#${id}g)" filter="url(#${id}t)" opacity=".9"/>
    <circle cx="200" cy="200" r="${r - 10}" fill="none" stroke="${t.ink}" stroke-opacity="${0.35 * emb}" stroke-width="3"/>
    <circle cx="200" cy="200" r="${r - 12}" fill="none" stroke="#fff" stroke-opacity="${0.22 * emb}" stroke-width="2"/></g>
    <g opacity="${emb}" font-family="Display, sans-serif" text-anchor="middle">
      <text x="198.5" y="${200 + r * 0.27 - 1.5}" font-size="${r * 0.86}" font-weight="600" fill="#fff" fill-opacity=".38" style="font-stretch:125%">${mark}</text>
      <text x="201.5" y="${200 + r * 0.27 + 1.5}" font-size="${r * 0.86}" font-weight="600" fill="#000" fill-opacity=".5" style="font-stretch:125%">${mark}</text>
      <text x="200" y="${200 + r * 0.27}" font-size="${r * 0.86}" font-weight="600" fill="${t.lo}" style="font-stretch:125%">${mark}</text>
      <text font-family="Mono, monospace" font-size="${r * 0.085}" letter-spacing="3" fill="${t.ink}" fill-opacity=".8"><textPath href="#${id}c">${ring.repeat(2)}</textPath></text>
    </g></g>`;
  if (view === 'top') {
    return `<svg class="puck" viewBox="0 0 400 400" width="${size}" height="${size}" aria-hidden="true">${defs}
      ${shadow ? `<ellipse cx="214" cy="226" rx="${r}" ry="${r}" fill="#000" opacity=".28" filter="url(#${id}b)"/>` : ''}${face(200, 1)}</svg>`;
  }
  const sy = 0.38, top = 160, h = 58 * (1 - wear * 0.55);
  return `<svg class="puck" viewBox="0 0 400 320" width="${size}" height="${size * 0.8}" aria-hidden="true">${defs}
    ${shadow ? `<ellipse cx="215" cy="${top + h + 34}" rx="${r * 1.05}" ry="${r * 0.3}" fill="#000" opacity=".42" filter="url(#${id}b)"/>` : ''}
    <g filter="url(#${id}e)"><path d="M${200 - r} ${top} v${h} a${r} ${r * sy} 0 0 0 ${r * 2} 0 v-${h} z" fill="url(#${id}s)"/></g>
    ${face(top, sy)}</svg>`;
}

// Heat trace: banded thermal colours, like a thermal camera looking at a warm hand.
export function heat({ w = 600, h = 600, seed = 4, shape = 'thumb' } = {}) {
  const id = `h${uid++}`;
  const bands = ['#3b1e8f', '#2e6fff', '#2fe0e8', '#5cf08a', '#f5f05a', '#ffb02e', '#ff4f6d', '#ff2fb4'];
  const shapes = {
    thumb: (k) => `<ellipse cx="${w * 0.5}" cy="${h * 0.52}" rx="${w * (0.3 - k * 0.032)}" ry="${h * (0.42 - k * 0.045)}" transform="rotate(-18 ${w / 2} ${h / 2})"/>`,
    smear: (k) => `<path d="M${w * 0.08 + k * 18} ${h * 0.5} C${w * 0.2} ${h * (0.2 + k * 0.03)} ${w * 0.75} ${h * (0.18 + k * 0.04)} ${w * (0.94 - k * 0.04)} ${h * 0.48} C${w * 0.8} ${h * (0.78 - k * 0.04)} ${w * 0.3} ${h * (0.84 - k * 0.04)} ${w * 0.08 + k * 18} ${h * 0.5} Z"/>`,
    ring: (k) => `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * (0.46 - k * 0.052)}"/>`,
  };
  return `<svg class="heat" viewBox="0 0 ${w} ${h}" aria-hidden="true"><defs><filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${Math.min(w, h) * 0.16}"/><feGaussianBlur stdDeviation="1.2"/></filter></defs>
    <g filter="url(#${id})">${bands.map((c, k) => `<g fill="${c}">${shapes[shape](k)}</g>`).join('')}</g></svg>`;
}

// Origin landscapes: a ridge, a forest edge, a volcanic slope, all in fog.
export function land(kind, { w = 800, h = 500 } = {}) {
  const id = `l${uid++}`;
  const sky = { glacier: ['#dfe7ee', '#9fb1c2'], pine: ['#c9d0cc', '#5f6d66'], ash: ['#d6d1cb', '#7c766f'] }[kind];
  const ridge = {
    glacier: `M0 ${h * 0.62} L${w * 0.18} ${h * 0.4} L${w * 0.3} ${h * 0.5} L${w * 0.47} ${h * 0.22} L${w * 0.62} ${h * 0.46} L${w * 0.78} ${h * 0.34} L${w} ${h * 0.55} V${h} H0 Z`,
    pine: Array.from({ length: 26 }, (_, i) => { const x = (i / 25) * w, y = h * (0.42 + ((i * 37) % 11) / 60); return `M${x - 18} ${h} L${x} ${y} L${x + 18} ${h} Z`; }).join(''),
    ash: `M0 ${h} L${w * 0.1} ${h * 0.7} Q${w * 0.42} ${h * 0.16} ${w * 0.5} ${h * 0.18} Q${w * 0.58} ${h * 0.16} ${w * 0.9} ${h * 0.7} L${w} ${h} Z`,
  }[kind];
  return `<svg class="land" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
    <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>
    <filter id="${id}n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .22 0"/></filter></defs>
    <rect width="100%" height="100%" fill="url(#${id})"/><path d="${ridge}" fill="#15191d" opacity="${kind === 'glacier' ? 0.75 : 0.88}"/>
    ${kind === 'glacier' ? `<path d="M${w * 0.47} ${h * 0.22} L${w * 0.53} ${h * 0.31} L${w * 0.5} ${h * 0.3} L${w * 0.44} ${h * 0.27} Z" fill="#fff" opacity=".85"/>` : ''}
    <rect width="100%" height="100%" fill="url(#${id}f)"/><rect width="100%" height="100%" filter="url(#${id}n)"/></svg>`;
}

// A folded white carton with a round window, the puck visible inside.
export function carton({ tone = 'slate', w = 520 } = {}) {
  const id = `c${uid++}`;
  return `<div class="carton" style="width:${w}px">
    <svg viewBox="0 0 520 400" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f7f8f9"/><stop offset="1" stop-color="#d9dde1"/></linearGradient>
    <radialGradient id="${id}w" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#cfd6dc"/><stop offset="1" stop-color="#7d8790"/></radialGradient></defs>
    <path d="M30 40 L470 40 L500 70 L500 380 L60 380 L30 350 Z" fill="#c4c9ce"/><rect x="30" y="40" width="440" height="310" fill="url(#${id})"/>
    <circle cx="210" cy="195" r="104" fill="url(#${id}w)"/><circle cx="210" cy="195" r="104" fill="none" stroke="#bfc5cb" stroke-width="3"/></svg>
    <div class="carton-puck">${puck({ tone, view: 'top', size: Math.round(w * 0.365), shadow: false })}</div>
    <p class="carton-a">VESSEL</p><p class="carton-b">SOLID SCENT<br>${tone.toUpperCase()} · 8 G</p>
    <ul class="carton-dots"><li></li><li></li><li class="on"></li><li></li></ul></div>`;
}
