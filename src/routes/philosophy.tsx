import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/philosophy")({
  head: () => ({ meta: [
    { title: "Our Philosophy — VÉLISSE" },
    { name: "description", content: "We believe beauty should be expressive without feeling complicated. A considered edit of shades, comfortable textures and thoughtful design makes every ritual feel personal." },
  ] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">The VÉLISSE philosophy</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Colour should feel like nothing</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>We believe beauty should be expressive without feeling complicated. A considered edit of shades, comfortable textures and thoughtful design makes every ritual feel personal.</p>
          <p>From saturated wine tones to soft everyday nudes, each VÉLISSE product is created to bring colour, confidence and ease to the everyday.</p>
        </div>
      </section>
    </PageFade>
  );
}
