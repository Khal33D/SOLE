import { useI18n } from '../i18n';
import { ChevronRight, Star, Sun } from '../icons';

interface HeroProps {
  onShop: (cat: string) => void;
}

export function Hero({ onShop }: HeroProps) {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50/40 via-ink-900/30 to-ink-900/70" />
      </div>

      <div className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 md:min-h-[92vh] md:pb-24">
        <div className="max-w-2xl animate-fade-up">
          <span className="chip border-white/30 bg-white/15 text-white backdrop-blur-md">
            <Sun size={14} className="text-coral-300" />
            {t('hero.badge')}
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl md:text-7xl">
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => onShop('all')} className="btn-accent group">
              {t('hero.cta.primary')}
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => onShop('flip-flops')}
              className="btn-ghost border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white"
            >
              {t('hero.cta.secondary')}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} className="fill-coral-400 text-coral-400" />
                ))}
              </div>
              <span className="text-sm font-medium">{t('hero.reviews')}</span>
            </div>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="hidden text-sm font-medium sm:inline">{t('hero.freeship')}</span>
          </div>
        </div>
      </div>

      <div className="relative border-y border-ink-100 bg-sand-50 py-3">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 text-sm font-medium uppercase tracking-widest text-ink-500">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{t('marquee.ship')}</span>
                <span className="text-coral-500">✦</span>
                <span>{t('marquee.returns')}</span>
                <span className="text-coral-500">✦</span>
                <span>{t('marquee.vegan')}</span>
                <span className="text-coral-500">✦</span>
                <span>{t('marquee.carbon')}</span>
                <span className="text-coral-500">✦</span>
              </span>
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10 text-sm font-medium uppercase tracking-widest text-ink-500"
            aria-hidden
          >
            <span className="flex items-center gap-10">
              <span>{t('marquee.ship')}</span>
              <span className="text-coral-500">✦</span>
              <span>{t('marquee.returns')}</span>
              <span className="text-coral-500">✦</span>
              <span>{t('marquee.vegan')}</span>
              <span className="text-coral-500">✦</span>
              <span>{t('marquee.carbon')}</span>
              <span className="text-coral-500">✦</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
