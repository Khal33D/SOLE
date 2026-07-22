import { categories } from '../data';
import { useI18n } from '../i18n';
import { ChevronRight } from '../icons';

interface CategoryStripProps {
  onSelect: (cat: string) => void;
}

export function CategoryStrip({ onSelect }: CategoryStripProps) {
  const { t } = useI18n();
  return (
    <section className="container-x py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{t('category.eyebrow')}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {t('category.title')}
          </h2>
        </div>
        <button
          onClick={() => onSelect('all')}
          className="hidden items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900 sm:flex"
        >
          {t('category.viewall')} <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink-100 text-left shadow-soft ring-1 ring-ink-100 transition-all duration-300 hover:shadow-lift animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <img
              src={c.image}
              alt={t(c.labelKey)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-xl font-semibold text-white">{t(c.labelKey)}</h3>
              <p className="mt-1 text-sm text-white/80">{t(c.blurbKey)}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coral-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {t('category.shopnow')} <ChevronRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
