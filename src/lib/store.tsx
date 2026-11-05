import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { id: string; shade: string; qty: number };
type UI = "cart" | "search" | "menu" | null;

type Store = {
  cart: CartLine[];
  wishlist: string[];
  open: UI;
  setOpen: (u: UI) => void;
  add: (p: Product, shade: string, qty?: number) => void;
  setQty: (id: string, shade: string, qty: number) => void;
  remove: (id: string, shade: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [open, setOpen] = useState<UI>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("velisse-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("velisse-wish") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velisse-cart", JSON.stringify(cart));
    localStorage.setItem("velisse-wish", JSON.stringify(wishlist));
  }, [cart, wishlist, ready]);

  const value = useMemo<Store>(() => {
    const subtotal = cart.reduce((s, l) => s + (getProduct(l.id)?.price ?? 0) * l.qty, 0);
    return {
      cart,
      wishlist,
      open,
      setOpen,
      add: (p, shade, qty = 1) =>
        setCart((c) => {
          const ex = c.find((l) => l.id === p.id && l.shade === shade);
          if (ex) return c.map((l) => (l === ex ? { ...l, qty: Math.min(l.qty + qty, 10) } : l));
          return [...c, { id: p.id, shade, qty }];
        }),
      setQty: (id, shade, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((l) => !(l.id === id && l.shade === shade))
            : c.map((l) => (l.id === id && l.shade === shade ? { ...l, qty: Math.min(qty, 10) } : l)),
        ),
      remove: (id, shade) => setCart((c) => c.filter((l) => !(l.id === id && l.shade === shade))),
      clear: () => setCart([]),
      toggleWish: (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      count: cart.reduce((s, l) => s + l.qty, 0),
      subtotal,
    };
  }, [cart, wishlist, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
