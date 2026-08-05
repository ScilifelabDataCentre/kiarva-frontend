import { Page, expect } from "@playwright/test";

/**
 * The dropdown in DropdownComponent.tsx is a CSS `group-hover:visible` menu.
 * In headed mode a stray physical mouse movement can steal the hover state
 * mid-test, so we invoke the option button's onClick directly rather than
 * relying on the menu staying visually visible between hover and click.
 */
export async function selectDropdown(
  page: Page,
  label: string,
  option: string,
) {
  const trigger = page.getByRole("button", { name: label, exact: true });
  await trigger.scrollIntoViewIfNeeded();
  const group = trigger.locator("xpath=..");
  // Hover briefly to nudge the menu open — this makes React attach the option
  // buttons (React 19 defers some interactive listeners until first interaction).
  await group.hover();
  const optionButton = group
    .getByRole("listbox")
    .locator("button")
    .filter({ hasText: new RegExp(`^${escapeRegExp(option)}$`) });
  await expect(optionButton).toBeAttached();
  // dispatchEvent bypasses the "is this visible right now" check, so the click
  // still fires even if the physical mouse cursor steals the CSS :hover state
  // mid-test (which is what causes headed+slowmo runs to get stuck).
  await optionButton.dispatchEvent("click");
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
