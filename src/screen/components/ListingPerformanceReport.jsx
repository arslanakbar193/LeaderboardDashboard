import React, { useState, useEffect } from "react";
const ListingPerformanceReport = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 18;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = (data.Units || []).slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil((data.Units || []).length / rowsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  
  return (
    <div className="reports-table">
      <div className="table-header">
        <h2>Listing Performance Report</h2>
      </div>
      <div className="table-container">
        <div className="table">
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Unit Ref No</div>
            <div className="table-header-cell">Listing Agent</div>
            <div className="table-header-cell">Total Leads</div>
            <div className="table-header-cell">Total Viewings</div>
            <div className="table-header-cell">Total Offers</div>
          </div>
          {currentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="table-cell sticky-col">{row.UnitRefNo}</div>
              <div className="table-cell">{row.Agent}</div> 
              <div className="table-cell">{row.Leads}</div> 
              <div className="table-cell">{row.Viewings}</div> 
              <div className="table-cell">{row.Offers}</div>
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


export default ListingPerformanceReport;
