import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const cases = [
  {
    category: "Lead Gen",
    title: "AI Lead Generation & CRM Pipeline",
    industry: "Outbound / Sales Ops",
    metric: "50–100",
    metricLabel: "leads in <30 minutes",
    desc: "Automated the full lead-gen cycle: Google Maps scraping, AI enrichment, email discovery, and personalized outreach with CRM stage tracking.",
  },
  {
    category: "Voice Agents",
    title: "AI Voice Call Center Pipeline",
    industry: "Inbound + Outbound Calling",
    metric: "3",
    metricLabel: "post-call AI agents",
    desc: "Built a voice agent system with multi-event webhook routing, post-call transcript analysis, lead scoring, and automated follow-ups (hot/warm/cold).",
  },
  {
    category: "Finance",
    title: "Financial Intelligence System",
    industry: "n8n + Airtable",
    metric: "2",
    metricLabel: "connected workflows",
    desc: "Built an end-to-end monthly data intake pipeline: normalize transactions, categorize with AI, store + summarize in Airtable, run behavior analysis, generate an Excel report, and deliver via Gmail plus an AI chat assistant that fetches the latest summary and answers questions with memory.",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-14 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Case Studies"
          title={
            <>
              Results <span className="text-white/40">I've Delivered</span>
            </>
          }
          description="A snapshot of systems I've built across automation, voice agents, and CRM pipelines."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="sweep-border group relative flex flex-col rounded-2xl border border-white/[0.09] bg-[#080808] px-7 pt-7 pb-8 transition-all duration-350 hover:border-white/22 hover:bg-[#0d0d0d] hover:shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              {/* Header row */}
              <div className="mb-7 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/55 group-hover:border-white/25 transition-colors duration-300">
                  {c.category}
                </span>
                <span className="text-[11px] text-white/35">{c.industry}</span>
              </div>

              {/* Metric */}
              <div className="font-display text-[3.2rem] font-bold leading-none text-white text-glow-soft group-hover:text-glow transition-all duration-500">
                {c.metric}
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/40">
                {c.metricLabel}
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-white/[0.07] group-hover:bg-white/[0.12] transition-colors duration-300" />

              <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-white">
                {c.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-[1.72] text-white/50 group-hover:text-white/65 transition-colors duration-300">
                {c.desc}
              </p>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-1.5 self-start text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition-all duration-200 hover:text-white hover:gap-2"
              >
                View Case Study
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
