import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import "./DataCard.css";

function DataCard({ data, type }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext); // Use useContext to get functions from the UserContext
  const formattedSalary = data.salary ? data.salary.toLocaleString() : null;
  const isApplied = hasAppliedToJob(data.id); // Check if the job has already been applied to

  const handleApply = async () => {
    const success = await applyToJob(data.id);
    if (!success) {
      alert("Application failed. You have already applied to this job.");
    }
  };

  return (
    <div className="DataCard list-group-item">
      <h4 className="mb-2">{data.name || data.title}</h4>

      {type === "jobs" ? (
        <>
          <h6 className="mb-1">{data.companyHandle}</h6>
          <p className="mb-1">Salary: {formattedSalary}</p>
          <p className="mb-1">Equity: {data.equity}</p>
          <button
            onClick={handleApply}
            disabled={isApplied}
            className={`apply-button fw-bold btn ${
              isApplied ? "btn-secondary" : "btn-danger"
            }`}
          >
            {isApplied ? "APPLIED" : "APPLY"}
          </button>
        </>
      ) : (
        <>
          <p className="mb-1">{data.description}</p>
          <Link
            to={`/${type}/${data.handle || data.id}`}
            className="btn btn-primary details-button"
          >
            Learn More
          </Link>
        </>
      )}
    </div>
  );
}

export default DataCard;
