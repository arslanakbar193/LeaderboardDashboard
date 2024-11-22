import React, { useState } from 'react';

// Static data
const initialReportData = [
  {
    name: "Admin User",
    switch: 0,
    answer: 5,
    new: 15,
    total: 35,
    
  },
  {
    name: "Ahmad AbdulSalam",
    switch: 0,
    answer: 25,
    new: 55,
    total: 55,
    
  },
  {
    name: "Marwan",
    switch: 1,
    answer: 75,
    new: 95,
    total: 385,
    
  },
  {
    name: "Abdullah Abbas",
    switch: 0,
    answer: 15,
    new: 25,
    total: 35,
    
  },
  {
    name: "Ahmad Beah",
    switch: 5,
    answer: 5,
    new: 15,
    total: 35,
    
  },
  {
    name: "Ahmad Agiza",
    switch: 0,
    answer: 6,
    new: 85,
    total: 385,
    
  },
  {
    name: "Mohammad Helal",
    switch: 0,
    answer: 45,
    new: 7,
    total: 65,
    
  },
  {
    name: "Mohammad Ismail",
    switch: 7,
    answer: 7,
    new: 145,
    total: 75,
    
  },
  {
    name: "Yasmin",
    switch: 0,
    answer: 53,
    new: 35,
    total: 25,
    
  },
  {
    name: "Ahmad Aslam",
    switch: 0,
    answer: 54,
    new: 105,
    total: 45,
    
  },
  {
    name: "Sheikh",
    switch: 0,
    answer: 5,
    new: 0,
    total: 5,
    
  },
  
  
];

const AgentReportsTable = () => {
  // Set pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = initialReportData.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination control
  const totalPages = Math.ceil(initialReportData.length / rowsPerPage);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="reports-table">
      <div className="table-header">
        <h2>Agent Lead Report</h2>
        
      </div>

      <div className="table-container">
        <div className="table agent-table">
          {/* Render table header */}
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Agent</div>
            <div className="table-header-cell">Switched Off</div>
            <div className="table-header-cell">No Answer</div>
            <div className="table-header-cell">New</div>
            <div className="table-header-cell">Total</div>
            
          </div>

          {/* Render table rows */}
          {currentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="table-cell sticky-col">{row.name}</div>
              <div className="table-cell">{row.switch}</div>
              <div className="table-cell">{row.answer}</div>
              <div className="table-cell">{row.new}</div>
              <div className="table-cell">{row.total}</div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>



    </div>
  );
};

export default AgentReportsTable;
