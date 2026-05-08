import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Workflow,
  Users,
  Magnet,
  Bot,
  Database,
  Plug,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useRef } from "react";

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    desc: "End-to-end automated workflows that connect your tools and run 24/7 without manual intervention.",
  },
  {
    icon: Users,
    title: "CRM & Sales Automation",
    desc: "Pipeline automation, deal scoring, and AI-powered follow-ups that close deals while you sleep.",
  },
  {
    icon: Magnet,
    title: "Lead Generation Systems",
    desc: "Multi-channel scraping, enrichment, and outreach engines that fill your calendar with qualified leads.",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    desc: "Custom GPT-powered assistants for support, sales, and internal ops trained on your data.",
  },
  {
    icon: Database,
    title: "Data Scraping & Enrichment",
    desc: "Industrial-grade scrapers and enrichment pipelines with clean, structured data ready to use.",
  },
  {
    icon: Plug,
    title: "Custom API Integrations",
    desc: "Bridge any two tools even ones without native integrations with bespoke middleware.",
  },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 22 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-10 lg:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Services"
          title={<>What I Build <span className="text-white/40">For You</span></>}
          description="Six core service lines, designed to compound your team's output without hiring."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <TiltCard key={s.title} index={i}>
              <div className="sweep-border group relative h-full rounded-2xl border border-white/[0.09] bg-[#080808] p-6 lg:p-8 transition-all duration-400 hover:border-white/25 hover:bg-[#0d0d0d] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.07)]">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <s.icon size={20} strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-white/50 group-hover:text-white/65 transition-colors duration-300">
                  {s.desc}
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/55 transition-all duration-200 hover:text-white hover:gap-2"
                >
                  Learn More
                  <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
