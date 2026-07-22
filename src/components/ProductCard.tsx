import { useState } from 'react';
import type { Product } from '../types';
import { formatPrice } from '../data';
import { useI18n } from '../i18n';
import { Star, Plus, Check } from '../icons';

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { t, locale } = useI18n();
  const [hoverIdx, setHoverIdx] = useState(0);
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-100/70 transition-all duration-300 hover:shadow-lift">
      <button
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/5] overflow-hidden bg-sand-100"
        onMouseEnter={() => product.images[1] && setHoverIdx(1)}
        onMouseLeave={() => setHoverIdx(0)}
      >
        <img
          src={product.images[hoverIdx] ?? product.images[0]}
          alt={product.name[locale]}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute start-3 top-3 flex flex-col gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                b === 'Bestseller'
                  ? 'bg-coral-500 text-white'
                  : b === 'New'
                  ? 'bg-ocean-500 text-white'
                  : 'bg-ink-900 text-sand-50'
              }`}
            >
              {b}
            </span>
          ))}
          {discount > 0 && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-coral-600">
              -{discount}%
            </span>
          )}
        </div>
        <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-white/90 py-2 text-center text-xs font-semibold text-ink-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {t('card.quickview')}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{product.brand}</p>
            <h3 className="mt-0.5 font-display text-base font-semibold leading-tight text-ink-900">
              {product.name[locale]}
            </h3>
          </div>
          <div className="flex items-center gap-0.5 text-ink-500">
            <Star size={12} className="fill-coral-400 text-coral-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-4 w-4 rounded-full ring-1 ring-ink-200"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="ms-1 text-xs text-ink-400">
            {product.colors.length} {t('card.colors')}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-ink-400 line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <button
            onClick={() => onQuickView(product)}
            className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-white transition-all hover:bg-coral-500 active:scale-95"
            aria-label={t('card.add')}
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="mt-2 flex items-center gap-1 text-xs text-ocean-600">
          <Check size={12} /> {t('card.instock')}
        </p>
      </div>
    </div>
  );
}
