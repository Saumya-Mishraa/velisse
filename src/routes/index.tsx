import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Leaf } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, FREE_SHIPPING_MIN, getProduct, images, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { Magnetic, Marquee, Particles, SplitText, Tilt } from "@/components/fx";
import { NewsletterForm } from "@/components/Chrome";
import { standardReveals, useGsap } from "@/lib/gsap";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VÉLISSE — Beauty, Beyond the Ordinary" },
    { name: "description", content: "Luxury lipsticks in wine, rose and nude, delivered across India. Discover VÉLISSE." },
    { property: "og:title", content: "VÉLISSE — Beauty, Beyond the Ordinary" },
    { property: "og:description", content: "Luxury lipsticks, glosses and rituals, with complimentary shipping across India." },
  ] }),
  component: Index,
});

const signature = getProduct("rouge-absolu-satin")!;

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(ref, (g) => {
    const tl = g.timeline({ delay: 0.35 });
    tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1, ease: "expo.out" })
      .from(".hero .char", { yPercent: 115, rotate: 4, stagger: 0.035, duration: 1.3, ease: "expo.out" }, "-=0.7")
      .fromTo(".hero-frame", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)", duration: 1.8, ease: "expo.inOut" }, 0.2)
      .from(".hero-img", { scale: 1.4, duration: 2.2, ease: "expo.out" }, 0.4)
      .from(".hero-fade", { y: 24, opacity: 0, stagger: 0.12, duration: 1, ease: "expo.out" }, "-=1.2");
    g.to(".hero-img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    g.to(".hero-copy", { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    standardReveals(g);
  });

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="hero grain relative flex min-h-[100svh] items-center overflow-hidden bg-wine-gradient text-on-wine">
        <div className="animate-drift absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-wine opacity-60 blur-3xl" />
        <div className="glow-gold absolute right-[-10%] top-[20%] h-[60vh] w-[60vh] rounded-full opacity-60" />
        <Particles />
        <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.2fr_1fr] md:px-10 md:pb-0">
          <div className="hero-copy">
            <p className="hero-eyebrow eyebrow flex items-center gap-4 text-gold">
              <span className="h-px w-10 bg-gold" /> Rouge Absolu · The New Season
            </p>
            <h1 className="mt-6 font-display text-[3.4rem] leading-[0.92] sm:text-7xl md:text-8xl xl:text-[8.5rem]">
              <SplitText text="Beauty, Beyond" /><br /><em className="text-gold-gradient"><SplitText text="the Ordinary." /></em>
            </h1>
            <p className="hero-fade mt-8 max-w-md text-base leading-relaxed text-on-wine/70 md:text-lg">
              Saturated wine pigment, cushioned in rosehip oil. Twelve hours of colour that feels like nothing at all.
            </p>
            <div className="hero-fade mt-10 flex flex-wrap gap-4">
              <Magnetic><Link to="/shop" className="sheen eyebrow inline-block rounded-full bg-gold px-9 py-4 text-wine-deep">Shop the shades</Link></Magnetic>
              <Magnetic><Link to="/story" className="eyebrow inline-block rounded-full border border-on-wine/40 px-9 py-4 transition hover:border-gold hover:text-gold">Our story</Link></Magnetic>
            </div>
          </div>
          <Tilt className="relative mx-auto w-full max-w-[22rem] md:max-w-md" max={6}>
            <div className="hero-frame vignette relative overflow-hidden rounded-t-full shadow-lux">
              <img src={images.still} alt="Rouge Absolu lipstick with roses" fetchPriority="high" className="hero-img aspect-[2/3] w-full object-cover" />
            </div>
            <div className="hero-fade absolute -bottom-5 -left-4 border border-gold/40 bg-wine-deep/80 px-5 py-3 backdrop-blur md:-left-10">
              <p className="eyebrow text-gold">Signature</p>
              <p className="font-display text-xl italic">Bordeaux Night · {formatPrice(signature.price)}</p>
            </div>
          </Tilt>
        </div>
        <div className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="eyebrow text-on-wine/50">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-on-wine/20"><motion.span className="absolute inset-x-0 top-0 h-4 bg-gold" animate={{ y: [-16, 40] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /></span>
        </div>
      </section>

      <Marquee className="border-b border-border bg-cream py-5 text-wine" items={["Twelve-hour colour", "Cruelty-free", "Refillable gold cases", "Delivered across India", "Rosehip & camellia oil"]} />

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal className="eyebrow text-muted-foreground">01 — Most loved</p>
            <h2 data-split className="mt-4 font-display text-5xl md:text-7xl"><SplitText text="The Bestsellers" /></h2>
          </div>
          <Link data-reveal to="/shop" className="eyebrow link-underline self-start md:self-auto">View all products</Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">{products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      {/* CAMPAIGN */}
      <section className="relative overflow-hidden bg-blush py-24 md:py-32">
        <p aria-hidden data-speed="0.6" className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[28vw] italic leading-none text-wine/[0.06] md:text-[18rem]">Rouge</p>
        <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 md:grid-cols-[1fr_1fr] md:gap-20 md:px-10">
          <div className="relative">
            <div data-mask className="overflow-hidden"><img src={images.muse} alt="VÉLISSE muse wearing Rouge Absolu" loading="lazy" className="aspect-[3/4] w-full object-cover" /></div>
            <span className="absolute -bottom-4 -right-4 hidden h-full w-full border border-wine/25 md:block" style={{ zIndex: -1 }} />
          </div>
          <div data-reveal>
            <p className="eyebrow text-muted-foreground">02 — The Campaign</p>
            <h2 className="mt-5 font-display text-5xl italic leading-[1] text-wine md:text-7xl">A red that remembers you.</h2>
            <div className="hairline my-8 w-24 text-wine" />
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">Shot in candlelight among a thousand roses, our muse wears Bordeaux Night: a deep wine red made to flatter every Indian skin tone, from fair to deep.</p>
            <Link to="/product/$id" params={{ id: "rouge-absolu-satin" }} className="eyebrow link-underline mt-10 inline-block">Discover Rouge Absolu</Link>
          </div>
        </div>
      </section>

      <ShadeStudio />

      {/* TEXTURES */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <p data-reveal className="eyebrow text-muted-foreground">04 — Textures</p>
        <h2 data-split className="mt-4 max-w-3xl font-display text-5xl md:text-7xl"><SplitText text="Satin, velvet and glass." /></h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <figure className="group md:col-span-2">
            <div data-mask className="sheen h-full overflow-hidden"><img src={images.lineup} alt="Five VÉLISSE shades" loading="lazy" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" /></div>
            <figcaption className="mt-4 flex justify-between text-sm text-muted-foreground"><span className="font-display text-xl italic text-foreground">Velours Nude</span> Soft matte · five nudes to plum</figcaption>
          </figure>
          <figure className="group" data-speed="0.8">
            <div className="sheen overflow-hidden"><img src={images.swatch} alt="Lipstick textures" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" /></div>
            <figcaption className="mt-4 flex justify-between text-sm text-muted-foreground"><span className="font-display text-xl italic text-foreground">Soie Lumière</span> Mirror shine</figcaption>
          </figure>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="grain relative overflow-hidden bg-wine-deep py-24 text-on-wine md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:px-10">
          <div data-reveal className="order-2 md:order-1">
            <p className="eyebrow text-gold">05 — The Gift</p>
            <h2 className="mt-5 font-display text-5xl leading-[1] md:text-7xl">The Lip <em className="text-gold-gradient">Wardrobe</em></h2>
            <p className="mt-6 max-w-md text-on-wine/70">Three full-size icons in a keepsake case: a nude for the office, a gloss for the sangeet, a red for the evening after.</p>
            <ul className="mt-8 grid max-w-md grid-cols-3 border-y border-on-wine/15 py-5 text-center">
              {[["03", "Full sizes"], ["15%", "Saved"], ["01", "Keepsake case"]].map(([n, l]) => (
                <li key={l}><p className="numeral text-3xl text-gold">{n}</p><p className="mt-1 text-xs text-on-wine/60">{l}</p></li>
              ))}
            </ul>
            <Link to="/product/$id" params={{ id: "atelier-trio-set" }} className="sheen eyebrow mt-10 inline-block rounded-full bg-gold px-9 py-4 text-wine-deep">Shop the set · {formatPrice(getProduct("atelier-trio-set")!.price)}</Link>
          </div>
          <div data-mask className="order-1 overflow-hidden md:order-2"><img src={images.gloss} alt="Soie Lumière gloss in silk" loading="lazy" className="aspect-[5/4] w-full object-cover" /></div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1100px] px-5 py-24 text-center md:py-36">
        <p data-reveal className="eyebrow text-muted-foreground">06 — Our Story</p>
        <p data-reveal className="mt-8 font-display text-3xl leading-[1.25] md:text-5xl">
          “VÉLISSE began with a single shade of wine red and one belief: colour should feel <em className="text-wine">cushioned, luminous and lasting</em>, in Mumbai's monsoon or a Delhi winter.”
        </p>
        <div data-reveal className="mt-10 flex justify-center gap-8">
          <Link to="/story" className="eyebrow link-underline">Read our story</Link>
          <Link to="/ingredients" className="eyebrow link-underline">Our ingredients</Link>
        </div>
      </section>

      {/* SERVICE */}
      <section className="border-y border-border bg-card">
        <ul className="mx-auto grid max-w-[1500px] grid-cols-2 md:grid-cols-4">
          {[
            [Truck, "Free shipping", `Across India above ${formatPrice(FREE_SHIPPING_MIN)}`],
            [ShieldCheck, "Secure payments", "UPI, cards, net banking & COD"],
            [RotateCcw, "Easy returns", "Within 15 days of delivery"],
            [Leaf, "Cruelty-free", "Vegan pigments, refillable cases"],
          ].map(([Icon, t, d], i) => {
            const I = Icon as typeof Truck;
            return (
              <li key={t as string} data-reveal className={`flex flex-col items-center gap-3 px-4 py-10 text-center ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
                <I className="h-5 w-5 text-wine" strokeWidth={1.25} />
                <p className="font-display text-xl">{t as string}</p>
                <p className="text-xs text-muted-foreground">{d as string}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* NEWSLETTER */}
      <section className="grain relative overflow-hidden bg-wine-deep py-24 text-on-wine md:py-32">
        <div className="glow-gold absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
          <p data-reveal className="eyebrow text-gold">The VÉLISSE Letter</p>
          <h2 data-split className="mt-5 font-display text-5xl md:text-7xl"><SplitText text="Be first to every shade" /></h2>
          <p data-reveal className="mt-5 text-on-wine/70">10% off your first order, plus private previews and early access to limited editions.</p>
          <div className="mt-10 w-full max-w-lg"><NewsletterForm /></div>
        </div>
      </section>
    </div>
  );
}

const studio = products.filter((p) => p.category === "Lipstick").flatMap((p) => p.shades.map((s) => ({ ...s, p })));

function ShadeStudio() {
  const [i, setI] = useState(0);
  const cur = studio[i]!;
  const { add } = useStore();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <motion.div className="absolute inset-0 opacity-[0.08]" animate={{ backgroundColor: cur.color }} transition={{ duration: 0.8 }} />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:px-10">
        <div>
          <p data-reveal className="eyebrow text-muted-foreground">03 — The Shade Studio</p>
          <h2 data-split className="mt-4 font-display text-5xl md:text-7xl"><SplitText text="Find your shade." /></h2>
          <div className="mt-10 flex flex-wrap gap-3" role="radiogroup" aria-label="Lipstick shades">
            {studio.map((s, k) => (
              <button
                key={s.p.id + s.name}
                role="radio"
                aria-checked={k === i}
                aria-label={s.name}
                title={s.name}
                onClick={() => setI(k)}
                className="relative grid h-12 w-12 place-items-center rounded-full"
              >
                {k === i && <motion.span layoutId="shade-ring" className="absolute inset-0 rounded-full border border-wine" transition={{ type: "spring", stiffness: 300, damping: 26 }} />}
                <span className="h-9 w-9 rounded-full shadow-inner transition-transform hover:scale-110" style={{ backgroundColor: s.color }} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={cur.p.id + cur.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }} className="mt-10">
              <p className="font-display text-4xl italic" style={{ color: cur.color }}>{cur.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{cur.p.name} · {cur.p.subtitle} · {formatPrice(cur.p.price)}</p>
              <div className="mt-8 flex flex-wrap gap-5">
                <button
                  onClick={() => { add(cur.p, cur.name); toast.success("Added to bag", { description: `${cur.p.name} · ${cur.name}` }); }}
                  className="sheen eyebrow bg-wine-deep px-8 py-4 text-on-wine transition hover:bg-wine"
                >Add to bag</button>
                <Link to="/product/$id" params={{ id: cur.p.id }} className="eyebrow link-underline self-center">View details</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div data-mask className="relative overflow-hidden">
          <img src={images.swatch} alt="Lipstick swatches" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <motion.div className="absolute inset-0 mix-blend-multiply" animate={{ backgroundColor: cur.color, opacity: 0.35 }} transition={{ duration: 0.8 }} />
        </div>
      </div>
    </section>
  );
}
