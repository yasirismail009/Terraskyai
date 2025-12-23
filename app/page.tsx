import Image from "next/image";

const services = [
  {
    title: "AI-Driven Crop & Soil Analytics",
    tagline: "End to end service",
    description:
      "Predict yields, detect pests, and optimize irrigation with hyper-accurate AI models trained on millions of agricultural data points.",
    image: "/assets/robot-arm-planting-tree-green-field.jpg",
  },
  {
    title: "Edge-Powered Real-Time Monitoring",
    tagline: "Real-time insights",
    description:
      "Process data locally with edge devices to reduce latency, cut costs, and deliver instant insights—even in low-connectivity rural areas.",
    image: "/assets/img_1059.jpeg",
  },
  {
    title: "IoT-Enabled Precision Farming",
    tagline: "Sensor-first approach",
    description:
      "Deploy smart sensors and drones to monitor soil health, weather patterns, and crop growth, turning raw data into actionable steps.",
    image: "/assets/smart-farming-with-agriculture-iot.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <section 
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 font-sans bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/img_0486.jpeg')`,
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10  mx-auto text-center items-center justify-center flex flex-col">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-lg">
          ENHANCING AGRICULTURE THROUGH AI
          </h1>

          {/* Sub-headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium rounded-lg w-fit bg-white/90 text-[#383F19] mb-3 leading-tight tracking-tight drop-shadow-lg">
            <span className="px-2 py-1">Fast, Easy, and Accurate</span>
          </h2>

          {/* Descriptive Text */}
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 font-normal drop-shadow-md">
            Leverage advanced drone imagery and AI technology to optimize your crop scouting, increase yields, and make data-driven decisions for your farm.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#383F19] hover:bg-[#383F19]/80 text-white px-8 py-3 rounded-lg font-medium text-base transition-colors shadow-md hover:shadow-lg">
              Get Started
            </button>
            <button className="bg-white/90 hover:bg-white text-[#383F19] border border-white/50 px-8 py-3 rounded-lg font-medium text-base transition-colors shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-[#d6e2cd] text-[#383F19] px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            What We Deliver
          </h2>
          <div className="h-1 w-16 bg-[#383F19] mx-auto mb-10 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row ${
                  isEven ? "" : "md:flex-row-reverse"
                } bg-white rounded-3xl shadow-lg border border-white/60 overflow-hidden`}
              >
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#383F19]/10 text-sm font-medium w-fit">
                    <span>●</span>
                    <span>{service.tagline}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-snug text-[#383F19]">
                    {service.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[#383F19]/90">
                    {service.description}
                  </p>
                  <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#383F19] px-5 py-3 text-white font-semibold shadow-md hover:bg-[#383F19]/80 transition-colors">
                    Explore More
                    <span aria-hidden>→</span>
                  </button>
                </div>

                <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    priority={idx === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology In Action */}
      <section
        id="technology-in-action"
        className="bg-white text-[#383F19] px-4 sm:px-6 lg:px-10 py-14 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="text-left space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest">
              Technology In Action
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              TerraSkyAI is revolutionizing agriculture with real-time, AI-powered intelligence
            </h2>
            <p className="text-lg leading-relaxed text-[#383F19]/90">
              Through satellite imagery, IoT sensors, and machine learning, TerraSkyAI delivers
              instant visibility into crop health, soil conditions, and weather patterns. Farmers
              can optimize irrigation, detect pests early, and boost yields while reducing costs
              and environmental impact—bridging traditional farming with modern innovation for a
              sustainable future.
            </p>
            <button className="inline-flex w-fit items-center gap-2 rounded-full bg-[#383F19] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#2f3615] transition-colors">
              Learn More
              <span aria-hidden>→</span>
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Satellite & Drone Imagery",
                body: "High-res views to spot stress early, map variability, and guide precision interventions.",
              },
              {
                title: "IoT Sensors & Edge AI",
                body: "On-field sensing for soil moisture, nutrients, and microclimate—processed locally for instant decisions.",
              },
              {
                title: "Predictive Models",
                body: "ML-driven forecasts for irrigation, pest pressure, and yield, tuned to each field’s reality.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#383F19]/10 bg-[#383F19]/5 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-base leading-relaxed text-[#383F19]/90">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="bg-[#eef3e5] text-[#383F19] px-4 sm:px-6 lg:px-10 py-14 scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 text-left">
          <p className="text-sm font-semibold uppercase tracking-widest">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            TerraSkyAI powers smarter fields with practical AI
          </h2>
          <p className="text-lg leading-relaxed text-[#383F19]/90">
            We’re building an AI-driven, precision agriculture platform that makes
            data simple, affordable, and actionable for everyone across the
            agricultural value chain. From growers to advisors, we deliver clear,
            field-ready insights so farms can make confident decisions, cut waste,
            and grow sustainably.
          </p>
          <div>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#383F19] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#2f3615] transition-colors">
              Learn More
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section
        id="why-us"
        className="bg-white text-[#383F19] px-4 sm:px-6 lg:px-10 py-14 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image
                src="/assets/robot-arm-planting-tree-green-field.jpg"
                alt="Precision agriculture technology"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest">
                Why Us?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
                Trusted, AI-driven partner for smarter farming
              </h2>
              <p className="text-lg leading-relaxed text-[#383F19]/90">
                TerraSkyAI blends satellite imagery, IoT sensors, and advanced machine
                learning to deliver actionable insights that cut waste, improve yields,
                and reduce costs. We tailor solutions to the realities of your farm,
                pairing proven tech with a team committed to your success.
              </p>
              <ul className="space-y-2 text-base text-[#383F19]/90">
                <li>• Real-time visibility into crop health, soil, and weather.</li>
                <li>• Early detection of pests and stress for faster intervention.</li>
                <li>• Precision irrigation guidance to save water and inputs.</li>
                <li>• Dedicated experts focused on outcomes, not just tools.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Fiona",
                title: "Excellent Service",
                quote: "Pricing is fair and the insights are spot on for our fields.",
              },
              {
                name: "Joseph",
                title: "Love the flexibility",
                quote: "Fast support and clear recommendations we can act on quickly.",
              },
              {
                name: "Michelle",
                title: "Fantastic quality",
                quote: "We finally have data we trust to plan ahead and reduce costs.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[#383F19]/10 bg-[#f8f9f5] p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[#f59e0b] mb-3">
                  {"★★★★★"}
                </div>
                <h3 className="text-lg font-semibold text-[#383F19]">
                  “{item.title}”
                </h3>
                <p className="text-base leading-relaxed text-[#383F19]/90 mt-2">
                  {item.quote}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#383F19]">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / For Help */}
      <section
        id="contact"
        className="bg-[#eef3e5] text-[#383F19] px-4 sm:px-6 lg:px-10 py-14 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-[#e5e7eb]">
          <div className="bg-linear-to-br from-[#383F19] to-[#707f2f] text-white p-8 sm:p-10 flex flex-col gap-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#dbdfc6]">
                For Help
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Contact Us
              </h2>
              <p className="text-base text-white/85">
                Share your goals and challenges—our team will respond with tailored
                recommendations for your operation.
              </p>
            </div>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold">Call us</p>
                <p className="text-white/85">+1 (401) 655 898</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold">Email</p>
                <a
                  className="text-white font-semibold underline"
                  href="mailto:support@terraskyai.com"
                >
                  support@terraskyai.com
                </a>
              </div>
            </div>
            <div className="space-y-3 text-sm sm:text-base">
              <p className="font-semibold">Follow us</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Instagram", href: "#" },
                  { label: "Twitter", href: "#" },
                  { label: "Facebook", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white border border-white/30 hover:bg-white/20 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-6 bg-white">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" htmlFor="lp-name">
                  Name
                </label>
                <input
                  id="lp-name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" htmlFor="lp-email">
                  Email
                </label>
                <input
                  id="lp-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="lp-message">
                Tell us about your farm and what you need
              </label>
              <textarea
                id="lp-message"
                placeholder="Acres, crops, current challenges, and the outcomes you’re targeting…"
                rows={6}
                className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#383F19] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#276d4b] transition-colors">
                Send Message
                <span aria-hidden>→</span>
              </button>
              <div className="text-sm text-[#4b5563]">
                Prefer email? Reach us at{" "}
                <a
                  className="font-semibold text-[#383F19] underline"
                  href="mailto:support@terraskyai.com"
                >
                  support@terraskyai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog placeholder for navigation anchor */}
      <section
        id="blog"
        className="bg-white text-[#383F19] px-4 sm:px-6 lg:px-10 py-10 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4b5563]">
            Blog
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">Insights coming soon</h2>
          <p className="text-base text-[#4b5563]">
            Stay tuned for product updates, research highlights, and field stories.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f7f9fb] text-[#1f2933] px-4 sm:px-6 lg:px-10 py-10 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
          <Image
            src="/assets/Logo Light.png"
            alt="fyllo"
            width={200}
            height={90}
            className="h-40 w-auto"
            priority
          />
          <p className="text-sm text-[#4b5563] -mt-10">© 2025 TerraSkyAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
