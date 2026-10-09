import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("native editorial homepage, accessible layouts and primary review CTAs", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir("output/redesign/qa", { recursive: true });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width > 600 ? 900 : 844 });
    await page.goto(
      "/?utm_source=qa&utm_medium=local&utm_campaign=redesign&utm_content=homepage&utm_term=operations",
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Your business shouldn.t need you for everything\./,
    );
    await expect(
      page.getByText(
        "Practical fixes for the everyday problems costing your team time, money and momentum.",
        { exact: true },
      ),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, `homepage at ${width}px`).toEqual([]);
    for (const source of [
      "contractor-workbench.png",
      "hospitality-counter.png",
    ]) {
      const photo = page.locator(`main img[src$="${source}"]`);
      await photo.scrollIntoViewIfNeeded();
      await expect(photo).toBeVisible();
      await expect
        .poll(() =>
          photo.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth === 896,
          ),
        )
        .toBe(true);
    }
    await expect(
      page.locator(".ww-editorial-home img[src='/brand/emblem.png']"),
    ).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `output/redesign/qa/home-${width}.png`,
      fullPage: true,
    });
    const ctas = page
      .locator("main")
      .getByRole("link", { name: "Free Business Operations Review" });
    await expect(ctas).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      const url = new URL(
        (await ctas.nth(i).getAttribute("href")) || "",
        "http://127.0.0.1:4173",
      );
      expect(url.pathname).toBe("/assessment");
      expect([...url.searchParams.keys()]).toEqual([
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ]);
    }
    await ctas.first().click();
    await expect(page).toHaveURL(/\/assessment\?utm_source=qa/);
    await expect(page.locator(".assessment-calendar")).toHaveCount(0);
  }
});

test("homepage navigation scrolls to real sections and mobile Escape restores focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu +" });
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Who we help" })
    .click();
  await expect(page).toHaveURL(/#who-we-help$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(
    await page
      .locator("#who-we-help")
      .evaluate((el) => Math.abs(el.getBoundingClientRect().top) < 80),
  ).toBe(true);
});
