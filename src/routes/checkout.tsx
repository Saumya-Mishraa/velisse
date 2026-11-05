import { createFileRoute, Link } from "@tanstack/react-router";
import { PageFade } from "@/components/fx";
import { formatPrice, shippingFor } from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — VÉLISSE" }] }),
  component: Checkout,
});

function Checkout() {
  const { cart, subtotal } = useStore();
  const shipping = shippingFor(subtotal);
  return (
    <PageFade>
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-10">
        <p className="eyebrow text-muted-foreground">Your order</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">Checkout</h1>
        {cart.length === 0 ? (
          <div className="mt-10 space-y-5"><p className="text-muted-foreground">Your bag is empty.</p><Link to="/shop" className="eyebrow inline-block bg-wine px-7 py-4 text-on-wine">Continue shopping</Link></div>
        ) : (
          <div className="mt-10 space-y-5">
            {cart.map((line) => <div key={`${line.id}-${line.shade}`} className="flex justify-between border-b border-border py-4"><div><p className="font-display text-xl">{line.id.replaceAll("-", " ")}</p><p className="text-sm text-muted-foreground">{line.shade} · Qty {line.qty}</p></div></div>)}
            <div className="space-y-2 border-t border-border pt-5"><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div><div className="flex justify-between font-display text-2xl"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div></div>
            <p className="text-sm text-muted-foreground">Online payment and order submission are not connected in this demo storefront.</p>
            <button className="eyebrow bg-wine px-7 py-4 text-on-wine" onClick={() => toast.info("Checkout is a demo. Connect a payment provider and order API before accepting orders.")}>Place demo order</button>
          </div>
        )}
      </section>
    </PageFade>
  );
}
