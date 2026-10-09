import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext();
const blocked = [];
await context.route("**/*", async route => {
  if (!["GET", "HEAD"].includes(route.request().method())) {
    blocked.push({ method: route.request().method(), path: new URL(route.request().url()).pathname });
    await route.abort("blockedbyclient");
  } else await route.continue();
});
const page = await context.newPage();
const publicConfiguration = [];
page.on("response", async response => {
  if (response.request().method() !== "GET" || !/calendar|form|widget/i.test(response.url())) return;
  if (!response.headers()["content-type"]?.includes("json")) return;
  try {
    const data = await response.json();
    const visit = (value, depth = 0) => {
      if (!value || typeof value !== "object" || depth > 6) return;
      if (value.id === "XKr1JMqpBJtxUDzeXcUK" || value.id === "f8pq4XeGu32OocBwz7ha" || value.id === "fYq3Zvb80SesdYASeP96") {
        const metadata = {};
        for (const key of ["id", "name", "locationId", "formId", "slug", "calendarType", "slotDuration", "slotDurationUnit", "timezone", "timeZone"]) {
          if (["string", "number", "boolean"].includes(typeof value[key])) metadata[key] = value[key];
        }
        publicConfiguration.push(metadata);
      }
      for (const child of Object.values(value)) visit(child, depth + 1);
    };
    visit(data);
  } catch { /* Non-JSON public assets are not inspected. */ }
});
const evidence = { mode: "read-only; non-GET/HEAD requests blocked", checks: [] };
try {
  for (const url of [
    "https://api.leadconnectorhq.com/widget/booking/XKr1JMqpBJtxUDzeXcUK",
    "https://api.leadconnectorhq.com/widget/bookings/operations-review-call",
    "https://api.wonderworkflow.com/widget/form/fYq3Zvb80SesdYASeP96",
  ]) {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.getByText(/select.*date|select.*time|30.*min|operations.*review/i).first().waitFor({ timeout: 15000 }).catch(() => {});
    const check = await page.evaluate(() => {
      const text = document.body.innerText;
      const markup = document.documentElement.outerHTML;
      return { title: document.title, text: text.slice(0, 1800),
        expectedLocationPresent: markup.includes("f1FqhGEvwZsmFiGCaGqK"),
        expectedCalendarPresent: markup.includes("XKr1JMqpBJtxUDzeXcUK"),
        expectedBookingFormPresent: markup.includes("f8pq4XeGu32OocBwz7ha"),
        oldLocationPresent: markup.includes("sNxq4o3kG3iH5yoQ71Oq"),
        oldCalendarPresent: markup.includes("tFmtpPmm23VC7ygrKxvK"),
        inputs: Array.from(document.querySelectorAll("input")).map(x => ({ type: x.type, name: x.name })) };
    });
    evidence.checks.push({ url, status: response?.status(), ...check });
  }
} catch (error) { evidence.error = error.name; }
finally {
  evidence.blockedWrites = blocked;
  evidence.publicConfiguration = publicConfiguration;
  await mkdir("output/booking", { recursive: true });
  await writeFile("output/booking/public-readonly.json", JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify(evidence, null, 2));
  await browser.close();
}
