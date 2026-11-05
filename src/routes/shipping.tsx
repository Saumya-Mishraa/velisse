import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "Shipping & Returns — VÉLISSE" }] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">Customer Care</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Delivery, made simple</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Complimentary shipping is available on qualifying orders. Delivery timelines and return eligibility can vary by location and product; please review the final policy shown at checkout before placing an order.</p>
      </section>
    </PageFade>
  );
}
