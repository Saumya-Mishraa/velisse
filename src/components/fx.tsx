import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/** Splits text into animated characters (GSAP targets `.char`). */
export function SplitText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          {word.split("").map((c, i) => (
            <span key={i} className="char inline-block will-change-transform">
              {c}
            </span>
          ))}
          {"\u00a0"}
        </span>
      ))}
    </span>
  );
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a,button,input,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold mix-blend-difference"
        style={{ x: sx, y: sy }}
        animate={{ width: hover ? 64 : 32, height: hover ? 64 : 32, opacity: hover ? 0.9 : 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}

export function Loader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (sessionStorage.getItem("velisse-loaded")) {
      setShow(false);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1900);
      setPct(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("velisse-loaded", "1");
    }, 2300);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);
  const ease = [0.76, 0, 0.24, 1] as const;
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[90] text-on-wine" exit={{ opacity: 1 }} transition={{ duration: 1.1 }}>
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-wine-deep" exit={{ y: "-100%" }} transition={{ duration: 1, ease }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-wine-deep" exit={{ y: "100%" }} transition={{ duration: 1, ease }} />
          <motion.div className="relative flex h-full flex-col items-center justify-center" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5 }}>
            <div className="glow-gold absolute h-[60vmin] w-[60vmin] rounded-full" />
            <div className="relative flex overflow-hidden font-display text-5xl tracking-[0.3em] md:text-7xl" aria-label="VÉLISSE">
              {"VÉLISSE".split("").map((c, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <div className="relative mt-7 h-px w-48 overflow-hidden bg-on-wine/15">
              <div className="h-px bg-gold" style={{ width: `${pct}%` }} />
            </div>
            <div className="relative mt-5 flex w-48 justify-between">
              <motion.p className="eyebrow text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                Beauty, Beyond the Ordinary
              </motion.p>
            </div>
            <span className="numeral absolute bottom-8 right-8 text-2xl text-on-wine/50 md:text-3xl">{pct}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Infinite editorial ticker. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-flex">
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8 font-display text-2xl italic md:text-3xl">{t}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Particles({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; d: number; s: number; delay: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        d: 10 + Math.random() * 14,
        s: 2 + Math.random() * 4,
        delay: Math.random() * -20,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${p.l}%`,
            width: p.s,
            height: p.s,
            animation: `float-up ${p.d}s linear ${p.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

/** Page transition wrapper. */
export function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
