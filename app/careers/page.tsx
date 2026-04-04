'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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

type CareerPostDetail = CareerPostSummary & {
  responsibilities?: string[];
  requirements?: string[];
  requirementsHtml?: string;
  preferredSkills?: string[];
  compensation?: string;
  applicationEmail?: string;
  applicationSubject?: string;
  applicationDeadline?: string;
  viewsCount?: number;
  applicationsCount?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  showEligibleToWorkInCanada?: boolean;
  requireEligibleToWorkInCanada?: boolean;
  showValidDriversLicense?: boolean;
  requireValidDriversLicense?: boolean;
  showDronePilotLicense?: boolean;
  requireDronePilotLicense?: boolean;
};

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function filterDescription(description: string): string {
  const textToHide =
    '• Assist with new and existing CV model development through data collection, labeling, ground truthing and validation';
  let filtered = description.replace(
    new RegExp(textToHide.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    ''
  );
  filtered = filtered.replace(
    new RegExp(`<li[^>]*>\\s*${textToHide.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</li>`, 'gi'),
    ''
  );
  filtered = filtered.replace(
    new RegExp(`<p[^>]*>\\s*${textToHide.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</p>`, 'gi'),
    ''
  );
  return filtered.trim();
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://admin.terraskyai.com';

function formatCurrencyAmount(value: unknown, currency: string): string | undefined {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isFinite(n)) return undefined;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

function formatSalaryRange(raw: Record<string, unknown>): string | undefined {
  const currency =
    (typeof raw?.salary_currency === 'string' && raw.salary_currency) ||
    (typeof raw?.currency === 'string' && raw.currency) ||
    undefined;
  if (!currency) return undefined;
  const min = formatCurrencyAmount(raw?.salary_min, currency);
  const max = formatCurrencyAmount(raw?.salary_max, currency);
  if (min && max) return `${min} – ${max}`;
  return min ?? max;
}

function formatDeadline(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function coerceStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const out = value.map((v) => (typeof v === 'string' ? v.trim() : '')).filter(Boolean);
    return out.length ? out : undefined;
  }
  if (typeof value === 'string') {
    if (looksLikeHtml(value)) return undefined;
    const parts = value
      .split(/\r?\n|•/g)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }
  return undefined;
}

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

function normalizeCareerPostDetail(raw: Record<string, unknown>): CareerPostDetail {
  const base = normalizeCareerPostSummary(raw);
  return {
    ...base,
    responsibilities: coerceStringArray(raw?.responsibilities ?? raw?.responsibility),
    requirements: coerceStringArray(raw?.requirements ?? raw?.requirement),
    requirementsHtml:
      typeof raw?.requirements === 'string' && looksLikeHtml(raw.requirements)
        ? raw.requirements
        : undefined,
    preferredSkills: coerceStringArray(
      raw?.preferredSkills ?? raw?.preferred_skills ?? raw?.preferred_skills_list
    ),
    compensation: raw?.compensation ?? raw?.salary ?? raw?.pay_range ?? formatSalaryRange(raw),
    applicationEmail: raw?.applicationEmail ?? raw?.application_email ?? raw?.apply_email,
    applicationSubject: raw?.applicationSubject ?? raw?.application_subject ?? raw?.apply_subject,
    applicationDeadline:
      formatDeadline(raw?.applicationDeadline ?? raw?.application_deadline ?? raw?.deadline) ??
      raw?.applicationDeadline ??
      raw?.application_deadline ??
      raw?.deadline,
    viewsCount: typeof raw?.views_count === 'number' ? raw.views_count : raw?.viewsCount,
    applicationsCount:
      typeof raw?.applications_count === 'number' ? raw.applications_count : raw?.applicationsCount,
    createdAt: raw?.created_at ?? raw?.createdAt,
    createdBy: raw?.created_by ?? raw?.createdBy,
    updatedAt: raw?.updated_at ?? raw?.updatedAt,
    updatedBy: raw?.updated_by ?? raw?.updatedBy,
    showEligibleToWorkInCanada:
      typeof raw?.show_eligible_to_work_in_canada === 'boolean'
        ? raw.show_eligible_to_work_in_canada
        : raw?.showEligibleToWorkInCanada,
    requireEligibleToWorkInCanada:
      typeof raw?.require_eligible_to_work_in_canada === 'boolean'
        ? raw.require_eligible_to_work_in_canada
        : raw?.requireEligibleToWorkInCanada,
    showValidDriversLicense:
      typeof raw?.show_valid_drivers_license === 'boolean'
        ? raw.show_valid_drivers_license
        : raw?.showValidDriversLicense,
    requireValidDriversLicense:
      typeof raw?.require_valid_drivers_license === 'boolean'
        ? raw.require_valid_drivers_license
        : raw?.requireValidDriversLicense,
    showDronePilotLicense:
      typeof raw?.show_drone_pilot_license === 'boolean'
        ? raw.show_drone_pilot_license
        : raw?.showDronePilotLicense,
    requireDronePilotLicense:
      typeof raw?.require_drone_pilot_license === 'boolean'
        ? raw.require_drone_pilot_license
        : raw?.requireDronePilotLicense,
  } as CareerPostDetail;
}

async function fetchCareerPostsList(): Promise<CareerPostSummary[]> {
  const res = await fetch(`${API_BASE_URL}/api/career/posts/`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? []);
  if (!Array.isArray(list)) return [];
  return list.map(normalizeCareerPostSummary).filter((p) => p.id !== '');
}

async function fetchCareerPostDetail(id: string | number): Promise<CareerPostDetail> {
  const res = await fetch(`${API_BASE_URL}/api/career/posts/${id}/`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load job details (${res.status})`);
  const data = await res.json();
  const obj = Array.isArray(data) ? data?.[0] : (data?.data ?? data);
  return normalizeCareerPostDetail(obj);
}

export default function CareersPage() {
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [positions, setPositions] = useState<CareerPostSummary[]>([]);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [detailsById, setDetailsById] = useState<Record<string, CareerPostDetail | undefined>>({});
  const [detailsLoadingById, setDetailsLoadingById] = useState<Record<string, boolean | undefined>>(
    {}
  );
  const [detailsErrorById, setDetailsErrorById] = useState<Record<string, string | undefined>>({});
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

  const positionsForRender = useMemo(() => positions, [positions]);

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
          (e instanceof Error ? e.message : null) ?? 'Failed to load open positions.'
        );
        setPositions([]);
      } finally {
        if (!cancelled) setPositionsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleTogglePosition = async (id: string | number) => {
    const key = String(id);
    setSelectedPositionId((prev) => (prev === key ? null : key));
    if (detailsById[key] || detailsLoadingById[key]) return;
    try {
      setDetailsLoadingById((prev) => ({ ...prev, [key]: true }));
      setDetailsErrorById((prev) => ({ ...prev, [key]: undefined }));
      const detail = await fetchCareerPostDetail(id);
      setDetailsById((prev) => ({ ...prev, [key]: detail }));
    } catch (e: unknown) {
      setDetailsErrorById((prev) => ({
        ...prev,
        [key]: e instanceof Error ? e.message : 'Failed to load job details.',
      }));
    } finally {
      setDetailsLoadingById((prev) => ({ ...prev, [key]: false }));
    }
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
      setSubmitError('Please upload your CV/Resume.');
      return;
    }
    const yesNoToBoolString = (v: '' | 'yes' | 'no') => (v === 'yes' ? 'true' : 'false');
    try {
      setSubmitLoading(true);
      const payload = new FormData();
      if (formData.position && formData.position !== 'general')
        payload.append('post', formData.position);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('cover_letter', formData.coverLetter);
      payload.append(
        'eligible_to_work_in_canada',
        yesNoToBoolString(formData.eligibleToWorkInCanada)
      );
      payload.append('valid_drivers_license', yesNoToBoolString(formData.validDriversLicense));
      payload.append('drone_pilot_license', yesNoToBoolString(formData.dronePilotLicense));
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
        throw new Error(`Submission failed (${res.status})`);
      }
      setSubmitSuccess('Application submitted successfully. Thank you!');
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
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FDFCF5' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

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
        .cr-job-card.is-open {
          border-color: rgba(69,68,17,0.3);
          box-shadow: 0 12px 40px rgba(69,68,17,0.12);
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

        .cr-toggle-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(69,68,17,0.07);
          border: 1px solid rgba(69,68,17,0.18);
          color: #454411;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background 0.2s, transform 0.3s;
        }
        .cr-toggle-btn:hover { background: rgba(69,68,17,0.14); }
        .cr-toggle-btn.open  { transform: rotate(180deg); }

        .cr-apply-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #454411; color: #f5f2e8;
          border: none; border-radius: 12px; padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 20px rgba(69,68,17,0.4);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          text-decoration: none; width: 100%; justify-content: center;
        }
        .cr-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(69,68,17,0.5);
          background: #5a5a16;
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
            We&apos;re Hiring
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
            Grow Your Career with <em style={{ color: '#BEA950' }}>TerraSkyAI</em>
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
            Help us revolutionize agriculture through AI and drone technology. Be part of a team
            making a real impact on farming and food security worldwide.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { val: 'AI-Powered', label: 'AgTech' },
              { val: 'Based In', label: 'Canada' },
              { val: 'Real-World', label: 'Impact' },
            ].map((s) => (
              <div key={s.val} style={{ textAlign: 'center' }}>
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
                  {s.val}
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
                  {s.label}
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
              Open Positions
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
              Current Opportunities
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
              Loading open positions…
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
                Couldn&apos;t load positions right now.
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
                No open positions at the moment. Please check back soon.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {positionsForRender.map((position) => {
              const key = String(position.id);
              const detail = detailsById[key];
              const isOpen = selectedPositionId === key;
              const isDetailLoading = !!detailsLoadingById[key];
              const detailError = detailsErrorById[key];
              const merged: CareerPostDetail = { ...position, ...(detail ?? {}) };

              return (
                <div key={position.id} className={`cr-job-card${isOpen ? ' is-open' : ''}`}>
                  {/* Header row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 16,
                    }}
                  >
                    <div style={{ flex: 1 }}>
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
                        {merged.title ?? 'Untitled Position'}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {merged.department && <span className="cr-badge">{merged.department}</span>}
                        {merged.location && <span className="cr-badge">📍 {merged.location}</span>}
                        {merged.type && <span className="cr-badge">{merged.type}</span>}
                        {merged.isRemote && <span className="cr-badge">🌐 Remote</span>}
                        {merged.status && <span className="cr-badge">{merged.status}</span>}
                      </div>
                    </div>
                    <button
                      className={`cr-toggle-btn${isOpen ? ' open' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePosition(position.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Short description */}
                  {typeof merged.description === 'string' &&
                    merged.description.trim().length > 0 && (
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 14,
                          color: '#7a7860',
                          marginTop: 14,
                          lineHeight: 1.7,
                        }}
                        dangerouslySetInnerHTML={{ __html: filterDescription(merged.description) }}
                      />
                    )}

                  {/* Expanded detail */}
                  {isOpen && (
                    <div
                      style={{
                        marginTop: 28,
                        paddingTop: 28,
                        borderTop: '1px solid rgba(69,68,17,0.1)',
                      }}
                    >
                      {isDetailLoading && (
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 13,
                            color: '#9a9878',
                          }}
                        >
                          Loading details…
                        </p>
                      )}
                      {!isDetailLoading && detailError && (
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 13,
                            color: '#b91c1c',
                          }}
                        >
                          {detailError}
                        </p>
                      )}

                      {!isDetailLoading && !detailError && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                          {/* Meta chips */}
                          {(merged.compensation ||
                            merged.applicationDeadline ||
                            merged.applicationEmail) && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                              {merged.compensation && (
                                <div
                                  style={{
                                    background: 'rgba(69,68,17,0.05)',
                                    border: '1px solid rgba(69,68,17,0.12)',
                                    borderRadius: 12,
                                    padding: '10px 16px',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 10,
                                      color: '#8B5E3C',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.1em',
                                      marginBottom: 3,
                                    }}
                                  >
                                    Compensation
                                  </p>
                                  <p
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 14,
                                      color: '#2d2e0a',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {merged.compensation}
                                  </p>
                                </div>
                              )}
                              {merged.applicationDeadline && (
                                <div
                                  style={{
                                    background: 'rgba(69,68,17,0.05)',
                                    border: '1px solid rgba(69,68,17,0.12)',
                                    borderRadius: 12,
                                    padding: '10px 16px',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 10,
                                      color: '#8B5E3C',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.1em',
                                      marginBottom: 3,
                                    }}
                                  >
                                    Deadline
                                  </p>
                                  <p
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 14,
                                      color: '#2d2e0a',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {merged.applicationDeadline}
                                  </p>
                                </div>
                              )}
                              {merged.applicationEmail && (
                                <div
                                  style={{
                                    background: 'rgba(69,68,17,0.05)',
                                    border: '1px solid rgba(69,68,17,0.12)',
                                    borderRadius: 12,
                                    padding: '10px 16px',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 10,
                                      color: '#8B5E3C',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.1em',
                                      marginBottom: 3,
                                    }}
                                  >
                                    Apply Email
                                  </p>
                                  <a
                                    href={`mailto:${merged.applicationEmail}`}
                                    style={{
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 14,
                                      color: '#454411',
                                      fontWeight: 600,
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {merged.applicationEmail}
                                  </a>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Responsibilities */}
                          {merged.responsibilities && (
                            <div>
                              <h4
                                style={{
                                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                                  fontSize: '1.25rem',
                                  fontWeight: 700,
                                  color: '#2d2e0a',
                                  marginBottom: 12,
                                }}
                              >
                                Key Responsibilities
                              </h4>
                              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {merged.responsibilities
                                  .filter(
                                    (r) =>
                                      !r.includes(
                                        'Assist with new and existing CV model development through data collection, labeling, ground truthing and validation'
                                      )
                                  )
                                  .map((r, i) => (
                                    <li
                                      key={i}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 10,
                                        fontFamily: "'DM Sans',sans-serif",
                                        fontSize: 14,
                                        color: '#545454',
                                        lineHeight: 1.6,
                                      }}
                                    >
                                      <span
                                        style={{ color: '#8B5E3C', marginTop: 2, flexShrink: 0 }}
                                      >
                                        ▸
                                      </span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements */}
                          {merged.requirements && (
                            <div>
                              <h4
                                style={{
                                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                                  fontSize: '1.25rem',
                                  fontWeight: 700,
                                  color: '#2d2e0a',
                                  marginBottom: 12,
                                }}
                              >
                                Requirements
                              </h4>
                              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {merged.requirements.map((r, i) => (
                                  <li
                                    key={i}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 10,
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 14,
                                      color: '#545454',
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    <span style={{ color: '#8B5E3C', marginTop: 2, flexShrink: 0 }}>
                                      ▸
                                    </span>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: typeof r === 'string' ? r : String(r),
                                      }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {!merged.requirements && merged.requirementsHtml && (
                            <div>
                              <h4
                                style={{
                                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                                  fontSize: '1.25rem',
                                  fontWeight: 700,
                                  color: '#2d2e0a',
                                  marginBottom: 12,
                                }}
                              >
                                Requirements
                              </h4>
                              <div
                                style={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: 14,
                                  color: '#545454',
                                  lineHeight: 1.7,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: filterDescription(merged.requirementsHtml),
                                }}
                              />
                            </div>
                          )}

                          {/* Preferred skills */}
                          {merged.preferredSkills && (
                            <div>
                              <h4
                                style={{
                                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                                  fontSize: '1.25rem',
                                  fontWeight: 700,
                                  color: '#2d2e0a',
                                  marginBottom: 12,
                                }}
                              >
                                Preferred Skills
                              </h4>
                              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {merged.preferredSkills.map((s, i) => (
                                  <li
                                    key={i}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 10,
                                      fontFamily: "'DM Sans',sans-serif",
                                      fontSize: 14,
                                      color: '#545454',
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    <span style={{ color: '#8B5E3C', marginTop: 2, flexShrink: 0 }}>
                                      ▸
                                    </span>
                                    <span>{s}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <button
                            className="cr-apply-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({
                                ...prev,
                                position: String(merged.id ?? ''),
                              }));
                              document
                                .getElementById('application-form')
                                ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            Apply for this Position
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
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
              Apply Now
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
              Submit Your <em style={{ color: '#8B5E3C' }}>Application</em>
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
              Fill out the form below to apply for a position or submit your CV for future
              opportunities.
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="cr-form-input"
                    />
                  </div>
                  <div>
                    <label className="cr-form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="cr-form-input"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="cr-form-label" htmlFor="position">
                    Position Applying For *
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
                    <option value="">Select a position…</option>
                    {positionsForRender.map((pos) => (
                      <option key={pos.id} value={String(pos.id)}>
                        {pos.title ?? String(pos.id)}
                      </option>
                    ))}
                    <option value="general">General Application</option>
                  </select>
                </div>

                {/* Radio questions */}
                <div
                  className="cr-radio-grid"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
                >
                  {[
                    {
                      name: 'eligibleToWorkInCanada',
                      label: 'Eligible to work in Canada',
                      value: formData.eligibleToWorkInCanada,
                    },
                    {
                      name: 'validDriversLicense',
                      label: "Valid driver's license",
                      value: formData.validDriversLicense,
                    },
                    {
                      name: 'dronePilotLicense',
                      label: 'Drone pilot license',
                      value: formData.dronePilotLicense,
                    },
                  ].map((q) => (
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
                        {q.label} *
                      </p>
                      <div style={{ display: 'flex', gap: 24 }}>
                        {['yes', 'no'].map((opt) => (
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
                              checked={q.value === opt}
                              onChange={handleInputChange}
                              style={{ accentColor: '#454411', width: 16, height: 16 }}
                            />
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cover letter */}
                <div>
                  <label className="cr-form-label" htmlFor="coverLetter">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you're interested in joining TerraSkyAI…"
                    className="cr-form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="cr-form-label" htmlFor="cv">
                    Upload CV / Resume *
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
                    Accepted: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="cr-submit-btn"
                  style={{ marginTop: 8 }}
                >
                  {submitLoading ? 'Submitting…' : 'Submit Application'}
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
