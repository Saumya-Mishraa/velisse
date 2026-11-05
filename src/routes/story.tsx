import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/products";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/story")({
  head: () => ({ meta: [
    { title: "Our Story — VÉLISSE" },
    { name: "description", content: "The story of the VÉLISSE Maison de Beauté." },
    { property: "og:title", content: "Our Story — VÉLISSE" },
    { property: "og:description", content: "Beauty, Beyond the Ordinary." },
  ] }),
  component: Story,
});

function Story() {
  return (
    <PageFade>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 pb-24 pt-32 md:grid-cols-2 md:px-10">
        <img src={images.muse} alt="VÉLISSE muse" className="aspect-[3/4] w-full object-cover" />
        <div className="self-center">
          <p className="eyebrow text-muted-foreground">Our Story</p>
          <h1 className="mt-4 font-display text-5xl italic md:text-6xl">Beauty, Beyond the Ordinary.</h1>
          <p className="mt-6 text-lg text-muted-foreground">VÉLISSE began with a single shade of wine red and an obsession with how colour should feel: cushioned, luminous, lasting. Every formula is cruelty-free and every case is made to be refilled.</p>
          <p className="mt-4 text-sm text-muted-foreground">Shipping is complimentary over $75. Returns accepted within 30 days.</p>
        </div>
      </section>
    </PageFade>
  );
}
