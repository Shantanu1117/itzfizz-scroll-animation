/**
 * Pixel-Accurate Automotive Navigation Bar (Navbar Component)
 * Matches the reference image:
 * - Left: Orange double-slash (//) emblem + bold ITZFIZZ wordmark
 * - Center: • VELOCITY LAB / AERO DYNAMICS | TELEMETRY | PERFORMANCE | ABOUT
 * - Right: Chamfered dark badge with orange target pin + TEST TRACK 01 / MCLAREN 720S
 */

export function Navbar({
  progressRef,
  velocityRef,
  sectorRef,
  stateRef,
  scrollHintRef,
  topBarFillRef
}) {
  return (
    <header className="site-header" role="banner">
      {/* Top 2px Optical Scroll Progress Rail */}
      <div className="header-progress-rail" aria-hidden="true">
        <div className="header-progress-fill" id="topBarFill" ref={topBarFillRef}></div>
      </div>

      <div className="header-inner">
        <div className="header-left-cluster">
          <div className="brand">
            <span className="brand-slashes" aria-hidden="true">
              <span className="slash-bar"></span>
              <span className="slash-bar"></span>
            </span>
            <span className="brand-title">ITZFIZZ</span>
          </div>

          <nav className="header-nav" aria-label="Primary sections">
            <span className="nav-sep" aria-hidden="true">/</span>
            <a href="#content-track" className="nav-item nav-item--active">
              <span className="nav-active-dot" aria-hidden="true"></span>
              <span>VELOCITY LAB</span>
            </a>
            <span className="nav-sep" aria-hidden="true">/</span>
            <a href="#road" className="nav-item">AERO DYNAMICS</a>
            <span className="nav-sep" aria-hidden="true">|</span>
            <a href="#box1" className="nav-item">TELEMETRY</a>
            <span className="nav-sep" aria-hidden="true">|</span>
            <a href="#box4" className="nav-item">PERFORMANCE</a>
            <span className="nav-sep" aria-hidden="true">|</span>
            <a href="#summarySection" className="nav-item">ABOUT</a>
          </nav>
        </div>

        {/* Live Telemetry Readout (accessible & synced with scroll) */}
        <div className="telemetry-pill-group" aria-label="Live scroll telemetry">
          <div className="telemetry-pill">
            <span className="pill-label">PROG</span>
            <span className="pill-value" id="hudProgress" ref={progressRef}>0%</span>
          </div>
          <div className="telemetry-pill telemetry-pill--desktop">
            <span className="pill-label">VEL</span>
            <span className="pill-value" id="hudVelocity" ref={velocityRef}>000 KM/H</span>
          </div>
          <div className="telemetry-pill telemetry-pill--desktop">
            <span className="pill-label">SEC</span>
            <span className="pill-value" id="hudSector" ref={sectorRef}>GATE 00</span>
          </div>
          <div className="telemetry-pill telemetry-pill--sr">
            <span className="pill-label">STATUS</span>
            <span className="pill-value pill-value--accent" id="hudState" ref={stateRef}>STANDBY</span>
          </div>
        </div>

        {/* Right-aligned Test-Track & Vehicle Identification Badge */}
        <div className="track-id-badge">
          <div className="track-id-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" strokeOpacity="0.45" />
              <path d="M12 7c-2.2 0-4 1.8-4 4 0 3 4 6.5 4 6.5s4-3.5 4-6.5c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div className="track-id-copy">
            <span className="track-id-title">TEST TRACK 01</span>
            <span className="track-id-sub">MCLAREN 720S</span>
          </div>
        </div>

        <div className="scroll-hint scroll-hint--sr" id="scrollHint" ref={scrollHintRef} aria-hidden="true">
          <span className="scroll-hint-dot"></span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </header>
  );
}
