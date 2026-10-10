/**
 * Architectural Telemetry Bento Bay (TelemetryBentoGrid Component)
 * Houses the 4 core impact statistics (#box1, #box2, #box3, #box4) in a zero-collision
 * instrument grid with sector indicators, live progress bars, and high-contrast typography.
 */

export function TelemetryBentoGrid({ metrics, boxRefs, barRefs }) {
  const upperGroup = metrics.slice(0, 2);
  const lowerGroup = metrics.slice(2, 4);

  const renderCard = (m, idx) => (
    <article
      key={m.id}
      className="text-box"
      id={m.id}
      style={{
        "--card-accent": m.accent,
        "--card-glow": m.accentSecondary
      }}
      aria-label={`Metric ${m.sector}: ${m.value} ${m.label}`}
      ref={(el) => {
        if (boxRefs && boxRefs.current) {
          boxRefs.current[idx] = el;
        }
      }}
    >
      {/* Top Instrument Header */}
      <div className="card-telemetry-head">
        <span className="card-sector-badge">
          <span className="sector-dot"></span>
          {m.sector} // {m.gateDistance}
        </span>
        <span className="card-code">{m.code}</span>
      </div>

      {/* Primary Impact Statistic */}
      <div className="card-stat-row">
        <span className="num-box">{m.value}</span>
        <span className="stat-unit-tag">BENCHMARK IMPACT</span>
      </div>

      {/* Assignment Impact Description */}
      <p className="box-desc">{m.label}</p>
      <p className="box-subdetail">{m.detail}</p>

      {/* Scroll-Synchronized Telemetry Bar */}
      <div className="card-progress-track" aria-hidden="true">
        <div
          className="card-progress-fill"
          style={{ width: `${m.numericValue}%` }}
          ref={(el) => {
            if (barRefs && barRefs.current) {
              barRefs.current[idx] = el;
            }
          }}
        ></div>
      </div>
    </article>
  );

  return (
    <div className="telemetry-bento-bay" role="region" aria-label="Impact Telemetry Metrics">
      <div className="cards-lane cards-lane--top">
        {upperGroup.map((m, i) => renderCard(m, i))}
      </div>
      <div className="cards-lane cards-lane--bottom">
        {lowerGroup.map((m, i) => renderCard(m, i + 2))}
      </div>
    </div>
  );
}
