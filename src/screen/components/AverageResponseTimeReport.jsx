import React, { useState } from "react";

const AverageResponseTimeReport = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 18;

  const transformedData = data && data.Agents
    ? data.Agents.map((agent) => {
        const totalSeconds = agent.Leads.reduce((acc, lead) => {
          const [months, days, hours, minutes, seconds] = lead.Average_Response_Time.split(", ");
          const monthsInSeconds = parseInt(months.split(" ")[0]) * 30 * 24 * 60 * 60;
          const daysInSeconds = parseInt(days.split(" ")[0]) * 24 * 60 * 60;
          const hoursInSeconds = parseInt(hours.split(" ")[0]) * 60 * 60;
          const minutesInSeconds = parseInt(minutes.split(" ")[0]) * 60;
          const secondsInTotal = parseInt(seconds.split(" ")[0]);
          return acc + monthsInSeconds + daysInSeconds + hoursInSeconds + minutesInSeconds + secondsInTotal;
        }, 0);

        const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
        const remainingDays = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
        const remainingHours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const remainingSeconds = Math.floor(totalSeconds % 60);

        const totalResponseTime = `${months} months, ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;

        return {
          Agent_Name: agent.Agent_Name,
          Number_Of_Leads: agent.Leads.length,
          Total_Response_Time: totalResponseTime,
        };
      })
    : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transformedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(transformedData.length / rowsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (!data || !data.Agents || data.Agents.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="reports-table">
      <h2>Average Response Time Report</h2>
      <div className="table-container">
        <div className="table">
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Users</div>
            <div className="table-header-cell">Number Of Leads</div>
            <div className="table-header-cell">Total Response Time</div>
          </div>
          {currentRows.map((row, index) => (
            <div key={index} className="table-row">
              <div className="table-cell sticky-col">{row.Agent_Name}</div>
              <div className="table-cell">{row.Number_Of_Leads}</div>
              <div className="table-cell">{row.Total_Response_Time}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AverageResponseTimeReport;
