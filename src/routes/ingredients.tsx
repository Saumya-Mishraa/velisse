import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/ingredients")({
  head: () => ({ meta: [
    { title: "Our Ingredients — VÉLISSE" },
    { name: "description", content: "Every VÉLISSE formula is designed around a comfortable feel, considered pigments and carefully selected cosmetic ingredients." },
  ] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">The VÉLISSE formula</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Care in every detail</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Every VÉLISSE formula is designed around a comfortable feel, considered pigments and carefully selected cosmetic ingredients.</p>
          <p>Our signature lip formulas feature ingredients such as rosehip oil, camellia oil and squalane, selected for a smooth, cushioned finish. Ingredient lists vary by product; always check the product packaging for the complete, current list.</p>
        </div>
      </section>
    </PageFade>
  );
}
