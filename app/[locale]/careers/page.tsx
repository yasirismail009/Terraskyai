'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type CareerPostSummary = {
  id: string | number;
  title?: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  isRemote?: boolean;
  status?: string;
};

class HttpError extends Error {
  status: number;
  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://backend.terraskyai.com';

// PDF that opens when someone clicks "View Details".
// Put your PDF in the public folder and set its path here (for example /job-details.pdf).
// If the file name has spaces, write them as %20.
const JOB_DETAILS_PDF = '/post.pdf';

function normalizeCareerPostSummary(raw: Record<string, unknown>): CareerPostSummary {
  const id = raw?.id ?? raw?.pk ?? raw?.uuid ?? raw?.slug;
  return {
    id: id ?? '',
    title: raw?.title ?? raw?.name ?? raw?.position_title ?? raw?.job_title,
    department: raw?.department ?? raw?.team ?? raw?.category,
    location: raw?.location ?? raw?.city ?? raw?.region,
    type:
      raw?.employment_type_display ??
      raw?.employmentTypeDisplay ??
      raw?.type ??
      raw?.job_type ??
      raw?.employment_type ??
      raw?.employmentType,
    description: raw?.description ?? raw?.short_description ?? raw?.summary,
    isRemote: typeof raw?.is_remote === 'boolean' ? raw.is_remote : raw?.isRemote,
    status: raw?.status_display ?? raw?.statusDisplay ?? raw?.status,
  } as CareerPostSummary;
}

async function fetchCareerPostsList(): Promise<CareerPostSummary[]> {
  const res = await fetch(`${API_BASE_URL}/api/career/posts/`, { cache: 'no-store' });
  if (!res.ok) throw new HttpError(res.status);
  const data = await res.json();
  const list = Array.isArray(data)
    ? data
    : (data?.result ?? data?.results ?? data?.data ?? data?.items ?? []);
  if (!Array.isArray(list)) return [];
  return list.map(normalizeCareerPostSummary).filter((p) => p.id !== '');
}

const heroStatKeys = ['ai', 'location', 'impact'] as const;

const radioQuestions = [
  { name: 'eligibleToWorkInCanada', labelKey: 'eligible' },
  { name: 'validDriversLicense', labelKey: 'license' },
  { name: 'dronePilotLicense', labelKey: 'drone' },
] as const;

export default function CareersPage() {
  const t = useTranslations('Careers');
  const locale = useLocale();
  void locale;

  // Translate known API values (e.g. "Full Time"); unknown values stay as they are
  const tValue = (v?: string) => {
    if (!v) return v;
    const key = `values.${v.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    return t.has(key) ? t(key) : v;
  };

  // Uses the translation if you add positions.viewDetails to your messages files, otherwise shows English
  const viewDetailsLabel = t.has('positions.viewDetails')
    ? t('positions.viewDetails')
    : 'View Details';

  const [positions, setPositions] = useState<CareerPostSummary[]>([]);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    cv: null as File | null,
    eligibleToWorkInCanada: '' as '' | 'yes' | 'no',
    validDriversLicense: '' as '' | 'yes' | 'no',
    dronePilotLicense: '' as '' | 'yes' | 'no',
  });

  const positionsForRender = positions;

  // For the Business Development & Product Agronomist post, two questions do not apply and are hidden.
  // The post is matched by words in its title, so change the text below if the job title changes.
  const selectedPosition = positions.find((p) => String(p.id) === formData.position);
  const hideCanadaQuestions = (selectedPosition?.title ?? '')
    .toLowerCase()
    .includes('business development');
  const visibleQuestions = radioQuestions.filter(
    (q) =>
      !(
        hideCanadaQuestions &&
        (q.name === 'eligibleToWorkInCanada' || q.name === 'validDriversLicense')
      )
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setPositionsLoading(true);
        setPositionsError(null);
        const list = await fetchCareerPostsList();
        if (cancelled) return;
        setPositions(list);
      } catch (e: unknown) {
        if (cancelled) return;
        setPositionsError(
          e instanceof HttpError
            ? t('errors.loadJobs', { status: e.status })
            : e instanceof Error
              ? e.message
              : t('errors.loadJobsFallback')
        );
        setPositions([]);
      } finally {
        if (!cancelled) setPositionsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = (id: string | number) => {
    setFormData((prev) => ({ ...prev, position: String(id ?? '') }));
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!formData.cv) {
      setSubmitError(t('errors.noCv'));
      return;
    }

    // Quick fix: General Application needs at least one real position to map to
    const postValue =
      formData.position === 'general' ? String(positions[0]?.id ?? '') : formData.position;

    if (!postValue) {
      setSubmitError(t('errors.noGeneral'));
      return;
    }

    const yesNoToBoolString = (v: '' | 'yes' | 'no') => (v === 'yes' ? 'true' : 'false');
    try {
      setSubmitLoading(true);
      const payload = new FormData();
      payload.append('post', postValue);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('cover_letter', formData.coverLetter);
      payload.append(
        'eligible_to_work_in_canada',
        hideCanadaQuestions ? 'false' : yesNoToBoolString(formData.eligibleToWorkInCanada)
      );
      payload.append(
        'valid_drivers_license',
        hideCanadaQuestions ? 'false' : yesNoToBoolString(formData.validDriversLicense)
      );
      payload.append('drone_pilot_license', yesNoToBoolString(formData.dronePilotLicense));
      payload.append('access_to_own_vehicle', 'false');
      payload.append('cv', formData.cv);
      const res = await fetch(`${API_BASE_URL}/api/career/applications/`, {
        method: 'POST',
        body: payload,
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
        throw new HttpError(res.status);
      }
      setSubmitSuccess(t('success.submitted'));
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
        cv: null,
        eligibleToWorkInCanada: '',
        validDriversLicense: '',
        dronePilotLicense: '',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => {
        document
          .getElementById('application-form')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof HttpError
          ? t('errors.submitStatus', { status: err.status })
          : err instanceof Error
            ? err.message
            : t('errors.submitFallback')
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FDFCF5' }}>
      <style>{`
        @keyframes cr-fadeUp   { from{opacity:0;transform:translateY(32px);}  to{opacity:1;transform:translateY(0);} }
        @keyframes cr-spin     { from{transform:rotate(0deg);}  to{transform:rotate(360deg);} }
        @keyframes cr-pulse    { 0%,100%{opacity:0.4;} 50%{opacity:0.85;} }
        @keyframes cr-shimmer  { 0%{background-position:-200% center;} 100%{background-position:200% center;} }

        .cr-fade   { animation: cr-fadeUp 0.7s ease both; }
        .cr-fade-2 { animation: cr-fadeUp 0.7s 0.15s ease both; }
        .cr-fade-3 { animation: cr-fadeUp 0.7s 0.3s ease both; }
        .cr-ring1  { animation: cr-spin 28s linear infinite; }
        .cr-ring2  { animation: cr-spin 20s linear infinite reverse; }
        .cr-glow   { animation: cr-pulse 4s ease-in-out infinite; }
        .cr-glow2  { animation: cr-pulse 4s ease-in-out infinite; animation-delay:2s; }

        .cr-dot-bg {
          background-image: radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cr-dot-bg-light {
          background-image: radial-gradient(circle, rgba(69,68,17,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Job cards */
        .cr-job-card {
          background: #fff;
          border: 1.5px solid rgba(69,68,17,0.1);
          border-radius: 20px;
          padding: 28px 32px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          box-shadow: 0 4px 20px rgba(69,68,17,0.06);
        }
        .cr-job-card:hover {
          border-color: rgba(69,68,17,0.25);
          box-shadow: 0 12px 40px rgba(69,68,17,0.1);
          transform: translateY(-3px);
        }

        .cr-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          background: rgba(69,68,17,0.07);
          border: 1px solid rgba(69,68,17,0.15);
          color: #454411;
        }

        .cr-actions {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 22px;
        }

        .cr-apply-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #454411; color: #f5f2e8;
          border: none; border-radius: 12px; padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 20px rgba(69,68,17,0.4);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          text-decoration: none; justify-content: center;
        }
        .cr-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(69,68,17,0.5);
          background: #5a5a16;
        }

        .cr-view-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #454411;
          border: 1.5px solid rgba(69,68,17,0.35); border-radius: 12px; padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
          text-decoration: none; justify-content: center;
        }
        .cr-view-btn:hover {
          transform: translateY(-2px);
          background: rgba(69,68,17,0.07);
          border-color: #454411;
        }

        /* Form styles */
        .cr-form-input {
          width: 100%; background: #f8f7f0;
          border: 1.5px solid #ddd9c8; border-radius: 10px;
          padding: 13px 16px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; color: #2d2e0a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .cr-form-input:focus {
          border-color: #454411;
          box-shadow: 0 0 0 3px rgba(69,68,17,0.1);
          background: #fff;
        }
        .cr-form-input::placeholder { color: #b0ac90; }

        .cr-form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #8B5E3C; margin-bottom: 7px; display: block;
        }

        .cr-radio-card {
          background: #f8f7f0;
          border: 1.5px solid #ddd9c8;
          border-radius: 12px; padding: 16px 18px;
          transition: border-color 0.2s, background 0.2s;
        }
        .cr-radio-card:focus-within {
          border-color: #454411;
          background: #fff;
        }

        .cr-submit-btn {
          width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: #454411; color: #f5f2e8;
          border: none; border-radius: 12px; padding: 16px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 24px rgba(69,68,17,0.4);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.02em;
        }
        .cr-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(69,68,17,0.5);
          background: #5a5a16;
        }
        .cr-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .cr-shimmer {
          height: 2px; border-radius: 999px;
          background: linear-gradient(90deg, transparent, #BEA950, #8B5E3C, transparent);
          background-size: 200% auto;
          animation: cr-shimmer 3s linear infinite;
        }

        @media (max-width: 768px) {
          .cr-two-col { grid-template-columns: 1fr !important; }
          .cr-radio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #2a2d0f 0%, #333618 55%, #1e2009 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 24px 100px',
        }}
      >
        <div
          className="cr-dot-bg"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
        <div
          className="cr-glow"
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
          className="cr-glow2"
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-60px',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,94,60,0.09) 0%, transparent 65%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="cr-ring1"
          style={{
            position: 'absolute',
            top: '8%',
            right: '4%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            border: '1px dashed rgba(190,169,80,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="cr-ring2"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '3%',
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: '1px dashed rgba(139,94,60,0.13)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="cr-fade"
          style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}
        >
          <span
            style={{
              display: 'inline-block',
              marginBottom: 24,
              background: 'rgba(190,169,80,0.12)',
              border: '1px solid rgba(190,169,80,0.3)',
              color: '#BEA950',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '5px 16px',
              borderRadius: 999,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {t('hero.badge')}
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 'clamp(2.8rem,6vw,5rem)',
              fontWeight: 700,
              color: '#f5f2e8',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {t.rich('hero.title', {
              gold: (chunks) => <em style={{ color: '#BEA950' }}>{chunks}</em>,
            })}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 'clamp(1rem,2vw,1.2rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              maxWidth: 600,
              margin: '0 auto 40px',
            }}
          >
            {t('hero.description')}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {heroStatKeys.map((key) => (
              <div key={key} style={{ textAlign: 'center' }}>
                {/* SMALL VALUE */}
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  {t(`hero.stats.${key}.top`)}
                </p>

                {/* BIG LABEL */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#BEA950',
                    lineHeight: 1,
                  }}
                >
                  {t(`hero.stats.${key}.bottom`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section
        className="cr-dot-bg-light"
        style={{
          background: '#FDFCF5',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: '8%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,169,80,0.07) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div className="cr-fade" style={{ marginBottom: 48 }}>
            <span
              style={{
                display: 'inline-block',
                marginBottom: 16,
                background: 'rgba(69,68,17,0.08)',
                border: '1px solid rgba(69,68,17,0.18)',
                color: '#454411',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '5px 16px',
                borderRadius: 999,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {t('positions.badge')}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,4vw,3rem)',
                fontWeight: 700,
                color: '#2d2e0a',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              {t('positions.title')}
            </h2>
            <div className="cr-shimmer" style={{ maxWidth: 160, marginTop: 16 }} />
          </div>

          {positionsLoading && (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 0',
                fontFamily: "'DM Sans',sans-serif",
                color: '#9a9878',
                fontSize: 15,
              }}
            >
              {t('positions.loading')}
            </div>
          )}

          {!positionsLoading && positionsError && (
            <div
              style={{
                background: 'rgba(239,68,68,0.05)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 16,
                padding: '24px 28px',
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  color: '#545454',
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                {t('positions.errorTitle')}
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: '#b91c1c', fontSize: 13 }}>
                {positionsError}
              </p>
            </div>
          )}

          {!positionsLoading && !positionsError && positionsForRender.length === 0 && (
            <div
              style={{
                background: '#fff',
                border: '1.5px solid rgba(69,68,17,0.1)',
                borderRadius: 20,
                padding: '40px 32px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: '#9a9878', fontSize: 15 }}>
                {t('positions.empty')}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {positionsForRender.map((position) => (
              <div key={position.id} className="cr-job-card">
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#2d2e0a',
                    lineHeight: 1.2,
                    marginBottom: 12,
                  }}
                >
                  {position.title ?? t('positions.untitled')}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {position.department && (
                    <span className="cr-badge">{tValue(position.department)}</span>
                  )}
                  {position.location && <span className="cr-badge">📍 {position.location}</span>}
                  {position.type && <span className="cr-badge">{tValue(position.type)}</span>}
                  {position.isRemote && (
                    <span className="cr-badge">🌐 {t('positions.remote')}</span>
                  )}
                </div>

                <div className="cr-actions">
                  <a
                    className="cr-view-btn"
                    href={JOB_DETAILS_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {viewDetailsLabel}
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
                      <path
                        d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <button
                    type="button"
                    className="cr-apply-btn"
                    onClick={() => handleApply(position.id)}
                  >
                    {t('positions.apply')}
                    <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
                      <path
                        d="M4 10h12M10 4l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section
        id="application-form"
        className="cr-dot-bg-light"
        style={{
          background: '#FDFCF5',
          padding: '96px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: '5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,169,80,0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: '3%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,94,60,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div className="cr-fade" style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              style={{
                display: 'inline-block',
                marginBottom: 16,
                background: 'rgba(69,68,17,0.08)',
                border: '1px solid rgba(69,68,17,0.18)',
                color: '#454411',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '5px 16px',
                borderRadius: 999,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {t('form.badge')}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,4vw,3rem)',
                fontWeight: 700,
                color: '#2d2e0a',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              {t.rich('form.title', {
                em: (chunks) => <em style={{ color: '#8B5E3C' }}>{chunks}</em>,
              })}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: '#7a7860',
                fontSize: '1rem',
                maxWidth: 480,
                margin: '0 auto',
                lineHeight: 1.75,
              }}
            >
              {t('form.description')}
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '48px 44px',
              boxShadow: '0 24px 64px rgba(69,68,17,0.1)',
              border: '1.5px solid rgba(69,68,17,0.08)',
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name */}
                <div>
                  <label className="cr-form-label" htmlFor="name">
                    {t('form.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('form.namePlaceholder')}
                    className="cr-form-input"
                  />
                </div>

                {/* Email + Phone */}
                <div
                  className="cr-two-col"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                >
                  <div>
                    <label className="cr-form-label" htmlFor="email">
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('form.emailPlaceholder')}
                      className="cr-form-input"
                    />
                  </div>
                  <div>
                    <label className="cr-form-label" htmlFor="phone">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('form.phonePlaceholder')}
                      className="cr-form-input"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="cr-form-label" htmlFor="position">
                    {t('form.position')} *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="cr-form-input"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">{t('form.selectPosition')}</option>
                    {positionsForRender.map((pos) => (
                      <option key={pos.id} value={String(pos.id)}>
                        {pos.title ?? String(pos.id)}
                      </option>
                    ))}
                    {positionsForRender.length > 0 && (
                      <option value="general">{t('form.general')}</option>
                    )}
                  </select>
                </div>

                {/* Radio questions */}
                <div
                  className="cr-radio-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: visibleQuestions.length > 1 ? '1fr 1fr' : '1fr',
                    gap: 14,
                  }}
                >
                  {visibleQuestions.map((q) => (
                    <div key={q.name} className="cr-radio-card">
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#454411',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: 12,
                        }}
                      >
                        {t(`form.questions.${q.labelKey}`)} *
                      </p>
                      <div style={{ display: 'flex', gap: 24 }}>
                        {(['yes', 'no'] as const).map((opt) => (
                          <label
                            key={opt}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              cursor: 'pointer',
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: 14,
                              color: '#545454',
                              fontWeight: 500,
                            }}
                          >
                            <input
                              type="radio"
                              name={q.name}
                              value={opt}
                              required
                              checked={formData[q.name] === opt}
                              onChange={handleInputChange}
                              style={{ accentColor: '#454411', width: 16, height: 16 }}
                            />
                            {t(`form.${opt}`)}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cover letter */}
                <div>
                  <label className="cr-form-label" htmlFor="coverLetter">
                    {t('form.coverLetter')}
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder={t('form.coverPlaceholder')}
                    className="cr-form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="cr-form-label" htmlFor="cv">
                    {t('form.cv')} *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="cv"
                    name="cv"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="cr-form-input"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      color: '#b0ac90',
                      marginTop: 6,
                    }}
                  >
                    {t('form.cvHint')}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="cr-submit-btn"
                  style={{ marginTop: 8 }}
                >
                  {submitLoading ? t('form.submitting') : t('form.submit')}
                  {!submitLoading && (
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                      <path
                        d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {submitError && (
                  <div
                    style={{
                      background: 'rgba(239,68,68,0.06)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 12,
                      padding: '14px 18px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13,
                        color: '#b91c1c',
                        fontWeight: 600,
                      }}
                    >
                      {submitError}
                    </p>
                  </div>
                )}
                {submitSuccess && (
                  <div
                    style={{
                      background: 'rgba(34,197,94,0.06)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      borderRadius: 12,
                      padding: '14px 18px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 14,
                        color: '#15803d',
                        fontWeight: 600,
                      }}
                    >
                      {submitSuccess}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}