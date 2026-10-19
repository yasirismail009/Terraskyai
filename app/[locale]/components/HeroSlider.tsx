'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

type Slide = {
  src: string;
  position?: string;
  tag: string;
  caption: string;
};

type Props = {
  slides: Slide[];
  labels: { prev: string; next: string; goTo: string };
  children: React.ReactNode;
  /** how long each slide stays on screen, in milliseconds */
  duration?: number;
};

export default function HeroSlider({ slides, labels, children, duration = 3000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next();
        else prev();
      }
    }
    touchStartX.current = null;
    setPaused(false);
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const current = slides[index];

  return (
    <section
      id="home"
      className="hs-root"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        .hs-root {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #1e2009;
          outline: none;
        }

        /* ── Slides ── */
        .hs-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.1s ease;
        }
        .hs-slide.is-active {
          opacity: 1;
          z-index: 1;
        }
        .hs-slide.is-active .hs-img {
          animation: hs-zoom 5s ease-out both;
        }
        @keyframes hs-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }

        /* ── Dark shade so text is always readable ── */
        .hs-shade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(18,20,5,0.86) 0%, rgba(18,20,5,0.62) 38%, rgba(18,20,5,0.18) 75%, rgba(18,20,5,0.05) 100%),
            linear-gradient(0deg, rgba(18,20,5,0.72) 0%, transparent 34%);
        }

        /* ── Text area ── */
        .hs-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 110px 24px 190px;
        }
        .hs-text {
          max-width: 640px;
          text-align: left;
        }
        .hs-text > * {
          animation: hs-rise 0.8s cubic-bezier(0.25,1,0.5,1) both;
        }
        .hs-text > *:nth-child(2) { animation-delay: 0.12s; }
        .hs-text > *:nth-child(3) { animation-delay: 0.24s; }
        @keyframes hs-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Bottom bar (caption, progress, arrows) ── */
        .hs-bar {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 6;
        }
        .hs-bar-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 22px 24px 34px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }
        .hs-bar-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 1px;
          background: rgba(255,255,255,0.16);
        }
        .hs-caption {
          animation: hs-rise 0.7s cubic-bezier(0.25,1,0.5,1) both;
          margin-bottom: 18px;
        }
        .hs-tag {
          display: inline-block;
          background: rgba(190,169,80,0.16);
          border: 1px solid rgba(190,169,80,0.45);
          color: #BEA950;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 10px;
        }
        .hs-cap-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.25rem, 2.4vw, 1.7rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.25;
          max-width: 560px;
          text-shadow: 0 2px 14px rgba(0,0,0,0.4);
        }

        /* ── Progress segments ── */
        .hs-progress {
          display: flex;
          gap: 8px;
        }
        .hs-seg {
          position: relative;
          width: clamp(18px, 6vw, 48px);
          height: 20px;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
        }
        .hs-seg-track {
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 3px;
          transform: translateY(-50%);
          border-radius: 2px;
          background: rgba(255,255,255,0.28);
          overflow: hidden;
          transition: background 0.25s;
        }
        .hs-seg:hover .hs-seg-track { background: rgba(255,255,255,0.45); }
        .hs-seg-fill {
          display: block;
          height: 100%;
          width: 0%;
          background: #BEA950;
        }
        .hs-seg-fill.is-done { width: 100%; }
        .hs-seg-fill.is-active {
          animation-name: hs-fill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes hs-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Arrows + counter ── */
        .hs-bar-right {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 6px;
        }
        .hs-counter {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #fff;
          margin-right: 6px;
        }
        .hs-counter span {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
        }
        .hs-btn {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.28);
          color: #fff;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
        }
        .hs-btn:hover {
          background: #BEA950;
          border-color: #BEA950;
          color: #1a1d06;
          transform: scale(1.06);
        }
        .hs-btn:focus-visible,
        .hs-seg:focus-visible {
          outline: 2px solid #BEA950;
          outline-offset: 3px;
        }

        /* ── Phones ── */
        @media (max-width: 768px) {
          .hs-root { min-height: 86vh; }
          .hs-shade {
            background:
              linear-gradient(180deg, rgba(18,20,5,0.55) 0%, rgba(18,20,5,0.68) 55%, rgba(18,20,5,0.88) 100%);
          }
          .hs-content { padding: 90px 20px 200px; }
          .hs-bar-inner { gap: 12px; padding: 22px 20px 24px; }
          .hs-bar-inner::before { left: 20px; right: 20px; }
          .hs-counter { display: none; }
          .hs-btn { width: 42px; height: 42px; }
        }

        /* ── Respect people who turn animations off ── */
        @media (prefers-reduced-motion: reduce) {
          .hs-slide { transition: none; }
          .hs-slide.is-active .hs-img { animation: none; }
          .hs-text > *, .hs-caption { animation: none; }
        }
      `}</style>

      {/* Slides */}
      {slides.map((s, i) => (
        <div key={s.src} className={`hs-slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
          <Image
            src={s.src}
            alt={s.caption}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="hs-img"
            style={{ objectFit: 'cover', objectPosition: s.position ?? 'center' }}
          />
        </div>
      ))}

      <div className="hs-shade" />

      {/* Hero text (passed in from the page) */}
      <div className="hs-content">
        <div className="hs-text">{children}</div>
      </div>

      {/* Bottom bar */}
      <div className="hs-bar">
        <div className="hs-bar-inner">
          <div>
            <div className="hs-caption" key={index}>
              <span className="hs-tag">{current.tag}</span>
              <p className="hs-cap-text">{current.caption}</p>
            </div>

            <div className="hs-progress">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  className="hs-seg"
                  aria-label={`${labels.goTo} ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                >
                  <span className="hs-seg-track">
                    <span
                      className={`hs-seg-fill ${i < index ? 'is-done' : i === index ? 'is-active' : ''}`}
                      style={
                        i === index
                          ? {
                              animationDuration: `${duration}ms`,
                              animationPlayState: paused ? 'paused' : 'running',
                            }
                          : undefined
                      }
                      onAnimationEnd={i === index ? next : undefined}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="hs-bar-right">
            <span className="hs-counter">
              {pad(index + 1)} <span>/ {pad(total)}</span>
            </span>
            <button type="button" className="hs-btn" onClick={prev} aria-label={labels.prev}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M12.5 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="hs-btn" onClick={next} aria-label={labels.next}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M7.5 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}