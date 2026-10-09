import { Link } from "react-router-dom";
import { publicHref } from "./campaign";
import "./editorial-home.css";

export function ReviewLink({
  className = "ww-button",
}: {
  className?: string;
}) {
  return (
    <Link className={className} to={publicHref("/assessment")}>
      Free Business Operations Review <span aria-hidden="true">↗</span>
    </Link>
  );
}

const problems = [
  [
    "The change that never reached the crew.",
    "A decision lives in one person’s head. The team works from yesterday’s information. Time and materials go with it.",
  ],
  [
    "The handoff that leaves everyone guessing.",
    "A new shift starts without the full picture. Small gaps become repeated questions, missed work and avoidable waste.",
  ],
  [
    "The owner who holds it all together.",
    "Every answer, exception and next step comes back to you. The business needs a clearer way to keep moving.",
  ],
];
const steps = [
  [
    "See the real work.",
    "Understand what happens day to day, where information gets lost and what keeps pulling you back in.",
  ],
  [
    "Build a practical fix.",
    "Shape a simpler way of working around your team. Use the right tools, including AI where it genuinely helps.",
  ],
  [
    "Make it part of the day.",
    "Turn the process into clear routines your people can use, then refine it around what happens in practice.",
  ],
];

export default function EditorialHome({ ready }: { ready: boolean }) {
  return (
    <div className={`ww-editorial-home${ready ? " ww-editorial-ready" : ""}`}>
      <section
        className="ww-hero ww-editorial-hero"
        aria-labelledby="ww-home-heading"
      >
        <div className="ww-editorial-hero-copy">
          <p className="ww-eyebrow">Practical operations. Lasting change.</p>
          <h1 id="ww-home-heading" tabIndex={-1}>
            Your business shouldn’t need you for <em>everything.</em>
          </h1>
          <p className="ww-editorial-lede">
            Practical fixes for the everyday problems costing your team time,
            money and momentum.
          </p>
          <ReviewLink />
          <p className="ww-editorial-review-note">
            Free · 30 minutes · No obligation
          </p>
          <p className="ww-editorial-caption">
            Start with a conversation about where work gets stuck.
          </p>
        </div>
        <div className="ww-editorial-hero-visual">
          <img
            className="ww-editorial-photo"
            src="/brand/editorial/contractor-workbench.png"
            alt="Plans and tools on a contractor's workbench."
            width="896"
            height="1200"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <div className="ww-editorial-audience" aria-label="Who we work with">
        <span>For owner-led businesses</span>
        <span>Contractors / Hospitality</span>
        <span>Built around how your team actually works</span>
      </div>

      <section
        className="ww-editorial-section ww-editorial-problems"
        aria-labelledby="ww-problems-heading"
      >
        <p className="ww-eyebrow">01 / The everyday friction</p>
        <h2 id="ww-problems-heading">
          Good people shouldn’t have to work around <em>bad processes.</em>
        </h2>
        <div className="ww-editorial-three-column">
          {problems.map(([title, copy], i) => (
            <article key={title}>
              <span className="ww-editorial-index">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="who-we-help"
        className="ww-editorial-section ww-editorial-industries"
        aria-labelledby="ww-industries-heading"
      >
        <div className="ww-editorial-section-heading">
          <div>
            <p className="ww-eyebrow">02 / Who we help</p>
            <h2 id="ww-industries-heading">
              Built for the realities of your <em>working day.</em>
            </h2>
          </div>
          <p>
            On the job or between shifts, better processes help your people keep
            the work moving.
          </p>
        </div>
        <div className="ww-editorial-industry-layout">
          <div className="ww-editorial-industry-visual">
            <img
              className="ww-editorial-photo"
              src="/brand/editorial/hospitality-counter.png"
              alt="Cafe counter with shift notes, coffee equipment and supplies."
              width="896"
              height="1200"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="ww-editorial-industry-grid">
            <article id="contractors" className="ww-editorial-industry">
              <p className="ww-eyebrow">Contractors</p>
              <h3>Keep the job moving.</h3>
              <p>
                Clear job briefs, shared changes and reliable crew handoffs.
                Give the people doing the work the information they need, when
                they need it.
              </p>
              <Link
                className="ww-text-link"
                to={publicHref("/services/business-process-automation")}
              >
                Explore workflow services <span aria-hidden="true">↗</span>
              </Link>
            </article>
            <article id="hospitality" className="ww-editorial-industry">
              <p className="ww-eyebrow">Hospitality</p>
              <h3>Make every shift count.</h3>
              <p>
                Tighter stock routines, clearer responsibilities and smoother
                shift changes. Build consistency into busy days without adding
                more admin.
              </p>
              <Link
                className="ww-text-link"
                to={publicHref("/services/business-process-automation")}
              >
                Explore workflow services <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        id="our-approach"
        className="ww-editorial-section ww-editorial-approach"
        aria-labelledby="ww-approach-heading"
      >
        <p className="ww-eyebrow">03 / Our approach</p>
        <h2 id="ww-approach-heading">
          Find the friction.
          <br />
          <em>Fix the process.</em>
        </h2>
        <ol className="ww-editorial-three-column">
          {steps.map(([title, copy], i) => (
            <li key={title}>
              <span className="ww-editorial-index">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <Link className="ww-text-link" to={publicHref("/how-we-work")}>
          How we put it into practice <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section
        id="about-ian"
        className="ww-editorial-founder"
        aria-label="About Ian"
      >
        <p>
          I’m Ian. My background spans seven years in restaurant and brewery
          operations, alongside contractor and project-management experience. I
          know what it takes to keep work moving when the day doesn’t go to
          plan.
        </p>
        <div>
          <span>Ian / Founder, Wonder &amp; Workflow</span>
          <Link className="ww-text-link" to={publicHref("/about")}>
            About us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section
        className="ww-editorial-invitation"
        aria-labelledby="ww-review-heading"
      >
        <div>
          <p className="ww-eyebrow">Start with the work in front of you.</p>
          <h2 id="ww-review-heading">
            Where is your business <em>getting stuck?</em>
          </h2>
        </div>
        <div>
          <p>
            Let’s look at the handoffs, repeat problems and everyday waste that
            are costing your team time.
          </p>
          <ReviewLink />
          <p className="ww-editorial-review-note">
            Free · 30 minutes · No obligation
          </p>
          <p className="ww-editorial-caption">
            A short assessment gives us context before you choose a time.
          </p>
        </div>
      </section>
    </div>
  );
}
