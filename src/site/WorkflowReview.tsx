import { publicHref } from "./campaign";
import "./workflow-review.css";

function ReviewCta({ children }: { children: string }) {
  return <a className="ww-button review-cta" href={publicHref("/assessment/")}>{children}<span aria-hidden="true">↗</span></a>;
}

export default function WorkflowReview() {
  return <div className="ww-site ww-review">
    <a className="ww-skip" href="#review-main">Skip to content</a>
    <header className="review-header">
      <a className="ww-wordmark" href={publicHref("/")} aria-label="Wonder & Workflow home"><img src="/brand/emblem.png" alt="" /><span>Wonder<span className="ww-amp">&</span><br />Workflow</span></a>
    </header>
    <main id="review-main" tabIndex={-1}>
      <section className="review-hero review-section">
        
        <h1>Your business has outgrown the way it works.</h1>
        <p>Customers are being served and your team is busy. But employees still enter information twice, chase updates and bring routine decisions back to you.</p>
        <p className="review-value"><strong>We help you find where the effort is going, estimate what it costs and decide whether a simpler process is worth the investment.</strong></p>
        <ReviewCta>Find where your team loses time</ReviewCta>
        <p className="review-caption">2-minute assessment → complimentary 30-minute review<br />No software requirement. No obligation.</p>
      </section>
      <section className="review-section review-pain">
        <p className="ww-eyebrow">Where the time goes</p>
        <h2>Why does everything still come back to you?</h2>
        <p>The business works, but it takes too much effort to keep it working. Processes that suited a smaller team now depend on constant coordination.</p>
        <ul className="review-pain-list">
          <li><h3>More people, little relief</h3><p>You've hired help, but the extra communication, approvals and handoffs leave everyone just as busy.</p></li>
          <li><h3>Follow-ups that depend on memory</h3><p>A request moves forward only when someone remembers to follow up. Work is missed when that person is busy or away.</p></li>
          <li><h3>Software that still needs manual work</h3><p>You're paying for several systems while good employees spend hours copying information between them, updating spreadsheets and recreating documents.</p></li>
          <li><h3>Routine work still needs you</h3><p>Missing details, unclear responsibilities and delayed approvals keep coming back to you. Your attention becomes part of every handoff.</p></li>
        </ul>
        <p className="review-statement">Before adding more administrative headcount, understand what is consuming your current team's capacity.</p>
        <p>Your business has its own requirements. Duplicate work, missing information and manual handoffs are problems we can examine across industries.</p>
      </section>
      <section className="review-band"><div className="review-section">
        <p className="review-caption">A practical business decision</p>
        <h2>Is this process worth fixing?</h2>
        <p>We start with how the work happens today, then compare its estimated cost with the effort and expense of changing it.</p>
        <p>You may already own the software you need. We check that before proposing anything new. A clearer procedure or handoff may be enough. If the likely benefit doesn't justify a change, we'll say so.</p>
        <ReviewCta>Find out what is worth fixing</ReviewCta>
      </div></section>
      <section className="review-section">
        <p className="ww-eyebrow">Your 30-minute review</p>
        <h2>A focused review of one recurring process</h2>
        <ol className="review-steps">
          <li><h3>Choose one process</h3><p>Use the 2-minute assessment to highlight where your current way of working may no longer fit the business. Then book your review and bring one recent example.</p></li>
          <li><h3>Estimate the operational cost</h3><p>We follow the work from request to completion: who handles it, where it waits and what gets repeated. Together, we estimate the time, rework and software costs involved.</p><p>We distinguish direct cash savings, software savings, recovered staff capacity and potential revenue improvement. Time saved does not automatically reduce payroll.</p></li>
          <li><h3>Decide whether to act</h3><p>We discuss whether a change could free up team capacity, reduce missed work or make the process less dependent on you. We recommend technology, including AI, only when it suits the work.</p><p>The review identifies whether further work is worthwhile. It does not include a technical design or implementation plan. We may offer a fixed-price proposal, with no obligation to proceed.</p></li>
        </ol>
      </section>
      <section className="review-section review-fit">
        <div><h2>Who this review is for</h2><p>Owners and managers of established businesses whose growth has created more administration, software and coordination than their processes can comfortably support.</p><p>You want more capacity from the team you have and fewer routine issues coming back to you. Industry, revenue and team size are not eligibility requirements.</p></div>
        <div><h2>When it is not a fit</h2><p>This review is not for businesses seeking a predetermined technology solution or guaranteed returns without measuring the current process.</p></div>
      </section>
      <section className="review-band review-final"><div className="review-section">
        <h2>Find room to grow in the team you already have.</h2>
        <p>Start with the work that takes more effort than it should. We'll help you decide whether changing the process makes more sense than adding more resources.</p>
        <ReviewCta>Find the work slowing your team down</ReviewCta>
        <p className="review-caption">Start with the 2-minute assessment.<br />Complimentary 30-minute review · No obligation</p>
      </div></section>
    </main>
    <footer className="review-footer"><span>Wonder &amp; Workflow</span><nav aria-label="Legal"><a href={publicHref("/privacy")}>Privacy</a><a href={publicHref("/terms")}>Terms</a></nav></footer>
  </div>;
}
