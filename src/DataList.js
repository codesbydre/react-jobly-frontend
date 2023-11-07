import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import DataCard from "./DataCard";
import "./DataList.css";

function DataList({ type }) {
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  async function fetchData() {
    let result = [];
    try {
      if (type === "companies") {
        if (searchTerm.trim()) {
          result = await JoblyApi.getCompanies({ name: searchTerm });
        } else {
          result = await JoblyApi.getCompanies();
        }
      } else {
        if (searchTerm.trim()) {
          result = await JoblyApi.getJobs({ title: searchTerm });
        } else {
          result = await JoblyApi.getJobs();
        }
      }
      setDataList(result);
    } catch (e) {
      setError("Failed to fetch data");
      console.error("Failed to fetch data", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [type]);

  function handleSearch(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }

  function handleSubmitSearch() {
    fetchData();
  }

  return (
    <div className="DataList container mt-5">
      <div className="row">
        <div className="col">
          <div className="input-group mb-3 search-bar">
            <input
              type="text"
              className="form-control "
              placeholder={`Enter search term...`}
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSubmitSearch}>
                Submit
              </button>
            </div>
          </div>
          {error && <p className="error alert alert-danger">{error}</p>}
          <div className="list-group">
            {dataList.map((item) => (
              <DataCard key={item.handle || item.id} data={item} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataList;
