import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product } from './types';
import { isShopifyConfigured, createShopifyCheckout } from './shopify';
import { useI18n } from './i18n';

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; productId: string; size: string; color: string }
  | { type: 'update'; productId: string; size: string; color: string; quantity: number }
  | { type: 'clear' };

function key(l: { productId: string; size: string; color: string }) {
  return `${l.productId}|${l.size}|${l.color}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const k = key(action.line);
      const existing = state.lines.find((l) => key(l) === k);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            key(l) === k ? { ...l, quantity: l.quantity + action.line.quantity } : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case 'remove':
      return {
        lines: state.lines.filter((l) => key(l) !== key(action)),
      };
    case 'update':
      return {
        lines: state.lines
          .map((l) =>
            key(l) === key(action)
              ? { ...l, quantity: Math.max(0, action.quantity) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  open: () => void;
  close: () => void;
  add: (product: Product, size: string, color: string, quantity?: number) => void;
  remove: (productId: string, size: string, color: string) => void;
  update: (productId: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
  goCheckout: () => void;
  checkout: () => Promise<void>;
  checkingOut: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'sole-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  const [state, dispatch] = useReducer(reducer, { lines: [] }, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { lines: JSON.parse(saved) };
    } catch {}
    return init;
  });
  const [isOpen, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {}
  }, [state.lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = state.lines.reduce((s, l) => s + l.quantity * l.price, 0);

    return {
      lines: state.lines,
      isOpen,
      count,
      subtotal,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (product, size, color, quantity = 1) => {
        dispatch({
          type: 'add',
          line: {
            productId: product.id,
            name: product.name[locale] ?? product.name.en,
            image: product.images[0],
            price: product.price,
            size,
            color,
            quantity,
          },
        });
        setOpen(true);
      },
      remove: (productId, size, color) => dispatch({ type: 'remove', productId, size, color }),
      update: (productId, size, color, quantity) =>
        dispatch({ type: 'update', productId, size, color, quantity }),
      clear: () => dispatch({ type: 'clear' }),
      goCheckout: () => {
        setOpen(false);
        window.dispatchEvent(new CustomEvent('sole:checkout'));
      },
      checkout: async () => {
        setCheckingOut(true);
        try {
          if (isShopifyConfigured() && state.lines.some((l) => l.productId.startsWith('gid://'))) {
            const lines = state.lines
              .filter((l) => l.productId.startsWith('gid://'))
              .map((l) => ({ id: l.productId, quantity: l.quantity }));
            const url = await createShopifyCheckout(lines);
            window.location.href = url;
            return;
          }
          // Demo checkout: simulate redirect
          await new Promise((r) => setTimeout(r, 900));
          alert(
            'Demo checkout — connect Shopify (VITE_SHOPIFY_STORE_DOMAIN + VITE_SHOPIFY_STOREFRONT_TOKEN) to enable real Shopify cart checkout.',
          );
        } finally {
          setCheckingOut(false);
        }
      },
      checkingOut,
    };
  }, [state.lines, isOpen, checkingOut, locale]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
