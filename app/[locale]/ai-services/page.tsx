import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Eye,
  MessageSquare,
  Workflow,
  Database,
  Compass,
  Cloud,
  ArrowRight,
} from 'lucide-react';
import { Link } from '../../../i18n/navigation';

const capabilities = [
  { key: 'vision', Icon: Eye },
  { key: 'genai', Icon: MessageSquare },
  { key: 'agentic', Icon: Workflow },
  { key: 'data', Icon: Database },
  { key: 'strategy', Icon: Compass },
  { key: 'mlops', Icon: Cloud },
] as const;

const steps = ['discover', 'design', 'build', 'deploy', 'enable'] as const;
const engage = ['assessment', 'custom', 'advisory'] as const;
const industries = ['agriculture', 'community', 'enterprise'] as const;
const engineering = ['skysight', 'knowledge', 'reporting'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AIServices' });
  return { title: t('meta.title'), description: t('meta.description') };
}

function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <h2 className="ai-h2">{title}</h2>
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
        .ai-badge { display:inline-block; background:rgba(69,68,17,0.08); border:1px solid rgba(69,68,17,0.18); color:#454411; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; padding:5px 16px; border-radius:999px; margin-bottom:16px; font-family:'DM Sans',sans-serif; }
        .ai-badge-dark { background:rgba(190,169,80,0.13); border-color:rgba(190,169,80,0.35); color:#BEA950; }
        .ai-h2 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(2rem,4vw,3rem); font-weight:600; color:#2d2e0a; line-height:1.15; letter-spacing:-0.02em; }
        .ai-h2-dark { color:#f5f2e8; }
        .ai-card { background:#fff; border:1.5px solid rgba(69,68,17,0.1); border-radius:18px; padding:28px 24px; transition:transform .25s, box-shadow .25s, border-color .25s; }
        .ai-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(69,68,17,0.13); border-color:rgba(69,68,17,0.28); }
        .ai-icon { width:52px; height:52px; border-radius:14px; background:linear-gradient(135deg, rgba(69,68,17,0.09), rgba(139,94,60,0.09)); border:1px solid rgba(69,68,17,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
        .ai-card h3 { font-family:'Cormorant Garamond',Georgia,serif; font-size:1.35rem; font-weight:600; color:#2d2e0a; line-height:1.25; margin-bottom:8px; }
        .ai-card p { font-family:'DM Sans',sans-serif; font-size:14px; line-height:1.7; color:#545454; }
        .ai-link { display:inline-block; margin-top:14px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#8B5E3C; text-decoration:none; }
        .ai-link:hover { color:#454411; }
        .ai-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .ai-grid-5 { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
        .ai-btn { display:inline-flex; align-items:center; gap:10px; background:#BEA950; color:#1a1d06; border-radius:12px; padding:14px 28px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; text-decoration:none; transition:transform .2s, box-shadow .2s; }
        .ai-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(190,169,80,0.4); }
        .ai-btn-dark { background:#454411; color:#f5f2e8; }
        .ai-btn-dark:hover { box-shadow:0 8px 28px rgba(69,68,17,0.45); }
        .ai-flow { display:block; width:100%; height:auto; margin-bottom:20px; }
        .ai-step-num { display:none; font-family:'Cormorant Garamond',Georgia,serif; font-size:1.7rem; font-weight:700; color:#8B5E3C; margin-bottom:6px; }
        @media (max-width: 900px) {
          .ai-grid-3, .ai-grid-5 { grid-template-columns: 1fr 1fr; }
          .ai-flow { display:none; }
          .ai-step-num { display:block; }
        }
        @media (max-width: 600px) {
          .ai-grid-3, .ai-grid-5 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
          padding: '160px 24px 170px',
        }}
      >
        <div
          className="ai-dots"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
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
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 'clamp(2.6rem,6vw,4.6rem)',
              fontWeight: 600,
              color: '#f5f2e8',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {t('hero.title')}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 'clamp(1rem,2.2vw,1.2rem)',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.75,
              maxWidth: 680,
              margin: '0 auto 32px',
            }}
          >
            {t('hero.description')}
          </p>
          <Link href="/contact?topic=consulting" className="ai-btn">
            {t('hero.cta')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Six capabilities */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ai-grid-3">
            {capabilities.map(({ key, Icon }) => (
              <div key={key} className="ai-card">
                <div className="ai-icon">
                  <Icon size={24} color="#454411" strokeWidth={1.7} />
                </div>
                <h3>{t(`capabilities.items.${key}.title`)}</h3>
                <p>{t(`capabilities.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section style={{ padding: '88px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('process.title')} />

          {/* simple workflow illustration (desktop) */}
          <svg
            className="ai-flow"
            viewBox="0 0 1000 80"
            role="img"
            aria-label={t('process.flowAlt')}
          >
            <line
              x1="100"
              y1="40"
              x2="900"
              y2="40"
              stroke="rgba(69,68,17,0.28)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            {steps.map((s, i) => (
              <g key={s} transform={`translate(${100 + i * 200},40)`}>
                <circle r="28" fill="#454411" />
                <circle r="34" fill="none" stroke="rgba(190,169,80,0.55)" strokeWidth="1.5" />
                <text
                  textAnchor="middle"
                  dy="8"
                  fill="#f5f2e8"
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="'Cormorant Garamond',Georgia,serif"
                >
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>

          <div className="ai-grid-5">
            {steps.map((s, i) => (
              <div key={s} className="ai-card" style={{ background: '#FDFCF5' }}>
                <div className="ai-step-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{t(`process.steps.${s}.title`)}</h3>
                <p>{t(`process.steps.${s}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to engage */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('engage.title')} />
          <div className="ai-grid-3">
            {engage.map((k) => (
              <div key={k} className="ai-card">
                <h3>{t(`engage.items.${k}.title`)}</h3>
                <p>{t(`engage.items.${k}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding: '88px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('industries.title')} />
          <div className="ai-grid-3">
            {industries.map((k) => (
              <div key={k} className="ai-card" style={{ background: '#FDFCF5' }}>
                <h3>{t(`industries.items.${k}.title`)}</h3>
                <p>{t(`industries.items.${k}.description`)}</p>
                {k === 'agriculture' && (
                  <Link href="/products/skysight" className="ai-link">
                    {t('industries.skysightLink')} →
                  </Link>
                )}
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

      {/* Engineering in action */}
      <section style={{ padding: '88px 24px', background: '#FDFCF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead title={t('engineering.title')} />
          <div className="ai-grid-3">
            {engineering.map((k) => (
              <div key={k} className="ai-card">
                <h3>{t(`engineering.items.${k}.title`)}</h3>
                <p>{t(`engineering.items.${k}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div
          className="ai-dots"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: 'rgba(255,255,255,0.78)',
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
