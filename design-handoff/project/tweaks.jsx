// Tweaks panel — palette, tagline, signoff, grain, tilt

const { useState: useStateT, useEffect: useEffectT } = React;

function Tweaks({ visible, state, onChange }) {
  if (!visible) return null;

  const setPalette  = (p) => onChange({ ...state, palette: p });
  const setTagline  = (i) => onChange({ ...state, taglineIdx: i });
  const setSignoff  = (s) => onChange({ ...state, signoff: s });
  const setGrain    = (g) => onChange({ ...state, grain: parseFloat(g) });
  const setTilt     = (t) => onChange({ ...state, tiltAngle: parseFloat(t) });
  const setHeroFont = (f) => onChange({ ...state, heroFont: f });

  const palettes = [
    { key: 'hanok',    swatch: '#C76A3F', label: 'Hanok' },
    { key: 'sunlit',   swatch: '#B65A3A', label: 'Sunlit' },
    { key: 'tancheon', swatch: '#6F8F6E', label: 'Tancheon' },
  ];

  const heroFonts = [
    { key: 'fraunces-italic', label: 'Fraunces it.' },
    { key: 'fraunces-roman',  label: 'Fraunces' },
    { key: 'playfair',        label: 'Playfair' },
    { key: 'dm-serif',        label: 'DM Serif' },
    { key: 'instrument',      label: 'Instrument' },
  ];

  return (
    <div className="tweaks is-visible">
      <div className="tweaks__title">Tweaks</div>

      <div className="tweaks__group">
        <span className="tweaks__label">Palette</span>
        <div className="tweaks__swatches">
          {palettes.map((p) => (
            <button
              key={p.key}
              className={`tweaks__swatch ${state.palette === p.key ? 'is-active' : ''}`}
              style={{ background: p.swatch }}
              onClick={() => setPalette(p.key)}
              aria-label={p.label}
              title={p.label}
            />
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <span className="tweaks__label">Hero tagline</span>
        <div className="tweaks__options">
          {TAGLINES.map((t, i) => (
            <button
              key={i}
              className={`tweaks__chip ${state.taglineIdx === i ? 'is-active' : ''}`}
              onClick={() => setTagline(i)}
              title={t}
            >
              {i === 0 ? 'Mom in Seoul' : i === 1 ? 'Stay with Mom' : i === 2 ? '3 ways' : 'Long form'}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <span className="tweaks__label">Hero font</span>
        <div className="tweaks__options">
          {heroFonts.map((f) => (
            <button
              key={f.key}
              className={`tweaks__chip ${(state.heroFont || 'fraunces-italic') === f.key ? 'is-active' : ''}`}
              onClick={() => setHeroFont(f.key)}
            >{f.label}</button>
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <span className="tweaks__label">Signoff</span>
        <div className="tweaks__options">
          {[
            ['um-mom',  '엄마 / Mom'],
            ['mom',     'Mom'],
            ['eunjung', 'Eunjung'],
          ].map(([k, v]) => (
            <button
              key={k}
              className={`tweaks__chip ${state.signoff === k ? 'is-active' : ''}`}
              onClick={() => setSignoff(k)}
            >{v}</button>
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <span className="tweaks__label">Paper grain · {state.grain.toFixed(2)}</span>
        <input
          type="range"
          min="0"
          max="0.18"
          step="0.01"
          value={state.grain}
          onChange={(e) => setGrain(e.target.value)}
          className="tweaks__slider"
        />
      </div>

      <div className="tweaks__group">
        <span className="tweaks__label">Photo tilt · {state.tiltAngle.toFixed(1)}°</span>
        <input
          type="range"
          min="-4"
          max="0"
          step="0.5"
          value={state.tiltAngle}
          onChange={(e) => setTilt(e.target.value)}
          className="tweaks__slider"
        />
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
