import { useEffect, useState } from 'react';
import { useCart } from '../cart';
import { useI18n, LOCALES, type Locale } from '../i18n';
import { ShoppingBag, Search, Menu, X, Sun, Globe } from '../icons';

interface HeaderProps {
  onNavigate: (cat: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { count, open } = useCart();
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav: { label: string; cat: string }[] = [
    { label: t('nav.flipflops'), cat: 'flip-flops' },
    { label: t('nav.womens'), cat: 'womens-sandals' },
    { label: t('nav.mens'), cat: 'mens-sandals' },
    { label: t('nav.accessories'), cat: 'accessories' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-sand-50/85 backdrop-blur-xl shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden rounded-full p-2 text-ink-800 hover:bg-ink-100"
            onClick={() => setMobileOpen(true)}
            aria-label={t('nav.openMenu')}
          >
            <Menu size={20} />
          </button>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 text-coral-500">
              <Sun size={18} />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-ink-900">
              {t('brand.name')}
            </span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <button
              key={n.cat}
              onClick={() => onNavigate(n.cat)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100"
              aria-label="Change language"
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{LOCALES.find((l) => l.code === locale)?.flag}</span>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute end-0 mt-2 w-40 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-ink-100 z-50">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code as Locale);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sand-100 ${
                        locale === l.code ? 'font-semibold text-ink-900' : 'text-ink-700'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-xs text-ink-400">{l.flag}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100"
            aria-label={t('nav.search')}
          >
            <Search size={18} />
          </button>
          <button
            onClick={open}
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink-800 hover:bg-ink-100"
            aria-label={t('nav.openCart')}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-coral-500 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute start-0 top-0 h-full w-72 bg-sand-50 p-6 shadow-lift animate-slide-in">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold">{t('nav.browse')}</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-ink-100">
                <X size={20} />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {nav.map((n) => (
                <button
                  key={n.cat}
                  onClick={() => {
                    onNavigate(n.cat);
                    setMobileOpen(false);
                  }}
                  className="rounded-2xl px-4 py-3 text-start text-base font-medium text-ink-800 hover:bg-ink-100"
                >
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
