'use client';

import { useState } from 'react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    name: 'Lethbridge Ag Expo',
    location: 'Lethbridge, Alberta',
    tag: 'Industry Expo',
    tagColor: '#8B5E3C',
    description:
      'TerraSkyAI proudly showcased at the Lethbridge Ag Expo in collaboration with SkyDrones Inc — demonstrating how AI-powered aerial intelligence is transforming modern agriculture. From smarter decisions to stronger sustainability and improved farm profitability, this event brought together growers, agronomists, and industry partners to explore the future of precision farming.',
    highlight: 'Collaboration with SkyDrones Inc',
    images: ['/assets/Ag_Expo1.jpeg', '/assets/Ag_Expo2.jpeg', '/assets/Ag_Expo3.jpeg'],
  },
  {
    id: 2,
    name: 'University of Lethbridge Career Fair',
    location: 'Lethbridge, Alberta',
    tag: 'Career Event',
    tagColor: '#454411',
    description:
      'It was a pleasure connecting with talented students and professionals passionate about agriculture, technology, and innovation at the University of Lethbridge Career Fair. We shared our vision for the future of AgTech, discussed career opportunities, and were energized by the enthusiasm of the next generation of agricultural innovators.',
    highlight: 'Connecting with the next generation',
    images: ['/assets/Career-Fair1.jpeg', '/assets/Career-Fair2.jpeg', '/assets/Career-Fair3.jpeg'],
  },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; eventName: string } | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#FDFCF5', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Animations ── */
        @keyframes gl-fadeUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gl-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes gl-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gl-spin-slow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes gl-float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-10px); }
        }
        @keyframes gl-pulse-ring {
          0%   { transform:scale(1); opacity:0.5; }
          100% { transform:scale(1.7); opacity:0; }
        }
        @keyframes gl-lb-in {
          from { opacity:0; transform:scale(0.92); }
          to   { opacity:1; transform:scale(1); }
        }

        /* ── Dot background ── */
        .gl-dot-bg {
          background-image: radial-gradient(circle, rgba(69,68,17,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── Hero ── */
        .gl-hero {
          background: linear-gradient(160deg, #1e2009 0%, #2a2d0f 50%, #3a3c12 100%);
          padding: 120px 24px 100px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .gl-hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(190,169,80,0.12);
          pointer-events: none;
        }
        .gl-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        /* ── Section ── */
        .gl-section {
          padding: 88px 24px;
          position: relative;
          overflow: hidden;
        }
        .gl-section:nth-child(odd) {
          background: #FDFCF5;
        }
        .gl-section:nth-child(even) {
          background: #f5f2e8;
        }

        /* ── Event header ── */
        .gl-event-label {
          animation: gl-fadeUp 0.6s ease both;
        }

        /* ── Image grid ── */
        .gl-img-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
          height: 100%;
        }
        .gl-img-item {
          position: relative;
          overflow: hidden;
          cursor: zoom-in;
          background: rgba(69,68,17,0.08);
          border-radius: 16px;
          min-height: 280px;
          height: 100%;
        }
        .gl-img-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25,1,0.5,1);
        }
        .gl-img-item:hover img {
          transform: scale(1.06);
        }
        .gl-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(30,32,9,0.55) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.35s;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 18px;
        }
        .gl-img-item:hover .gl-img-overlay {
          opacity: 1;
        }
        .gl-zoom-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Info card ── */
        .gl-info-card {
          background: #fff;
          border: 1.5px solid rgba(69,68,17,0.1);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 8px 40px rgba(69,68,17,0.07);
          animation: gl-fadeUp 0.7s 0.15s ease both;
        }

        /* ── Highlight pill ── */
        .gl-highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(69,68,17,0.06);
          border: 1px solid rgba(69,68,17,0.14);
          border-radius: 999px;
          padding: 6px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #454411;
          margin-top: 20px;
        }

        /* ── Shimmer divider ── */
        .gl-shimmer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(190,169,80,0.5), transparent);
          background-size: 200% auto;
          animation: gl-shimmer 3s linear infinite;
          margin: 24px 0;
        }

        /* ── Lightbox ── */
        .gl-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(10,12,3,0.93);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: gl-fadeIn 0.25s ease;
          backdrop-filter: blur(10px);
        }
        .gl-lightbox-inner {
          position: relative;
          max-width: 1100px;
          width: 100%;
          animation: gl-lb-in 0.3s ease;
        }
        .gl-lightbox-inner img {
          width: 100%;
          max-height: 82vh;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .gl-lb-close {
          position: absolute;
          top: -18px; right: -18px;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          backdrop-filter: blur(8px);
        }
        .gl-lb-close:hover { background: rgba(255,255,255,0.2); }
        .gl-lb-caption {
          text-align: center;
          margin-top: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.05em;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .gl-event-grid { grid-template-columns: 1fr !important; }
          .gl-img-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .gl-img-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="gl-hero">
        {/* Decorative rings */}
        <div
          className="gl-hero-ring"
          style={{
            width: 500,
            height: 500,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          className="gl-hero-ring"
          style={{
            width: 350,
            height: 350,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          className="gl-hero-ring"
          style={{
            width: 200,
            height: 200,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            borderColor: 'rgba(190,169,80,0.2)',
          }}
        />

        {/* Glows */}
        <div
          className="gl-hero-glow"
          style={{
            width: 400,
            height: 400,
            top: '-10%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(190,169,80,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="gl-hero-glow"
          style={{
            width: 300,
            height: 300,
            bottom: '-5%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(139,94,60,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Dot bg */}
        <div
          className="gl-dot-bg"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }}
        />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(190,169,80,0.12)',
              border: '1px solid rgba(190,169,80,0.3)',
              color: '#BEA950',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '5px 18px',
              borderRadius: 999,
              fontFamily: "'DM Sans',sans-serif",
              marginBottom: 24,
              animation: 'gl-fadeUp 0.5s ease both',
            }}
          >
            Events & Community
          </span>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 'clamp(3rem,7vw,5.5rem)',
              fontWeight: 700,
              color: '#f5f2e8',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              animation: 'gl-fadeUp 0.6s 0.1s ease both',
            }}
          >
            Our Gallery
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 24,
              animation: 'gl-fadeUp 0.6s 0.15s ease both',
            }}
          >
            <div
              style={{
                height: 1,
                width: 48,
                background: 'linear-gradient(90deg,transparent,rgba(190,169,80,0.5))',
              }}
            />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#BEA950' }} />
            <div
              style={{
                height: 1,
                width: 48,
                background: 'linear-gradient(90deg,rgba(190,169,80,0.5),transparent)',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 17,
              color: 'rgba(245,242,232,0.65)',
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 auto',
              animation: 'gl-fadeUp 0.6s 0.2s ease both',
            }}
          >
            From expos to career fairs — moments where TerraSkyAI connects with growers, students,
            and innovators shaping the future of agriculture.
          </p>
        </div>
      </section>

      {/* ── EVENTS ── */}
      {events.map((event, idx) => (
        <section key={event.id} className="gl-section">
          <div
            className="gl-dot-bg"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* Glow orb */}
          <div
            style={{
              position: 'absolute',
              top: idx % 2 === 0 ? -60 : 'auto',
              bottom: idx % 2 !== 0 ? -60 : 'auto',
              left: idx % 2 === 0 ? '5%' : 'auto',
              right: idx % 2 !== 0 ? '5%' : 'auto',
              width: 350,
              height: 350,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${idx % 2 === 0 ? '190,169,80' : '139,94,60'},0.07) 0%, transparent 70%)`,
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            {/* Event header */}
            <div className="gl-event-label" style={{ marginBottom: 44 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    background: idx % 2 === 0 ? 'rgba(139,94,60,0.1)' : 'rgba(69,68,17,0.08)',
                    border: `1px solid ${idx % 2 === 0 ? 'rgba(139,94,60,0.25)' : 'rgba(69,68,17,0.2)'}`,
                    color: event.tagColor,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: 999,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {event.tag}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: '#9a9878',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13 }}>
                    <path
                      d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"
                      stroke="#9a9878"
                      strokeWidth="1.3"
                    />
                    <circle cx="8" cy="6" r="1.5" stroke="#9a9878" strokeWidth="1.3" />
                  </svg>
                  {event.location}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 'clamp(2.2rem,4vw,3.5rem)',
                  fontWeight: 700,
                  color: '#2d2e0a',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                }}
              >
                {event.name}
              </h2>
            </div>

            {/* Main grid: images left, info right — alternate on even */}
            <div
              className="gl-event-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
                gap: 40,
                alignItems: 'stretch',
              }}
            >
              {/* Image grid */}
              <div
                style={{ order: idx % 2 === 0 ? 0 : 1, display: 'flex', flexDirection: 'column' }}
              >
                <div className="gl-img-grid" style={{ flex: 1 }}>
                  {event.images.map((src, i) => (
                    <div
                      key={i}
                      className="gl-img-item"
                      onClick={() => setLightbox({ src, eventName: event.name })}
                    >
                      <Image
                        src={src}
                        alt={`${event.name} ${i + 1}`}
                        width={800}
                        height={600}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="gl-img-overlay">
                        <div className="gl-zoom-icon">
                          <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, height: 18 }}>
                            <circle cx="9" cy="9" r="5.5" stroke="white" strokeWidth="1.5" />
                            <path
                              d="M13.5 13.5l3 3"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M7 9h4M9 7v4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image count label */}
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12,
                    color: '#b0ac90',
                    marginTop: 12,
                    textAlign: 'center',
                    letterSpacing: '0.06em',
                  }}
                >
                  {event.images.length} photos — click to enlarge
                </p>
              </div>

              {/* Info card */}
              <div style={{ order: idx % 2 === 0 ? 1 : 0 }}>
                <div className="gl-info-card">
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: '#545454',
                      lineHeight: 1.85,
                    }}
                  >
                    {event.description}
                  </p>

                  <div className="gl-shimmer-line" />

                  <div className="gl-highlight">
                    <svg viewBox="0 0 12 12" fill="#BEA950" style={{ width: 8, height: 8 }}>
                      <circle cx="6" cy="6" r="6" />
                    </svg>
                    {event.highlight}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── STAY CONNECTED banner ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e2009 0%, #2a2d0f 50%, #3a3c12 100%)',
          padding: '80px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="gl-dot-bg"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: '1px solid rgba(190,169,80,0.08)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 320,
            height: 320,
            borderRadius: '50%',
            border: '1px solid rgba(190,169,80,0.12)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 700,
              color: '#f5f2e8',
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Missed us at an event?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 15,
              color: 'rgba(245,242,232,0.6)',
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            Reach out and let&apos;s start a conversation about the future of your farm.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#BEA950',
              color: '#1a1d06',
              borderRadius: 12,
              padding: '14px 32px',
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(190,169,80,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(190,169,80,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(190,169,80,0.35)';
            }}
          >
            Let&apos;s Connect
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
              <path
                d="M4 10h12M10 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="gl-lightbox" onClick={() => setLightbox(null)}>
          <div className="gl-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="gl-lb-close" onClick={() => setLightbox(null)}>
              ✕
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.eventName}
              width={1200}
              height={900}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p className="gl-lb-caption">{lightbox.eventName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
