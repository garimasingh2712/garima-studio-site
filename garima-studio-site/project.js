// Built from: diagrams, studio-diagrams, demos, cases, ui-cases, case
// Drawn diagrams for the project pages. Each returns an inline SVG.
// Ink lines for structure, the project colour (class c) for the thing that matters.
// Lines with class "draw" draw themselves in when the spread scrolls into view.
(() => {
  const f = (n) => Math.round(n * 10) / 10;
  const S = (w, h, body, label) => `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
  const L = (d, c = '') => `<path class="l ${c}" d="${d}"${c.includes('draw') ? ' pathLength="1"' : ''}/>`;
  const T = (x, y, t, c = '', a = 'start') => `<text class="t ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const H = (x, y, t, c = '', a = 'start') => `<text class="h ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const B = (x, y, t, c = '', a = 'start') => `<text class="b ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const C = (cx, cy, r, c = 'l') => `<circle class="${c}" cx="${f(cx)}" cy="${f(cy)}" r="${r}"/>`;
  const R = (x, y, w, h, rx = 0, c = 'l') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  // arrow from (x1,y1) to (x2,y2) with an open head
  const A = (x1, y1, x2, y2, c = 'c') => {
    const a = Math.atan2(y2 - y1, x2 - x1), k = 9;
    return L(`M${x1} ${y1} L${x2} ${y2}`, c) + L(`M${f(x2 - k * Math.cos(a - .45))} ${f(y2 - k * Math.sin(a - .45))} L${x2} ${y2} L${f(x2 - k * Math.cos(a + .45))} ${f(y2 - k * Math.sin(a + .45))}`, c);
  };
  // dimension line with end ticks
  const DIM = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2, k = 6, dx = f(k * Math.cos(a)), dy = f(k * Math.sin(a));
    return L(`M${x1} ${y1} L${x2} ${y2} M${x1 - dx} ${y1 - dy} L${x1 + dx} ${y1 + dy} M${x2 - dx} ${y2 - dy} L${x2 + dx} ${y2 + dy}`, 'c th');
  };
  const box = (x, y, t, c = '', w) => { w = w || t.length * 7.6 + 28; return R(x, y, w, 40, 8, c === 'c' ? 'f c' : 'l') + B(x + w / 2, y + 25, t, c === 'c' ? 'w' : '', 'middle'); };

  window.DIAGRAMS = {
    /* Nexorade: plan of a reciprocal frame, and the joint where two members meet */
    nexus() {
      // pinwheel: member i runs along one edge of a small central polygon and out past it.
      // Its inner end rests on member i-1, which passes through the same corner.
      const n = 5, cx = 215, cy = 235, r = 50, ext = 135;
      const V = [...Array(n)].map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
      let plan = C(cx, cy, 24, 'l g ds');
      V.forEach((v, i) => {
        const w = V[(i + 1) % n], dx = w[0] - v[0], dy = w[1] - v[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const a = [v[0] - ux * 14, v[1] - uy * 14], b = [w[0] + ux * ext, w[1] + uy * ext];
        plan += L(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, i === 0 ? 'c bd draw' : 'bd draw');
      });
      V.forEach((v) => { plan += C(v[0], v[1], 5, 'f c'); });
      plan += T(cx, cy + 4, 'NO HUB', 'k', 'middle').replace('class="t k"', 'class="t k" style="font-size:10px"') + T(20, 26, 'PLAN · FIVE MEMBERS', 'k');
      // the joint, in elevation
      const x0 = 500, y = 290;
      let j = T(x0, 26, 'ELEVATION · WHERE TWO MEMBERS MEET', 'k');
      j += R(x0, y - 20, 300, 40, 20, 'l bd') + C(720, y - 40, 20, 'f s') + C(720, y - 40, 20, 'l c bd');
      j += L(`M${x0 + 10} ${y} H${x0 + 290}`, 'g ds th') + L(`M690 ${y - 40} H880`, 'g ds th');
      j += DIM(860, y - 40, 860, y) + T(872, y - 14, 'e', 'c');
      j += DIM(700, y - 80, 740, y - 80) + T(720, y - 90, 'd', 'c', 'middle');
      j += DIM(720, y + 44, 800, y + 44) + T(760, y + 66, 'L', 'c', 'middle');
      j += T(x0, 130, 'MEMBER B RESTS ON MEMBER A', 'k') + L(`M${x0 + 160} 138 L700 ${y - 54}`, 'th');
      j += T(x0, 400, 'e  eccentricity: offset between the two axes', '') + T(x0, 420, 'd  member diameter      L  engagement length', '');
      return S(900, 440, plan + j, 'A reciprocal frame of five members, each resting on the next with no central hub, and the joint where two members meet');
    },

    /* Sound Objects: the horn makes a beam; the Olive is a Helmholtz resonator */
    sound() {
      let s = T(20, 24, 'THE MEGAPHONE', 'k');
      // bare speaker
      s += R(60, 70, 90, 46, 6, 'l') + C(105, 93, 14, 'l th');
      for (let k = 1; k <= 4; k++) s += L(`M${105 - 40 * k} ${120 + 22 * k} Q105 ${150 + 34 * k} ${105 + 40 * k} ${120 + 22 * k}`, 'g');
      s += T(105, 330, 'BARE SPEAKER', '', 'middle') + T(105, 348, 'SOUND SPREADS', '', 'middle');
      // with horn
      s += R(255, 70, 90, 46, 6, 'l') + C(300, 93, 14, 'l th');
      s += L('M275 116 L232 250 M325 116 L368 250 M288 116 L270 250 M312 116 L330 250', 'draw') + L('M232 250 H368', 'th');
      for (let k = 1; k <= 3; k++) s += L(`M${262 - 4 * k} ${262 + 20 * k} Q300 ${276 + 24 * k} ${338 + 4 * k} ${262 + 20 * k}`, 'c bd');
      s += T(300, 348, 'WITH THE MEGAPHONE', 'c', 'middle') + T(300, 366, 'A BEAM, NOT A CLOUD', 'c', 'middle');
      s += L('M370 180 L392 180', 'th') + T(398, 176, '8 PLANES', 'k') + T(398, 192, '135° APART', 'k');
      // olive
      const ox = 620, oy = 240;
      s += T(480, 24, 'THE OLIVE · HELMHOLTZ RESONATOR', 'k');
      s += `<path class="f s" d="M${ox - 20} ${oy - 108} A110 110 0 1 0 ${ox + 20} ${oy - 108} Z"/>`;
      s += L(`M${ox - 20} ${oy - 108} A110 110 0 1 0 ${ox + 20} ${oy - 108}`, 'bd') + L(`M${ox - 20} ${oy - 108} V${oy - 150} M${ox + 20} ${oy - 108} V${oy - 150}`, 'bd');
      s += R(ox - 16, oy - 146, 32, 30, 3, 'f c');
      // the spring
      let z = `M${ox} ${oy - 100}`; for (let k = 0; k < 8; k++) z += ` L${ox + (k % 2 ? -18 : 18)} ${oy - 88 + k * 20}`; z += ` L${ox} ${oy + 76}`;
      s += L(z, 'c');
      s += A(ox, oy - 184, ox, oy - 158) + L(`M${ox - 30} ${oy - 192} q10 -10 20 0 t20 0 t20 0`, 'c');
      s += L(`M${ox + 22} ${oy - 132} L${ox + 70} ${oy - 132}`, 'th') + T(ox + 76, oy - 136, 'NECK', 'k') + T(ox + 76, oy - 120, 'AIR MOVES AS A MASS');
      s += L(`M${ox + 20} ${oy + 10} L${ox + 120} ${oy + 10}`, 'th') + T(ox + 126, oy + 6, 'CAVITY', 'k') + T(ox + 126, oy + 22, 'AIR SPRINGS BACK');
      s += T(480, 390, 'TUNED TO A LOW NOTE: IT HOLDS IT AND SMOOTHS IT', 'c');
      return S(900, 400, s, 'Left: a bare speaker spreads sound while the Megaphone focuses it into a beam. Right: the Olive, a vessel with a neck where air moves like a mass on a spring');
    },

    /* Clima: what you read first */
    glance() {
      const px = 330, py = 10, w = 240, h = 400;
      let s = R(px, py, w, h, 34, 'f') + R(px + 6, py + 6, w - 12, h - 12, 28, 'f c');
      s += `<text class="big" x="${px + w / 2}" y="${py + 170}" text-anchor="middle" style="fill:#fff;font-size:76px">14°</text>`;
      s += T(px + w / 2, py + 82, 'LONDON · SUNNY', '', 'middle').replace('class="t ', 'style="fill:rgba(255,255,255,.85)" class="t ');
      s += R(px + 18, py + 250, w - 36, 136, 16, 'f w');
      for (let k = 0; k < 3; k++) s += R(px + 34, py + 274 + k * 36, 80 + k * 30, 10, 5, 'f g') + R(px + w - 74, py + 274 + k * 36, 40, 10, 5, 'f g');
      const call = (n, x1, y1, x2, side, b, t) => {
        const tx = side === 'l' ? x2 - 14 : x2 + 14, a = side === 'l' ? 'end' : 'start';
        return L(`M${x1} ${y1} L${x2} ${y1}`, 'th') + C(x1, y1, 4, 'f') + C(x2, y1, 13, 'f c') + `<text class="t" x="${x2}" y="${y1 + 4}" text-anchor="middle" style="fill:#fff">${n}</text>` + H(tx, y1 - 2, b, '', a) + T(tx, y1 + 18, t, '', a);
      };
      s += call(1, px + 30, 60, 270, 'l', 'Colour', 'THE MOOD, READ FIRST');
      s += call(2, px + 180, 140, 630, 'r', 'Number', 'THE TEMPERATURE');
      s += call(3, px + 40, 320, 270, 'l', 'Detail', 'ONLY IF YOU WANT IT');
      return S(900, 420, s, 'A Clima screen: colour is read first, then the temperature, then the detail below');
    },

    /* Material Alternatives: two recipes as proportions */
    recipes() {
      const rows = [
        ['Concrete and brick substitute', 'DRY SOMEWHERE WARM · NO KILN', [['Water', 25, 'ml', 'g'], ['Alginate', 5, 'g', 'c'], ['Used coffee grinds', 15, 'g', 's']]],
        ['Leather substitute', 'HEAT, NEVER BOIL · NO CHROMIUM', [['Water', 120, 'ml', 'g'], ['Pork gelatine', 24, 'g', 'c'], ['Glycerine', 6, 'g', 's']]],
      ];
      let s = '';
      rows.forEach(([h, note, parts], i) => {
        const y = 30 + i * 160, tot = parts.reduce((a, p) => a + p[1], 0), W = 860; let x = 20;
        s += H(20, y, h) + T(880, y, note, 'c', 'end');
        const raw = parts.map((p) => Math.max(110, (p[1] / tot) * W)), sc = W / raw.reduce((a, b) => a + b, 0);
        parts.forEach(([name, q, u, c], k) => {
          const w = raw[k] * sc;
          s += R(x, y + 18, w - 4, 54, 6, 'f ' + c) + T(x + 10, y + 50, `${q} ${u}`, c === 'c' ? '' : 'k').replace(c === 'c' ? 'class="t ' : '_', 'style="fill:#fff" class="t ') + T(x, y + 92, name.toUpperCase(), 'k');
          x += w;
        });
      });
      return S(900, 330, s, 'Two recipes shown as proportions of their ingredients');
    },

    /* Rotating Farm: a fixed bed shades its own crops; a turning planter does not */
    rotate() {
      const sun = (x, y) => C(x, y, 22, 'f c') + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = k * Math.PI / 4; return L(`M${f(x + 30 * Math.cos(a))} ${f(y + 30 * Math.sin(a))} L${f(x + 40 * Math.cos(a))} ${f(y + 40 * Math.sin(a))}`, 'c'); }).join('');
      const plant = (x, base, hgt, ang = 0) => {
        const r = (ang * Math.PI) / 180, tx = x + hgt * Math.sin(r), ty = base - hgt * Math.cos(r);
        return L(`M${x} ${base} L${f(tx)} ${f(ty)}`, 'bd') + C(tx, ty, 9, 'f s') + C(tx, ty, 9, 'l th');
      };
      let s = T(20, 24, 'FIXED BED', 'k') + sun(80, 80);
      s += `<path class="f g" d="M180 310 L360 310 L180 150 Z" opacity=".7"/>`;
      s += L('M20 310 H400', '') + plant(180, 310, 160) + plant(270, 310, 90) + plant(340, 310, 50);
      s += L('M110 100 L175 150 M120 120 L262 222', 'c th ds');
      s += T(20, 350, 'ONE ANGLE FOR EVERY CROP.') + T(20, 368, 'THE TALL ONE SHADES THE REST.');
      s += T(480, 24, 'ROTATING PLANTER', 'k') + sun(540, 80);
      const cx = 700, cy = 220, r = 100;
      s += C(cx, cy, r, 'l bd') + C(cx, cy, 6, 'f');
      [-150, -120, -90, -60, -30].forEach((d) => { const a = (d * Math.PI) / 180, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); s += plant(f(x), f(y), 34, d + 90); });
      s += L(`M${cx + 120} ${cy + 40} A128 128 0 0 1 ${cx + 40} ${cy + 120}`, 'c bd') + A(cx + 56, cy + 115, cx + 40, cy + 120, 'c bd');
      s += L('M570 100 L640 140', 'c th ds');
      s += T(480, 350, 'THE PLANTER TURNS, SO EACH CROP', 'c') + T(480, 368, 'MEETS ITS OWN LIGHT. NO SENSORS.', 'c');
      return S(900, 380, s, 'Left: a fixed bed where tall plants shade short ones. Right: a turning planter that brings each crop to its light');
    },

    /* Biomimicry Helmet: where the force goes */
    impact() {
      let s = T(20, 24, 'TYPICAL HELMET', 'k');
      s += `<path class="f g" d="M60 280 C60 110 330 90 360 240 L350 280 Z"/>` + L('M60 280 C60 110 330 90 360 240 L350 280 Z', 'bd');
      s += A(200, 40, 200, 112, 'c bd');
      [-60, -30, 0, 30, 60].forEach((d) => { const a = ((d + 90) * Math.PI) / 180; s += L(`M${f(200 + 10 * Math.cos(a))} ${f(132 + 10 * Math.sin(a))} L${f(200 + 26 * Math.cos(a))} ${f(132 + 26 * Math.sin(a))}`, 'c'); });
      s += T(20, 320, 'TALL DOME. THE FORCE') + T(20, 338, 'LANDS ON ONE POINT.');
      s += T(470, 24, 'FROG-INSPIRED', 'k');
      s += `<path class="f s" d="M480 280 C480 200 600 150 740 158 C830 164 880 220 880 280 Z"/>` + L('M480 280 C480 200 600 150 740 158 C830 164 880 220 880 280 Z', 'bd');
      for (let k = 0; k < 5; k++) s += L(`M${560 + k * 60} ${f(196 - k * 6 + (k > 2 ? (k - 2) * 12 : 0))} q24 -8 48 0`, 'th');
      s += A(700, 60, 700, 140, 'c bd');
      s += L('M690 150 C640 150 580 172 530 214', 'c bd') + A(548, 200, 530, 214, 'c bd');
      s += L('M712 150 C770 150 820 176 850 214', 'c bd') + A(836, 198, 850, 214, 'c bd');
      s += T(470, 320, 'LOW AND WIDE. THE FORCE SPREADS', 'c') + T(470, 338, 'SIDEWAYS ALONG A RIDGED SHELL.', 'c');
      return S(900, 350, s, 'A tall helmet takes impact at one point; the low, wide frog-inspired shell spreads it sideways');
    },

    /* Future Kettle: one cup in a wide kettle vs a narrow one */
    onecup() {
      let s = T(20, 24, 'A TYPICAL KETTLE', 'k');
      s += `<path class="f s" d="M74 300 H346 V316 H74 Z"/>` + L('M60 120 H360 L350 320 H70 Z', 'bd') + L('M360 160 Q420 170 400 260 L352 280', '') + L('M60 140 L20 110', 'bd');
      s += L('M70 270 H130', 'ds') + T(140, 274, 'MIN LINE', '');
      s += T(20, 356, 'ONE CUP IS A THIN LAYER,') + T(20, 374, 'BELOW THE LINE YOU CAN SEE.');
      s += T(520, 24, 'FUTURE KETTLE', 'k');
      const x = 600, w = 110, top = 60, bot = 320;
      s += `<path class="f s" d="M${x + 6} ${bot - 46} H${x + w - 6} V${bot - 4} H${x + 6} Z"/>` + L(`M${x} ${top} H${x + w} V${bot} H${x} Z`, 'bd');
      s += R(x + w - 26, top + 20, 14, bot - top - 40, 7, 'l c');
      ['1 CUP', '2', '3', '4'].forEach((t, k) => { const y = bot - 46 - k * 46; s += L(`M${x + w} ${y} h14`, 'c') + T(x + w + 20, y + 4, t, 'c'); });
      s += L(`M${x + w + 70} 140 Q${x + w + 120} 160 ${x + w + 110} 240 L${x + w + 4} 250`, '') + L(`M${x} ${top + 10} L${x - 40} ${top - 20}`, 'bd');
      s += T(520, 356, 'NARROW, GRADUATED, SEE-THROUGH:', 'c') + T(520, 374, 'YOU BOIL WHAT YOU NEED.', 'c');
      return S(900, 390, s, 'The same cup of water: a thin, hidden layer in a wide kettle, and a clear, measurable column in the narrow Future Kettle');
    },

    /* Ergonomic Easel: open, folded, rolling */
    fold() {
      let s = T(20, 24, '01 · OPEN', 'k');
      s += L('M60 200 L280 200', 'bd') + L('M90 200 L66 300 M250 200 L274 300', 'bd') + L('M84 200 L130 52', 'c bd') + C(258, 214, 9, 'l');
      s += T(20, 340, 'SIT, BOARD AT ONE OF FIVE ANGLES');
      [52, 64, 76, 88].forEach((d) => { const a = (d * Math.PI) / 180; s += L(`M84 200 L${f(84 + 120 * Math.cos(Math.PI - a) * -1)} ${f(200 - 120 * Math.sin(a))}`, 'c th ds'); });
      s += T(330, 24, '02 · FOLDED', 'k');
      s += L('M340 196 L560 196', 'c bd') + L('M340 206 L560 206', 'bd') + L('M346 216 L554 216', 'bd') + C(548, 230, 9, 'l') + L('M336 196 v20 M564 196 v20', 'th');
      s += T(330, 340, 'FLAPS FOLD FLAT, TRAY INSIDE');
      s += T(620, 24, '03 · ROLLING', 'k');
      s += L('M650 120 L840 260', 'c bd') + L('M644 130 L834 270', 'bd') + L('M638 140 L826 280', 'bd') + C(836, 288, 12, 'l bd') + L('M640 108 q-14 -20 4 -30 q18 -6 20 14', 'bd');
      s += A(760, 312, 860, 312, 'c bd') + L('M700 300 H880', 'g');
      s += T(620, 340, 'TIP IT ONTO ITS WHEELS AND ROLL');
      return S(900, 350, s, 'The easel open with five board angles, folded flat, and tipped onto its wheels to roll');
    },

    /* FinderSeeker: in range, buzz; out of range, map */
    range() {
      const cx = 260, cy = 190;
      let s = C(cx, cy, 150, 'f s') + C(cx, cy, 150, 'l c ds') + R(cx - 20, cy - 36, 40, 72, 8, 'f') + R(cx - 14, cy - 28, 28, 52, 3, 'f w');
      s += T(cx, cy + 62, 'YOUR PHONE', 'k', 'middle') + T(cx, 30, 'BLUETOOTH RANGE', 'c', 'middle');
      // glasses
      const gx = 330, gy = 110; s += C(gx - 16, gy, 12, 'l bd') + C(gx + 16, gy, 12, 'l bd') + L(`M${gx - 4} ${gy} h8`, 'bd');
      for (let k = 1; k <= 3; k++) s += L(`M${gx + 30 + k * 7} ${gy - 8 - k * 3} q${6 + k * 2} ${8 + k * 3} 0 ${16 + k * 6}`, 'c');
      s += H(cx, 372, 'In range', '', 'middle') + T(cx, 392, 'GLASSES · BUZZ IT, FOLLOW THE SOUND', '', 'middle');
      // purse
      const px = 690, py = 190; s += R(px - 30, py - 16, 60, 44, 6, 'l bd') + L(`M${px - 16} ${py - 16} q16 -30 32 0`, 'bd');
      s += L(`M${cx + 24} ${cy} C 470 ${cy - 80}, 560 ${cy + 60}, ${px - 40} ${py}`, 'c ds') + A(px - 52, py - 2, px - 40, py, 'c');
      s += L('M520 168 c0 -14 -22 -14 -22 0 c0 10 11 22 11 22 c0 0 11 -12 11 -22 Z', 'c') + C(509, 168, 3, 'f c');
      s += H(600, 262, 'Out of range') + T(600, 282, 'PURSE · LAST SEEN ON THE MAP') + T(600, 300, 'GO THERE, THEN BUZZ');
      return S(900, 404, s, 'Inside Bluetooth range you buzz the tag; outside it you see where it was last seen on the map, go there, then buzz');
    },

    /* Galaxy Buds: why curve continuity matters on a glossy part */
    continuity() {
      const panel = (x, d, j, name, note, c) => L(d, c) + C(j[0], j[1], 6, 'f c') + H(x, 230, name) + T(x, 250, note);
      let s = '';
      s += panel(30, 'M30 190 L150 90 L270 190', [150, 90], 'Touching', 'A CREASE. LIGHT BREAKS.', 'bd');
      s += panel(330, 'M330 190 L430 106 C460 82 520 84 570 190', [430, 106], 'Tangent', 'SMOOTH, BUT THE HIGHLIGHT KINKS', 'bd');
      s += panel(630, 'M630 190 C660 120 700 90 750 90 C800 90 840 120 870 190', [750, 90], 'Curvature', 'ONE UNBROKEN HIGHLIGHT', 'c bd');
      s += T(30, 30, 'THREE WAYS TWO SURFACES CAN MEET', 'k');
      return S(900, 262, s, 'Three ways two surfaces can meet: touching, tangent, and curvature-continuous, which gives one unbroken highlight');
    },

    /* MindGym: version one vs version two of onboarding */
    flows() {
      let s = T(20, 26, 'VERSION 1 · FEATURE-LED', 'k');
      let x = 20; ['Feature tour', 'Sign up', 'Full dashboard'].forEach((t, i) => { const w = t.length * 7.6 + 28; s += box(x, 44, t, '', w); x += w; if (i < 2) { s += A(x + 6, 64, x + 40, 64, 'g'); x += 46; } });
      s += A(x + 6, 64, x + 40, 64, 'g') + T(x + 50, 60, 'TOO MUCH AT ONCE.', 'k') + T(x + 50, 76, 'PEOPLE DROPPED OFF.');
      s += T(20, 156, 'VERSION 2 · GOAL-LED', 'c');
      x = 20; ['What are you preparing for?', 'Six small questions', 'Mood check-in', 'First session'].forEach((t, i) => { const w = t.length * 7.6 + 28; s += box(x, 174, t, 'c', w); x += w; if (i < 3) { s += A(x + 6, 194, x + 30, 194, 'c'); x += 36; } });
      s += T(20, 250, 'ONE QUESTION AT A TIME. FEWER DROP-OFFS.', 'c');
      return S(900, 262, s, 'Version one led with features and overwhelmed people; version two asks one goal question, then six small ones, then a first session');
    },

    /* NoBias: the four steps and the three verdicts */
    pipeline() {
      const st = ['Pick a field', 'Describe participants', 'Paste the script', 'Accept the fixes'];
      let s = L('M60 70 H780', 'g bd');
      st.forEach((t, i) => { const x = 60 + i * 240; s += C(x, 70, 26, i === 3 ? 'f c' : 'f w') + C(x, 70, 26, 'l c bd') + `<text class="b" x="${x}" y="76" text-anchor="middle" style="${i === 3 ? 'fill:#fff' : 'fill:var(--c)'}">${i + 1}</text>` + B(x, 128, t, '', 'middle'); });
      const sev = [['#E5484D', 'FIX REQUIRED'], ['#E5A100', 'REVIEW'], ['#2E9E5B', 'LOOKS CLEAR']];
      s += T(60, 186, 'EVERY QUESTION GETS ONE OF THREE VERDICTS, AND A REWRITE', 'k');
      sev.forEach(([c, t], i) => { s += `<rect x="${60 + i * 200}" y="202" width="180" height="34" rx="17" style="fill:${c}"/>` + `<text class="t" x="${150 + i * 200}" y="223" text-anchor="middle" style="fill:#fff">${t}</text>`; });
      return S(840, 250, s, 'Four steps: pick a field, describe participants, paste the script, accept the fixes. Each question gets a verdict and a rewrite');
    },

    /* Phenomena: where my work sat across the studio's projects */
    matrix() {
      const cols = ['Research', 'Concept', 'Design', 'Make', 'Deliver'];
      const rows = [['Simulands website', [0, 1, 1, 0, 1]], ['PCR London booths', [0, 1, 1, 1, 1]], ['Coffee table', [0, 1, 1, 1, 0]], ['Market research', [1, 0, 0, 0, 1]]];
      let s = '';
      cols.forEach((c, i) => { s += T(330 + i * 128, 30, c.toUpperCase(), 'k', 'middle'); });
      rows.forEach(([r, v], j) => {
        const y = 80 + j * 62; s += L(`M20 ${y + 31} H880`, 'g th') + B(20, y + 6, r);
        v.forEach((on, i) => { s += on ? C(330 + i * 128, y, 13, 'f c') : C(330 + i * 128, y, 13, 'l g'); });
        let a = -1, b = -1; v.forEach((on, i) => { if (on) { if (a < 0) a = i; b = i; } });
      });
      return S(900, 330, s, 'A grid of four studio projects against five stages, showing which stages I worked on');
    },
  };
})();

;
// Drawn diagrams for the studio projects: the mechanism behind each piece, explained in one picture.
(() => {
  const f = (n) => Math.round(n * 10) / 10;
  const S = (w, h, body, label) => `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
  const L = (d, c = '') => `<path class="l ${c}" d="${d}"/>`;
  const T = (x, y, t, c = '', a = 'start') => `<text class="t ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const H = (x, y, t, c = '', a = 'start') => `<text class="h ${c}" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const C = (cx, cy, r, c = 'l') => `<circle class="${c}" cx="${f(cx)}" cy="${f(cy)}" r="${r}"/>`;
  const R = (x, y, w, h, rx = 0, c = 'l') => `<rect class="${c}" x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${rx}"/>`;
  const A = (x1, y1, x2, y2, c = 'c') => {
    const a = Math.atan2(y2 - y1, x2 - x1), k = 9;
    return L(`M${x1} ${y1} L${x2} ${y2}`, c) + L(`M${f(x2 - k * Math.cos(a - .45))} ${f(y2 - k * Math.sin(a - .45))} L${x2} ${y2} L${f(x2 - k * Math.cos(a + .45))} ${f(y2 - k * Math.sin(a + .45))}`, c);
  };

  Object.assign(window.DIAGRAMS = window.DIAGRAMS || {}, {
    /* Resurrected: a phenakistiscope. 12 frames, 30° apart; the disc turns in 30° steps, so each slot shows the next frame. */
    disc() {
      const cx = 220, cy = 220, R1 = 170, n = 12;
      let s = C(cx, cy, 190, 'f g') + C(cx, cy, 190, 'l') + C(cx, cy, 14, 'f');
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2, x = cx + R1 * .72 * Math.cos(a), y = cy + R1 * .72 * Math.sin(a);
        const sun = 22 - Math.abs(6 - i) * 3.2; // the sun sets and rises around the ring
        s += L(`M${f(cx + 40 * Math.cos(a - .26))} ${f(cy + 40 * Math.sin(a - .26))} L${f(cx + R1 * Math.cos(a - .26))} ${f(cy + R1 * Math.sin(a - .26))}`, 'th g');
        s += C(x, y, Math.max(6, sun / 1.4), i === 0 ? 'f c' : 'f s') + C(x, y, Math.max(6, sun / 1.4), 'l th');
        s += `<text class="t" x="${f(cx + (R1 + 4) * .93 * Math.cos(a))}" y="${f(cy + (R1 + 4) * .93 * Math.sin(a) + 4)}" text-anchor="middle">${String(i + 1).padStart(2, '0')}</text>`;
      }
      s += L(`M${cx + 205} ${cy - 90} A230 230 0 0 1 ${cx + 205} ${cy + 90}`, 'c bd') + A(cx + 212, cy + 74, cx + 205, cy + 90, 'c bd');
      s += T(cx + 150, cy + 150, '30° A STEP', 'c');
      // the frames laid flat
      const x0 = 520, y0 = 120, w = 58;
      s += T(x0, 60, 'THE SAME TWELVE FRAMES, LAID FLAT', 'k');
      for (let i = 0; i < n; i++) {
        const col = i % 6, row = Math.floor(i / 6), x = x0 + col * (w + 6), y = y0 + row * 120, sun = 22 - Math.abs(6 - i) * 3.2;
        s += R(x, y, w, 90, 6, 'f w') + R(x, y, w, 90, 6, 'l th') + L(`M${x} ${y + 60} H${x + w}`, 'th') + C(x + w / 2, y + 60 - sun * .9, Math.max(5, sun / 1.6), i === 0 ? 'f c' : 'f s');
        s += T(x + w / 2, y + 108, String(i + 1).padStart(2, '0'), '', 'middle');
      }
      s += T(x0, 380, 'AT REST: A RING OF DRAWINGS.') + T(x0, 398, 'SPINNING: ONE SUN SETTING AND RISING.', 'c');
      return S(900, 420, s, 'A phenakistiscope disc: twelve frames placed thirty degrees apart; turning the disc in thirty-degree steps fills each slot with the next frame');
    },

    /* Three Londons: one sheet, one cut. Eight panels, top row upside down. */
    zine() {
      const x0 = 40, y0 = 40, w = 130, h = 160;
      const top = [5, 4, 3, 2], bot = [6, 7, 8, 1], names = { 1: 'Cover', 2: 'Brockley Rise', 3: 'Brockley X', 4: 'New Cross', 5: 'Old Kent Rd', 6: 'Elephant', 7: 'Waterloo Br', 8: 'Aldwych' };
      let s = '';
      [top, bot].forEach((row, r) => row.forEach((n, i) => {
        const x = x0 + i * w, y = y0 + r * h;
        s += R(x, y, w, h, 0, n === 1 ? 'f s' : 'f w') + R(x, y, w, h, 0, 'l th');
        s += r === 0
          ? `<g transform="rotate(180 ${x + w / 2} ${y + h / 2})"><text class="big" x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" style="font-size:40px">${n}</text><text class="t" x="${x + w / 2}" y="${y + h / 2 + 40}" text-anchor="middle">${names[n].toUpperCase()}</text></g>`
          : `<text class="big" x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" style="font-size:40px">${n}</text><text class="t" x="${x + w / 2}" y="${y + h / 2 + 40}" text-anchor="middle">${names[n].toUpperCase()}</text>`;
      }));
      s += L(`M${x0 + 4 * w / 2 - 0} ${y0} V${y0 + 2 * h}`, 'ds') + L(`M${x0 + w} ${y0} V${y0 + 2 * h} M${x0 + 3 * w} ${y0} V${y0 + 2 * h}`, 'ds th') + L(`M${x0} ${y0 + h} H${x0 + w}`, 'ds th') + L(`M${x0 + 3 * w} ${y0 + h} H${x0 + 4 * w}`, 'ds th');
      s += L(`M${x0 + w} ${y0 + h} H${x0 + 3 * w}`, 'c bd');
      s += T(x0 + 2 * w, y0 + h - 10, 'THE ONLY CUT', 'c', 'middle');
      const lx = 640;
      s += H(lx, 70, 'One sheet, one cut') + T(lx, 96, 'DASHED LINES FOLD') + T(lx, 116, 'RED LINE IS THE ONLY CUT', 'c') + T(lx, 136, 'TOP ROW PRINTS UPSIDE DOWN');
      s += T(lx, 176, 'FOLD IT AND EVERY PAGE') + T(lx, 196, 'LANDS THE RIGHT WAY UP.');
      s += R(lx, 230, 70, 90, 3, 'f s') + R(lx, 230, 70, 90, 3, 'l') + R(lx + 8, 238, 70, 90, 3, 'l th') + T(lx + 90, 280, 'A6 BOOKLET,') + T(lx + 90, 298, 'EIGHT PAGES');
      return S(900, 380, s, 'The zine imposition: eight panels on one sheet, the top row printed upside down, folded on the dashed lines with one cut across the middle');
    },

    /* Wish You Were Then: how a lenticular works. Two pictures cut into strips, interleaved under ridges. */
    lenticular() {
      let s = T(20, 26, 'THEN', 'k') + T(20, 160, 'NOW', 'k');
      s += R(20, 36, 200, 90, 4, 'f s') + R(20, 36, 200, 90, 4, 'l') + R(20, 170, 200, 90, 4, 'f g') + R(20, 170, 200, 90, 4, 'l');
      s += A(236, 81, 300, 130, 'g') + A(236, 215, 300, 170, 'g');
      const x0 = 320, y0 = 80, sw = 14;
      for (let i = 0; i < 20; i++) s += R(x0 + i * sw, y0, sw, 110, 0, i % 2 ? 'f g' : 'f s');
      s += R(x0, y0, 20 * sw, 110, 0, 'l');
      let rid = `M${x0} ${y0}`; for (let i = 0; i < 10; i++) rid += ` q${sw} -16 ${sw * 2} 0`;
      s += L(rid, 'c bd');
      s += T(x0, y0 - 30, 'STRIPS INTERLEAVED UNDER RIDGED PLASTIC', 'k');
      s += T(x0, y0 + 136, 'ON SCREEN: 4 PX STRIPES THAT WIDEN', '') + T(x0, y0 + 154, 'FROM NOTHING TO FULL AS IT TILTS', '');
      // the eye and the tilt
      const ex = 700, ey = 135;
      s += `<path class="l bd" d="M${ex} ${ey} q22 -20 44 0 q-22 20 -44 0 Z"/>` + C(ex + 22, ey, 7, 'f');
      s += L(`M${ex - 6} ${ey - 6} L${x0 + 20 * sw + 6} ${y0 + 10}`, 'c ds') + L(`M${ex - 6} ${ey + 6} L${x0 + 20 * sw + 6} ${y0 + 100}`, 'g ds');
      s += T(ex + 60, ey - 26, 'TILT ONE WAY:', 'k') + T(ex + 60, ey - 8, 'YOU SEE THEN', 'c') + T(ex + 60, ey + 18, 'TILT BACK:', 'k') + T(ex + 60, ey + 36, 'YOU SEE NOW');
      return S(900, 280, s, 'A lenticular postcard: the then and now pictures are cut into strips and interleaved under ridged plastic, so tilting it shows one or the other');
    },

    /* Tare: why a stencil letter needs bridges, and how Tare cuts them in the same place every time. */
    stencil() {
      const O = (x, y, cut) => {
        let s = `<path class="f" d="M${x} ${y} h120 v160 h-120 Z M${x + 34} ${y + 34} v92 h52 v-92 Z" fill-rule="evenodd"/>`;
        if (cut) s += R(x + 43, y - 2, 34, 38, 0, 'f w') + R(x + 43, y + 124, 34, 38, 0, 'f w') + L(`M${x + 43} ${y - 12} v20 M${x + 77} ${y - 12} v20`, 'c th');
        return s;
      };
      let s = T(20, 30, 'A SOLID O', 'k') + O(40, 60, false) + T(40, 250, 'CUT AS A STENCIL, THE MIDDLE');
      s += T(40, 268, 'FALLS OUT.');
      s += R(64 + 10, 94, 52, 92, 0, 'l c ds');
      s += T(340, 30, 'TARE: TWO BRIDGES, 34 UNITS', 'c') + O(360, 60, true) + T(360, 250, 'THE BRIDGES HOLD THE COUNTER') + T(360, 268, 'IN PLACE. SAME CUT ON EVERY LETTER.');
      s += T(420, 50, '34', 'c', 'middle');
      s += T(660, 30, 'BOTH WEIGHTS, ONE GRID', 'k');
      s += `<path class="f" d="M660 60 h120 v160 h-120 Z M694 94 v92 h52 v-92 Z" fill-rule="evenodd"/>` + R(703, 58, 34, 38, 0, 'f w') + R(703, 184, 34, 38, 0, 'f w');
      s += `<path class="f c" d="M800 60 h90 v160 h-90 Z M820 80 v120 h50 v-120 Z" fill-rule="evenodd"/>` + R(828, 58, 34, 24, 0, 'f w') + R(828, 198, 34, 24, 0, 'f w');
      s += T(660, 250, 'REGULAR · 150') + T(800, 250, 'LIGHT · 88', 'c');
      return S(900, 290, s, 'A solid O cut as a stencil loses its middle; Tare adds two 34-unit bridges in the same place on every letter, in both weights');
    },

    /* Postage Due: two sheets, two ways of printing. Engraved lines vs halftone dots. */
    printing() {
      let s = T(20, 26, 'LOST WORDS · INTAGLIO', 'k');
      s += R(20, 40, 380, 200, 6, 'f w') + R(20, 40, 380, 200, 6, 'l');
      for (let i = 0; i < 26; i++) { let d = `M40 ${60 + i * 7}`; for (let k = 0; k < 17; k++) d += ` q10 ${i % 2 ? -3 : 3} 20 0`; s += L(d, 'c th'); }
      s += T(20, 262, 'ALL LINE, NO FLAT COLOUR. ONE INK PER WORD.');
      s += T(480, 26, 'ENDANGERED CRAFTS · OFFSET', 'k');
      s += R(480, 40, 380, 200, 6, 'f w') + R(480, 40, 380, 200, 6, 'l');
      const cols = ['#00A3D9', '#E0157A', '#F7D417', '#1A1A1A'];
      for (let y = 0; y < 13; y++) for (let x = 0; x < 24; x++) { const r = 2 + 4.5 * Math.abs(Math.sin((x + y) / 5)); s += `<circle cx="${498 + x * 15 + (y % 2) * 7}" cy="${58 + y * 14}" r="${f(r)}" style="fill:${cols[(x + y * 2) % 4]};opacity:.85"/>`; }
      s += T(480, 262, 'FOUR INKS IN DOTS: CYAN, MAGENTA, YELLOW, BLACK.');
      return S(880, 276, s, 'Lost Words is engraved in fine wavy lines with one ink; Endangered Crafts is printed in four-colour halftone dots');
    },
  });
})();

;
// Two small interactive demos, ported from the earlier build.
window.DEMOS = {
  /* TransfoRim: drag from road to rubble and the rim opens into spikes */
  morph: {
    id: 'mSvg',
    html: `<div class="k-demo"><div class="hd m"><b>Try it · drag to change the ground</b><span id="mRead">Road · spikes in</span></div>
      <svg id="mSvg" viewBox="0 0 800 340" aria-hidden="true">
        <path id="mGround" fill="none" stroke="#8A8A85" stroke-width="1.6"/>
        <g id="mWheel"><path id="mRim" fill="none" stroke="#fff" stroke-width="2"/><path id="mSpk" fill="none" stroke="var(--c)" stroke-width="2"/><circle cx="0" cy="0" r="16" fill="var(--c)"/></g>
        <path id="mDim" fill="none" stroke="var(--c)" stroke-width="1.4"/>
      </svg>
      <div class="k-ctl m"><span>Road</span><input type="range" id="mRange" min="0" max="100" value="0" aria-label="Ground, from road to rubble"><span>Rubble</span></div></div>`,
    run(reduce) {
      const $ = (id) => document.getElementById(id);
      const range = $('mRange'), rim = $('mRim'), spk = $('mSpk'), ground = $('mGround'), wheel = $('mWheel'), dim = $('mDim'), read = $('mRead');
      const R = 92, LOBES = 6, f = (n) => n.toFixed(1);
      let t = 0, target = 0, roll = 0, last = performance.now(), touched = false, vis = false;
      const gy = (x) => 280 - t * 26 * (Math.max(0, Math.sin(x / 38)) ** 2 + .5 * Math.max(0, Math.sin(x / 17 + 1)) ** 3);
      new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe($('mSvg'));
      function draw(now) {
        const dt = Math.min(50, now - last); last = now;
        if (vis) {
          t += (target - t) * Math.min(1, dt / 160);
          if (!reduce) roll += dt * .0009 * (1 - t * .55);
          let d = '', s = '';
          for (let k = 0; k <= 180; k++) { const a = (k / 180) * Math.PI * 2, r = R * (1 - .16 * t) + t * 60 * Math.max(0, Math.cos(LOBES * a)) ** 6; d += (k ? 'L' : 'M') + f(r * Math.cos(a)) + ' ' + f(r * Math.sin(a)); }
          for (let k = 0; k < LOBES; k++) { const a = (k / LOBES) * Math.PI * 2, r = R * (1 - .16 * t) + t * 60; s += `M${f(16 * Math.cos(a))} ${f(16 * Math.sin(a))}L${f(r * Math.cos(a))} ${f(r * Math.sin(a))}`; }
          rim.setAttribute('d', d); spk.setAttribute('d', s);
          let g = ''; for (let x = 0; x <= 800; x += 8) g += (x ? 'L' : 'M') + x + ' ' + f(gy(x + roll * 200)); ground.setAttribute('d', g);
          const reach = R * (1 - .16 * t) + t * 60 * .85;
          wheel.setAttribute('transform', `translate(400 ${f(280 - reach - t * 8)}) rotate(${f(roll * 57.3)})`);
          const top = 280 - reach * 2 - t * 8; dim.setAttribute('d', `M560 280 H600 M560 ${f(top)} H600 M590 280 V${f(top)}`);
          read.textContent = `${t < .33 ? 'Road' : t < .66 ? 'Gravel' : 'Rubble'} · ${t < .05 ? 'spikes in' : 'spikes out'}`;
        }
        requestAnimationFrame(draw);
      }
      range.addEventListener('input', () => { touched = true; target = Number(range.value) / 100; });
      if (!reduce) { let dir = 1; const demo = setInterval(() => { if (touched) return clearInterval(demo); target = dir > 0 ? .85 : 0; range.value = String(target * 100); dir *= -1; }, 2600); }
      requestAnimationFrame(draw);
    },
  },

  /* NoBias in miniature: a few plain rules run in the browser. The real tool uses AI and 20 checks. */
  bias: {
    id: 'bq',
    html: `<div class="k-demo"><div class="hd m"><b>Try it · one question</b><span>5 of 20 checks · runs in your browser</span></div>
      <div class="k-bias"><div><label class="m" for="bq" style="color:#9A9A95">Your question</label>
        <textarea id="bq" rows="3" spellcheck="false">Don't you think the new app is much easier and faster to use?</textarea>
        <div class="samples"><button type="button" class="chip" data-q="Why don't you exercise more?">Try another</button><button type="button" class="chip" data-q="Can you tell me about the last time you booked a doctor's appointment?">A good one</button></div></div>
      <div class="out" aria-live="polite"><div class="score m"><span>Score</span><b id="bScore">–</b><i id="bVerdict"></i></div><ul id="bList"></ul><div class="fix m"><span>Rewrite</span><p id="bFix"></p></div></div></div></div>`,
    run() {
      const rules = [
        [/^\s*(don'?t|doesn'?t|isn'?t|aren'?t|wouldn'?t|shouldn'?t|won'?t)\s+you\b|wouldn'?t you agree|isn'?t it true|right\?\s*$/i, ['r', 'Leading: points to an answer']],
        [/\b(obviously|clearly|simply|just|much|so|really|terrible|amazing|great|awful|easier|better|worse|faster)\b/i, ['w', 'Loaded wording']],
        [/\b(and|or)\b[^?]*\?/i, ['w', 'Double-barrelled: two questions in one']],
        [/^\s*(do|does|did|is|are|was|were|would|will|can|could|have|has|should|don'?t|isn'?t)\b(?!\s+you\s+(tell|describe|walk|talk|explain))/i, ['w', 'Closed: invites yes or no']],
        [/\bwhy (don'?t|didn'?t|do|did|haven'?t)\s+you\b/i, ['r', 'Assumes a behaviour']],
      ];
      const q = document.getElementById('bq'), $ = (id) => document.getElementById(id);
      const rewrite = (s, hits) => {
        if (!hits.length) return 'Looks clear. Keep it.';
        if (/\bexercise\b/i.test(s)) return 'Walk me through a typical week. Where does movement fit, if at all?';
        let t = s.trim().replace(/^(don'?t|doesn'?t|isn'?t|aren'?t|wouldn'?t|why don'?t|why didn'?t)\s+you\s+(think\s+)?/i, '').replace(/\?$/, '').replace(/\b(much|really|so|just|simply|obviously|clearly)\s+/gi, '');
        const first = t.split(/\s+(and|or)\s+/i)[0];
        return `How would you describe ${first.replace(/^(the|a|an)\s+/i, 'the ').replace(/\s+(is|are|was)\s+.*$/i, '')}?`.replace(/\s+/g, ' ');
      };
      const run = () => {
        const s = q.value, hits = rules.filter(([re]) => re.test(s)).map(([, h]) => h);
        const score = Math.max(0, 5 - hits.reduce((a, h) => a + (h[0] === 'r' ? 1.4 : .7), 0));
        $('bScore').textContent = s.trim() ? score.toFixed(1) : '–';
        $('bVerdict').textContent = !s.trim() ? '' : score >= 4.5 ? 'Looks clear' : score >= 3 ? 'Review' : 'Needs work';
        $('bList').innerHTML = hits.length ? hits.map(([sv, n]) => `<li class="${sv}"><em>${sv === 'r' ? 'FIX REQUIRED' : 'REVIEW'}</em><span>${n}</span></li>`).join('') : '<li class="ok"><em>LOOKS CLEAR</em><span>No issues found by these checks</span></li>';
        $('bFix').textContent = s.trim() ? rewrite(s, hits) : '';
      };
      let tm = 0; q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(run, 180); });
      document.querySelectorAll('.k-bias .chip').forEach((b) => b.addEventListener('click', () => { q.value = b.dataset.q; run(); }));
      run();
    },
  },
};

;
// Studio project pages. Same structure as the product site; every page leads with the live piece.
// Part types: live (the interactive object), beats (motion timing), fonts, plus call, fig, notes, cards, gal, cmp, sw, list.
const W = (s, f) => `work/${s}/${f}.webp`;

window.CASES = {
  /* ───────── Resurrected ───────── */
  resurrected: {
    ctx: 'Self-initiated', one: 'Three records, re-sleeved: covers that only come alive when they spin.',
    facts: [['Role', 'Concept, graphics, motion, sound'], ['Pieces', '3 sleeves, 3 picture discs'], ['Type', 'Self-initiated'], ['Year', '2026']],
    theme: 'vinyl',
    glanceHtml: '<div class="rs-glance"><div class="rs-label"><b>Resurrected</b><i>Side A · 33⅓ rpm</i><span class="rs-hole"></span><ul><li><em>3</em> records re-sleeved</li><li><em>12–16</em> frames a disc</li><li><em>30°</em> between frames</li></ul></div><div class="rs-notes"><p class="rs-k">Liner notes</p><h3>Album covers are the most crowded brief in any portfolio.</h3><p>A nicer square rarely stands out. So each picture disc became a phenakistiscope: the art only comes alive when the record turns.</p></div></div>',
    cover: W('resurrected', 'coverdiscovery'), coverAlt: 'The Discovery sleeve', coverContain: true, coverBg: '#1A1A1A',
    stats: [['3', 'records re-sleeved'], ['12–16', 'animation frames on each disc'], ['30°', 'between frames']],
    tldr: ['Album covers are the most crowded brief in any portfolio. A nicer square rarely stands out.', 'Make each picture disc a phenakistiscope, so the art only resolves when the record turns.', 'Three sleeves and discs you can pull out, spin and hear.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', dark: true, h: 'Pull a record *out of its sleeve*', sub: 'Click a sleeve. The disc slides out, lifts, settles and spins.', parts: [{ t: 'live', src: 'live/resurrected.html', h: 1100, hint: 'Click a sleeve · sound on for the needle' }] },
      { t: 'state', lab: 'The idea', h: 'The answer came from the 1830s: *Joseph Plateau’s phenakistiscope.*', items: [['A ring of drawings', 'Each one slightly different from the last.'], ['Spin it', 'The drawings become one moving image.'], ['A picture disc', 'On a turntable, it is already most of the way there.']] },
      { t: 'sp', lab: 'The trick', h: 'In step, *it moves*', sub: 'The disc turns exactly one drawing at a time. Try it the other way.', parts: [{ t: 'live', src: 'work/ui/resurrected/strobe.html', h: 520, hint: 'Live · switch between in step and free spin' }] },
      { t: 'sp', lab: 'Three records', h: 'Three sleeves, *three ideas*', sub: 'Point at a sleeve to slide the disc out.', parts: [{ t: 'html', html: '<div class="rs-crate"><figure class="rs-sleeve" tabindex="0"><div class="rs-stack"><img class="rs-disc" src="work/resurrected/discpastel.webp" alt="Pastel Blues picture disc" loading="lazy"><img class="rs-cover" src="work/resurrected/coverpastel.webp" alt="Pastel Blues sleeve" loading="lazy"></div><figcaption><span>Nina Simone · 1965</span><b>Pastel Blues</b><p>Soft serif and a sinking peach sun. Rising bars become the ten restless minutes of “Sinnerman”.</p></figcaption></figure><figure class="rs-sleeve" tabindex="0"><div class="rs-stack"><img class="rs-disc" src="work/resurrected/discdiscovery.webp" alt="Discovery picture disc" loading="lazy"><img class="rs-cover" src="work/resurrected/coverdiscovery.webp" alt="Discovery sleeve" loading="lazy"></div><figcaption><span>Daft Punk · 2001</span><b>Discovery</b><p>Built from one 10-pixel dot. On the disc, a level meter dances and loops.</p></figcaption></figure><figure class="rs-sleeve" tabindex="0"><div class="rs-stack"><img class="rs-disc" src="work/resurrected/discblonde.webp" alt="Blonde picture disc" loading="lazy"><img class="rs-cover" src="work/resurrected/coverblonde.webp" alt="Blonde sleeve" loading="lazy"></div><figcaption><span>Frank Ocean · 2016</span><b>Blonde</b><p>“blond” above the horizon, its “e” below. The sun sinks and returns as the moon.</p></figcaption></figure></div>' }] },
      { t: 'sp', lab: 'Motion', h: 'Handled like *a real record*', sub: 'Four beats, each with its own easing, about two and a half seconds end to end.', parts: [{ t: 'beats', items: [['Slide out', 1.1, 0], ['Lift onto sleeve', 1.0, 1.1], ['Settle', 0.45, 2.1], ['Picture appears, spins', 0.6, 2.7]], cap: 'Ease-in-out · ease-out at 103% · slight overshoot · loops' }] },
      { t: 'quote', lab: 'Sound', q: 'What you hear is a needle and some dust. The songs stay with their rightful owners, and their lawyers.' },
    ],
    out: { h: 'Three sleeves and three picture discs, *each one a working phenakistiscope.*', chips: ['Graphics', 'Motion', 'Interaction', 'Sound'], note: 'Unofficial concept sleeves, not affiliated with the artists or labels.', kit: 'Cover art · disc artwork · motion · synthesised needle and crackle', img: 'work/ui/thumb/resurrected.webp', alt: 'The three picture discs' },
  },

  /* ───────── Small Remedies ───────── */
  'small-remedies': {
    ctx: 'Self-initiated', one: 'Remedies for modern London troubles, packaged like the chemist’s shelf of 1900.',
    facts: [['Role', 'Concept, packaging, type, writing, motion'], ['Pieces', '3 boxes, 3 prescriptions'], ['Type', 'Self-initiated'], ['Year', '2026']],
    theme: 'chemist',
    glanceHtml: '<div class="sr-glance"><div class="sr-label"><p class="sr-from"><i>From</i> SMALL REMEDIES <i>&amp; Co., Druggists</i></p><p class="sr-no">No. 0 · The brief</p><h3>London gives you troubles no chemist can fix.</h3><p class="sr-band">the last train · the rain · rent day</p><div class="sr-dose"><div><b>3</b>remedies</div><div><b>5</b>typefaces, one job each</div><div><b>3s</b>to open a box</div></div><p class="sr-addr">Brockley Rise &amp; Stondon Park, London S.E.</p></div><div class="sr-idea"><p class="sr-k">Prescribed</p><p class="sr-typed">Play a Victorian chemist’s packaging completely straight, and prescribe a virtue for each trouble.</p><p class="sr-hand">trust the chemist</p></div></div>',
    cover: 'work/ui/thumb/small-remedies.webp', coverAlt: 'The three Small Remedies boxes',
    stats: [['3', 'remedies for London troubles'], ['5', 'typefaces, one job each'], ['3s', 'to open a box']],
    tldr: ['London gives you troubles no chemist can fix: the last train, the rain, rent day.', 'Play a Victorian chemist’s packaging completely straight, and prescribe a virtue for each.', 'Three boxes that open, unfold a prescription and slide out a blister pack.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', tone: 'resilience', h: 'Open a box', sub: 'Click a box. The lid tips back, the prescription rises and unfolds, the blister slides out.', parts: [{ t: 'live', src: 'live/small-remedies.html', h: 900, hint: 'Click a box · click again to close it' }] },
      { t: 'sp', lab: 'Get a prescription', tone: 'label', result: true, h: 'Made out *to you*', sub: 'Your name, your trouble, signed and stamped by the chemist.', parts: [{ t: 'live', src: 'work/ui/small-remedies/prescribe.html', h: 640, hint: 'Live · type your name, pick a trouble' }] },
      { t: 'sp', lab: 'The box', tone: 'label', h: 'The joke works because *the box is played straight*', sub: 'Laid out like an old pharmacy carton. Point at a number.', parts: [{ t: 'call', narrow: true, img: W('small-remedies', 'box-train'), alt: 'The Patience box, closed', pins: [
        [80, 13, 'Lid label', 'Number and remedy on a framed slip, readable on the shelf.'],
        [84, 28, 'Maker’s line', '“From Small Remedies & Co., Druggists”, in italic Fell type.'],
        [82, 40, 'The remedy', 'A virtue in fat-face Didone, with its dose in small capitals.'],
        [86, 52, 'The band', 'One colour strip naming what the box is for.'],
        [62, 61, 'The mark', 'A small engraved icon: a moon, an umbrella, a house.'],
        [82, 78, 'Count, price, address', 'Twenty-four pills, £2.49, Brockley Rise, London S.E.'],
      ] }] },
      { t: 'sp', lab: 'Prescriptions', tone: 'resilience', h: 'Signed, *and stamped*', sub: 'Four panels: the heading filled in by hand, the dose typed, side effects in a red box, storage signed. The stamps read 00:31, WET and 1st.', parts: [{ t: 'gal', r: '885 / 1800', contain: true, items: [{ img: W('small-remedies', 'prescription-train'), cap: 'Patience · 00:31' }, { img: W('small-remedies', 'prescription-rain'), cap: 'Resilience · WET' }, { img: W('small-remedies', 'prescription-rent'), cap: 'Fortitude · 1st' }] }] },
      { t: 'sp', lab: 'Type & colour', tone: 'label', h: 'Five typefaces, *each with one job*', parts: [{ t: 'fonts', items: [['Playfair Display Black', 'The remedy name: the loudest type on a Victorian shelf.'], ['Playfair Display SC', 'Dose, number and section heads.'], ['IM Fell English', 'The chemist’s address and small print.'], ['Special Elite', 'Typewriter for the dose, typed at the counter.'], ['Homemade Apple', 'The pharmacist’s hand: name, date, signature.']] }, { t: 'gap' }, { t: 'sw', items: [['Patience', '#2C4566'], ['Resilience', '#24584A'], ['Fortitude', '#B1302A'], ['Band', '#EDB540', 1], ['Label', '#FBF6EA', 1], ['Ink', '#1F1A14']] }] },
      { t: 'sp', lab: 'Motion', tone: 'patience', h: 'Opens like *a real carton*', sub: 'About three seconds end to end. Click again and it folds back in reverse.', parts: [{ t: 'beats', items: [['Lid opens', 0.6, 0], ['Prescription rises', 0.9, 0.5], ['Moves beside the box', 0.9, 1.25], ['Blister slides out', 0.8, 1.55], ['Panel 1 unfolds', 0.5, 1.7], ['Panel 2 unfolds', 0.5, 2.1], ['Panel 3 unfolds', 0.5, 2.5]] }] },
      { t: 'quote', lab: 'Small print', q: 'Not real medicine. Please do not take two and call anyone in the morning.' },
    ],
    out: { h: 'Three remedies for London troubles, *boxed like a chemist’s shelf of 1900.*', chips: ['Packaging', 'Typography', 'Writing', 'Interaction'], kit: 'Packaging · prescriptions · blister packs · motion', img: W('small-remedies', 'line-up-open'), alt: 'All three remedies open', contain: true, bg: '#FBF6EA' },
  },

  /* ───────── Tare ───────── */
  tare: {
    ctx: 'Self-initiated', one: 'A stencil typeface drawn from shipping-crate markings and mill bale stamps.',
    facts: [['Role', 'Type design, concept, interaction, motion'], ['Weights', 'Regular and Light'], ['Glyphs', '48 per weight'], ['Year', '2026']],
    glanceHtml: '<div class="ta-glance"><div class="ta-board"><p class="ta-top">FRAGILE · THE BRIEF</p><p class="ta-to">TO</p><h3>BUILT NOT BROKEN</h3><div class="ta-marks"><div><b>2</b>WEIGHTS</div><div><b>48</b>GLYPHS</div><div><b>34</b>UNIT BRIDGES</div></div><p class="ta-bot"><span>FROM KUTCH</span><span>↑↑</span><span>LOT 01</span></p></div><div class="ta-stamp"><div class="ta-bale"><span>PROBLEM</span><p>Stencil type usually looks broken rather than built.</p></div><div class="ta-bale ta-idea"><span>IDEA</span><p>Make the bridges the system: cut every letter in the same places, so the breaks read as rhythm.</p></div></div></div>',
    cover: W('tare', 'crate-venezia'), coverAlt: 'A pine crate sprayed with TO VENEZIA in Tare',
    stats: [['2', 'weights on one grid'], ['48', 'glyphs per weight'], ['34', 'unit bridges, in both weights']],
    tldr: ['Stencil type usually looks broken rather than built.', 'Make the bridges the system: cut every letter in the same places, so the breaks read as rhythm.', 'A working font in two weights, a live specimen and a crate you can spray.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', dark: true, h: 'Set the markings, *then spray*', sub: 'The stencil drops, the paint goes on in one pass, the plate lifts away.', parts: [{ t: 'live', src: 'live/tare.html', h: 820, hint: 'Type your markings · pick a paint · spray' }] },
      { t: 'sp', lab: 'The idea', h: 'Every counter needs *a bridge*', sub: 'Tare is the weight of the empty crate. A stencil letter has to hold together as a piece of metal, so Tare cuts every letter in the same places.', parts: [{ t: 'fig', svg: 'stencil' }] },
      { t: 'sp', lab: 'Two weights', h: 'Regular for the crate, *Light for the ledger*', sub: 'The Light is rebuilt, not thinned: new stems and bars, the same 34-unit bridges. Try both in the specimen below.', parts: [{ t: 'gal', n: 1, r: '1800 / 692', items: [{ img: W('tare', 'specimen-hero-regular'), cap: 'Tare Regular · stem 150 · bar 130' }, { img: W('tare', 'specimen-construction'), cap: 'Construction view: the bridges in red' }] }] },
      { t: 'sp', lab: 'Specimen', result: true, h: 'Try the typeface', sub: 'Drag the bridge width, switch weight, inspect any glyph, type your own markings.', parts: [{ t: 'live', src: 'live/tare-specimen.html', h: 900, hint: 'Live specimen' }] },
      { t: 'sp', lab: 'How a letter is made', h: 'Grid, solid, cut, *plate, spray*', parts: [{ t: 'gal', n: 1, r: '1800 / 546', items: [{ img: W('tare', 'steps-a'), cap: 'A, in five steps' }, { img: W('tare', 'steps-r'), cap: 'R, in five steps' }] }] },
      { t: 'sp', lab: 'The font', tint: true, h: 'A real font, *not a drawing*', parts: [{ t: 'notes', items: [['48 glyphs', '26 capitals, 10 figures, 9 marks, 3 alternates.'], ['Kerning', '360 pairs in Regular, 468 in Light.'], ['Alternates', 'Pointed A, open G, upright R.'], ['Formats', 'TTF and WOFF2. Lower case sets as capitals.']] }, ] },
      { t: 'sp', lab: 'Motion', h: 'Three beats *to spray a crate*', parts: [{ t: 'beats', items: [['Stencil drops', 0.65, 0], ['Spray, one pass', 1.4, 0.65], ['Plate lifts', 0.65, 2.05]], cap: 'Change the markings first and the old paint is sanded off' }] },
    ],
    out: { h: 'A working font in two weights, *with every bridge in the same place.*', chips: ['Typeface design', 'Specimen', 'Interaction', 'Motion'], kit: 'Two weights · 48 glyphs · 360 + 468 kerning pairs · TTF and WOFF2', img: 'work/ui/thumb/tare.webp', alt: 'Two crates sprayed in Tare: Venezia in navy, Palermo in oxide red' },
  },

  /* ───────── Three Londons ───────── */
  'three-londons': {
    theme: 'zine',
    glanceHtml: '<div class="tl-glance"><div class="tl-bus"><div class="tl-blind"><b>172</b><p><span>ALDWYCH</span><i>via Elephant &amp; Castle</i></p></div><ol class="tl-route"><li><b>8</b>stops, one a page</li><li><b>1</b>sheet, one cut</li><li><b>&lt;1 hr</b>through three Londons</li></ol></div><div class="tl-posts"><div class="tl-note"><span>Problem</span><p>Most London illustration is the London on fridge magnets.</p></div><div class="tl-note tl-idea"><span>Idea</span><p>Follow one bus through three Londons and draw the details only locals notice.</p></div></div></div>',
    ctx: 'Self-initiated', one: 'The 172 bus, Brockley to Aldwych, as a one-sheet fold-out zine.',
    facts: [['Role', 'Concept, illustration, writing, layout'], ['Format', 'A3 sheet, folds to A6'], ['Pages', '8, plus a poster'], ['Year', '2026']],
    cover: W('three-londons', 'poster'), coverAlt: 'The poster side: the whole bus route as one long street',
    stats: [['8', 'stops, one a page'], ['1', 'sheet, one cut'], ['<1 hr', 'through three Londons']],
    tldr: ['Most London illustration is the London on fridge magnets.', 'Follow one bus through three Londons and draw the details only locals notice.', 'An eight-page fold-out zine with a poster of the whole route on the back.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', dark: true, h: 'Open the zine', sub: 'Turn the pages, unfold the sheet, flip it to the poster.', parts: [{ t: 'live', src: 'live/three-londons.html', h: 860, hint: 'Click the zine to open it' }] },
      { t: 'sp', lab: 'Three Londons', tone: 'paper', h: 'Neighbourhood, in-between, *postcard*', parts: [{ t: 'notes', items: [['Neighbourhood', 'Brockley Rise, Brockley Cross. Painted doors, tiled paths, a fox on the wall.'], ['In-between', 'New Cross, Old Kent Road. Lampposts as noticeboards, a window above every shop.'], ['Postcard', 'Elephant & Castle, Waterloo Bridge, Aldwych. The river, the dome, a big yellow sun.']] }, { t: 'gap' }, { t: 'gal', n: 4, r: '1274 / 1800', keep2: true, items: [
        { img: W('three-londons', 'page-1'), cap: '01 · Cover' }, { img: W('three-londons', 'page-2'), cap: '02 · Brockley Rise, 08:04' }, { img: W('three-londons', 'page-3'), cap: '03 · Brockley Cross, 08:11' }, { img: W('three-londons', 'page-4'), cap: '04 · New Cross, 08:19' },
        { img: W('three-londons', 'page-5'), cap: '05 · Old Kent Road, 08:31' }, { img: W('three-londons', 'page-6'), cap: '06 · Elephant & Castle, 08:44' }, { img: W('three-londons', 'page-7'), cap: '07 · Waterloo Bridge, 08:56' }, { img: W('three-londons', 'page-8'), cap: '08 · Aldwych' },
      ] }] },
      { t: 'sp', lab: 'One sheet', tone: 'river', h: 'One sheet, *one cut*', sub: 'The top row prints upside down, so every page lands the right way up once folded.', parts: [{ t: 'fig', svg: 'zine' }, { t: 'gap' }, { t: 'gal', n: 1, r: '1800 / 1272', items: [{ img: W('three-londons', 'sheet-front'), cap: 'The print sheet, front' }] }] },
      { t: 'sp', lab: 'Colour & type', tone: 'sun', h: 'Eight colours *do all the work*', sub: 'Flat, sunny and poster-like: solid shapes, no outlines, one light source.', parts: [{ t: 'sw', items: [['Paper', '#F4EAD5', 1], ['Ink', '#22202E'], ['Bus red', '#E0402A'], ['Sun', '#F2B33D', 1], ['River', '#2C5BA6'], ['Park', '#3F7F4C'], ['Brick', '#B9573E'], ['Sky', '#BFE1EC', 1]] }, { t: 'gap' }, { t: 'fonts', items: [['Young Serif', 'Titles.'], ['Caveat', 'Handwriting and notes.'], ['Anton · Permanent Marker', 'Shop signs and lamppost notices.'], ['DM Sans · Courier Prime', 'Body and labels.']] }] },
      { t: 'quote', lab: 'Back cover', q: 'One bus. Three Londons. Under an hour.' },
    ],
    out: { h: 'An A3 print file that folds to an A6 zine, *with the whole route on the back.*', chips: ['Illustration', 'Zine', 'Writing', 'Print'], kit: 'Two-sided A3 · eight A6 pages · folding guide', img: 'work/ui/three-londons/outcome.webp', alt: 'Five zine pages fanned out on river blue, Elephant & Castle in front' },
  },

  /* ───────── Wish You Were Then ───────── */
  'wish-you-were-then': {
    theme: 'postcard',
    glanceHtml: '<div class="wy-glance"><div class="wy-card"><div class="wy-msg"><p class="wy-pc">POST CARD</p><p class="wy-sub">Wish you were then · the brief</p><p class="wy-hand"><span>Problem</span>A place that has been two things is hard to show in one picture.</p></div><div class="wy-addr"><div class="wy-top"><div class="wy-mark"><b>3</b>cities</div><div class="wy-stamp"><b>12°</b>tilt</div></div><p class="wy-line"><span>Idea</span>One card, two pictures. Tilt between then and now.</p><p class="wy-line wy-sm">4 px strips · London, Mumbai, Florence</p></div></div></div>',
    ctx: 'Self-initiated', one: 'Lenticular postcards of three places that used to be something else.',
    facts: [['Role', 'Concept, research, illustration, motion'], ['Places', 'London, Mumbai, Florence'], ['Cards', '3, front and back'], ['Year', '2026']],
    cover: W('wish-you-were-then', 'postcard-kx-now-full'), coverAlt: 'Coal Drops Yard postcard, today',
    stats: [['3', 'cities, then and now'], ['4 px', 'strips that make the tilt'], ['12°', 'of tilt towards you']],
    tldr: ['A place that has been two things is hard to show in one picture.', 'Use a lenticular postcard: one card, two pictures, tilt between them.', 'Three cards you can tilt from then to now, and turn over to read.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', dark: true, h: 'Tilt a card *from then to now*', sub: 'Move across a card to tilt it. Click to turn it over.', parts: [{ t: 'live', src: 'live/wish-you-were-then.html', h: 760, hint: 'Move across a card · click to turn it over' }] },
      { t: 'sp', lab: 'Then', tone: 'sepia', h: 'Three places, *each “then” in its own medium*', sub: 'The change of medium dates the picture before the caption does.', parts: [{ t: 'cards', r: '3 / 2', items: [
        { img: W('wish-you-were-then', 'postcard-kx-then-full'), tag: 'Albumen print · 1860s', b: 'London', p: 'The Coal Drops, now Coal Drops Yard. Warm browns and a heavy vignette.' },
        { img: W('wish-you-were-then', 'postcard-md-then-full'), tag: 'Hand-tinted photo · c. 1900', b: 'Mumbai', p: 'Back Bay, now Marine Drive. Thin washes over a monochrome print.' },
        { img: W('wish-you-were-then', 'postcard-flo-then-full'), tag: 'Engraving · 1500s', b: 'Florence', p: 'A bridge of butchers, now of goldsmiths. Cross-hatched line.' },
      ] }] },
      { t: 'sp', lab: 'The tilt', h: 'How a lenticular *works*', sub: 'On screen, “now” sits over “then” behind 4-pixel stripes that widen as the card tilts, so the new picture arrives strip by strip.', parts: [{ t: 'fig', svg: 'lenticular' }, { t: 'gap' }, { t: 'gal', r: '960 / 680', items: [{ img: W('wish-you-were-then', 'mid-tilt-kx'), cap: 'London, mid-tilt' }, { img: W('wish-you-were-then', 'mid-tilt-md'), cap: 'Mumbai, mid-tilt' }, { img: W('wish-you-were-then', 'mid-tilt-flo'), cap: 'Florence, mid-tilt' }] }] },
      { t: 'sp', lab: 'The back', tone: 'card', h: 'Addressed to *whoever is tilting this*', sub: 'Every card has a story, a stamp from its country, a postmark and an address.', parts: [{ t: 'gal', n: 1, r: '3 / 2', items: [{ img: W('wish-you-were-then', 'postcard-kx-back-full'), cap: 'London, the back' }] }, { t: 'gap' }, { t: 'fonts', items: [['Josefin Sans', 'London: wide geometric capitals.'], ['Rozha One', 'Mumbai: high contrast, for Devanagari and Latin.'], ['Cormorant Garamond', 'Florence: the age of the engraving.'], ['Caveat', 'The handwriting on every back.']] }] },
      { t: 'sp', lab: 'Motion', h: 'It feels like *plastic*', parts: [{ t: 'beats', items: [['Tilt follows the cursor', 0.09, 0], ['Settles on then or now', 0.7, 0.09], ['Turns over', 0.9, 0.79]], cap: 'Strips switch between 32% and 68% across the card' }] },
    ],
    out: { h: 'Three cities, *a century or four in one tilt.*', chips: ['Illustration', 'Research', 'Motion', 'Interaction'], kit: 'Three cards · fronts, backs, stamps and postmarks', img: 'work/ui/wish-you-were-then/outcome.webp', alt: 'The postcards scattered in an airmail border: Marine Drive in front, a back, 1860s London and Florence today' },
  },

  /* ───────── Postage Due ───────── */
  'postage-due': {
    theme: 'stamps',
    glanceHtml: '<div class="pd-glance"><div class="pd-sheet"><p class="pd-hd"><span>Postage Due</span><span>Issue of 2026</span></p><div class="pd-row"><div class="pd-st pd-a"><b>12</b><i>stamps, each with a back</i></div><div class="pd-st pd-b"><b>6</b><i>lost words</i></div><div class="pd-st pd-c"><b>6</b><i>endangered crafts</i></div></div><span class="pd-cancel" aria-hidden="true"></span><p class="pd-ft">Artistamps · not valid for postage</p></div><div class="pd-cat"><p class="pd-k">Catalogue entry</p><div class="pd-entry"><span>Problem</span><p>Countries issue stamps to remember what they are proud of.</p></div><div class="pd-entry"><span>Idea</span><p>Issue stamps for what is quietly slipping away instead: lost words and endangered crafts.</p></div></div></div>',
    ctx: 'Self-initiated', one: 'Two sheets of artistamps for things we are losing.',
    facts: [['Role', 'Concept, research, illustration, type, writing'], ['Sheets', '2 × 6 stamps'], ['Printing', 'Intaglio and offset'], ['Year', '2026']],
    cover: W('postage-due', 'sheet-endangered-crafts'), coverAlt: 'The Endangered Crafts sheet', coverContain: true, coverBg: '#EEE8F3',
    stats: [['12', 'stamps, each with a back'], ['6', 'words nobody says any more'], ['6', 'crafts with few hands left']],
    tldr: ['Countries issue stamps to remember what they are proud of.', 'Issue stamps for what is quietly slipping away instead: lost words and endangered crafts.', 'Two sheets you can tear stamps from, with a magnifier for the engraving.'],
    blocks: [
      { t: 'sp', lab: 'Live piece', dark: true, h: 'Tear a stamp *off the sheet*', sub: 'Click a stamp to tear it off and read the back. Use the magnifier to look closer.', parts: [{ t: 'live', src: 'live/postage-due.html', h: 820, hint: 'Click a stamp · try the magnifier' }] },
      { t: 'sp', lab: 'Two sheets', h: 'Two sheets, *two ways of printing*', parts: [{ t: 'fig', svg: 'printing' }] },
      { t: 'sp', lab: 'Lost words', tone: 'cream', h: 'Six words *nobody says any more*', parts: [{ t: 'cards', n: 6, r: '588 / 720', contain: true, items: [
        { img: W('postage-due', 'stamp-apricity'), tag: '1623', b: 'apricity', p: 'The warmth of the sun in winter.' },
        { img: W('postage-due', 'stamp-groak'), tag: '1910', b: 'groak', p: 'To watch someone eat, hoping.' },
        { img: W('postage-due', 'stamp-snollygoster'), tag: '1800s', b: 'snollygoster', p: 'A shrewd, unprincipled politician.' },
        { img: W('postage-due', 'stamp-ultracrepidarian'), tag: '1819', b: 'ultracrepidarian', p: 'Opining beyond one’s knowledge.' },
        { img: W('postage-due', 'stamp-lunting'), tag: '1786', b: 'lunting', p: 'Puffing away on a pipe.' },
        { img: W('postage-due', 'stamp-fudgel'), tag: '1700s', b: 'fudgel', p: 'To look busy while doing nothing.' },
      ] }] },
      { t: 'sp', lab: 'Endangered crafts', tone: 'night', h: 'Six crafts *with few hands left*', parts: [{ t: 'cards', n: 6, r: '588 / 720', contain: true, items: [
        { img: W('postage-due', 'stamp-rogan'), tag: 'India · one family left', b: 'Rogan art', p: 'Castor-oil paste drawn over cloth.' },
        { img: W('postage-due', 'stamp-ganjifa'), tag: 'India · 120 cards by hand', b: 'Ganjifa cards', p: 'Round, hand-painted playing cards.' },
        { img: W('postage-due', 'stamp-squero'), tag: 'Italy · three boatyards', b: 'Gondola building', p: 'Eight kinds of wood in every boat.' },
        { img: W('postage-due', 'stamp-pupi'), tag: 'Italy · UNESCO 2008', b: 'Opera dei Pupi', p: 'Sicilian marionettes in real armour.' },
        { img: W('postage-due', 'stamp-gold'), tag: 'UK · extinct', b: 'Gold beating', p: 'Gold leaf thin enough to float.' },
        { img: W('postage-due', 'stamp-swill'), tag: 'UK · critically endangered', b: 'Swill baskets', p: 'Riven oak around a hazel rim.' },
      ] }] },
      { t: 'sp', lab: 'Look closer', h: 'Real stamps reward *a magnifying glass*', sub: 'The loupe under each sheet enlarges it three times.', parts: [{ t: 'gal', r: '524 / 556', items: [
        { img: W('postage-due', 'loupe-lw-engraving'), cap: 'Engraved line' }, { img: W('postage-due', 'loupe-lw-microtext'), cap: 'Micro-text, 2.4 px high' }, { img: W('postage-due', 'loupe-lw-plate'), cap: 'Guilloche frame' },
        { img: W('postage-due', 'loupe-cr-dots'), cap: 'Halftone dots' }, { img: W('postage-due', 'loupe-cr-colour-bars'), cap: 'Colour bars' }, { img: W('postage-due', 'loupe-cr-gold'), cap: 'Gold leaf flying off the hammer' },
      ] }] },
      { t: 'sp', lab: 'Motion', h: 'Comes away *like a real stamp*', parts: [{ t: 'beats', items: [['Tear off and turn over', 0.75, 0], ['Shadow fades in', 0.5, 0.25]], cap: 'Lifts 18 px, tilts 3–4°, scales to 106%' }] },
      { t: 'quote', lab: 'Small print', q: 'Artistamps: not valid for postage. After Donald Evans, who painted stamps for countries that never existed.' },
    ],
    out: { h: 'Twelve stamps for things that did exist, *and still just about do.*', chips: ['Illustration', 'Typography', 'Print', 'Writing'], kit: 'Two sheets · twelve fronts and backs · intaglio and offset', img: 'work/ui/postage-due/outcome.webp', alt: 'Loose stamps and two backs scattered over a postmark: apricity in front, with Rogan art, gondola building and gold beating' },
  },
};

;
// UI/UX projects: same pages as the product site; images load from the product site so nothing is duplicated.
Object.assign(window.CASES, {
 "mindgym": {
  "ctx": "PM Accelerator",
  "one": "An AI mental-performance coach for jobseekers.",
  "facts": [
   [
    "Role",
    "AI UI/UX Designer"
   ],
   [
    "Time",
    "10 weeks"
   ],
   [
    "Team",
    "13 people"
   ],
   [
    "Year",
    "2026"
   ]
  ],
  "cover": "work/ui/thumb/mindgym.webp",
  "coverAlt": "MindGym screens on green: onboarding, the daily dashboard and a live session",
  "stats": [
   [
    "50+",
    "user interviews"
   ],
   [
    "7",
    "onboarding steps, which I led"
   ],
   [
    "23",
    "high-fidelity screens shipped"
   ]
  ],
  "tldr": [
   "Job searches stall on confidence, not skill.",
   "Short coached sessions, mood check-ins, visible progress.",
   "23 screens shipped by a team of 13 in ten weeks."
  ],
  "blocks": [
   {
    "t": "vid",
    "lab": "The product",
    "auto": true,
    "h": "The shipped product, *in 14 seconds*",
    "src": "work/ui/mindgym/desktop-demo.mp4",
    "poster": "work/ui/mindgym/desktop-demo-poster.jpg",
    "p": [
     "From the dashboard to a finished session: pick what you’re preparing for, say how anxious you feel, breathe with Maya, see what changed."
    ],
    "list": [
     [
      "Dashboard",
      "Today’s focus, one tap to begin."
     ],
     [
      "Live session",
      "Five phases, guided by Maya."
     ],
     [
      "Summary and progress",
      "Anxiety before and after, and the trend."
     ]
    ],
    "cap": "Walkthrough of the final desktop screens.",
    "result": true
   },
   {
    "t": "vid",
    "lab": "Mobile concept",
    "portrait": true,
    "h": "And a phone version: *the same session, mobile*",
    "src": "work/ui/mindgym/mobile-demo.mp4",
    "poster": "work/ui/mindgym/mobile-demo-poster.jpg",
    "p": [
     "My note after the project was “go mobile-first”: the moments that matter happen on a phone, the night before an interview. So I took the shipped flow mobile."
    ],
    "side": [
     [
      "work/ui/mindgym/m1.webp",
      "Mobile: what are you preparing for?"
     ],
     [
      "work/ui/mindgym/m2.webp",
      "Mobile: today, with mood check-in"
     ],
     [
      "work/ui/mindgym/m4.webp",
      "Mobile: session summary, anxiety 7 to 4"
     ]
    ],
    "cap": "Concept made after the project, in the shipped design system. 14-second prototype.",
    "auto": true,
    "result": true
   },
   {
    "t": "state",
    "lab": "The insight",
    "h": "50+ interviews, one finding: *job searches stall on confidence, not skill.*",
    "items": [
     [
      "Behaviour",
      "People knew what to do. They didn’t do it."
     ],
     [
      "Small, often",
      "Five-minute sessions beat long courses."
     ]
    ],
    "fig": [
     {
      "t": "cards",
      "items": [
       {
        "av": "SR",
        "tag": "34 · Career changer",
        "b": "Sofia",
        "p": "Needs reassurance."
       },
       {
        "av": "JO",
        "tag": "23 · Graduate",
        "b": "James",
        "p": "Needs streaks and a bit of game."
       },
       {
        "av": "PL",
        "tag": "29 · Laid off",
        "b": "Priya",
        "p": "Needs small, steady steps."
       }
      ]
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Onboarding",
    "h": "Version one *overwhelmed people*. Version two asks one question.",
    "parts": [
     {
      "t": "fig",
      "svg": "flows"
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Decisions",
    "h": "Four decisions that *shaped the product*",
    "parts": [
     {
      "t": "steps",
      "r": "16 / 10",
      "contain": true,
      "keep2": true,
      "items": [
       {
        "img": "work/ui/mindgym/dec1.webp",
        "b": "Goal first",
        "s": "It opens with “What are you preparing for?”"
       },
       {
        "img": "work/ui/mindgym/dec2.webp",
        "b": "Six small questions",
        "s": "Not one long form. Fewer drop-offs."
       },
       {
        "img": "work/ui/mindgym/dec3.webp",
        "b": "Conclusions, not charts",
        "s": "“Morning sessions lift more.”"
       },
       {
        "img": "work/ui/mindgym/dec4.webp",
        "b": "Colour with a job",
        "s": "Teal: next. Amber: urgent. Green: progress."
       }
      ],
      "n": 4
     }
    ]
   },
   {
    "t": "sp",
    "lab": "My part",
    "h": "What I led, *what I helped with*",
    "parts": [
     {
      "t": "cols",
      "items": [
       [
        "I led",
        [
         "Onboarding, all 7 steps",
         "Mood check-ins and blocker selector",
         "Component library and colour tokens"
        ]
       ],
       [
        "I contributed to",
        [
         "Session player and landing page",
         "PRD review and stakeholder design reviews",
         "Developer handoff and QA"
        ]
       ]
      ]
     },
     {
      "t": "gap"
     },
     {
      "t": "tl",
      "items": [
       [
        "Wk 1–2",
        "Discovery and research"
       ],
       [
        "Wk 3–4",
        "PRD and architecture"
       ],
       [
        "Wk 5–7",
        "Design and iteration"
       ],
       [
        "Wk 8–10",
        "Build and launch"
       ]
      ]
     }
    ]
   }
  ],
  "out": {
   "h": "23 high-fidelity screens, *shipped end to end* in ten weeks.",
   "reflect": [
    "Test earlier, with rough sketches.",
    "Agree success metrics at the start."
   ],
   "kit": "Figma · Figma AI · Miro · FigJam · Illustrator · Photoshop",
   "img": "work/ui/mindgym/result.webp",
   "alt": "MindGym session summary: anxiety from 7 to 4",
   "contain": true,
   "bg": "#F7F7F5"
  },
  "coverContain": true,
  "coverBg": "#1F4D3E",
  "workFirst": true,
  "theme": "mindgym",
  "glanceHtml": "<div class=\"mg-glance\"><div class=\"mg-hi\"><h3>Hi, jobseeker 👋</h3><p>How are you feeling about your next interview?</p><div class=\"mg-maya\"><span>M</span><p>Five minutes before the moment that matters beats a long course. That became the brief.</p></div></div><div class=\"mg-mo\"><p class=\"mg-h\">Momentum</p><div class=\"mg-tiles\"><div><b>50+</b><span>user interviews</span></div><div><b class=\"a\">7</b><span>onboarding steps I led</span></div><div><b>23</b><span>screens shipped</span></div><div><b>10</b><span>weeks, team of 13</span></div></div></div></div>"
 },
 "nobias": {
  "ctx": "Self-initiated",
  "one": "An AI tool that checks interview scripts for bias before you run them.",
  "facts": [
   [
    "Role",
    "Concept, design, build"
   ],
   [
    "Type",
    "Live web tool"
   ],
   [
    "Works with",
    "Gemini, Claude, GPT-4o"
   ],
   [
    "Year",
    "2026"
   ]
  ],
  "cover": "work/ui/nobias/landing.webp",
  "coverAlt": "The NoBias landing page: Your questions shape the answers",
  "stats": [
   [
    "20",
    "kinds of bias checked"
   ],
   [
    "3",
    "verdicts, each with a rewrite"
   ],
   [
    "0",
    "accounts needed"
   ]
  ],
  "tldr": [
   "How a question is worded shapes the answer, and biased scripts reach participants unchecked.",
   "Paste a script; every question comes back with a verdict and a rewrite.",
   "A free, live tool. Your API key never leaves your browser."
  ],
  "blocks": [
   {
    "t": "vid",
    "lab": "The tool",
    "result": true,
    "auto": true,
    "h": "The whole audit, *in 22 seconds*",
    "src": "work/ui/nobias/nobias-demo.mp4",
    "poster": "work/ui/nobias/nobias-demo-poster.jpg",
    "p": [
     "Pick a field, describe who you’re interviewing, paste the script. Every question comes back with a verdict, a reason and a rewrite you can accept."
    ],
    "list": [
     [
      "Field",
      "Sets how strict the checks are."
     ],
     [
      "Participants",
      "Vulnerability and context."
     ],
     [
      "Results",
      "Question by question, or the full report."
     ]
    ],
    "cap": "Recorded from the live tool, using its built-in demo script."
   },
   {
    "t": "sp",
    "lab": "Try it",
    "h": "Check one question *yourself*",
    "sub": "A cut-down version with 5 of the 20 checks. Edit the question and watch it change.",
    "parts": [
     {
      "t": "demo",
      "which": "bias"
     }
    ],
    "result": true
   },
   {
    "t": "sp",
    "lab": "Three screens",
    "h": "Three short screens, *then the audit*",
    "sub": "Each one changes how strict the checks are.",
    "parts": [
     {
      "t": "steps",
      "n": 3,
      "r": "1400 / 887",
      "items": [
       {
        "img": "work/ui/nobias/step1.webp",
        "b": "Research field",
        "s": "Medical, legal and mental health are checked hardest."
       },
       {
        "img": "work/ui/nobias/step2.webp",
        "b": "Participants",
        "s": "Who they are and how sensitive the topic is."
       },
       {
        "img": "work/ui/nobias/step3.webp",
        "b": "The script",
        "s": "Paste it as it is. NoBias finds the questions."
       }
      ]
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Reading a result",
    "h": "One question, *taken apart*",
    "sub": "Point at a number.",
    "parts": [
     {
      "t": "call",
      "img": "work/ui/nobias/anatomy.webp",
      "alt": "NoBias results: question by question view",
      "pins": [
       [
        6.6,
        8.8,
        "Bias score",
        "One number for the whole script, out of 10."
       ],
       [
        85,
        9.3,
        "Severity count",
        "How many questions need fixing, a review, or nothing."
       ],
       [
        14,
        37,
        "Every question, ranked",
        "A coloured bar shows how serious each one is."
       ],
       [
        34,
        45,
        "The bias, named",
        "Leading question, marked High."
       ],
       [
        61,
        51,
        "Why it’s biased",
        "One plain sentence a researcher can act on."
       ],
       [
        33,
        66.7,
        "Rewrite, accept or regenerate",
        "Accepted rewrites go into the improved script."
       ]
      ]
     }
    ]
   },
   {
    "t": "sp",
    "lab": "What it checks",
    "h": "20 checks in *three groups*",
    "parts": [
     {
      "t": "html",
      "html": "<div class=\"nb-checks\"><div><p class=\"nb-k\"><i class=\"r\"></i>The question</p><h4>Wording</h4><p>Leading, loaded, double-barrelled, assumption-laden, yes-priming.</p><q>Don’t you think it’s important to…?</q></div><div><p class=\"nb-k\"><i class=\"a\"></i>The researcher</p><h4>Framing</h4><p>Confirmation framing, social-desirability pressure, cultural blind spots.</p><q>Most patients find our app helpful. What did you think?</q></div><div><p class=\"nb-k\"><i class=\"g\"></i>The script</p><h4>Shape</h4><p>Missing warm-up, question order, no opt-out cues, narrow scope.</p><q>Starts with the hardest question.</q></div></div>"
     }
    ]
   },
   {
    "t": "sp",
    "lab": "The report",
    "h": "Every question *in one table*",
    "sub": "Bias type, score and severity, then copy the improved script with your accepted rewrites.",
    "parts": [
     {
      "t": "gal",
      "n": 1,
      "r": "1500 / 941",
      "items": [
       {
        "img": "work/ui/nobias/report.webp",
        "alt": "NoBias full report table"
       }
      ]
     }
    ]
   }
  ],
  "out": {
   "h": "Live and free. Grounded in research methods literature, *from Rosenthal & Rosnow to Portigal.*",
   "live": [
    "https://nobias2.vercel.app",
    "Try NoBias"
   ],
   "kit": "Figma · Gemini · Claude · GPT-4o · Vercel",
   "img": "work/ui/nobias/result.webp",
   "alt": "NoBias flags three questions and rewrites them",
   "contain": true,
   "bg": "#E4F1EE"
  },
  "theme": "nobias",
  "coverPos": "0% 0%",
  "glanceHtml": "<div class=\"nb-score\"><div class=\"nb-big\"><b>20</b><span>bias checks</span></div><div class=\"nb-mid\"><h3>Ask “Don’t you think it’s easier?” and you’ve already written the answer</h3><p>How a question is worded shapes the answer. NoBias reads the script before you run it: every question gets a verdict and a rewrite. No account, and your API key stays in your browser.</p></div><ul class=\"nb-dots\"><li><i class=\"r\"></i><b>Fix required</b><span>points to an answer</span></li><li><i class=\"a\"></i><b>Review</b><span>worth a second look</span></li><li><i class=\"g\"></i><b>Looks clear</b><span>keep it</span></li></ul></div>"
 },
 "clima": {
  "ctx": "PM Accelerator",
  "one": "A weather app built around how people need weather: by place, by condition, by mood.",
  "facts": [
   [
    "Role",
    "UI/UX Designer"
   ],
   [
    "Platform",
    "iOS"
   ],
   [
    "Screens",
    "20+"
   ],
   [
    "Year",
    "2026"
   ]
  ],
  "cover": "work/ui/thumb/clima.webp",
  "coverAlt": "Six Clima screens, one colour per weather condition",
  "stats": [
   [
    "6",
    "condition palettes"
   ],
   [
    "20+",
    "screens"
   ],
   [
    "2",
    "kinds of user"
   ]
  ],
  "tldr": [
   "Every weather app has the same data, and most show all of it at once.",
   "Lead with colour so you know the mood before you read a number.",
   "Six condition palettes, a multi-city system and a clickable prototype."
  ],
  "blocks": [
   {
    "t": "sp",
    "lab": "Try it",
    "result": true,
    "h": "Change *the weather*",
    "sub": "The condition screen, rebuilt in code. Tap a condition.",
    "parts": [
     {
      "t": "live",
      "src": "work/ui/clima/live.html",
      "h": 720,
      "hint": "Live piece · tap a condition"
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Key screens",
    "h": "Five screens, *one system*",
    "parts": [
     {
      "t": "cards",
      "contain": true,
      "r": "393 / 852",
      "items": [
       {
        "img": "work/ui/clima/c-home.webp",
        "tag": "01",
        "b": "Now",
        "p": "The colour says it first."
       },
       {
        "img": "work/ui/clima/c-7days.webp",
        "tag": "02",
        "b": "Seven days",
        "p": "Glance, then tap."
       },
       {
        "img": "work/ui/clima/c-multicity.webp",
        "tag": "03",
        "b": "Places",
        "p": "Every saved city at once."
       },
       {
        "img": "work/ui/clima/c-warning.webp",
        "tag": "04",
        "b": "Warnings",
        "p": "Hard to miss, still calm."
       },
       {
        "img": "work/ui/clima/c-prefs.webp",
        "tag": "05",
        "b": "Settings",
        "p": "Clean and done."
       }
      ]
     }
    ],
    "result": true,
    "tone": "cloudy"
   },
   {
    "t": "vid",
    "lab": "Prototype",
    "h": "Clicking *through it*",
    "src": "work/ui/clima/proto.mp4",
    "poster": "work/ui/clima/proto-poster.jpg",
    "p": [
     "Recorded from the Figma prototype: today, a windy day, the week ahead, adding a city, and preferences."
    ],
    "portrait": true,
    "result": true,
    "tone": "thunder",
    "auto": true,
    "cap": "Figma prototype, 50 seconds."
   },
   {
    "t": "sp",
    "lab": "Read in a glance",
    "tone": "windy",
    "h": "You know the mood *before you read a number*",
    "sub": "Point at a number.",
    "parts": [
     {
      "t": "call",
      "narrow": true,
      "img": "work/ui/clima/r-sunny.webp",
      "alt": "Clima, sunny condition screen",
      "pins": [
       [
        40,
        37,
        "The colour",
        "The whole screen is the condition, so you know the mood first."
       ],
       [
        8,
        16,
        "The number",
        "Big and thin: the temperature, nothing competing with it."
       ],
       [
        70,
        14,
        "Place and date",
        "Small, top right: which city you’re looking at."
       ],
       [
        82,
        54,
        "The word",
        "Set on its side, so it reads as a label, not a headline."
       ],
       [
        50,
        58,
        "Next five hours",
        "Icons only, in one row."
       ],
       [
        50,
        73,
        "Detail, if you want it",
        "Humidity, feels like, sunset, rain. Smaller and lower."
       ]
      ]
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Colour as language",
    "h": "Six conditions, *six colours*",
    "parts": [
     {
      "t": "gal",
      "n": 6,
      "r": "624 / 1396",
      "items": [
       {
        "img": "work/ui/clima/r-sunny.webp",
        "cap": "Sunny · #E9C46A"
       },
       {
        "img": "work/ui/clima/r-windy.webp",
        "cap": "Windy · #E76F51"
       },
       {
        "img": "work/ui/clima/r-thunder.webp",
        "cap": "Thunder · #5A7985"
       },
       {
        "img": "work/ui/clima/r-snowy.webp",
        "cap": "Snowy · #48595F"
       },
       {
        "img": "work/ui/clima/r-cloudy.webp",
        "cap": "Cloudy · #264653"
       },
       {
        "img": "work/ui/clima/r-rainy.webp",
        "cap": "Rainy · #2A9D8F"
       }
      ]
     }
    ],
    "sub": "Each screen is the same layout. Only the colour and the drawing change."
   }
  ],
  "out": {
   "h": "Six condition colour states, reusable components, a multi-location system and *a full clickable prototype.*",
   "kit": "Figma · iOS 15 UI Kit · Illustrator · Miro",
   "img": "work/ui/clima/outcome.webp",
   "alt": "Five Clima condition screens fanned out",
   "pos": "50% 50%"
  },
  "coverContain": true,
  "coverBg": "#EFE8DD",
  "theme": "clima",
  "glanceHtml": "<div class=\"cl-glance\"><div class=\"cl-temp\">6<sup>°</sup><span>condition palettes</span></div><div class=\"cl-txt\"><h3>Every weather app has the same data, and most show all of it at once.</h3><p>Clima leads with colour, so you know the mood before you read a number.</p></div><div class=\"cl-tiles\"><div><span>Screens</span><b>20+</b></div><div><span>Kinds of user</span><b>2</b></div><div><span>Cities, side by side</span><b>3+</b></div></div></div>",
  "glanceTone": "sunny"
 },
 "finderseeker": {
  "ctx": "Self-initiated",
  "one": "An item tracker: clip a tag to your keys, find them from one screen.",
  "facts": [
   [
    "Role",
    "UI/UX Designer"
   ],
   [
    "Platform",
    "iOS"
   ],
   [
    "Screens",
    "30+"
   ],
   [
    "Year",
    "2025"
   ]
  ],
  "cover": "work/ui/thumb/finderseeker.webp",
  "coverAlt": "Five FinderSeeker screens: splash, my keys, buzz, map, new tag",
  "stats": [
   [
    "30+",
    "screens"
   ],
   [
    "3",
    "end-to-end scenarios"
   ],
   [
    "1",
    "screen to find anything"
   ]
  ],
  "tldr": [
   "People lose time every day retracing their steps for keys, wallets and glasses.",
   "Clip on a tag; buzz it when it’s near, map it when it’s far.",
   "30+ screens and a prototype covering sign-up, adding a tag and finding things."
  ],
  "blocks": [
   {
    "t": "sp",
    "lab": "Try it",
    "tone": "grey",
    "result": true,
    "h": "Find *the glasses*",
    "sub": "Your pointer is the phone. The rings pulse faster as you get closer.",
    "parts": [
     {
      "t": "live",
      "src": "work/ui/finderseeker/live.html",
      "h": 600,
      "hint": "Live piece · move to search"
     }
    ]
   },
   {
    "t": "sp",
    "lab": "Key screens",
    "h": "Five screens, *one tap to find*",
    "parts": [
     {
      "t": "cards",
      "contain": true,
      "r": "1 / 2",
      "items": [
       {
        "img": "work/ui/finderseeker/splash.webp",
        "tag": "01",
        "b": "Splash",
        "p": "A bear with a magnifying glass: friendly, not surveillance."
       },
       {
        "img": "work/ui/finderseeker/mykeys.webp",
        "tag": "02",
        "b": "My keys",
        "p": "Every tag and its status in two seconds."
       },
       {
        "img": "work/ui/finderseeker/buzz.webp",
        "tag": "03",
        "b": "Buzz",
        "p": "Rings pulse with the sound."
       },
       {
        "img": "work/ui/finderseeker/map.webp",
        "tag": "04",
        "b": "Location",
        "p": "Last seen, and when."
       },
       {
        "img": "work/ui/finderseeker/newkey.webp",
        "tag": "05",
        "b": "New tag",
        "p": "Name it, pick an icon."
       }
      ]
     }
    ],
    "result": true,
    "tone": "amber"
   },
   {
    "t": "vid",
    "lab": "Prototype",
    "h": "All three journeys, *clicked through*",
    "src": "work/ui/finderseeker/proto.mp4",
    "poster": "work/ui/finderseeker/proto-poster.jpg",
    "p": [
     "Three journeys, end to end."
    ],
    "portrait": true,
    "list": [
     [
      "Register",
      "Splash, sign-up, email check, first empty home."
     ],
     [
      "Add a tag",
      "New phone, three tags, then Glasses as the fourth."
     ],
     [
      "Find it",
      "Glasses in range: buzz. Purse out of range: map, go, buzz."
     ]
    ],
    "result": true,
    "auto": true
   },
   {
    "t": "sp",
    "lab": "Two ways to find",
    "h": "Near: *buzz it*. Far: *map it.*",
    "parts": [
     {
      "t": "fig",
      "svg": "range"
     }
    ],
    "tone": "cream"
   },
   {
    "t": "sp",
    "lab": "Next",
    "tone": "grey",
    "h": "Next: the map, *in the app’s own colours*",
    "sub": "My note after the project was to redesign the map in the warm palette, so out of range doesn’t feel like a hand-off to Google Maps. So I did.",
    "parts": [
     {
      "t": "gal",
      "n": 2,
      "keep2": true,
      "r": "390 / 844",
      "items": [
       {
        "img": "work/ui/finderseeker/map.webp",
        "cap": "Shipped: the standard map"
       },
       {
        "img": "work/ui/finderseeker/map-warm.webp",
        "cap": "Concept, made after the project: route, last seen, buzz when near"
       }
      ]
     }
    ]
   }
  ],
  "out": {
   "h": "30+ screens and a prototype that covers *every way you’d lose something.*",
   "kit": "Figma · iOS 16 UI Kit · Illustrator",
   "img": "work/ui/finderseeker/outcome.webp",
   "alt": "Five FinderSeeker screens fanned out on amber"
  },
  "coverContain": true,
  "coverBg": "#EFE8DD",
  "theme": "fs",
  "glanceHtml": "<div class=\"fs-glance\"><div class=\"fs-q\"><h3>People lose time every day retracing their steps for keys, wallets and glasses.</h3><p>Clip a tag on. Near: buzz it. Far: map it.</p></div><div class=\"fs-phone\"><div class=\"fs-bar\">My Keys<span>+</span></div><div class=\"fs-row\"><span class=\"fs-e\">Edit<br>☰</span><svg viewBox=\"0 0 60 40\"><g fill=\"#D39042\"><rect x=\"2\" y=\"12\" width=\"24\" height=\"22\" rx=\"7\"/><rect x=\"34\" y=\"12\" width=\"24\" height=\"22\" rx=\"7\"/><path d=\"M24 18h12v5H24z\"/></g></svg><div><b>30+ screens</b><span>Designed · iOS 16</span></div><span class=\"fs-bz\">Buzz<br><i>Location</i></span></div><div class=\"fs-row\"><span class=\"fs-e\">Edit<br>☰</span><svg viewBox=\"0 0 60 40\"><g fill=\"#D39042\"><circle cx=\"14\" cy=\"20\" r=\"12\"/><circle cx=\"14\" cy=\"20\" r=\"5\" fill=\"#ECECEC\"/><rect x=\"24\" y=\"16\" width=\"34\" height=\"8\" rx=\"2\"/><rect x=\"44\" y=\"22\" width=\"5\" height=\"10\"/><rect x=\"52\" y=\"22\" width=\"5\" height=\"8\"/></g></svg><div><b>3 scenarios</b><span>Register · add a tag · find it</span></div><span class=\"fs-bz\">Buzz<br><i>Location</i></span></div><div class=\"fs-row\"><span class=\"fs-e\">Edit<br>☰</span><svg viewBox=\"0 0 60 44\"><g fill=\"#D39042\"><path d=\"M8 14h44l-6 26H14z\"/><path d=\"M20 14c0-14 20-14 20 0\" fill=\"none\" stroke=\"#D39042\" stroke-width=\"4\"/></g></svg><div><b>1 screen to find anything</b><span>Live · First Street</span></div><span class=\"fs-bz\">Buzz<br><i>Location</i></span></div></div></div>"
 }
});

;
// Builds a project page from window.CASES[slug] (cases.js) and the project list in data.js.
// Every page is the same run of spreads: cover, at a glance, then the project's own chapters,
// outcome and the next project. Each spread gets a chapter label, a page number and a chip in the strip.
(() => {
  const slug = document.body.dataset.s;
  const i = P.findIndex((p) => p.s === slug), p = P[i], k = CASES[slug];
  const nxt = P[(i + 1) % P.length], prv = P[(i - 1 + P.length) % P.length];
  document.documentElement.style.setProperty('--c', p.c);
  document.title = `${p.t} · Garima Singh Studio`;
  const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const em = (s = '') => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
  const img = (src, alt = '', lazy = true) => `<img src="${src}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ''}>`;
  const ratio = (r) => r ? `--r:${r};` : '';

  /* parts: the pieces a spread can be made of */
  const part = {
    call: (x) => `<div class="k-call ${x.flip ? 'flip' : ''} ${x.narrow ? 'narrow' : ''}">
        <div class="k-pins">${img(x.img, x.alt)}${x.pins.map((q, n) => `<button class="k-pin" type="button" style="left:${q[0]}%;top:${q[1]}%" data-n="${n}" aria-label="${n + 1}: ${esc(q[2])}">${n + 1}</button>`).join('')}</div>
        <ol class="k-legend">${x.pins.map((q, n) => `<li data-n="${n}"><span class="n">${n + 1}</span><div><b>${esc(q[2])}</b><span>${esc(q[3] || '')}</span></div></li>`).join('')}</ol>
      </div>`,
    fig: (x) => `<figure class="k-fig">${DIAGRAMS[x.svg]()}${x.cap ? `<figcaption class="m">${esc(x.cap)}</figcaption>` : ''}</figure>`,
    notes: (x) => `<div class="k-notes" style="--n:${x.items.length}">${x.items.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('')}</div>`,
    steps: (x) => `<div class="k-steps ${x.keep2 ? 'keep2' : ''}" style="--n:${x.n || x.items.length};${ratio(x.r)}">${x.items.map((s, n) => `<figure>
        <div class="ph ${x.contain || s.contain ? 'contain' : ''}">${s.img ? img(s.img, s.alt || s.b) : DIAGRAMS[s.svg]()}<span class="no m">${String(n + 1).padStart(2, '0')}</span></div>
        <figcaption><b>${esc(s.b)}</b>${esc(s.s || '')}</figcaption></figure>`).join('')}</div>`,
    cards: (x) => `<div class="k-cards ${x.items.length === 5 ? 'n5' : ''}" style="--n:${x.n || x.items.length};${ratio(x.r)}">${x.items.map((c) => `<article class="k-card">
        ${c.img ? `<div class="ph ${x.contain ? 'contain' : ''}"${c.pos ? ` style="--pos:${c.pos}"` : ''}>${img(c.img, c.alt || c.b)}</div>` : c.av ? `<span class="av">${esc(c.av)}</span>` : ''}
        <div class="tx">${c.tag ? `<span class="tag m">${esc(c.tag)}</span>` : ''}<b>${esc(c.b)}</b>${c.p ? `<p>${esc(c.p)}</p>` : ''}</div></article>`).join('')}</div>`,
    gal: (x) => `<div class="k-gal ${x.keep2 ? 'keep2' : ''}" style="--n:${x.n || x.items.length};${ratio(x.r)}">${x.items.map((g) => `<figure class="${g.wide ? 'wide' : ''}">
        <div class="ph ${x.contain ? 'contain' : ''}"${g.pos ? ` style="--pos:${g.pos}"` : ''}>${img(g.img, g.alt || g.cap)}</div>${g.cap ? `<figcaption class="m">${esc(g.cap)}</figcaption>` : ''}</figure>`).join('')}</div>`,
    sheet: (x) => `<div class="k-sheet m"><div class="views" style="--n:${x.views.length};${ratio(x.r)}">${x.views.map((v) => `<figure>${img(v.img, v.b)}<figcaption>${esc(v.cap || '')}<b>${esc(v.b)}</b></figcaption></figure>`).join('')}</div>
        <div class="k-tblock" style="--tn:${x.tb.length - 1}">${x.tb.map(([a, b]) => `<div>${esc(a)}<b>${esc(b)}</b></div>`).join('')}</div></div>`,
    cmp: (x) => `<div class="k-cmp">${x.head ? `<div class="r hd m"><span>${esc(x.head[0])}</span><span></span><span>${esc(x.head[1])}</span></div>` : ''}${x.rows.map(([a, b, t]) => `<div class="r"><span class="a">${esc(a)}</span><span class="ar">→</span><span class="b">${t ? `<i>${esc(t)}</i>` : ''}${esc(b)}</span></div>`).join('')}</div>`,
    tl: (x) => `<div class="k-tl" style="--n:${x.items.length}">${x.items.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>`,
    sw: (x) => `<div class="k-sw" style="--n:${x.items.length}">${x.items.map(([n, c, lt]) => `<div class="${lt ? 'lt' : ''}" style="background:${c}"><b>${esc(n)}</b><span class="m">${c}</span></div>`).join('')}</div>`,
    list: (x) => `<ul class="k-list">${x.items.map(([a, b], n) => `<li><span class="m mute">${String.fromCharCode(65 + n)}</span><span>${a ? `<b>${esc(a)}.</b> ` : ''}${esc(b)}</span></li>`).join('')}</ul>`,
    demo: (x) => DEMOS[x.which].html,
    // a component built from the project's own UI (trusted markup written in the case data)
    html: (x) => x.html,
    // the live piece: the real interactive object, in a frame that grows to fit it
    live: (x) => `<div class="k-live-wrap"><iframe class="k-live-frame" src="${x.src}" title="${esc(x.title || p.t + ', live piece')}" loading="lazy" style="height:${x.h || 760}px"></iframe>
        <div class="k-live-hint m"><span>${esc(x.hint || 'Live piece')}</span><a href="${x.src}" target="_blank" rel="noopener">Open full screen ↗</a></div></div>`,
    // motion timing drawn as a timeline: each beat is a bar, placed at its start time
    beats: (x) => {
      let t = 0; const rows = x.items.map(([n, d, st]) => { const s0 = st != null ? st : t; t = Math.max(t, s0 + d); return [n, s0, d]; });
      const end = x.total || Math.max(...rows.map(([, a, b]) => a + b)), W = 900, L = 230, R = 60, H = 38, top = 34;
      const X = (v) => L + (v / end) * (W - L - R);
      let g = '';
      const step = end > 4 ? 1 : .5;
      for (let v = 0; v <= end + 1e-6; v += step) g += `<path class="l g th ds" d="M${X(v).toFixed(1)} ${top - 8} V${top + rows.length * H}"/><text class="t" x="${X(v).toFixed(1)}" y="${top - 14}" text-anchor="middle">${v}s</text>`;
      rows.forEach(([n, a, d], i) => { const y = top + i * H; g += `<text class="b" x="0" y="${y + 23}">${esc(n)}</text><rect class="f ${i === rows.length - 1 ? 'c' : 's'}" x="${X(a).toFixed(1)}" y="${y + 8}" width="${Math.max(4, X(a + d) - X(a)).toFixed(1)}" height="${H - 16}" rx="5"/><text class="t" x="${(X(a + d) + 8).toFixed(1)}" y="${y + 23}">${d}s</text>`; });
      return `<figure class="k-fig"><svg class="dg" viewBox="0 0 ${W} ${top + rows.length * H + 6}" role="img" aria-label="Motion timing: ${rows.map(([n, a, d]) => `${n} ${d} seconds`).join(', ')}">${g}</svg>${x.cap ? `<figcaption class="m">${esc(x.cap)}</figcaption>` : ''}</figure>`;
    },
    // typefaces, each set in a short line about what it does
    fonts: (x) => `<div class="k-fonts" style="--n:${Math.min(x.items.length, 4)}">${x.items.map(([f, use]) => `<div><b>${esc(f)}</b><span>${esc(use)}</span></div>`).join('')}</div>`,
    cols: (x) => `<div class="k-notes k-cols" style="--n:${x.items.length}">${x.items.map(([h, li]) => `<div><b>${esc(h)}</b><ul>${li.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>`).join('')}</div>`,
    gap: () => '<div style="height:clamp(22px,3vw,40px)"></div>',
  };
  const parts = (arr = []) => arr.map((x) => part[x.t](x)).join('');

  /* spreads */
  let pg = 1; const chaps = [];
  const frame = (cls, lab, inner, extra = '') => {
    pg += 1; const id = `ch${pg}`; chaps.push([id, lab]);
    return `<section class="k-sp k-rv ${cls}" id="${id}"${extra}><div class="k-lab m"><span>${String(pg).padStart(2, '0')}.</span><span>${esc(lab)}</span></div><span class="k-pg m">P. ${String(pg).padStart(2, '0')}</span>${inner}</section>`;
  };
  const head = (x) => `${x.h ? `<h2>${em(x.h)}</h2>` : ''}${x.sub ? `<p class="k-sub">${esc(x.sub)}</p>` : '<div style="height:18px"></div>'}`;

  const spread = {
    state: (x) => frame('', x.lab, `<div class="k-in"><div class="k-state"><p class="k-big">${em(x.h)}</p>${part.list({ items: x.items })}${x.fig ? `<div class="k-fig-wrap" style="grid-column:1/-1">${parts(x.fig)}</div>` : ''}</div></div>`),
    sp: (x) => frame((x.dark ? 'k-dark' : x.tint ? 'k-tint' : '') + (x.tone ? ' tone-' + x.tone : ''), x.lab, `<div class="k-in">${head(x)}${parts(x.parts)}</div>`),
    vid: (x) => frame('k-dark' + (x.tone ? ' tone-' + x.tone : ''), x.lab, `<div class="k-in">${head(x)}<div class="k-vid ${x.portrait ? 'portrait' : ''}">
        ${x.auto ? `<video class="auto" src="${x.src}" poster="${x.poster}" muted playsinline loop preload="metadata" aria-label="${esc(x.h.replace(/\*/g, ''))}"></video>` : `<video src="${x.src}" poster="${x.poster}" controls muted playsinline preload="none" loop></video>`}
        <div>${(x.p || []).map((t) => `<p>${esc(t)}</p>`).join('')}${x.list ? part.list({ items: x.list }) : ''}${x.side ? `<div class="k-side">${x.side.map(([s, a]) => img(s, a)).join('')}</div>` : ''}${x.cap ? `<p class="m" style="color:#8A8A85">${esc(x.cap)}</p>` : ''}</div></div>
        ${x.imgs ? `<div class="k-row3">${x.imgs.map(([s, a]) => img(s, a)).join('')}</div>` : ''}</div>`),
    quote: (x) => frame('k-quote', x.lab || 'In one line', `<q>${esc(x.q)}</q>`),
  };

  const cover = () => `<section class="k-sp k-cover" id="ch1">
      <div class="k-lab m"><span>01.</span><span>${esc(k.ctx)}</span><span>· Project ${pad(i + 1)} of ${pad(P.length)}</span></div>
      <div class="txt"><h1 class="${p.t.length > 13 ? 'long' : ''}">${esc(p.t)}</h1><p class="one">${esc(k.one)}</p>
        <dl class="m">${k.facts.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl></div>
      <div class="pic ${k.coverContain ? 'contain' : ''}" style="${k.coverBg ? `background:${k.coverBg};` : ''}${k.coverPos ? `--pos:${k.coverPos};` : ''}">${img(k.cover, k.coverAlt, false)}</div>
    </section>
    <section class="k-sp k-glance k-rv${k.glanceHtml ? ' own' : ''}${k.glanceTone ? ' tone-' + k.glanceTone : ''}" id="glance">
      <div class="k-lab m"><span>The process · where it started</span></div>
      ${k.glanceHtml || `<div class="k-stats">${k.stats.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>
      <ul class="k-tldr">${['Problem', 'Idea'].map((t, n) => `<li><span class="m">${t}</span><span>${esc(k.tldr[n])}</span></li>`).join('')}</ul>`}
    </section>`;

  const outcome = () => {
    const o = k.out; pg += 1; chaps.push([`ch${pg}`, 'Outcome']);
    return `<section class="k-sp k-out k-rv${o.img ? '' : ' solo'}" id="ch${pg}">
      <div class="txt"><div class="k-lab m" style="position:static;margin-bottom:24px"><span>${String(pg).padStart(2, '0')}.</span><span>Outcome</span></div>
        <p class="k-big">${em(o.h)}</p>
        ${o.chips ? `<div class="k-chips">${o.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>` : ''}
        ${o.live ? `<a class="k-live" href="${o.live[0]}" target="_blank" rel="noopener">${esc(o.live[1])} ↗</a>` : ''}
        ${o.note ? `<p class="k-note m">${esc(o.note)}</p>` : ''}
        <p class="k-kit m">${esc(o.kit)}</p></div>
      ${o.img ? `<div class="pic ${o.contain ? 'contain' : ''}" style="${o.bg ? `background:${o.bg};` : ''}${o.pos ? `--pos:${o.pos};` : ''}">${img(o.img, o.alt)}</div>` : ''}
    </section>`;
  };

  // story order: cover, then the result straight away, then at a glance, then the journey, then what I'd do next time
  // the finished work comes right after the cover with the outcome (outcome first unless the case asks for the work first); the process follows "at a glance"
  const isResult = (x) => x.result || x.t === 'live' || /^live/i.test(x.lab || '');
  const R = k.blocks.filter(isResult), work = (a) => a.map((x) => spread[x.t](x)).join('');
  let top, result;
  // workFirst: the first piece of finished work leads, the outcome sits right after it, then the rest
  if (k.workFirst) { const lead = work(R.slice(0, 1)); top = outcome(); result = lead + top + work(R.slice(1)); top = ''; }
  else { top = outcome(); result = work(R); }
  const body = k.blocks.filter((x) => !isResult(x)).map((x) => spread[x.t](x)).join('');
  const back = k.out.reflect ? frame('k-tint k-back-sp' + (k.backTone ? ' tone-' + k.backTone : ''), 'Looking back', `<div class="k-in"><h2>Next time</h2>${part.list({ items: k.out.reflect.map((r) => ['', r]) })}</div>`) : '';
  const cov = cover(), cut = cov.indexOf('<section class="k-sp k-glance');
  const pn = (q, n, dir) => `<a class="k-pn-${dir}" href="${href(q)}" style="--nc:${q.c}" rel="${dir}"><span class="m mute">${dir === 'prev' ? '← Previous' : 'Next →'} · ${pad(n + 1)}</span><b>${esc(q.t)}</b></a>`;
  const html = cov.slice(0, cut) + top + result + cov.slice(cut) + body + back + `<nav class="k-next" aria-label="More projects">${pn(prv, (i - 1 + P.length) % P.length, 'prev')}<a class="k-all m" href="work.html">All work</a>${pn(nxt, (i + 1) % P.length, 'next')}</nav>`;
  chaps.unshift(['ch1', 'Cover']);
  if (k.theme) document.getElementById('case').classList.add('t-' + k.theme);
  document.getElementById('case').innerHTML = `<div class="k-chap m"><a class="k-back" href="work.html" aria-label="Back to all work">← <span>All work</span></a><div class="k-toc" role="navigation" aria-label="Chapters">${chaps.map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join('')}</div><span class="k-step"><a href="${href(prv)}" aria-label="Previous project: ${esc(prv.t)}" title="${esc(prv.t)}">‹</a><span>${pad(i + 1)}/${pad(P.length)}</span><a href="${href(nxt)}" aria-label="Next project: ${esc(nxt.t)}" title="${esc(nxt.t)}">›</a></span><i class="k-prog"></i></div>` + html;

  /* behaviour: reveal, chapter highlight, progress, pins, demos */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // diagrams too wide for a phone scroll sideways: say so, and hide the hint once someone scrolls
  const hint = () => document.querySelectorAll('.k-fig').forEach((f) => f.classList.toggle('scrolls', f.scrollWidth > f.clientWidth + 4));
  hint(); addEventListener('resize', hint);
  // short demo films play by themselves while on screen (not for reduced motion); tap to pause
  document.querySelectorAll('video.auto').forEach((v) => {
    v.addEventListener('click', () => (v.paused ? v.play() : v.pause()));
    if (reduce) { v.controls = true; return; }
    new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .4 }).observe(v);
  });
  document.querySelectorAll('.k-fig').forEach((f) => f.addEventListener('scroll', () => f.classList.add('scrolled'), { once: true }));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('k-seen'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.k-rv').forEach((el) => io.observe(el));
  const links = [...document.querySelectorAll('.k-toc a')], prog = document.querySelector('.k-prog');
  const secs = links.map((a) => document.querySelector(a.getAttribute('href')));
  const onScroll = () => {
    const y = scrollY + 140; let cur = 0; secs.forEach((s, n) => { if (s && s.offsetTop <= y) cur = n; });
    links.forEach((a, n) => a.classList.toggle('on', n === cur));
    prog.style.width = `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100)}%`;
  };
  let lastCur = -1;
  addEventListener('scroll', () => { onScroll(); const on = links.findIndex((a) => a.classList.contains('on')); if (on !== lastCur) { lastCur = on; links[on].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); } }, { passive: true });
  onScroll();
  document.querySelectorAll('.k-call').forEach((c) => {
    const pins = [...c.querySelectorAll('.k-pin')], lis = [...c.querySelectorAll('.k-legend li')], leg = c.querySelector('.k-legend');
    const on = (n) => { leg.classList.toggle('dim', n >= 0); pins.forEach((x, j) => x.classList.toggle('on', j === n)); lis.forEach((x, j) => x.classList.toggle('on', j === n)); };
    [...pins, ...lis].forEach((x) => { const n = +x.dataset.n; x.addEventListener('mouseenter', () => on(n)); x.addEventListener('mouseleave', () => on(-1)); x.addEventListener('focus', () => on(n)); x.addEventListener('blur', () => on(-1)); x.addEventListener('click', () => on(n)); });
  });
  // left and right arrow keys move between projects, unless you're typing or using a slider
  addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, [contenteditable], [role="slider"]') || e.altKey || e.metaKey || e.ctrlKey) return;
    if (e.key === 'ArrowLeft') location.href = href(prv); if (e.key === 'ArrowRight') location.href = href(nxt);
  });
  // live pieces: once loaded, grow the frame to fit the piece (measured once, so pieces sized to the window don't keep growing)
  document.querySelectorAll('.k-live-frame').forEach((f) => f.addEventListener('load', () => {
    try { const d = f.contentDocument, h = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight); if (h > f.clientHeight + 4 && h < 4000) f.style.height = h + 'px'; } catch (e) {}
  }));
  Object.values(DEMOS).forEach((d) => { if (document.getElementById(d.id)) d.run(reduce); });
})();

;
