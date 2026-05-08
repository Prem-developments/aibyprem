import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { TechStack } from "@/components/site/TechStack";
import { Stats } from "@/components/site/Stats";
import { CaseStudies } from "@/components/site/CaseStudies";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "aibyprem — AI Automation Specialist | Save 20+ Hours / Week" },
      {
        name: "description",
        content:
          "AI Automation Specialist building intelligent workflows, AI agents, and no-code systems that save businesses 20+ hours per week. 50+ automations shipped, 10x average ROI.",
      },
      { property: "og:title", content: "aibyprem — AI Automation Specialist" },
      {
        property: "og:description",
        content:
          "Premium AI automation, CRM systems, and lead-gen engines for modern businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <main className="themed relative bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <TechStack />
        <Stats />
        <CaseStudies />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
