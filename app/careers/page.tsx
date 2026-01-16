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
  showAccessToOwnVehicle?: boolean;
  requireAccessToOwnVehicle?: boolean;
  showDronePilotLicense?: boolean;
  requireDronePilotLicense?: boolean;
};

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://admin.terraskyai.com';

function formatCurrencyAmount(value: unknown, currency: string): string | undefined {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isFinite(n)) return undefined;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n);
  } catch {
    // Fallback for invalid currency codes or Intl issues
    return `${currency} ${n.toFixed(2)}`;
  }
}

function formatSalaryRange(raw: any): string | undefined {
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
    // If this is rich HTML content, keep it as HTML elsewhere (don't split into strings).
    if (looksLikeHtml(value)) return undefined;
    const parts = value
      .split(/\r?\n|•/g)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }
  return undefined;
}

function normalizeCareerPostSummary(raw: any): CareerPostSummary {
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
  };
}

function normalizeCareerPostDetail(raw: any): CareerPostDetail {
  const base = normalizeCareerPostSummary(raw);
  return {
    ...base,
    responsibilities: coerceStringArray(raw?.responsibilities ?? raw?.responsibility),
    requirements: coerceStringArray(raw?.requirements ?? raw?.requirement),
    requirementsHtml:
      typeof raw?.requirements === 'string' && looksLikeHtml(raw.requirements) ? raw.requirements : undefined,
    preferredSkills: coerceStringArray(raw?.preferredSkills ?? raw?.preferred_skills ?? raw?.preferred_skills_list),
    compensation: raw?.compensation ?? raw?.salary ?? raw?.pay_range ?? formatSalaryRange(raw),
    applicationEmail: raw?.applicationEmail ?? raw?.application_email ?? raw?.apply_email,
    applicationSubject: raw?.applicationSubject ?? raw?.application_subject ?? raw?.apply_subject,
    applicationDeadline:
      formatDeadline(raw?.applicationDeadline ?? raw?.application_deadline ?? raw?.deadline) ??
      (raw?.applicationDeadline ?? raw?.application_deadline ?? raw?.deadline),
    viewsCount: typeof raw?.views_count === 'number' ? raw.views_count : raw?.viewsCount,
    applicationsCount: typeof raw?.applications_count === 'number' ? raw.applications_count : raw?.applicationsCount,
    createdAt: raw?.created_at ?? raw?.createdAt,
    createdBy: raw?.created_by ?? raw?.createdBy,
    updatedAt: raw?.updated_at ?? raw?.updatedAt,
    updatedBy: raw?.updated_by ?? raw?.updatedBy,
    showEligibleToWorkInCanada: typeof raw?.show_eligible_to_work_in_canada === 'boolean' ? raw.show_eligible_to_work_in_canada : raw?.showEligibleToWorkInCanada,
    requireEligibleToWorkInCanada: typeof raw?.require_eligible_to_work_in_canada === 'boolean' ? raw.require_eligible_to_work_in_canada : raw?.requireEligibleToWorkInCanada,
    showValidDriversLicense: typeof raw?.show_valid_drivers_license === 'boolean' ? raw.show_valid_drivers_license : raw?.showValidDriversLicense,
    requireValidDriversLicense: typeof raw?.require_valid_drivers_license === 'boolean' ? raw.require_valid_drivers_license : raw?.requireValidDriversLicense,
    showAccessToOwnVehicle: typeof raw?.show_access_to_own_vehicle === 'boolean' ? raw.show_access_to_own_vehicle : raw?.showAccessToOwnVehicle,
    requireAccessToOwnVehicle: typeof raw?.require_access_to_own_vehicle === 'boolean' ? raw.require_access_to_own_vehicle : raw?.requireAccessToOwnVehicle,
    showDronePilotLicense: typeof raw?.show_drone_pilot_license === 'boolean' ? raw.show_drone_pilot_license : raw?.showDronePilotLicense,
    requireDronePilotLicense: typeof raw?.require_drone_pilot_license === 'boolean' ? raw.require_drone_pilot_license : raw?.requireDronePilotLicense,
  };
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
  const [detailsLoadingById, setDetailsLoadingById] = useState<Record<string, boolean | undefined>>({});
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
    accessToOwnVehicle: '' as '' | 'yes' | 'no',
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
      } catch (e: any) {
        if (cancelled) return;
        setPositionsError(e?.message ?? 'Failed to load open positions.');
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
    } catch (e: any) {
      setDetailsErrorById((prev) => ({ ...prev, [key]: e?.message ?? 'Failed to load job details.' }));
    } finally {
      setDetailsLoadingById((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
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
      if (formData.position && formData.position !== 'general') {
        payload.append('post', formData.position);
      }
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('cover_letter', formData.coverLetter);
      payload.append('eligible_to_work_in_canada', yesNoToBoolString(formData.eligibleToWorkInCanada));
      payload.append('valid_drivers_license', yesNoToBoolString(formData.validDriversLicense));
      payload.append('access_to_own_vehicle', yesNoToBoolString(formData.accessToOwnVehicle));
      payload.append('drone_pilot_license', yesNoToBoolString(formData.dronePilotLicense));
      payload.append('cv', formData.cv);

      const res = await fetch(`${API_BASE_URL}/api/career/applications/`, {
        method: 'POST',
        body: payload,
      });

      const maybeJson = await res
        .json()
        .catch(() => null);

      if (!res.ok) {
        // Try to display backend field errors if present (DRF-style)
        if (maybeJson && typeof maybeJson === 'object') {
          const messages = Object.entries(maybeJson as Record<string, unknown>)
            .map(([k, v]) => {
              if (Array.isArray(v)) return `${k}: ${v.join(' ')}`;
              if (typeof v === 'string') return `${k}: ${v}`;
              return null;
            })
            .filter(Boolean);
          if (messages.length) {
            throw new Error(messages.join(' | '));
          }
        }
        throw new Error(`Submission failed (${res.status})`);
      }

      setSubmitSuccess('Application submitted successfully. Thank you!');
      // Reset all form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
        cv: null,
        eligibleToWorkInCanada: '',
        validDriversLicense: '',
        accessToOwnVehicle: '',
        dronePilotLicense: '',
      });
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setSubmitError(err?.message ?? 'Failed to submit application.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#454411] mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-[#545454] max-w-3xl mx-auto leading-relaxed">
            Help us revolutionize agriculture through AI and technology. Be part of a team that's making a real impact on farming and food security.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#454411] mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-[#545454]">
              Explore current opportunities to join TerraSkyAI
            </p>
          </div>

          {positionsLoading && (
            <div className="text-center text-[#545454] py-10">Loading open positions…</div>
          )}

          {!positionsLoading && positionsError && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200 text-center mb-12">
              <p className="text-[#545454] mb-2">We couldn’t load open positions right now.</p>
              <p className="text-sm text-red-700">{positionsError}</p>
            </div>
          )}

          {!positionsLoading && !positionsError && positionsForRender.length === 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20 text-center mb-12">
              <p className="text-[#545454]">No open positions at the moment. Please check back soon.</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 mb-12">
            {positionsForRender.map((position) => {
              const key = String(position.id);
              const detail = detailsById[key];
              const isOpen = selectedPositionId === key;
              const isDetailLoading = !!detailsLoadingById[key];
              const detailError = detailsErrorById[key];
              const merged: CareerPostDetail = { ...position, ...(detail ?? {}) };

              return (
              <div
                key={position.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleTogglePosition(position.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#454411] mb-2">
                      {merged.title ?? 'Untitled Position'}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-[#545454]">
                      {merged.department && (
                        <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                          {merged.department}
                        </span>
                      )}
                      {merged.location && (
                        <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                          {merged.location}
                        </span>
                      )}
                      {merged.type && (
                        <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                          {merged.type}
                        </span>
                      )}
                      {merged.isRemote && (
                        <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                          Remote
                        </span>
                      )}
                      {merged.status && (
                        <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                          {merged.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </button>
                </div>

                {typeof merged.description === 'string' && merged.description.trim().length > 0 && (
                  <div
                    className="text-base text-[#545454] mb-4"
                    dangerouslySetInnerHTML={{ __html: merged.description }}
                  />
                )}

                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-[#b0b0b0]/30 space-y-6">
                    {isDetailLoading && (
                      <div className="text-sm text-[#545454]">Loading job details…</div>
                    )}

                    {!isDetailLoading && detailError && (
                      <div className="text-sm text-red-700">{detailError}</div>
                    )}

                    {!isDetailLoading && !detailError && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {merged.compensation && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Compensation</div>
                            <div className="font-semibold text-[#454411]">{merged.compensation}</div>
                          </div>
                        )}
                        {merged.applicationDeadline && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Application deadline</div>
                            <div className="font-semibold text-[#454411]">{merged.applicationDeadline}</div>
                          </div>
                        )}
                        {typeof merged.viewsCount === 'number' && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Views</div>
                            <div className="font-semibold text-[#454411]">{merged.viewsCount}</div>
                          </div>
                        )}
                        {typeof merged.applicationsCount === 'number' && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Applications</div>
                            <div className="font-semibold text-[#454411]">{merged.applicationsCount}</div>
                          </div>
                        )}
                        {merged.applicationEmail && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4 md:col-span-2">
                            <div className="text-xs text-[#545454]">Application email</div>
                            <a
                              href={`mailto:${merged.applicationEmail}`}
                              className="font-semibold text-[#454411] underline hover:text-[#BEA950]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {merged.applicationEmail}
                            </a>
                          </div>
                        )}
                        {(merged.createdAt || merged.createdBy) && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Created</div>
                            <div className="text-sm text-[#454411]">{merged.createdAt ?? ''}</div>
                            <div className="text-xs text-[#545454]">{merged.createdBy ?? ''}</div>
                          </div>
                        )}
                        {(merged.updatedAt || merged.updatedBy) && (
                          <div className="bg-[#E6E2D6] rounded-xl p-4">
                            <div className="text-xs text-[#545454]">Updated</div>
                            <div className="text-sm text-[#454411]">{merged.updatedAt ?? ''}</div>
                            <div className="text-xs text-[#545454]">{merged.updatedBy ?? ''}</div>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDetailLoading && !detailError && (
                      <div className="bg-white rounded-xl border border-[#8B5E3C]/20 p-4">
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">Eligibility / Requirements Flags</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#545454]">
                          {typeof merged.showEligibleToWorkInCanada === 'boolean' && (
                            <li>Eligible to work in Canada (show: {merged.showEligibleToWorkInCanada ? 'Yes' : 'No'}, required: {merged.requireEligibleToWorkInCanada ? 'Yes' : 'No'})</li>
                          )}
                          {typeof merged.showValidDriversLicense === 'boolean' && (
                            <li>Valid driver’s license (show: {merged.showValidDriversLicense ? 'Yes' : 'No'}, required: {merged.requireValidDriversLicense ? 'Yes' : 'No'})</li>
                          )}
                          {typeof merged.showAccessToOwnVehicle === 'boolean' && (
                            <li>Access to own vehicle (show: {merged.showAccessToOwnVehicle ? 'Yes' : 'No'}, required: {merged.requireAccessToOwnVehicle ? 'Yes' : 'No'})</li>
                          )}
                          {typeof merged.showDronePilotLicense === 'boolean' && (
                            <li>Drone pilot license (show: {merged.showDronePilotLicense ? 'Yes' : 'No'}, required: {merged.requireDronePilotLicense ? 'Yes' : 'No'})</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {!isDetailLoading && !detailError && merged.responsibilities && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-2 text-[#545454]">
                          {merged.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#BEA950] mt-1">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!isDetailLoading && !detailError && merged.requirements && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Requirements:
                        </h4>
                        <ul className="space-y-2 text-[#545454]">
                          {merged.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#BEA950] mt-1">•</span>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: typeof req === 'string' ? req : String(req),
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!isDetailLoading && !detailError && !merged.requirements && merged.requirementsHtml && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Requirements:
                        </h4>
                        <div
                          className="text-[#545454] space-y-2"
                          dangerouslySetInnerHTML={{ __html: merged.requirementsHtml }}
                        />
                      </div>
                    )}

                    {!isDetailLoading && !detailError && merged.preferredSkills && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Preferred Skills:
                        </h4>
                        <ul className="space-y-2 text-[#545454]">
                          {merged.preferredSkills.map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#BEA950] mt-1">•</span>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!isDetailLoading && !detailError && merged.compensation && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Compensation:
                        </h4>
                        <p className="text-[#545454]">
                          {merged.compensation}
                        </p>
                      </div>
                    )}

                    {!isDetailLoading && !detailError && merged.applicationDeadline && (
                      <div className="pt-4 border-t border-[#b0b0b0]/30">
                        <p className="text-sm text-[#545454] mb-2">
                          <strong>Application Deadline:</strong> {merged.applicationDeadline}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, position: String(merged.id ?? '') }));
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-[#454411] hover:bg-[#454411]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Apply for this Position
                    </button>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#454411] mb-4">
              Submit Your Application
            </h2>
            <p className="text-lg text-[#545454]">
              Fill out the form below to apply for a position or submit your CV for future opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#E6E2D6] rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#454411] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#454411] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#454411] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-[#454411] mb-2">
                  Position Applying For *
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411] bg-white"
                >
                  <option value="">Select a position</option>
                  {positionsForRender.map((pos) => (
                    <option key={pos.id} value={String(pos.id)}>
                      {pos.title ?? String(pos.id)}
                    </option>
                  ))}
                  <option value="general">General Application</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 border border-[#b0b0b0]/40">
                  <p className="text-sm font-semibold text-[#454411] mb-3">Eligible to work in Canada *</p>
                  <div className="flex items-center gap-6 text-sm text-[#545454]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="eligibleToWorkInCanada"
                        value="yes"
                        required
                        checked={formData.eligibleToWorkInCanada === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="eligibleToWorkInCanada"
                        value="no"
                        required
                        checked={formData.eligibleToWorkInCanada === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#b0b0b0]/40">
                  <p className="text-sm font-semibold text-[#454411] mb-3">Valid driver’s license *</p>
                  <div className="flex items-center gap-6 text-sm text-[#545454]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="validDriversLicense"
                        value="yes"
                        required
                        checked={formData.validDriversLicense === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="validDriversLicense"
                        value="no"
                        required
                        checked={formData.validDriversLicense === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#b0b0b0]/40">
                  <p className="text-sm font-semibold text-[#454411] mb-3">Access to own vehicle *</p>
                  <div className="flex items-center gap-6 text-sm text-[#545454]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accessToOwnVehicle"
                        value="yes"
                        required
                        checked={formData.accessToOwnVehicle === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accessToOwnVehicle"
                        value="no"
                        required
                        checked={formData.accessToOwnVehicle === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#b0b0b0]/40">
                  <p className="text-sm font-semibold text-[#454411] mb-3">Drone pilot license *</p>
                  <div className="flex items-center gap-6 text-sm text-[#545454]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="dronePilotLicense"
                        value="yes"
                        required
                        checked={formData.dronePilotLicense === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="dronePilotLicense"
                        value="no"
                        required
                        checked={formData.dronePilotLicense === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#454411] mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                  placeholder="Tell us why you're interested in joining TerraSkyAI..."
                />
              </div>

              <div>
                <label htmlFor="cv" className="block text-sm font-semibold text-[#454411] mb-2">
                  Upload CV/Resume *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="cv"
                  name="cv"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#454411] file:text-white hover:file:bg-[#454411]/80"
                />
                <p className="text-xs text-[#b0b0b0] mt-2">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-[#454411] hover:bg-[#454411]/80 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors"
              >
                {submitLoading ? 'Submitting…' : 'Submit Application'}
              </button>

              {submitError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800">{submitError}</p>
                </div>
              )}

              {submitSuccess && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-base font-semibold text-green-800">{submitSuccess}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
