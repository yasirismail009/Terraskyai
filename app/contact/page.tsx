'use client';

import { FormEvent, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://admin.terraskyai.com';

type QueryCreatedResponse = {
  id: string;
  full_name: string;
  email: string;
  area_of_interest: string;
  message: string;
  created_at?: string;
};

function formatSubmittedAt(iso: string | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function parseQueryCreated(
  raw: unknown,
  fallback: Pick<QueryCreatedResponse, 'full_name' | 'email' | 'area_of_interest' | 'message'>
): QueryCreatedResponse {
  if (raw && typeof raw === 'object' && typeof (raw as { id?: unknown }).id === 'string') {
    const o = raw as Record<string, unknown>;
    return {
      id: o.id as string,
      full_name: typeof o.full_name === 'string' ? o.full_name : fallback.full_name,
      email: typeof o.email === 'string' ? o.email : fallback.email,
      area_of_interest:
        typeof o.area_of_interest === 'string' ? o.area_of_interest : fallback.area_of_interest,
      message: typeof o.message === 'string' ? o.message : fallback.message,
      created_at: typeof o.created_at === 'string' ? o.created_at : undefined,
    };
  }
  return { id: '—', ...fallback };
}

function ContactSuccessPanel({
  query,
  onSubmitAnother,
}: {
  query: QueryCreatedResponse;
  onSubmitAnother: () => void;
}) {
  const submittedAt = formatSubmittedAt(query.created_at);
  const firstName = query.full_name.trim().split(/\s+/)[0] || 'there';

  return (
    <div className="c-success-wrap" role="status">
      <div className="c-success-icon-ring" aria-hidden>
        <svg className="c-success-check" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="c-success-eyebrow">Inquiry sent</p>
      <h3 className="c-success-title">You&apos;re on our list, {firstName}</h3>
      <p className="c-success-sub">
        We received your message and will follow up by email. Keep this reference handy if you
        contact support.
      </p>

      <div className="c-success-details">
        <div className="c-success-detail">
          <div className="c-success-detail-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 13a5 5 0 100-10 5 5 0 000 10zM21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="c-success-detail-body">
            <div className="c-success-detail-label">Reference ID</div>
            <div className="c-success-detail-value c-success-ref">{query.id}</div>
          </div>
        </div>

        <div className="c-success-detail">
          <div className="c-success-detail-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6-4.6-6 4.6 2.3-7-6-4.6h7.6L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="c-success-detail-body">
            <div className="c-success-detail-label">Area of interest</div>
            <div className="c-success-detail-value">{query.area_of_interest}</div>
          </div>
        </div>

        {submittedAt ? (
          <div className="c-success-detail">
            <div className="c-success-detail-icon" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 8v4l3 2M12 22a10 10 0 110-20 10 10 0 010 20z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="c-success-detail-body">
              <div className="c-success-detail-label">Submitted</div>
              <div className="c-success-detail-value">{submittedAt}</div>
            </div>
          </div>
        ) : null}
      </div>

      <button type="button" className="c-btn-secondary c-success-cta" onClick={onSubmitAnother}>
        Submit another query
      </button>
    </div>
  );
}

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState<QueryCreatedResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmittedQuery(null);
    if (!fullName.trim() || !email.trim() || !areaOfInterest.trim() || !message.trim()) {
      setSubmitError('Please fill in all fields.');
      return;
    }
    try {
      setSubmitLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/queries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          area_of_interest: areaOfInterest.trim(),
          message: message.trim(),
        }),
      });
      const maybeJson = await res.json().catch(() => null);
      if (!res.ok) {
        if (maybeJson && typeof maybeJson === 'object') {
          const messages = Object.entries(maybeJson as Record<string, unknown>)
            .map(([k, v]) => {
              if (Array.isArray(v)) return `${k}: ${v.join(' ')}`;
              if (typeof v === 'string') return `${k}: ${v}`;
              return null;
            })
            .filter(Boolean);
          if (messages.length) throw new Error(messages.join(' | '));
        }
        throw new Error(`Submission failed (${res.status})`);
      }
      const payload = {
        full_name: fullName.trim(),
        email: email.trim(),
        area_of_interest: areaOfInterest.trim(),
        message: message.trim(),
      };
      setSubmittedQuery(parseQueryCreated(maybeJson, payload));
      setFullName('');
      setEmail('');
      setAreaOfInterest('');
      setMessage('');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-10 py-16"
      style={{
        background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
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
        .c-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
        .c-btn:disabled:hover {
          transform: none;
          box-shadow: 0 4px 20px rgba(69,68,17,0.45);
          background: #454411;
        }
        .c-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #454411;
          border: 1.5px solid #454411; border-radius: 12px; padding: 12px 22px;
          font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .c-btn-secondary:hover {
          background: rgba(69,68,17,0.08);
        }
        @keyframes c-success-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .c-success-wrap {
          animation: c-success-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          text-align: center;
          padding: 8px 4px 4px;
        }
        .c-success-icon-ring {
          width: 76px; height: 76px; margin: 0 auto 22px;
          border-radius: 50%;
          background: linear-gradient(160deg, rgba(190,169,80,0.28) 0%, rgba(69,68,17,0.12) 100%);
          border: 2px solid rgba(190,169,80,0.45);
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 14px 36px rgba(69,68,17,0.14),
            inset 0 1px 0 rgba(255,255,255,0.45);
        }
        .c-success-check {
          width: 34px; height: 34px;
          color: #454411;
        }
        .c-success-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #8B5E3C; margin: 0 0 10px;
        }
        .c-success-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.65rem, 3.2vw, 2.05rem);
          font-weight: 700; color: #2d2e0a;
          margin: 0 0 12px; line-height: 1.2; letter-spacing: -0.02em;
        }
        .c-success-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 400;
          color: #6a6848; line-height: 1.65;
          margin: 0 auto 26px; max-width: 380px;
        }
        .c-success-details {
          display: flex; flex-direction: column; gap: 11px;
          margin-bottom: 22px; text-align: left;
        }
        .c-success-detail {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 15px 17px;
          background: linear-gradient(180deg, #fcfcf7 0%, #f4f2ea 100%);
          border: 1px solid rgba(69, 68, 17, 0.1);
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(45, 46, 10, 0.06);
          border-left: 4px solid #BEA950;
        }
        .c-success-detail-icon {
          flex-shrink: 0; width: 38px; height: 38px;
          border-radius: 11px;
          background: rgba(190,169,80,0.16);
          border: 1px solid rgba(190,169,80,0.3);
          color: #6b5a2a;
          display: flex; align-items: center; justify-content: center;
        }
        .c-success-detail-body { min-width: 0; flex: 1; }
        .c-success-detail-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.11em; text-transform: uppercase;
          color: #8B5E3C; margin-bottom: 5px;
        }
        .c-success-detail-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #2d2e0a; line-height: 1.45;
          word-break: break-word;
        }
        .c-success-ref {
          font-family: ui-monospace, 'Cascadia Code', 'Segoe UI Mono', monospace;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.02em; color: #3a3d22;
        }
        .c-btn-secondary.c-success-cta {
          width: 100%; margin-top: 6px; padding: 14px 22px;
        }
        @media (max-width: 800px) {
          .c-main-grid { grid-template-columns: 1fr !important; }
          .c-two-col   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="c-dot-grid"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      <div
        className="c-glow"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-80px',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,169,80,0.1) 0%, transparent 65%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="c-glow2"
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-80px',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,94,60,0.09) 0%, transparent 65%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="c-ring1"
        style={{
          position: 'absolute',
          top: '6%',
          right: '3%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '1px dashed rgba(190,169,80,0.15)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="c-ring2"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '2%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          border: '1px dashed rgba(139,94,60,0.13)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(190,169,80,0.12)',
              border: '1px solid rgba(190,169,80,0.3)',
              color: '#BEA950',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '5px 16px',
              borderRadius: '999px',
              marginBottom: 16,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 'clamp(2.2rem,4.5vw,3.5rem)',
              fontWeight: 700,
              color: '#f5f2e8',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            Let&apos;s Grow Something <em style={{ color: '#BEA950' }}>Together</em>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: '#9a9878',
              fontSize: '1rem',
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Share your goals and challenges — our team will respond with tailored recommendations
            for your operation.
          </p>
        </div>

        <div
          className="c-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                background: 'rgba(253,252,245,0.05)',
                border: '1.5px solid rgba(190,169,80,0.18)',
                borderRadius: 20,
                padding: '40px 24px 48px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: '#BEA950',
                  marginBottom: 8,
                }}
              >
                Contact Info
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#f5f2e8',
                  lineHeight: 1.25,
                  marginBottom: 20,
                }}
              >
                We&apos;re here to help your farm thrive
              </h2>

              <a href="tel:+15875741601" className="c-detail" style={{ marginBottom: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: 'rgba(190,169,80,0.12)',
                    border: '1px solid rgba(190,169,80,0.25)',
                    color: '#BEA950',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      color: '#9a9878',
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Call us
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: '#f0ede0',
                      fontWeight: 600,
                    }}
                  >
                    +1 (587) 574-1601
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@terraskyai.com"
                className="c-detail"
                style={{ marginBottom: 10 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: 'rgba(190,169,80,0.12)',
                    border: '1px solid rgba(190,169,80,0.25)',
                    color: '#BEA950',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      color: '#9a9878',
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: '#f0ede0',
                      fontWeight: 600,
                    }}
                  >
                    support@terraskyai.com
                  </p>
                </div>
              </a>

              <a href="#" className="c-detail" style={{ marginBottom: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: 'rgba(190,169,80,0.12)',
                    border: '1px solid rgba(190,169,80,0.25)',
                    color: '#BEA950',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      color: '#9a9878',
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: '#f0ede0',
                      fontWeight: 600,
                    }}
                  >
                    Lethbridge, Alberta, Canada
                  </p>
                </div>
              </a>

              <a href="#" className="c-detail">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: 'rgba(190,169,80,0.12)',
                    border: '1px solid rgba(190,169,80,0.25)',
                    color: '#BEA950',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                    <path
                      d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V11h6v10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      color: '#9a9878',
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Head Office
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: '#f0ede0',
                      fontWeight: 600,
                    }}
                  >
                    Mississauga, Ontario, Canada
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            style={{
              background: '#FDFCF5',
              borderRadius: 24,
              padding: '36px 32px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
              border: '1.5px solid rgba(240,237,220,1)',
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: '#8B5E3C',
                marginBottom: 6,
              }}
            >
              Send a Message
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#2d2e0a',
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              {submittedQuery ? (
                <>
                  Inquiry <em style={{ color: '#BEA950', fontStyle: 'normal' }}>received</em>
                </>
              ) : (
                'Tell us about your farm'
              )}
            </h2>

            {submittedQuery ? (
              <ContactSuccessPanel
                query={submittedQuery}
                onSubmitAnother={() => {
                  setSubmittedQuery(null);
                  setSubmitError(null);
                }}
              />
            ) : (
              <form onSubmit={handleSubmit}>
                {submitError ? (
                  <p
                    role="alert"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      color: '#a33',
                      marginBottom: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    {submitError}
                  </p>
                ) : null}

                <div
                  className="c-two-col"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <label className="c-label" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="c-input"
                      value={fullName}
                      onChange={(ev) => setFullName(ev.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="c-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="c-input"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="c-label" htmlFor="interest">
                    Area of Interest
                  </label>
                  <select
                    id="interest"
                    name="area_of_interest"
                    className="c-input"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                    value={areaOfInterest}
                    onChange={(ev) => setAreaOfInterest(ev.target.value)}
                    required
                  >
                    <option value="">Select a service…</option>
                    <option value="Plant Stand Count">Plant Stand Count</option>
                    <option value="Weed & Insect Detection">Weed &amp; Insect Detection</option>
                    <option value="Off-Type Detection">Off-Type Detection</option>
                    <option value="Yield Estimation">Yield Estimation</option>
                    <option value="All Services">All Services</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="c-label" htmlFor="message">
                    Tell us about your farm and what you need
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Acres, crops, current challenges, and the outcomes you're targeting…"
                    rows={5}
                    className="c-input"
                    style={{ resize: 'vertical' }}
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    required
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <button
                    type="submit"
                    className="c-btn"
                    disabled={submitLoading}
                    aria-busy={submitLoading}
                  >
                    {submitLoading ? 'Sending…' : 'Send Message'}
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
                      <path
                        d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#b0ac90' }}>
                    We respond within 24 hours
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
