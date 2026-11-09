import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Education } from "@/components/site/education";
import { Skills } from "@/components/site/skills";
import { Services } from "@/components/site/services";
import { Portfolio } from "@/components/site/portfolio";
import { Process } from "@/components/site/process";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";

const TITLE = "Iman Zahra — Digital Artist & Creative Designer | aestheticsbyiz";
const DESCRIPTION =
  "Portfolio of Iman Zahra (aestheticsbyiz): brand identity, graphic design, video editing, AI video, social media and web development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster position="bottom-center" />
    </>
  );
}
