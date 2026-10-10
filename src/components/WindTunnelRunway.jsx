/**
 * Wind-Tunnel Carbon Runway & Aerodynamic Slipstream Component
 * Reimagines the travel environment with calibration ticks, sector timing gates,
 * plasma slipstream wake, and multi-layered vehicle lighting.
 */

export function WindTunnelRunway({
  roadRef,
  trailRef,
  carWrapperRef,
  carRef,
  markers,
  metrics,
  gateRefs
}) {
  return (
    <div className="runway-shell">
      {/* Top Calibration Scale */}
      <div className="runway-ruler" aria-hidden="true">
        {markers.map((m, idx) => (
          <div key={idx} className="ruler-tick" style={{ left: m.pos }}>
            <span className="tick-mark"></span>
            <span className="tick-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Main Aerodynamic Runway (#road) */}
      <div
        className="road"
        id="road"
        ref={roadRef}
        role="img"
        aria-label="Aerodynamic wind-tunnel test track with McLaren 720S sports car and kinetic slipstream"
      >
        {/* Wind-tunnel aerodynamic streamlines & carbon surface grid */}
        <div className="road-markings" aria-hidden="true">
          <div className="road-line road-line--top"></div>
          <div className="streamline streamline--upper"></div>
          <div className="road-dashes"></div>
          <div className="streamline streamline--lower"></div>
          <div className="road-line road-line--bottom"></div>
        </div>

        {/* 4 Illuminated Sector Timing Gates along the track */}
        <div className="sector-gates-layer" aria-hidden="true">
          {metrics.map((metric, idx) => (
            <div
              key={metric.id}
              className="sector-gate"
              style={{
                left: `${Math.round(metric.startProgress * 100 + 8)}%`,
                "--gate-color": metric.accent
              }}
              ref={(el) => {
                if (gateRefs && gateRefs.current) {
                  gateRefs.current[idx] = el;
                }
              }}
            >
              <span className="gate-tag">{metric.sector}</span>
              <span className="gate-beam"></span>
              <span className="gate-dist">{metric.gateDistance}</span>
            </div>
          ))}
        </div>

        {/* Kinetic Aerodynamic Slipstream Wake (#trail) */}
        <div className="trail" id="trail" ref={trailRef} aria-hidden="true">
          <div className="trail-vortex trail-vortex--top"></div>
          <div className="trail-vortex trail-vortex--bottom"></div>
          <div className="trail-glow"></div>
          <div className="trail-laser"></div>
        </div>

        {/* McLaren 720S Vehicle Unit (#carWrapper & #car) */}
        <div className="car-wrapper" id="carWrapper" ref={carWrapperRef}>
          <div className="car-underglow" aria-hidden="true"></div>
          <div className="car-shadow" aria-hidden="true"></div>
          <div className="car-exhaust-flare" aria-hidden="true"></div>
          <img
            src="McLaren 720S 2022 top view.png"
            alt="McLaren 720S 2022 sports car in photorealistic top-down studio view"
            className="car"
            id="car"
            width="1342"
            height="689"
            ref={carRef}
            loading="eager"
            decoding="async"
          />
          <div className="car-headlight-beam" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}
