import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { CATEGORIES, PROJECTS, type Category, type Project } from "@/lib/portfolio-data";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./reveal";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectImage({ project, className = "" }: { project: Project; className?: string }) {
  if (project.fit === "contain") {
    return (
      <div className={`flex items-center justify-center bg-gradient-burgundy ${className}`}>
        <img
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          loading="lazy"
          className="h-1/2 max-h-60 w-auto object-contain mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    );
  }
  return (
    <img
      src={project.image}
      alt={`${project.client} — ${project.title}`}
      loading="lazy"
      className={`object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 ${className}`}
    />
  );
}

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease }}
      className={`group relative h-[380px] overflow-hidden rounded-[1.75rem] border bg-card text-left sm:h-[460px] ${project.span ?? ""}`}
    >
      <ProjectImage project={project} className="absolute inset-0 h-full w-full" />
      <div aria-hidden className="bg-fade-bottom absolute inset-x-0 bottom-0 h-2/3 opacity-90" />
      <span className="eyebrow glass absolute left-5 top-5 rounded-full px-3 py-1.5 text-foreground">
        {project.number}
      </span>
      <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-champagne text-champagne-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="eyebrow text-champagne">{project.industry}</p>
        <h3 className="mt-2 text-2xl leading-tight text-foreground sm:text-3xl">
          {project.client} <span className="italic text-foreground/70">— {project.title}</span>
        </h3>
        <div className="mt-3 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
          {project.categories.map((c) => (
            <span key={c} className="rounded-full border border-foreground/25 px-3 py-1 text-xs text-foreground/85">
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function SmallCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease }}
      className="group text-left"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-card">
        <ProjectImage project={project} className="h-full w-full" />
        <div className="absolute inset-0 flex items-end bg-background/0 p-4 transition-colors duration-500 group-hover:bg-background/40">
          <span className="eyebrow translate-y-3 rounded-full bg-champagne px-3 py-1.5 text-champagne-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View project
          </span>
        </div>
      </div>
      <p className="eyebrow mt-4 text-taupe">{project.number} · {project.industry}</p>
      <p className="mt-1 font-serif text-xl text-foreground">{project.client}</p>
      <p className="text-sm text-muted-foreground">{project.title}</p>
    </motion.button>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () => PROJECTS.filter((p) => filter === "All" || p.categories.includes(filter)),
    [filter],
  );
  const featured = visible.filter((p) => p.featured);
  const more = visible.filter((p) => !p.featured);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="bg-glow pointer-events-none absolute -left-60 top-40 h-[40rem] w-[40rem] opacity-40"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Works. Creative Stories."
          intro="Brand collaborations across real estate, fragrance, food, healthcare, sportswear and more."
        />

        <Reveal className="mt-10">
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(c)}
                  className={`eyebrow relative rounded-full border px-5 py-2.5 transition-colors ${on ? "border-champagne text-champagne-foreground" : "text-muted-foreground hover:border-taupe/50 hover:text-foreground"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-champagne"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {featured.length > 0 && (
          <motion.div layout className="mt-12 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12">
            <AnimatePresence mode="popLayout">
              {featured.map((p) => (
                <FeaturedCard key={p.id} project={p} onOpen={() => setActive(p)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {more.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between gap-6 border-b pb-6">
              <h3 className="text-3xl text-foreground sm:text-4xl">
                More brand <em className="text-champagne">collaborations</em>
              </h3>
              <span className="eyebrow hidden text-muted-foreground sm:block">
                {more.length} {more.length === 1 ? "project" : "projects"}
              </span>
            </div>
            <motion.div layout className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
              <AnimatePresence mode="popLayout">
                {more.map((p) => (
                  <SmallCard key={p.id} project={p} onOpen={() => setActive(p)} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-[1.75rem] border bg-card p-0 sm:rounded-[1.75rem]">
          {active && (
            <div className="grid md:grid-cols-[1.25fr_1fr]">
              <div className="group relative min-h-[320px] overflow-hidden bg-background md:min-h-[560px]">
                {active.fit === "contain" ? (
                  <ProjectImage project={active} className="absolute inset-0 h-full w-full" />
                ) : (
                  <img
                    src={active.image}
                    alt={`${active.client} — ${active.title}`}
                    className="absolute inset-0 h-full w-full object-contain p-4"
                  />
                )}
              </div>
              <div className="flex flex-col p-7 sm:p-9">
                <p className="eyebrow text-taupe">
                  {active.number} · {active.industry}
                </p>
                <DialogTitle className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  {active.client}
                </DialogTitle>
                <p className="mt-1 font-serif text-xl italic text-champagne">{active.title}</p>
                <DialogDescription className="mt-5 leading-relaxed text-muted-foreground">
                  {active.description}
                </DialogDescription>
                <p className="eyebrow mt-8 text-taupe">Showcase</p>
                <ul className="mt-3 space-y-2.5">
                  {active.showcase.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-foreground/90">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.categories.map((c) => (
                    <span key={c} className="rounded-full bg-burgundy/40 px-3 py-1 text-xs text-champagne">
                      {c}
                    </span>
                  ))}
                </div>
                <Button asChild variant="hero" size="xl" className="mt-auto self-start pt-0">
                  <a href="#contact" onClick={() => setActive(null)} className="mt-8">
                    Start a similar project <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
