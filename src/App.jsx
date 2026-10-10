/**
 * Master Application Component (src/App.jsx)
 * Orchestrates the Wind-Tunnel Telemetry Atelier experience using React + GSAP + ScrollTrigger.
 */

import { HEADLINE_CHARS, IMPACT_METRICS, RUNWAY_MARKERS } from "./data/telemetryData.js";
import { Navbar } from "./components/Navbar.jsx";
import { HeadlineMatrix } from "./components/HeadlineMatrix.jsx";
import { WindTunnelRunway } from "./components/WindTunnelRunway.jsx";
import { TelemetryBentoGrid } from "./components/TelemetryBentoGrid.jsx";
import { EditorialFinale } from "./components/EditorialFinale.jsx";

const { useRef, useLayoutEffect, useCallback } =
  typeof React !== "undefined"
    ? React
    : { useRef: () => ({ current: null }), useLayoutEffect: () => {}, useCallback: (fn) => fn };

export function setupWindTunnelMotion(refs = {}, scopeEl = null) {
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
    const trailContactX = carX > 0.5 ? carX + carWidth * 0.22 : 0;
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
    gsap.set(["#box1", "#box2", "#box3", "#box4"], {
      opacity: 1,
      y: 0,
      scale: 1
    });
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
      letters.forEach((l) => {
        l.style.opacity = "0";
        if (l.classList) l.classList.remove("is-revealed");
      });

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

            const pct = Math.round(progress * 100);
            if (hudProgress) {
              hudProgress.textContent = `${pct}%`;
            }
            if (hudVelocity) {
              const kmh = Math.round(progress * 341);
              hudVelocity.textContent = `${String(kmh).padStart(3, "0")} KM/H`;
            }
            if (hudSector) {
              if (progress < 0.12) hudSector.textContent = "GATE 00";
              else if (progress < 0.31) hudSector.textContent = "SEC.01 // 60M";
              else if (progress < 0.50) hudSector.textContent = "SEC.02 // 120M";
              else if (progress < 0.69) hudSector.textContent = "SEC.03 // 180M";
              else if (progress < 0.96) hudSector.textContent = "SEC.04 // 240M";
              else hudSector.textContent = "APEX // 250M";
            }
            if (hudState) {
              if (progress <= 0.005) {
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

    if (car && car.complete) {
      initMotionTimeline();
    } else if (car && car.addEventListener) {
      car.addEventListener("load", initMotionTimeline, { once: true });
      initMotionTimeline();
    } else {
      initMotionTimeline();
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

    window.__CarScrollAnimation = {
      init: initMotionTimeline,
      cacheGeometry,
      syncCarMotion,
      getMetrics: () => ({
        carWidth,
        endX,
        letterMetricsCount: letterMetrics.length
      })
    };
  }, scopeEl);

  return () => {
    ctx.revert();
  };
}

export function App() {
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
  const barRefs = useRef([]);

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
        barRefs,
        progressRef,
        velocityRef,
        sectorRef,
        stateRef,
        scrollHintRef,
        topBarFillRef
      },
      appRef.current
    );
  }, []);

  return (
    <div className="atelier-shell" ref={appRef}>
      <a href="#content-track" className="skip-link">
        Skip to Interactive Wind-Tunnel Track
      </a>

      <Navbar
        progressRef={progressRef}
        velocityRef={velocityRef}
        sectorRef={sectorRef}
        stateRef={stateRef}
        scrollHintRef={scrollHintRef}
        topBarFillRef={topBarFillRef}
      />

      <main id="main-content">
        <section
          className="section"
          id="scrollSection"
          ref={sectionRef}
          aria-label="McLaren 720S interactive wind-tunnel scroll track"
        >
          <div
            className="track"
            id="content-track"
            ref={trackRef}
            role="region"
            aria-label="Interactive telemetry animation track"
          >
            <div className="wind-tunnel-backdrop" aria-hidden="true">
              <div className="ambient-radial-glow"></div>
              <div className="isobar-grid"></div>
            </div>

            <HeadlineMatrix
              chars={HEADLINE_CHARS}
              valueAddRef={valueAddRef}
              letterRefs={letterRefs}
            />

            <WindTunnelRunway
              roadRef={roadRef}
              trailRef={trailRef}
              carWrapperRef={carWrapperRef}
              carRef={carRef}
              markers={RUNWAY_MARKERS}
              metrics={IMPACT_METRICS}
              gateRefs={gateRefs}
            />

            <TelemetryBentoGrid
              metrics={IMPACT_METRICS}
              boxRefs={boxRefs}
              barRefs={barRefs}
            />
          </div>
        </section>

        <EditorialFinale onRestart={handleRestart} restartBtnRef={restartBtnRef} />
      </main>
    </div>
  );
}

App.initDirectDom = () => setupWindTunnelMotion({}, null);
