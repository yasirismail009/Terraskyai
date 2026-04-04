import Image from "next/image";

const benefits = [
  {
    title: "Seed Production Industry",
    description: "Hybrid canola seed purity through off-type/volunteer canola detection, yield estimation for supply chain optimization.",
    image: "/assets/Seed Production.png",
  },
  {
    title: "Potato Processing Industry",
    description: "Delivers precise, field-level intelligence that helps secure reliable supply, improve quality consistency, and reduce production risk.",
    image: "/assets/potato.jpeg",
  },
  {
    title: "Ag-Retails",
    description: "Drive profitability by enabling faster, data-backed agronomic decisions, reducing input wastage, and improving crop performance.",
    image: "/assets/AG.png",
  },
  {
    title: "Growers",
    description: "Insect and weed detection, spot-treatment prescription reducing cost of production and enhance profitability.",
    image: "/assets/Growers.png",
  },
  {
    title: "Insurance Companies",
    description: "Provide objective, high-confidence crop assessments that improve risk evaluation, policy pricing accuracy, and claims efficiency.",
    image: "/assets/insurance.png",
  },
];

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Vision Section ── */}
      <section className="relative w-full h-full overflow-hidden">
        <div className="relative w-full h-screen md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/drone1.png"
            alt="Aerial view of forest and agricultural fields"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#454411]/80"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-[#454411]/40"></div>
          <div className="absolute top-6 left-6 z-10">
            <Image
              src="/assets/Logo Light.png"
              alt="TerraSkyAI Logo"
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
  Our Vision
</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif" }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center md:text-left">
              Making Precision Farming Sustainable and Profitable
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
  OUR MISSION
</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif" }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#545454] mb-6 leading-tight">
                To empower farmers globally
              </h2>
              <p style={{ fontFamily:"'DM Sans',sans-serif" }} className="text-lg text-[#545454] leading-relaxed">
                by developing advanced, innovative AI-driven precision farming technologies that optimize farm operations, enhance productivity, and promote sustainable farming.
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
                        alt="Agricultural field monitoring dashboard"
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
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border-2 border-[#BEA950]">
                <div className="w-10 h-10 bg-gradient-to-br from-[#BEA950] to-[#8B5E3C] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
  Technology In Action
</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#454411]">
              TerraSkyAI is revolutionizing agriculture with real-time, AI-powered intelligence
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif" }} className="text-lg leading-relaxed text-[#545454] max-w-4xl">
              Through satellite imagery, IoT sensors, and machine learning, TerraSkyAI delivers
              instant visibility into crop health, soil conditions, and weather patterns. Farmers
              can optimize irrigation, detect pests early, and boost yields while reducing costs
              and environmental impact—bridging traditional farming with modern innovation for a
              sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* ── How They Benefit ── */}
      <section className="bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif" }} className="text-3xl sm:text-4xl font-bold mb-4">
              Our Stakeholders
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif" }} className="text-lg text-[#545454] max-w-3xl mx-auto">
              Discover how different sectors of agriculture leverage TerraSkyAI for enhanced productivity and profitability
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20 ${
                  index < 2
                    ? 'col-span-12 md:col-span-6'
                    : 'col-span-12 md:col-span-4'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-60 rounded-lg overflow-hidden">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif" }} className="text-lg font-bold text-[#454411] mb-2">
                      {benefit.title}
                    </h3>
                    <p style={{ fontFamily:"'DM Sans',sans-serif" }} className="text-sm leading-relaxed text-[#545454]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}