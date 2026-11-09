import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Send } from "lucide-react";
import { SectionHeading } from "./reveal";

const STEPS = [
  {
    title: "Discover",
    Icon: Search,
    text: "Understanding the client's vision, audience, goals, and requirements.",
  },
  {
    title: "Conceptualize",
    Icon: Lightbulb,
    text: "Developing creative directions, visual concepts, and strategic ideas.",
  },
  {
    title: "Create",
    Icon: PenTool,
    text: "Transforming concepts into polished designs, videos, or digital experiences.",
  },
  {
    title: "Deliver",
    Icon: Send,
    text: "Providing refined, professional creative solutions aligned with the client's goals.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Creative process" title="From Concept to Creation." align="center" />

        <div className="relative mt-20">
          {/* connecting line (desktop) */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block" />
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-burgundy via-taupe to-champagne lg:block"
          />

          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map(({ title, Icon, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.15 }}
                className="group relative"
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-background text-champagne transition-colors duration-500 group-hover:border-champagne group-hover:bg-burgundy">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="mt-8 font-display text-6xl text-foreground/10 transition-colors duration-500 group-hover:text-burgundy">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="-mt-6 text-3xl text-foreground">{title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-muted-foreground">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
