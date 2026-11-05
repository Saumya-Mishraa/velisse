import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/lib/products";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [
    { title: "Collections — VÉLISSE" },
    { name: "description", content: "Rouge Absolu, Velours Nude and Soie Lumière collections." },
    { property: "og:title", content: "Collections — VÉLISSE" },
    { property: "og:description", content: "Three collections, one signature." },
  ] }),
  component: Collections,
});

const cols = [
  { name: "Rouge Absolu", text: "Saturated wine satins for evening.", img: images.still },
  { name: "Velours Nude", text: "Blurred velvet nudes for every day.", img: images.lineup },
  { name: "Soie Lumière", text: "Glass-like lacquers and silk veils.", img: images.gloss },
];

function Collections() {
  return (
    <PageFade>
      <section className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-10">
        <h1 className="font-display text-5xl md:text-7xl">Collections</h1>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cols.map((c) => (
            <Link key={c.name} to="/shop" className="group block">
              <div className="aspect-[3/4] overflow-hidden"><img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-110" /></div>
              <h2 className="mt-4 font-display text-3xl group-hover:italic">{c.name}</h2>
              <p className="text-muted-foreground">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageFade>
  );
}
