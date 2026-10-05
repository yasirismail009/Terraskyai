import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const benefits = [
  { key: 'seed', image: '/assets/Picture1.jpg' },
  { key: 'potato', image: '/assets/Picture2.jpg' },
  { key: 'retail', image: '/assets/AG.png' },
  { key: 'growers', image: '/assets/Growers.png' },
  { key: 'insurance', image: '/assets/insurance.png' },
] as const;

export default async function TechnologyInActionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TechnologyInAction');

  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-left space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
              {t('hero.badge')}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#454411]">
              {t('hero.title')}
            </h1>
            <p className="text-lg leading-relaxed text-[#545454] max-w-4xl">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* How They Benefit Section */}
      <section className="bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('benefits.title')}</h2>
            <p className="text-lg text-[#545454] max-w-3xl mx-auto">
              {t('benefits.description')}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {benefits.map((benefit, index) => {
              const title = t(`benefits.items.${benefit.key}.title`);
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
                      <h3 className="text-lg font-bold text-[#454411] mb-2">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#545454]">
                        {t(`benefits.items.${benefit.key}.description`)}
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