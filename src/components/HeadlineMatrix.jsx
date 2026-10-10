/**
 * Architectural Editorial Headline Matrix (HeadlineMatrix Component)
 * Dual-plane kinetic typography: blueprint wireframe base + scroll-synchronized illuminated reveal.
 */

export function HeadlineMatrix({ chars, valueAddRef, letterRefs }) {
  return (
    <div className="headline-stage">
      <div className="headline-meta-bar" aria-hidden="true">
        <span className="meta-tag">SYS.01 // KINETIC TYPOGRAPHY MATRIX</span>
        <span className="meta-line"></span>
        <span className="meta-coord">SYNC: FRONT AXLE LASER SCANNER</span>
      </div>

      <h1
        className="value-add"
        id="valueText"
        ref={valueAddRef}
        aria-label="WELCOME ITZFIZZ"
      >
        {chars.map((item, idx) => (
          <span
            key={item.id}
            className={item.isSpace ? "letter-cell letter-cell--space" : "letter-cell"}
          >
            {/* Ghosted architectural wireframe blueprint layer */}
            <span className="letter-ghost" aria-hidden="true">
              {item.isSpace ? "\u00A0" : item.char}
            </span>

            {/* Illuminated solid layer synchronized with car position */}
            <span
              className={item.isSpace ? "value-letter space" : "value-letter"}
              data-char={item.char}
              data-index={idx}
              ref={(el) => {
                if (letterRefs && letterRefs.current) {
                  letterRefs.current[idx] = el;
                }
              }}
            >
              {item.isSpace ? "\u00A0" : item.char}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}
