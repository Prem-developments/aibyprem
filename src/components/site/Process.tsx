import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "Discovery Call",
    desc: "We dig into your operations, identify the highest-leverage workflows, and define success metrics together.",
  },
  {
    n: "02",
    title: "Custom Strategy",
    desc: "I design a tailored automation blueprint tools, integrations, and a phased rollout that minimizes disruption.",
  },
  {
    n: "03",
    title: "Build & Test",
    desc: "Rapid implementation in 48–72 hours, followed by rigorous testing against real-world data and edge cases.",
  },
  {
    n: "04",
    title: "Launch & Support",
    desc: "Go live with confidence. Includes documentation, team training, and 30 days of priority support.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-10 lg:py-8">
      <div className="absolute inset-0 -z-10 radial-spotlight opacity-50" />
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Process"
          title={<>From Idea to Automation <span className="text-white/40">in 4 Steps</span></>}
          description="A focused, transparent build process designed to ship value within the first week."
        />

        <div ref={ref} className="relative mt-16">
          {/* Track */}
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-white/[0.08] md:left-[36px]" />
          {/* Animated draw line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[27px] top-3 w-px bg-gradient-to-b from-white/90 via-white/50 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)] md:left-[36px]"
          />

          <ul className="space-y-12 lg:space-y-16">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative flex gap-7 md:gap-12"
              >
                {/* Step circle */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/18 bg-[#0a0a0a] font-display text-sm font-semibold text-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/40 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] md:h-[72px] md:w-[72px] md:text-base">
                  {s.n}
                </div>

                {/* Content */}
                <div className="pt-2.5 md:pt-4">
                  <h3 className="font-display text-2xl font-semibold text-white md:text-[1.75rem] group-hover:text-glow-soft transition-all duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[0.93rem] leading-[1.75] text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
