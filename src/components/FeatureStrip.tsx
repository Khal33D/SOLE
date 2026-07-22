import { useI18n } from '../i18n';
import { Truck, RefreshCw, Shield, Leaf } from '../icons';

export function FeatureStrip() {
  const { t } = useI18n();
  const items = [
    { icon: Truck, title: t('feature.ship.title'), text: t('feature.ship.text') },
    { icon: RefreshCw, title: t('feature.returns.title'), text: t('feature.returns.text') },
    { icon: Shield, title: t('feature.warranty.title'), text: t('feature.warranty.text') },
    { icon: Leaf, title: t('feature.eco.title'), text: t('feature.eco.text') },
  ];

  return (
    <section className="border-y border-ink-100 bg-white/60">
      <div className="container-x grid grid-cols-2 gap-4 py-10 md:grid-cols-4 md:gap-6">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-ocean-50 text-ocean-600">
              <it.icon size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">{it.title}</p>
              <p className="text-xs text-ink-500">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
