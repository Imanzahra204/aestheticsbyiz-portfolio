import { ArrowUp } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/portfolio-data";
import { BehanceIcon, InstagramIcon, LinkedinIcon } from "./social-icons";

const SOCIALS = [
  { label: "Instagram", href: CONTACT.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: CONTACT.linkedin, Icon: LinkedinIcon },
  { label: "Behance", href: CONTACT.behance, Icon: BehanceIcon },
];

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden border-t bg-surface pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl text-foreground">Iman Zahra</p>
            <p className="mt-1 font-serif text-xl italic text-champagne">aestheticsbyiz</p>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Creating with purpose. Designing with imagination.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-6 inline-block border-b border-taupe pb-1 text-foreground transition-colors hover:text-champagne"
            >
              {CONTACT.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-taupe">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-taupe">Follow</p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 select-none text-center font-display text-[17vw] leading-[0.8] text-foreground/[0.04]"
        >
          AESTHETICSBYIZ
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Iman Zahra · aestheticsbyiz. All rights reserved.</p>
          <a href="#home" className="flex items-center gap-2 transition-colors hover:text-foreground">
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
