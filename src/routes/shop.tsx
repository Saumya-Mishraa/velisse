import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "Shop — VÉLISSE" },
    { name: "description", content: "Shop VÉLISSE lipsticks, glosses, complexion and gift sets." },
    { property: "og:title", content: "Shop — VÉLISSE" },
    { property: "og:description", content: "Luxury lipsticks, glosses and gift sets." },
  ] }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <PageFade>
      <section className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">The Maison</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">Shop <em>all</em></h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {["All", ...categories].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border border-wine px-5 py-2 text-sm transition ${cat === c ? "bg-wine text-on-wine" : "hover:bg-blush"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">{list.map((p) => <ProductCard key={p.id} p={p} />)}</AnimatePresence>
        </div>
      </section>
    </PageFade>
  );
}
