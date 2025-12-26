import Image from "next/image";

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Vision Section */}
      <section className="relative w-full h-full overflow-hidden">
          {/* Aerial Landscape Image with Overlay */}
          <div className="relative w-full h-screen md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <Image
              src="/assets/our mission.png"
              alt="Aerial view of forest and agricultural fields"
              fill
              className="object-cover"
              sizes="100vw"
            />
            
            {/* Dark Green Overlay on Right Side */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#454411]/80"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-[#454411]/40"></div>
            
            {/* Logo in Top Left */}
            <div className="absolute top-6 left-6 z-10">
              <Image
                src="/assets/Logo Light.png"
                alt="TerraSkyAI Logo"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </div>

            {/* White Text Overlay on Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-2/3 flex flex-col justify-center items-center md:items-start px-8 md:px-16 z-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-4">
                Our Vision
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center md:text-left">
                Making Precision Farming Sustainable and Profitable
              </h1>
            </div>
          </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#b0b0b0] mb-4">
                OUR MISSION
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#545454] mb-6 leading-tight">
                To empower farmers globally
              </h2>
              <p className="text-lg text-[#545454] leading-relaxed">
                by developing advanced, innovative AI-driven precision farming technologies that optimize farm operations, enhance productivity, and promote sustainable farming.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 mt-8 bg-[#454411] hover:bg-[#454411]/80 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors"
              >
                Contact Us
              </a>
            </div>

            {/* Right - Dashboard Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                {/* Browser Window */}
                <div className="bg-[#b0b0b0] p-2">
                  <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden">
                    {/* Dashboard Content */}
                    <div className="relative h-96">
                      <Image
                        src="/assets/img_1054.jpeg"
                        alt="Agricultural field monitoring dashboard"
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      {/* Overlay for field boundaries */}
                      <div className="absolute inset-0">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
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
      <section
        id="contact"
        className="bg-[#E6E2D6] text-[#454411] px-4 sm:px-6 lg:px-10 py-14 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-[#8B5E3C]/20">
          <div className="bg-[#454411] text-white p-8 sm:p-10 flex flex-col gap-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#BEA950]">
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
            {/* <div className="space-y-3 text-sm sm:text-base">
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
            </div> */}
          </div>

          <div className="p-8 sm:p-10 space-y-6 bg-white">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#454411]" htmlFor="lp-name">
                  Name
                </label>
                <input
                  id="lp-name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#454411]" htmlFor="lp-email">
                  Email
                </label>
                <input
                  id="lp-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#454411]" htmlFor="lp-message">
                Tell us about your farm and what you need
              </label>
              <textarea
                id="lp-message"
                placeholder="Acres, crops, current challenges, and the outcomes you're targeting…"
                rows={6}
                className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#454411] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#454411]/80 transition-colors">
                Send Message
                <span aria-hidden>→</span>
              </button>
              <div className="text-sm text-[#b0b0b0]">
                Prefer email? Reach us at{" "}
                <a
                  className="font-semibold text-[#545454] underline hover:text-[#454411]"
                  href="mailto:support@terraskyai.com"
                >
                  support@terraskyai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

