import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { CompanyMark } from "../components/JobCard";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    getJob();
  }, []);

  async function getJob() {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!job) return <p className="empty">Loading role…</p>;

  return (
    <>
      <Link to="/jobs" className="back">Back to all roles</Link>
      <div className="details">
        <div className="details-head">
          <CompanyMark name={job.company} size="lg" />
          <div>
            <h1>{job.title}</h1>
            <p className="company">{job.company}</p>
          </div>
        </div>

        <dl className="facts">
          <div><dt>Salary</dt><dd>{job.salary} LPA</dd></div>
          <div><dt>Location</dt><dd>{job.location}</dd></div>
          <div><dt>Job type</dt><dd>{job.type}</dd></div>
        </dl>

        <h3>About the role</h3>
        <p>{job.description}</p>
      </div>
    </>
  );
}

export default JobDetails;