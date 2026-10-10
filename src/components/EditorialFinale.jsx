/**
 * Restrained Post-Journey Resolution Section (EditorialFinale Component)
 * Concludes the scroll journey with a telemetry summary and instant replay trigger.
 */

export function EditorialFinale({ onRestart, restartBtnRef }) {
  return (
    <section className="summary-section" aria-label="Telemetry Session Summary">
      <div className="summary-card">
        <div className="summary-eyebrow">RUNWAY TELEMETRY COMPLETE // 250.0M APEX</div>
        <h2>Aerodynamic Velocity &amp; Impact Verified</h2>
        <p>
          Full-range horizontal displacement synchronized via unified GSAP ScrollTrigger scrub,
          front-axle optical headline ignition, and four-sector impact telemetry verification.
        </p>

        <div className="summary-specs-grid">
          <div className="spec-cell">
            <span className="spec-key">CHASSIS</span>
            <span className="spec-val">McLaren 720S Coupe</span>
          </div>
          <div className="spec-cell">
            <span className="spec-key">PEAK VELOCITY</span>
            <span className="spec-val">341 KM/H (212 MPH)</span>
          </div>
          <div className="spec-cell">
            <span className="spec-key">MOTION ENGINE</span>
            <span className="spec-val">GSAP 3.12 + ScrollTrigger</span>
          </div>
          <div className="spec-cell">
            <span className="spec-key">CONTROLS</span>
            <span className="spec-val">Wheel / Touch / ← → Keys</span>
          </div>
        </div>

        <button
          type="button"
          className="restart-btn"
          id="restartBtn"
          ref={restartBtnRef}
          onClick={onRestart}
        >
          <span>Return to Start Gate (000M)</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
