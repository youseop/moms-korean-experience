// Shared components used across all three detail pages.

function DetailHero({ hero }) {
  return (
    <section className="detail-hero" id="overview">
      <p className="detail-hero__kicker reveal">{hero.kicker}</p>
      <h1 className="detail-hero__title reveal hero__title">{hero.title}</h1>
      <p className="detail-hero__lead reveal">{hero.lead}</p>
      <div className="reveal detail-hero__frame">
        <Photo src={hero.image} alt={hero.alt} aspect="4x5" tilt />
      </div>
    </section>
  );
}

function FactStrip({ items }) {
  return (
    <div className="section section--tight">
      <dl className="facts reveal">
        {items.map(([k, v], i) => (
          <div className="facts__item" key={i}>
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Timeline({ items, eyebrow, heading, id }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && (
        <h2 className="h-display-lg reveal" style={{ marginBottom: '1.5rem' }}>
          {heading}
        </h2>
      )}
      <ol className="timeline reveal">
        {items.map((item, i) => (
          <li className="timeline__item" key={i}>
            {item.time && <div className="timeline__time">{item.time}</div>}
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__body">{item.body}</p>
            {item.stops && (
              <p className="timeline__body" style={{ marginTop: '0.35rem', fontStyle: 'italic', color: 'var(--muted)', fontSize: '12.5px' }}>
                {item.stops.join('  ·  ')}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Pullquote({ text, cite }) {
  return (
    <div className="section section--tight">
      <div className="pullquote reveal">
        <p className="pullquote__text">{text}</p>
        <p className="pullquote__cite">{cite}</p>
      </div>
    </div>
  );
}

function DetailGallery({ items, onOpen, id }) {
  return (
    <Section eyebrow="From her phone" id={id}>
      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
      }}>
        {items.map((it, i) => (
          <Photo
            key={i}
            src={it.src}
            alt={it.alt}
            aspect="1x1"
            rot={it.rot}
            onClick={() => onOpen({ src: it.src.replace('w=800', 'w=1600'), alt: it.alt, caption: it.alt })}
          />
        ))}
      </div>
    </Section>
  );
}

/* ─── Sticky sub-nav (section jump) ─────────────────────────── */
function SubNav({ items }) {
  const [active, setActive] = React.useState(items[0]?.[0]);
  React.useEffect(() => {
    const onScroll = () => {
      // Find the section closest to the top (below sticky offset)
      let best = items[0][0];
      let bestTop = -Infinity;
      for (const [id] of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 160 && top > bestTop) {
          best = id;
          bestTop = top;
        }
      }
      setActive(best);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onClick = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav className="subnav" aria-label="Page sections">
      <div className="subnav__inner">
        {items.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => onClick(e, id)}
            className={`subnav__link ${active === id ? 'is-active' : ''}`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Floating inquire CTA ─────────────────────────────────── */
function FloatingCTA({ label = "Ask Eunjung", href = "Eunjung's Table.html#inquire" }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a href={href} className={`fab ${visible ? 'is-visible' : ''}`}>
      <span className="fab__dot" aria-hidden="true"></span>
      <span>{label}</span>
    </a>
  );
}

/* ─── FAQ accordion ─────────────────────────────────────────── */
function FAQ({ items, id, eyebrow = "Questions, answered" }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      <div className="faq reveal">
        {items.map((it, i) => (
          <details className="faq__item" key={i}>
            <summary className="faq__q">
              <span>{it.q}</span>
              <span className="faq__plus" aria-hidden="true"></span>
            </summary>
            <p className="faq__a">{it.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ─── Reviews (past guests) ─────────────────────────────────── */
function Reviews({ items, id, eyebrow = "Past guests" }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      <div className="reveal">
        {items.map((r, i) => (
          <div className="review" key={i}>
            <p className="review__text">{r.text}</p>
            <p className="review__cite"><strong>{r.by}</strong> &nbsp;·&nbsp; {r.where}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Booking process ──────────────────────────────────────── */
function Process({ items, id, eyebrow, heading }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '1rem' }}>{heading}</h2>}
      <ol className="process reveal">
        {items.map((p, i) => (
          <li className="process__item" key={i}>
            <span className="process__num" aria-hidden="true"></span>
            <div>
              <h3 className="process__title">{p.t}</h3>
              <p className="process__body">{p.b}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─── Hand-drawn map (Tours) ───────────────────────────────── */
function HandDrawnMap({ pins, id, eyebrow = "Where we go", heading, showRoute = true }) {
  // Decorative SVG: wiggly river, a few roads, and numbered pins.
  const W = 400, H = 280;
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '1rem' }}>{heading}</h2>}
      <figure className="map reveal">
        <span className="map__label">Gyeonggi-do, roughly</span>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Hand-drawn map of places Eunjung takes guests">
          {/* subtle graph paper */}
          <defs>
            <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08"/>
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#mapGrid)" />

          {/* Han river (wavy) */}
          <path d="M -10 110 Q 80 95, 150 115 T 320 100 T 420 120"
                fill="none" stroke="currentColor" strokeWidth="6" opacity="0.12" strokeLinecap="round"/>
          <path d="M -10 112 Q 80 97, 150 117 T 320 102 T 420 122"
                fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.35" strokeLinecap="round" strokeDasharray="1 3"/>
          <text x="70" y="98" className="map__pin-label" opacity="0.55" fontSize="10">Han river</text>

          {/* A squiggly main road */}
          <path d="M 40 250 Q 120 200, 180 200 T 280 170 Q 330 150, 360 110"
                fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeDasharray="3 3"/>

          {/* Route line connecting pins, if desired */}
          {showRoute && pins && pins.length > 1 && (
            <polyline
              points={pins.map((p) => `${(p.x / 100) * W},${(p.y / 100) * H}`).join(' ')}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.5"
            />
          )}

          {/* Labels for a few regions */}
          <text x="48" y="40"  className="map__pin-label" fontSize="11" opacity="0.55">Seoul</text>
          <text x="340" y="50" className="map__pin-label" fontSize="11" opacity="0.55">Gyeonggi</text>

          {/* Pins */}
          {pins && pins.map((p, i) => {
            const cx = (p.x / 100) * W;
            const cy = (p.y / 100) * H;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="12" fill="var(--accent)" opacity="0.15"/>
                <circle cx={cx} cy={cy} r="8"  fill="var(--accent)" />
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">{p.n}</text>
                <text x={cx + 14} y={cy + 4} className="map__pin-label">{p.label}</text>
              </g>
            );
          })}

          {/* Scale */}
          <g transform="translate(20, 260)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="60" y1="-3" x2="60" y2="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <text x="70" y="4" className="map__scale">~30 km</text>
          </g>
        </svg>

        <figcaption className="map__legend">
          {pins && pins.map((p, i) => (
            <div className="map__legend-item" key={i}>
              <span className="map__legend-dot">{p.n}</span>
              <span>{p.label}</span>
            </div>
          ))}
        </figcaption>
      </figure>
    </Section>
  );
}

/* ─── Ingredients grid (Cooking) ───────────────────────────── */
function IngredientsGrid({ items, id, eyebrow = "What she cooks with", heading }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '0.5rem' }}>{heading}</h2>}
      <div className="ingredients reveal">
        {items.map((it, i) => (
          <div className="ingredient" key={i}>
            <h3 className="ingredient__name">{it.en}</h3>
            <div className="ingredient__ko">{it.ko}</div>
            <p className="ingredient__note">{it.note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Recipe tabs (Cooking) ────────────────────────────────── */
function RecipeTabs({ menus, id, eyebrow = "Three set menus", heading }) {
  const [active, setActive] = React.useState(menus[0].id);
  const current = menus.find((m) => m.id === active);
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '1rem' }}>{heading}</h2>}
      <div className="reveal">
        <div className="tabs" role="tablist">
          {menus.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={active === m.id}
              className={`tab ${active === m.id ? 'is-active' : ''}`}
              onClick={() => setActive(m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <article className="menu-card" key={current.id}>
          <header className="menu-card__header">
            <h3 className="menu-card__name">{current.name}</h3>
            <span className="menu-card__ko">{current.ko}</span>
          </header>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>
            <span>{current.time}</span>
            <span>·</span>
            <span>{current.difficulty}</span>
          </div>
          {current.lines.map(([k, v], i) => (
            <div className="menu-card__line" key={i}>
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </div>
          ))}
        </article>
      </div>
    </Section>
  );
}

/* ─── Floor plan (Stay) ────────────────────────────────────── */
function FloorPlan({ id, eyebrow = "The apartment" }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      <h2 className="h-display-lg reveal" style={{ marginBottom: '1rem' }}>
        About 60 square meters, honest sunlight.
      </h2>
      <figure className="floorplan reveal">
        <svg viewBox="0 0 400 260" role="img" aria-label="Simple floor plan of Eunjung's apartment">
          <defs>
            <pattern id="planHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.6" opacity="0.2"/>
            </pattern>
          </defs>

          {/* outer wall */}
          <rect x="15" y="15" width="370" height="230" fill="none" stroke="currentColor" strokeWidth="2.5"/>

          {/* Guest room */}
          <rect x="20" y="20" width="140" height="110" fill="url(#planHatch)" stroke="currentColor" strokeWidth="1"/>
          <text x="90" y="70" textAnchor="middle" fontSize="13" fill="var(--heading)"
                fontFamily="var(--serif)" fontStyle="italic">Guest room</text>
          <text x="90" y="88" textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--sans)">4.5 × 3.2 m</text>
          {/* Bed */}
          <rect x="35"  y="95" width="50" height="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          {/* Desk */}
          <rect x="115" y="95" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>

          {/* Bathroom */}
          <rect x="165" y="20" width="90" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="210" y="50" textAnchor="middle" fontSize="11" fill="var(--heading)" fontFamily="var(--serif)" fontStyle="italic">Bath</text>
          <text x="210" y="65" textAnchor="middle" fontSize="9"  fill="var(--muted)" fontFamily="var(--sans)">yours</text>

          {/* Hall */}
          <text x="210" y="100" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--sans)">hall</text>

          {/* Kitchen + Dining */}
          <rect x="165" y="130" width="220" height="115" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="260" y="165" textAnchor="middle" fontSize="13" fill="var(--heading)" fontFamily="var(--serif)" fontStyle="italic">Kitchen &amp; table</text>
          <text x="260" y="182" textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--sans)">the heart of it</text>
          {/* Island */}
          <rect x="200" y="200" width="90" height="22" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>

          {/* Balcony */}
          <rect x="20" y="135" width="140" height="105" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="90" y="185" textAnchor="middle" fontSize="11" fill="var(--heading)" fontFamily="var(--serif)" fontStyle="italic">Balcony</text>
          <text x="90" y="200" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--sans)">south-facing</text>

          {/* Compass */}
          <g transform="translate(365, 35)">
            <circle r="10" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
            <path d="M 0 -8 L 3 0 L 0 3 L -3 0 Z" fill="var(--accent)"/>
            <text y="-14" textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="var(--sans)">N</text>
          </g>
        </svg>
        <div className="floorplan__legend">
          <div className="floorplan__legend-item">
            <span className="floorplan__legend-swatch" style={{ background: 'var(--surface)' }}></span>
            <span>Your space</span>
          </div>
          <div className="floorplan__legend-item">
            <span className="floorplan__legend-swatch" style={{ borderStyle: 'dashed' }}></span>
            <span>Shared / common</span>
          </div>
        </div>
      </figure>
    </Section>
  );
}

/* ─── Nearby / distance list (Stay) ────────────────────────── */
function Nearby({ items, id, eyebrow = "Getting around", heading }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '0.5rem' }}>{heading}</h2>}
      <dl className="nearby reveal">
        {items.map(([place, dist], i) => (
          <React.Fragment key={i}>
            <dt className="nearby__place">{place}</dt>
            <dd className="nearby__dist">{dist}</dd>
          </React.Fragment>
        ))}
      </dl>
    </Section>
  );
}

/* ─── House rooms (Stay) ───────────────────────────────────── */
function HouseRooms({ items, id, eyebrow = "The rooms", heading }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      {heading && <h2 className="h-display-lg reveal" style={{ marginBottom: '1rem' }}>{heading}</h2>}
      <ol className="timeline reveal">
        {items.map((r, i) => (
          <li className="timeline__item" key={i}>
            <div className="timeline__time">{r.size}</div>
            <h3 className="timeline__title">{r.name}</h3>
            <p className="timeline__body">{r.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─── Maru card (Stay) ─────────────────────────────────────── */
function MaruCard({ maru, id, eyebrow = "Also in the house" }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      <div className="reveal" style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: '1fr' }}>
        <div style={{ maxWidth: 300, margin: '0 auto' }}>
          <Photo
            src="https://images.unsplash.com/photo-1558531304-a4773b7e3a9c?w=800&q=80"
            alt="Maru, a Jindo mix"
            aspect="1x1"
            rot={-1.2}
          />
        </div>
        <div>
          <h2 className="h-display-lg" style={{ marginBottom: '0.25rem' }}>
            Meet {maru.name}.
          </h2>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>{maru.breed}</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--body)', lineHeight: 1.65, color: 'var(--text)', marginBottom: '1rem' }}>
            {maru.body}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px dotted var(--divider)' }}>
            {maru.things.map((t, i) => (
              <li key={i} style={{
                padding: '0.6rem 0',
                borderBottom: '1px dotted var(--divider)',
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--text)',
              }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ─── Walks list (Stay) ─────────────────────────────────────── */
function Walks({ items, id, eyebrow = "Nearby walks she recommends" }) {
  return (
    <Section eyebrow={eyebrow} id={id}>
      <div className="reveal" style={{ display: 'grid', gap: '1rem' }}>
        {items.map((w, i) => (
          <div key={i} style={{
            padding: '1rem 0',
            borderBottom: '1px dotted var(--divider)',
          }}>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: 'var(--heading)',
              margin: '0 0 0.35rem',
            }}>{w.name}</h3>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              lineHeight: 1.55,
              color: 'var(--text)',
              margin: 0,
            }}>{w.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Cross-sell row (link to the other two experiences) ─── */
function CrossSell({ current }) {
  const all = [
    { id: "tours",   href: "Tours.html",    label: "Seoul with Mom",    num: "01", tagline: "Places she\u2019d take her own kids." },
    { id: "cooking", href: "Cooking.html",  label: "Cook with Mom",     num: "02", tagline: "Three menus, one kitchen table." },
    { id: "stay",    href: "Stay.html",     label: "Stay with Mom",     num: "03", tagline: "A quiet room, a daily dinner." },
  ];
  const others = all.filter((x) => x.id !== current);
  return (
    <Section eyebrow="Keep looking">
      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.5rem',
        borderTop: '1px solid var(--divider)',
      }}>
        {others.map((o) => (
          <a href={o.href} key={o.id} style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 0.25rem',
            borderBottom: '1px solid var(--divider)',
            textDecoration: 'none',
            color: 'inherit',
          }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              color: 'var(--muted)',
              fontSize: '1rem',
            }}>{o.num}</span>
            <div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: '1.35rem',
                color: 'var(--heading)',
                margin: '0 0 0.15rem',
                letterSpacing: '-0.01em',
              }}>{o.label}</h3>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--text)',
                margin: 0,
              }}>{o.tagline}</p>
            </div>
            <span style={{
              fontSize: '1.25rem',
              color: 'var(--accent)',
            }}>→</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ─── Note strip (handwritten callout) ─────────────────────── */
function NoteStrip({ children }) {
  return <div className="note-strip reveal">{children}</div>;
}

/* Closing block linking back to inquire or to another detail page */
function DetailClose({ next }) {
  return (
    <Section>
      <div className="reveal" style={{ textAlign: 'center', padding: '1rem 0 0' }}>
        <p className="script" style={{ marginBottom: '0.75rem' }}>
          Ready to talk dates?
        </p>
        <h2 className="h-display-lg" style={{ marginBottom: '1.5rem' }}>
          Send Eunjung a note.
        </h2>
        <a href="Eunjung's Table.html#inquire" className="btn" style={{ marginBottom: '1rem' }}>
          Ask Eunjung <span className="arrow">→</span>
        </a>
        {next && (
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--divider)' }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Or keep looking</p>
            <a href={next.href} className="link" style={{ fontSize: '1.125rem' }}>
              {next.label} &rarr;
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}

Object.assign(window, {
  DetailHero, FactStrip, Timeline, Pullquote, DetailGallery, DetailClose,
  SubNav, FloatingCTA, FAQ, Reviews, Process, HandDrawnMap,
  IngredientsGrid, RecipeTabs, FloorPlan, Nearby, HouseRooms, MaruCard, Walks,
  CrossSell, NoteStrip,
});
