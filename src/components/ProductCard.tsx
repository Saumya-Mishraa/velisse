import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ p, tone = "light" }: { p: Product; tone?: "light" | "dark" }) {
  const { add, toggleWish, wishlist } = useStore();
  const [shade, setShade] = useState(p.shades[0]!);
  const wished = wishlist.includes(p.id);
  const muted = tone === "dark" ? "text-on-wine/60" : "text-muted-foreground";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to="/product/$id" params={{ id: p.id }} aria-label={p.name}>
          <img
            src={p.image}
            alt={`${p.name} ${p.subtitle}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-25"
            style={{ backgroundColor: shade.color }}
          />
        </Link>
        <button
          onClick={() => {
            toggleWish(p.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist", { description: p.name });
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-wine backdrop-blur transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 transition ${wished ? "fill-wine" : ""}`} />
        </button>
        <button
          onClick={() => {
            add(p, shade.name);
            toast.success("Added to bag", { description: `${p.name} · ${shade.name}` });
          }}
          className="absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-center gap-2 bg-wine-deep py-3 text-on-wine eyebrow transition-all duration-500 md:translate-y-[130%] md:group-hover:translate-y-0 hover:bg-wine"
        >
          <Plus className="h-3.5 w-3.5" /> Add to Bag
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to="/product/$id" params={{ id: p.id }} className="font-display text-xl link-underline">
            {p.name}
          </Link>
          <p className={`text-sm ${muted}`}>{p.subtitle}</p>
        </div>
        <span className="font-display text-lg">{formatPrice(p.price)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {p.shades.map((s) => (
            <button
              key={s.name}
              onClick={() => setShade(s)}
              aria-label={`Shade ${s.name}`}
              title={s.name}
              className={`h-5 w-5 rounded-full ring-offset-2 transition ${shade.name === s.name ? "ring-1 ring-current" : ""} ${tone === "dark" ? "ring-offset-wine-deep" : "ring-offset-background"}`}
              style={{ backgroundColor: s.color }}
            />
          ))}
        </div>
        <span className={`flex items-center gap-1 text-xs ${muted}`}>
          <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating.toFixed(1)} ({p.reviews})
        </span>
      </div>
    </motion.article>
  );
}
