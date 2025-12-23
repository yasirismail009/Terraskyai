'use client';

import Image from 'next/image';

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
            <div className="flex flex-col">
              <Image
                src="/assets/Logo Light.png"
                alt="fyllo logo"
                width={180}
                height={80}
                priority
              />
              
            </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-[#383F19] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#technology-in-action"
              className="text-gray-700 hover:text-[#383F19] transition-colors font-medium"
            >
              Technology In Action
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-[#383F19] transition-colors font-medium"
            >
              About TerraSkyAI
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-[#383F19] transition-colors font-medium"
            >
              Contact Us
            </a>
            <a
              href="#blog"
              className="text-gray-700 hover:text-[#383F19] transition-colors font-medium"
            >
              Blog
            </a>
          </nav>

          {/* Book Device Button */}
          <div className="flex items-center gap-4">
            <button className="bg-[#383F19] hover:bg-[#383F19]/80 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              BOOK DEVICE
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700 hover:text-[#383F19]">
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

