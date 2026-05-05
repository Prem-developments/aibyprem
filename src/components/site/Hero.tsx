import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const headline = "AI Automation & Marketing Ops Systems That Actually Ship";

const trustBadges = ["n8n • Make • Zapier", "Voice Agents (Retell AI)", "Lead Gen + CRM Pipelines"];

export function Hero() {
  const words = headline.split(" ");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade" />
      <div className="absolute inset-0 -z-10 radial-spotlight" />

      {/* Floating orbs — slightly off-center for organic feel */}
      <div
        className="pointer-events-none absolute left-[8%] top-[18%] -z-10 h-80 w-80 rounded-full bg-white/[0.07] blur-3xl animate-float-orb"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="pointer-events-none absolute right-[6%] bottom-[18%] -z-10 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-3xl animate-float-orb"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="pointer-events-none absolute left-[42%] bottom-[8%] -z-10 h-56 w-56 rounded-full bg-[rgba(0,240,255,0.07)] blur-3xl animate-float-orb"
        style={{ animationDelay: "-7s" }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
        >
          <Sparkles size={12} className="text-[#00f0ff]" />
          AI Automation Specialist
        </motion.div>

        <h1 className="font-display text-[44px] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[70px]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.26em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-7 max-w-xl text-base text-white/58 sm:text-lg leading-[1.75]"
        >
          AI Automation Specialist building workflow automations, AI-powered lead gen, voice agents,
          and CRM integrations (GHL, Supabase, Google Sheets) using n8n, APIs, and webhooks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#case-studies"
            className="hover:animate-glow-pulse group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_44px_rgba(255,255,255,0.5)] active:scale-[0.97]"
          >
            See My Work
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:border-white/60 hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
          >
            Book a Call
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.18em] text-white/40"
        >
          {trustBadges.map((b, i) => (
            <div key={b} className="flex items-center gap-3">
              {i > 0 && <span className="hidden h-px w-6 bg-white/15 sm:block" />}
              <span className="hover:text-white/70 transition-colors cursor-default">{b}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
