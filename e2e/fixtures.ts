import { test as base, expect } from "@playwright/test";

// Local QA must never invoke live widgets, attribution, or provider APIs.
// Individual tests can still install explicit page-level fake-provider routes.
export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.hostname === "127.0.0.1" || url.hostname === "localhost") {
        await route.continue();
      } else {
        await route.abort("blockedbyclient");
      }
    });
    await use(context);
  },
});

export { expect };
export type { Page } from "@playwright/test";
