# ITZFIZZ // VELOCITY — Precision in Motion (McLaren 720S Experience)

An award-grade, photorealistic scroll-driven automotive digital campaign reimagined from the ITZFIZZ car scroll assignment. Engineered with a modular **React 18 + GSAP 3.12 + ScrollTrigger** architecture and the **VELOCITY — Precision in Motion** design system.

---

## Creative Direction & Visual Hierarchy

Rather than reproducing a flat grey grid, black road band, green rectangle trail, illustrated vector car, and scattered floating boxes, this implementation establishes a strict four-tier studio visual hierarchy:

1. **Tier 1 (Visual Hero) — Photorealistic McLaren 720S Coupe**:
   - Studio-rendered top-down **McLaren 720S** (`1342 × 689` true RGBA PNG, `1.84 MB`) with metallic Papaya Spark paint reflections, smoked glass teardrop canopy, visible rear mid-mounted V8 engine bay, and forged dark-gunmetal wheels.
   - Grounded on the wet-asphalt test track via multi-layered ambient occlusion contact shadows (`.car-shadow`), velocity-modulated underbody reflection (`.car-underglow`), McLaren rear LED blade taillight glow (`.car-exhaust-flare`), and dual asymmetric bi-xenon headlight projection cones (`.car-headlight-beam::before` / `::after`).
2. **Tier 2 (Primary Editorial Message) — Dual-Plane Kinetic Headline (`WELCOME ITZFIZZ`)**:
   - Features a recessed wireframe blueprint base layer (`-webkit-text-stroke`) visible from frame 0, paired with an optical front-axle laser scan-line that ignites each character into high-contrast titanium ivory (`#FFFFFF`) with a leading-edge thermal highlight (`.is-leading`) as the McLaren 720S advances.
3. **Tier 3 (Supporting Narrative) — 4-Module Benchmark Impact Bento Bay**:
   - Houses the four benchmark operational impact statistics (`58%`, `23%`, `27%`, `40%`) and their verified descriptions in a zero-collision responsive grid with sector headers, tabular numerals, benchmark impact badges, and scroll-synchronized progress bars.
4. **Tier 4 (Restrained Instrumentation) — Wet-Asphalt Studio Track & Telemetry HUD**:
   - Radial-masked peripheral studio grid (`.isobar-grid`), dynamic wet-asphalt spotlight tracking (`--car-spot-x`), velocity-modulated lighting energy (`--car-energy`), and a plasma slipstream wake (`#trail`) locked to the rear axle (`carX + carWidth * 0.22`).

---

## Project Structure

```text
Carzzz/
├── index.html                          # Semantic entry HTML with pre-rendered tree & #root mount
├── styles.css                          # VELOCITY design system, lighting, responsive & a11y rules
├── main.js                             # Compiled React 18 + GSAP 3.12 application bundle
├── react.min.js                        # Self-contained React 18 + ReactDOM 18 runtime
├── gsap.min.js                         # Self-contained GSAP 3.12 runtime with gsap.context()
├── ScrollTrigger.min.js                # Self-contained ScrollTrigger 3.12 momentum scrub engine
├── McLaren 720S 2022 top view.png      # Photorealistic RGBA top-down McLaren 720S (1342 × 689)
├── src/
│   ├── main.jsx                        # React 18 root bootstrap
│   ├── App.jsx                         # Master component & GSAP context lifecycle orchestrator
│   ├── data/
│   │   └── telemetryData.js            # Content/presentation separation (metrics, chars, markers)
│   └── components/
│       ├── Navbar.jsx                  # Live telemetry instrument bar
│       ├── HeadlineMatrix.jsx          # Dual-plane kinetic typography component
│       ├── WindTunnelRunway.jsx        # Wet-asphalt track, sector gates, slipstream & vehicle
│       ├── TelemetryBentoGrid.jsx      # 4-module architectural Bento HUD
│       └── EditorialFinale.jsx         # Post-journey resolution & replay controls
├── build.js                            # Production bundler & syntax/asset validator (outputs ./dist)
├── test.js                             # Automated 28-assertion recruiter verification suite
├── server.js                           # Zero-dependency static HTTP server with auto-port fallback
├── vercel.json                         # Vercel static deployment configuration
├── netlify.toml                        # Netlify static deployment configuration
└── package.json                        # Scripts and metadata
```

---

## Quick Start (Development, Build & Testing)

No external internet downloads or third-party global CLIs are required. Everything runs out-of-the-box with Node.js:

### 1. Start Development Server
```bash
cd /Users/shantanu/Desktop/Carzzz
npm start
```
Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.

### 2. Run Production Build (`./dist`)
```bash
npm run build
```
Validates all React modules, checks JS syntax via `vm.Script`, verifies HTML/CSS rules, and outputs the production distribution into `./dist`.

### 3. Preview Production Build
```bash
npm run preview
```

### 4. Run Automated Verification Suite
```bash
npm test
```

---

## Deployment Instructions

Hosting configurations ([`vercel.json`](file:///Users/shantanu/Desktop/Carzzz/vercel.json) and [`netlify.toml`](file:///Users/shantanu/Desktop/Carzzz/netlify.toml)) are pre-configured to run `npm run build` and publish `./dist`:

- **Vercel**: Run `npx vercel --prod` or import the GitHub repository in the Vercel dashboard (Build Command: `npm run build`, Output Directory: `dist`).
- **Netlify**: Run `npx netlify deploy --prod --dir=dist` or connect the repository in Netlify.
- **GitHub Pages**: Push this repository to GitHub and configure Pages to serve from the root or `./dist` folder (all asset paths in `index.html` are relative and work in both root and subdirectory deployments).

---

## Accessibility & Controls

- **Mouse Wheel / Trackpad Scroll**: Smoothly scrubs the vehicle, headline ignition, and sector metrics forward and backward (`scrub: 0.6`).
- **Keyboard Navigation**: Press `ArrowRight` (`→`) or `ArrowLeft` (`←`) to drive and reverse the simulation in calibrated 12% viewport increments.
- **Reduced Motion (`prefers-reduced-motion: reduce`)**: Automatically disables scroll pinning and presents all headline letters and impact metrics at full visibility.
