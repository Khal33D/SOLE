import { useMemo, useState } from 'react';
import type { Product, Category } from '../types';
import { products } from '../data';
import { useI18n } from '../i18n';
import { ProductCard } from './ProductCard';

type Filter = 'all' | Category | 'best' | 'new';

interface ProductGridProps {
  active: Filter;
  onQuickView: (p: Product) => void;
}

export function ProductGrid({ active, onQuickView }: ProductGridProps) {
  const { t } = useI18n();
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('grid.filter.all') },
    { id: 'flip-flops', label: t('nav.flipflops') },
    { id: 'womens-sandals', label: t('nav.womens') },
    { id: 'mens-sandals', label: t('nav.mens') },
    { id: 'accessories', label: t('nav.accessories') },
    { id: 'best', label: t('grid.filter.best') },
    { id: 'new', label: t('grid.filter.new') },
  ];

  const list = useMemo(() => {
    let l = [...products];
    if (active === 'best') l = l.filter((p) => p.bestSeller);
    else if (active === 'new') l = l.filter((p) => p.newArrival);
    else if (active !== 'all') l = l.filter((p) => p.category === active);

    if (sort === 'price-asc') l.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') l.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') l.sort((a, b) => b.rating - a.rating);
    return l;
  }, [active, sort]);

  return (
    <section id="shop" className="container-x py-16 md:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{t('grid.eyebrow')}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {filters.find((f) => f.id === active)?.label}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-ink-500">{t('grid.sort')}</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-300"
          >
            <option value="featured">{t('grid.sort.featured')}</option>
            <option value="price-asc">{t('grid.sort.priceAsc')}</option>
            <option value="price-desc">{t('grid.sort.priceDesc')}</option>
            <option value="rating">{t('grid.sort.rating')}</option>
          </select>
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <a
            key={f.id}
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('sole:filter', { detail: f.id }));
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === f.id
                ? 'bg-ink-900 text-sand-50'
                : 'border border-ink-200 bg-white text-ink-700 hover:border-ink-900'
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-20 text-center text-ink-400">{t('grid.empty')}</p>
      )}
    </section>
  );
}
