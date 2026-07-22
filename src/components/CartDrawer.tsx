import { useEffect } from 'react';
import { useCart } from '../cart';
import { formatPrice } from '../data';
import { useI18n } from '../i18n';
import { ShoppingBag, X, Plus, Minus, Trash2, Shield, Truck, RefreshCw } from '../icons';

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, update, remove, count, goCheckout, checkingOut } = useCart();
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const freeShipThreshold = 50;
  const remaining = Math.max(0, freeShipThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShipThreshold) * 100);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
      />
      <aside
        className={`fixed end-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sand-50 shadow-lift transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-ink-800" />
            <span className="font-display text-lg font-semibold">{t('cart.title')}</span>
            <span className="text-sm text-ink-400">({count})</span>
          </div>
          <button onClick={close} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink-100">
            <X size={20} />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-ink-100 px-5 py-3">
            <p className="text-xs text-ink-600">
              {remaining > 0 ? (
                <>
                  {t('cart.remaining', { amount: formatPrice(remaining) })}
                </>
              ) : (
                <span className="font-semibold text-ocean-600">{t('cart.unlocked')}</span>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-ocean-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="thin-scrollbar flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-100">
                <ShoppingBag size={32} className="text-ink-400" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold">{t('cart.empty')}</p>
              <p className="mt-1 text-sm text-ink-500">{t('cart.empty.sub')}</p>
              <button onClick={close} className="btn-ghost mt-5">
                {t('cart.continue')}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-3">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="h-24 w-20 flex-shrink-0 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-sm font-semibold leading-tight">{l.name}</h4>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {l.color} · {t('qv.size')} {l.size}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(l.productId, l.size, l.color)}
                        className="text-ink-400 hover:text-coral-500"
                        aria-label={t('cart.remove')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink-200 bg-white">
                        <button
                          onClick={() => update(l.productId, l.size, l.color, l.quantity - 1)}
                          className="grid h-8 w-8 place-items-center text-ink-700 hover:text-ink-900"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold">{l.quantity}</span>
                        <button
                          onClick={() => update(l.productId, l.size, l.color, l.quantity + 1)}
                          className="grid h-8 w-8 place-items-center text-ink-700 hover:text-ink-900"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-semibold">
                        {formatPrice(l.price * l.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-ink-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-600">{t('cart.subtotal')}</span>
              <span className="font-display text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-400">{t('cart.taxes')}</p>
            <button
              onClick={goCheckout}
              disabled={checkingOut}
              className="btn-primary mt-4 w-full disabled:opacity-60"
            >
              {t('cart.checkout')}
            </button>
            <button onClick={close} className="btn-ghost mt-2 w-full">
              {t('cart.continue')}
            </button>
            <div className="mt-4 flex items-center justify-center gap-5 text-[11px] text-ink-500">
              <span className="flex items-center gap-1">
                <Shield size={13} /> {t('cart.trust.secure')}
              </span>
              <span className="flex items-center gap-1">
                <Truck size={13} /> {t('cart.trust.fast')}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw size={13} /> {t('cart.trust.returns')}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
