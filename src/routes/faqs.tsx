import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "Frequently Asked Questions — VÉLISSE" }] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">Customer Care</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">A few helpful answers</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">For product details, shade guidance and order support, please contact our team. Product availability, delivery estimates and return eligibility should be confirmed at checkout and in your order confirmation.</p>
      </section>
    </PageFade>
  );
}
