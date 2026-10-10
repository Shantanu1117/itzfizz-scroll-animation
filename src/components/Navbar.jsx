/**
 * Editorial Wind-Tunnel Instrument Bar (Navbar Component)
 * Displays brand identity, live scroll progress gauge, velocity readout, and scroll guidance.
 */

export function Navbar({ progressRef, velocityRef, sectorRef, stateRef, scrollHintRef, topBarFillRef }) {
  return (
    <header className="site-header" role="banner">
      {/* Ultra-thin top laser progress line */}
      <div className="header-progress-rail" aria-hidden="true">
        <div className="header-progress-fill" id="topBarFill" ref={topBarFillRef}></div>
      </div>

      <div className="header-inner">
        <div className="brand">
          <span className="brand-badge">AERO // 720S</span>
          <div className="brand-copy">
            <span className="brand-title">ITZFIZZ VELOCITY ATELIER</span>
            <span className="brand-subtitle">WIND-TUNNEL TELEMETRY RUNWAY</span>
          </div>
        </div>

        {/* Live Instrument Readout Cluster */}
        <div className="telemetry-pill-group" aria-label="Live scroll telemetry">
          <div className="telemetry-pill">
            <span className="pill-label">PROGRESS</span>
            <span className="pill-value" id="hudProgress" ref={progressRef}>0%</span>
          </div>
          <div className="telemetry-pill telemetry-pill--desktop">
            <span className="pill-label">AIRSPEED</span>
            <span className="pill-value" id="hudVelocity" ref={velocityRef}>000 KM/H</span>
          </div>
          <div className="telemetry-pill telemetry-pill--desktop">
            <span className="pill-label">SECTOR</span>
            <span className="pill-value" id="hudSector" ref={sectorRef}>GATE 00</span>
          </div>
          <div className="telemetry-pill">
            <span className="pill-label">STATUS</span>
            <span className="pill-value pill-value--accent" id="hudState" ref={stateRef}>STANDBY</span>
          </div>
        </div>

        <div className="scroll-hint" id="scrollHint" ref={scrollHintRef} aria-hidden="true">
          <span className="scroll-hint-dot"></span>
          <span>SCROLL OR ← → TO DRIVE</span>
          <svg className="scroll-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
