import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

test.describe("MSA viewer", () => {
  test.beforeEach(async ({ page }) => {
    await mockBackend(page);
    await page.goto("/msa");
  });

  test("gene selection renders nucleotide + translated alignments for all alleles", async ({
    page,
  }) => {
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");

    await expect(
      page.getByText(/Sequence alignments for IGHV1-8/i),
    ).toBeVisible();

    // Both alignment section headings render
    await expect(
      page.getByRole("heading", { name: "Nucleotide sequence alignment" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Translated sequence alignment" }),
    ).toBeVisible();

    // All three alleles appear (labels in the MSA rows)
    await expect(page.getByText("IGHV1-8*01").first()).toBeVisible();
    await expect(page.getByText("IGHV1-8*02").first()).toBeVisible();
    await expect(page.getByText("IGHV1-8*04").first()).toBeVisible();
  });
});
