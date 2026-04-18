// Shared layout wrapper for detail pages.
// Reuses Nav, Drawer, DirectionToggle, Tweaks, Footer + state persistence.

const { useState: useStateL, useEffect: useEffectL } = React;

const LAYOUT_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "a",
  "palette": "hanok",
  "signoff": "eunjung",
  "grain": 0.09,
  "tiltAngle": -1.5,
  "heroFont": "fraunces-italic"
}/*EDITMODE-END*/;

function loadDetailState() {
  try {
    const s = JSON.parse(localStorage.getItem('eunjung-table-state') || 'null');
    return s && typeof s === 'object' ? { ...LAYOUT_DEFAULTS, ...s } : { ...LAYOUT_DEFAULTS };
  } catch { return { ...LAYOUT_DEFAULTS }; }
}

function DetailLayout({ children, activeLink }) {
  const [state, setState] = useStateL(loadDetailState);
  const [drawerOpen, setDrawerOpen] = useStateL(false);
  const [tweaksVisible, setTweaksVisible] = useStateL(false);
  const scrolled = useScrolled();

  useEffectL(() => {
    document.documentElement.setAttribute('data-palette', state.palette);
    document.documentElement.setAttribute('data-direction', state.direction);
    document.documentElement.setAttribute('data-hero-font', state.heroFont || 'fraunces-italic');
    document.documentElement.style.setProperty('--grain-opacity', state.grain);
    document.documentElement.style.setProperty('--tilt-angle', state.tiltAngle + 'deg');
    localStorage.setItem('eunjung-table-state', JSON.stringify(state));
  }, [state]);

  useEffectL(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useRevealObserver([state.direction]);

  const updateState = (next) => {
    setState(next);
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: {
        palette: next.palette, signoff: next.signoff, grain: next.grain,
        tiltAngle: next.tiltAngle, direction: next.direction, heroFont: next.heroFont,
      },
    }, '*');
  };

  return (
    <>
      <Nav onOpen={() => setDrawerOpen(true)} scrolled={scrolled} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <DirectionToggle
        direction={state.direction}
        onChange={(d) => updateState({ ...state, direction: d })}
      />

      {/* Breadcrumb back-link */}
      <div className="breadcrumb">
        <a className="breadcrumb__link" href="Eunjung's Table.html">
          <span aria-hidden>←</span> Home
        </a>
      </div>

      {typeof children === 'function' ? children(state) : children}

      <Footer />

      <Tweaks
        visible={tweaksVisible}
        state={{ ...state, taglineIdx: 0 }}
        onChange={(n) => updateState(n)}
      />
    </>
  );
}

window.DetailLayout = DetailLayout;
