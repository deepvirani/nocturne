"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "atelier-cart-v1";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + qty } : entry,
        );
      }
      return [...current, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((entry) => entry.id !== id)
        : current.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

    return {
      items,
      count,
      subtotal,
      isOpen,
      hydrated,
      addItem,
      removeItem,
      setQty,
      clearCart,
      openCart,
      closeCart,
    };
  }, [
    items,
    isOpen,
    hydrated,
    addItem,
    removeItem,
    setQty,
    clearCart,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
