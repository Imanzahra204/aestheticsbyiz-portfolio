import {
  Palette,
  ImagePlay,
  Shapes,
  WandSparkles,
  Clapperboard,
  Code2,
  Megaphone,
  Gem,
  Check,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const SKILLS = [
  { name: "Graphic Design", Icon: Palette },
  { name: "Thumbnail Design", Icon: ImagePlay },
  { name: "Logo Animation", Icon: Shapes },
  { name: "AI Video Creation", Icon: WandSparkles },
  { name: "Video Editing", Icon: Clapperboard },
  { name: "Web Development", Icon: Code2 },
  { name: "Social Media Management", Icon: Megaphone },
  { name: "Brand Identity Development", Icon: Gem },
];

const CAPABILITIES = [
  "Visual communication and storytelling",
  "Brand identity and visual systems",
  "Social media content design",
  "Short-form and long-form video production",
  "Promotional and marketing creatives",
  "AI-powered visual storytelling",
  "Digital content strategy",
  "Modern website development",
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      {/* marquee */}
      <div aria-hidden className="mb-20 flex overflow-hidden border-y py-5">
        <div className="flex shrink-0 animate-marquee gap-10 whitespace-nowrap pr-10">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-3xl italic text-foreground/70 sm:text-4xl">
              {s.name}
              <span className="text-2xl not-italic text-burgundy">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills & expertise"
          title="My Creative Toolkit."
          intro="A multidisciplinary practice — design, motion, AI and code working together."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map(({ name, Icon }, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border bg-background p-6 transition-all duration-500 hover:-translate-y-1 hover:border-taupe/40">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-burgundy/0 blur-2xl transition-colors duration-500 group-hover:bg-burgundy/60"
                />
                <span className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="relative mt-10 h-8 w-8 text-champagne transition-transform duration-500 group-hover:scale-110" strokeWidth={1.4} />
                <h3 className="relative mt-5 font-sans text-lg font-medium text-foreground">{name}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-10 rounded-[2rem] border bg-background p-8 sm:p-10 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <p className="eyebrow text-taupe">Creative capabilities</p>
            <p className="mt-3 font-serif text-2xl text-foreground">What every project draws on.</p>
          </div>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <li key={c} className="flex items-start gap-3 text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
