import { Link, useLocation } from "react-router-dom";
export function DiagnosticIntakeForm() {
  const { search } = useLocation();
  return (
    <div className="ww-diagnostic-embed">
      <p>Tell us where everyday operations are costing your team time.</p>
      <Link className="ww-button" to={`/assessment${search}`}>
        Start your operations assessment
      </Link>
    </div>
  );
}
