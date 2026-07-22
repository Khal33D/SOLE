import { useState } from 'react';
import type { CartLine } from '../types';
import { formatPrice } from '../data';
import { useCart } from '../cart';
import { useI18n } from '../i18n';
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  Banknote,
  Loader2,
  ShoppingBag,
  Phone,
  MapPin,
  Mail,
  User,
  StickyNote,
} from '../icons';

interface CheckoutPageProps {
  onBack: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { t, locale } = useI18n();
  const { lines, subtotal, clear } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string; name: string; phone: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const shipping = subtotal >= 50 ? 0 : 0; // COD: free shipping for now
  const total = subtotal + shipping;

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t('checkout.required');
    if (!form.phone.trim()) e.phone = t('checkout.required');
    else if (!/^[0-9+\s\-()]{6,}$/.test(form.phone.trim())) e.phone = t('checkout.invalid.phone');
    if (!form.address.trim()) e.address = t('checkout.required');
    if (!form.city.trim()) e.city = t('checkout.required');
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = t('checkout.invalid.email');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    if (lines.length === 0) return;

    setSubmitting(true);
    try {
      const items = lines.map((l: CartLine) => ({
        productId: l.productId,
        name: l.name,
        size: l.size,
        color: l.color,
        quantity: l.quantity,
        price: l.price,
      }));

      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ANON_KEY}`,
          apikey: ANON_KEY,
        },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email || undefined,
          shipping_address: form.address,
          city: form.city,
          notes: form.notes || undefined,
          locale,
          items,
          subtotal,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');

      setSuccess({ id: data.orderId, name: form.name, phone: form.phone });
      clear();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t('checkout.error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container-x flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-lg rounded-4xl bg-white p-8 text-center shadow-lift ring-1 ring-ink-100 md:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ocean-100">
            <Check size={40} className="text-ocean-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {t('checkout.success.title')}
          </h1>
          <p className="mt-3 text-ink-600">
            {t('checkout.success.sub', { name: success.name, phone: success.phone })}
          </p>
          <p className="mt-4 inline-block rounded-full bg-sand-100 px-4 py-2 text-sm font-semibold text-ink-800">
            {t('checkout.success.order', { id: success.id.slice(0, 8) })}
          </p>
          <button onClick={onBack} className="btn-primary mt-8 w-full">
            {t('checkout.back')}
          </button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink-100">
            <ShoppingBag size={32} className="text-ink-400" />
          </div>
          <p className="mt-4 font-display text-xl font-semibold">{t('checkout.empty')}</p>
          <button onClick={onBack} className="btn-ghost mt-5">
            {t('checkout.back')}
          </button>
        </div>
      </div>
    );
  }

  const inputCls = (k: string) =>
    `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:outline-none focus:ring-2 ${
      errors[k] ? 'border-coral-400 focus:ring-coral-300' : 'border-ink-200 focus:border-ocean-400 focus:ring-ocean-200'
    }`;

  return (
    <div className="container-x py-10 md:py-16">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900"
      >
        <ArrowLeft size={18} className="rtl:rotate-180" />
        {t('checkout.back')}
      </button>

      <div className="mb-8 flex items-center gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {t('checkout.title')}
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ocean-700 ring-1 ring-ocean-200">
          <Banknote size={14} />
          {t('checkout.cod.badge')}
        </span>
      </div>

      <div className="mb-8 rounded-2xl bg-sand-100 p-4 text-sm text-ink-700">
        <p className="flex items-center gap-2">
          <Truck size={16} className="text-ocean-600" />
          {t('checkout.cod.note')}
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left: form fields */}
        <div className="flex flex-col gap-8">
          <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-100 md:p-8">
            <h2 className="font-display text-xl font-semibold">{t('checkout.section.contact')}</h2>
            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.name')}
                </label>
                <div className="relative">
                  <User size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder={t('checkout.name.ph')}
                    className={`${inputCls('name')} ps-10`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-coral-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.phone')}
                </label>
                <div className="relative">
                  <Phone size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder={t('checkout.phone.ph')}
                    className={`${inputCls('phone')} ps-10`}
                    autoComplete="tel"
                    dir="ltr"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-coral-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.email')}
                </label>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder={t('checkout.email.ph')}
                    className={`${inputCls('email')} ps-10`}
                    autoComplete="email"
                    dir="ltr"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-coral-600">{errors.email}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-100 md:p-8">
            <h2 className="font-display text-xl font-semibold">{t('checkout.section.delivery')}</h2>
            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.address')}
                </label>
                <div className="relative">
                  <MapPin size={16} className="pointer-events-none absolute start-3.5 top-4 text-ink-400" />
                  <textarea
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                    placeholder={t('checkout.address.ph')}
                    rows={3}
                    className={`${inputCls('address')} ps-10 resize-none`}
                  />
                </div>
                {errors.address && <p className="mt-1 text-xs text-coral-600">{errors.address}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.city')}
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder={t('checkout.city.ph')}
                  className={inputCls('city')}
                  autoComplete="address-level2"
                />
                {errors.city && <p className="mt-1 text-xs text-coral-600">{errors.city}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">
                  {t('checkout.notes')}
                </label>
                <div className="relative">
                  <StickyNote size={16} className="pointer-events-none absolute start-3.5 top-4 text-ink-400" />
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder={t('checkout.notes.ph')}
                    rows={2}
                    className={`${inputCls('notes')} ps-10 resize-none`}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: order summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-100 md:p-7">
            <h2 className="font-display text-xl font-semibold">{t('checkout.section.summary')}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-3">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="h-16 w-14 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold leading-tight">{l.name}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {l.color} · {t('qv.size')} {l.size} · ×{l.quantity}
                    </p>
                    <span className="mt-auto text-sm font-semibold">
                      {formatPrice(l.price * l.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-600">{t('checkout.subtotal')}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-600">{t('checkout.shipping')}</span>
                <span className="font-medium text-ocean-600">
                  {shipping === 0 ? t('checkout.shipping.free') : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-3 text-base">
                <span className="font-semibold">{t('checkout.total')}</span>
                <span className="font-display text-xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* COD payment method */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-ocean-50 p-4 ring-1 ring-ocean-200">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean-500 text-white">
                <Banknote size={20} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{t('checkout.cod.label')}</p>
                <p className="text-xs text-ink-500">{t('checkout.cod.fee')}</p>
              </div>
              <Check size={18} className="text-ocean-600" />
            </div>

            {serverError && (
              <p className="mt-4 rounded-2xl bg-coral-50 p-3 text-xs text-coral-700 ring-1 ring-coral-200">
                {serverError}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t('checkout.submitting')}
                </>
              ) : (
                <>
                  <Banknote size={18} />
                  {t('checkout.submit')}
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-5 text-[11px] text-ink-500">
              <span className="flex items-center gap-1">
                <Shield size={13} /> {t('cart.trust.secure')}
              </span>
              <span className="flex items-center gap-1">
                <Truck size={13} /> {t('cart.trust.fast')}
              </span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
