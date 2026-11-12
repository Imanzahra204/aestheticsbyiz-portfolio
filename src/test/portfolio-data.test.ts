import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/lib/portfolio-data";

const byId = (id: string) => {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) throw new Error(`missing project ${id}`);
  return p;
};
const count = (id: string, kind: "image" | "youtube" | "facebook") =>
  (byId(id).gallery ?? []).flatMap((s) => s.items).filter((i) => i.kind === kind).length;

describe("portfolio showcase", () => {
  it("NS Group sits in More brand collaborations as AI Creative Specialist with 2 videos", () => {
    const ns = byId("ns-group");
    expect(ns.featured).toBe(false);
    expect(ns.title).toBe("AI Creative Specialist");
    expect(count("ns-group", "youtube")).toBe(2);
  });

  it("each project shows the number of samples supplied", () => {
    expect(count("nexus-hubs", "image")).toBe(9);
    expect(count("craveeo", "image")).toBe(11);
    expect(count("homalix", "image")).toBe(5);
    expect(count("novelle", "image")).toBe(5);
    expect(count("parbat", "facebook")).toBe(1);
    expect(count("grapple-gear", "youtube")).toBe(3);
    expect(count("cravin-house", "image")).toBe(7);
    expect(count("dr-romelia", "image")).toBe(4);
    expect(count("mr-food", "image")).toBe(3);
    expect(count("tpws", "image")).toBe(3);
    expect(count("rollzo", "image")).toBe(7);
  });

  it("Mr. Food cover is the new logo", () => {
    expect(byId("mr-food").image).toContain("mrfood-logo.webp");
  });
});
