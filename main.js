/**
 * ITZFIZZ // McLaren 720S Velocity Lab — Mountain Canyon Edition
 * Modular React 18 + GSAP 3.12 + ScrollTrigger 3.12 Application Bundle
 *
 * Matches the uploaded reference visual specification:
 *  - Header: Orange double-slash (//) ITZFIZZ + VELOCITY LAB / AERO DYNAMICS | TELEMETRY | PERFORMANCE | ABOUT + TEST TRACK 01 / MCLAREN 720S
 *  - Hero Headline: DRIVEN BY INNOVATION + Two-Line WELCOME (mountain-textured metallic white) / ITZFIZZ (neon-emerald outline & glow) + A HIGHER STANDARD IN MOTION
 *  - Environment: High-resolution nighttime mountain canyon & viaduct test track (mountain-canyon-bg.jpg)
 *  - Track & Car: Green & amber slipstream wake (#trail), directional chevrons, SEC.01–SEC.04 markers with glowing nodes, and photorealistic top-down orange McLaren 720S
 *  - Four Metric Panels: 58% (green), 23% (white), 27% (white), 40% (white/amber) with custom SVG icons, progress bars (01–04), SCROLL TO EXPLORE, and PERFORMANCE BEYOND ROUTES
 */

(function () {
  "use strict";

  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const h = React ? React.createElement : null;
  const { useEffect, useLayoutEffect, useRef, useCallback } = React || {};

  // ==========================================================================
  // 1. DATA LAYER (Matches src/data/telemetryData.js)
  // ==========================================================================
  const HEADLINE_TEXT = "WELCOME ITZFIZZ";

  const HEADLINE_CHARS = [
    { id: "char-0", char: "W", word: 1, index: 0 },
    { id: "char-1", char: "E", word: 1, index: 1 },
    { id: "char-2", char: "L", word: 1, index: 2 },
    { id: "char-3", char: "C", word: 1, index: 3 },
    { id: "char-4", char: "O", word: 1, index: 4 },
    { id: "char-5", char: "M", word: 1, index: 5 },
    { id: "char-6", char: "E", word: 1, index: 6 },
    { id: "char-7", char: " ", word: 0, index: 7, isSpace: true },
    { id: "char-8", char: "I", word: 2, index: 8 },
    { id: "char-9", char: "T", word: 2, index: 9 },
    { id: "char-10", char: "Z", word: 2, index: 10 },
    { id: "char-11", char: "F", word: 2, index: 11 },
    { id: "char-12", char: "I", word: 2, index: 12 },
    { id: "char-13", char: "Z", word: 2, index: 13 },
    { id: "char-14", char: "Z", word: 2, index: 14 }
  ];

  const IMPACT_METRICS = [
    {
      id: "box1",
      indexLabel: "01",
      sector: "SEC.01",
      gateDistance: "0 - 60M",
      gatePos: "9%",
      code: "PKP-ADOPT // +58",
      value: "58%",
      numericValue: 58,
      label: "Increase in pick up point use",
      detail: "First-wave network density & automated locker routing efficiency",
      icon: "network",
      accent: "#45db7d",
      numColor: "#5ef28e",
      barColor: "#45db7d",
      accentSecondary: "rgba(69, 219, 125, 0.18)",
      startProgress: 0.12,
      endProgress: 0.28,
      enterFromY: 24
    },
    {
      id: "box2",
      indexLabel: "02",
      sector: "SEC.02",
      gateDistance: "60M - 120M",
      gatePos: "65.5%",
      code: "COM-DEFLECT // -23",
      value: "23%",
      numericValue: 23,
      label: "Decreased in customer phone calls",
      detail: "Proactive real-time telemetry notifications reducing manual inquiries",
      icon: "phone",
      accent: "#ffffff",
      numColor: "#ffffff",
      barColor: "#e2e8f0",
      accentSecondary: "rgba(255, 255, 255, 0.12)",
      startProgress: 0.31,
      endProgress: 0.47,
      enterFromY: 24
    },
    {
      id: "box3",
      indexLabel: "03",
      sector: "SEC.03",
      gateDistance: "120M - 180M",
      gatePos: "77.5%",
      code: "PKP-VELOCITY // +27",
      value: "27%",
      numericValue: 27,
      label: "Increase in pick up point use",
      detail: "Higher fulfillment speed with optimized route planning",
      icon: "bars",
      accent: "#f59e0b",
      numColor: "#ffffff",
      barColor: "#e2e8f0",
      accentSecondary: "rgba(226, 232, 240, 0.12)",
      startProgress: 0.50,
      endProgress: 0.66,
      enterFromY: 24
    },
    {
      id: "box4",
      indexLabel: "04",
      sector: "SEC.04",
      gateDistance: "180M - 240M",
      gatePos: "89%",
      code: "OPS-EFFICIENCY // +40",
      value: "40%",
      numericValue: 40,
      label: "Improved operational efficiency",
      detail: "Smarter allocation and dynamic load balancing",
      icon: "bolt",
      accent: "#45db7d",
      numColor: "#ffffff",
      barColor: "#f59e0b",
      accentSecondary: "rgba(245, 158, 11, 0.16)",
      startProgress: 0.69,
      endProgress: 0.85,
      enterFromY: 24
    }
  ];

  const RUNWAY_MARKERS = [
    { pos: "0%", label: "000M" },
    { pos: "25%", label: "060M" },
    { pos: "50%", label: "120M" },
    { pos: "75%", label: "180M" },
    { pos: "100%", label: "240M" }
  ];

  // ==========================================================================
  // 2. MODULAR REACT COMPONENTS (Matches src/components/*.jsx)
  // ==========================================================================

  function Navbar(props) {
    return h(
      "header",
      { className: "site-header", role: "banner" },
      h(
        "div",
        { className: "header-progress-rail", "aria-hidden": "true" },
        h("div", { className: "header-progress-fill", id: "topBarFill", ref: props.topBarFillRef })
      ),
      h(
        "div",
        { className: "header-inner" },
        h(
          "div",
          { className: "header-left-cluster" },
          h(
            "div",
            { className: "brand" },
            h(
              "span",
              { className: "brand-slashes", "aria-hidden": "true" },
              h("span", { className: "slash-bar" }),
              h("span", { className: "slash-bar" })
            ),
            h("span", { className: "brand-title" }, "ITZFIZZ")
          ),
          h(
            "nav",
            { className: "header-nav", "aria-label": "Primary sections" },
            h("span", { className: "nav-sep", "aria-hidden": "true" }, "/"),
            h(
              "a",
              { href: "#content-track", className: "nav-item nav-item--active" },
              h("span", { className: "nav-active-dot", "aria-hidden": "true" }),
              h("span", null, "VELOCITY LAB")
            ),
            h("span", { className: "nav-sep", "aria-hidden": "true" }, "/"),
            h("a", { href: "#road", className: "nav-item" }, "AERO DYNAMICS"),
            h("span", { className: "nav-sep", "aria-hidden": "true" }, "|"),
            h("a", { href: "#box1", className: "nav-item" }, "TELEMETRY"),
            h("span", { className: "nav-sep", "aria-hidden": "true" }, "|"),
            h("a", { href: "#box4", className: "nav-item" }, "PERFORMANCE"),
            h("span", { className: "nav-sep", "aria-hidden": "true" }, "|"),
            h("a", { href: "#summarySection", className: "nav-item" }, "ABOUT")
          )
        ),
        h(
          "div",
          { className: "telemetry-pill-group", "aria-label": "Live scroll telemetry" },
          h(
            "div",
            { className: "telemetry-pill" },
            h("span", { className: "pill-label" }, "PROG"),
            h("span", { className: "pill-value", id: "hudProgress", ref: props.progressRef }, "0%")
          ),
          h(
            "div",
            { className: "telemetry-pill telemetry-pill--desktop" },
            h("span", { className: "pill-label" }, "VEL"),
            h("span", { className: "pill-value", id: "hudVelocity", ref: props.velocityRef }, "000 KM/H")
          ),
          h(
            "div",
            { className: "telemetry-pill telemetry-pill--desktop" },
            h("span", { className: "pill-label" }, "SEC"),
            h("span", { className: "pill-value", id: "hudSector", ref: props.sectorRef }, "GATE 00")
          ),
          h(
            "div",
            { className: "telemetry-pill telemetry-pill--sr" },
            h("span", { className: "pill-label" }, "STATUS"),
            h("span", { className: "pill-value pill-value--accent", id: "hudState", ref: props.stateRef }, "STANDBY")
          )
        ),
        h(
          "div",
          { className: "track-id-badge" },
          h(
            "div",
            { className: "track-id-icon", "aria-hidden": "true" },
            h(
              "svg",
              { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2" },
              h("circle", { cx: "12", cy: "12", r: "8", strokeOpacity: "0.45" }),
              h("path", { d: "M12 7c-2.2 0-4 1.8-4 4 0 3 4 6.5 4 6.5s4-3.5 4-6.5c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z", fill: "currentColor", stroke: "none" })
            )
          ),
          h(
            "div",
            { className: "track-id-copy" },
            h("span", { className: "track-id-title" }, "TEST TRACK 01"),
            h("span", { className: "track-id-sub" }, "MCLAREN 720S")
          )
        ),
        h(
          "div",
          { className: "scroll-hint scroll-hint--sr", id: "scrollHint", ref: props.scrollHintRef, "aria-hidden": "true" },
          h("span", { className: "scroll-hint-dot" }),
          h("span", null, "SCROLL TO EXPLORE")
        )
      )
    );
  }

  function HeadlineMatrix(props) {
    const firstWord = props.chars.slice(0, 7);
    const spaceChar = props.chars[7];
    const secondWord = props.chars.slice(8);

    const renderCharCell = (item, idx, lineClass) =>
      h(
        "span",
        {
          key: item.id,
          className: item.isSpace ? "letter-cell letter-cell--space" : `letter-cell ${lineClass}`
        },
        h("span", { className: "letter-ghost", "aria-hidden": "true" }, item.isSpace ? "\u00A0" : item.char),
        h(
          "span",
          {
            className: item.isSpace ? "value-letter space" : `value-letter ${lineClass}-letter`,
            "data-char": item.char,
            "data-index": idx,
            ref: (el) => {
              if (props.letterRefs && props.letterRefs.current) {
                props.letterRefs.current[idx] = el;
              }
            }
          },
          item.isSpace ? "\u00A0" : item.char
        )
      );

    return h(
      "div",
      { className: "headline-stage" },
      h(
        "div",
        { className: "headline-meta-bar", "aria-hidden": "true" },
        h("span", { className: "meta-tag" }, "DRIVEN BY INNOVATION"),
        h("span", { className: "meta-line" })
      ),
      h(
        "h1",
        { className: "value-add", id: "valueText", ref: props.valueAddRef, "aria-label": "WELCOME ITZFIZZ" },
        h(
          "span",
          { className: "headline-row headline-row--top" },
          firstWord.map((item) => renderCharCell(item, item.index, "letter-cell--welcome"))
        ),
        spaceChar ? renderCharCell(spaceChar, spaceChar.index, "letter-cell--space") : null,
        h(
          "span",
          { className: "headline-row headline-row--bottom" },
          h(
            "span",
            { className: "headline-itzfizz-word" },
            secondWord.map((item) => renderCharCell(item, item.index, "letter-cell--itzfizz"))
          ),
          h(
            "span",
            { className: "headline-side-caption", "aria-hidden": "true" },
            h("span", { className: "side-caption-rule" }),
            h(
              "span",
              { className: "side-caption-text" },
              h("span", null, "A HIGHER"),
              h("span", null, "STANDARD"),
              h("span", null, "IN MOTION")
            )
          )
        )
      )
    );
  }

  function WindTunnelRunway(props) {
    return h(
      "div",
      { className: "runway-shell" },
      h(
        "div",
        { className: "runway-ruler", "aria-hidden": "true" },
        props.markers.map((m, idx) =>
          h(
            "div",
            { key: idx, className: "ruler-tick", style: { left: m.pos } },
            h("span", { className: "tick-mark" }),
            h("span", { className: "tick-label" }, m.label)
          )
        )
      ),
      h(
        "div",
        {
          className: "road",
          id: "road",
          ref: props.roadRef,
          role: "img",
          "aria-label": "Mountain canyon test track with photorealistic orange McLaren 720S and green-amber slipstream illumination"
        },
        h(
          "div",
          { className: "road-markings", "aria-hidden": "true" },
          h("div", { className: "road-line road-line--top" }),
          h("div", { className: "streamline streamline--upper" }),
          h("div", { className: "road-dashes" }),
          h("div", { className: "streamline streamline--lower" }),
          h("div", { className: "road-line road-line--bottom" })
        ),
        h(
          "div",
          { className: "sector-gates-layer", "aria-hidden": "true" },
          props.metrics.map((metric, idx) =>
            h(
              "div",
              {
                key: metric.id,
                className: idx === 0 ? "sector-gate sector-gate--active" : "sector-gate",
                style: {
                  left: metric.gatePos || `${Math.round(metric.startProgress * 100 + 8)}%`,
                  "--gate-color": metric.accent
                },
                ref: (el) => {
                  if (props.gateRefs && props.gateRefs.current) {
                    props.gateRefs.current[idx] = el;
                  }
                }
              },
              h(
                "div",
                { className: "gate-header" },
                h("span", { className: "gate-tag" }, metric.sector),
                h("span", { className: "gate-dist" }, metric.gateDistance)
              ),
              h("span", { className: "gate-beam" }, h("span", { className: "gate-node" }))
            )
          )
        ),
        h(
          "div",
          { className: "trail", id: "trail", ref: props.trailRef, "aria-hidden": "true" },
          h("div", { className: "trail-vortex trail-vortex--top" }),
          h("div", { className: "trail-vortex trail-vortex--upper-mid" }),
          h("div", { className: "trail-core-beam" }),
          h(
            "div",
            { className: "trail-chevrons" },
            h("span", null, "›"),
            h("span", null, "›"),
            h("span", null, "›"),
            h("span", null, "›")
          ),
          h("div", { className: "trail-vortex trail-vortex--bottom" }),
          h("div", { className: "trail-glow" }),
          h("div", { className: "trail-laser" })
        ),
        h(
          "div",
          { className: "car-wrapper", id: "carWrapper", ref: props.carWrapperRef },
          h("div", { className: "car-underglow", "aria-hidden": "true" }),
          h("div", { className: "car-shadow", "aria-hidden": "true" }),
          h("div", { className: "car-exhaust-flare", "aria-hidden": "true" }),
          h("img", {
            src: "McLaren 720S 2022 top view.png",
            alt: "McLaren 720S 2022 sports car in photorealistic top-down studio view",
            className: "car",
            id: "car",
            width: "1342",
            height: "689",
            ref: props.carRef,
            loading: "eager",
            decoding: "async"
          }),
          h("div", { className: "car-headlight-beam", "aria-hidden": "true" })
        )
      )
    );
  }

  function renderMetricIcon(type) {
    if (type === "network") {
      return h(
        "svg",
        { className: "metric-icon metric-icon--green", viewBox: "0 0 32 32", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.8" },
        h("circle", { cx: "16", cy: "7", r: "3.2" }),
        h("circle", { cx: "8", cy: "23", r: "3.2" }),
        h("circle", { cx: "24", cy: "23", r: "3.2" }),
        h("circle", { cx: "16", cy: "17", r: "2.2" }),
        h("path", { d: "M16 10.2v4.6M13.8 18.4l-3.4 2.8M18.2 18.4l3.4 2.8M11.2 23h9.6" })
      );
    }
    if (type === "phone") {
      return h(
        "svg",
        { className: "metric-icon", viewBox: "0 0 32 32", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.8" },
        h("path", { d: "M9.5 6.5h4l2 5-2.5 2a14 14 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2C14.6 24.5 7.5 17.4 7.5 8.5a2 2 0 0 1 2-2z" }),
        h("path", { d: "M19 8a5 5 0 0 1 5 5M19 4a9 9 0 0 1 9 9", strokeLinecap: "round" })
      );
    }
    if (type === "bars") {
      return h(
        "svg",
        { className: "metric-icon", viewBox: "0 0 32 32", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.8" },
        h("rect", { x: "6", y: "21", width: "4", height: "5", rx: "0.8" }),
        h("rect", { x: "13", y: "15", width: "4", height: "11", rx: "0.8" }),
        h("rect", { x: "20", y: "8", width: "4", height: "18", rx: "0.8" }),
        h("path", { d: "M4 26h24", strokeLinecap: "round" })
      );
    }
    return h(
      "svg",
      { className: "metric-icon", viewBox: "0 0 32 32", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.8" },
      h("path", { d: "M17.5 4L8 17h7.5l-1 11L24 15h-7.5l1-11z", strokeLinejoin: "round" })
    );
  }

  function TelemetryBentoGrid(props) {
    const upperGroup = props.metrics.slice(0, 2);
    const lowerGroup = props.metrics.slice(2, 4);

    const renderCard = (m, idx) =>
      h(
        "article",
        {
          key: m.id,
          className: "text-box",
          id: m.id,
          style: {
            "--card-accent": m.accent,
            "--card-num-color": m.numColor,
            "--card-bar-color": m.barColor,
            "--card-glow": m.accentSecondary
          },
          "aria-label": `Metric ${m.sector}: ${m.value} ${m.label}`,
          ref: (el) => {
            if (props.boxRefs && props.boxRefs.current) {
              props.boxRefs.current[idx] = el;
            }
          }
        },
        h(
          "div",
          { className: "card-telemetry-head", "aria-hidden": "true" },
          h("span", { className: "card-sector-badge" }, h("span", { className: "sector-dot" }), `${m.sector} // ${m.gateDistance}`),
          h("span", { className: "card-code" }, m.code)
        ),
        h(
          "div",
          { className: "card-stat-row" },
          h("span", { className: "card-icon-wrap", "aria-hidden": "true" }, renderMetricIcon(m.icon)),
          h("span", { className: "num-box" }, m.value),
          h("span", { className: "stat-unit-tag" }, "BENCHMARK IMPACT")
        ),
        h(
          "div",
          { className: "card-body-copy" },
          h("p", { className: "box-desc" }, m.label),
          h("p", { className: "box-subdetail" }, m.detail)
        ),
        h(
          "div",
          { className: "card-footer-progress", "aria-hidden": "true" },
          h(
            "div",
            { className: "card-progress-track" },
            h("div", {
              className: "card-progress-fill",
              style: { width: `${m.numericValue}%` }
            })
          ),
          h("span", { className: "card-index-num" }, m.indexLabel || `0${idx + 1}`)
        )
      );

    return h(
      "div",
      { className: "lower-telemetry-zone" },
      h(
        "div",
        { className: "telemetry-bento-bay", role: "region", "aria-label": "Impact Telemetry Metrics" },
        h("div", { className: "cards-lane cards-lane--top" }, upperGroup.map((m, i) => renderCard(m, i))),
        h("div", { className: "cards-lane cards-lane--bottom" }, lowerGroup.map((m, i) => renderCard(m, i + 2)))
      ),
      h(
        "div",
        { className: "stage-bottom-bar", "aria-hidden": "true" },
        h(
          "div",
          { className: "scroll-explore-indicator" },
          h("span", { className: "explore-circle" }, h("span", { className: "explore-dot" })),
          h("span", { className: "explore-line" }),
          h("span", { className: "explore-text" }, "SCROLL TO EXPLORE")
        ),
        h(
          "div",
          { className: "performance-routes-brand" },
          h(
            "svg",
            { className: "mountain-emblem", viewBox: "0 0 80 32", width: "68", height: "26", fill: "none" },
            h("path", { d: "M4 28L26 8l12 11 14-14 24 23", stroke: "rgba(255,255,255,0.65)", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }),
            h("path", { d: "M26 8l-5 9 7-2 4 4M52 5l-6 10 8-3 5 5", stroke: "rgba(255,255,255,0.35)", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })
          ),
          h(
            "div",
            { className: "routes-brand-text" },
            h("span", null, "PERFORMANCE"),
            h("span", null, "BEYOND ROUTES")
          )
        )
      )
    );
  }

  function EditorialFinale(props) {
    return h(
      "section",
      { className: "summary-section", id: "summarySection", "aria-label": "Telemetry Session Summary" },
      h(
        "div",
        { className: "summary-card" },
        h("div", { className: "summary-eyebrow" }, "TEST TRACK 01 COMPLETE // 240.0M CANYON APEX"),
        h("h2", null, "Performance Beyond Routes Verified"),
        h(
          "p",
          null,
          "Full-range horizontal displacement synchronized via unified GSAP ScrollTrigger scrub, two-line optical headline ignition, and four-sector canyon telemetry verification."
        ),
        h(
          "div",
          { className: "summary-specs-grid" },
          h("div", { className: "spec-cell" }, h("span", { className: "spec-key" }, "CHASSIS"), h("span", { className: "spec-val" }, "McLaren 720S Coupe")),
          h("div", { className: "spec-cell" }, h("span", { className: "spec-key" }, "PEAK VELOCITY"), h("span", { className: "spec-val" }, "341 KM/H (212 MPH)")),
          h("div", { className: "spec-cell" }, h("span", { className: "spec-key" }, "MOTION ENGINE"), h("span", { className: "spec-val" }, "GSAP 3.12 + ScrollTrigger")),
          h("div", { className: "spec-cell" }, h("span", { className: "spec-key" }, "CONTROLS"), h("span", { className: "spec-val" }, "Wheel / Touch / ← → Keys"))
        ),
        h(
          "button",
          {
            type: "button",
            className: "restart-btn",
            id: "restartBtn",
            ref: props.restartBtnRef,
            onClick: props.onRestart
          },
          h("span", null, "Return to Start Gate (000M)"),
          h(
            "svg",
            { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2.5", "aria-hidden": "true" },
            h("path", { d: "M12 19V5M5 12l7-7 7 7" })
          )
        )
      )
    );
  }

  // ==========================================================================
  // 3. MOTION & SCROLL ENGINE (GSAP Context + ScrollTrigger Scrub)
  // ==========================================================================

  function setupMotionController(refs) {
    if (!gsap || !ScrollTrigger) return () => {};
    gsap.registerPlugin(ScrollTrigger);

    const section = refs.section || document.getElementById("scrollSection");
    const track = refs.track || document.getElementById("content-track");
    const road = refs.road || document.getElementById("road");
    const carWrapper = refs.carWrapper || document.getElementById("carWrapper");
    const car = refs.car || document.getElementById("car");
    const trail = refs.trail || document.getElementById("trail");
    const hudProgress = refs.hudProgress || document.getElementById("hudProgress");
    const hudVelocity = refs.hudVelocity || document.getElementById("hudVelocity");
    const hudSector = refs.hudSector || document.getElementById("hudSector");
    const hudState = refs.hudState || document.getElementById("hudState");
    const scrollHint = refs.scrollHint || document.getElementById("scrollHint");
    const topBarFill = refs.topBarFill || document.getElementById("topBarFill");
    const letters =
      refs.letters && refs.letters.length
        ? refs.letters
        : Array.from(document.querySelectorAll(".value-letter"));
    const gateEls =
      refs.gateRefs && refs.gateRefs.current && refs.gateRefs.current.filter(Boolean).length
        ? refs.gateRefs.current.filter(Boolean)
        : Array.from(document.querySelectorAll(".sector-gate"));

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let masterTimeline = null;
    let letterMetrics = [];
    let roadRect = { left: 0, width: 0 };
    let carWidth = 340;
    let endX = 960;

    function cacheGeometry() {
      if (!road || !carWrapper) return;
      roadRect = road.getBoundingClientRect();
      const renderedCarRect = car ? car.getBoundingClientRect() : { width: 0 };
      const fallbackHeight = car ? car.clientHeight || 168 : 168;
      carWidth = renderedCarRect.width || fallbackHeight * (1342 / 689) || fallbackHeight * (3981 / 1901) || 328;

      const roadWidth = road.clientWidth || window.innerWidth;
      const rightMargin = Math.min(36, Math.max(12, roadWidth * 0.025));
      endX = Math.max(80, roadWidth - carWidth - rightMargin);

      const sequentialSpan = roadWidth * 0.80;
      letterMetrics = letters.map((letter, idx) => {
        const rect = letter.getBoundingClientRect();
        const relativeLeft = (idx / Math.max(1, letters.length - 1)) * sequentialSpan + 18;
        const relativeCenter = relativeLeft + (rect.width || 40) * 0.5;
        return {
          el: letter,
          left: relativeLeft,
          center: relativeCenter,
          char: letter.getAttribute("data-char")
        };
      });
    }

    function syncCarMotion(carX, progress = 0) {
      const progressRatio = endX > 0 ? Math.min(1, Math.max(0, carX / endX)) : progress;
      let trailContactX = carX + carWidth * 0.22;
      if (carX <= 0.5) trailContactX = 0;
      const revealTriggerX = carX > 0.5 ? carX + carWidth * (0.45 + 0.55 * progressRatio) : -1;

      if (trail) {
        trail.style.width = `${Math.max(0, trailContactX)}px`;
      }

      if (road && road.style && typeof road.style.setProperty === "function") {
        road.style.setProperty("--car-spot-x", `${Math.round(carX + carWidth * 0.52)}px`);
      }

      if (carWrapper && carWrapper.style && typeof carWrapper.style.setProperty === "function") {
        carWrapper.style.setProperty("--car-energy", (0.55 + 0.45 * progressRatio).toFixed(2));
      }

      if (topBarFill && topBarFill.style) {
        topBarFill.style.width = `${Math.min(100, Math.max(0, progress * 100)).toFixed(1)}%`;
      }

      let leadingIndex = -1;
      for (let i = 0; i < letterMetrics.length; i++) {
        const metric = letterMetrics[i];
        if (revealTriggerX >= metric.left) {
          leadingIndex = i;
          if (metric.el.style.opacity !== "1") {
            metric.el.style.opacity = "1";
            if (metric.el.classList) metric.el.classList.add("is-revealed");
          }
        } else {
          if (metric.el.style.opacity !== "0") {
            metric.el.style.opacity = "0";
            if (metric.el.classList) metric.el.classList.remove("is-revealed");
          }
        }
      }

      for (let i = 0; i < letterMetrics.length; i++) {
        const el = letterMetrics[i].el;
        if (el && el.classList) {
          if (i === leadingIndex && progressRatio > 0.01 && progressRatio < 0.99) {
            el.classList.add("is-leading");
          } else {
            el.classList.remove("is-leading");
          }
        }
      }

      for (let g = 0; g < IMPACT_METRICS.length; g++) {
        const gateEl = gateEls[g];
        if (gateEl && gateEl.classList) {
          if (g === 0 || progress >= IMPACT_METRICS[g].startProgress) {
            gateEl.classList.add("sector-gate--active");
          } else {
            gateEl.classList.remove("sector-gate--active");
          }
        }
      }
    }

    function handleReducedMotion() {
      gsap.set(carWrapper, { x: endX * 0.75, opacity: 1 });
      gsap.set(trail, { width: "100%" });
      if (topBarFill && topBarFill.style) topBarFill.style.width = "100%";
      letters.forEach((l) => {
        l.style.opacity = "1";
        if (l.classList) l.classList.add("is-revealed");
      });
      gateEls.forEach((g) => {
        if (g && g.classList) g.classList.add("sector-gate--active");
      });
      gsap.set(["#box1", "#box2", "#box3", "#box4"], { opacity: 1, y: 0, scale: 1 });
      if (hudProgress) hudProgress.textContent = "100%";
      if (hudVelocity) hudVelocity.textContent = "341 KM/H";
      if (hudSector) hudSector.textContent = "ALL SECTORS";
      if (hudState) hudState.textContent = "ACCESSIBLE MODE";
    }

    const ctx = gsap.context(() => {
      function initMotionTimeline() {
        if (prefersReducedMotion) {
          cacheGeometry();
          handleReducedMotion();
          return;
        }

        if (masterTimeline) {
          masterTimeline.kill();
          ScrollTrigger.getAll().forEach((st) => st.kill());
        }

        cacheGeometry();

        gsap.set(carWrapper, { x: 0, opacity: 1 });
        gsap.set(trail, { width: 0 });
        letters.forEach((l) => (l.style.opacity = "0"));

        masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            pin: track,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const currentCarX = gsap.getProperty(carWrapper, "x") || 0;
              syncCarMotion(currentCarX, progress);

              if (hudProgress) {
                hudProgress.textContent = `${Math.round(progress * 100)}%`;
              }
              if (hudVelocity) {
                const kmh = Math.round(progress * 341);
                hudVelocity.textContent = `${String(kmh).padStart(3, "0")} KM/H`;
              }
              if (hudSector) {
                if (progress < 0.12) hudSector.textContent = "GATE 00";
                else if (progress < 0.30) hudSector.textContent = "SEC.01 // 60M";
                else if (progress < 0.48) hudSector.textContent = "SEC.02 // 120M";
                else if (progress < 0.66) hudSector.textContent = "SEC.03 // 180M";
                else hudSector.textContent = "SEC.04 // 240M";
              }
              if (hudState) {
                if (progress <= 0.01) hudState.textContent = "STANDBY";
                else if (progress >= 0.98) hudState.textContent = "APEX LOCKED";
                else hudState.textContent = self.direction >= 0 ? "ACCELERATING" : "REVERSING";
              }
              if (scrollHint) {
                scrollHint.style.opacity = progress > 0.04 ? "0.25" : "1";
              }
            }
          }
        });

        // 1. Primary Car Journey across Track (0.00 -> 1.00)
        masterTimeline.to(
          carWrapper,
          {
            x: endX,
            ease: "none",
            duration: 1.0
          },
          0
        );

        // 2. Choreographed Telemetry Cards (#box1, #box2, #box3, #box4)
        masterTimeline.fromTo(
          "#box1",
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.12
        );

        masterTimeline.fromTo(
          "#box2",
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.30
        );

        masterTimeline.fromTo(
          "#box3",
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.48
        );

        masterTimeline.fromTo(
          "#box4",
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.66
        );

        syncCarMotion(0, 0);
        ScrollTrigger.refresh();
      }

      if (car && !car.complete) {
        car.addEventListener("load", initMotionTimeline, { once: true });
      } else {
        initMotionTimeline();
      }
    }, section);

    // Debounced Resize & Orientation Listeners
    let resizeTimer = null;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!prefersReducedMotion) {
          cacheGeometry();
          ScrollTrigger.refresh();
          const currentCarX = gsap.getProperty(carWrapper, "x") || 0;
          const st = ScrollTrigger.getAll()[0];
          syncCarMotion(currentCarX, st ? st.progress : 0);
        }
      }, 120);
    }

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize, { passive: true });
    }

    // Keyboard Accessibility (ArrowRight / ArrowLeft)
    function handleKeyDown(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const step = window.innerHeight * 0.12 * (e.key === "ArrowRight" ? 1 : -1);
        window.scrollBy({ top: step, behavior: "smooth" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }

  // ==========================================================================
  // 4. MASTER APPLICATION COMPONENT (Matches src/App.jsx)
  // ==========================================================================

  function App() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const roadRef = useRef(null);
    const trailRef = useRef(null);
    const carWrapperRef = useRef(null);
    const carRef = useRef(null);
    const valueAddRef = useRef(null);
    const letterRefs = useRef([]);
    const boxRefs = useRef([]);
    const barRefs = useRef([]);
    const gateRefs = useRef([]);

    const progressRef = useRef(null);
    const velocityRef = useRef(null);
    const sectorRef = useRef(null);
    const stateRef = useRef(null);
    const scrollHintRef = useRef(null);
    const topBarFillRef = useRef(null);
    const restartBtnRef = useRef(null);

    const handleRestart = useCallback(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const useIsoEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    useIsoEffect(() => {
      const cleanup = setupMotionController({
        section: sectionRef.current,
        track: trackRef.current,
        road: roadRef.current,
        trail: trailRef.current,
        carWrapper: carWrapperRef.current,
        car: carRef.current,
        hudProgress: progressRef.current,
        hudVelocity: velocityRef.current,
        hudSector: sectorRef.current,
        hudState: stateRef.current,
        scrollHint: scrollHintRef.current,
        topBarFill: topBarFillRef.current,
        letters: letterRefs.current.filter(Boolean),
        gateRefs
      });
      return cleanup;
    }, []);

    return h(
      "div",
      { className: "atelier-shell" },
      h(
        "a",
        { href: "#content-track", className: "skip-link" },
        "Skip to Interactive Mountain Track"
      ),
      h(Navbar, {
        progressRef,
        velocityRef,
        sectorRef,
        stateRef,
        scrollHintRef,
        topBarFillRef
      }),
      h(
        "main",
        { id: "main-content" },
        h(
          "section",
          {
            className: "section",
            id: "scrollSection",
            ref: sectionRef,
            "aria-label": "McLaren 720S interactive mountain canyon scroll track"
          },
          h(
            "div",
            {
              className: "track",
              id: "content-track",
              ref: trackRef,
              role: "region",
              "aria-label": "Interactive telemetry animation track"
            },
            h(
              "div",
              { className: "wind-tunnel-backdrop", "aria-hidden": "true" },
              h("div", { className: "mountain-canyon-photo" }),
              h("div", { className: "ambient-radial-glow" }),
              h("div", { className: "isobar-grid" })
            ),
            h(HeadlineMatrix, {
              chars: HEADLINE_CHARS,
              letterRefs,
              valueAddRef
            }),
            h(WindTunnelRunway, {
              roadRef,
              trailRef,
              carWrapperRef,
              carRef,
              markers: RUNWAY_MARKERS,
              metrics: IMPACT_METRICS,
              gateRefs
            }),
            h(TelemetryBentoGrid, {
              metrics: IMPACT_METRICS,
              boxRefs,
              barRefs
            })
          )
        ),
        h(EditorialFinale, {
          onRestart: handleRestart,
          restartBtnRef
        })
      )
    );
  }

  // ==========================================================================
  // 5. BOOTSTRAP (React 18 createRoot with DOM fallback)
  // ==========================================================================

  function boot() {
    const rootNode = document.getElementById("root");
    if (React && ReactDOM && typeof ReactDOM.createRoot === "function" && rootNode) {
      const root = ReactDOM.createRoot(rootNode);
      root.render(h(App));
    } else {
      setupMotionController({});
      const restartBtn = document.getElementById("restartBtn");
      if (restartBtn) {
        restartBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
