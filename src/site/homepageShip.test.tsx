import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomepageShip } from "./HomepageShip";
import { guides, services } from "./SearchContent";
import Website from "./Website";
import {
  ASSESS_BEAT_LABEL,
  ASSESS_CLOSE,
  AUTOMATION_BODY,
  AUTOMATION_H2,
  AUTOMATION_TRUTH,
  FEEL_FACE,
  FEEL_SUPPORT,
  FIT_REVIEW_LINE,
  HOMEPAGE_MEDIA,
  UNDERSTAND_H2,
  UNDERSTAND_LEAD,
  UNDERSTAND_STEPS,
  WHO_FOR_BODY,
  WHO_FOR_HEADING,
} from "./publicOffer";

const root = process.cwd();

function renderHome() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Website />
    </MemoryRouter>,
  );
}

function homepageAssessLinks() {
  return Array.from(document.querySelectorAll('a[href="/assessment"]')).filter(
    (link) => /assess|fit review/i.test(link.textContent ?? ""),
  );
}

describe("Homepage ship chapter", () => {
  it("locks Reed Feel / Understand / Assess copy and photography", () => {
    render(
      <MemoryRouter>
        <HomepageShip />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: FEEL_FACE })).toBeVisible();
    expect(screen.getByText(FEEL_SUPPORT)).toBeVisible();
    expect(
      screen.getByRole("heading", { name: UNDERSTAND_H2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(UNDERSTAND_LEAD)).toBeInTheDocument();
    for (const step of UNDERSTAND_STEPS) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
    expect(document.querySelector(".ship-close-lines")?.textContent).toContain(
      ASSESS_CLOSE[0],
    );
    expect(document.querySelector(".ship-close-lines")?.textContent).toContain(
      ASSESS_CLOSE[1],
    );
    expect(screen.getByText(FIT_REVIEW_LINE)).toBeInTheDocument();

    const hero = document.querySelector<HTMLImageElement>(".ship-feel-hero");
    expect(hero).toBeTruthy();
    expect(hero).toHaveAttribute("src", HOMEPAGE_MEDIA.feel);
    expect(hero?.getAttribute("src")).toContain("warehouse-pace-web.jpg");

    const srcs = Array.from(document.querySelectorAll("img")).map(
      (img) => img.getAttribute("src") ?? "",
    );
    expect(srcs).toContain(HOMEPAGE_MEDIA.desk);
    expect(srcs).toContain(HOMEPAGE_MEDIA.field);
    expect(srcs).toContain(HOMEPAGE_MEDIA.shop);
    expect(srcs).toContain(HOMEPAGE_MEDIA.pile);
    expect(srcs.some((src) => src.includes("role-tile-office.svg"))).toBe(false);
    expect(document.body.textContent).not.toContain("\u2014");
    expect(document.body.innerHTML).not.toContain("#56438a");

    expect(document.querySelector(".ship-step-num")).toBeNull();
    expect(document.querySelector(".ship-steps")?.textContent ?? "").not.toMatch(
      /\b0[123]\b/,
    );
    expect(
      document.querySelectorAll("[data-beat]").length,
    ).toBe(3);
    for (const beat of ["feel", "understand", "assess"]) {
      expect(document.querySelector(`[data-beat="${beat}"]`)).toBeTruthy();
    }
  });

  it("keeps automation after the chapter and never leads with AI", () => {
    const source = readFileSync(
      join(root, "src/site/HomepageShip.tsx"),
      "utf8",
    );
    const offer = readFileSync(join(root, "src/site/publicOffer.ts"), "utf8");
    expect(source.indexOf("{FEEL_FACE}")).toBeLessThan(
      source.indexOf("{AUTOMATION_H2}"),
    );
    expect(source).toContain("{AUTOMATION_BODY}");
    expect(source).toContain("{AUTOMATION_TRUTH}");
    expect(offer).toContain(AUTOMATION_BODY);
    expect(offer).toContain(AUTOMATION_TRUTH);
    expect(source).not.toMatch(/AI makes you money|chatbot pitch|robot/i);
    expect(source).not.toContain("OwnershipPathScroll");
  });

  it("keeps the Feel photo in normal flow with a viewport min-height", () => {
    const css = readFileSync(join(root, "src/site/homepage-ship.css"), "utf8");
    const media = css.match(/\.ship-feel-media\s*\{[^}]*\}/)?.[0] ?? "";
    const hero = css.match(/\.ship-feel-hero\s*\{[^}]*\}/)?.[0] ?? "";
    expect(media).not.toMatch(/position:\s*absolute/);
    expect(hero).toMatch(/min-height:\s*min\(\s*100vh\s*,/);
    expect(hero).toMatch(/object-fit:\s*cover/);
    expect(css).not.toMatch(/position:\s*sticky/);
    expect(css).not.toMatch(/340vh/);
  });

  it("flows Feel, Understand, and Assess without a sticky scrub chapter", () => {
    const source = readFileSync(
      join(root, "src/site/HomepageShip.tsx"),
      "utf8",
    );
    const css = readFileSync(join(root, "src/site/homepage-ship.css"), "utf8");
    expect(css).not.toMatch(/position:\s*sticky/);
    expect(css).not.toMatch(/340vh/);
    expect(css).not.toMatch(/\.ship-beat\s*\{[^}]*position:\s*absolute/);
    expect(css).not.toMatch(/\.ship-beat\s*\{[^}]*opacity:\s*0/);
    expect(source).not.toContain("translate3d");
    expect(source).not.toContain("progressFromScroll");
    expect(source).not.toContain("ship-step-num");
  });

  it("uses an accent fill and ink label for the paper-header Assess control at rest", () => {
    const css = readFileSync(join(root, "src/site/website.css"), "utf8");
    const rest = css.match(/\.ww-header-assess\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rest).toMatch(/background:\s*#7ba1af/i);
    expect(rest).toMatch(/color:\s*#20232b\s*!important/i);
    expect(rest).not.toMatch(/:hover/);
  });

  it("paints the Assess button label in accent on the ink fill at rest", () => {
    const css = readFileSync(join(root, "src/site/homepage-ship.css"), "utf8");
    const rest = css.match(/\.ship a\.ship-btn-primary\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rest).toMatch(/background:\s*(var\(--ww-ink\)|#20232b)/i);
    expect(rest).toMatch(/color:\s*(var\(--ww-accent\)|#7ba1af)/i);
    expect(rest).not.toMatch(/:hover/);
  });
});

const MARKETING_PATHS = [
  "/",
  "/services",
  "/how-we-work",
  "/about",
  "/guides",
  "/start",
  "/privacy",
  "/terms",
  "/contact",
  "/case-studies/operations-assessment",
  ...services.map((service) => `/services/${service.slug}`),
  ...guides.map((guide) => `/guides/${guide.slug}`),
];

function decorativeStepNumerals() {
  return Array.from(document.querySelectorAll("p, span, li")).flatMap((el) => {
    if (el.children.length > 0) return [];
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    return /^0\d$/.test(text) || /^0\d\s*\//.test(text) ? [text] : [];
  });
}

describe("Homepage ship page chrome", () => {
  it("approved review CTAs preserve the assessment route and secondary contact links", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1, name: /shouldn.t need you for everything/i })).toBeVisible();
    const main = document.querySelector("main")!;
    const reviews = Array.from(main.querySelectorAll('a[href="/assessment"]'));
    expect(reviews).toHaveLength(2);
    expect(reviews.every(link => link.textContent?.includes("Free Business Operations Review"))).toBe(true);
    expect(screen.getByRole("link", { name: /Let's talk/i })).toHaveAttribute("href", "/assessment");
    expect(screen.getByRole("link", { name: "Chat with us" })).toHaveAttribute("href", "mailto:operations@wonderworkflow.com");
    expect(screen.getByRole("link", { name: "Work with us" })).toHaveAttribute("href", "mailto:operations@wonderworkflow.com");
  });

  it("approved homepage addresses contractors and hospitality without losing service links", () => {
    renderHome();
    expect(screen.getByRole("heading", { name: "Keep the job moving." })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Make every shift count." })).toBeVisible();
    const links = screen.getAllByRole("link", { name: /Explore workflow services/i });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute("href", "/services/business-process-automation");
    expect(document.getElementById("our-approach")).toBeTruthy();
    expect(document.getElementById("about-ian")).toHaveTextContent("seven years in restaurant and brewery operations");
    expect(document.querySelector(".ww-operating-scene")).toBeNull();
    expect(document.querySelector(".ops-chapter")).toBeNull();
  });

  it("drops decorative 01/02/03 eyebrows and step numerals on marketing pages", () => {
    for (const path of MARKETING_PATHS) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[path]}>
          <Website />
        </MemoryRouter>,
      );
      expect(decorativeStepNumerals(), path).toHaveLength(path === "/" ? 9 : 0);
      expect(document.querySelector(".ship-step-num"), path).toBeNull();
      expect(document.querySelector(".ww-step-index"), path).toBeNull();
      unmount();
    }
  });

  it("commits optimized homepage media and attribution, not original rasters", () => {
    const dir = join(root, "public/brand/homepage-ship");
    for (const file of [
      "warehouse-pace-web.jpg",
      "desk-papers-web.jpg",
      "field-van-web.jpg",
      "shop-floor-web.jpg",
      "schedule-board-web.jpg",
      "ATTRIBUTION.md",
    ]) {
      expect(existsSync(join(dir, file)), file).toBe(true);
    }
    expect(existsSync(join(dir, "warehouse-pace.jpg"))).toBe(false);
    const attribution = readFileSync(join(dir, "ATTRIBUTION.md"), "utf8");
    expect(attribution).toContain("Unsplash");
    expect(attribution).toContain("Ruchindra Gunasekara");
    expect(existsSync(join(root, "public/fonts/InstrumentSerif-Regular.woff2"))).toBe(true);
  });

  it("sets a paper html and body background before the dark app shell can flash", () => {
    const html = readFileSync(join(root, "index.html"), "utf8");
    expect(html).toMatch(
      /<style>html,body\{background-color:#F2F0E9\}<\/style>/,
    );
    expect(html.indexOf("<style>html,body{background-color:#F2F0E9}</style>")).toBeLessThan(
      html.indexOf("</head>"),
    );
    const appCss = readFileSync(join(root, "src/styles/app.css"), "utf8");
    const rootBlock = appCss.match(/:root\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rootBlock).not.toMatch(/background:\s*#0b0b0b/i);
    expect(appCss).toMatch(/\.app\s*\{[^}]*background:\s*#0b0b0b/i);
  });
});
