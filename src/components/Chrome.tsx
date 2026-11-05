import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, ShoppingBag, X, Minus, Plus, Menu, Heart, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { categories, formatPrice, FREE_SHIPPING_MIN, getProduct, products, shippingFor } from "@/lib/products";
import { Magnetic } from "./fx";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/story", label: "Our Story" },
] as const;

const brandLinks = [
  { to: "/story", label: "Our Story", note: "A single shade of wine, an obsession" },
  { to: "/philosophy", label: "Our Philosophy", note: "Colour that feels like nothing" },
  { to: "/ingredients", label: "Our Ingredients", note: "Botanical oils, clean pigments" },
] as const;

function NavDropdown({ label, to, children }: { label: string; to: "/shop" | "/story"; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <Link to={to} className="eyebrow link-underline flex items-center gap-1.5 py-1" activeProps={{ className: "text-gold" }} aria-haspopup="true" aria-expanded={open}>
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[-1.5rem] top-full pt-5"
          >
            <div className="min-w-[19rem] border border-border/70 bg-cream p-6 text-foreground shadow-lux">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { count, setOpen, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overHero = path === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero ? "text-on-wine" : "border-b border-border/60 bg-cream/85 text-foreground backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:h-20 md:px-10">
        <nav className="hidden flex-1 items-center gap-9 md:flex">
          <NavDropdown label="Shop" to="/shop">
            <p className="eyebrow text-muted-foreground">Shop by category</p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c, i) => (
                <motion.li key={c} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <Link to="/shop" search={{ cat: c }} className="group flex items-baseline justify-between font-display text-2xl hover:italic">
                    {c}
                    <span className="text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="hairline my-5" />
            <Link to="/shop" className="eyebrow link-underline">View all products</Link>
          </NavDropdown>
          <Link to="/collections" className="eyebrow link-underline py-1" activeProps={{ className: "text-gold" }}>
            Collections
          </Link>
          <NavDropdown label="The Brand" to="/story">
            <ul className="space-y-4">
              {brandLinks.map((b, i) => (
                <motion.li key={b.to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
                  <Link to={b.to} className="block">
                    <span className="font-display text-2xl hover:italic">{b.label}</span>
                    <span className="block text-xs text-muted-foreground">{b.note}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </NavDropdown>
        </nav>
        <button className="md:hidden" onClick={() => setOpen("menu")} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="font-display text-2xl tracking-[0.35em] md:text-3xl" aria-label="VÉLISSE home">
          VÉLISSE
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
          <button onClick={() => setOpen("search")} aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link to="/account" aria-label="Account" className="relative hidden sm:block">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/account" aria-label="Wishlist" className="relative hidden sm:block">
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-gold" />}
          </Link>
          <button onClick={() => setOpen("cart")} aria-label="Shopping bag" className="relative">
            <ShoppingBag className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-wine-deep"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

const panel = { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const };

export function MobileMenu() {
  const { open, setOpen } = useStore();
  return (
    <AnimatePresence>
      {open === "menu" && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-wine-deep px-6 py-6 text-on-wine"
          initial={{ clipPath: "circle(0% at 8% 4%)" }}
          animate={{ clipPath: "circle(150% at 8% 4%)" }}
          exit={{ clipPath: "circle(0% at 8% 4%)" }}
          transition={panel}
        >
          <div className="flex justify-between">
            <span className="font-display text-2xl tracking-[0.35em]">VÉLISSE</span>
            <button onClick={() => setOpen(null)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-4">
            {[...nav, { to: "/philosophy", label: "Philosophy" } as const, { to: "/account", label: "Wishlist" } as const, { to: "/contact", label: "Contact" } as const].map((n, i) => (
              <motion.div
                key={n.to}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
              >
                <Link to={n.to} onClick={() => setOpen(null)} className="font-display text-4xl italic sm:text-5xl">
                  {n.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-auto space-y-2 pt-8 text-sm text-on-wine/60">
            <p>Complimentary shipping across India above {formatPrice(FREE_SHIPPING_MIN)}</p>
            <p className="eyebrow text-gold">Beauty, Beyond the Ordinary.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SearchOverlay() {
  const { open, setOpen } = useStore();
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter((p) =>
      [p.name, p.subtitle, p.category, p.collection, ...p.shades.map((x) => x.name)].join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open === "search" && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-cream/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-4xl px-6 pt-10 md:pt-24">
            <div className="flex justify-end">
              <button onClick={() => setOpen(null)} aria-label="Close search">
                <X />
              </button>
            </div>
            <p className="eyebrow mt-6 text-muted-foreground">Search VÉLISSE</p>
            <motion.input
              autoFocus
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rouge, nude, gloss…"
              className="mt-4 w-full border-b border-wine bg-transparent pb-4 font-display text-4xl outline-none placeholder:text-muted-foreground/50 md:text-6xl"
            />
            <div className="mt-10 grid gap-4 pb-20">
              {q && results.length === 0 && <p className="text-muted-foreground">No products match “{q}”.</p>}
              {results.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    onClick={() => setOpen(null)}
                    className="group flex items-center gap-5 border-b border-border pb-4"
                  >
                    <img src={p.image} alt="" className="h-20 w-16 object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-2xl group-hover:italic">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                    </div>
                    <span className="font-display">{formatPrice(p.price)}</span>
                  </Link>
                </motion.div>
              ))}
              {!q && (
                <div className="flex flex-wrap gap-3">
                  {["Rouge Absolu", "Nude", "Gloss", "Gift Set"].map((t) => (
                    <button key={t} onClick={() => setQ(t)} className="rounded-full border border-wine px-4 py-2 text-sm hover:bg-wine hover:text-on-wine">
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CartDrawer() {
  const { open, setOpen, cart, setQty, remove, subtotal, clear } = useStore();
  const navigate = useNavigate();
  const shipping = shippingFor(subtotal);
  const toFree = Math.max(0, FREE_SHIPPING_MIN - subtotal);
  return (
    <AnimatePresence>
      {open === "cart" && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-wine-deep/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[61] flex w-full max-w-md flex-col bg-cream"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panel}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl">Your Bag</h2>
              <button onClick={() => setOpen(null)} aria-label="Close bag">
                <X />
              </button>
            </div>
            {cart.length > 0 && (
              <div className="border-b border-border px-6 py-4">
                <p className="text-xs text-muted-foreground">
                  {toFree > 0 ? <>You are <span className="text-foreground">{formatPrice(toFree)}</span> away from complimentary shipping</> : "Your order ships complimentary, anywhere in India"}
                </p>
                <div className="mt-2 h-px w-full bg-border">
                  <motion.div className="h-px bg-gold" animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_MIN) * 100)}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-3xl italic">Your bag is empty</p>
                  <p className="mt-2 text-sm text-muted-foreground">Discover the shades everyone is wearing.</p>
                  <Link to="/shop" onClick={() => setOpen(null)} className="eyebrow mt-6 bg-wine px-8 py-4 text-on-wine">
                    Shop now
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((l) => {
                    const p = getProduct(l.id);
                    if (!p) return null;
                    return (
                      <motion.div
                        key={l.id + l.shade}
                        layout
                        exit={{ opacity: 0, x: 60 }}
                        className="flex gap-4 border-b border-border py-5"
                      >
                        <img src={p.image} alt={p.name} className="h-24 w-20 object-cover" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <p className="font-display text-lg">{p.name}</p>
                            <p className="font-display">{formatPrice(p.price * l.qty)}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{l.shade}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button className="p-2" aria-label="Decrease" onClick={() => setQty(l.id, l.shade, l.qty - 1)}>
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm">{l.qty}</span>
                              <button className="p-2" aria-label="Increase" onClick={() => setQty(l.id, l.shade, l.qty + 1)}>
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button onClick={() => remove(l.id, l.shade)} className="text-xs text-muted-foreground link-underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
            {cart.length > 0 && (
              <div className="space-y-3 border-t border-border px-6 py-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Prices include GST. UPI, cards, net banking and Cash on Delivery available.</p>
                <button
                  onClick={() => {
                    setOpen(null);
                    navigate({ to: "/checkout" });
                  }}
                  className="sheen eyebrow w-full bg-wine-deep py-4 text-on-wine transition hover:bg-wine"
                >
                  Proceed to checkout
                </button>
                <button onClick={clear} className="w-full text-center text-[11px] text-muted-foreground link-underline">
                  Clear bag
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const [focus, setFocus] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setState("error");
    setState("done");
    toast.success("Welcome to VÉLISSE", { description: "Your 10% welcome code is on its way to your inbox." });
    setEmail("");
  };
  const line = tone === "dark" ? "bg-on-wine/30" : "bg-wine/30";
  return (
    <form onSubmit={submit} noValidate className="w-full max-w-lg">
      <div className="relative flex items-end gap-4">
        <input
          type="email"
          value={email}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className="flex-1 bg-transparent py-3 text-lg outline-none placeholder:opacity-50"
        />
        <Magnetic>
          <button type="submit" className="eyebrow rounded-full border border-gold px-6 py-3 text-gold transition hover:bg-gold hover:text-wine-deep">
            Join
          </button>
        </Magnetic>
        <span className={`absolute bottom-0 left-0 h-px w-full ${line}`} />
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-gold"
          animate={{ width: focus || email ? "100%" : "0%" }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <p className={`mt-3 h-5 text-sm ${state === "error" ? "text-destructive" : "text-gold"}`} role="status">
        {state === "error" && "Please enter a valid email address."}
        {state === "done" && "Thank you, you're on the list."}
      </p>
    </form>
  );
}

const footerCols = [
  { h: "The Brand", l: [["/story", "Our Story"], ["/philosophy", "Our Philosophy"], ["/ingredients", "Our Ingredients"]] },
  { h: "Customer Care", l: [["/contact", "Contact Us"], ["/faqs", "FAQs"], ["/shipping", "Shipping & Returns"], ["/privacy", "Privacy Policy"]] },
] as const;

export function Footer() {
  return (
    <footer className="grain overflow-hidden bg-wine-deep text-on-wine">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-4xl tracking-[0.3em]">VÉLISSE</p>
            <p className="mt-3 font-display text-lg italic text-gold">Beauty, Beyond the Ordinary.</p>
            <p className="mt-8 max-w-sm text-sm text-on-wine/60">The VÉLISSE letter: new shades, rituals and private previews. Enjoy 10% off your first order.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
          {footerCols.map((c) => (
            <div key={c.h}>
              <p className="eyebrow text-gold">{c.h}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {c.l.map(([to, label]) => (
                  <li key={label}>
                    <Link to={to} className="link-underline text-on-wine/80 transition hover:text-on-wine">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow text-gold">Follow Us</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Instagram", "https://instagram.com"],
                ["Pinterest", "https://pinterest.com"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noreferrer" className="link-underline text-on-wine/80 transition hover:text-on-wine">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-on-wine/50">
              Client care: Mon–Sat, 10 am – 7 pm IST
              <br />
              care@velisse.in
            </p>
          </div>
        </div>
        <p aria-hidden className="pointer-events-none mt-16 select-none text-center font-display text-[22vw] leading-none tracking-[0.08em] text-on-wine/[0.05] lg:text-[16rem]">
          VÉLISSE
        </p>
        <div className="flex flex-col justify-between gap-3 border-t border-on-wine/15 pt-6 text-xs text-on-wine/50 md:flex-row">
          <span>© 2026 VÉLISSE Beauty. Demo storefront, no real orders are placed.</span>
          <span>Cruelty-free · Refillable · Prices inclusive of GST</span>
        </div>
      </div>
    </footer>
  );
}
