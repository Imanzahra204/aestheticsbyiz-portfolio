import nexus from "@/assets/work/nexus.png.asset.json";
import novelle from "@/assets/work/novelle.png.asset.json";
import craveeo from "@/assets/work/craveeo.jpg.asset.json";
import homalix from "@/assets/work/homalix.png.asset.json";
import parbat from "@/assets/work/parbat.jpg.asset.json";
import grapple from "@/assets/work/grapple.png.asset.json";
import cravin from "@/assets/work/cravin.png.asset.json";
import romelia from "@/assets/work/romelia.png.asset.json";
import mrfood from "@/assets/work/mrfood.png.asset.json";
import tpws from "@/assets/work/tpws.png.asset.json";
import rollzo from "@/assets/work/rollzo.png.asset.json";

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

export type Project = {
  id: string;
  number: string;
  client: string;
  title: string;
  industry: string;
  description: string;
  showcase: string[];
  categories: Exclude<Category, "All">[];
  image: string;
  /** Logos and small marks are shown contained rather than cropped. */
  fit?: "cover" | "contain";
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
    featured: true,
    span: "lg:col-span-8",
  },
  {
    id: "craveeo",
    number: "03",
    client: "Craveeo",
    title: "Social Media & Video Content",
    industry: "Food Delivery",
    description:
      "Created engaging short-form reels and social media graphics to strengthen digital engagement.",
    showcase: ["Reel thumbnails", "Social media graphics", "Video previews"],
    categories: ["Social Media", "Video"],
    image: craveeo.url,
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
    featured: true,
    span: "lg:col-span-4",
  },
  {
    id: "novelle",
    number: "02",
    client: "Novelle Fragrance",
    title: "Luxury Branding",
    industry: "Perfume & Lifestyle",
    description:
      "Created social media branding and launch visuals to support product promotion.",
    showcase: ["Fragrance promotional creatives", "Social media layouts", "Product campaign visuals"],
    categories: ["Branding", "Social Media"],
    image: novelle.url,
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
    showcase: ["Video thumbnails", "Selected video previews", "AI-generated visual sequences"],
    categories: ["Video", "AI Content"],
    image: parbat.url,
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
    showcase: ["Product promotional visuals", "Social media content", "Sportswear branding"],
    categories: ["Social Media"],
    image: grapple.url,
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
    showcase: ["Social media content management", "Restaurant menu design", "Screen-printing designs"],
    categories: ["Social Media", "Graphic Design"],
    image: cravin.url,
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
    featured: false,
  },
  {
    id: "mr-food",
    number: "09",
    client: "Mr. Food",
    title: "Restaurant Design",
    industry: "Restaurant",
    description: "Professional menu design and print-ready materials.",
    showcase: ["Professional menu design", "Print-ready materials"],
    categories: ["Graphic Design"],
    image: mrfood.url,
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
    featured: false,
  },
  {
    id: "rollzo",
    number: "11",
    client: "Rollzo",
    title: "Restaurant Branding",
    industry: "Restaurant",
    description: "Restaurant menu design with visually appealing menu layouts.",
    showcase: ["Restaurant menu design", "Visually appealing menu layouts"],
    categories: ["Graphic Design"],
    image: rollzo.url,
    featured: false,
  },
];
