'use client';

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
            <a href="/" className="flex flex-col h-12 lg:h-32 items-center justify-center">
              <img
                src="/assets/Logo.svg"
                alt="terraskyai logo"
                className="h-full w-auto"
                draggable="false"
              />
              
            </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="/"
              className="text-[#545454] hover:text-[#454411] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/technology-in-action"
              className="text-[#545454] hover:text-[#454411] transition-colors font-medium"
            >
              Technology In Action
            </a>
            <a
              href="/vision-mission"
              className="text-[#545454] hover:text-[#454411] transition-colors font-medium"
            >
              About TerraSkyAI
            </a>
            <a
              href="/contact"
              className="text-[#545454] hover:text-[#454411] transition-colors font-medium"
            >
              Contact Us
            </a>
            <a
              href="/careers"
              className="text-[#545454] hover:text-[#454411] transition-colors font-medium"
            >
              Career
            </a>
          </nav>

          {/* Book Device Button */}
          <div className="flex items-center gap-4">
          
            {/* Mobile Menu Button */}
            <button className="lg:hidden text-[#545454] hover:text-[#454411]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

