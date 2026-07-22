import { useI18n } from '../i18n';
import { ChevronRight } from '../icons';

interface LookbookProps {
  onShop: (cat: string) => void;
}

export function Lookbook({ onShop }: LookbookProps) {
  const { t } = useI18n();
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="group relative overflow-hidden rounded-4xl bg-ink-900 md:row-span-2">
          <img
            src="https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 md:min-h-[640px] md:p-10">
            <p className="eyebrow text-sand-200/70">{t('lookbook.eyebrow')}</p>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
              {t('lookbook.title')}
            </h3>
            <button
              onClick={() => onShop('accessories')}
              className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-transform hover:translate-x-1 rtl:hover:-translate-x-1"
            >
              {t('lookbook.cta')} <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-4xl bg-sand-200">
          <img
            src="https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
          <div className="relative flex h-full min-h-[200px] flex-col justify-end p-6 md:min-h-[310px]">
            <h3 className="font-display text-2xl font-semibold text-white">
              {t('lookbook.flipflops.title')}
            </h3>
            <button
              onClick={() => onShop('flip-flops')}
              className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-coral-300 hover:text-coral-200"
            >
              {t('category.shopnow')} <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-4xl bg-ocean-900">
          <img
            src="https://images.pexels.com/photos/16770399/pexels-photo-16770399.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 to-transparent" />
          <div className="relative flex h-full min-h-[200px] flex-col justify-end p-6 md:min-h-[310px]">
            <h3 className="font-display text-2xl font-semibold text-white">
              {t('lookbook.accessories.title')}
            </h3>
            <button
              onClick={() => onShop('accessories')}
              className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-coral-300 hover:text-coral-200"
            >
              {t('category.shopnow')} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
