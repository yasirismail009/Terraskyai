import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E6E2D6] text-[#454411] border-t border-[#8B5E3C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 -m-10">
            <a href="/" className="inline-block">
              <Image
                src="/assets/Logo2.svg"
                alt="TerraSkyAI Logo"
                width={280}
                height={120}
                className="h-24 md:h-32 lg:h-36 w-auto"
                priority
              />
            </a>
            <p className="text-sm md:text-base text-[#545454] max-w-md leading-relaxed -mt-10">
              Revolutionizing agriculture through AI-powered precision farming solutions. 
              Empowering farmers with actionable insights for sustainable and efficient crop management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-[#454411] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#technology-in-action" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  Technology In Action
                </a>
              </li>
              <li>
                <a href="/#about" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-base font-semibold text-[#454411] mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products/terrascout" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  TerraScout
                </a>
              </li>
              <li>
                <a href="/products/skysight" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  SkySight
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-[#545454] hover:text-[#454411] transition-colors">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-[#8B5E3C]/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[#454411] mb-2">Contact</h4>
              <p className="text-sm text-[#545454]">+1 (401) 655 898</p>
              <a
                href="mailto:support@terraskyai.com"
                className="text-sm text-[#545454] hover:text-[#454411] transition-colors"
              >
                support@terraskyai.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#454411] mb-2">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-sm text-[#545454] hover:text-[#454411] transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-sm text-[#545454] hover:text-[#454411] transition-colors"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-sm text-[#545454] hover:text-[#454411] transition-colors"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#454411] mb-2">Newsletter</h4>
              <p className="text-sm text-[#545454]">Stay updated with our latest innovations</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#8B5E3C]/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#b0b0b0] text-center md:text-left">
              © {new Date().getFullYear()} TerraSkyAI. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-xs text-[#b0b0b0]">
              <a href="#" className="hover:text-[#545454] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#545454] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

