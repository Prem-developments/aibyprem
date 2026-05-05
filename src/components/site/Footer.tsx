import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative pt-8 pb-1">
      <div className="absolute inset-x-0 top-0 h-px gradient-sweep-line" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a
            href="#top"
            className="font-display text-2xl font-bold text-white hover:text-glow transition-all"
          >
            aibyprem<span className="text-white/40">.</span>
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/50">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/prem-chand-8ab94a3b0",
                label: "LinkedIn",
                external: true,
              },
              {
                icon: Mail,
                href: "mailto:premchandmalhi969@gmail.com",
                label: "Email",
              },
              {
                icon: MessageCircle,
                href: "https://wa.me/923312603103",
                label: "WhatsApp",
                external: true,
              },
              {
                icon: Github,
                href: "https://github.com/Prem-developments",
                label: "GitHub",
                external: true,
              },
            ].map(({ icon: Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/55 transition-all duration-250 hover:border-white/35 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.12)] active:scale-95"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className=" border-t border-white/[0.06] pt-3 text-center text-[11px] text-white/30">
          © {new Date().getFullYear()} aibyprem. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
