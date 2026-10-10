/**
 * Four Lower Metric Panels & Corner Branding Component (TelemetryBentoGrid)
 * Matches the reference image:
 * - 4 transparent dark panels across the lower foreground separated by thin vertical hairlines
 * - Custom icons (network nodes, phone waves, bar chart, lightning bolt) alongside large percentages (58%, 23%, 27%, 40%)
 * - Progress lines with 01, 02, 03, 04 index labels
 * - Lower-left "SCROLL TO EXPLORE" indicator and lower-right "PERFORMANCE BEYOND ROUTES" mountain emblem
 */

function MetricIcon({ type }) {
  if (type === "network") {
    return (
      <svg className="metric-icon metric-icon--green" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="16" cy="7" r="3.2" />
        <circle cx="8" cy="23" r="3.2" />
        <circle cx="24" cy="23" r="3.2" />
        <circle cx="16" cy="17" r="2.2" />
        <path d="M16 10.2v4.6M13.8 18.4l-3.4 2.8M18.2 18.4l3.4 2.8M11.2 23h9.6" />
      </svg>
    );
  }
  if (type === "phone") {
    return (
      <svg className="metric-icon" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9.5 6.5h4l2 5-2.5 2a14 14 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2C14.6 24.5 7.5 17.4 7.5 8.5a2 2 0 0 1 2-2z" />
        <path d="M19 8a5 5 0 0 1 5 5M19 4a9 9 0 0 1 9 9" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "bars") {
    return (
      <svg className="metric-icon" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="21" width="4" height="5" rx="0.8" />
        <rect x="13" y="15" width="4" height="11" rx="0.8" />
        <rect x="20" y="8" width="4" height="18" rx="0.8" />
        <path d="M4 26h24" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="metric-icon" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.5 4L8 17h7.5l-1 11L24 15h-7.5l1-11z" strokeLinejoin="round" />
    </svg>
  );
}

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
        "--card-num-color": m.numColor,
        "--card-bar-color": m.barColor,
        "--card-glow": m.accentSecondary
      }}
      aria-label={`Metric ${m.sector}: ${m.value} ${m.label}`}
      ref={(el) => {
        if (boxRefs && boxRefs.current) {
          boxRefs.current[idx] = el;
        }
      }}
    >
      {/* Hidden/Subtle Telemetry Header for Screen Readers & Structural Consistency */}
      <div className="card-telemetry-head" aria-hidden="true">
        <span className="card-sector-badge">
          <span className="sector-dot"></span>
          {m.sector} // {m.gateDistance}
        </span>
        <span className="card-code">{m.code}</span>
      </div>

      {/* Top Row: Icon + Large Percentage */}
      <div className="card-stat-row">
        <span className="card-icon-wrap" aria-hidden="true">
          <MetricIcon type={m.icon} />
        </span>
        <span className="num-box">{m.value}</span>
        <span className="stat-unit-tag">BENCHMARK IMPACT</span>
      </div>

      {/* Text Content aligned with Percentage */}
      <div className="card-body-copy">
        <p className="box-desc">{m.label}</p>
        <p className="box-subdetail">{m.detail}</p>
      </div>

      {/* Bottom Progress Bar + Index Number (01 - 04) */}
      <div className="card-footer-progress" aria-hidden="true">
        <div className="card-progress-track">
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
        <span className="card-index-num">{m.indexLabel || `0${idx + 1}`}</span>
      </div>
    </article>
  );

  return (
    <div className="lower-telemetry-zone">
      <div className="telemetry-bento-bay" role="region" aria-label="Impact Telemetry Metrics">
        <div className="cards-lane cards-lane--top">
          {upperGroup.map((m, i) => renderCard(m, i))}
        </div>
        <div className="cards-lane cards-lane--bottom">
          {lowerGroup.map((m, i) => renderCard(m, i + 2))}
        </div>
      </div>

      {/* Bottom-Left Scroll Indicator & Bottom-Right Mountain Performance Branding */}
      <div className="stage-bottom-bar" aria-hidden="true">
        <div className="scroll-explore-indicator">
          <span className="explore-circle">
            <span className="explore-dot"></span>
          </span>
          <span className="explore-line"></span>
          <span className="explore-text">SCROLL TO EXPLORE</span>
        </div>

        <div className="performance-routes-brand">
          <svg className="mountain-emblem" viewBox="0 0 80 32" width="68" height="26" fill="none">
            <path d="M4 28L26 8l12 11 14-14 24 23" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 8l-5 9 7-2 4 4M52 5l-6 10 8-3 5 5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="routes-brand-text">
            <span>PERFORMANCE</span>
            <span>BEYOND ROUTES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
