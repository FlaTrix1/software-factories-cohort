import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

function usingTheFactorySection(): string {
  const start = readme.indexOf("## Using the factory");
  const end = readme.indexOf("\n## ", start + 1);
  return readme.slice(start, end);
}

function tableRowFor(label: string): string | undefined {
  return usingTheFactorySection()
    .split("\n")
    .find((line) => line.startsWith(`| \`${label}\``));
}

describe("README: Using the factory", () => {
  it.each([
    ["agent:explore", "Issue"],
    ["agent:implement", "Issue"],
    ["agent:review", "Pull request"],
    ["agent:implement-spec", "Issue"],
  ])("lists %s as going on: %s", (label, target) => {
    const cells = tableRowFor(label)
      ?.split("|")
      .map((cell) => cell.trim());
    expect(cells?.[2]).toBe(target);
    expect(cells?.[3]).not.toBe("");
  });

  it("says how often the factory polls", () => {
    expect(usingTheFactorySection()).toContain("polls every 5 minutes");
  });

  it("names the status labels, and links the Trigger.dev run when blocked", () => {
    const section = usingTheFactorySection();
    expect(section).toContain("`agent:in-progress`");
    expect(section).toMatch(
      /`agent:blocked`.*comment linking the Trigger\.dev run/
    );
  });
});
