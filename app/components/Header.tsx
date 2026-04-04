'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/",                   label: "Home"             },
  { href: "/products/skysight",  label: "Products"         },
  { href: "/vision-mission",     label: "About TerraSkyAI" },
  { href: "/contact",            label: "Contact Us"       },
  { href: "/careers",            label: "Career"           },
  { href: "/gallery",            label: "Gallery"          },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="/" className="flex flex-col h-12 lg:h-32 items-center justify-center">
            <img
              src="/assets/Logo.svg"
              alt="terraskyai logo"
              className="h-full w-auto"
              draggable="false"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <a
                  key={href}
                  href={href}
                  className="relative transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: isActive ? "#454411" : "#545454",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                >
                  {label}
                  {isActive && (
                    <span style={{
                      position: "absolute",
                      bottom: -4, left: 0, right: 0,
                      height: 2, borderRadius: 999,
                      background: "linear-gradient(90deg, #454411, #8B5E3C)",
                    }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#545454] hover:text-[#454411] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: isActive ? "#454411" : "#545454",
                    fontWeight: isActive ? 700 : 500,
                    borderLeft: isActive ? "3px solid #454411" : "3px solid transparent",
                    paddingLeft: 12,
                    paddingTop: 12,
                    paddingBottom: 12,
                    fontSize: 15,
                    transition: "color 0.2s",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}