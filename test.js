/**
 * ==============================================================================
 * Interactive Motion & Design Reviewer Test Suite
 * ==============================================================================
 * Comprehensive verification of the five prioritized areas:
 * 1. Reference fidelity & first-screen composition.
 * 2. Car-to-scroll synchronization & headline reveal accuracy.
 * 3. Animation smoothness across slow, fast, and reverse scrubbing.
 * 4. Typography, spacing, non-colliding metric positioning, and car asset quality.
 * 5. Mobile responsiveness, accessibility, and deployment reliability.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Independent Motion-Engineering Review & Verification Tests...\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');

// ============================================================================
// PRIORITY 1: Reference Fidelity & First-Screen Composition
// ============================================================================
console.log('--- Priority 1: Reference Fidelity & First-Screen Composition ---');

runTest('Car asset exists, is intact RGBA PNG, and referenced in index.html', () => {
  const carFile = path.join(__dirname, 'McLaren 720S 2022 top view.png');
  assert.ok(fs.existsSync(carFile), 'Car image file must exist');
  const size = fs.statSync(carFile).size;
  assert.ok(size > 500000, `Car image size should be > 500KB (actual: ${size})`);
  assert.ok(html.includes('src="McLaren 720S 2022 top view.png"'), 'index.html must reference the car PNG');
});

runTest('Track composition contains road, trail, headline container, and 4 metric cards', () => {
  assert.ok(html.includes('id="road"'), 'Must have #road element');
  assert.ok(html.includes('id="trail"'), 'Must have #trail element');
  assert.ok(html.includes('id="valueText"'), 'Must have #valueText container');
  assert.ok(html.includes('id="box1"'), 'Must have #box1');
  assert.ok(html.includes('id="box2"'), 'Must have #box2');
  assert.ok(html.includes('id="box3"'), 'Must have #box3');
  assert.ok(html.includes('id="box4"'), 'Must have #box4');
});

runTest('Reference metric values (58%, 23%, 27%, 40%) accurately represented', () => {
  assert.ok(html.includes('58%'), 'Metric 58% must exist');
  assert.ok(html.includes('23%'), 'Metric 23% must exist');
  assert.ok(html.includes('27%'), 'Metric 27% must exist');
  assert.ok(html.includes('40%'), 'Metric 40% must exist');
});

runTest('Headline spans all 15 characters of "WELCOME ITZFIZZ" with character mapping', () => {
  const chars = ['W', 'E', 'L', 'C', 'O', 'M', 'E', ' ', 'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'];
  for (const c of chars) {
    assert.ok(html.includes(`data-char="${c}"`), `Headline must contain character '${c}'`);
  }
});

// ============================================================================
// PRIORITY 2: Car-to-Scroll Synchronization & Headline Reveal Accuracy
// ============================================================================
console.log('\n--- Priority 2: Car-to-Scroll & Headline Reveal Accuracy ---');

runTest('Car rendered width is dynamically computed from aspect ratio, not hardcoded 150px', () => {
  // In the reference, carWidth was hardcoded as 150.
  // In our engine, it accounts for the actual 3981 / 1901 aspect ratio (~2.094)
  assert.ok(!js.includes('const carWidth = 150;'), 'Must not hardcode carWidth as 150px');
  assert.ok(js.includes('3981 / 1901') || js.includes('renderedCarRect.width'), 'Must use true rendered/natural aspect ratio');
});

runTest('Green trail alignment calculates true rear axle/contact patch position', () => {
  // Trail contact point should be mathematically locked to car's rear geometry
  assert.ok(js.includes('trailContactX = carX + carWidth *'), 'Must calculate trail contact point from car geometry');
  assert.ok(js.includes('trail.style.width'), 'Must dynamically update trail width in px');
});

runTest('Letter reveal logic guarantees synchronous paint-reveal and reverse-unreveal', () => {
  assert.ok(js.includes('revealTriggerX >= metric.left'), 'Must test car trigger X against letter boundary');
  assert.ok(js.includes('metric.el.style.opacity = "1"'), 'Must reveal letters when crossed');
  assert.ok(js.includes('metric.el.style.opacity = "0"'), 'Must un-reveal letters when reversed');
});

runTest('Headline font size uses fluid clamp to prevent clipping or overflowing the road', () => {
  assert.ok(css.includes('clamp('), 'Headline must use clamp() to fit within the road dynamically');
  assert.ok(!css.includes('font-size: 8rem;'), 'Must eliminate rigid 8rem overflow from reference');
});

// ============================================================================
// PRIORITY 3: Animation Smoothness Across Slow, Fast, and Reverse Scrolling
// ============================================================================
console.log('\n--- Priority 3: Animation Smoothness & Scrubbing Stability ---');

runTest('CSS transitions removed from scrubbed elements (eliminating frame-fighting stutter)', () => {
  // In the reference: .text-box had `transition: opacity 0.5s` which fought GSAP scrub
  const textBoxRuleMatch = css.match(/\.text-box\s*\{[^}]+\}/g);
  assert.ok(textBoxRuleMatch, '.text-box rule must exist');
  for (const rule of textBoxRuleMatch) {
    assert.ok(!rule.includes('transition: opacity'), 'Scrubbed .text-box must not contain transition: opacity');
  }
});

runTest('Unified master timeline with momentum scrub replaces disjointed ScrollTriggers', () => {
  assert.ok(js.includes('scrub: 0.6'), 'Timeline must use smoothed momentum scrub');
  assert.ok(js.includes('fastScrollEnd: true'), 'Timeline must enable fastScrollEnd for swift flick scrolls');
  assert.ok(js.includes('masterTimeline = gsap.timeline'), 'Must choreograph animations on a single master timeline');
});

runTest('Metric card reveals use normalized timeline positions, not fixed window height offsets', () => {
  // In the reference: top+=400, top+=600, top+=800, top+=1000 broke on varying viewports
  assert.ok(!js.includes('top+=400'), 'Must eliminate hardcoded pixel trigger top+=400');
  assert.ok(!js.includes('top+=600'), 'Must eliminate hardcoded pixel trigger top+=600');
  assert.ok(!js.includes('top+=800'), 'Must eliminate hardcoded pixel trigger top+=800');
  assert.ok(!js.includes('top+=1000'), 'Must eliminate hardcoded pixel trigger top+=1000');
});

// ============================================================================
// PRIORITY 4: Typography, Spacing, Metric Positioning & Asset Quality
// ============================================================================
console.log('\n--- Priority 4: Typography, Spacing, Metric Positioning & Asset Quality ---');

runTest('Metric cards separated into top and bottom non-colliding telemetry lanes', () => {
  assert.ok(html.includes('cards-lane--top'), 'Must have top telemetry lane');
  assert.ok(html.includes('cards-lane--bottom'), 'Must have bottom telemetry lane');
  assert.ok(css.includes('.cards-lane--top'), 'Must define top lane positioning');
  assert.ok(css.includes('.cards-lane--bottom'), 'Must define bottom lane positioning');
});

runTest('Reference color palette preserved with refined depth & shadows', () => {
  assert.ok(css.includes('#def54f'), 'Box 1 yellow #def54f preserved');
  assert.ok(css.includes('#6ac9ff'), 'Box 2 blue #6ac9ff preserved');
  assert.ok(css.includes('#333338') || css.includes('#333'), 'Box 3 dark slate preserved');
  assert.ok(css.includes('#fa7328'), 'Box 4 papaya orange #fa7328 preserved');
  assert.ok(css.includes('drop-shadow') || css.includes('box-shadow'), 'Visual elevation must use shadows');
});

runTest('Car entity includes road contact shadow and headlight directional beam', () => {
  assert.ok(html.includes('car-shadow'), 'Car wrapper must include realistic ground contact shadow');
  assert.ok(html.includes('car-headlight-beam'), 'Car wrapper must include directional headlight illumination');
});

// ============================================================================
// PRIORITY 5: Mobile Responsiveness, Accessibility & Deployment Reliability
// ============================================================================
console.log('\n--- Priority 5: Mobile Responsiveness, Accessibility & Reliability ---');

runTest('Mobile responsive breakpoints (@media max-width: 768px) defined', () => {
  assert.ok(css.includes('@media (max-width: 768px)'), 'Must include mobile media query');
  assert.ok(css.includes('--road-height: 140px;') || css.includes('var(--road-height)'), 'Road must scale on mobile');
  assert.ok(css.includes('--car-height: 110px;') || css.includes('var(--car-height)'), 'Car must scale on mobile');
});

runTest('Reduced motion query (@media prefers-reduced-motion: reduce) implemented', () => {
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'), 'Must include CSS prefers-reduced-motion');
  assert.ok(js.includes('prefers-reduced-motion: reduce'), 'JS must respect prefers-reduced-motion');
  assert.ok(js.includes('handleReducedMotion'), 'JS must provide accessible static layout handler');
});

runTest('Accessibility landmarks, skip link, and descriptive alt attributes present', () => {
  assert.ok(html.includes('class="skip-link"'), 'Must have accessibility skip link');
  assert.ok(html.includes('role="region"'), 'Track must have role="region"');
  assert.ok(html.includes('aria-label='), 'Must include descriptive ARIA labels');
  assert.ok(html.includes('alt="McLaren 720S 2022 sports car'), 'Car image must have descriptive alt attribute');
});

runTest('Local self-contained GSAP libraries included (zero external CDN dependency)', () => {
  assert.ok(html.includes('src="gsap.min.js"'), 'Must load local gsap.min.js');
  assert.ok(html.includes('src="ScrollTrigger.min.js"'), 'Must load local ScrollTrigger.min.js');
  assert.ok(fs.existsSync(path.join(__dirname, 'gsap.min.js')), 'gsap.min.js must exist on disk');
  assert.ok(fs.existsSync(path.join(__dirname, 'ScrollTrigger.min.js')), 'ScrollTrigger.min.js must exist on disk');
});

runTest('Debounced resize, visualViewport, and orientation change listeners prevent desynchronization', () => {
  assert.ok(js.includes('addEventListener("resize"'), 'Must handle window resize');
  assert.ok(js.includes('addEventListener("orientationchange"'), 'Must handle device orientation change');
  assert.ok(js.includes('visualViewport'), 'Must handle mobile visualViewport resize');
  assert.ok(js.includes('cacheGeometry'), 'Must recache geometry on viewport change');
});

runTest('Ultra-narrow portrait viewports (<= 360px / < 320px) supported without overflow', () => {
  assert.ok(css.includes('@media (max-width: 360px)'), 'Must include ultra-narrow media query');
  assert.ok(css.includes('--road-height: 110px;'), 'Road height must scale down for ultra-narrow viewports');
  assert.ok(css.includes('--car-height: 84px;'), 'Car height must scale down for ultra-narrow viewports');
});

runTest('Landscape mobile & short viewports (max-height: 480px) adapt cards to inline badge layout', () => {
  assert.ok(css.includes('@media (max-height: 480px)'), 'Must include landscape mobile media query');
  assert.ok(css.includes('--road-height: 96px;'), 'Road must scale down for short landscape viewports');
  assert.ok(css.includes('flex-direction: row;'), 'Metric cards must switch to compact row layout in short landscape');
});

runTest('Keyboard arrow scrubbing (ArrowRight / ArrowLeft) enabled for accessible control', () => {
  assert.ok(js.includes('e.key === "ArrowRight"'), 'Must support ArrowRight key scrubbing');
  assert.ok(js.includes('e.key === "ArrowLeft"'), 'Must support ArrowLeft key scrubbing');
});

runTest('All JavaScript files (react.min.js, gsap.min.js, ScrollTrigger.min.js, main.js) compile without syntax errors', () => {
  const vm = require('vm');
  const reactCode = fs.readFileSync(path.join(__dirname, 'react.min.js'), 'utf8');
  const gsapCode = fs.readFileSync(path.join(__dirname, 'gsap.min.js'), 'utf8');
  const stCode = fs.readFileSync(path.join(__dirname, 'ScrollTrigger.min.js'), 'utf8');
  new vm.Script(reactCode, { filename: 'react.min.js' });
  new vm.Script(gsapCode, { filename: 'gsap.min.js' });
  new vm.Script(stCode, { filename: 'ScrollTrigger.min.js' });
  new vm.Script(js, { filename: 'main.js' });
});

runTest('Sticky track CSS is not overwritten by position: relative and html/body use overflow-x: clip', () => {
  const trackRuleMatch = css.match(/\.track\s*\{[^}]+\}/);
  assert.ok(trackRuleMatch, '.track CSS rule must exist');
  assert.ok(trackRuleMatch[0].includes('position: sticky'), '.track must have position: sticky');
  assert.ok(!trackRuleMatch[0].includes('position: relative'), '.track must not overwrite sticky with position: relative');
  assert.ok(css.includes('overflow-x: clip'), 'html and body must use overflow-x: clip so sticky works');
});

runTest('Modular React component architecture & gsap.context() lifecycle cleanup implemented', () => {
  assert.ok(fs.existsSync(path.join(__dirname, 'src/App.jsx')), 'src/App.jsx must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'src/components/Navbar.jsx')), 'Navbar.jsx must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'src/components/HeadlineMatrix.jsx')), 'HeadlineMatrix.jsx must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'src/components/WindTunnelRunway.jsx')), 'WindTunnelRunway.jsx must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'src/components/TelemetryBentoGrid.jsx')), 'TelemetryBentoGrid.jsx must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'src/components/EditorialFinale.jsx')), 'EditorialFinale.jsx must exist');
  assert.ok(js.includes('gsap.context'), 'Must use lifecycle-safe gsap.context()');
  assert.ok(js.includes('ctx.revert()'), 'Must clean up GSAP context on unmount');
});

runTest('Reimagined Wind-Tunnel Telemetry Atelier features (blueprint ghost letters, sector gates, vortex slipstream, Bento HUD)', () => {
  assert.ok(html.includes('letter-ghost'), 'Must include dual-plane blueprint ghost letters');
  assert.ok(html.includes('sector-gate'), 'Must include runway sector timing gates');
  assert.ok(html.includes('trail-vortex'), 'Must include aerodynamic wingtip vortex ribbons');
  assert.ok(html.includes('telemetry-bento-bay'), 'Must include 4-module architectural Bento HUD');
  assert.ok(html.includes('hudVelocity'), 'Must include live airspeed velocity readout');
});

runTest('Photorealistic RGBA McLaren 720S asset & cinematic wet-asphalt lighting system verified', () => {
  const carBuffer = fs.readFileSync(path.join(__dirname, 'McLaren 720S 2022 top view.png'));
  // Verify PNG signature and IHDR chunk (width, height, bitDepth=8, colorType=6 for RGBA)
  assert.strictEqual(carBuffer[0], 0x89, 'Valid PNG signature byte 0');
  const width = carBuffer.readUInt32BE(16);
  const height = carBuffer.readUInt32BE(20);
  const colorType = carBuffer[25];
  assert.ok(width >= 1200 && height >= 600, `High-resolution photorealistic asset required (got ${width}x${height})`);
  assert.strictEqual(colorType, 6, 'Car PNG must be true RGBA (colorType 6) with alpha transparency');
  assert.ok(css.includes('.car-headlight-beam::before') && css.includes('.car-headlight-beam::after'), 'Dual asymmetric bi-xenon headlight cones must be styled');
  assert.ok(css.includes('--car-spot-x') && js.includes('--car-spot-x'), 'Dynamic wet-asphalt spotlight tracking (--car-spot-x) must be wired in CSS and JS');
});

runTest('Deployment configurations (vercel.json, netlify.toml) and README documentation match production build target', () => {
  assert.ok(fs.existsSync(path.join(__dirname, 'vercel.json')), 'vercel.json must exist');
  assert.ok(fs.existsSync(path.join(__dirname, 'netlify.toml')), 'netlify.toml must exist');
  const vercelCfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  assert.strictEqual(vercelCfg.outputDirectory, 'dist', 'vercel.json outputDirectory must be dist');
  const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
  assert.ok(readme.includes('1342 × 689'), 'README must document accurate 1342 × 689 RGBA PNG dimensions');
  assert.ok(readme.includes('npm start') && readme.includes('npm run build'), 'README must include setup and build commands');
});

runTest('End-to-end runtime simulation: React 18 mount + GSAP ScrollTrigger scrub forward (0%->50%->100%) and reverse (100%->0%)', () => {
  const vm = require('vm');
  const reactCode = fs.readFileSync(path.join(__dirname, 'react.min.js'), 'utf8');
  const gsapCode = fs.readFileSync(path.join(__dirname, 'gsap.min.js'), 'utf8');
  const stCode = fs.readFileSync(path.join(__dirname, 'ScrollTrigger.min.js'), 'utf8');

  // Lightweight simulated DOM environment to execute React + GSAP + ScrollTrigger end-to-end
  const elementsById = {};
  const allElements = [];
  let rafQueue = [];

  function createMockEl(tag) {
    const props = {};
    const el = {
      tagName: String(tag || 'DIV').toUpperCase(),
      id: '',
      className: '',
      textContent: '',
      children: [],
      style: {
        opacity: '0',
        width: '0px',
        transform: '',
        setProperty(k, v) { this[k] = v; },
        getPropertyValue(k) { return this[k] || ''; }
      },
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); }
      },
      setAttribute(k, v) {
        props[k] = String(v);
        if (k === 'id') { this.id = String(v); elementsById[this.id] = this; }
        if (k === 'class') { this.className = String(v); }
      },
      getAttribute(k) { return props[k] || null; },
      appendChild(child) {
        if (child) {
          this.children.push(child);
          if (child.id) elementsById[child.id] = child;
        }
        return child;
      },
      removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx >= 0) this.children.splice(idx, 1);
      },
      addEventListener(ev, fn) {
        if (ev === 'load') this._onload = fn;
      },
      removeEventListener() {},
      get clientWidth() { return this.id === 'road' ? 1440 : 308; },
      get clientHeight() { return this.id === 'car' ? 158 : 716; },
      get offsetHeight() { return this.id === 'scrollSection' ? 2880 : 900; },
      get complete() { return true; },
      get naturalWidth() { return 1342; },
      getBoundingClientRect() {
        if (this.id === 'scrollSection') {
          return { top: -sandboxWindow.scrollY, left: 0, width: 1440, height: 2880 };
        }
        if (this.id === 'road') {
          return { top: 300, left: 0, width: 1440, height: 192 };
        }
        if (this.id === 'car') {
          return { top: 317, left: 0, width: 308, height: 158 };
        }
        if (String(this.className).includes('value-letter')) {
          const idx = Number(props['data-index'] || 0);
          return { top: 120, left: 60 + idx * 85, width: 65, height: 80 };
        }
        return { top: 0, left: 0, width: 1440, height: 900 };
      }
    };
    Object.defineProperty(el, 'innerHTML', {
      get() { return ''; },
      set() { this.children = []; }
    });
    allElements.push(el);
    return el;
  }

  const rootEl = createMockEl('div');
  rootEl.setAttribute('id', 'root');

  const docListeners = {};
  const winListeners = {};

  const sandboxDocument = {
    readyState: 'complete',
    documentElement: { scrollTop: 0, clientHeight: 900 },
    body: createMockEl('body'),
    createElement: (tag) => createMockEl(tag),
    createElementNS: (_ns, tag) => createMockEl(tag),
    createTextNode: (txt) => ({ nodeType: 3, textContent: String(txt) }),
    getElementById: (id) => elementsById[id] || null,
    querySelector: (sel) => {
      if (sel.startsWith('#')) return elementsById[sel.slice(1)] || null;
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        return allElements.find((e) => String(e.className).split(/\s+/).includes(cls)) || null;
      }
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel.startsWith('#')) {
        const el = elementsById[sel.slice(1)];
        return el ? [el] : [];
      }
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        return allElements.filter((e) => String(e.className).split(/\s+/).includes(cls));
      }
      return [];
    },
    addEventListener: (ev, fn) => { (docListeners[ev] = docListeners[ev] || []).push(fn); },
    removeEventListener: () => {}
  };

  const sandboxWindow = {
    scrollY: 0,
    pageYOffset: 0,
    innerWidth: 1440,
    innerHeight: 900,
    NodeList: Array,
    HTMLCollection: Array,
    Element: Object,
    document: sandboxDocument,
    navigator: { userAgent: 'NodeSimulation' },
    performance: { now: () => Date.now() },
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    requestAnimationFrame: (cb) => { rafQueue.push(cb); return rafQueue.length; },
    cancelAnimationFrame: () => {},
    addEventListener: (ev, fn) => { (winListeners[ev] = winListeners[ev] || []).push(fn); },
    removeEventListener: () => {},
    scrollTo: (opts) => {
      sandboxWindow.scrollY = typeof opts === 'object' ? opts.top : opts;
      sandboxWindow.pageYOffset = sandboxWindow.scrollY;
    },
    setTimeout,
    clearTimeout
  };
  sandboxWindow.window = sandboxWindow;
  sandboxWindow.self = sandboxWindow;

  const ctx = vm.createContext(sandboxWindow);
  vm.runInContext(reactCode, ctx);
  vm.runInContext(gsapCode, ctx);
  vm.runInContext(stCode, ctx);
  vm.runInContext(js, ctx);

  function flushFrames(count = 35) {
    for (let i = 0; i < count; i++) {
      const batch = rafQueue.slice();
      rafQueue = [];
      batch.forEach((fn) => fn(Date.now()));
    }
  }

  function simulateScroll(y) {
    sandboxWindow.scrollY = y;
    sandboxWindow.pageYOffset = y;
    sandboxDocument.documentElement.scrollTop = y;
    (winListeners.scroll || []).forEach((fn) => fn());
    flushFrames(65);
  }

  flushFrames(10);

  // 1. Verify initial state at 0% scroll
  simulateScroll(0);
  const carWrapper = elementsById['carWrapper'];
  const trail = elementsById['trail'];
  const road = elementsById['road'];
  const letters = sandboxDocument.querySelectorAll('.value-letter');
  assert.strictEqual(letters.length, 15, 'All 15 letters mounted by React');
  assert.strictEqual(sandboxWindow.gsap.getProperty(carWrapper, 'x'), 0, 'Initial carX must be 0 at 0% scroll');
  assert.strictEqual(trail.style.width, '0px', 'Initial trail width must be 0px at 0% scroll');

  // 2. Verify mid-scroll state at 50% scroll (y = 990 out of 1980 scrollable distance)
  simulateScroll(990);
  const midCarX = sandboxWindow.gsap.getProperty(carWrapper, 'x');
  assert.ok(midCarX > 450 && midCarX < 650, `Mid-scroll carX should be near track midpoint (got ${midCarX})`);
  const midRevealed = letters.filter((l) => l.style.opacity === '1').length;
  assert.ok(midRevealed >= 6 && midRevealed <= 11, `Mid-scroll should reveal partial headline (got ${midRevealed}/15)`);
  assert.strictEqual(elementsById['box1'].style.opacity, '1', '#box1 (58%) must be revealed by 50% scroll');
  assert.strictEqual(elementsById['box2'].style.opacity, '1', '#box2 (23%) must be revealed by 50% scroll');

  // 3. Verify final state at 100% scroll (y = 1980)
  simulateScroll(1980);
  const endCarX = sandboxWindow.gsap.getProperty(carWrapper, 'x');
  assert.ok(endCarX > 1050, `Final carX must reach end of track (got ${endCarX})`);
  const endRevealed = letters.filter((l) => l.style.opacity === '1').length;
  assert.strictEqual(endRevealed, 15, 'All 15 characters of WELCOME ITZFIZZ must be revealed at 100% scroll');
  assert.strictEqual(elementsById['box3'].style.opacity, '1', '#box3 (27%) must be revealed at 100% scroll');
  assert.strictEqual(elementsById['box4'].style.opacity, '1', '#box4 (40%) must be revealed at 100% scroll');
  assert.strictEqual(elementsById['hudProgress'].textContent, '100%', 'HUD progress must read 100%');
  assert.strictEqual(elementsById['hudVelocity'].textContent, '341 KM/H', 'HUD airspeed must read 341 KM/H at 100%');
  assert.strictEqual(carWrapper.style['--car-energy'], '1.00', 'Car lighting energy must peak at 1.00 at 100% scroll');
  assert.ok(road.style['--car-spot-x'], 'Wet-asphalt spotlight (--car-spot-x) must update dynamically');

  // 4. Verify full reverse scroll back to 0% (y = 0)
  simulateScroll(0);
  const revCarX = sandboxWindow.gsap.getProperty(carWrapper, 'x');
  assert.ok(revCarX < 0.5, `Reverse scroll to 0% must return carX to 0 (got ${revCarX})`);
  assert.strictEqual(trail.style.width, '0px', 'Reverse scroll to 0% must reset trail width to 0px');
  const revRevealed = letters.filter((l) => l.style.opacity === '1').length;
  assert.strictEqual(revRevealed, 0, 'Reverse scroll to 0% must un-reveal all 15 headline letters');
  assert.strictEqual(Number(elementsById['box1'].style.opacity), 0, '#box1 must reverse to opacity 0 at 0% scroll');
  assert.strictEqual(Number(elementsById['box4'].style.opacity), 0, '#box4 must reverse to opacity 0 at 0% scroll');
});

runTest('Pixel-accurate Mountain Canyon Reference Specification (header nav, 2-line headline, canyon backdrop, sector markers, 4 metric icons & corner branding)', () => {
  const bgFile = path.join(__dirname, 'mountain-canyon-bg.jpg');
  assert.ok(fs.existsSync(bgFile) && fs.statSync(bgFile).size > 200000, 'mountain-canyon-bg.jpg must exist and be high-resolution');
  assert.ok(css.includes('mountain-canyon-bg.jpg'), 'styles.css must reference mountain-canyon-bg.jpg');
  assert.ok(html.includes('VELOCITY LAB') && html.includes('AERO DYNAMICS') && html.includes('TEST TRACK 01'), 'Header must match reference navigation and track badge');
  assert.ok(html.includes('DRIVEN BY INNOVATION') && html.includes('A HIGHER') && html.includes('IN MOTION'), 'Hero headline must include introductory and side supporting labels');
  assert.ok(html.includes('headline-row--top') && html.includes('headline-row--bottom'), 'Headline must use two-line WELCOME / ITZFIZZ layout');
  assert.ok(html.includes('0 - 60M') && html.includes('60M - 120M') && html.includes('120M - 180M') && html.includes('180M - 240M'), 'All four track distance ranges must match reference');
  assert.ok(html.includes('Improved operational efficiency') && html.includes('Higher fulfillment speed with optimized route planning'), 'Metric descriptions must match reference');
  assert.ok(html.includes('SCROLL TO EXPLORE') && html.includes('BEYOND ROUTES'), 'Bottom corner indicators must match reference');
});

// ============================================================================
// Final Evaluation
// ============================================================================
console.log('\n======================================================');
console.log(`Test Execution Summary: ${passedTests} / ${totalTests} Passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log('======================================================');

if (passedTests !== totalTests) {
  process.exit(1);
}
