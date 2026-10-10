/**
 * Two-Line Editorial Hero Headline Component (HeadlineMatrix)
 * Matches the reference image:
 * - Upper introductory label: DRIVEN BY INNOVATION + horizontal rule
 * - Line 1: WELCOME (oversized bold geometric white with subtle mountain texture fill)
 * - Line 2: ITZFIZZ (dark translucent fill, bright neon-emerald outline & glow)
 * - Right of Line 2: Vertical divider + "A HIGHER / STANDARD / IN MOTION"
 * - All 15 characters remain individual .value-letter elements for progressive scroll reveal.
 */

export function HeadlineMatrix({ chars, letterRefs, valueAddRef }) {
  const firstWord = chars.slice(0, 7); // W E L C O M E
  const spaceChar = chars[7];          // " "
  const secondWord = chars.slice(8);   // I T Z F I Z Z

  const renderCharCell = (item, idx, lineClass) => (
    <span
      key={item.id}
      className={
        item.isSpace
          ? "letter-cell letter-cell--space"
          : `letter-cell ${lineClass}`
      }
    >
      <span className="letter-ghost" aria-hidden="true">
        {item.isSpace ? "\u00A0" : item.char}
      </span>
      <span
        className={
          item.isSpace
            ? "value-letter space"
            : `value-letter ${lineClass}-letter`
        }
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
  );

  return (
    <div className="headline-stage">
      {/* Introductory Label */}
      <div className="headline-meta-bar" aria-hidden="true">
        <span className="meta-tag">DRIVEN BY INNOVATION</span>
        <span className="meta-line"></span>
      </div>

      {/* Two-Line Oversized Headline Container */}
      <h1
        className="value-add"
        id="valueText"
        ref={valueAddRef}
        aria-label="WELCOME ITZFIZZ"
      >
        <span className="headline-row headline-row--top">
          {firstWord.map((item) => renderCharCell(item, item.index, "letter-cell--welcome"))}
        </span>

        {spaceChar && renderCharCell(spaceChar, spaceChar.index, "letter-cell--space")}

        <span className="headline-row headline-row--bottom">
          <span className="headline-itzfizz-word">
            {secondWord.map((item) => renderCharCell(item, item.index, "letter-cell--itzfizz"))}
          </span>

          <span className="headline-side-caption" aria-hidden="true">
            <span className="side-caption-rule"></span>
            <span className="side-caption-text">
              <span>A HIGHER</span>
              <span>STANDARD</span>
              <span>IN MOTION</span>
            </span>
          </span>
        </span>
      </h1>
    </div>
  );
}
