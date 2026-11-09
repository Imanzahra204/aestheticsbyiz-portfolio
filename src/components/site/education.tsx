import { GraduationCap, MapPin, CalendarClock } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading eyebrow="Education" title="Learning at the intersection of code & craft." />

        <Reveal delay={0.1} className="relative pl-10">
          <span aria-hidden className="absolute bottom-0 left-[15px] top-2 w-px bg-gradient-to-b from-champagne via-taupe/40 to-transparent" />
          <span
            aria-hidden
            className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-foreground shadow-glow"
          >
            <GraduationCap className="h-4 w-4" />
          </span>

          <article className="rounded-3xl border bg-card p-7 transition-colors hover:border-taupe/40 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow rounded-full bg-burgundy/40 px-3 py-1.5 text-champagne">
                Currently pursuing
              </span>
              <span className="eyebrow text-muted-foreground">2028 · Expected</span>
            </div>
            <h3 className="mt-6 text-2xl leading-snug text-foreground sm:text-3xl">
              Bachelor of Science in Computer Science (BSCS)
            </h3>
            <p className="mt-3 text-lg text-muted-foreground">
              NFC Institute of Engineering & Technology (NFC-IET)
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-taupe" /> Multan, Pakistan
              </span>
              <span className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-taupe" /> Expected graduation: 2028
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
