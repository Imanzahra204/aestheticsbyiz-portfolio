import nexus from "@/assets/work/nexus.png.asset.json";
import novelle from "@/assets/work/novelle.png.asset.json";
import craveeo from "@/assets/work/craveeo.jpg.asset.json";
import homalix from "@/assets/work/homalix.png.asset.json";
import parbat from "@/assets/work/parbat.jpg.asset.json";
import grapple from "@/assets/work/grapple.png.asset.json";
import cravin from "@/assets/work/cravin.png.asset.json";
import romelia from "@/assets/work/romelia.png.asset.json";
import tpws from "@/assets/work/tpws.png.asset.json";
import rollzo from "@/assets/work/rollzo.png.asset.json";

/** Every gallery image pointer under src/assets/work/<project>/<name>.webp.asset.json. */
const GALLERY_ASSETS = import.meta.glob<{ url: string }>("../assets/work/*/*.asset.json", {
  eager: true,
  import: "default",
});

/** Resolve a gallery image by "<project>/<name>"; fails loudly if the pointer is missing. */
function work(key: string): string {
  const asset = GALLERY_ASSETS[`../assets/work/${key}.webp.asset.json`];
  if (!asset) throw new Error(`Missing portfolio image: ${key}`);
  return asset.url;
}

const img = (key: string, caption?: string): Media => ({ kind: "image", src: work(key), caption });
const yt = (id: string): Media => ({ kind: "youtube", id });

export const CONTACT = {
  email: "zahraiman622@gmail.com",
  whatsapp: "+923046741818",
  whatsappDigits: "923046741818",
  instagram: "https://www.instagram.com/aestheticsby_iz?rpxt=YzNicjZpdHkzdzQ4",
  linkedin: "https://www.linkedin.com/in/iman-zahra-22933031a/",
  behance: "https://www.behance.net/imanzahra4",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

export const ROLES = ["Digital Artist", "Creative Designer", "Content Creator", "Web Developer"];

export const CATEGORIES = [
  "All",
  "Branding",
  "Graphic Design",
  "Social Media",
  "Video",
  "AI Content",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Media =
  | { kind: "image"; src: string; caption?: string }
  | { kind: "youtube"; id: string; caption?: string }
  | { kind: "facebook"; href: string; caption?: string };

export type GallerySection = { title: string; items: Media[] };

export type Project = {
  id: string;
  number: string;
  client: string;
  title: string;
  industry?: string;
  description: string;
  showcase: string[];
  categories: Exclude<Category, "All">[];
  image: string;
  /** Logos and small marks are shown contained rather than cropped. */
  fit?: "cover" | "contain";
  /** Background behind a contained cover: burgundy (default) or champagne for logos on white. */
  tone?: "dark" | "light";
  /** Work samples shown inside the project pop-up, grouped by type. */
  gallery?: GallerySection[];
  featured: boolean;
  /** Grid span used in the featured editorial grid (lg screens). */
  span?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "nexus-hubs",
    number: "01",
    client: "Nexus Hubs",
    title: "Brand Identity",
    industry: "Real Estate",
    description:
      "Developed a cohesive brand identity system that establishes a recognizable and professional visual presence.",
    showcase: [
      "Branding applications",
      "Logo presentation",
      "Brand colors and typography",
      "Marketing mockups",
    ],
    categories: ["Branding"],
    image: nexus.url,
    gallery: [
      { title: "Brand identity", items: [img("nexus/identity", "Brand identity board")] },
      {
        title: "Social media posts",
        items: ["10", "11", "12", "13", "14", "15", "16", "17"].map((n) => img(`nexus/post-${n}`)),
      },
    ],
    featured: true,
    span: "lg:col-span-8",
  },
  {
    id: "craveeo",
    number: "03",
    client: "Craveeo",
    title: "Social Media Manager",
    industry: "Food Delivery",
    description:
      "Created engaging short-form reels and social media graphics to strengthen digital engagement.",
    showcase: ["Social media management", "Social media posts", "Feature graphics for Google"],
    categories: ["Social Media", "Graphic Design"],
    image: craveeo.url,
    gallery: [
      {
        title: "Social media management",
        items: [
          "hand-design",
          "cafe-kunj",
          "insta-splitter",
          "why-choose",
          "why-the-stress",
          "phone",
          "puzzle",
          "iphone-trend",
        ].map((n) => img(`craveeo/${n}`)),
      },
      {
        title: "Feature graphics for Google",
        items: [
          img("craveeo/feature-customer", "Customer"),
          img("craveeo/feature-merchant", "Merchant"),
          img("craveeo/feature-rider", "Rider"),
        ],
      },
    ],
    featured: true,
    span: "lg:col-span-4",
  },
  {
    id: "homalix",
    number: "04",
    client: "Homalix International",
    title: "Healthcare Technology",
    industry: "Medical Software",
    description:
      "Designed promotional and informational graphics for medical software developed to streamline hospital data management.",
    showcase: ["Promotional graphics", "Informational designs", "Healthcare technology visuals"],
    categories: ["Graphic Design"],
    image: homalix.url,
    gallery: [
      {
        title: "Social media posts",
        items: ["3", "4", "5", "6", "7"].map((n) => img(`homalix/post-${n}`)),
      },
    ],
    featured: true,
    span: "lg:col-span-4",
  },
  {
    id: "novelle",
    number: "02",
    client: "Novelle Fragrance",
    title: "Luxury Branding",
    industry: "Perfume & Lifestyle",
    description: "Created social media branding and launch visuals to support product promotion.",
    showcase: [
      "Fragrance promotional creatives",
      "Social media layouts",
      "Product campaign visuals",
    ],
    categories: ["Branding", "Social Media"],
    image: novelle.url,
    gallery: [
      { title: "Branding", items: [img("novelle/post-8", "Brand identity board")] },
      {
        title: "Social media posts",
        items: ["1", "2", "3", "5"].map((n) => img(`novelle/post-${n}`)),
      },
    ],
    featured: true,
    span: "lg:col-span-8",
  },
  {
    id: "parbat",
    number: "05",
    client: "Parbat Flour Mills",
    title: "AI Video Production",
    industry: "Food & Manufacturing",
    description: "Produced AI-powered video content using creative visual storytelling.",
    showcase: ["AI-generated video", "Creative visual storytelling"],
    categories: ["Video", "AI Content"],
    image: parbat.url,
    gallery: [
      {
        title: "AI-created video",
        items: [
          {
            kind: "facebook",
            href: "https://www.facebook.com/reel/1028930523382561/",
          },
        ],
      },
    ],
    featured: true,
    span: "lg:col-span-7",
  },
  {
    id: "grapple-gear",
    number: "06",
    client: "Grapple Gear",
    title: "Digital Content Creation",
    industry: "Sportswear & Brazilian Jiu-Jitsu",
    description:
      "Worked as a Digital Creator, developing creative content for Brazilian Jiu-Jitsu GI suits.",
    showcase: [
      "AI-created videos",
      "Product promotional visuals",
      "Social media content",
      "Sportswear branding",
    ],
    categories: ["Social Media", "Video", "AI Content"],
    image: grapple.url,
    gallery: [
      {
        title: "AI-created videos",
        items: [yt("64lJizGDHY8"), yt("vqwBPtCWHbU"), yt("N2gYII5CIeY")],
      },
    ],
    fit: "contain",
    featured: true,
    span: "lg:col-span-5",
  },
  {
    id: "cravin-house",
    number: "07",
    client: "Cravin House",
    title: "Restaurant Branding",
    industry: "Restaurant",
    description:
      "Social media content management, restaurant menu design and screen-printing designs.",
    showcase: [
      "Social media content management",
      "Restaurant menu design",
      "Screen-printing designs",
    ],
    categories: ["Social Media", "Graphic Design"],
    image: cravin.url,
    gallery: [
      { title: "Social media", items: [img("cravin/banner")] },
      {
        title: "Menu design",
        items: [
          img("cravin/menu-cover", "Cover page"),
          img("cravin/menu-burgers", "Burgers & sandwiches"),
          img("cravin/menu-coffee", "Coffee"),
          img("cravin/menu-waffles", "Waffles"),
        ],
      },
      {
        title: "Screen printing",
        items: [img("cravin/print-front", "Front layout"), img("cravin/print-back", "Back layout")],
      },
    ],
    featured: false,
  },
  {
    id: "dr-romelia",
    number: "08",
    client: "Dr. Romelia",
    title: "Cosmetic Products",
    industry: "Skincare & Cosmetics",
    description: "Promotional graphics, social media posts and product launch visuals.",
    showcase: ["Promotional graphics", "Social media posts", "Product launch visuals"],
    categories: ["Graphic Design", "Social Media"],
    image: romelia.url,
    gallery: [
      {
        title: "Social media posts",
        items: [
          img("romelia/banner"),
          img("romelia/coming-soon", "Coming soon"),
          img("romelia/about-us", "About us"),
          img("romelia/post-3"),
        ],
      },
    ],
    featured: false,
  },
  {
    id: "mr-food",
    number: "09",
    client: "Mr. Food",
    title: "Restaurant Design",
    industry: "Restaurant",
    description: "Professional menu design and print-ready materials.",
    showcase: ["Professional menu design", "Printable bag design", "Print-ready materials"],
    categories: ["Graphic Design"],
    image: work("mrfood/logo"),
    gallery: [
      { title: "Printable bag", items: [img("mrfood/printable-bag")] },
      {
        title: "Menu design",
        items: [img("mrfood/menu-page-1", "Page 1"), img("mrfood/menu-page-2", "Page 2")],
      },
    ],
    featured: false,
  },
  {
    id: "tpws",
    number: "10",
    client: "TPWS Nawabshah",
    title: "Awareness Campaign",
    industry: "Healthcare Non-profit",
    description: "Thalassemia awareness graphics and blood donation campaign content.",
    showcase: ["Thalassemia awareness graphics", "Blood donation campaign content"],
    categories: ["Graphic Design", "Social Media"],
    image: tpws.url,
    gallery: [
      {
        title: "Awareness campaign posts",
        items: [
          img("tpws/awareness", "Awareness"),
          img("tpws/storytelling", "Emotional storytelling"),
          img("tpws/services-impact", "Services & impact"),
        ],
      },
    ],
    featured: false,
  },
  {
    id: "rollzo",
    number: "11",
    client: "Rollzo",
    title: "Restaurant Branding",
    industry: "Restaurant",
    description: "Restaurant menu design with visually appealing menu layouts.",
    showcase: ["Social media posts", "Restaurant menu design", "Visually appealing menu layouts"],
    categories: ["Graphic Design", "Social Media"],
    image: rollzo.url,
    featured: false,
    gallery: [
      {
        title: "Social media posts",
        items: ["1", "2", "3", "4"].map((n) => img(`rollzo/post-${n}`)),
      },
      {
        title: "Menu design",
        items: [
          img("rollzo/menu-add-on", "Add-ons"),
          img("rollzo/menu-mojitos", "Mojitos"),
          img("rollzo/menu-sandwiches", "Sandwiches"),
        ],
      },
    ],
  },
  {
    id: "ns-group",
    number: "12",
    client: "NS Group",
    title: "AI Creative Specialist",
    description: "Worked as an AI Creative Specialist, producing AI-created video content.",
    showcase: ["AI-created videos"],
    categories: ["AI Content", "Video"],
    image: work("ns-group/logo"),
    fit: "contain",
    tone: "light",
    featured: false,
    gallery: [{ title: "AI-created videos", items: [yt("QBkYgvjvEAY"), yt("FBHkp9-5s10")] }],
  },
];
