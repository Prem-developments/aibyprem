import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EMAIL_TO = "premchandmalhi969@gmail.com";
const EMAIL_TO_NAME = "Prem Chand";

const SERVICES = ["AI Automation", "CRM Setup", "Chatbot", "Other"];

function formatEmailJsError(err: unknown) {
  const origin =
    typeof window !== "undefined" && window.location && window.location.origin
      ? window.location.origin
      : "(unknown origin)";

  if (err instanceof Error) {
    const message = err.message || "Unknown error";
    const hint = /not configured/i.test(message)
      ? "Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your deployment environment and redeploy."
      : /origin|forbidden|unauthorized|403/i.test(message)
        ? `If this works on localhost but not on ${origin}, add ${origin} to EmailJS \"Allowed origins\" (and redeploy if needed).`
        : "";
    return hint ? `${message}\n${hint}` : message;
  }

  if (typeof err === "object" && err) {
    const anyErr = err as { status?: unknown; text?: unknown; message?: unknown };
    const status = typeof anyErr.status === "number" ? anyErr.status : undefined;
    const text = typeof anyErr.text === "string" ? anyErr.text : undefined;
    const message = typeof anyErr.message === "string" ? anyErr.message : undefined;
    const base = [status != null ? String(status) : undefined, text || message]
      .filter(Boolean)
      .join(": ");
    const combined = base || "Unknown error";
    const hint = /origin|forbidden|unauthorized|403/i.test(combined)
      ? `If this works on localhost but not on ${origin}, add ${origin} to EmailJS \"Allowed origins\".`
      : "";
    return hint ? `${combined}\n${hint}` : combined;
  }

  return String(err);
}

async function sendEmail(params: {
  name: string;
  email: string;
  service: string;
  message: string;
  source: string;
}) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.",
    );
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_name: EMAIL_TO_NAME,
      to_email: EMAIL_TO,
      from_name: params.name,
      name: params.name,
      email: params.email,
      reply_to: params.email,
      message: params.message,
      service: params.service,
      source: params.source,
    },
    { publicKey },
  );
}

/* ── Custom Dropdown ──────────────────────────────────────────── */
function ServiceDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm outline-none transition-all duration-200 ${
          open
            ? "border-white/40 bg-white/[0.06]"
            : "border-white/15 bg-white/[0.03] hover:border-white/30"
        }`}
      >
        <span className={value ? "text-white" : "text-white/35"}>
          {value || "Select a service…"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-white/50"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {SERVICES.map((svc) => {
              const selected = svc === value;
              return (
                <li key={svc}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(svc);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors duration-150 ${
                      selected
                        ? "bg-white/[0.08] text-white"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {svc}
                    {selected && <Check size={14} className="text-[#00f0ff]" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Contact Section ──────────────────────────────────────────── */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [callOpen, setCallOpen] = useState(false);
  const [callSubmitted, setCallSubmitted] = useState(false);
  const [callService, setCallService] = useState("");
  const [sending, setSending] = useState(false);
  const [callSending, setCallSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [callSubmitError, setCallSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, source: string) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const selectedService = String(formData.get("service") || "");
    const message = String(formData.get("message") || "");

    await sendEmail({
      name,
      email,
      service: selectedService,
      message,
      source,
    });
  };

  return (
    <section id="contact" className="relative py-14">
      <div className="absolute inset-0 -z-10 radial-spotlight" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#00f0ff]" />
            Contact
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            Ready to Automate <br className="hidden sm:block" />
            Your Business?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] text-white/55 leading-[1.8]">
            Tell me about your operations and the workflows eating your team's time. I'll respond
            within 24 hours with a tailored plan.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={(e) => {
            if (sending || submitted) return;
            setSending(true);
            setSubmitError(null);
            void handleSubmit(e, "New Website Inquiry")
              .then(() => {
                setSubmitted(true);
              })
              .catch((err) => {
                console.error(err);
                setSubmitError(formatEmailJsError(err));
              })
              .finally(() => {
                setSending(false);
              });
          }}
          className="mt-10 grid gap-5 text-left"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
              What do you need?
            </label>
            <ServiceDropdown value={service} onChange={setService} />
            {/* hidden input so form validation works */}
            <input type="hidden" name="service" value={service} required />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-4 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-white/35 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
              placeholder="Tell me what's eating your team's time…"
            />
          </div>

          <button
            type="submit"
            disabled={sending || submitted}
            className="hover:animate-glow-pulse mt-1 inline-flex h-13 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_44px_rgba(255,255,255,0.45)] active:scale-[0.98] disabled:opacity-60"
          >
            {submitted
              ? "✓ Thanks — I'll be in touch soon."
              : sending
                ? "Sending…"
                : "Send Message"}
          </button>

          {submitError && (
            <p className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white/70 whitespace-pre-line">
              {submitError}
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8 text-sm text-white/50"
        >
          <a
            href={`mailto:${EMAIL_TO}`}
            className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
          >
            <Mail size={15} className="shrink-0" />
            <span className="underline-offset-4 group-hover:underline">{EMAIL_TO}</span>
          </a>
          <span className="hidden h-4 w-px bg-white/12 sm:block" />
          <Dialog
            open={callOpen}
            onOpenChange={(open) => {
              setCallOpen(open);
              if (!open) {
                setCallSubmitted(false);
                setCallService("");
                setCallSending(false);
                setCallSubmitError(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
              >
                <Calendar size={15} className="shrink-0" />
                <span className="underline-offset-4 group-hover:underline">
                  Book a Free 30-min Call
                </span>
              </button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl border-white/15 bg-[#0d0d0d] text-white shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Book a Free 30-min Call</DialogTitle>
                <DialogDescription className="text-white/55">
                  Share a bit of context and I&apos;ll reach out to schedule.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  if (callSending || callSubmitted) return;
                  setCallSending(true);
                  setCallSubmitError(null);
                  void handleSubmit(e, "Free 30-min Call Request")
                    .then(() => {
                      setCallSubmitted(true);
                    })
                    .catch((err) => {
                      console.error(err);
                      setCallSubmitError(formatEmailJsError(err));
                    })
                    .finally(() => {
                      setCallSending(false);
                    });
                }}
                className="grid gap-5 text-left"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                    What do you need?
                  </label>
                  <ServiceDropdown value={callService} onChange={setCallService} />
                  <input type="hidden" name="service" value={callService} required />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-4 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-white/35 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
                    placeholder="Tell me what you want to automate and your timeline…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={callSending || callSubmitted}
                  className="hover:animate-glow-pulse mt-1 inline-flex h-13 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_44px_rgba(255,255,255,0.45)] active:scale-[0.98] disabled:opacity-60"
                >
                  {callSubmitted
                    ? "✓ Thanks — I'll reach out to schedule."
                    : callSending
                      ? "Sending…"
                      : "Request a Call"}
                </button>

                {callSubmitError && (
                  <p className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white/70 whitespace-pre-line">
                    {callSubmitError}
                  </p>
                )}
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-white/35 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
      />
    </div>
  );
}
