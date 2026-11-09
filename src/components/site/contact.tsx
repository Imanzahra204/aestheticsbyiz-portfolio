import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "@/lib/portfolio-data";
import { buildMailto, buildWhatsApp, contactSchema, type ContactInput } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BehanceIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "./social-icons";
import { Reveal } from "./reveal";

const CHANNELS = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail },
  {
    label: "WhatsApp",
    value: "+92 304 6741818",
    href: `https://wa.me/${CONTACT.whatsappDigits}`,
    Icon: WhatsappIcon,
  },
  { label: "Instagram", value: "@aestheticsby_iz", href: CONTACT.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", value: "Iman Zahra", href: CONTACT.linkedin, Icon: LinkedinIcon },
  { label: "Behance", value: "imanzahra4", href: CONTACT.behance, Icon: BehanceIcon },
];

type Errors = Partial<Record<keyof ContactInput, string>>;
const EMPTY: ContactInput = { name: "", email: "", subject: "", details: "" };

const fieldClass =
  "h-12 rounded-xl border-foreground/15 bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-taupe";

export function Contact() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const update = (k: keyof ContactInput) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        errs[key] ??= issue.message;
      }
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return null;
    }
    return parsed.data;
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    const data = validate();
    if (!data) return;
    window.location.href = buildMailto(data);
    toast.success("Opening your email app — just press send.");
  };

  const sendWhatsApp = () => {
    const data = validate();
    if (!data) return;
    window.open(buildWhatsApp(data), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your message.");
  };

  const err = (k: keyof ContactInput) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="bg-glow pointer-events-none absolute -right-40 bottom-0 h-[40rem] w-[40rem] opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-taupe">
              <span className="h-px w-8 bg-taupe" />
              Contact
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Have a Creative Project <em className="text-champagne">in Mind?</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Let's turn your ideas into something extraordinary. Whether you need a compelling brand
              identity, engaging digital content, professional video editing, or a modern website,
              I'd love to hear about your project.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y border-y">
              {CHANNELS.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border text-champagne transition-colors group-hover:border-champagne group-hover:bg-burgundy">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="eyebrow block text-muted-foreground">{label}</span>
                      <span className="text-foreground">{value}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-champagne" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            noValidate
            onSubmit={sendEmail}
            className="glass rounded-[2rem] p-6 shadow-elegant sm:p-10"
            aria-label="Project enquiry"
          >
            <p className="font-serif text-2xl text-foreground">Tell me about your project</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="eyebrow text-muted-foreground">Full name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update("name")(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className={`mt-2 ${fieldClass}`}
                />
                {err("name")}
              </div>
              <div>
                <Label htmlFor="email" className="eyebrow text-muted-foreground">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email")(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@company.com"
                  className={`mt-2 ${fieldClass}`}
                />
                {err("email")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="subject" className="eyebrow text-muted-foreground">Subject</Label>
                <Input
                  id="subject"
                  value={values.subject}
                  onChange={(e) => update("subject")(e.target.value)}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  placeholder="Brand identity, reels, website…"
                  className={`mt-2 ${fieldClass}`}
                />
                {err("subject")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="details" className="eyebrow text-muted-foreground">Project details</Label>
                <Textarea
                  id="details"
                  rows={6}
                  value={values.details}
                  onChange={(e) => update("details")(e.target.value)}
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? "details-error" : undefined}
                  placeholder="Goals, timeline, anything I should know…"
                  className={`mt-2 min-h-36 ${fieldClass} h-auto py-3`}
                />
                {err("details")}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="hero" size="xl" className="flex-1">
                Send Message <Send />
              </Button>
              <Button type="button" variant="ghostLine" size="xl" onClick={sendWhatsApp}>
                <WhatsappIcon /> Via WhatsApp
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              "Send Message" opens your email app with everything filled in, addressed to{" "}
              {CONTACT.email}.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
