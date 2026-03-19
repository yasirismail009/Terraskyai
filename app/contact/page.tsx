export default function ContactPage() {
  return (
    <div
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-10 py-16"
      style={{
        background: "linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');
        .c-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        @keyframes c-spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes c-pulse { 0%,100% { opacity:0.45; } 50% { opacity:0.85; } }
        .c-ring1 { animation: c-spin  26s linear infinite; }
        .c-ring2 { animation: c-spin  20s linear infinite reverse; }
        .c-glow  { animation: c-pulse  4s ease-in-out infinite; }
        .c-glow2 { animation: c-pulse  4s ease-in-out infinite; animation-delay: 2s; }
        .c-detail {
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 14px 16px;
          text-decoration: none;
          transition: transform 0.25s, background 0.25s, border-color 0.25s;
        }
        .c-detail:hover {
          transform: translateX(6px);
          background: rgba(190,169,80,0.1);
          border-color: rgba(190,169,80,0.3);
        }
        .c-input {
          width: 100%; background: #f8f7f0;
          border: 1.5px solid #ddd9c8; border-radius: 10px;
          padding: 12px 16px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; color: #2d2e0a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .c-input:focus {
          border-color: #454411;
          box-shadow: 0 0 0 3px rgba(69,68,17,0.1);
          background: #fff;
        }
        .c-input::placeholder { color: #b0ac90; }
        .c-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #8B5E3C; margin-bottom: 6px; display: block;
        }
        .c-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #454411; color: #f5f2e8;
          border: none; border-radius: 12px; padding: 14px 30px;
          font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          box-shadow: 0 4px 20px rgba(69,68,17,0.45);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.02em;
        }
        .c-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(69,68,17,0.55);
          background: #5a5a16;
        }
        @media (max-width: 800px) {
          .c-main-grid { grid-template-columns: 1fr !important; }
          .c-two-col   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="c-dot-grid" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
      <div className="c-glow"  style={{ position:"absolute", top:"-100px", left:"-80px", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(190,169,80,0.1) 0%, transparent 65%)", filter:"blur(50px)", pointerEvents:"none" }} />
      <div className="c-glow2" style={{ position:"absolute", bottom:"-100px", right:"-80px", width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,94,60,0.09) 0%, transparent 65%)", filter:"blur(50px)", pointerEvents:"none" }} />
      <div className="c-ring1" style={{ position:"absolute", top:"6%", right:"3%", width:200, height:200, borderRadius:"50%", border:"1px dashed rgba(190,169,80,0.15)", pointerEvents:"none" }} />
      <div className="c-ring2" style={{ position:"absolute", bottom:"8%", left:"2%", width:150, height:150, borderRadius:"50%", border:"1px dashed rgba(139,94,60,0.13)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative" }}>

        <div style={{ textAlign:"center", marginBottom:48 }}>
          <span style={{ display:"inline-block", background:"rgba(190,169,80,0.12)", border:"1px solid rgba(190,169,80,0.3)", color:"#BEA950", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"5px 16px", borderRadius:"999px", marginBottom:16, fontFamily:"'DM Sans',sans-serif" }}>
            Get In Touch
          </span>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:700, color:"#f5f2e8", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:12 }}>
            Let's Grow Something{" "}<em style={{ color:"#BEA950" }}>Together</em>
          </h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#9a9878", fontSize:"1rem", maxWidth:500, margin:"0 auto", lineHeight:1.75 }}>
            Share your goals and challenges — our team will respond with tailored recommendations for your operation.
          </p>
        </div>

        <div className="c-main-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:24, alignItems:"start" }}>

          {/* LEFT */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:"rgba(253,252,245,0.05)", border:"1.5px solid rgba(190,169,80,0.18)", borderRadius:20, padding:"40px 24px 48px", backdropFilter:"blur(12px)" }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#BEA950", marginBottom:8 }}>Contact Info</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.7rem", fontWeight:700, color:"#f5f2e8", lineHeight:1.25, marginBottom:20 }}>
                We're here to help your farm thrive
              </h2>

              <a href="tel:+15875741601" className="c-detail" style={{ marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:"rgba(190,169,80,0.12)", border:"1px solid rgba(190,169,80,0.25)", color:"#BEA950", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width:18, height:18 }}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9a9878", fontWeight:500, marginBottom:2 }}>Call us</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#f0ede0", fontWeight:600 }}>+1 (587) 574-1601</p>
                </div>
              </a>

              <a href="mailto:support@terraskyai.com" className="c-detail" style={{ marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:"rgba(190,169,80,0.12)", border:"1px solid rgba(190,169,80,0.25)", color:"#BEA950", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width:18, height:18 }}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9a9878", fontWeight:500, marginBottom:2 }}>Email</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#f0ede0", fontWeight:600 }}>support@terraskyai.com</p>
                </div>
              </a>

              <a href="#" className="c-detail" style={{ marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:"rgba(190,169,80,0.12)", border:"1px solid rgba(190,169,80,0.25)", color:"#BEA950", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width:18, height:18 }}><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9a9878", fontWeight:500, marginBottom:2 }}>Location</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#f0ede0", fontWeight:600 }}>Lethbridge, Alberta, Canada</p>
                </div>
              </a>

              <a href="#" className="c-detail">
                <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:"rgba(190,169,80,0.12)", border:"1px solid rgba(190,169,80,0.25)", color:"#BEA950", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width:18, height:18 }}><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V11h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9a9878", fontWeight:500, marginBottom:2 }}>Head Office</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#f0ede0", fontWeight:600 }}>Mississauga, Ontario, Canada</p>
                </div>
              </a>

            </div>
          </div>

          {/* RIGHT: Form */}
          <div style={{ background:"#FDFCF5", borderRadius:24, padding:"36px 32px", boxShadow:"0 24px 64px rgba(0,0,0,0.35)", border:"1.5px solid rgba(240,237,220,1)" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#8B5E3C", marginBottom:6 }}>Send a Message</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.8rem", fontWeight:700, color:"#2d2e0a", lineHeight:1.2, marginBottom:24 }}>
              Tell us about your farm
            </h2>

            <div className="c-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
              <div>
                <label className="c-label" htmlFor="name">Full Name</label>
                <input id="name" type="text" placeholder="Your full name" className="c-input" />
              </div>
              <div>
                <label className="c-label" htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" className="c-input" />
              </div>
            </div>

            <div style={{ marginBottom:14 }}>
              <label className="c-label" htmlFor="interest">Area of Interest</label>
              <select id="interest" className="c-input" style={{ appearance:"none", cursor:"pointer" }}>
                <option value="">Select a service…</option>
                <option>Plant Stand Count</option>
                <option>Weed &amp; Insect Detection</option>
                <option>Off-Type Detection</option>
                <option>Yield Estimation</option>
                <option>All Services</option>
              </select>
            </div>

            <div style={{ marginBottom:24 }}>
              <label className="c-label" htmlFor="message">Tell us about your farm and what you need</label>
              <textarea id="message" placeholder="Acres, crops, current challenges, and the outcomes you're targeting…" rows={5} className="c-input" style={{ resize:"vertical" }} />
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
              <button className="c-btn">
                Send Message
                <svg viewBox="0 0 24 24" fill="none" style={{ width:16, height:16 }}><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#b0ac90" }}>
                We respond within 24 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}