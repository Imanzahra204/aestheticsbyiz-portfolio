import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import portrait from "@/assets/iman-zahra-portrait.png.asset.json";
import { CONTACT, PROJECTS, ROLES } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { BehanceIcon, InstagramIcon, LinkedinIcon } from "./social-icons";

const ease = [0.16, 1, 0.3, 1] as const;

const SOCIALS = [
  { label: "Instagram", href: CONTACT.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: CONTACT.linkedin, Icon: LinkedinIcon },
  { label: "Behance", href: CONTACT.behance, Icon: BehanceIcon },
];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <motion.span
        key={ROLES[i]}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="font-serif italic text-champagne"
      >
        {ROLES[i]}
      </motion.span>
    </span>
  );
}

const snippets = PROJECTS.filter((p) =>
  ["novelle", "craveeo", "homalix"].includes(p.id),
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      {/* ghost wordmark */}
      <motion.p
        aria-hidden
        style={{ x: ghostX }}
        className="text-outline pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none sm:top-14"
      >
        AESTHETICS
      </motion.p>
      <div
        aria-hidden
        className="bg-glow pointer-events-none absolute -right-40 top-20 h-[38rem] w-[38rem] opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative grid overflow-hidden rounded-[2rem] shadow-elegant lg:min-h-[680px] lg:grid-cols-[1.15fr_1fr]"
        >
          {/* LEFT — burgundy stage */}
          <div className="grain relative flex flex-col justify-between gap-10 overflow-hidden bg-gradient-burgundy p-7 sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-foreground/10"
            />
            <div
              aria-hidden
              className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-burgundy-deep/60 blur-2xl"
            />

            <div className="relative flex items-center justify-between">
              <p className="eyebrow text-foreground/80">aestheticsbyiz · Portfolio</p>
            </div>

            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.25 }}
                aria-hidden
                className="font-display text-[clamp(5.5rem,17vw,11.5rem)] leading-[0.82] tracking-tight text-foreground"
              >
                CREATE
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.45 }}
                className="mt-6 max-w-[26rem] text-3xl leading-[1.1] text-foreground sm:text-4xl"
              >
                Turning Creative Ideas Into <em className="text-champagne">Digital Experiences.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mt-4 text-lg text-foreground/85"
              >
                I'm Iman Zahra — <RotatingRole />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.85 }}
                className="mt-8 flex max-w-[30rem] flex-wrap gap-3"
              >
                <Button asChild variant="hero" size="xl">
                  <a href="#portfolio">
                    Explore My Work <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="ghostLine" size="xl">
                  <a href="#contact">Let's Collaborate</a>
                </Button>
              </motion.div>
            </div>

            <div className="relative flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/85 transition-all hover:-translate-y-0.5 hover:border-champagne hover:text-champagne"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <span className="ml-2 hidden text-sm text-foreground/70 sm:inline">
                11 brand collaborations & counting
              </span>
            </div>
          </div>

          {/* RIGHT — champagne panel */}
          <div className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-gradient-champagne p-7 text-champagne-foreground sm:p-10 lg:p-12">
            <div className="relative z-20 lg:ml-auto lg:max-w-[13rem] lg:pt-24">
              <p className="eyebrow flex items-center gap-2 text-burgundy">
                Available for
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-burgundy" />
              </p>
              <p className="mt-3 font-serif text-3xl leading-tight">Freelance Projects</p>
              <p className="mt-3 text-sm leading-relaxed text-champagne-foreground/70">
                Branding, content, video & web — crafted under aestheticsbyiz.
              </p>
            </div>

            {/* portrait on mobile / tablet */}
            <img
              src={portrait.url}
              alt="Iman Zahra, digital artist and creative designer"
              width={640}
              height={800}
              className="pointer-events-none relative z-10 mx-auto -mb-10 mt-4 h-[420px] w-auto object-contain object-bottom sm:-mb-12 lg:hidden"
            />

            {/* work snippet card */}
            <motion.a
              href="#portfolio"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1 }}
              className="group relative z-20 hidden w-64 self-end rounded-2xl bg-background/90 p-4 text-foreground shadow-elegant backdrop-blur lg:block"
            >
              <div className="flex -space-x-3">
                {snippets.map((p, i) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 rounded-xl border-2 border-background object-cover transition-transform duration-500 group-hover:translate-y-[-4px]"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
              <p className="mt-3 font-serif text-lg leading-snug">Selected works</p>
              <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                Novelle · Craveeo · Homalix
                <ArrowUpRight className="h-4 w-4 text-champagne transition-transform group-hover:rotate-45" />
              </p>
            </motion.a>
          </div>

          {/* portrait on desktop — straddles both panels */}
          <motion.img
            src={portrait.url}
            alt="Iman Zahra, digital artist and creative designer"
            width={640}
            height={800}
            style={{ y: portraitY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.2 }}
            className="pointer-events-none absolute bottom-0 left-[37%] z-10 hidden h-[96%] w-auto object-contain object-bottom drop-portrait lg:block"
          />
        </motion.div>

        {/* intro strip */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="eyebrow text-taupe">Professional title</p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-serif text-2xl text-foreground sm:text-3xl">
              {ROLES.map((r, i) => (
                <li key={r} className="flex items-center gap-3">
                  {r}
                  {i < ROLES.length - 1 && <span className="text-taupe">|</span>}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm Iman Zahra, a Digital Artist and Creative Designer passionate about blending
              creativity, technology, and innovation. From impactful brand identities to engaging
              digital content and modern web experiences, I transform ideas into visuals that leave
              a lasting impression.
            </p>
            <a
              href="#about"
              className="eyebrow inline-flex items-center gap-2 self-start text-champagne hover:text-foreground"
            >
              Scroll to discover <ArrowDown className="h-4 w-4 animate-float" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
