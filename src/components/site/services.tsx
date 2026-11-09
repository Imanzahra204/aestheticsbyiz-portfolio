import {
  Palette,
  Gem,
  Shapes,
  WandSparkles,
  Clapperboard,
  Code2,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const SERVICES = [
  {
    title: "Graphic Design",
    Icon: Palette,
    text: "Creative and visually compelling designs that communicate brand messages effectively.",
    includes: [
      "Social media graphics",
      "Promotional designs",
      "YouTube thumbnails",
      "Marketing materials",
      "Print-ready designs",
      "Restaurant menus",
    ],
  },
  {
    title: "Brand Identity Development",
    Icon: Gem,
    text: "Creating cohesive and memorable visual identities that help brands establish recognition.",
    includes: [
      "Brand identity systems",
      "Logo concepts and visual direction",
      "Brand assets",
      "Typography and color systems",
      "Social media branding",
    ],
  },
  {
    title: "Logo Animation",
    Icon: Shapes,
    text: "Transforming static logos into dynamic visual experiences through creative motion.",
    includes: [],
  },
  {
    title: "AI Video Creation",
    Icon: WandSparkles,
    text: "Producing innovative AI-powered video content, promotional visuals, and creative storytelling experiences.",
    includes: [],
  },
  {
    title: "Video Editing",
    Icon: Clapperboard,
    text: "Professional video editing for creators, businesses, and brands.",
    includes: [
      "Short-form reels",
      "Social media videos",
      "Promotional videos",
      "Long-form video editing",
      "Visual storytelling",
    ],
  },
  {
    title: "Web Development",
    Icon: Code2,
    text: "Building modern, responsive, and user-friendly digital experiences with a focus on aesthetics and functionality.",
    includes: [],
  },
  {
    title: "Social Media Management",
    Icon: Megaphone,
    text: "Helping businesses maintain a consistent and engaging online presence.",
    includes: [
      "Content creation",
      "Social media visuals",
      "Content planning",
      "Brand consistency",
      "Digital presence management",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Services" title="What I Bring to Your Brand." />
          <Reveal className="max-w-sm text-muted-foreground">
            Seven ways to bring your brand to life — pick one, or combine them into a complete
            creative package.
          </Reveal>
        </div>

        <ul className="mt-14 border-t">
          {SERVICES.map(({ title, Icon, text, includes }, i) => (
            <Reveal key={title} delay={0.03 * i}>
              <li className="group relative grid gap-5 overflow-hidden border-b py-8 transition-colors duration-500 sm:px-6 md:grid-cols-[5rem_1.1fr_1.4fr_auto] md:items-start md:gap-8 md:py-10">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-burgundy transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="relative font-display text-3xl text-taupe transition-colors group-hover:text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-center gap-4">
                  <Icon className="h-6 w-6 shrink-0 text-champagne" strokeWidth={1.5} />
                  <h3 className="text-2xl leading-tight text-foreground sm:text-3xl">{title}</h3>
                </div>
                <div className="relative">
                  <p className="leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
                    {text}
                  </p>
                  {includes.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {includes.map((inc) => (
                        <li
                          key={inc}
                          className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/80"
                        >
                          {inc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <a
                  href="#contact"
                  aria-label={`Enquire about ${title}`}
                  className="relative hidden h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all group-hover:rotate-45 group-hover:border-champagne group-hover:bg-champagne group-hover:text-champagne-foreground md:flex"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
