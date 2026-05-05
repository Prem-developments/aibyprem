import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string; note?: string };

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Automations Deployed", note: "and counting" },
  { value: 200, suffix: "+", label: "Hours Saved Monthly", note: "per client avg." },
  { value: 10, suffix: "x", label: "Average ROI", note: "delivered to clients" },
  { value: 48, suffix: "hrs", label: "Average Delivery", note: "from kickoff to live" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, mv, rounded]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tabular-nums text-white sm:text-6xl">
      {val}
      <span className="text-white/50">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-16 lg:py-12">
      <div className="absolute inset-0 -z-10 radial-spotlight" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col items-center justify-center gap-2 bg-[#060606] px-5 py-12 text-center transition-all duration-350 hover:bg-[#0c0c0c] hover:shadow-[inset_0_0_50px_rgba(255,255,255,0.04)]"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <p className="text-xs uppercase tracking-[0.18em] text-white/50 group-hover:text-white/70 transition-colors duration-300">
                {s.label}
              </p>
              {s.note && (
                <p className="text-[10px] text-white/25 group-hover:text-white/40 transition-colors duration-300">
                  {s.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
