import { useEffect, useState } from 'react';
import { CartProvider } from './cart';
import { I18nProvider } from './i18n';
import type { Product, Category } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryStrip } from './components/CategoryStrip';
import { ProductGrid } from './components/ProductGrid';
import { Lookbook } from './components/LookBook';
import { FeatureStrip } from './components/FeatureStrip';
import { Footer } from './components/Footer';
import { QuickView } from './components/QuickView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';

type Filter = 'all' | Category | 'best' | 'new';

function Storefront() {
  const [filter, setFilter] = useState<Filter>('all');
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [view, setView] = useState<'store' | 'checkout'>('store');

  const scrollToShop = () => {
    requestAnimationFrame(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleNavigate = (cat: string) => {
    if (cat === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setFilter(cat === 'all' ? 'all' : (cat as Filter));
    scrollToShop();
  };

  useEffect(() => {
    const onFilter = (e: Event) => {
      const detail = (e as CustomEvent).detail as Filter;
      setFilter(detail);
    };
    const onCheckout = () => {
      setView('checkout');
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('sole:filter', onFilter);
    window.addEventListener('sole:checkout', onCheckout);
    return () => {
      window.removeEventListener('sole:filter', onFilter);
      window.removeEventListener('sole:checkout', onCheckout);
    };
  }, []);

  const backToStore = () => {
    setView('store');
    scrollToShop();
  };

  return (
    <div className="min-h-screen bg-sand-50">
      <Header onNavigate={handleNavigate} />
      <main>
        {view === 'checkout' ? (
          <CheckoutPage onBack={backToStore} />
        ) : (
          <>
            <Hero onShop={handleNavigate} />
            <CategoryStrip onSelect={handleNavigate} />
            <ProductGrid active={filter} onQuickView={setQuickView} />
            <Lookbook onShop={handleNavigate} />
            <FeatureStrip />
          </>
        )}
      </main>
      <Footer />
      <CartDrawer />
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <Storefront />
      </CartProvider>
    </I18nProvider>
  );
}
