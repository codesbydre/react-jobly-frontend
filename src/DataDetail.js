import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import DataCard from "./DataCard";
import "./DataDetail.css";

function DataDetail({ type }) {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getDetail() {
      if (handle) {
        const result =
          type === "companies"
            ? await JoblyApi.getCompany(handle)
            : await JoblyApi.getJob(handle);
        setData(result);

        if (type === "companies" && result.jobs) {
          setJobs(result.jobs);
        }
      }
    }
    getDetail();
  }, [handle, type]);

  if (!data) return "Loading...";

  return (
    <div className="DataDetail container">
      <h2 className="DetailHeaders">{data.name || data.title}</h2>
      <p className="DetailHeaders">{data.description || data.salary}</p>

      {type === "companies" && jobs.length > 0 && (
        <div className="list-group DataItems">
          {jobs.map((job) => (
            <DataCard key={job.id} data={job} type="jobs" />
          ))}
        </div>
      )}
    </div>
  );
}

export default DataDetail;
