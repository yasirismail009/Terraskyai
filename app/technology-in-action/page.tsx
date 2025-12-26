import Image from "next/image";

const benefits = [
  {
    title: "Seed Production Industry",
    description: "Hybrid canola seed purity through off-type/volunteer canola detection, yield estimation for supply chain optimization.",
    image: "/assets/img_0486.jpeg",
  },
  {
    title: "Agriculture Consultants",
    description: "Precise, real-time field intelligence to enhance decision-making, improve service value, and strengthen client outcomes.",
    image: "/assets/img_1054.jpeg",
  },
  {
    title: "Growers",
    description: "Insect and weed detection, spot-treatment prescription reducing cost of production and enhance profitability.",
    image: "/assets/img_1058.jpeg",
  },
  {
    title: "Insurance Companies",
    description: "Provide objective, high-confidence crop assessments that improve risk evaluation, policy pricing accuracy, and claims efficiency.",
    image: "/assets/img_1059.jpeg",
  },
  {
    title: "Agri-Retails",
    description: "Drive profitability by enabling faster, data-backed agronomic decisions, reducing input wastage, and improving crop performance.",
    image: "/assets/robot-arm-planting-tree-green-field.jpg",
  },
  {
    title: "Potato Processing Industry",
    description: "Delivers precise, field-level intelligence that helps secure reliable supply, improve quality consistency, and reduce production risk.",
    image: "/assets/smart-farming-with-agriculture-iot.jpg",
  },
];

export default function TechnologyInActionPage() {
  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-left space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
              Technology In Action
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#454411]">
              TerraSkyAI is revolutionizing agriculture with real-time, AI-powered intelligence
            </h1>
            <p className="text-lg leading-relaxed text-[#545454] max-w-4xl">
              Through satellite imagery, IoT sensors, and machine learning, TerraSkyAI delivers
              instant visibility into crop health, soil conditions, and weather patterns. Farmers
              can optimize irrigation, detect pests early, and boost yields while reducing costs
              and environmental impact—bridging traditional farming with modern innovation for a
              sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* How They Benefit Section */}
      <section className="bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How can they benefit by using TerraSkyAI?
            </h2>
            <p className="text-lg text-[#545454] max-w-3xl mx-auto">
              Discover how different sectors of agriculture leverage TerraSkyAI for enhanced productivity and profitability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20">
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#454411] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#545454]">
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

