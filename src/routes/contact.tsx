import { createFileRoute } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — VÉLISSE" }] }),
  component: Page,
});

function Page() {
  return (
    <PageFade>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">Customer Care</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">We would love to hear from you</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">For product questions, order support or feedback, contact the VÉLISSE team at hello@velisse.example. This is a demo contact address; replace it with your verified business email before launch.</p>
      </section>
    </PageFade>
  );
}
