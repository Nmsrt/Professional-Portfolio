import { useState } from 'react';
import { transmission } from '../data/content';

/* Contact — the composer opens the user's mail client (no backend required). */
function Transmit() {
  const [form, setForm] = useState({ name: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message from ${form.name || 'your portfolio'}`
    );
    const body = encodeURIComponent(form.message || '');
    window.location.href = `mailto:${transmission.primaryEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="transmit" className="section transmit">
      <div className="shell">
        <div className="section-panel transmit-grid">
        <div className="transmit-intro">
          <p className="section-label" data-reveal>
            {transmission.label}
          </p>
          <h2 className="section-heading" data-reveal>
            {transmission.heading}
          </h2>
          <p className="lead" data-reveal>
            {transmission.lead}
          </p>

          <ul className="channels" data-reveal-group>
            {transmission.channels.map((ch) => (
              <li key={ch.label}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="channel"
                >
                  <span className="channel-text">
                    <small>{ch.label}</small>
                    <strong>{ch.value}</strong>
                  </span>
                  <span className="channel-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Transmission composer */}
        <form className="composer" onSubmit={send} data-reveal="right">
          <div className="composer-head">Send a message — it goes straight to my inbox</div>

          <label className="field">
            <span>Your name</span>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              rows="5"
              value={form.message}
              onChange={update('message')}
              placeholder="Your message…"
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block">
            Send Message <span aria-hidden="true">↗</span>
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}

export default Transmit;
