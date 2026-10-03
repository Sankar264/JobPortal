import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./aidashboard.css";

const SAMPLE = [
  { id: 1, title: "React Developer", company: "TechNova", location: "Hyderabad", salary: 8, match: 96 },
  { id: 2, title: "Python Backend Engineer", company: "CodeCraft", location: "Bengaluru", salary: 12, match: 91 },
  { id: 3, title: "UI Designer", company: "PixelHub", location: "Remote", salary: 6, match: 88 },
];
const STATUS = [["Applied", 24, 150, "#8B5CF6"], ["Viewed", 15, 110, "#3B82F6"], ["Interview", 6, 72, "#22D3EE"], ["Offer", 2, 38, "#F472B6"]];
const FOLDERS = [["Design CV", "4 files", "#C084FC", "#6D28D9"], ["Developer CV", "7 files", "#60A5FA", "#1D4ED8"], ["Cover letters", "12 files", "#F9A8D4", "#BE185D"]];

export default function AIDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(SAMPLE);
  const [q, setQ] = useState("");

  useEffect(() => {
    document.body.classList.add("aid-body");
    return () => document.body.classList.remove("aid-body");
  }, []);

  useEffect(() => {
    api.get("/jobs")
      .then((r) => { if (r.data.length) setJobs(r.data.slice(0, 4).map((j) => ({ ...j, match: 80 + ((Number(j.id) || 1) * 7) % 19 }))); })
      .catch(() => {});
  }, []);

  function search(e) { e.preventDefault(); navigate("/jobs"); }

  return (
    <div className="aid">
      <div className="aid-bento">
        {/* SEARCH + 3D MAGNIFIER */}
        <section className="aid-card aid-search" style={{ "--d": "0s" }}>
          <p className="aid-eyebrow">Welcome back{user?.name ? `, ${user.name}` : ""}</p>
          <h1>Find roles that fit you, <span>faster.</span></h1>
          <form className="aid-bar" onSubmit={search}>
            <span className="aid-ai">AI</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try: React developer in Hyderabad, 10+ LPA" />
            <button>Search</button>
          </form>
          <div className="aid-chips"><i>Remote</i><i>10+ LPA</i><i>Internship</i><i>Full-time</i></div>
          <div className="aid-mag" aria-hidden="true"><span className="lens" /><span className="handle" /></div>
        </section>

        {/* STAT */}
        <section className="aid-card aid-stat" style={{ "--d": ".08s" }}>
          <p className="aid-label">Applications</p>
          <strong>24</strong>
          <span className="aid-up">+6 this week</span>
          <svg viewBox="0 0 100 44" preserveAspectRatio="none"><defs><linearGradient id="spk" x1="0" x2="1"><stop offset="0" stopColor="#38BDF8" /><stop offset="1" stopColor="#C084FC" /></linearGradient></defs>
            <polyline points="0,38 18,30 36,34 54,18 72,22 100,6" fill="none" stroke="url(#spk)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </section>

        {/* 3D FOLDERS */}
        <section className="aid-card aid-folders" style={{ "--d": ".16s" }}>
          <p className="aid-label">Resumes</p>
          {FOLDERS.map(([n, c, c1, c2]) => (
            <div className="aid-frow" key={n}>
              <div className="fold" style={{ "--c1": c1, "--c2": c2 }}><b className="sheet" /><b className="body" /></div>
              <div><h3>{n}</h3><span>{c}</span></div>
            </div>
          ))}
        </section>

        {/* ISOMETRIC CHART */}
        <section className="aid-card aid-chart" style={{ "--d": ".24s" }}>
          <p className="aid-label">Application status</p>
          <div className="iso-wrap">
            <div className="iso">
              {STATUS.map(([n, v, h, c]) => (
                <div className="bar" key={n} style={{ "--h": h + "px", "--c": c }}><i className="f top" /><i className="f front" /><i className="f side" /></div>
              ))}
            </div>
          </div>
          <div className="aid-legend">
            {STATUS.map(([n, v, h, c]) => (<div key={n}><i style={{ background: c }} /><span>{n}</span><b>{v}</b></div>))}
          </div>
        </section>

        {/* AI MATCH RING */}
        <section className="aid-card aid-match" style={{ "--d": ".32s" }}>
          <p className="aid-label">Top AI match</p>
          <div className="aid-ring">
            <svg viewBox="0 0 100 100"><defs><linearGradient id="rg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#A855F7" /><stop offset="1" stopColor="#38BDF8" /></linearGradient></defs>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="9" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#rg)" strokeWidth="9" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="21" transform="rotate(-90 50 50)" /></svg>
            <strong>92%</strong>
          </div>
          <span className="aid-sub">{jobs[0].title}</span>
        </section>

        {/* INTERVIEW */}
        <section className="aid-card aid-next" style={{ "--d": ".4s" }}>
          <p className="aid-label">Next interview</p>
          <h3>Tomorrow, 11:00 AM</h3>
          <span className="aid-sub">{jobs[0].company}, {jobs[0].location}</span>
          <div className="aid-prog"><i /></div>
        </section>

        {/* RECOMMENDED */}
        <section className="aid-card aid-jobs" style={{ "--d": ".48s" }}>
          <p className="aid-label">Recommended for you</p>
          {jobs.map((j) => (
            <div className="aid-job" key={j.id} onClick={() => navigate(`/jobs/${j.id}`)}>
              <span className="aid-mono">{j.company.slice(0, 2)}</span>
              <div><h3>{j.title}</h3><span>{j.company}, {j.location}</span></div>
              <em>{j.match}% match</em>
              <b>{j.salary} LPA</b>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}