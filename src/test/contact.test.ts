import { describe, expect, it } from "vitest";
import { buildMailto, buildWhatsApp, contactSchema } from "@/lib/contact";

const valid = {
  name: "Sara Khan",
  email: "sara@example.com",
  subject: "Brand Identity Development",
  details: "I need a full brand identity for my new bakery.",
};

describe("contact form", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a missing name", () => {
    expect(contactSchema.safeParse({ ...valid, name: " " }).success).toBe(false);
  });

  it("sends email to zahraiman622@gmail.com", () => {
    expect(buildMailto(valid).startsWith("mailto:zahraiman622@gmail.com?")).toBe(true);
  });

  it("sends WhatsApp messages to +923046741818", () => {
    expect(buildWhatsApp(valid).startsWith("https://wa.me/923046741818?text=")).toBe(true);
  });
});

import { contactSchema as schema2 } from "@/lib/contact";
describe("subject service list", () => {
  it("rejects a subject that is not one of the services", () => {
    expect(schema2.safeParse({ ...valid, subject: "Random text" }).success).toBe(false);
  });
  it("accepts Video Editing", () => {
    expect(schema2.safeParse({ ...valid, subject: "Video Editing" }).success).toBe(true);
  });
});
