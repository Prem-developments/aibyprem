import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const row1 = [
  "n8n",
  "Make.com",
  "Zapier",
  "GoHighLevel",
  "Retell AI",
  "ChatGPT",
  "Claude",
  "Gemini",
];
const row2 = [
  "OpenAI API",
  "Anthropic API",
  "Webhooks",
  "Supabase",
  "Google Sheets",
  "HubSpot",
  "SerpAPI",
  "Apollo.io",
];

function Pill({ name }: { name: string }) {
  return (
    <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.03] px-6 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white">
      {name}
    </span>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-3 w-max ${reverse ? "marquee-reverse" : "marquee"}`}>
        {doubled.map((x, i) => (
          <Pill key={`${x}-${i}`} name={x} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

export function TechStack() {
  return (
    <section className="relative py-14 lg:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Stack"
          title={
            <>
              Tools & Platforms <span className="text-white/40">I Master</span>
            </>
          }
          align="center"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 flex flex-col gap-4"
      >
        <Marquee items={row1} />
        <Marquee items={row2} reverse />
      </motion.div>
    </section>
  );
}
