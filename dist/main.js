/**
 * ==============================================================================
 * ITZFIZZ // McLaren 720S Wind-Tunnel Telemetry Atelier (Compiled React + GSAP Bundle)
 * ==============================================================================
 * Modular React Component Architecture:
 * - src/data/telemetryData.js     (HEADLINE_CHARS, IMPACT_METRICS, RUNWAY_MARKERS)
 * - src/components/Navbar.jsx     (Instrument Bar & Live Scroll Telemetry Readouts)
 * - src/components/HeadlineMatrix.jsx (Dual-Plane Wireframe & Laser-Ignited Display Type)
 * - src/components/WindTunnelRunway.jsx (Calibration Scale, Sector Gates, Plasma Wake & McLaren 720S)
 * - src/components/TelemetryBentoGrid.jsx (4-Module Architectural Telemetry Bay)
 * - src/components/EditorialFinale.jsx (Post-Journey Resolution & Replay Trigger)
 * - src/App.jsx                   (Master Orchestrator with gsap.context() Lifecycle Cleanup)
 * ==============================================================================
 */

(function () {
  "use strict";

  const ReactGlobal = typeof React !== "undefined" ? React : null;
  const ReactDOMGlobal = typeof ReactDOM !== "undefined" ? ReactDOM : null;
  const h = ReactGlobal ? ReactGlobal.createElement : null;

  // ============================================================================
  // 1. Data Layer (from src/data/telemetryData.js)
  // ============================================================================
  const HEADLINE_CHARS = [
    { id: "char-0", char: "W", index: 0 },
    { id: "char-1", char: "E", index: 1 },
    { id: "char-2", char: "L", index: 2 },
    { id: "char-3", char: "C", index: 3 },
    { id: "char-4", char: "O", index: 4 },
    { id: "char-5", char: "M", index: 5 },
    { id: "char-6", char: "E", index: 6 },
    { id: "char-7", char: " ", index: 7, isSpace: true },
    { id: "char-8", char: "I", index: 8 },
    { id: "char-9", char: "T", index: 9 },
    { id: "char-10", char: "Z", index: 10 },
    { id: "char-11", char: "F", index: 11 },
    { id: "char-12", char: "I", index: 12 },
    { id: "char-13", char: "Z", index: 13 },
    { id: "char-14", char: "Z", index: 14 }
  ];

  const IMPACT_METRICS = [
    {
      id: "box1",
      sector: "SEC.01",
      gateDistance: "060M",
      code: "PKP-ADOPT // +58",
      value: "58%",
      numericValue: 58,
      label: "Increase in pick up point use",
      detail: "First-wave network density & automated locker routing efficiency",
      accent: "#def54f",
      accentSecondary: "rgba(222, 245, 79, 0.16)",
      startProgress: 0.12,
      endProgress: 0.28
    },
    {
      id: "box2",
      sector: "SEC.02",
      gateDistance: "120M",
      code: "COM-DEFLECT // -23",
      value: "23%",
      numericValue: 23,
      label: "Decreased in customer phone calls",
      detail: "Proactive real-time telemetry notifications reducing manual inquiries",
      accent: "#6ac9ff",
      accentSecondary: "rgba(106, 201, 255, 0.16)",
      startProgress: 0.30,
      endProgress: 0.46
    },
    {
      id: "box3",
      sector: "SEC.03",
      gateDistance: "180M",
      code: "PKP-VELOCITY // +27",
      value: "27%",
      numericValue: 27,
      label: "Increase in pick up point use",
      detail: "Sustained repeat hub utilization across high-throughput urban corridors",
      accent: "#e2e8f0",
      accentSecondary: "rgba(226, 232, 240, 0.14)",
      startProgress: 0.48,
      endProgress: 0.64
    },
    {
      id: "box4",
      sector: "SEC.04",
      gateDistance: "240M",
      code: "COM-RESOLVE // -40",
      value: "40%",
      numericValue: 40,
      label: "Decreased in customer phone calls",
      detail: "End-to-end autonomous handoff verification at destination terminals",
      accent: "#fa7328",
      accentSecondary: "rgba(250, 115, 40, 0.18)",
      startProgress: 0.66,
      endProgress: 0.82
    }
  ];

  const RUNWAY_MARKERS = [
    { pos: "0%", label: "000M // START GATE" },
    { pos: "20%", label: "050M // SEC.01" },
    { pos: "40%", label: "100M // SEC.02" },
    { pos: "60%", label: "150M // SEC.03" },
    { pos: "80%", label: "200M // SEC.04" },
    { pos: "100%", label: "250M // APEX LOCK" }
  ];

  // ============================================================================
  // 2. Reusable React Components (from src/components/*)
  // ============================================================================
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
          { className: "brand" },
          h("span", { className: "brand-badge" }, "AERO // 720S"),
          h(
            "div",
            { className: "brand-copy" },
            h("span", { className: "brand-title" }, "ITZFIZZ VELOCITY ATELIER"),
            h("span", { className: "brand-subtitle" }, "WIND-TUNNEL TELEMETRY RUNWAY")
          )
        ),
        h(
          "div",
          { className: "telemetry-pill-group", "aria-label": "Live scroll telemetry" },
          h(
            "div",
            { className: "telemetry-pill" },
            h("span", { className: "pill-label" }, "PROGRESS"),
            h("span", { className: "pill-value", id: "hudProgress", ref: props.progressRef }, "0%")
          ),
          h(
            "div",
            { className: "telemetry-pill telemetry-pill--desktop" },
            h("span", { className: "pill-label" }, "AIRSPEED"),
            h("span", { className: "pill-value", id: "hudVelocity", ref: props.velocityRef }, "000 KM/H")
          ),
          h(
            "div",
            { className: "telemetry-pill telemetry-pill--desktop" },
            h("span", { className: "pill-label" }, "SECTOR"),
            h("span", { className: "pill-value", id: "hudSector", ref: props.sectorRef }, "GATE 00")
          ),
          h(
            "div",
            { className: "telemetry-pill" },
            h("span", { className: "pill-label" }, "STATUS"),
            h("span", { className: "pill-value pill-value--accent", id: "hudState", ref: props.stateRef }, "STANDBY")
          )
        ),
        h(
          "div",
          { className: "scroll-hint", id: "scrollHint", ref: props.scrollHintRef, "aria-hidden": "true" },
          h("span", { className: "scroll-hint-dot" }),
          h("span", null, "SCROLL OR ← → TO DRIVE"),
          h(
            "svg",
            { className: "scroll-arrow", viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "2.5" },
            h("path", { d: "M12 5v14M5 12l7 7 7-7" })
          )
        )
      )
    );
  }

  function HeadlineMatrix(props) {
    return h(
      "div",
      { className: "headline-stage" },
      h(
        "div",
        { className: "headline-meta-bar", "aria-hidden": "true" },
        h("span", { className: "meta-tag" }, "SYS.01 // KINETIC TYPOGRAPHY MATRIX"),
        h("span", { className: "meta-line" }),
        h("span", { className: "meta-coord" }, "SYNC: FRONT AXLE LASER SCANNER")
      ),
      h(
        "h1",
        { className: "value-add", id: "valueText", ref: props.valueAddRef, "aria-label": "WELCOME ITZFIZZ" },
        props.chars.map((item, idx) =>
          h(
            "span",
            { key: item.id, className: item.isSpace ? "letter-cell letter-cell--space" : "letter-cell" },
            h("span", { className: "letter-ghost", "aria-hidden": "true" }, item.isSpace ? "\u00A0" : item.char),
            h(
              "span",
              {
                className: item.isSpace ? "value-letter space" : "value-letter",
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
          "aria-label": "Aerodynamic wind-tunnel test track with McLaren 720S sports car and kinetic slipstream"
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
                className: "sector-gate",
                style: {
                  left: `${Math.round(metric.startProgress * 100 + 8)}%`,
                  "--gate-color": metric.accent
                },
                ref: (el) => {
                  if (props.gateRefs && props.gateRefs.current) {
                    props.gateRefs.current[idx] = el;
                  }
                }
              },
              h("span", { className: "gate-tag" }, metric.sector),
              h("span", { className: "gate-beam" }),
              h("span", { className: "gate-dist" }, metric.gateDistance)
            )
          )
        ),
        h(
          "div",
          { className: "trail", id: "trail", ref: props.trailRef, "aria-hidden": "true" },
          h("div", { className: "trail-vortex trail-vortex--top" }),
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
          { className: "card-telemetry-head" },
          h("span", { className: "card-sector-badge" }, h("span", { className: "sector-dot" }), `${m.sector} // ${m.gateDistance}`),
          h("span", { className: "card-code" }, m.code)
        ),
        h(
          "div",
          { className: "card-stat-row" },
          h("span", { className: "num-box" }, m.value),
          h("span", { className: "stat-unit-tag" }, "BENCHMARK IMPACT")
        ),
        h("p", { className: "box-desc" }, m.label),
        h("p", { className: "box-subdetail" }, m.detail),
        h(
          "div",
          { className: "card-progress-track", "aria-hidden": "true" },
          h("div", {
            className: "card-progress-fill",
            style: { width: `${m.numericValue}%` }
          })
        )
      );

    return h(
      "div",
      { className: "telemetry-bento-bay", role: "region", "aria-label": "Impact Telemetry Metrics" },
      h("div", { className: "cards-lane cards-lane--top" }, upperGroup.map((m, i) => renderCard(m, i))),
      h("div", { className: "cards-lane cards-lane--bottom" }, lowerGroup.map((m, i) => renderCard(m, i + 2)))
    );
  }

  function EditorialFinale(props) {
    return h(
      "section",
      { className: "summary-section", "aria-label": "Telemetry Session Summary" },
      h(
        "div",
        { className: "summary-card" },
        h("div", { className: "summary-eyebrow" }, "RUNWAY TELEMETRY COMPLETE // 250.0M APEX"),
        h("h2", null, "Aerodynamic Velocity & Impact Verified"),
        h(
          "p",
          null,
          "Full-range horizontal displacement synchronized via unified GSAP ScrollTrigger scrub, front-axle optical headline ignition, and four-sector impact telemetry verification."
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
          { type: "button", className: "restart-btn", id: "restartBtn", ref: props.restartBtnRef, onClick: props.onRestart },
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

  // ============================================================================
  // 3. GSAP + ScrollTrigger Motion Orchestrator (with gsap.context cleanup)
  // ============================================================================
  function setupWindTunnelMotion(refs = {}, scopeEl = null) {
    const gsap = window.gsap || globalThis.gsap;
    const ScrollTrigger = window.ScrollTrigger || globalThis.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      console.warn("[MotionEngine] GSAP or ScrollTrigger not detected.");
      return () => {};
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = (refs.sectionRef && refs.sectionRef.current) || document.getElementById("scrollSection");
    const track = (refs.trackRef && refs.trackRef.current) || document.getElementById("content-track");
    const road = (refs.roadRef && refs.roadRef.current) || document.getElementById("road");
    const carWrapper = (refs.carWrapperRef && refs.carWrapperRef.current) || document.getElementById("carWrapper");
    const car = (refs.carRef && refs.carRef.current) || document.getElementById("car");
    const trail = (refs.trailRef && refs.trailRef.current) || document.getElementById("trail");
    const hudProgress = (refs.progressRef && refs.progressRef.current) || document.getElementById("hudProgress");
    const hudVelocity = (refs.velocityRef && refs.velocityRef.current) || document.getElementById("hudVelocity");
    const hudSector = (refs.sectorRef && refs.sectorRef.current) || document.getElementById("hudSector");
    const hudState = (refs.stateRef && refs.stateRef.current) || document.getElementById("hudState");
    const scrollHint = (refs.scrollHintRef && refs.scrollHintRef.current) || document.getElementById("scrollHint");
    const topBarFill = (refs.topBarFillRef && refs.topBarFillRef.current) || document.getElementById("topBarFill");
    const restartBtn = (refs.restartBtnRef && refs.restartBtnRef.current) || document.getElementById("restartBtn");

    const refLetters = refs.letterRefs && refs.letterRefs.current ? refs.letterRefs.current.filter(Boolean) : [];
    const letters = refLetters.length ? refLetters : Array.from(document.querySelectorAll(".value-letter"));

    const gateEls =
      refs.gateRefs && refs.gateRefs.current && refs.gateRefs.current.filter(Boolean).length
        ? refs.gateRefs.current.filter(Boolean)
        : Array.from(document.querySelectorAll(".sector-gate"));

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let masterTimeline = null;
    let letterMetrics = [];
    let roadRect = { left: 0, width: 0 };
    let carWidth = 360;
    let endX = 960;

    function cacheGeometry() {
      if (!road || !carWrapper) return;
      roadRect = road.getBoundingClientRect();
      const renderedCarRect = car ? car.getBoundingClientRect() : { width: 0 };
      const fallbackHeight = car ? car.clientHeight || 158 : 158;
      carWidth = renderedCarRect.width || fallbackHeight * (1342 / 689) || fallbackHeight * (3981 / 1901) || 308;

      const roadWidth = road.clientWidth || window.innerWidth;
      const rightMargin = Math.min(36, Math.max(12, roadWidth * 0.025));
      endX = Math.max(80, roadWidth - carWidth - rightMargin);

      letterMetrics = letters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        const relativeLeft = rect.left - roadRect.left;
        const relativeCenter = relativeLeft + rect.width * 0.5;
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
          if (progress >= IMPACT_METRICS[g].startProgress) {
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
                else if (progress < 0.96) hudSector.textContent = "SEC.04 // 240M";
                else hudSector.textContent = "APEX // 250M";
              }
              if (hudState) {
                if (progress === 0) {
                  hudState.textContent = "STANDBY";
                } else if (progress < 0.98) {
                  hudState.textContent = self.direction === 1 ? "ACCELERATING" : "REVERSING";
                } else {
                  hudState.textContent = "COMPLETED";
                }
              }

              if (scrollHint && scrollHint.style) {
                scrollHint.style.opacity = progress > 0.04 ? "0" : "1";
              }
            }
          }
        });

        masterTimeline.to(
          carWrapper,
          {
            x: endX,
            ease: "none",
            duration: 1.0
          },
          0
        );

        masterTimeline.fromTo(
          "#box1",
          { opacity: 0, y: 25, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.16 },
          0.12
        );

        masterTimeline.fromTo(
          "#box2",
          { opacity: 0, y: -25, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.16 },
          0.30
        );

        masterTimeline.fromTo(
          "#box3",
          { opacity: 0, y: 25, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.16 },
          0.48
        );

        masterTimeline.fromTo(
          "#box4",
          { opacity: 0, y: -25, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.16 },
          0.66
        );

        syncCarMotion(0, 0);
        ScrollTrigger.refresh();
      }

      if (restartBtn && !refs.restartBtnRef) {
        restartBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      let resizeTimeout;
      function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          cacheGeometry();
          if (!prefersReducedMotion && masterTimeline) {
            initMotionTimeline();
          }
        }, 120);
      }

      window.addEventListener("resize", handleResize, { passive: true });
      window.addEventListener("orientationchange", handleResize, { passive: true });
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleResize, { passive: true });
      }

      window.addEventListener("keydown", (e) => {
        if (prefersReducedMotion) return;
        const step = Math.round(window.innerHeight * 0.12);
        if (e.key === "ArrowRight") {
          e.preventDefault();
          window.scrollBy({ top: step, behavior: "smooth" });
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          window.scrollBy({ top: -step, behavior: "smooth" });
        }
      });

      if (car && car.complete) {
        initMotionTimeline();
      } else if (car && car.addEventListener) {
        car.addEventListener("load", initMotionTimeline, { once: true });
        window.addEventListener("DOMContentLoaded", initMotionTimeline, { once: true });
      } else {
        initMotionTimeline();
      }

      window.__CarScrollAnimation = {
        init: initMotionTimeline,
        cacheGeometry,
        syncCarMotion,
        getMetrics: () => ({ carWidth, endX, letterMetricsCount: letterMetrics.length })
      };
    }, scopeEl);

    return () => {
      if (ctx && ctx.revert) ctx.revert();
    };
  }

  // ============================================================================
  // 4. Master App Component & Bootstrap
  // ============================================================================
  function App() {
    const { useRef, useLayoutEffect, useCallback } = ReactGlobal;
    const appRef = useRef(null);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const roadRef = useRef(null);
    const carWrapperRef = useRef(null);
    const carRef = useRef(null);
    const trailRef = useRef(null);
    const valueAddRef = useRef(null);
    const letterRefs = useRef([]);
    const gateRefs = useRef([]);
    const boxRefs = useRef([]);
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

    useLayoutEffect(() => {
      return setupWindTunnelMotion(
        {
          sectionRef,
          trackRef,
          roadRef,
          carWrapperRef,
          carRef,
          trailRef,
          valueAddRef,
          letterRefs,
          gateRefs,
          boxRefs,
          progressRef,
          velocityRef,
          sectorRef,
          stateRef,
          scrollHintRef,
          topBarFillRef,
          restartBtnRef
        },
        appRef.current
      );
    }, []);

    return h(
      "div",
      { className: "atelier-shell", ref: appRef },
      h("a", { href: "#content-track", className: "skip-link" }, "Skip to Interactive Wind-Tunnel Track"),
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
            "aria-label": "McLaren 720S interactive wind-tunnel scroll track"
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
              h("div", { className: "ambient-radial-glow" }),
              h("div", { className: "isobar-grid" })
            ),
            h(HeadlineMatrix, {
              chars: HEADLINE_CHARS,
              valueAddRef,
              letterRefs
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
              boxRefs
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

  // Mount React 18 Component Tree or attach directly in headless environments
  const rootEl = typeof document !== "undefined" ? document.getElementById("root") : null;
  if (rootEl && ReactGlobal && ReactDOMGlobal && typeof document.createElement === "function") {
    const root = ReactDOMGlobal.createRoot(rootEl);
    root.render(h(App));
  } else {
    setupWindTunnelMotion({}, null);
  }
})();
