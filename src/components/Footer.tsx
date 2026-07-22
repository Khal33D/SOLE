import { useState } from 'react';
import { useI18n } from '../i18n';
import { Sun, Instagram } from '../icons';

export function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 3000);
  };

  const cols = [
    {
      h: t('footer.shop'),
      links: [t('nav.flipflops'), t('nav.womens'), t('nav.mens'), t('nav.accessories'), t('footer.sale')],
    },
    {
      h: t('footer.support'),
      links: [
        t('footer.help'),
        t('footer.shipping'),
        t('footer.returns'),
        t('footer.sizeguide'),
        t('footer.track'),
      ],
    },
    {
      h: t('footer.company'),
      links: [
        t('footer.story'),
        t('footer.sustainability'),
        t('footer.careers'),
        t('footer.wholesale'),
        t('footer.contact'),
      ],
    },
  ];

  return (
    <footer className="mt-8 bg-ink-900 text-sand-100">
      <div className="border-b border-white/10">
        <div className="container-x grid gap-8 py-14 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mt-2 max-w-md text-sand-200/80">{t('footer.newsletter.sub')}</p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-md gap-2 md:ml-auto rtl:md:mr-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletter.placeholder')}
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-sand-200/50 focus:border-coral-400 focus:outline-none"
            />
            <button type="submit" className="btn-accent shrink-0">
              {done ? t('footer.newsletter.done') : t('footer.newsletter.button')}
            </button>
          </form>
        </div>
      </div>

      <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-coral-500 text-ink-900">
              <Sun size={18} />
            </span>
            <span className="font-display text-2xl font-semibold text-white">{t('brand.name')}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-sand-200/70">{t('footer.tagline')}</p>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.h}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-sand-200/60">{col.h}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-sand-100/80 hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand-200/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              {t('footer.privacy')}
            </a>
            <a href="#" className="hover:text-white">
              {t('footer.terms')}
            </a>
            <a href="#" className="hover:text-white">
              {t('footer.accessibility')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
