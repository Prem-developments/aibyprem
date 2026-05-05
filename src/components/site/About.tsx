import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";

const valueProps = [
  "Workflow automation with n8n, Make, Zapier, and GoHighLevel",
  "AI voice agents + calling workflows using Retell AI (and APIs)",
  "Lead gen + outreach pipelines with enrichment, sequencing, and CRM sync",
];

export function About() {
  return (
    <section id="about" className="relative py-14 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* Image / visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-[520px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/12 bg-white/[0.02] shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-0 bg-grid bg-grid-fade opacity-25" />
              <img
                src="/premchand.jpg"
                alt="Premchand"
                className="relative h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute -inset-px rounded-3xl shadow-[inset_0_0_60px_rgba(255,255,255,0.04)]" />
            </div>
            {/* Ambient glow */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-white/[0.03] blur-3xl" />
            {/* Small floating accent */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hidden lg:block" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55">
              <span className="h-1 w-1 rounded-full bg-[#00f0ff]" />
              About
            </div>

            <h2 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.2rem]">
              Hi, I&apos;m Premchand. <br />
              AI Automation Specialist
            </h2>

            <p className="mt-5 text-[0.95rem] leading-[1.8] text-white/55">
              I build and deploy automation workflows, AI-powered pipelines, and CRM integrations
              for business operations from lead generation and cold outreach to voice agents and
              real-time pipeline tracking.
            </p>
            <p className="mt-4 text-[0.95rem] leading-[1.8] text-white/45">
              Recent work includes AI voice agents with Retell AI, n8n-based automations, Supabase
              CRM builds, and dashboards/reporting with Google Sheets and Slack notifications.
            </p>

            <ul className="mt-8 space-y-3.5">
              {valueProps.map((v) => (
                <li key={v} className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] transition-all duration-200 group-hover:border-white/40 group-hover:bg-white/[0.1]">
                    <Check size={11} strokeWidth={2.5} className="text-white/70" />
                  </span>
                  <span className="text-sm leading-[1.65] text-white/65 group-hover:text-white/85 transition-colors duration-200">
                    {v}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_36px_rgba(255,255,255,0.4)] active:scale-[0.97]"
              >
                Work With Me
              </a>
              <a
                href="/Premchand_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/75 transition-all duration-300 hover:border-white/45 hover:text-white active:scale-[0.97]"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
