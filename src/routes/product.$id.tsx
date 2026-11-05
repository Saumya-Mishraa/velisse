import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";
import { PageFade, Tilt } from "@/components/fx";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { id: p.id };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.id) : undefined;
    const t = p ? `${p.name} ${p.subtitle} — VÉLISSE` : "Unavailable — VÉLISSE";
    return {
      meta: [
        { title: t },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: t },
        { property: "og:description", content: p?.description ?? "" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useLoaderData();
  const p = getProduct(id)!;
  const { add } = useStore();
  const [img, setImg] = useState(p.gallery[0]!);
  const [shade, setShade] = useState(p.shades[0]!);
  const [qty, setQty] = useState(1);
  return (
    <PageFade>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 pb-24 pt-28 md:grid-cols-2 md:px-10">
        <div>
          <Tilt className="aspect-[4/5] overflow-hidden">
            <img
              src={img}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </Tilt>
          <div className="mt-4 flex gap-3">
            {p.gallery.map((g) => (
              <button
                key={g}
                onClick={() => setImg(g)}
                className={`h-24 w-20 overflow-hidden ${g === img ? "ring-1 ring-wine" : "opacity-60"}`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="self-center">
          <p className="eyebrow text-muted-foreground">{p.collection}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-1 text-muted-foreground">
            {p.subtitle} · {p.finish}
          </p>
          <p className="mt-3 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-gold text-gold" /> {p.rating} (
            {p.reviews} reviews)
          </p>
          <p className="mt-6 font-display text-3xl">{formatPrice(p.price)}</p>
          <p className="mt-6 text-lg leading-relaxed">{p.description}</p>
          <p className="eyebrow mt-8">Shade: {shade.name}</p>
          <div className="mt-3 flex gap-3">
            {p.shades.map((s) => (
              <button
                key={s.name}
                aria-label={s.name}
                onClick={() => setShade(s)}
                className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-background ${s.name === shade.name ? "ring-1 ring-wine" : ""}`}
                style={{ backgroundColor: s.color }}
              />
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <div className="flex items-center border border-border">
              <button
                className="p-4"
                aria-label="Decrease"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button
                className="p-4"
                aria-label="Increase"
                onClick={() => setQty(Math.min(10, qty + 1))}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => {
                add(p, shade.name, qty);
                toast.success("Added to bag", {
                  description: `${p.name} · ${shade.name}`,
                });
              }}
              className="eyebrow flex-1 bg-wine-deep py-4 text-on-wine transition hover:bg-wine"
            >
              Add to Bag
            </button>
          </div>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            {p.notes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </div>
      </section>
    </PageFade>
  );
}
