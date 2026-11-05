import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — VÉLISSE" }] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">Customer Care</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Your privacy matters</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">This storefront demo does not include a production customer account or payment backend. Before accepting real customer information, publish a complete privacy policy that explains data collection, use, retention, processors and customer rights.</p>
      </section>
    </PageFade>
  );
}
