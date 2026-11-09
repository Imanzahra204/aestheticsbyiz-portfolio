import { describe, expect, it } from "vitest";
import { buildMailto, buildWhatsApp, contactSchema } from "@/lib/contact";

const valid = {
  name: "Sara Khan",
  email: "sara@example.com",
  subject: "Brand identity",
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
