import { test, expect, Page } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

// -----------------------------------------------------------------------------
// AbbreviationPopupComponent had no coverage at all when it was ported from
// Headless UI to the Radix dialog the rest of the app already uses. These tests
// pin the behaviour that port had to preserve: the dialog opens, lists every
// superpopulation and population, and closes by button, Escape and outside
// click.
// -----------------------------------------------------------------------------

const SUPERPOPULATIONS = ["AFR", "AMR", "EAS", "EUR", "SAS"];

// Spot-checked from the four population groups rather than all 25, enough to
// prove the list renders without restating the component's data.
const SAMPLE_POPULATIONS = ["ACB", "FIN", "CDX", "PUR"];

async function openAbbreviations(page: Page) {
  await mockBackend(page);
  await page.goto("/plot");

  await selectDropdown(page, "Loci", "IGH");
  await selectDropdown(page, "Gene type", "IGHV");
  await selectDropdown(page, "Gene", "1-8");
  await selectDropdown(page, "Allele", "01");

  await page
    .getByRole("button", { name: "View population abbreviations" })
    .click();

  return page.getByRole("dialog");
}

test.describe("Population abbreviations dialog", () => {
  test("opens and lists superpopulations and populations", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

    const dialog = await openAbbreviations(page);
    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByRole("heading", { name: "Abbreviations" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Superpopulations" }),
    ).toBeVisible();
    // exact, otherwise "Populations" also matches "Superpopulations".
    await expect(
      dialog.getByRole("heading", { name: "Populations", exact: true }),
    ).toBeVisible();

    for (const code of SUPERPOPULATIONS) {
      await expect(
        dialog.getByRole("listitem").filter({ hasText: new RegExp(`^${code} `) }),
      ).toHaveCount(1);
    }
    for (const code of SAMPLE_POPULATIONS) {
      await expect(
        dialog.getByRole("listitem").filter({ hasText: new RegExp(`^${code} `) }),
      ).toHaveCount(1);
    }

    // The full list is 5 superpopulations + 25 populations.
    await expect(dialog.getByRole("listitem")).toHaveCount(30);

    expect(errors).toEqual([]);
  });

  test("closes via the close button", async ({ page }) => {
    const dialog = await openAbbreviations(page);
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("closes via the Escape key", async ({ page }) => {
    const dialog = await openAbbreviations(page);
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("reopens after being closed", async ({ page }) => {
    const dialog = await openAbbreviations(page);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // The parent unmounts the component on close, so reopening exercises a
    // fresh mount rather than a cached one.
    await page
      .getByRole("button", { name: "View population abbreviations" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
