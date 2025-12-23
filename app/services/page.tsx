import Image from "next/image";

const services = [
  {
    title: "AI-Driven Crop & Soil Analytics",
    description:
      "Predict yields, detect pests, and optimize irrigation with hyper-accurate AI models trained on millions of agricultural data points.",
    image: "/assets/robot-arm-planting-tree-green-field.jpg",
  },
  {
    title: "Edge-Powered Real-Time Monitoring",
    description:
      "Process data locally with edge devices to reduce latency, cut costs, and deliver instant insights—even in low-connectivity rural areas.",
    image: "/assets/img_1059.jpeg",
  },
  {
    title: "IoT-Enabled Precision Farming",
    description:
      "Deploy smart sensors and drones to monitor soil health, weather patterns, and crop growth, turning raw data into actionable steps.",
    image: "/assets/smart-farming-with-agriculture-iot.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#d6e2cd] text-[#383F19] px-4 sm:px-6 lg:px-10 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4">
          Services
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          What We Deliver
        </h1>
        <div className="h-1 w-16 bg-[#383F19] mx-auto mb-10 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white/70 rounded-xl shadow-sm overflow-hidden border border-white/40 hover:shadow-md transition-shadow"
          >
            <div className="relative h-52 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                priority
              />
            </div>
            <div className="p-6 space-y-3 text-[#383F19]">
              <h2 className="text-xl font-semibold leading-snug">
                {service.title}
              </h2>
              <p className="text-base leading-relaxed opacity-90">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

