import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Eye,
  MessageSquare,
  Workflow,
  Database,
  Compass,
  Cloud,
  ArrowRight,
  Search,
  PencilRuler,
  Hammer,
  Rocket,
  GraduationCap,
  ClipboardCheck,
  Blocks,
  Users,
  Plane,
  BarChart2,
  FileText,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '../../../i18n/navigation';

/* ───────── easy tweaks ───────── */
const HERO_PADDING = '160px 24px 170px'; // top | sides | bottom of the green banner
const HEADING_WEIGHT = 600; // 400 = light, 600 = semi-bold, 700 = bold

/* ───────── content keys ───────── */
const capabilities = ['vision', 'genai', 'agentic', 'data', 'strategy', 'mlops'] as const;
type CapKey = (typeof capabilities)[number];
const capIcons: Record<CapKey, LucideIcon> = {
  vision: Eye,
  genai: MessageSquare,
  agentic: Workflow,
  data: Database,
  strategy: Compass,
  mlops: Cloud,
};

const steps = [
  { key: 'discover', Icon: Search },
  { key: 'design', Icon: PencilRuler },
  { key: 'build', Icon: Hammer },
  { key: 'deploy', Icon: Rocket },
  { key: 'enable', Icon: GraduationCap },
] as const;

const engage = [
  { key: 'assessment', Icon: ClipboardCheck, level: 1 },
  { key: 'custom', Icon: Blocks, level: 2 },
  { key: 'advisory', Icon: Users, level: 3 },
] as const;

const industries = ['agriculture', 'community', 'enterprise'] as const;
type IndKey = (typeof industries)[number];

const engineering = [
  { key: 'skysight', flow: [Plane, Eye, BarChart2] },
  { key: 'knowledge', flow: [FileText, Search, MessageSquare] },
  { key: 'reporting', flow: [Database, ListChecks, ShieldCheck] },
] as const;

/* ───────── colours used in the illustrations ───────── */
const OLIVE = '#454411';
const GOLD = '#BEA950';
const BROWN = '#8B5E3C';
const TINT = 'rgba(69,68,17,0.08)';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AIServices' });
  return { title: t('meta.title'), description: t('meta.description') };
}

/* ───────── illustrations (decorative, no text) ───────── */
function HeroArt() {
  const nodes = [
    { x: 210, y: 40 },
    { x: 360, y: 120 },
    { x: 340, y: 270 },
    { x: 210, y: 330 },
    { x: 70, y: 260 },
    { x: 60, y: 120 },
  ];
  return (
    <svg className="ai-hero-art" viewBox="0 0 420 370" aria-hidden="true" focusable="false">
      <circle cx="210" cy="185" r="150" fill="none" stroke="rgba(190,169,80,0.25)" strokeDasharray="4 8" />
      <circle cx="210" cy="185" r="100" fill="none" stroke="rgba(255,255,255,0.12)" />
      {nodes.map((n, i) => (
        <line
          key={`l${i}`}
          x1="210"
          y1="185"
          x2={n.x}
          y2={n.y}
          stroke="rgba(190,169,80,0.55)"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <line
          key={`r${i}`}
          x1={n.x}
          y1={n.y}
          x2={nodes[(i + 1) % nodes.length].x}
          y2={nodes[(i + 1) % nodes.length].y}
          stroke="rgba(255,255,255,0.15)"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="16" fill="#2a2d0f" stroke={GOLD} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="5" fill={i % 2 ? '#f5f2e8' : GOLD} />
        </g>
      ))}
      <g className="ai-pulse">
        <polygon
          points="210,140 249,162.5 249,207.5 210,230 171,207.5 171,162.5"
          fill="#333618"
          stroke={GOLD}
          strokeWidth="2.5"
        />
        <circle cx="210" cy="185" r="14" fill={GOLD} />
        <circle cx="210" cy="185" r="6" fill="#2a2d0f" />
      </g>
    </svg>
  );
}

function CapabilityArt({ k }: { k: CapKey }) {
  const common = { viewBox: '0 0 240 120', 'aria-hidden': true, focusable: false } as const;
  switch (k) {
    case 'vision':
      return (
        <svg {...common}>
          <rect x="62" y="16" width="116" height="88" rx="10" fill={TINT} stroke={OLIVE} strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M70 34V26a6 6 0 016-6h10M170 34V26a6 6 0 00-6-6h-10M70 86v8a6 6 0 006 6h10M170 86v8a6 6 0 01-6 6h-10" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <rect x="88" y="42" width="40" height="34" rx="4" fill="none" stroke={GOLD} strokeWidth="2.5" />
          <rect x="88" y="34" width="22" height="6" rx="3" fill={GOLD} />
          <circle cx="108" cy="60" r="7" fill={OLIVE} />
          <rect x="134" y="58" width="30" height="26" rx="4" fill="none" stroke={BROWN} strokeWidth="2.5" />
          <rect x="134" y="50" width="16" height="6" rx="3" fill={BROWN} />
          <circle cx="149" cy="72" r="5" fill={OLIVE} opacity="0.6" />
        </svg>
      );
    case 'genai':
      return (
        <svg {...common}>
          <rect x="44" y="30" width="64" height="76" rx="8" fill="#fff" stroke={OLIVE} strokeWidth="1.5" opacity="0.5" transform="rotate(-6 76 68)" />
          <rect x="52" y="24" width="64" height="76" rx="8" fill="#fff" stroke={OLIVE} strokeWidth="2" />
          <rect x="62" y="38" width="36" height="5" rx="2.5" fill={OLIVE} />
          <rect x="62" y="50" width="44" height="4" rx="2" fill={OLIVE} opacity="0.35" />
          <rect x="62" y="60" width="40" height="4" rx="2" fill={OLIVE} opacity="0.35" />
          <rect x="62" y="70" width="44" height="4" rx="2" fill={OLIVE} opacity="0.35" />
          <path d="M118 62h22" stroke={GOLD} strokeWidth="2.5" strokeDasharray="3 4" strokeLinecap="round" />
          <rect x="144" y="28" width="62" height="42" rx="12" fill={GOLD} />
          <path d="M156 70l-4 14 16-14z" fill={GOLD} />
          <circle cx="160" cy="49" r="4" fill={OLIVE} />
          <circle cx="175" cy="49" r="4" fill={OLIVE} />
          <circle cx="190" cy="49" r="4" fill={OLIVE} />
          <path d="M200 16l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill={BROWN} />
        </svg>
      );
    case 'agentic':
      return (
        <svg {...common}>
          <path d="M60 60h36M144 38l-24 14M144 82l-24-14M176 38l20 22M176 82l20-22" fill="none" stroke={OLIVE} strokeWidth="2" opacity="0.5" />
          <circle cx="44" cy="60" r="16" fill={OLIVE} />
          <circle cx="44" cy="60" r="5" fill="#f5f2e8" />
          <polygon points="112,60 128,44 144,60 128,76" fill={TINT} stroke={OLIVE} strokeWidth="2" />
          <circle cx="160" cy="34" r="14" fill={GOLD} />
          <circle cx="160" cy="86" r="14" fill={GOLD} />
          <circle cx="206" cy="60" r="16" fill="none" stroke={BROWN} strokeWidth="3" />
          <path d="M199 60l5 5 9-10" fill="none" stroke={BROWN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'data':
      return (
        <svg {...common}>
          <path d="M34 34v44c0 7 12 12 28 12s28-5 28-12V34" fill={TINT} stroke={OLIVE} strokeWidth="2" />
          <ellipse cx="62" cy="34" rx="28" ry="10" fill="#fff" stroke={OLIVE} strokeWidth="2" />
          <path d="M34 56c0 7 12 12 28 12s28-5 28-12" fill="none" stroke={OLIVE} strokeWidth="1.5" opacity="0.5" />
          <path d="M100 60h28" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M122 52l10 8-10 8" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="146" y="64" width="14" height="30" rx="3" fill={OLIVE} opacity="0.35" />
          <rect x="166" y="44" width="14" height="50" rx="3" fill={GOLD} />
          <rect x="186" y="28" width="14" height="66" rx="3" fill={OLIVE} />
          <path d="M142 98h62" stroke={OLIVE} strokeWidth="1.5" opacity="0.4" />
        </svg>
      );
    case 'strategy':
      return (
        <svg {...common}>
          <path d="M26 92C70 92 62 50 108 50s46 28 84-16" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
          <circle cx="26" cy="92" r="8" fill={OLIVE} />
          <circle cx="76" cy="66" r="7" fill={GOLD} />
          <circle cx="120" cy="54" r="7" fill={GOLD} />
          <circle cx="164" cy="56" r="7" fill={GOLD} />
          <path d="M192 34V12" stroke={BROWN} strokeWidth="3" strokeLinecap="round" />
          <path d="M192 12h26l-8 8 8 8h-26z" fill={BROWN} />
        </svg>
      );
    case 'mlops':
      return (
        <svg {...common}>
          <g fill="rgba(69,68,17,0.14)">
            <circle cx="98" cy="64" r="22" />
            <circle cx="126" cy="50" r="28" />
            <circle cx="158" cy="66" r="20" />
            <rect x="98" y="62" width="82" height="24" rx="12" />
          </g>
          <rect x="116" y="60" width="26" height="22" rx="5" fill={GOLD} />
          <path d="M122 60v-6a7 7 0 0114 0v6" fill="none" stroke={GOLD} strokeWidth="3" />
          <circle cx="129" cy="71" r="3" fill={OLIVE} />
          <path d="M60 40a40 40 0 0132-14" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M92 18l2 9-9 1" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M196 92a40 40 0 01-32 14" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M164 114l-2-9 9-1" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function IndustryArt({ k }: { k: IndKey }) {
  const common = { viewBox: '0 0 320 160', 'aria-hidden': true, focusable: false } as const;
  const bg = <rect width="320" height="160" fill="rgba(190,169,80,0.12)" />;
  const ground = <path d="M60 130h200" stroke={OLIVE} strokeWidth="2" opacity="0.4" />;

  if (k === 'agriculture') {
    const xs = Array.from({ length: 11 }, (_, i) => 70 + i * 18);
    return (
      <svg {...common} preserveAspectRatio="xMidYMid slice">
        {bg}
        {ground}
        <path d="M148 66L112 130h96L172 66z" fill={GOLD} opacity="0.22" />
        {xs.map((x) => (
          <g key={x}>
            <path d={`M${x} 130V112`} stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={x - 5} cy="116" r="5" fill={GOLD} />
            <circle cx={x + 5} cy="111" r="5" fill={OLIVE} opacity="0.7" />
          </g>
        ))}
        <path d="M126 52h68" stroke={OLIVE} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="126" cy="47" rx="14" ry="3" fill={GOLD} />
        <ellipse cx="194" cy="47" rx="14" ry="3" fill={GOLD} />
        <rect x="146" y="48" width="28" height="15" rx="6" fill={OLIVE} />
        <circle cx="160" cy="68" r="4.5" fill={BROWN} />
      </svg>
    );
  }

  if (k === 'community') {
    return (
      <svg {...common} preserveAspectRatio="xMidYMid slice">
        {bg}
        {ground}
        <path d="M120 130V74l40-26 40 26v56" fill="#fff" stroke={OLIVE} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="148" y="96" width="24" height="34" rx="3" fill={GOLD} />
        <circle cx="86" cy="96" r="12" fill={OLIVE} />
        <path d="M66 130c0-14 9-22 20-22s20 8 20 22z" fill={OLIVE} />
        <circle cx="234" cy="100" r="11" fill={BROWN} />
        <path d="M215 130c0-13 8-21 19-21s19 8 19 21z" fill={BROWN} />
        <circle cx="262" cy="108" r="8" fill={GOLD} />
        <path d="M249 130c0-10 6-16 13-16s13 6 13 16z" fill={GOLD} />
      </svg>
    );
  }

  return (
    <svg {...common} preserveAspectRatio="xMidYMid slice">
      {bg}
      <rect x="54" y="28" width="132" height="104" rx="10" fill="#fff" stroke={OLIVE} strokeWidth="2.5" />
      <rect x="54" y="28" width="132" height="22" rx="10" fill={OLIVE} />
      <circle cx="68" cy="39" r="3" fill={GOLD} />
      <circle cx="80" cy="39" r="3" fill="#f5f2e8" opacity="0.6" />
      <rect x="70" y="92" width="14" height="28" rx="3" fill={OLIVE} opacity="0.35" />
      <rect x="92" y="76" width="14" height="44" rx="3" fill={GOLD} />
      <rect x="114" y="62" width="14" height="58" rx="3" fill={OLIVE} />
      <rect x="136" y="84" width="14" height="36" rx="3" fill={BROWN} opacity="0.7" />
      <path d="M70 62h40" stroke={OLIVE} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <rect x="204" y="52" width="66" height="84" rx="8" fill="#fff" stroke={OLIVE} strokeWidth="2" />
      <rect x="216" y="66" width="30" height="5" rx="2.5" fill={OLIVE} />
      <rect x="216" y="80" width="42" height="4" rx="2" fill={OLIVE} opacity="0.35" />
      <rect x="216" y="90" width="38" height="4" rx="2" fill={OLIVE} opacity="0.35" />
      <circle cx="252" cy="118" r="11" fill={GOLD} />
      <path d="M246 118l4 4 8-9" fill="none" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────── small helpers ───────── */
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <h2 className="ai-h2">{title}</h2>
      <div className="ai-rule" />
    </div>
  );
}

export default async function AIServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AIServices');

  return (
    <div style={{ background: '#FDFCF5' }}>
      <style>{`
        .ai-dots { background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 28px 28px; }
        .ai-h1 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(2.4rem,5vw,4.2rem); font-weight:${HEADING_WEIGHT}; color:#f5f2e8; line-height:1.08; letter-spacing:-0.02em; margin-bottom:20px; }
        .ai-h2 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(2rem,4vw,3rem); font-weight:${HEADING_WEIGHT}; color:#2d2e0a; line-height:1.15; letter-spacing:-0.02em; }
        .ai-rule { width:64px; height:3px; border-radius:999px; background:linear-gradient(90deg,#454411,#BEA950); margin:16px auto 0; }
        .ai-card { background:#fff; border:1.5px solid rgba(69,68,17,0.1); border-radius:18px; overflow:hidden; transition:transform .25s, box-shadow .25s, border-color .25s; }
        .ai-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(69,68,17,0.13); border-color:rgba(69,68,17,0.28); }
        .ai-card-body { padding:24px; }
        .ai-card h3 { font-family:'Cormorant Garamond',Georgia,serif; font-size:1.35rem; font-weight:${HEADING_WEIGHT}; color:#2d2e0a; line-height:1.25; margin-bottom:8px; }
        .ai-card p { font-family:'DM Sans',sans-serif; font-size:14px; line-height:1.7; color:#545454; }
        .ai-art { height:140px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, rgba(69,68,17,0.07), rgba(190,169,80,0.14)); border-bottom:1px solid rgba(69,68,17,0.08); position:relative; }
        .ai-art svg { height:100%; width:auto; max-width:100%; display:block; }
        .ai-art-ico { position:absolute; top:12px; left:12px; width:40px; height:40px; border-radius:12px; background:#454411; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(69,68,17,0.3); }
        .ai-media { position:relative; height:160px; overflow:hidden; }
        .ai-media svg { width:100%; height:100%; display:block; }
        .ai-link { display:inline-block; margin-top:14px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#8B5E3C; text-decoration:none; }
        .ai-link:hover { color:#454411; }
        .ai-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .ai-btn { display:inline-flex; align-items:center; gap:10px; background:#BEA950; color:#1a1d06; border-radius:12px; padding:14px 28px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; text-decoration:none; transition:transform .2s, box-shadow .2s; }
        .ai-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(190,169,80,0.4); }
        .ai-btn-dark { background:#454411; color:#f5f2e8; }
        .ai-btn-dark:hover { box-shadow:0 8px 28px rgba(69,68,17,0.45); }

        /* hero */
        .ai-hero-grid { display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; align-items:center; max-width:1200px; margin:0 auto; position:relative; }
        .ai-hero-art { width:100%; max-width:440px; height:auto; display:block; margin:0 auto; }
        @keyframes ai-pulse { 0%,100% { opacity:1; } 50% { opacity:.65; } }
        .ai-pulse { animation: ai-pulse 3.5s ease-in-out infinite; transform-origin:center; }

        /* timeline */
        .ai-timeline { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(5,1fr); gap:16px; position:relative; }
        .ai-timeline::before { content:''; position:absolute; top:34px; left:10%; right:10%; border-top:2px dashed rgba(69,68,17,0.3); }
        .ai-tl-item { position:relative; z-index:1; display:flex; flex-direction:column; }
        .ai-tl-node { width:68px; height:68px; border-radius:50%; background:#454411; border:4px solid #fff; box-shadow:0 0 0 2px rgba(190,169,80,0.6), 0 8px 20px rgba(69,68,17,0.25); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; position:relative; flex-shrink:0; }
        .ai-tl-num { position:absolute; top:-6px; right:-6px; width:24px; height:24px; border-radius:50%; background:#BEA950; color:#1a1d06; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .ai-tl-item .ai-card { flex:1; }

        /* engage level meter */
        .ai-level { display:flex; gap:6px; margin-top:16px; }
        .ai-level span { width:28px; height:6px; border-radius:999px; background:rgba(69,68,17,0.15); }
        .ai-level span.on { background:linear-gradient(90deg,#454411,#BEA950); }

        /* engineering flow */
        .ai-flowrow { display:flex; align-items:center; justify-content:center; gap:10px; padding:28px 16px; background:linear-gradient(135deg, rgba(69,68,17,0.07), rgba(190,169,80,0.14)); border-bottom:1px solid rgba(69,68,17,0.08); }
        .ai-flowtile { width:56px; height:56px; border-radius:16px; background:#fff; border:1.5px solid rgba(69,68,17,0.18); display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(69,68,17,0.1); }
        .ai-flowtile.last { background:#454411; border-color:#454411; }

        @media (prefers-reduced-motion: reduce) { .ai-pulse { animation:none; } }

        @media (max-width: 900px) {
          .ai-grid-3 { grid-template-columns:1fr 1fr; }
          .ai-hero-grid { grid-template-columns:1fr; text-align:center; }
          .ai-hero-art { max-width:300px; }
          .ai-timeline { grid-template-columns:1fr; gap:20px; padding-left:0; }
          .ai-timeline::before { top:34px; bottom:34px; left:34px; right:auto; border-top:0; border-left:2px dashed rgba(69,68,17,0.3); }
          .ai-tl-item { flex-direction:row; align-items:stretch; gap:16px; }
          .ai-tl-node { margin:0; }
        }
        @media (max-width: 600px) {
          .ai-grid-3 { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ───────── Hero ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
          padding: HERO_PADDING,
        }}
      >
        <div className="ai-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,169,80,0.1) 0%, transparent 65%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <div className="ai-hero-grid">
          <div>
            <h1 className="ai-h1">{t('hero.title')}</h1>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 'clamp(1rem,2.2vw,1.2rem)',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.75,
                maxWidth: 600,
                margin: '0 auto 32px 0',
              }}
            >
              {t('hero.description')}
            </p>
            <Link href="/contact?topic=consulting" className="ai-btn">
              {t('hero.cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* ───────── Six capabilities ───────── */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ai-grid-3">
            {capabilities.map((key) => {
              const Icon = capIcons[key];
              return (
                <div key={key} className="ai-card">
                  <div className="ai-art">
                    <div className="ai-art-ico">
                      <Icon size={20} color="#f5f2e8" strokeWidth={1.8} />
                    </div>
                    <CapabilityArt k={key} />
                  </div>
                  <div className="ai-card-body">
                    <h3>{t(`capabilities.items.${key}.title`)}</h3>
                    <p>{t(`capabilities.items.${key}.description`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── How we work ───────── */}
      <section style={{ padding: '88px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('process.title')} />
          <ol className="ai-timeline" aria-label={t('process.flowAlt')}>
            {steps.map(({ key, Icon }, i) => (
              <li key={key} className="ai-tl-item">
                <div className="ai-tl-node">
                  <Icon size={26} color="#f5f2e8" strokeWidth={1.8} />
                  <span className="ai-tl-num">{i + 1}</span>
                </div>
                <div className="ai-card" style={{ background: '#FDFCF5' }}>
                  <div className="ai-card-body">
                    <h3>{t(`process.steps.${key}.title`)}</h3>
                    <p>{t(`process.steps.${key}.description`)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Ways to engage ───────── */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('engage.title')} />
          <div className="ai-grid-3">
            {engage.map(({ key, Icon, level }) => (
              <div key={key} className="ai-card">
                <div className="ai-card-body" style={{ padding: 28 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: '#454411',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 18,
                      boxShadow: '0 8px 20px rgba(69,68,17,0.28)',
                    }}
                  >
                    <Icon size={26} color="#f5f2e8" strokeWidth={1.8} />
                  </div>
                  <h3>{t(`engage.items.${key}.title`)}</h3>
                  <p>{t(`engage.items.${key}.description`)}</p>
                  <div className="ai-level" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className={n <= level ? 'on' : ''} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Industries ───────── */}
      <section style={{ padding: '88px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('industries.title')} />
          <div className="ai-grid-3">
            {industries.map((k) => (
              <div key={k} className="ai-card" style={{ background: '#FDFCF5' }}>
                <div className="ai-media">
                               <IndustryArt k={k} />
                </div>
                <div className="ai-card-body">
                  <h3>{t(`industries.items.${k}.title`)}</h3>
                  <p>{t(`industries.items.${k}.description`)}</p>
                  {k === 'agriculture' && (
                    <Link href="/products/skysight" className="ai-link">
                      {t('industries.skysightLink')} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/contact?topic=consulting" className="ai-btn ai-btn-dark">
              {t('industries.cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Engineering in action ───────── */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('engineering.title')} />
          <div className="ai-grid-3">
            {engineering.map(({ key, flow }) => (
              <div key={key} className="ai-card">
                <div className="ai-flowrow" aria-hidden="true">
                  {flow.map((Icon, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className={`ai-flowtile${i === flow.length - 1 ? ' last' : ''}`}>
                        <Icon
                          size={24}
                          color={i === flow.length - 1 ? '#BEA950' : '#454411'}
                          strokeWidth={1.8}
                        />
                      </div>
                      {i < flow.length - 1 && <ArrowRight size={18} color="#8B5E3C" />}
                    </div>
                  ))}
                </div>
                <div className="ai-card-body">
                  <h3>{t(`engineering.items.${key}.title`)}</h3>
                  <p>{t(`engineering.items.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Closing CTA ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div className="ai-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 520,
            height: 520,
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            border: '1px dashed rgba(190,169,80,0.2)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'clamp(1rem,2.2vw,1.2rem)',
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            {t('cta.description')}
          </p>
          <Link href="/contact?topic=consulting" className="ai-btn">
            {t('cta.button')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}