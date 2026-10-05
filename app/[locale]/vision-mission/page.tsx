import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const benefits = [
  { key: 'seed', image: '/assets/Seed Production.png' },
  { key: 'potato', image: '/assets/potato.jpeg' },
  { key: 'retail', image: '/assets/AG.png' },
  { key: 'growers', image: '/assets/Growers.png' },
  { key: 'insurance', image: '/assets/insurance.png' },
] as const;

export default async function VisionMissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('VisionMission');

  return (
    <div className="min-h-screen bg-white">
      {/* ── Vision Section ── */}
      <section className="relative w-full h-full overflow-hidden">
        <div className="relative w-full h-screen md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/drone1.png"
            alt={t('vision.imageAlt')}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#454411]/80"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-[#454411]/40"></div>
          <div className="absolute top-6 left-6 z-10">
            <Image
              src="/assets/Logo Light.png"
              alt={t('vision.logoAlt')}
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-2/3 flex flex-col justify-center items-center md:items-start px-8 md:px-16 z-10">
            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-xl font-bold uppercase tracking-widest text-white/90 mb-4"
            >
              {t('vision.badge')}
            </p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center md:text-left"
            >
              {t('vision.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="text-xl font-bold uppercase tracking-widest text-[#b0b0b0] mb-4"
              >
                {t('mission.badge')}
              </p>
              <h2
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#545454] mb-6 leading-tight"
              >
                {t('mission.title')}
              </h2>
              <p
                style={{ fontFamily: "'DM Sans',sans-serif" }}
                className="text-lg text-[#545454] leading-relaxed"
              >
                {t('mission.description')}
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <div className="bg-[#b0b0b0] p-2">
                  <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative h-96">
                      <Image
                        src="/assets/vision.png"
                        alt={t('mission.imageAlt')}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border-2 border-[#BEA950]">
                <div className="w-10 h-10 bg-[#BEA950] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border-2 border-[#BEA950]">
                <div className="w-10 h-10 bg-gradient-to-br from-[#BEA950] to-[#8B5E3C] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology In Action ── */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-left space-y-4">
            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-xl font-bold uppercase tracking-widest text-[#8B5E3C]"
            >
              {t('tech.badge')}
            </p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#454411]"
            >
              {t('tech.title')}
            </h2>
            <p
              style={{ fontFamily: "'DM Sans',sans-serif" }}
              className="text-lg leading-relaxed text-[#545454] max-w-4xl"
            >
              {t('tech.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ── How They Benefit ── */}
      <section className="bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              {t('stakeholders.title')}
            </h2>
            <p
              style={{ fontFamily: "'DM Sans',sans-serif" }}
              className="text-lg text-[#545454] max-w-3xl mx-auto"
            >
              {t('stakeholders.description')}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {benefits.map((benefit, index) => {
              const title = t(`stakeholders.items.${benefit.key}.title`);
              return (
                <div
                  key={benefit.key}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20 ${
                    index < 2 ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-4'
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-60 rounded-lg overflow-hidden">
                      <Image
                        src={benefit.image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div>
                      <h3
                        style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
                        className="text-lg font-bold text-[#454411] mb-2"
                      >
                        {title}
                      </h3>
                      <p
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                        className="text-sm leading-relaxed text-[#545454]"
                      >
                        {t(`stakeholders.items.${benefit.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}