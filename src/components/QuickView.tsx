import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { formatPrice } from '../data';
import { useCart } from '../cart';
import { useI18n } from '../i18n';
import { X, Star, Check, ShoppingBag, Truck, RefreshCw, Shield } from '../icons';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { add } = useCart();
  const { t, locale } = useI18n();
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0]);
      setColor(product.colors[0]?.name ?? '');
      setQty(1);
      setImgIdx(0);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  const handleAdd = () => {
    add(product, size, color, qty);
    setAdded(true);
    setTimeout(onClose, 600);
  };

  const name = product.name[locale];
  const description = product.description[locale];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-scale-in"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto thin-scrollbar rounded-t-4xl bg-sand-50 shadow-lift animate-fade-up sm:rounded-4xl">
        <button
          onClick={onClose}
          className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-800 backdrop-blur hover:bg-white"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative bg-sand-100">
            <img
              src={product.images[imgIdx]}
              alt={name}
              className="aspect-square w-full object-cover md:aspect-auto md:h-full"
            />
            <div className="absolute start-4 top-4 flex flex-col gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-sand-50"
                >
                  {b}
                </span>
              ))}
              {discount > 0 && (
                <span className="rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === imgIdx ? 'w-6 bg-ink-900' : 'w-2.5 bg-ink-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{product.brand}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">{name}</h2>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(product.rating) ? 'fill-coral-400 text-coral-400' : 'text-ink-200'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-ink-500">
                {product.rating} · {product.reviewCount.toLocaleString()} {t('qv.reviews')}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-ink-900">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-base text-ink-400 line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-600">{description}</p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-ink-800">
                {t('qv.color')}: <span className="font-normal text-ink-600">{color}</span>
              </p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    title={c.name}
                    className={`grid h-9 w-9 place-items-center rounded-full ring-2 transition-all ${
                      color === c.name ? 'ring-ink-900' : 'ring-transparent hover:ring-ink-200'
                    }`}
                  >
                    <span
                      className="h-7 w-7 rounded-full ring-1 ring-ink-200"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-800">{t('qv.size')}</p>
                <button className="text-xs font-medium text-ocean-600 hover:underline">
                  {t('qv.sizeguide')}
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-12 rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                      size === s
                        ? 'border-ink-900 bg-ink-900 text-sand-50'
                        : 'border-ink-200 bg-white text-ink-700 hover:border-ink-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-ink-200 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center text-ink-700 hover:text-ink-900"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-11 w-11 place-items-center text-ink-700 hover:text-ink-900"
                >
                  +
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1">
                {added ? (
                  <>
                    <Check size={18} /> {t('qv.added')}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> {t('qv.add')} · {formatPrice(product.price * qty)}
                  </>
                )}
              </button>
            </div>

            {product.features.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ink-600">
                    <Check size={14} className="text-ocean-500" /> {f[locale]}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-ink-100 pt-5 text-center">
              <div className="flex flex-col items-center gap-1 text-ink-600">
                <Truck size={18} className="text-ink-700" />
                <span className="text-[11px] font-medium">{t('qv.trust.ship')}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-ink-600">
                <RefreshCw size={18} className="text-ink-700" />
                <span className="text-[11px] font-medium">{t('qv.trust.returns')}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-ink-600">
                <Shield size={18} className="text-ink-700" />
                <span className="text-[11px] font-medium">{t('qv.trust.warranty')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
