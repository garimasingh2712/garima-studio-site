// Studio projects, in order. Each gets a page built from cases.js.
// k: what kind of work it is (used by the filter). c: the project's colour, taken from the piece itself.
window.PRODUCT = 'https://garima-product-site.vercel.app';
const PX = (f) => f.replace('work/', 'work/ui/');
// Every project, UI/UX first. k: kinds (for the filter). c: project colour. bg: card background when the art is shown whole.
window.P = [
  { s: 'mindgym', t: 'MindGym', w: 'An AI mental-performance coach for jobseekers. 23 screens shipped in ten weeks.', y: '2026', k: ['ui'], tag: 'AI UI/UX', c: '#1F6B52', img: PX('work/mindgym/cover.webp') },
  { s: 'nobias', t: 'NoBias', w: 'An AI tool that checks interview scripts for bias. Designed and built, live.', y: '2026', k: ['ui'], tag: 'Web · AI', c: '#0E8C7A', img: PX('work/nobias/home.webp'), pos: '0% 30%' },
  { s: 'clima', t: 'Clima', w: 'A weather app where colour tells you the mood before you read a number.', y: '2026', k: ['ui'], tag: 'App UI', c: '#D9A21F', img: PX('work/clima/hero.webp') },
  { s: 'finderseeker', t: 'FinderSeeker', w: 'Clip a tag to your keys; buzz it near, map it far.', y: '2025', k: ['ui'], tag: 'App UI', c: '#C98A2E', img: PX('work/finderseeker/hero.webp') },
  { s: 'resurrected', t: 'Resurrected', w: 'Three records re-sleeved as phenakistiscopes: covers that only move when they spin.', y: '2026', k: ['motion', 'graphics'], tag: 'Cover art · motion', c: '#D9773A', img: 'work/resurrected/discpastel.webp', contain: true, bg: '#F3E6D8' },
  { s: 'small-remedies', t: 'Small Remedies', w: 'Victorian chemist’s packaging for modern London troubles.', y: '2026', k: ['graphics', 'print', 'motion'], tag: 'Packaging', c: '#24584A', img: 'work/small-remedies/box-rain.webp', contain: true, bg: '#E3ECE7' },
  { s: 'tare', t: 'Tare', w: 'A stencil typeface from shipping crates and bale stamps. Two weights, 48 glyphs each.', y: '2026', k: ['type', 'motion'], tag: 'Typeface', c: '#1F3A5F', img: 'work/tare/crate-venezia.webp' },
  { s: 'three-londons', t: 'Three Londons', w: 'The 172 bus, Brockley to Aldwych, as a one-sheet fold-out zine.', y: '2026', k: ['graphics', 'print'], tag: 'Zine', c: '#E0402A', img: 'work/three-londons/page-1.webp', contain: true, bg: '#F4EAD5' },
  { s: 'wish-you-were-then', t: 'Wish You Were Then', w: 'Lenticular postcards that tilt from then to now.', y: '2026', k: ['graphics', 'motion'], tag: 'Postcards', c: '#8A5A3C', img: 'work/wish-you-were-then/postcard-kx-then-full.webp' },
  { s: 'postage-due', t: 'Postage Due', w: 'Artistamps for things we are losing: six lost words, six endangered crafts.', y: '2026', k: ['graphics', 'print'], tag: 'Artistamps', c: '#553A78', img: 'work/postage-due/stamp-gold.webp', contain: true, bg: '#EEE8F3' },
];
window.href = (p) => `${p.s}.html`;
window.pad = (n) => String(n).padStart(2, '0');

const KIND = { ui: 'UI/UX', motion: 'Motion', graphics: 'Graphics', print: 'Print', type: 'Type' };
window.kinds = (p) => p.k.map((k) => KIND[k]).join(' · ');
window.num = (p) => pad(P.indexOf(p) + 1);
// every project has a composed 4:3 thumbnail (same ground, margins and shadows), made from its own artwork
window.FRAME = (p, cls = '') => `<div class="fr ${cls}"><img src="work/ui/thumb/${p.s}.webp" alt="${p.t}" loading="lazy"></div>`;

// After work: the same fun facts and folder colours as the product site.
window.FOLDER_COLOURS = ['#8E2B2B', '#4B5D2A', '#1F4E79', '#C2452D', '#6E3D96', '#2F6F6A', '#A3650F'];
window.HOBBIES = [
  ['Murder mysteries', 'I’ll have the culprit worked out by chapter three, usually correctly.'],
  ['Survival plans for extreme situations', 'I have a plan for most disasters. No one asked, I made one anyway.'],
  ['Geopolitics debates', 'Give me twenty minutes and any headline and I’ll have an opinion on it.'],
  ['Board games (fiercely competitive)', 'Friends and family game night is not casual. I am playing to win.'],
  ['YouTube rabbit holes', 'What did people do before fire, before boredom had a cure? I go looking for the answer at 1am.'],
  ['Unprompted documentaries', 'Whatever’s on, I’ll watch it end to end and then explain it to you unprompted.'],
  ['Ranking chip shop fries', 'Ongoing, unofficial, taken far more seriously than it should be.'],
];
