import { test, expect, Page } from "@playwright/test";

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

type Oklab = [L: number, a: number, b: number];

// Colours are compared as colours, not as strings, because the compiled colour
// space depends on the bundler's CSS minifier rather than on the tokens. The
// webpack pipeline emitted the authored oklch(); Turbopack's lightningcss emits
// a hex fallback plus lab(). Those resolve to the same rendered colour, so
// string comparison would test the minifier instead of globals.css.
//
// Both sides are converted through the browser's relative colour syntax, so any
// input colour space normalises the same way. oklab rather than oklch because
// hue is numerically unstable at the near-zero chroma several of these tokens
// use — --background's hue moves 0.29° from serialization rounding alone, while
// its oklab coordinates move by 2e-5.
async function resolveOklab(
  page: Page,
  colors: string[],
): Promise<(Oklab | null)[]> {
  return page.evaluate((cssColors) => {
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const out = cssColors.map((color) => {
      // Reset first: an invalid colour leaves the previous value in place,
      // which would silently compare the wrong token.
      probe.style.color = "";
      probe.style.color = `oklab(from ${color} l a b)`;
      const m = getComputedStyle(probe).color.match(
        /^oklab\(\s*(-?[\d.e-]+)\s+(-?[\d.e-]+)\s+(-?[\d.e-]+)/i,
      );
      return m
        ? ([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])] as Oklab)
        : null;
    });
    probe.remove();
    return out;
  }, colors);
}

// Serialization rounding between colour spaces moves oklab coordinates by up to
// ~1.5e-4. A token actually changing value moves them by 1e-2 or more, so this
// separates the two comfortably.
const OKLAB_TOLERANCE = 1e-3;

// Parse a CSS length ("0.5rem", ".5rem", "16px") into {value, unit}. Chromium
// 132+ drops leading zeros, so string equality doesn't survive re-serialization.
function parseLength(s: string): { value: number; unit: string } {
  const m = s.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (!m) throw new Error(`not a parseable length: "${s}"`);
  return { value: parseFloat(m[1]), unit: m[2] };
}

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

    const colorNames = Object.keys(expectedTokens).filter((n) =>
      expectedTokens[n as keyof typeof expectedTokens].startsWith("oklch("),
    );

    // Resolve actual and expected in a single page call so both normalise
    // through the same browser instance.
    const resolved = await resolveOklab(page, [
      ...colorNames.map((n) => actual[n]),
      ...colorNames.map(
        (n) => expectedTokens[n as keyof typeof expectedTokens],
      ),
    ]);
    const actualLab = resolved.slice(0, colorNames.length);
    const expectedLab = resolved.slice(colorNames.length);

    colorNames.forEach((name, i) => {
      const a = actualLab[i];
      const e = expectedLab[i];
      expect(e, `expected token ${name} is not a valid colour`).not.toBeNull();
      expect(
        a,
        `token ${name} did not resolve to a colour (got "${actual[name]}")`,
      ).not.toBeNull();

      const labels = ["L", "a", "b"] as const;
      a!.forEach((v, j) => {
        expect(
          Math.abs(v - e![j]),
          `token ${name} ${labels[j]}: expected ${e![j]}, got ${v}`,
        ).toBeLessThan(OKLAB_TOLERANCE);
      });
    });

    for (const [name, expected] of Object.entries(expectedTokens)) {
      if (expected.startsWith("oklch(")) continue;
      const a = parseLength(actual[name]);
      const e = parseLength(expected);
      expect(a.value, `token ${name} value`).toBeCloseTo(e.value, 4);
      expect(a.unit, `token ${name} unit`).toBe(e.unit);
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
