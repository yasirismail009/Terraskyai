import Image from "next/image";
import CoreValues from "@/app/components/CoreValues";

export const AZURE_BASE_URL = 'https://skysightappstorage.blob.core.windows.net/devstorage';
export const AZURE_SAS_TOKEN = '?sp=racwdl&st=2026-01-28T07:09:45Z&se=2026-02-27T15:24:45Z&spr=https&sv=2024-11-04&sr=c&sig=2a%2BRyb1L6GOWdqb8tm2fP1IzAC%2F%2FIjOMq06BDVSxxPM%3D';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E6E2D6] relative overflow-hidden">

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 font-sans overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-fill z-0">
          <source src={`${AZURE_BASE_URL}/Videos/Landing_Page${AZURE_SAS_TOKEN}`} type="video/mp4" />
          <source src={`${AZURE_BASE_URL}/Videos/Landing_Page.webm${AZURE_SAS_TOKEN}`} type="video/webm" />
          <source src={`${AZURE_BASE_URL}/Videos/Landing_Page.ogv${AZURE_SAS_TOKEN}`} type="video/ogg" />
        </video>
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="relative z-20 mx-auto text-center items-center justify-center flex flex-col">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-lg">
            Flights to Insights
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium rounded-lg w-fit bg-[#E6E2D6] text-[#454411] mb-3 leading-tight tracking-tight drop-shadow-lg">
            <span className="px-2 py-1">Making Precision Farming Sustainable and Profitable</span>
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed mb-6 font-normal drop-shadow-md">
            Leverage advanced drone imagery and AI technology to optimize your crop scouting, increase yields, and make data-driven decisions for your farm.
          </p>
        </div>
      </section>

       {/* ── Our Products ── */}
      <section
        style={{
          background: "#FDFCF5",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

          @keyframes prod-fadeUp {
            from { opacity:0; transform:translateY(40px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes prod-float {
            0%,100% { transform:translateY(0px); }
            50%     { transform:translateY(-8px); }
          }
          @keyframes prod-shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }

          .prod-section-bg {
            background-image: radial-gradient(circle, rgba(69,68,17,0.04) 1px, transparent 1px);
            background-size: 32px 32px;
          }

          .prod-card {
            border-radius: 24px;
            padding: 40px 36px;
            position: relative;
            overflow: hidden;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s cubic-bezier(0.25,1,0.5,1), box-shadow 0.4s ease;
            animation: prod-fadeUp 0.7s ease both;
          }
          .prod-card:hover {
            transform: translateY(-8px);
          }

          .prod-card-1 {
            background: linear-gradient(145deg, #454411 0%, #5a5a16 60%, #333308 100%);
            box-shadow: 0 8px 40px rgba(69,68,17,0.35);
            animation-delay: 0.1s;
          }
          .prod-card-1:hover {
            box-shadow: 0 20px 60px rgba(69,68,17,0.5);
          }

          .prod-card-2 {
            background: linear-gradient(145deg, #2d2e0a 0%, #454411 50%, #8B5E3C 100%);
            box-shadow: 0 8px 40px rgba(45,46,10,0.4);
            animation-delay: 0.25s;
          }
          .prod-card-2:hover {
            box-shadow: 0 20px 60px rgba(45,46,10,0.55);
          }

          .prod-tag {
            display: inline-flex; align-items: center; gap: 6px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 999px;
            padding: 4px 12px;
            font-family: 'DM Sans', sans-serif;
            font-size: 11px; font-weight: 600;
            letter-spacing: 0.1em; text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            margin-bottom: 20px;
            width: fit-content;
          }

          .prod-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(2.4rem, 4vw, 3.2rem);
            font-weight: 700;
            color: #fff;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 14px;
          }

          .prod-desc {
            font-family: 'DM Sans', sans-serif;
            font-size: 15px;
            line-height: 1.75;
            color: rgba(255,255,255,0.8);
            flex-grow: 1;
            margin-bottom: 28px;
          }

          .prod-features {
            display: flex; flex-direction: column; gap: 8px;
            margin-bottom: 32px;
          }
          .prod-feature {
            display: flex; align-items: center; gap: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 13px; color: rgba(255,255,255,0.75);
          }
          .prod-feature-dot {
            width: 5px; height: 5px; border-radius: 50%;
            background: #BEA950; flex-shrink: 0;
          }

          .prod-cta {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(255,255,255,0.12);
            border: 1.5px solid rgba(255,255,255,0.25);
            border-radius: 12px;
            padding: 12px 22px;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px; font-weight: 600;
            color: #fff;
            width: fit-content;
            transition: background 0.25s, border-color 0.25s, gap 0.25s;
          }
          .prod-card:hover .prod-cta {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            gap: 14px;
          }

          .prod-icon-wrap {
            position: absolute;
            top: -20px; right: -20px;
            width: 140px; height: 140px;
            border-radius: 50%;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.07);
          }
          .prod-icon-wrap-2 {
            position: absolute;
            bottom: -30px; right: 30px;
            width: 100px; height: 100px;
            border-radius: 50%;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
          }

          .prod-badge {
            position: absolute;
            top: 24px; right: 24px;
            background: #BEA950;
            color: #1a1d06;
            border-radius: 10px;
            padding: 6px 12px;
            font-family: 'DM Sans', sans-serif;
            font-size: 11px; font-weight: 800;
            letter-spacing: 0.05em;
          }

          .prod-shimmer-line {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(190,169,80,0.6), transparent);
            background-size: 200% auto;
            animation: prod-shimmer 3s linear infinite;
            margin-bottom: 24px;
          }

          @media (max-width: 768px) {
            .prod-grid { grid-template-columns: 1fr !important; }
            .prod-card-inner { grid-template-columns: 1fr !important; gap: 32px !important; padding: 32px 24px !important; }
            .prod-feat-grid  { grid-template-columns: 1fr 1fr !important; }
            .prod-badge { top: 16px; right: 16px; }
          }
          @media (max-width: 480px) {
            .prod-feat-grid  { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Dot bg */}
        <div className="prod-section-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
        {/* Glow */}
        <div style={{ position:"absolute", top:-80, left:"20%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(69,68,17,0.06) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <span style={{ display:"inline-block", background:"rgba(69,68,17,0.08)", border:"1px solid rgba(69,68,17,0.2)", color:"#454411", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"5px 16px", borderRadius:"999px", marginBottom:16, fontFamily:"'DM Sans',sans-serif" }}>
              Our Products
            </span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:"#2d2e0a", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:12 }}>
              Tools Built for the{" "}<em style={{ color:"#8B5E3C" }}>Modern Farm</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#7a7860", fontSize:"1rem", maxWidth:480, margin:"0 auto", lineHeight:1.75 }}>
              Our flagship platform — turning aerial drone data into actionable decisions that grow your yield and bottom line.
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:20 }}>
              <div style={{ height:1, width:56, background:"linear-gradient(90deg,transparent,#454411)" }} />
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#454411" }} />
              <div style={{ height:1, width:56, background:"linear-gradient(90deg,#454411,transparent)" }} />
            </div>
          </div>

          {/* Single wide SkySight card */}
          <a
            href="/products/skysight"
            className="prod-card prod-card-2 prod-card-inner"
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", padding:"60px 56px 52px" }}
          >
            <div className="prod-icon-wrap" />
            <div className="prod-icon-wrap-2" />
            <div className="prod-badge">Web Portal</div>

            {/* Left: text */}
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div className="prod-tag" style={{ marginBottom:24 }}>
                <svg viewBox="0 0 16 16" fill="none" style={{ width:10, height:10 }}>
                  <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 8h12M8 2c-1.5 2-2 4-2 6s.5 4 2 6M8 2c1.5 2 2 4 2 6s-.5 4-2 6" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Precision Analytics
              </div>

              <h3 className="prod-title" style={{ fontSize:"clamp(2.8rem,5vw,4rem)", marginBottom:20 }}>SkySight</h3>

              <div className="prod-shimmer-line" />

              <p className="prod-desc" style={{ fontSize:16, marginBottom:32 }}>
                All-in-one digital farming portal for seamless farm management, unlocking efficiency and success from anywhere, anytime.
              </p>

              <div className="prod-cta">
                Explore SkySight
                <svg viewBox="0 0 20 20" fill="none" style={{ width:16, height:16 }}>
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Right: feature grid */}
            <div className="prod-feat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
              {[
                { label:"Real-time field monitoring",             desc:"Live data from every corner of your farm" },
                { label:"Drone data integration",                 desc:"Seamless aerial imagery processing" },
                { label:"Cloud-based portal",                     desc:"Access from anywhere, anytime" },
                { label:"AI-powered analytics",                   desc:"Turn raw data into clear decisions" },
                { label:"Computer Vision Analytics and Reports",  desc:"In-depth insights and simplified report generation" },
                { label:"AI Powered Crop Intelligence",           desc:"Smart recommendations for every growth stage" },
              ].map((f,i) => (
                <div key={i} style={{
                  background:"rgba(255,255,255,0.07)",
                  border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:14, padding:"16px 14px",
                  transition:"background 0.25s, transform 0.25s",
                }}>
                  <span style={{ fontSize:22, display:"block", marginBottom:8 }}></span>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"#fff", marginBottom:4 }}>{f.label}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </a>
        </div>
      </section>

      
       <CoreValues />

      {/* ── About Us ── */}
      <section
        id="about"
        className="scroll-mt-20"
        style={{ background: "#FDFCF5", padding: "96px 24px", position: "relative", overflow: "hidden" }}
      >
        <style>{`
          .ab-dot-bg {
            background-image: radial-gradient(circle, rgba(69,68,17,0.045) 1px, transparent 1px);
            background-size: 30px 30px;
          }
          @keyframes ab-fadeLeft {
            from { opacity:0; transform:translateX(-36px); }
            to   { opacity:1; transform:translateX(0); }
          }
          @keyframes ab-fadeRight {
            from { opacity:0; transform:translateX(36px); }
            to   { opacity:1; transform:translateX(0); }
          }
          .ab-left  { animation: ab-fadeLeft  0.75s 0.1s ease both; }
          .ab-right { animation: ab-fadeRight 0.75s 0.2s ease both; }

          .ab-stat {
            background: #fff;
            border: 1.5px solid rgba(69,68,17,0.1);
            border-radius: 16px;
            padding: 20px 18px;
            transition: transform 0.25s, box-shadow 0.25s;
          }
          .ab-stat:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(69,68,17,0.1);
          }

          .ab-pill {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(69,68,17,0.06);
            border: 1px solid rgba(69,68,17,0.14);
            border-radius: 999px; padding: 6px 14px;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px; font-weight: 600; color: #454411;
            letter-spacing: 0.04em;
          }

          .ab-cta {
            display: inline-flex; align-items: center; gap: 10px;
            background: #454411; color: #f5f2e8;
            border-radius: 12px; padding: 14px 28px;
            font-family: 'DM Sans', sans-serif;
            font-size: 15px; font-weight: 600;
            box-shadow: 0 4px 20px rgba(69,68,17,0.35);
            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
            text-decoration: none;
          }
          .ab-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(69,68,17,0.45);
            background: #5a5a16;
          }

          .ab-img-wrap {
            position: relative; border-radius: 24px; overflow: hidden;
            box-shadow: 0 24px 64px rgba(69,68,17,0.18);
            border: 2px solid rgba(69,68,17,0.08);
            aspect-ratio: 4/3;
          }

          @media (max-width: 768px) {
            .ab-grid { grid-template-columns: 1fr !important; }
            .ab-stats { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>

        {/* Bg dots + glows */}
        <div className="ab-dot-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:-80, left:"-5%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(190,169,80,0.07) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, right:"5%", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,94,60,0.06) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <div className="ab-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

            {/* LEFT — Text */}
            <div className="ab-left">
              <span style={{
                display:"inline-block",
                background:"rgba(69,68,17,0.08)", border:"1px solid rgba(69,68,17,0.18)",
                color:"#454411", fontSize:11, fontWeight:700,
                letterSpacing:"0.14em", textTransform:"uppercase",
                padding:"5px 16px", borderRadius:"999px", marginBottom:20,
                fontFamily:"'DM Sans',sans-serif",
              }}>
                About Us
              </span>

              <h2 style={{
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"clamp(2.2rem,4vw,3.2rem)",
                fontWeight:700, color:"#2d2e0a",
                lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:20,
              }}>
                Powering Smarter Fields with{" "}
                <em style={{ color:"#8B5E3C" }}>Practical AI</em>
              </h2>

              <p style={{
                fontFamily:"'DM Sans',sans-serif",
                fontSize:16, color:"#545454",
                lineHeight:1.8, marginBottom:32,
              }}>
                TerraSkyAI is an innovative AgriTech company leveraging Artificial Intelligence and Machine Learning to revolutionize agriculture — empowering farmers worldwide with optimized operations and improved crop yields.
              </p>

              {/* Pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36 }}>
                {["AI & Machine Learning","Drone Imagery","Precision Analytics","Sustainable Farming"].map((p) => (
                  <span key={p} className="ab-pill">
                    <svg viewBox="0 0 8 8" fill="#454411" style={{ width:6, height:6, borderRadius:"50%", flexShrink:0 }}><circle cx="4" cy="4" r="4"/></svg>
                    {p}
                  </span>
                ))}
              </div>

              <a href="/vision-mission" className="ab-cta">
                Learn More
                <svg viewBox="0 0 20 20" fill="none" style={{ width:16, height:16 }}>
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* RIGHT — Image + Stats */}
            <div className="ab-right" style={{ display:"flex", flexDirection:"column", gap:20 }}>

              {/* Image */}
              <div className="ab-img-wrap">
                <img
                  src="/assets/img_1054.jpeg"
                  alt="TerraSkyAI in action"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(30,32,9,0.4) 0%, transparent 55%)" }} />
                <div style={{
                  position:"absolute", bottom:20, left:20, right:20,
                  fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:"1.2rem", fontWeight:700, color:"#fff",
                  lineHeight:1.3,
                }}>
                  From Flights to Insights
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section
        id="why-us"
        className="scroll-mt-20"
        style={{
          background: "#FDFCF5",
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          .wu-dot-grid {
            background-image: radial-gradient(circle, rgba(69,68,17,0.055) 1px, transparent 1px);
            background-size: 30px 30px;
          }

          @keyframes wu-fadeLeft {
            from { opacity:0; transform:translateX(-40px); }
            to   { opacity:1; transform:translateX(0); }
          }
          @keyframes wu-fadeRight {
            from { opacity:0; transform:translateX(40px); }
            to   { opacity:1; transform:translateX(0); }
          }
          @keyframes wu-countUp {
            from { opacity:0; transform:translateY(16px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes wu-barFill {
            from { width: 0%; }
            to   { width: var(--bar-w); }
          }
          @keyframes wu-pulse-ring {
            0%   { transform:scale(1);   opacity:0.6; }
            100% { transform:scale(1.6); opacity:0; }
          }

          .wu-video-wrap {
            animation: wu-fadeLeft 0.75s 0.1s ease both;
          }
          .wu-content {
            animation: wu-fadeRight 0.75s 0.2s ease both;
          }

          .wu-stat {
            animation: wu-countUp 0.6s ease both;
          }
          .wu-stat:nth-child(1) { animation-delay: 0.35s; }
          .wu-stat:nth-child(2) { animation-delay: 0.5s; }
          .wu-stat:nth-child(3) { animation-delay: 0.65s; }

          .wu-feature-item {
            display: flex; align-items: flex-start; gap: 14px;
            padding: 14px 16px; border-radius: 12px;
            border: 1px solid transparent;
            transition: background 0.25s, border-color 0.25s, transform 0.25s;
            cursor: default;
          }
          .wu-feature-item:hover {
            background: rgba(69,68,17,0.04);
            border-color: rgba(69,68,17,0.1);
            transform: translateX(5px);
          }

          .wu-icon-circle {
            width: 38px; height: 38px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            transition: transform 0.25s;
          }
          .wu-feature-item:hover .wu-icon-circle {
            transform: scale(1.1) rotate(-5deg);
          }

          .wu-bar-track {
            height: 4px; border-radius: 999px;
            background: rgba(69,68,17,0.08);
            overflow: hidden; margin-top: 6px;
          }
          .wu-bar-fill {
            height: 100%; border-radius: 999px;
            background: linear-gradient(90deg, #454411, #8B5E3C);
            animation: wu-barFill 1.2s 0.5s ease both;
          }

          .wu-video-badge {
            position: absolute;
            background: #FDFCF5;
            border-radius: 14px;
            padding: 10px 14px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            border: 1px solid rgba(69,68,17,0.1);
            display: flex; align-items: center; gap: 10px;
            animation: wu-countUp 0.6s ease both;
          }

          .wu-pulse-dot {
            position: relative; width:10px; height:10px;
          }
          .wu-pulse-dot::before {
            content:''; position:absolute; inset:0;
            border-radius:50%; background:#454411;
          }
          .wu-pulse-dot::after {
            content:''; position:absolute; inset:0;
            border-radius:50%; background:#454411;
            animation: wu-pulse-ring 1.8s ease-out infinite;
          }

          @media (max-width:768px) {
            .wu-main-grid { grid-template-columns:1fr !important; }
            .wu-stats-row { grid-template-columns:1fr 1fr !important; }
          }
        `}</style>

        {/* Bg texture */}
        <div className="wu-dot-grid" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
        {/* Glow */}
        <div style={{ position:"absolute", top:-60, right:"10%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,94,60,0.06) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, left:"5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(69,68,17,0.05) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative" }}>

          {/* Label */}
          <div style={{ marginBottom:48 }}>
            <span style={{ display:"inline-block", background:"rgba(69,68,17,0.07)", border:"1px solid rgba(69,68,17,0.18)", color:"#454411", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"5px 16px", borderRadius:"999px", fontFamily:"'DM Sans',sans-serif" }}>
              Why Us?
            </span>
          </div>

          {/* Main 2-col */}
          <div className="wu-main-grid" style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:52, alignItems:"stretch" }}>

            {/* LEFT — Video with floating badges */}
            <div className="wu-video-wrap" style={{ position:"relative", display:"flex", flexDirection:"column" }}>

              {/* Video */}
<div style={{ position:"relative", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", height:"100%" }}>
  <video autoPlay muted loop playsInline style={{ width:"100%", height:"100%", minHeight:520, objectFit:"cover", display:"block" }}>
    <source src="https://res.cloudinary.com/dtv4ky9cu/video/upload/v1773917961/Website-video-1-small_pcllip.mp4" type="video/mp4" />
  </video>
  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(30,32,9,0.35) 0%, transparent 50%)" }} />
</div>

              

              {/* Decorative border frame */}
              <div style={{ position:"absolute", top:-8, left:-8, right:8, bottom:8, borderRadius:28, border:"1.5px dashed rgba(69,68,17,0.12)", pointerEvents:"none", zIndex:-1 }} />
            </div>

            {/* RIGHT — Content */}
            <div className="wu-content">
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,3.5vw,2.8rem)", fontWeight:700, color:"#2d2e0a", lineHeight:1.2, letterSpacing:"-0.02em", marginBottom:16 }}>
                Trusted, AI-driven partner for{" "}
                <em style={{ color:"#8B5E3C" }}>smarter farming</em>
              </h2>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#545454", lineHeight:1.8, marginBottom:28 }}>
                TerraSkyAI blends satellite imagery and advanced machine learning to deliver actionable insights that cut waste, improve yields, and reduce costs.
              </p>

              {/* Animated stats row */}
              <div className="wu-stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:28 }}>
                {[
                  { val:"80%", label:"Input savings", bar:"80" },
                  { val:"3×",  label:"Faster scouting", bar:"65" },
                  { val:"99%", label:"Detection accuracy", bar:"99" },
                ].map((s) => (
                  <div key={s.val} className="wu-stat" style={{ background:"rgba(69,68,17,0.04)", border:"1px solid rgba(69,68,17,0.1)", borderRadius:12, padding:"12px 14px" }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.8rem", fontWeight:700, color:"#454411", lineHeight:1 }}>{s.val}</p>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#8B5E3C", fontWeight:500, marginTop:3 }}>{s.label}</p>
                    <div className="wu-bar-track">
                      <div className="wu-bar-fill" style={{ "--bar-w": `${s.bar}%` } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature list */}
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                {[
                  { icon:"🌱", label:"Real-time visibility into crop health.", color:"rgba(69,68,17,0.08)" },
                  { icon:"🔍", label:"Early detection of pests and stress for faster intervention.", color:"rgba(139,94,60,0.08)" },
                  { icon:"💧", label:"Precision irrigation guidance to save water and inputs.", color:"rgba(69,68,17,0.08)" },
                  { icon:"🤝", label:"Dedicated experts focused on outcomes, not just tools.", color:"rgba(139,94,60,0.08)" },
                ].map((f, i) => (
                  <div key={i} className="wu-feature-item">
                    <div className="wu-icon-circle" style={{ background: f.color }}>
                      <span style={{ fontSize:16 }}>{f.icon}</span>
                    </div>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#454411", lineHeight:1.6, paddingTop:2 }}>{f.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

     
    

    </div>
  );
}