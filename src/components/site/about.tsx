import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/iman-zahra-portrait.png.asset.json";
import { PROJECTS } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

const STATS = [
  { value: "11", label: "Brand collaborations" },
  { value: "7", label: "Creative services" },
  { value: "8", label: "Core skills" },
  { value: "2028", label: "BSCS, expected" },
];

const workspace = PROJECTS.find((p) => p.id === "novelle")!;

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* visuals */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-burgundy">
            <div
              aria-hidden
              className="absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full border border-foreground/15"
            />
            <img
              src={portrait.url}
              alt="Portrait of Iman Zahra"
              loading="lazy"
              width={640}
              height={800}
              className="drop-portrait absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain object-bottom"
            />
            <p className="eyebrow absolute left-6 top-6 text-foreground/80">Iman Zahra</p>
          </div>
          <div className="absolute -bottom-10 -right-4 w-44 overflow-hidden rounded-2xl border-4 border-background shadow-elegant sm:-right-10 sm:w-56">
            <img
              src={workspace.image}
              alt="Novelle Fragrance branding work by Iman Zahra"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="glass absolute -left-3 top-10 rounded-2xl px-4 py-3 sm:-left-8">
            <p className="eyebrow text-taupe">Studio</p>
            <p className="font-serif text-lg italic text-foreground">aestheticsbyiz</p>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-taupe">
              <span className="h-px w-8 bg-taupe" />
              About me
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Behind the <em className="text-champagne">Creativity.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I'm Iman Zahra, a passionate Digital Artist and Creative Designer behind{" "}
              <span className="text-foreground">aestheticsbyiz</span>. Currently pursuing my
              Bachelor's degree in Computer Science (BSCS) at NFC Institute of Engineering &
              Technology (NFC-IET), Multan, I bring together creativity, technology, and innovation
              to craft meaningful digital experiences.
            </p>
            <p>
              Throughout my creative journey, I've collaborated with brands across diverse
              industries, developing impactful visual identities, engaging digital content,
              promotional campaigns, and creative solutions tailored to individual brand goals.
            </p>
            <p>
              My expertise extends beyond traditional graphic design into video editing, AI-powered
              content creation, logo animation, social media management, and web development.
            </p>
            <p className="border-l-2 border-burgundy pl-5 font-serif text-xl italic text-foreground">
              I believe great design is more than aesthetics; it's about communicating ideas,
              building connections, and creating experiences that make brands stand out.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-background p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl text-champagne">{s.value}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="burgundy" size="xl" className="mt-10">
              <a href="#contact">
                Let's Connect <ArrowUpRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
