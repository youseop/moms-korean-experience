// Shared components for Eunjung's Table

const { useState, useEffect, useRef, useCallback } = React;

/* ─── Unsplash photo wrapper (warm-graded via CSS filter) ──── */
function Photo({ src, alt, aspect = '4x5', tilt = false, tiltDir = 'left', className = '', rot, onClick }) {
  const tiltCls = tilt ? (tiltDir === 'right' ? 'photo-tilt--right' : 'photo-tilt') : '';
  const style = rot !== undefined ? { '--rot': rot } : undefined;
  return (
    <div
      className={`photo aspect-${aspect} ${tiltCls} ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

/* ─── Section wrapper with oversized number ─────────────────── */
function Section({ number, eyebrow, children, className = '', id }) {
  return (
    <section id={id} className={`section ${className}`}>
      {number && <span className="section-number" aria-hidden>{number}</span>}
      {eyebrow && (
        <p className="eyebrow reveal" style={{ marginBottom: '1.25rem' }}>
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

/* ─── Signature (Caveat, Mom's voice) ─────────────────────────── */
function Signoff({ style: variant = 'eunjung' }) {
  const labels = {
    'um-mom':  '\u2014 \uc5c4\ub9c8 / Mom',
    'mom':     '\u2014 Mom',
    'eunjung': '\u2014 Eunjung',
  };
  return <span className="signoff">{labels[variant] || labels.eunjung}</span>;
}

/* ─── Nav bar + drawer ────────────────────────────────────────── */
function Nav({ onOpen, scrolled }) {
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand">Eunjung's Table</a>
        <button className="nav__menu-btn" onClick={onOpen} aria-label="Open menu">
          <span className="bars"><span/><span/></span>
          Menu
        </button>
      </div>
    </nav>
  );
}

function Drawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <div className="drawer__panel">
        <button className="drawer__close" onClick={onClose}>Close</button>
        <nav className="drawer__nav">
          <a className="drawer__link" href="Eunjung's Table.html#home" onClick={onClose}>
            Home <span className="drawer__link-num">01</span>
          </a>
          <a className="drawer__link" href="Tours.html" onClick={onClose}>
            Tours <span className="drawer__link-num">02</span>
          </a>
          <a className="drawer__link" href="Cooking.html" onClick={onClose}>
            Cooking Class <span className="drawer__link-num">03</span>
          </a>
          <a className="drawer__link" href="Stay.html" onClick={onClose}>
            Stay <span className="drawer__link-num">04</span>
          </a>
          <a className="drawer__link" href="Eunjung's Table.html#inquire" onClick={onClose}>
            Inquire <span className="drawer__link-num">05</span>
          </a>
        </nav>
        <div className="drawer__meta">
          Jeongja-dong, Seongnam &middot; Est. 2026
        </div>
      </div>
    </div>
  );
}

/* ─── Direction toggle ───────────────────────────────────────── */
function DirectionToggle({ direction, onChange }) {
  return (
    <div className="direction-toggle">
      <div className="direction-toggle__inner" role="tablist">
        <button
          className={direction === 'a' ? 'is-active' : ''}
          onClick={() => onChange('a')}
          role="tab"
          aria-selected={direction === 'a'}
        >A · Editorial</button>
        <button
          className={direction === 'b' ? 'is-active' : ''}
          onClick={() => onChange('b')}
          role="tab"
          aria-selected={direction === 'b'}
        >B · Maximal</button>
      </div>
    </div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <div className={`lightbox ${item ? 'is-open' : ''}`} onClick={onClose}>
      <button className="lightbox__close" onClick={onClose}>Close</button>
      {item && (
        <>
          <img className="lightbox__img" src={item.src} alt={item.alt || ''} />
          {item.caption && <div className="lightbox__caption">{item.caption}</div>}
        </>
      )}
    </div>
  );
}

/* ─── Reveal-on-scroll observer ──────────────────────────────── */
function useRevealObserver(deps = []) {
  useEffect(() => {
    // Reveal system: elements are always visible by default.
    // We ONLY add `is-visible` on entry as a decorative tiny-rise animation.
    // If JS fails or timing is off, content stays visible regardless.
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line
  }, deps);
}

/* ─── Scroll detect for nav shadow ───────────────────────────── */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

Object.assign(window, {
  Photo, Section, Signoff, Nav, Drawer, DirectionToggle, Lightbox,
  useRevealObserver, useScrolled,
});
