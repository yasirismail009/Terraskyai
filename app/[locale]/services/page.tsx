import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const services = [
  {
    key: 'analytics',
    image: '/assets/robot-arm-planting-tree-green-field.jpg',
  },
  {
    key: 'edge',
    image: '/assets/img_1059.jpeg',
  },
  {
    key: 'iot',
    image: '/assets/smart-farming-with-agriculture-iot.jpg',
  },
] as const;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Services');

  return (
    <div className="min-h-screen bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#8B5E3C]">
          {t('badge')}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('title')}</h1>
        <div className="h-1 w-16 bg-[#454411] mx-auto mb-10 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {services.map((service) => {
          const title = t(`items.${service.key}.title`);
          return (
            <div
              key={service.key}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#8B5E3C]/20 hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  priority
                />
              </div>
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold leading-snug text-[#454411]">{title}</h2>
                <p className="text-base leading-relaxed text-[#545454]">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}