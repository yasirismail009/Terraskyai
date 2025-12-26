import Image from "next/image";

const features = [
  {
    title: "Pre-Scout",
    image: "/assets/Picture1.png",
  },
  {
    title: "Volunteer Canola Detection",
    image: "/assets/Picture2.png",
  },
  {
    title: "RT Rouging Prescription",
    image: "/assets/Picture3.png",
  },
  {
    title: "Plant Stand Count Analytics",
    image: "/assets/Picture4.png",
  },
  {
    title: "Insect & Weed Detection",
    image: "/assets/Picture5.png",
  },
  {
    title: "Yield Estimation",
    image: "/assets/Picture6.png",
  },
  {
    title: "Crop Health",
    image: "/assets/Picture7.png",
  },
  {
    title: "Field Mapping",
    image: "/assets/Picture8.png",
  },
  {
    title: "No REI Exposure",
    image: "/assets/Picture9.png",
  },
  {
    title: "Manage Operations",
    image: "/assets/Picture10.png",
  },
  {
    title: "User-friendly Interface",
    image: "/assets/Picture11.png",
  },
];

export default function SkySightPage() {
  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/img_1054.jpeg')`,
        }}
      >
        {/* Blurred background layer */}
        <div className="absolute inset-0 backdrop-blur-xs bg-[#545454]/10"></div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-[#545454]/10"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-[#454411]/10 border border-[#545454]/20 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-widest text-white">
              Real-Time AI Portal & Dashboard
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            SkySight
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 max-w-4xl mx-auto leading-relaxed">
            All-in-one digital farming portal for seamless farm management
          </p>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Unlocking efficiency and success through real-time AI-powered insights
          </p>
        </div>
      </section>

      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#545454] mb-4">
              Features
            </h2>
            <p className="text-base sm:text-lg text-[#545454]/80 max-w-2xl mx-auto">
              Comprehensive capabilities for modern farm management
            </p>
          </div>

          {/* Features Table */}
          <div className="bg-black rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Top Row - 4 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Pre-Scout</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Volunteer Canola Detection</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">RT Rouging Prescription</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Insect & Weed Detection</h3>
              </div>
            </div>
            
            {/* Bottom Row - 5 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Crop Health</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Field Mapping</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">No REI Exposure</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Manage Operations</h3>
              </div>
              <div className="text-white text-center md:text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">User-friendly Interface</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Preview Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#545454] mb-4">
              Intuitive Dashboard Interface
            </h2>
            <p className="text-base sm:text-lg text-[#545454]/80 max-w-2xl mx-auto">
              Manage all your fields, operations, and insights from a single, user-friendly dashboard
            </p>
          </div>

          {/* Dashboard Image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/assets/Picture18.png"
                alt="SkySight Dashboard Interface"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                sizes="(min-width: 1024px) 100vw, (min-width: 768px) 90vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Table Section */}
     
    </div>
  );
}

