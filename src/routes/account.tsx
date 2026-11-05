import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { PageFade } from "@/components/fx";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: "Account & Wishlist — VÉLISSE" },
    { name: "description", content: "Your VÉLISSE wishlist." },
    { property: "og:title", content: "Account — VÉLISSE" },
    { property: "og:description", content: "Your saved shades." },
  ] }),
  component: Account,
});

function Account() {
  const { wishlist } = useStore();
  const list = products.filter((p) => wishlist.includes(p.id));
  return (
    <PageFade>
      <section className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-10">
        <h1 className="font-display text-5xl">Your wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">Accounts are a demo here; your wishlist is saved on this device.</p>
        {list.length === 0 ? <p className="mt-10 font-display text-2xl italic">No saved shades yet.</p> : (
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </section>
    </PageFade>
  );
}
