import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

test.describe("Plot page - translated tab", () => {
  test.beforeEach(async ({ page }) => {
    await mockBackend(page);
    await page.goto("/plot");
    await page.getByRole("tab", { name: "Translated" }).click();
  });

  test("allele selection populates AA allele list and combined frequency label", async ({
    page,
  }) => {
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");
    await selectDropdown(page, "Allele", "01");

    await expect(
      page.getByText(/Combined frequency for .* and alleles with the same translated sequence/),
    ).toBeVisible();

    const aaTable = page.getByRole("table", {
      name: /alleles that translate to the same amino acid/i,
    });
    await expect(aaTable.getByRole("cell", { name: "IGHV1-8*01" })).toBeVisible();
    await expect(aaTable.getByRole("cell", { name: "IGHV1-8*02" })).toBeVisible();
    await expect(aaTable.getByRole("cell", { name: "IGHV1-8*04" })).toBeVisible();
  });
});
