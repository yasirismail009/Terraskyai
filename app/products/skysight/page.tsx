import Image from "next/image";
import {
  Search, Leaf, FileText, BarChart2, Bug, TrendingUp,
  Heart, Map, ShieldCheck, Settings, Monitor
} from "lucide-react";

const portalFeatures = [
  { title: "Pre-Scout",                   Icon: Search      },
  { title: "Volunteer Canola Detection",  Icon: Leaf        },
  { title: "RT Rouging Prescription",     Icon: FileText    },
  { title: "Plant Stand Count Analytics", Icon: BarChart2   },
  { title: "Insect & Weed Detection",     Icon: Bug         },
  { title: "Yield Estimation",            Icon: TrendingUp  },
  { title: "Crop Health",                 Icon: Heart       },
  { title: "Field Mapping",               Icon: Map         },
  { title: "No REI Exposure",             Icon: ShieldCheck },
  { title: "Manage Operations",           Icon: Settings    },
  { title: "User-friendly Interface",     Icon: Monitor     },
];

const reportFeatures = [
  { title: "High Resolution Map (1cm to 5cm)", image: "/assets/Picture1.png" },
  { title: "Crop Area and Boundary",           image: "/assets/fishnet.jpeg" },
  { title: "Weed Detection for Spot-treatment",image: "/assets/Weed1.jpg" },
  { title: "Germination Map (Plant Count)",    image: "/assets/Picture4.png" },
  { title: "Off-type detection",               image: "/assets/vc detection2.jpg" },
  { title: "Male and Female Parent Lines",     image: "/assets/male female bay.jpeg" },
  { title: "Disease detection",                image: "/assets/Picture7.png" },
  { title: "Insect defoliation detection",     image: "/assets/Picture8.png" },
  { title: "Water Logging Zones",              image: "/assets/Picture9.png" },
  { title: "Crop Health Zones",                image: "/assets/Picture10.png"},
  { title: "Individual Plant Health",          image: "/assets/Picture11.png"},
  { title: "Flight Mission Automation",        image: "/assets/Picture12.png"},
];

export default function SkySightPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FDFCF5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes ss-fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ss-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .ss-fade   { animation: ss-fadeUp 0.7s ease both; }
        .ss-fade-2 { animation: ss-fadeUp 0.7s 0.15s ease both; }

        .ss-dot-bg {
          background-image: radial-gradient(circle, rgba(69,68,17,0.045) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .ss-feat-card {
          background: #fff;
          border: 1.5px solid rgba(69,68,17,0.1);
          border-radius: 18px;
          padding: 28px 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          cursor: default;
        }
        .ss-feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(69,68,17,0.13);
          border-color: rgba(69,68,17,0.28);
        }
        .ss-feat-icon {
          width: 58px; height: 58px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(69,68,17,0.09), rgba(139,94,60,0.09));
          border: 1px solid rgba(69,68,17,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .ss-feat-card:hover .ss-feat-icon {
          background: linear-gradient(135deg, rgba(69,68,17,0.15), rgba(139,94,60,0.15));
          transform: scale(1.08);
        }

        .ss-report-card {
          background: #fff;
          border: 1.5px solid rgba(69,68,17,0.08);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          cursor: default;
        }
        .ss-report-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(69,68,17,0.14);
          border-color: rgba(69,68,17,0.22);
        }
        .ss-report-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .ss-report-card:hover .ss-report-img {
          transform: scale(1.04);
        }

        .ss-img-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ss-img-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5) !important;
        }

        .ss-section-tag {
          display: inline-block;
          background: rgba(69,68,17,0.08);
          border: 1px solid rgba(69,68,17,0.18);
          color: #454411;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 16px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 16px;
        }
        .ss-shimmer {
          height: 2px; border-radius: 999px;
          background: linear-gradient(90deg, transparent, #BEA950, #8B5E3C, transparent);
          background-size: 200% auto;
          animation: ss-shimmer 3s linear infinite;
        }

        @media (max-width: 900px) {
          .ss-feat-grid   { grid-template-columns: repeat(3, 1fr) !important; }
          .ss-report-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .ss-hero-text   { padding: 0 16px !important; }
          .ss-highres-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .ss-feat-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .ss-report-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ss-highres-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 overflow-hidden" style={{ minHeight: "88vh", paddingTop:80 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/assets/img_1054.jpeg')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg, rgba(30,32,9,0.75) 0%, rgba(69,68,17,0.58) 100%)" }} />
        <div className="ss-fade relative z-10 text-center" style={{ maxWidth: 800, padding: "0 24px" }}>
          <div style={{
            display:"inline-block", marginBottom:24,
            padding:"6px 20px", borderRadius:999,
            background:"rgba(190,169,80,0.15)", border:"1px solid rgba(190,169,80,0.35)",
            fontFamily:"'DM Sans',sans-serif", fontSize:17, fontWeight:700,
            letterSpacing:"0.14em", textTransform:"uppercase", color:"#BEA950",
          }}>
            Real-Time AI Portal & Dashboard
          </div>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(3.5rem,8vw,6rem)",
            fontWeight:700, color:"#fff",
            lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:20,
          }}>
            SkySight
          </h1>
          <p style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:"clamp(1rem,2.5vw,1.25rem)",
            color:"rgba(255,255,255,0.85)", lineHeight:1.7,
            maxWidth:560, margin:"0 auto",
          }}>
            All-in-one digital farming portal for seamless farm management — unlocking efficiency and success from anywhere, anytime.
          </p>
        </div>
      </section>

      {/* Portal Features */}
      <section className="ss-dot-bg" style={{ background:"#FDFCF5", padding:"clamp(48px,8vw,96px) 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(190,169,80,0.07) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="ss-fade" style={{ textAlign:"center", marginBottom:56 }}>
            <span className="ss-section-tag">Portal Features</span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(2rem,4vw,3rem)",
              fontWeight:700, color:"#2d2e0a",
              lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:16,
            }}>
              Everything You Need to{" "}
              <em style={{ color:"#8B5E3C" }}>Run Your Farm</em>
            </h2>
            <div className="ss-shimmer" style={{ maxWidth:180, margin:"0 auto" }} />
          </div>
          <div className="ss-feat-grid ss-fade-2" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {portalFeatures.map(({ title, Icon }, i) => (
              <div key={i} className="ss-feat-card">
                <div className="ss-feat-icon">
                  <Icon size={26} color="#454411" strokeWidth={1.7} />
                </div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, color:"#2d2e0a", lineHeight:1.4 }}>
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section style={{ background:"#fff", padding:"80px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="ss-fade" style={{ textAlign:"center", marginBottom:48 }}>
            <span className="ss-section-tag">Dashboard</span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight:700, color:"#2d2e0a", lineHeight:1.2,
            }}>
              Intuitive Interface,{" "}
              <em style={{ color:"#8B5E3C" }}>Powerful Insights</em>
            </h2>
          </div>
          <div style={{
            borderRadius:24, overflow:"hidden",
            boxShadow:"0 24px 80px rgba(69,68,17,0.15)",
            border:"1.5px solid rgba(69,68,17,0.1)",
          }}>
            <Image
              src="/assets/dashboard.png"
              alt="SkySight Dashboard"
              width={1200} height={800}
              style={{ width:"100%", height:"auto", display:"block" }}
            />
          </div>
        </div>
      </section>

      {/* Crop Insights & Reports */}
      <section className="ss-dot-bg" style={{ background:"#FDFCF5", padding:"96px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-60, left:"5%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,94,60,0.07) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="ss-fade" style={{ textAlign:"center", marginBottom:56 }}>
            <span className="ss-section-tag">Crop Insights & Reports</span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(2rem,4vw,3rem)",
              fontWeight:700, color:"#2d2e0a",
              lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:12,
            }}>
              Precision Analysis at{" "}
              <em style={{ color:"#8B5E3C" }}>Every Scale</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#7a7860", fontSize:"1rem", maxWidth:520, margin:"0 auto", lineHeight:1.75 }}>
              From high-resolution mapping to individual plant health — every insight you need, on demand.
            </p>
          </div>
          <div className="ss-report-grid ss-fade-2" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {reportFeatures.map((f, i) => (
              <div key={i} className="ss-report-card">
                <div style={{ overflow:"hidden" }}>
                  <Image src={f.image} alt={f.title} width={400} height={300} className="ss-report-img" />
                </div>
                <div style={{ padding:"14px 16px 18px" }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:"#2d2e0a", lineHeight:1.4 }}>
                    {f.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Resolution Imagery */}
      <section style={{
        background:"linear-gradient(160deg, #2a2d0f 0%, #454411 50%, #8B5E3C 100%)",
        padding:"96px 24px", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{
              display:"inline-block",
              background:"rgba(190,169,80,0.15)", border:"1px solid rgba(190,169,80,0.35)",
              color:"#BEA950", fontSize:11, fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase",
              padding:"5px 16px", borderRadius:999, marginBottom:20,
              fontFamily:"'DM Sans',sans-serif",
            }}>
              High Resolution Imagery
            </span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(2rem,4vw,3.2rem)",
              fontWeight:700, color:"#f5f2e8",
              lineHeight:1.15, maxWidth:700, margin:"0 auto 16px",
            }}>
              So clear, you can count the spots on a ladybug
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.7)", fontSize:"1rem", maxWidth:480, margin:"0 auto", lineHeight:1.75 }}>
              Ultra-high resolution mapping technology delivering precision down to the individual plant level.
            </p>
          </div>

          <div className="ss-highres-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
            {[
              { src:"/assets/vc detection.jpg",  alt:"VC Detection",            title:"VC Detection",            desc:"AI detects volunteer canola plants with pinpoint accuracy, enabling precise roguing and protecting seed purity.",   boxes:false },
              { src:"/assets/pods.jpeg",          alt:"Pod Count",               title:"Pod Count(Yield Estimation)",               desc:"Automated pod counting at the individual plant level delivers reliable yield estimates before harvest.", boxes:false },
              { src:"/assets/Weedd.jpg",      alt:"Weed Detection",          title:"Weed Detection",          desc:"Weed pressure mapped across every zone of your field, so treatment goes exactly where it's needed — nothing more.", boxes:false },
           
            ].map((img, i) => (
              <div key={i} className="ss-img-card" style={{
                borderRadius:20, overflow:"hidden",
                boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                border:"2px solid rgba(255,255,255,0.15)",
                position:"relative",
              }}>
                <div style={{ aspectRatio:"1", position:"relative" }}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit:"cover" }} sizes="33vw" />
                </div>
                <div style={{
                  padding:"18px 20px 20px",
                  background:"rgba(255,255,255,0.06)",
                  borderTop:"1px solid rgba(255,255,255,0.1)",
                }}>
                  <p style={{
                    fontFamily:"'Cormorant Garamond',Georgia,serif",
                    fontSize:"1.2rem", fontWeight:700,
                    color:"#f5f2e8", marginBottom:4,
                  }}>{img.title}</p>
                  <p style={{
                    fontFamily:"'DM Sans',sans-serif",
                    fontSize:13, color:"rgba(255,255,255,0.6)",
                    lineHeight:1.5,
                  }}>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}