import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#FDFCF5',
        borderTop: '1.5px solid rgba(69,68,17,0.12)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');

        .ft-dot-grid {
          background-image: radial-gradient(circle, rgba(69,68,17,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        @keyframes ft-spin  { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes ft-pulse { 0%,100%{opacity:0.4;} 50%{opacity:0.75;} }
        .ft-ring1 { animation: ft-spin  32s linear infinite; }
        .ft-ring2 { animation: ft-spin  22s linear infinite reverse; }
        .ft-glow1 { animation: ft-pulse  5s ease-in-out infinite; }
        .ft-glow2 { animation: ft-pulse  5s ease-in-out infinite; animation-delay:2.5s; }

        .ft-link {
          font-size: 13.5px;
          color: #6a6a52;
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-block;
        }
        .ft-link:hover { color: #454411; padding-left: 4px; }

        .ft-social {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(69,68,17,0.06);
          border: 1px solid rgba(69,68,17,0.12);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; color: #8B5E3C;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .ft-social:hover {
          background: rgba(69,68,17,0.12);
          border-color: rgba(69,68,17,0.3);
          color: #454411;
          transform: translateY(-3px);
        }

        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(69,68,17,0.15), transparent);
          margin: 40px 0;
        }

        .ft-col-title {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.13em;
          color: #454411; margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .ft-col-title::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(69,68,17,0.2), transparent);
        }

        .ft-newsletter-input {
          flex: 1; background: rgba(69,68,17,0.05);
          border: 1px solid rgba(69,68,17,0.15);
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: #2d2e0a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ft-newsletter-input:focus {
          border-color: rgba(69,68,17,0.4);
          background: rgba(69,68,17,0.08);
        }
        .ft-newsletter-input::placeholder { color: #a0a080; }

        .ft-newsletter-btn {
          background: #454411; color: #f5f2e8;
          border: none; border-radius: 10px;
          padding: 10px 18px; cursor: pointer;
          font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .ft-newsletter-btn:hover { background: #5a5a16; transform: translateY(-1px); }

        .ft-bottom-link {
          font-size: 12px; color: #a0a080;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: #454411; }

        @media (max-width: 900px) {
          .ft-main-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .ft-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Texture */}
      <div
        className="ft-dot-grid"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Glow orbs */}
      <div
        className="ft-glow1"
        style={{
          position: 'absolute',
          top: -80,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(69,68,17,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="ft-glow2"
        style={{
          position: 'absolute',
          bottom: -60,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,94,60,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative rings */}
      <div
        className="ft-ring1"
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '1px dashed rgba(69,68,17,0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="ft-ring2"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '3%',
          width: 130,
          height: 130,
          borderRadius: '50%',
          border: '1px dashed rgba(139,94,60,0.07)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px 0', position: 'relative' }}
      >
        {/* ── Top tagline strip ── */}
        <div
          style={{
            background: 'rgba(69,68,17,0.06)',
            border: '1px solid rgba(69,68,17,0.14)',
            borderRadius: 16,
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 52,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: '1.15rem',
              fontStyle: 'italic',
              color: '#454411',
              fontWeight: 600,
            }}
          >
            &quot;From flights to insights — precision farming for the modern age.&quot;
          </p>
        </div>

        {/* ── Main grid ── */}
        <div
          className="ft-main-grid"
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '40px 32px' }}
        >
          {/* Brand col */}
          <div>
            <Link href="/">
              <Image
                src="/assets/Logo2.svg"
                alt="TerraSkyAI Logo"
                width={200}
                height={80}
                style={{ height: 72, width: 'auto', marginBottom: 16 }}
                priority
              />
            </Link>
            <p
              style={{
                fontSize: 13.5,
                color: '#545454',
                lineHeight: 1.8,
                maxWidth: 280,
                marginBottom: 24,
              }}
            >
              Revolutionizing agriculture through AI-powered precision farming. Empowering farmers
              with actionable insights for sustainable, efficient crop management.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Instagram */}
              {/* <a href="#" className="ft-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" style={{ width:16, height:16 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a> */}
              {/* Twitter/X */}
              {/* <a href="#" className="ft-social" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:14, height:14 }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a> */}
              {/* LinkedIn */}
              <a
                href="https://ca.linkedin.com/company/terraskyai-inc"
                className="ft-social"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
                  <path
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
              {/* Facebook */}
              {/* <a href="#" className="ft-social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" style={{ width:16, height:16 }}>
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="ft-col-title">Quick Links</h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {[
                { label: 'Home', href: '/#home' },
                { label: 'Career', href: '/careers' },
                { label: 'About Us', href: '/vision-mission' },
                { label: 'Why Us', href: '/#why-us' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="ft-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="ft-col-title">Products</h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {[{ label: 'SkySight', href: '/products/skysight' }].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="ft-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact quick info */}
            <div style={{ marginTop: 28 }}>
              <h3 className="ft-col-title">Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a
                  href="tel:+15875741601"
                  className="ft-link"
                  style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ width: 13, height: 13, flexShrink: 0 }}
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +1 (587) 574-1601
                </a>
                <a
                  href="mailto:support@terraskyai.com"
                  className="ft-link"
                  style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ width: 13, height: 13, flexShrink: 0 }}
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  support@terraskyai.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <div
          style={{
            paddingBottom: 28,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <p style={{ fontSize: 12, color: '#a0a080' }}>
            © {new Date().getFullYear()} TerraSkyAI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
