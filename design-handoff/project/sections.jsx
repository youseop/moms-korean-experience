// Eunjung's Table — Home page app

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* ═════ HERO ═════════════════════════════════════════════════ */
function Hero({ tagline }) {
  return (
    <section className="hero section" id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: '2rem' }}>
      <span className="hero__tag-backdrop" aria-hidden>Mom</span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="eyebrow reveal" style={{ marginBottom: '1.5rem' }}>
          Jeongja-dong, Seongnam
        </p>

        <div className="hero__photo-wrap reveal" style={{ margin: '0.5rem auto 2rem', maxWidth: 320 }}>
          <Photo src={IMAGES.heroMom} alt="Eunjung, smiling in her kitchen" aspect="4x5" tilt />
        </div>

        <h1 className="h-display-xl hero__title reveal" style={{ marginBottom: '1rem', whiteSpace: 'pre-line' }}>
          {tagline}
        </h1>

        <p className="lead prose reveal" style={{ marginBottom: '1.75rem', maxWidth: '28rem' }}>
          Local tours, home cooking, and a quiet room in Jeongja — with Eunjung,
          a Korean mom who loves hosting travelers like you.
        </p>

        <div className="reveal" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <a href="#experiences" className="btn">
            Explore the three ways <span className="arrow">→</span>
          </a>
          <a href="#inquire" className="btn btn--ghost">Ask Eunjung</a>
        </div>
      </div>
    </section>
  );
}

/* ═════ MEET MOM ═══════════════════════════════════════════════ */
function MeetMom({ signoff }) {
  return (
    <Section id="meet" number="02" eyebrow="Meet Eunjung" className="meet-mom">
      <div className="reveal" style={{ marginBottom: '1.5rem' }}>
        <h2 className="h-display-lg" style={{ marginBottom: '1.5rem' }}>
          She grew up cooking, and kept cooking.
        </h2>
      </div>

      <div className="meet-mom__portrait reveal" style={{ margin: '0 auto 1.75rem', maxWidth: 280 }}>
        <Photo src={IMAGES.momCandid} alt="Eunjung, a candid portrait" aspect="4x5" tilt tiltDir="right" />
      </div>

      <div className="prose reveal">
        <p>
          Eunjung has lived in Jeongja-dong for almost twenty years. Before that she was
          in Busan, and before that a small town outside Jeonju where her mother taught
          her how to ferment doenjang in a clay jar on the porch.
        </p>
        <p>
          She started hosting travelers through her son Youseop&rsquo;s language students —
          people who had already been to Seoul once or twice and wanted something
          slower, quieter, more at home.
        </p>
        <p className="script" style={{ marginTop: '1.25rem' }}>
          &ldquo;I love when someone sits at my table for the second time. That&rsquo;s when
          they stop being a guest.&rdquo;
        </p>
        <Signoff style={signoff} />
      </div>
    </Section>
  );
}

/* ═════ THREE EXPERIENCES ══════════════════════════════════════ */
function ExperienceCard({ exp }) {
  return (
    <article className="experience-card reveal" id={exp.id}>
      <div style={{ marginBottom: '1rem' }}>
        <Photo src={exp.image} alt={exp.alt} aspect="4x5" />
      </div>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
        {exp.kicker}
      </p>
      <h3 className="h-display-md" style={{ marginBottom: '0.75rem' }}>
        {exp.title}
      </h3>
      <p className="prose" style={{ marginBottom: '1rem' }}>
        {exp.blurb}
      </p>
      <a href={exp.href || ('#' + exp.id)} className="link">
        {exp.cta} &rarr;
      </a>
    </article>
  );
}

function Experiences() {
  return (
    <Section id="experiences" number="03" eyebrow="Three ways to spend time">
      <div className="reveal" style={{ marginBottom: '2rem' }}>
        <h2 className="h-display-lg">
          Tours, cooking, or a room. Any one of them, or all three.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {EXPERIENCES.map((e) => (
          <ExperienceCard key={e.id} exp={e} />
        ))}
      </div>
    </Section>
  );
}

/* ═════ GALLERY (with lightbox) ════════════════════════════════ */
function Gallery({ onOpen }) {
  return (
    <Section id="gallery" number="04" eyebrow="From her phone">
      <div className="reveal" style={{ marginBottom: '1.5rem' }}>
        <h2 className="h-display-lg">
          A few of her days.
        </h2>
      </div>
      <div
        className="gallery-grid reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
        }}
      >
        {GALLERY.map((item, i) => (
          <Photo
            key={i}
            src={item.src}
            alt={item.alt}
            aspect="1x1"
            rot={item.rot}
            onClick={() => onOpen({ src: item.src.replace('w=800', 'w=1600'), alt: item.alt, caption: item.alt })}
          />
        ))}
      </div>
      <p className="caption reveal" style={{ marginTop: '1.25rem', textAlign: 'center' }}>
        Tap any photo &middot; more on the full gallery page
      </p>
    </Section>
  );
}

/* ═════ REVIEWS ════════════════════════════════════════════════ */
function ReviewCard({ r }) {
  return (
    <article className="review reveal" style={{
      borderTop: '1px solid var(--divider)',
      paddingTop: '1.75rem',
      marginTop: '1.75rem',
    }}>
      <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>{r.service}</p>
      <blockquote className="prose" style={{
        margin: 0,
        fontFamily: 'var(--serif)',
        fontStyle: 'italic',
        fontSize: '1.125rem',
        lineHeight: 1.5,
        color: 'var(--heading)',
        fontVariationSettings: '"opsz" 48',
      }}>
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
        <img
          src={r.avatar}
          alt={r.name}
          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', filter: 'saturate(0.9) contrast(1.02)' }}
        />
        <div>
          <div style={{ fontWeight: 500, color: 'var(--heading)' }}>{r.name}</div>
          <div className="caption">{r.where}</div>
        </div>
      </div>
    </article>
  );
}

function Reviews() {
  return (
    <Section id="reviews" number="05" eyebrow="What guests say">
      <div className="reveal" style={{ marginBottom: '0.5rem' }}>
        <h2 className="h-display-lg">
          The ones who left, then came back.
        </h2>
      </div>
      {REVIEWS.map((r) => (
        <ReviewCard key={r.id} r={r} />
      ))}
    </Section>
  );
}

/* ═════ WHY JEONGJA ════════════════════════════════════════════ */
function WhyJeongja() {
  return (
    <Section id="jeongja" number="06" eyebrow="Why Jeongja" className="why-jeongja">
      <div className="reveal" style={{ marginBottom: '1.25rem' }}>
        <h2 className="h-display-lg" style={{ color: 'var(--heading)' }}>
          Not Seoul, but close. Quieter, kinder, walkable.
        </h2>
      </div>
      <p className="prose reveal" style={{ marginBottom: '1.5rem' }}>
        Youseop lived in five Korean cities before settling on Jeongja as the most
        livable. Tancheon stream runs right past the building. Parks line the water.
        Jeongja Station is five minutes on foot, Gangnam is twenty minutes on the
        subway, and by nightfall the neighborhood is so quiet you can hear cicadas
        in summer.
      </p>
      <ul className="reveal" style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}>
        {[
          ['Jeongja Stn.', '5 min walk'],
          ['Gangnam Stn.', '20 min subway'],
          ['Myeongdong',   '40 min bus'],
          ['Tancheon',     'across the street'],
        ].map(([k, v]) => (
          <li key={k}>
            <div className="eyebrow" style={{ fontSize: 10, marginBottom: 4 }}>{k}</div>
            <div className="h-display-sm" style={{ color: 'var(--heading)' }}>{v}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ═════ MARU (sidebar feature) ════════════════════════════════ */
function Maru() {
  return (
    <Section id="maru" number="07" eyebrow="House resident" className="section--tight">
      <div className="reveal" style={{ margin: '0 auto 1rem', maxWidth: 320 }}>
        <Photo src={IMAGES.maru} alt="Maru, a schnauzer, sitting on a rug" aspect="4x5" tilt />
      </div>
      <p className="script reveal" style={{ textAlign: 'center' }}>
        Maru. 14. Schnauzer. Will sit on your feet.
      </p>
      <p className="caption reveal" style={{ textAlign: 'center', marginTop: '0.75rem', maxWidth: 280, margin: '0.75rem auto 0' }}>
        Please skip the Stay if you have dog allergies.
      </p>
    </Section>
  );
}

/* ═════ FINAL CTA / INQUIRE ═══════════════════════════════════ */
function Inquire({ signoff }) {
  const [sent, setSent] = useStateA(false);
  const [form, setForm] = useStateA({ name: '', email: '', note: '', experience: 'tours' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Section id="inquire" number="08" eyebrow="Ask Eunjung anything">
      <div className="reveal" style={{ marginBottom: '1.5rem' }}>
        <h2 className="h-display-lg">
          Curious? Send her a note.
        </h2>
        <p className="lead" style={{ marginTop: '1rem', color: 'var(--muted)' }}>
          She usually replies within a day or two.
        </p>
      </div>

      {!sent ? (
        <form className="reveal" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <Field label="Which one?" >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                ['tours',   'Tours'],
                ['cooking', 'Cooking'],
                ['stay',    'Stay'],
                ['chat',    'Just curious'],
              ].map(([k, v]) => (
                <button
                  key={k}
                  type="button"
                  className={`tweaks__chip ${form.experience === k ? 'is-active' : ''}`}
                  onClick={() => setForm({ ...form, experience: k })}
                >{v}</button>
              ))}
            </div>
          </Field>
          <Field label="Your name">
            <input
              className="input"
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="First name is fine"
              required
            />
          </Field>
          <Field label="Email">
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="so she can reply"
              required
            />
          </Field>
          <Field label="Anything Eunjung should know?">
            <textarea
              className="input"
              rows={4}
              value={form.note}
              onChange={update('note')}
              placeholder="Dates, group size, allergies, what you're hoping for — or just say hi."
            />
          </Field>
          <button type="submit" className="btn" style={{ justifyContent: 'center' }}>
            Send to Eunjung <span className="arrow">→</span>
          </button>
        </form>
      ) : (
        <div className="reveal" style={{
          padding: '2rem',
          border: '1px solid var(--divider)',
          borderRadius: 8,
          background: 'var(--surface)',
          textAlign: 'center',
        }}>
          <p className="h-display-md" style={{ marginBottom: '0.75rem' }}>
            Thank you.
          </p>
          <p className="prose" style={{ margin: '0 auto' }}>
            Eunjung will get back to you within a day or two. Check your email.
          </p>
          <p className="script" style={{ marginTop: '1rem' }}>
            See you soon.
          </p>
          <Signoff style={signoff} />
        </div>
      )}
    </Section>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem', fontSize: 10 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

/* ═════ FOOTER ════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="h-display-md" style={{ color: 'var(--heading)', fontStyle: 'italic' }}>
        Eunjung&rsquo;s Table
      </div>
      <p style={{ margin: 0, maxWidth: 320 }}>
        A home in Jeongja-dong, Seongnam. Tours, cooking class, and a quiet room,
        hosted by Eunjung.
      </p>
      <div className="footer__row">
        <div>&copy; 2026 Eunjung&rsquo;s Table</div>
        <div>Made with love by Youseop</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, MeetMom, Experiences, Gallery, Reviews, WhyJeongja, Maru, Inquire, Footer });
