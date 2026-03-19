"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const coreValues = [
  {
    id: "2.1",
    title: "Plant Stand Count",
    color: "#454411",
    accentLight: "#f5f4e8",
    accentBorder: "#c8c67a",
    image: "/assets/Plant Stand Count.jpg",
    points: [
      "Reseeding decisions with real-time accuracy",
      "Parent seed line vigor evaluation",
      "Insurance claims validation support",
    ],
    tag: "Red square detection",
    highlight: null,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="3" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M20 26 L20 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 22 C20 22 17 20 16 17 C18 17 20 19 20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
        <path d="M20 21 C20 21 23 19 24 16 C22 16 20 18 20 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
        <circle cx="20" cy="27" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "2.2",
    title: "Weed & Insect Detection",
    color: "#8B5E3C",
    accentLight: "#faf4ee",
    accentBorder: "#d4956a",
    image: "/assets/Weed.jpg",
    points: [
      "Targeted spot treatment for precise management",
      "Multi-species color-coded identification",
      "Crop input savings by up to 80%",
    ],
    tag: "Multi-color threat mapping",
    highlight: "80% input savings",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="3" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="20" cy="21" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16.5 19 L14 17M16.5 21 L14 21M16.5 23 L14 25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M23.5 19 L26 17M23.5 21 L26 21M23.5 23 L26 25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "2.3",
    title: "Off-Type Detection",
    color: "#454411",
    accentLight: "#f5f4e8",
    accentBorder: "#c8c67a",
    image: "/assets/offtype.jpg",
    points: [
      "Hybrid seed purity verification",
      "Minimize cost of production up to 80%",
      "Rouging optimization & automation",

    ],
    tag: "Single plant anomaly",
    highlight: "80% cost reduction",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="3" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M20 26 C20 26 13 23 14 15 C14 15 22 15 23 22 C23 22 23 24 20 26Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
        <path d="M20 26 L17 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "2.4",
    title: "Yield Estimation",
    color: "#8B5E3C",
    accentLight: "#faf4ee",
    accentBorder: "#d4956a",
    image: "/assets/Yield Estimation.jpeg",
    points: [
      "Optimized supply chain planning",
      "Seed storage optimization",
      "Sales & harvest planning support",

    ],
    tag: "HD pod-level detection",
    highlight: null,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="3" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M14 21 C14 17 17 14 20 14 C23 14 26 17 26 21 C26 24 23 27 20 27 C17 27 14 24 14 21Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="17.5" cy="21" r="1.5" fill="currentColor" fillOpacity="0.7" />
        <circle cx="20.5" cy="20" r="1.5" fill="currentColor" fillOpacity="0.7" />
        <circle cx="23" cy="21" r="1.5" fill="currentColor" fillOpacity="0.7" />
      </svg>
    ),
  },
];

export default function CoreValues() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleCards((prev) => new Set([...prev, index])), index * 130);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        marginTop: "48px",
        paddingTop: "80px",
        paddingBottom: "88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hdrFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cv-hdr-show { animation: hdrFade 0.7s ease forwards; }
        .cv-hdr-hide { opacity: 0; }
        .cv-card-show { animation: fadeUp 0.6s ease forwards; }
        .cv-card-hide { opacity: 0; }
        .cv-card {
          transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s ease;
        }
        .cv-card:hover { transform: translateY(-7px); }
        .cv-img-inner { transition: transform 0.5s ease; }
        .cv-card:hover .cv-img-inner { transform: scale(1.07); }
        .cv-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
        .cv-tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 11px; border-radius: 999px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
        }
        .grid-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      <div className="grid-dots" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(190,169,80,0.09) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: "5%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,94,60,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative" }}>

        <div className={headerVisible ? "cv-hdr-show" : "cv-hdr-hide"} style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(190,169,80,0.13)",
            border: "1px solid rgba(190,169,80,0.35)",
            color: "#BEA950", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "999px", marginBottom: "18px",
          }}>
            Core Capabilities
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)", fontWeight: 800, color: "#f5f2e8", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "14px" }}>
            Four Pillars of{" "}<span style={{ color: "#BEA950" }}>Precision Agriculture</span>
          </h2>
          <p style={{ color: "#9a9878", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.75 }}>
            Cutting-edge aerial intelligence that transforms how Canadian farmers make decisions — from seed to harvest.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 22 }}>
            <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #BEA950)" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#BEA950" }} />
            <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, #BEA950, transparent)" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))", gap: "28px" }}>
          {coreValues.map((val, i) => (
            <div
              key={val.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              className={`cv-card ${visibleCards.has(i) ? "cv-card-show" : "cv-card-hide"}`}
              style={{
                background: "#FDFCF5", borderRadius: "20px", overflow: "hidden",
                border: `1.5px solid ${activeIndex === i ? val.color + "45" : "rgba(240,237,220,1)"}`,
                boxShadow: activeIndex === i ? `0 24px 60px rgba(0,0,0,0.38), 0 0 0 1.5px ${val.color}22` : "0 6px 28px rgba(0,0,0,0.28)",
                cursor: "pointer",
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Image area */}
              <div style={{ position: "relative", width: "100%", height: "290px", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${val.accentLight} 0%, #dedad0 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ color: val.color, opacity: 0.15, transform: "scale(2.5)" }}>{val.icon}</div>
                </div>
                <Image src={val.image} alt={val.title} fill className="cv-img-inner" style={{ objectFit: "cover" }} sizes="(min-width:768px) 50vw, 100vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,32,9,0.6) 0%, rgba(30,32,9,0.1) 45%, transparent 100%)" }} />
                {/* Tag only — id badge removed */}
                <div className="cv-tag" style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(253,252,245,0.92)", color: val.color, border: `1px solid ${val.accentBorder}`, backdropFilter: "blur(8px)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: val.color }} />
                  {val.tag}
                </div>
              </div>

              {/* Content — subtitle removed */}
              <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                  <h3 style={{ color: "#2d2e0a", fontSize: "1.2rem", fontWeight: 800, lineHeight: 1.25 }}>{val.title}</h3>
                  <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "12px", background: val.accentLight, border: `1.5px solid ${val.accentBorder}`, color: val.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {val.icon}
                  </div>
                </div>

                <div style={{ height: 1, margin: "10px 0", background: `linear-gradient(90deg, ${val.color}35, transparent)` }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                  {val.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div className="cv-dot" style={{ background: val.color, marginTop: 7 }} />
                      <span style={{ color: "#555", fontSize: "13px", lineHeight: 1.5 }}>{pt}</span>
                    </li>
                  ))}
                </ul>

                {val.highlight && (
                  <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 7, background: val.accentLight, border: `1.5px solid ${val.accentBorder}`, color: val.color, borderRadius: "10px", padding: "7px 14px", fontSize: "13px", fontWeight: 700 }}>
                    <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: 14, height: 14 }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {val.highlight}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}