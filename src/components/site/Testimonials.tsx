import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    quote:
      "Working with Prem was a game-changer for our operations. He automated our entire client onboarding flow and we reclaimed 40+ hours a week within the first month. Genuinely one of the best investments we've made.",
    name: "Marcus Ellison",
  },
  {
    quote:
      "The AI lead generation system Prem built paid for itself in 11 days flat. Fast turnaround, clean code, zero hand-holding needed. He just gets it and delivers.",
    name: "Sophia Raines",
  },
  {
    quote:
      "Senior-level thinking with freelancer speed. He shipped in 4 days what an agency quoted us 6 weeks for and the quality was better. Will absolutely work with him again.",
    name: "Daniel Mwangi",
  },
  {
    quote:
      "Prem built our CRM automation from scratch and it just works perfectly. Every edge case handled, docs included, and he was responsive throughout. Highly recommend.",
    name: "Priya Nair",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-14 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What Clients <span className="text-white/40">Say</span>
            </>
          }
          align="center"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-2xl border border-white/[0.09] bg-[#080808] p-6 lg:p-7 transition-all duration-350 hover:border-white/20 hover:bg-[#0e0e0e] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              {/* Quote icon */}
              <Quote
                size={22}
                className="mb-4 text-white/15 group-hover:text-white/25 transition-colors duration-300"
                fill="currentColor"
                strokeWidth={0}
              />

              {/* Stars */}
              <div className="mb-4 flex gap-1 text-white/80">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="flex-1 text-[0.92rem] leading-[1.75] text-white/65 group-hover:text-white/80 transition-colors duration-300">
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                {/* Avatar initials */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xs font-semibold text-white/70 group-hover:border-white/30 transition-colors duration-300">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/40">
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
