'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '../../../i18n/navigation';
import { routing } from '../../../i18n/routing';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/products/skysight', key: 'products' },
  { href: '/vision-mission', key: 'about' },
  { href: '/contact', key: 'contact' },
  { href: '/careers', key: 'careers' },
  { href: '/gallery', key: 'gallery' },
] as const;

const localeLabels: Record<string, string> = {
  en: 'EN',
  'pt-BR': 'PT',
};

const localeNames: Record<string, string> = {
  en: 'English',
  'pt-BR': 'Português (Brasil)',
};

function LanguageSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const count = routing.locales.length;
  const activeIndex = Math.max(
    routing.locales.findIndex((l) => l === locale),
    0
  );

  return (
    <div role="group" aria-label={t('language')} className="lt-wrap">
      <svg className="lt-globe" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="lt-track">
        <span
          className="lt-thumb"
          aria-hidden="true"
          style={{
            width: `calc((100% - 6px) / ${count})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {routing.locales.map((l) => {
          const isCurrent = l === locale;
          return (
            <button
              key={l}
              type="button"
              className={`lt-btn${isCurrent ? ' is-active' : ''}`}
              onClick={() => {
                if (!isCurrent) router.replace(pathname, { locale: l });
              }}
              aria-pressed={isCurrent}
              aria-label={localeNames[l] ?? l}
              title={localeNames[l] ?? l}
            >
              {localeLabels[l] ?? l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <style>{`
        .lt-wrap {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .lt-globe {
          width: 18px;
          height: 18px;
          color: #8B5E3C;
          flex-shrink: 0;
        }
        .lt-track {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 3px;
          border-radius: 999px;
          background: rgba(69, 68, 17, 0.07);
          border: 1px solid rgba(69, 68, 17, 0.14);
        }
        .lt-thumb {
          position: absolute;
          top: 3px;
          bottom: 3px;
          left: 3px;
          border-radius: 999px;
          background: linear-gradient(135deg, #454411 0%, #5f5d17 100%);
          box-shadow: 0 2px 8px rgba(69, 68, 17, 0.35);
          transition: transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        .lt-btn {
          position: relative;
          z-index: 1;
          min-width: 46px;
          padding: 6px 12px;
          border: none;
          background: transparent;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #545454;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .lt-btn:hover {
          color: #454411;
        }
        .lt-btn.is-active {
          color: #f5f2e8;
          cursor: default;
        }
        .lt-btn:focus-visible {
          outline: 2px solid #BEA950;
          outline-offset: 2px;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col h-12 lg:h-32 items-center justify-center">
            <Image
              src="/assets/Logo.svg"
              alt={t('logoAlt')}
              width={160}
              height={80}
              className="h-full w-auto"
              draggable={false}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, key }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: isActive ? '#454411' : '#545454',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 15,
                    textDecoration: 'none',
                  }}
                >
                  {t(key)}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #454411, #8B5E3C)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop Language Switcher */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#545454] hover:text-[#454411] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t('toggleMenu')}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, key }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: isActive ? '#454411' : '#545454',
                    fontWeight: isActive ? 700 : 500,
                    borderLeft: isActive ? '3px solid #454411' : '3px solid transparent',
                    paddingLeft: 12,
                    paddingTop: 12,
                    paddingBottom: 12,
                    fontSize: 15,
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {t(key)}
                </Link>
              );
            })}
            <div style={{ paddingLeft: 12, paddingTop: 14, paddingBottom: 4 }}>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}