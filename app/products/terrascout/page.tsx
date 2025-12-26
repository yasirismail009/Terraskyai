import Image from "next/image";

const features = [
  {
    title: "High Resolution Map (1cm to 5cm)",
    image: "/assets/Picture1.png",
  },
  {
    title: "Crop Area and Boundary",
    image: "/assets/Picture2.png",
  },
  {
    title: "Weed Detection for Spot-treatment",
    image: "/assets/Picture3.png",
  },
  {
    title: "Germination Map (Plant Count)",
    image: "/assets/Picture4.png",
  },
  {
    title: "Off-type detection",
    image: "/assets/Picture5.png",
  },
  {
    title: "Canopy Cover Analysis",
    image: "/assets/Picture6.png",
  },
  {
    title: "Disease detection",
    image: "/assets/Picture7.png",
  },
  {
    title: "Insect defoliation detection",
    image: "/assets/Picture8.png",
  },
  {
    title: "Water Logging Zones",
    image: "/assets/Picture9.png",
  },
  {
    title: "Crop Health Zones",
    image: "/assets/Picture10.png",
  },
  {
    title: "Individual Plant Health",
    image: "/assets/Picture11.png",
  },
  {
    title: "Flight Mission Automation",
    image: "/assets/Picture12.png",
  },
];

export default function TerraScoutPage() {
  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/img_1054.jpeg')`,
        }}
      >
        {/* Blurred background layer */}
        <div className="absolute inset-0 backdrop-blur-xs bg-[#454411]/10"></div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-[#454411]/10"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-[#545454]/10 border border-[#454411]/20 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-widest text-white">
              Desktop Application
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            TerraScout
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 max-w-4xl mx-auto leading-relaxed">
            Actionable Intelligence and Reports at Your Fingertips
          </p>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing farm analysis with cutting-edge AI technology
          </p>
        </div>
      </section>

  
      {/* Product Details Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Product Name with Minimal Underline */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#454411] mb-3 inline-block relative pb-2">
              TerraScout
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#454411] via-[#8B5E3C] to-[#454411] rounded-full"></div>
            </h2>
          </div>

          {/* Main Headline */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#454411] mb-4 leading-relaxed max-w-4xl">
            Actionable Intelligence and Reports at Your Fingertips
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#545454] mb-12 max-w-3xl leading-relaxed">
            Crop Insights and Reports, along with numerous on-request analyses to cater to specific farming needs and preferences.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-300 border border-[#b0b0b0]/20 hover:border-[#454411]/30 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#454411]/0 to-[#545454]/0 group-hover:from-[#454411]/3 group-hover:to-[#545454]/3 transition-all duration-300 rounded-lg"></div>
                
                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden border border-[#b0b0b0]/15 group-hover:border-[#454411]/30 transition-all duration-300">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-medium text-[#454411] text-center group-hover:text-[#545454] transition-colors duration-300 relative z-10 leading-tight">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
          {/* High Resolution Imagery Section */}
          <section className="relative bg-gradient-to-b from-white via-white to-[#454411] px-4 sm:px-6 lg:px-10 py-20 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(69, 68, 17, 0.1) 2px, rgba(69, 68, 17, 0.1) 4px)`
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Three Featured Images with Carousel Style */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {/* Left Arrow Indicator (Decorative) */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Image 1 - With Detection Overlays */}
            <div className="group relative aspect-square rounded-full overflow-hidden border-4 border-white/30 shadow-2xl hover:border-white/50 transition-all duration-300 hover:scale-105">
              <Image
                src="/assets/Picture14.png"
                alt="High resolution crop analysis with detection"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              {/* Detection bounding boxes overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-16 h-12 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute top-[35%] right-[20%] w-12 h-10 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute bottom-[25%] left-[25%] w-14 h-8 border-2 border-red-500/80 bg-red-500/10"></div>
              </div>
            </div>

            {/* Image 2 - With Detection Overlays */}
            <div className="group relative aspect-square rounded-full overflow-hidden border-4 border-white/30 shadow-2xl hover:border-white/50 transition-all duration-300 hover:scale-105">
              <Image
                src="/assets/Picture16.png"
                alt="Detailed field imagery with plant detection"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              {/* Multiple detection boxes for field view */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[15%] left-[20%] w-8 h-8 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute top-[30%] right-[15%] w-10 h-10 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute bottom-[20%] left-[30%] w-9 h-9 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute bottom-[35%] right-[25%] w-7 h-7 border-2 border-red-500/80 bg-red-500/10"></div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-red-500/80 bg-red-500/10"></div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="group relative aspect-square rounded-full overflow-hidden border-4 border-white/30 shadow-2xl hover:border-white/50 transition-all duration-300 hover:scale-105">
              <Image
                src="/assets/Picture17.png"
                alt="Precision agriculture imagery"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>

            {/* Right Arrow Indicator (Decorative) */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Headline Text */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto drop-shadow-lg">
              High definition imagery so clear you can count the spots on a lady bug
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Experience unparalleled detail with our ultra-high resolution mapping technology, delivering precision down to the individual plant level.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

