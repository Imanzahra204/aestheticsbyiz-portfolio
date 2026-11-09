import { z } from "zod";
import { CONTACT } from "./portfolio-data";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  subject: z.string().trim().min(3, "Please add a short subject").max(150, "Subject is too long"),
  details: z
    .string()
    .trim()
    .min(20, "Tell me a little more about your project (at least 20 characters)")
    .max(2000, "Please keep it under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

function body(data: ContactInput) {
  return `Hi Iman,\n\n${data.details}\n\n— ${data.name}\n${data.email}`;
}

/** Opens the visitor's email app with the message addressed to Iman. */
export function buildMailto(data: ContactInput) {
  const params = new URLSearchParams({ subject: data.subject, body: body(data) });
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${CONTACT.email}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Opens WhatsApp with the same message, sent to Iman's number. */
export function buildWhatsApp(data: ContactInput) {
  const text = `*${data.subject}*\n\n${body(data)}`;
  return `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(text)}`;
}
