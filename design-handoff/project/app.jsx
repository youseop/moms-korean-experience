// Eunjung's Table — App root

const { useState, useEffect, useRef } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "a",
  "palette": "hanok",
  "taglineIdx": 0,
  "signoff": "eunjung",
  "grain": 0.09,
  "tiltAngle": -1.5,
  "heroFont": "fraunces-italic"
}/*EDITMODE-END*/;

// Load persisted local state
function loadLocal() {
  try {
    const s = JSON.parse(localStorage.getItem('eunjung-table-state') || 'null');
    return s && typeof s === 'object' ? { ...DEFAULTS, ...s } : { ...DEFAULTS };
  } catch { return { ...DEFAULTS }; }
}

function App() {
  const [state, setState] = useState(loadLocal);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const scrolled = useScrolled();

  // Apply palette + direction + CSS vars at the document root so the entire page updates
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', state.palette);
    document.documentElement.setAttribute('data-direction', state.direction);
    document.documentElement.setAttribute('data-hero-font', state.heroFont || 'fraunces-italic');
    document.documentElement.style.setProperty('--grain-opacity', state.grain);
    document.documentElement.style.setProperty('--tilt-angle', state.tiltAngle + 'deg');
    localStorage.setItem('eunjung-table-state', JSON.stringify(state));
  }, [state]);

  // Edit mode (Tweaks toggle from host)
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Reveal-on-scroll. Re-init when direction changes (different DOM).
  useRevealObserver([state.direction]);

  const updateState = (next) => {
    setState(next);
    // Persist to disk too (host-driven, so it survives reload)
    const patch = {
      palette:    next.palette,
      taglineIdx: next.taglineIdx,
      signoff:    next.signoff,
      grain:      next.grain,
      tiltAngle:  next.tiltAngle,
      direction:  next.direction,
      heroFont:   next.heroFont,
    };
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  return (
    <div id="top">
      <Nav onOpen={() => setDrawerOpen(true)} scrolled={scrolled} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <DirectionToggle
        direction={state.direction}
        onChange={(d) => updateState({ ...state, direction: d })}
      />

      <Hero tagline={TAGLINES[state.taglineIdx]} />
      <MeetMom signoff={state.signoff} />
      <Experiences />
      <Gallery onOpen={setLightbox} />
      <Reviews />
      <WhyJeongja />
      <Maru />
      <Inquire signoff={state.signoff} />
      <Footer />

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      <Tweaks visible={tweaksVisible} state={state} onChange={updateState} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
