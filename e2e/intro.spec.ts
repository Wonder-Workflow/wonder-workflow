import { test, expect } from "./fixtures";

test("intro plays automatically, skips, and repeats on a fresh page load", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator(".ww-launch-intro video");
  await expect(video).toBeVisible();
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator(".ww-launch-intro")).toHaveCount(0);
  await expect(
    page.locator(".ww-hero").getByRole("link", { name: "Free Business Operations Review" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".ww-launch-intro video")).toBeVisible();
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator(".ww-launch-intro")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Play logo film" }),
  ).toHaveCount(0);
});

test("intro finishes naturally and reduced motion or failed video never blocks content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".ww-launch-intro video")).toBeVisible();
  await expect(page.locator(".ww-launch-intro")).toHaveCount(0, { timeout: 12000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services");
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.locator(".ww-hero h1")).toBeVisible();
});

test("failed intro reveals the website", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/brand/launch.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".ww-launch-intro")).toHaveCount(0, { timeout: 12000 });
  await expect(page.locator(".ww-hero h1")).toBeVisible();
});

test("Escape dismisses the intro", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".ww-launch-intro video")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".ww-launch-intro")).toHaveCount(0);
  await expect(page.locator(".ww-hero h1")).toBeVisible();
});
