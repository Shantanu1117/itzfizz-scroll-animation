/**
 * Mountain Canyon Test Track & Illuminated Slipstream Component (WindTunnelRunway)
 * Matches the reference image:
 * - Horizontal wet-asphalt mountain track with green & amber illumination
 * - SEC.01 (0 - 60M), SEC.02 (60M - 120M), SEC.03 (120M - 180M), SEC.04 (180M - 240M) markers with glowing centerline nodes
 * - Green laser light trails & directional chevrons behind the car
 * - Photorealistic top-down orange McLaren 720S with contact shadow, rear green-amber glow, and warm twin headlights
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
      {/* Subtle Calibration Ruler */}
      <div className="runway-ruler" aria-hidden="true">
        {markers.map((m, idx) => (
          <div key={idx} className="ruler-tick" style={{ left: m.pos }}>
            <span className="tick-mark"></span>
            <span className="tick-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Main Illuminated Mountain Track (#road) */}
      <div
        className="road"
        id="road"
        ref={roadRef}
        role="img"
        aria-label="Mountain canyon test track with photorealistic orange McLaren 720S and green-amber slipstream illumination"
      >
        {/* Subtle Asphalt Lane Lines & Center Measurement Axis */}
        <div className="road-markings" aria-hidden="true">
          <div className="road-line road-line--top"></div>
          <div className="streamline streamline--upper"></div>
          <div className="road-dashes"></div>
          <div className="streamline streamline--lower"></div>
          <div className="road-line road-line--bottom"></div>
        </div>

        {/* Four Track Sections: SEC.01 through SEC.04 */}
        <div className="sector-gates-layer" aria-hidden="true">
          {metrics.map((metric, idx) => (
            <div
              key={metric.id}
              className={`sector-gate ${idx === 0 ? "sector-gate--active" : ""}`}
              style={{
                left: metric.gatePos || `${Math.round(metric.startProgress * 100 + 8)}%`,
                "--gate-color": metric.accent
              }}
              ref={(el) => {
                if (gateRefs && gateRefs.current) {
                  gateRefs.current[idx] = el;
                }
              }}
            >
              <div className="gate-header">
                <span className="gate-tag">{metric.sector}</span>
                <span className="gate-dist">{metric.gateDistance}</span>
              </div>
              <span className="gate-beam">
                <span className="gate-node"></span>
              </span>
            </div>
          ))}
        </div>

        {/* Green & Amber Illuminated Trail (#trail) */}
        <div className="trail" id="trail" ref={trailRef} aria-hidden="true">
          <div className="trail-vortex trail-vortex--top"></div>
          <div className="trail-vortex trail-vortex--upper-mid"></div>
          <div className="trail-core-beam"></div>
          <div className="trail-chevrons">
            <span>›</span>
            <span>›</span>
            <span>›</span>
            <span>›</span>
          </div>
          <div className="trail-vortex trail-vortex--bottom"></div>
          <div className="trail-glow"></div>
          <div className="trail-laser"></div>
        </div>

        {/* Photorealistic Orange McLaren 720S (#carWrapper & #car) */}
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
