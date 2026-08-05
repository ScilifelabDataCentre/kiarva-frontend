import { test, expect } from "@playwright/test";

// Design tokens defined in src/app/globals.css. Renovate-driven Tailwind or
// PostCSS bumps have broken these in the past by changing how @theme / @import
// compile; pinning the resolved values here catches that immediately.
const expectedTokens = {
  "--background": "oklch(0.9838 0.0035 247.86)",
  "--foreground": "oklch(0 0 0)",
  "--primary": "oklch(0.4188 0.0711 209.74)",
  "--primary-foreground": "oklch(1 0 0)",
  "--secondary": "oklch(0.5596 0.0058 17.33)",
  "--secondary-foreground": "oklch(1 0 0)",
  "--muted": "oklch(0.9652 0.0082 214.34)",
  "--muted-foreground": "oklch(0.5547 0.0407 257.44)",
  "--accent": "oklch(0.9278 0.264 122.962951)",
  "--accent-foreground": "oklch(0.1371 0.036 258.53)",
  "--destructive": "oklch(0.6368 0.2078 25.33)",
  "--border": "oklch(0.929 0.0126 255.53)",
  "--input": "oklch(0.929 0.0126 255.53)",
  "--ring": "oklch(0.1371 0.036 258.53)",
  "--neutral": "oklch(0.9219 0 0)",
  "--neutral-foreground": "oklch(0 0 0)",
  "--info": "oklch(0.419 0.0711 209.8)",
  "--info-foreground": "oklch(1 0 0)",
  "--radius": "0.5rem",
} as const;

test.describe("Design tokens", () => {
  test(":root CSS custom properties resolve to expected values", async ({
    page,
  }) => {
    await page.goto("/");

    const actual = await page.evaluate((names) => {
      const style = getComputedStyle(document.documentElement);
      const out: Record<string, string> = {};
      for (const name of names) {
        out[name] = style.getPropertyValue(name).trim();
      }
      return out;
    }, Object.keys(expectedTokens));

    for (const [name, expected] of Object.entries(expectedTokens)) {
      expect(actual[name], `token ${name}`).toBe(expected);
    }
  });

  test("header uses --primary as its background (bg-primary class wired correctly)", async ({
    page,
  }) => {
    await page.goto("/");

    // Resolve --primary to whatever the browser computes it as (oklch(...))
    // and compare against the header's computed background-color.
    // Chromium normalizes oklch() computed values to "oklab(...)" — read both
    // from the same context so they normalize consistently.
    const { headerBg, primary } = await page.evaluate(() => {
      const root = document.documentElement;
      const header = document.querySelector("header");
      if (!header) throw new Error("no <header> element found");

      // Set a probe element to the raw var so we get the browser-normalized form.
      const probe = document.createElement("div");
      probe.style.backgroundColor = `var(--primary)`;
      document.body.appendChild(probe);
      const primary = getComputedStyle(probe).backgroundColor;
      probe.remove();

      const headerBg = getComputedStyle(header).backgroundColor;
      return { headerBg, primary };
    });

    expect(headerBg).toBe(primary);
  });
});
