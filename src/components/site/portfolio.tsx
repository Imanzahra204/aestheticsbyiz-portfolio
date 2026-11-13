import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Play,
} from "lucide-react";
import {
  CATEGORIES,
  PROJECTS,
  type Category,
  type GallerySection,
  type Media,
  type Project,
} from "@/lib/portfolio-data";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./reveal";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectImage({ project, className = "" }: { project: Project; className?: string }) {
  if (project.fit === "contain") {
    const light = project.tone === "light";
    return (
      <div
        className={`flex items-center justify-center ${light ? "bg-champagne" : "bg-gradient-burgundy"} ${className}`}
      >
        <img
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          loading="lazy"
          className={`h-1/2 max-h-60 w-auto object-contain transition-transform duration-700 group-hover:scale-110 ${light ? "mix-blend-multiply" : "mix-blend-lighten"}`}
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

function FeaturedCard({
  project,
  span,
  onOpen,
}: {
  project: Project;
  span: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease }}
      className={`group relative h-[380px] overflow-hidden rounded-[1.75rem] border bg-card text-left sm:h-[460px] ${span}`}
    >
      <ProjectImage project={project} className="absolute inset-0 h-full w-full" />
      <div aria-hidden className="bg-fade-bottom absolute inset-x-0 bottom-0 h-3/4" />
      <span className="eyebrow glass absolute left-5 top-5 rounded-full px-3 py-1.5 text-foreground">
        {project.number}
      </span>
      <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-champagne text-champagne-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        {project.industry && <p className="eyebrow text-champagne">{project.industry}</p>}
        <h3 className="mt-2 text-2xl leading-tight text-foreground sm:text-3xl">
          {project.client} <span className="italic text-foreground/70">— {project.title}</span>
        </h3>
        <div className="mt-3 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-foreground/25 px-3 py-1 text-xs text-foreground/85"
            >
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
      <p className="eyebrow mt-4 text-taupe">
        {project.number}
        {project.industry && ` · ${project.industry}`}
      </p>
      <p className="mt-1 font-serif text-xl text-foreground">{project.client}</p>
      <p className="text-sm text-muted-foreground">{project.title}</p>
    </motion.button>
  );
}

type ImageItem = Extract<Media, { kind: "image" }>;

function VideoEmbed({ item, client }: { item: Exclude<Media, ImageItem>; client: string }) {
  const src =
    item.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${item.id}?rel=0`
      : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.href)}&show_text=false&width=288&height=512&t=0`;
  const link = item.kind === "youtube" ? `https://youtube.com/shorts/${item.id}` : item.href;
  return (
    <figure className="w-full max-w-[18rem]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border bg-background">
        <iframe
          src={src}
          title={`${client} — AI-created video`}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="eyebrow mt-3 inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-champagne"
      >
        Watch on {item.kind === "youtube" ? "YouTube" : "Facebook"}{" "}
        <ExternalLink className="h-3 w-3" />
      </a>
    </figure>
  );
}

type VideoItem = Exclude<Media, ImageItem>;

function ReelCard({ project, item, onOpen }: { project: Project; item: VideoItem; onOpen: () => void }) {
  const [playing, setPlaying] = useState(false);
  const isYt = item.kind === "youtube";
  const src = isYt
    ? `https://www.youtube-nocookie.com/embed/${item.id}?rel=0&autoplay=1`
    : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.href)}&show_text=false&width=288&height=512&t=0`;
  const showFrame = playing || !isYt;
  return (
    <figure className="w-[15rem] shrink-0 snap-start sm:w-[16rem]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border bg-card shadow-elegant">
        {showFrame ? (
          <iframe
            src={src}
            title={`${project.client} — AI video`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${project.client} video`}
            className="group absolute inset-0"
          >
            <img
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden className="bg-fade-bottom absolute inset-0" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-champagne text-champagne-foreground shadow-elegant transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </button>
        )}
        <span className="eyebrow glass pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1.5 text-foreground">
          {project.client}
        </span>
      </div>
      <figcaption className="mt-3">
        <p className="text-foreground">{project.client}</p>
        <button
          type="button"
          onClick={onOpen}
          className="eyebrow mt-1 inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-champagne"
        >
          View brand case study <ArrowUpRight className="h-3 w-3" />
        </button>
      </figcaption>
    </figure>
  );
}

function Gallery({
  sections,
  client,
  onZoom,
}: {
  sections: GallerySection[];
  client: string;
  onZoom: (src: string) => void;
}) {
  return (
    <div className="space-y-12 border-t px-6 py-10 sm:px-9">
      {sections.map((section) => {
        const images = section.items.filter((i): i is ImageItem => i.kind === "image");
        const videos = section.items.filter(
          (i): i is Exclude<Media, ImageItem> => i.kind !== "image",
        );
        const cols =
          images.length === 1
            ? "max-w-md"
            : images.length === 2
              ? "columns-1 sm:columns-2"
              : "columns-1 sm:columns-2 lg:columns-3";
        return (
          <section key={section.title}>
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-serif text-2xl text-foreground">{section.title}</h4>
              <span className="eyebrow text-taupe">
                {section.items.length} {section.items.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
            {images.length > 0 && (
              <div className={`mt-5 gap-4 ${cols}`}>
                {images.map((item, i) => (
                  <figure key={item.src} className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => onZoom(item.src)}
                      className="group relative block w-full overflow-hidden rounded-xl border bg-background"
                      aria-label={`View ${item.caption ?? `${section.title} ${i + 1}`} full size`}
                    >
                      <img
                        src={item.src}
                        alt={`${client} — ${item.caption ?? `${section.title} ${i + 1}`}`}
                        loading="lazy"
                        className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="glass absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </button>
                    {item.caption && (
                      <figcaption className="eyebrow mt-2 text-muted-foreground">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
            {videos.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-5 sm:justify-start">
                {videos.map((v) => (
                  <VideoEmbed key={v.kind === "youtube" ? v.id : v.href} item={v} client={client} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function Lightbox({
  images,
  index,
  client,
  onIndex,
  onClose,
}: {
  images: ImageItem[];
  index: number | null;
  client: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const go = useCallback(
    (d: number) => index !== null && onIndex((index + d + images.length) % images.length),
    [index, images.length, onIndex],
  );
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);
  const item = index !== null ? images[index] : null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="flex h-[94vh] max-w-[96vw] flex-col items-center justify-center gap-3 border-0 bg-background/95 p-4 sm:rounded-2xl sm:p-8">
        <DialogTitle className="sr-only">{client} — full-size view</DialogTitle>
        <DialogDescription className="sr-only">
          Use the arrows to move between designs.
        </DialogDescription>
        {item && (
          <>
            <img
              src={item.src}
              alt={`${client} — ${item.caption ?? "design"}`}
              className="min-h-0 max-w-full flex-1 object-contain"
            />
            <p className="eyebrow text-muted-foreground">
              {index! + 1} / {images.length}
              {item.caption && ` · ${item.caption}`}
            </p>
          </>
        )}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous design"
              className="glass absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-champagne hover:text-champagne-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next design"
              className="glass absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-champagne hover:text-champagne-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<Project | null>(null);
  const reels = useMemo(
    () =>
      PROJECTS.flatMap((project) =>
        (project.gallery ?? []).flatMap((sec) =>
          sec.items
            .filter((m): m is VideoItem => m.kind !== "image")
            .map((item) => ({ project, item })),
        ),
      ),
    [],
  );
  const [zoom, setZoom] = useState<number | null>(null);
  const activeImages = useMemo(
    () =>
      (active?.gallery ?? []).flatMap((s) =>
        s.items.filter((i): i is ImageItem => i.kind === "image"),
      ),
    [active],
  );

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
          <motion.div
            layout
            className="mt-12 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12"
          >
            <AnimatePresence mode="popLayout">
              {featured.map((p) => (
                <FeaturedCard
                  key={p.id}
                  project={p}
                  span={filter === "All" ? (p.span ?? "lg:col-span-6") : "lg:col-span-6"}
                  onOpen={() => setActive(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {reels.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between gap-6 border-b pb-6">
              <h3 className="text-3xl text-foreground sm:text-4xl">
                AI &amp; video <em className="text-champagne">reels</em>
              </h3>
              <span className="eyebrow hidden text-muted-foreground sm:block">
                {reels.length} videos
              </span>
            </div>
            <div className="-mx-6 mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-4">
              {reels.map(({ project, item }) => (
                <ReelCard
                  key={item.kind === "youtube" ? item.id : item.href}
                  project={project}
                  item={item}
                  onOpen={() => setActive(project)}
                />
              ))}
            </div>
          </div>
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
            <motion.div
              layout
              className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6"
            >
              <AnimatePresence mode="popLayout">
                {more.map((p) => (
                  <SmallCard key={p.id} project={p} onOpen={() => setActive(p)} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(o) => {
          if (!o) {
            setActive(null);
            setZoom(null);
          }
        }}
      >
        <DialogContent className="block max-h-[92vh] max-w-6xl overflow-y-auto rounded-[1.75rem] border bg-card p-0 sm:rounded-[1.75rem]">
          {active && (
            <>
              <div className="grid md:grid-cols-[1.25fr_1fr]">
                <div
                  className={`group relative min-h-[320px] overflow-hidden bg-background ${active.gallery ? "md:min-h-[440px]" : "md:min-h-[560px]"}`}
                >
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
                    {active.number}
                    {active.industry && ` · ${active.industry}`}
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
                      <span
                        key={c}
                        className="rounded-full bg-burgundy/40 px-3 py-1 text-xs text-champagne"
                      >
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
              {active.gallery && (
                <Gallery
                  sections={active.gallery}
                  client={active.client}
                  onZoom={(src) => setZoom(activeImages.findIndex((i) => i.src === src))}
                />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Lightbox
        images={activeImages}
        index={zoom}
        client={active?.client ?? ""}
        onIndex={setZoom}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
