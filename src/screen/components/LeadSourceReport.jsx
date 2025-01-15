import React, { useState, useEffect } from "react";

const LeadSourceReport = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 18;
  const transformedData = data && Object.keys(data).length > 0
    ? Object.keys(data).map((key) => {
        const leadStages = Object.entries(data[key]);
        const total = leadStages.reduce((sum, [, value]) => sum + value, 0);
        return {
          name: key,
          leadStages,
          total,
        };
      })
    : [];

  const columns = data && Object.keys(data).length > 0
    ? Object.keys(data[Object.keys(data)[0]])
    : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transformedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(transformedData.length / rowsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="reports-table">
      <div className="table-header">
        <h2>Lead Source Report</h2>
      </div>
      <div className="table-container">
        <div className="table">
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Lead Source</div>
            {columns.map((stage, index) => (
              <div key={index} className="table-header-cell">
                {stage}
              </div>
            ))}
            <div className="table-header-cell">Total</div>
          </div>
          {currentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="table-cell sticky-col">{row.name}</div>
              {row.leadStages.map(([stage, value], stageIndex) => (
                <div key={stageIndex} className="table-cell">
                  {value}
                </div>
              ))}
              <div className="table-cell">{row.total}</div>
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

export default LeadSourceReport;

