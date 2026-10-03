import { Link } from "react-router-dom";

const TINTS = ["#E4DEFF", "#FFE9A8", "#D5F0E4", "#FFD9D2", "#D6E6FF"];

export function CompanyMark({ name = "?", size = "" }) {
  const tint = TINTS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];
  return <span className={`mark ${size}`} style={{ background: tint }}>{name.slice(0, 2)}</span>;
}

// Seeker: pass isSaved + onToggleSave  |  Employer: pass onDelete + showEdit
function JobCard({ job, isSaved, onToggleSave, onDelete, showEdit }) {
  return (
    <article className="job">
      <CompanyMark name={job.company} />

      <div className="job-main">
        <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
        <p className="job-meta"><span>{job.company}</span><span>{job.location}</span></p>
        <span className="badge">{job.type}</span>
      </div>

      <div className="job-pay"><strong>{job.salary}</strong><span>LPA</span></div>

      <div className="card-actions">
        {onToggleSave && (
          <button className={`save-btn ${isSaved ? "on" : ""}`} onClick={() => onToggleSave(job.id)}>
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
        {showEdit && <Link className="edit-btn" to={`/edit-job/${job.id}`}>Edit</Link>}
        {onDelete && <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>}
        <Link className="view-btn" to={`/jobs/${job.id}`}>View role</Link>
      </div>
    </article>
  );
}

export default JobCard;