import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function useGsap(scope: RefObject<HTMLElement | null>, fn: (g: typeof gsap) => void, deps: unknown[] = []) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => fn(gsap), scope.current ?? undefined);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Standard scroll reveals: [data-reveal] fades up, [data-mask] unclips, [data-split] staggers .char */
export function standardReveals(g: typeof gsap) {
  g.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    g.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  g.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
    const img = el.querySelector("img");
    const tl = g.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
    if (img) tl.from(img, { scale: 1.35, duration: 1.8, ease: "expo.out" }, 0);
  });
  g.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    g.from(el.querySelectorAll(".char"), {
      yPercent: 110,
      duration: 1,
      ease: "expo.out",
      stagger: 0.025,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
  g.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
    const s = parseFloat(el.dataset["speed"] || "0");
    g.to(el, { yPercent: s * -30, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
  });
}
