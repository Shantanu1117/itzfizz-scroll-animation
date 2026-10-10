/**
 * Production Build and Release Bundler
 * Node.js production asset pipeline for ITZFIZZ // McLaren 720S Wind-Tunnel Telemetry Atelier
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🚀 Running production build pipeline...');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Required production assets
const assets = [
  'index.html',
  'styles.css',
  'react.min.js',
  'gsap.min.js',
  'ScrollTrigger.min.js',
  'main.js',
  'McLaren 720S 2022 top view.png'
];

// Required modular React source files
const reactSources = [
  'src/data/telemetryData.js',
  'src/components/Navbar.jsx',
  'src/components/HeadlineMatrix.jsx',
  'src/components/WindTunnelRunway.jsx',
  'src/components/TelemetryBentoGrid.jsx',
  'src/components/EditorialFinale.jsx',
  'src/App.jsx',
  'src/main.jsx'
];

let buildErrors = [];
let assetManifest = {};

for (const srcFile of reactSources) {
  const fullPath = path.join(srcDir, srcFile);
  if (!fs.existsSync(fullPath)) {
    buildErrors.push(`Missing React source module: ${srcFile}`);
  }
}

for (const file of assets) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(distDir, file);

  if (!fs.existsSync(srcPath)) {
    buildErrors.push(`Missing critical asset: ${file}`);
    continue;
  }

  const stat = fs.statSync(srcPath);
  if (stat.size === 0) {
    buildErrors.push(`Asset ${file} is empty (0 bytes)`);
    continue;
  }

  // Syntax-check all JS files
  if (file.endsWith('.js')) {
    try {
      const code = fs.readFileSync(srcPath, 'utf8');
      new vm.Script(code, { filename: file });
    } catch (err) {
      buildErrors.push(`Syntax error in ${file}: ${err.message}`);
    }
  }

  fs.copyFileSync(srcPath, destPath);
  assetManifest[file] = {
    sizeKb: (stat.size / 1024).toFixed(2),
    bytes: stat.size
  };
}

const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(distDir, 'styles.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(distDir, 'main.js'), 'utf8');

// 1. Verify index.html contains all 15 characters of "WELCOME ITZFIZZ"
const matchLetters = htmlContent.match(/<span[^>]*class="[^"]*value-letter[^"]*"[^>]*>[\s\S]*?<\/span>/g) || [];
if (matchLetters.length < 15) {
  buildErrors.push(`HTML verification failed: Expected 15 headline letters, found ${matchLetters.length}`);
}

// 2. Verify all 4 metric boxes exist
const expectedBoxes = ['#box1', '#box2', '#box3', '#box4'];
for (const boxId of expectedBoxes) {
  const idStr = boxId.substring(1);
  if (!htmlContent.includes(`id="${idStr}"`)) {
    buildErrors.push(`HTML verification failed: Missing metric card ${boxId}`);
  }
}

// 3. Verify CSS does NOT have conflicting transitions on text-box
const textBoxRules = cssContent.match(/\.text-box\s*\{[^}]+\}/g) || [];
for (const rule of textBoxRules) {
  if (rule.includes('transition: opacity')) {
    buildErrors.push('CSS verification failed: Detected conflicting transition: opacity on .text-box');
  }
}

// 4. Verify main.js contains unified scrub timeline, gsap.context, and debounced resize
if (!jsContent.includes('scrub: 0.6')) {
  buildErrors.push('JS verification failed: Missing momentum scrub configuration');
}
if (!jsContent.includes('gsap.context')) {
  buildErrors.push('JS verification failed: Missing lifecycle-safe gsap.context()');
}
if (!jsContent.includes('window.addEventListener("resize"')) {
  buildErrors.push('JS verification failed: Missing responsive resize handler');
}

if (buildErrors.length > 0) {
  console.error('❌ Build failed with errors:');
  buildErrors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('✅ Production build succeeded! Distribution ready in ./dist\n');
console.table(assetManifest);
console.log(`\nVerified ${reactSources.length} modular React components and ${assets.length} production assets.`);
