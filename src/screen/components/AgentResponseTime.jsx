import React, { useState } from 'react';

// Static data
const initialReportData = [
  {
    name: "Admin User",
    switch: 0,
    answer: 5,
    
    
  },
  {
    name: "Ahmad AbdulSalam",
    switch: 0,
    answer: 25,
    
    
  },
  {
    name: "Marwan",
    switch: 1,
    answer: 75,
    
    
  },
  {
    name: "Abdullah Abbas",
    switch: 0,
    answer: 15,
    
    
  },
  {
    name: "Ahmad Beah",
    switch: 5,
    answer: 5,
   
    
  },
  {
    name: "Ahmad Agiza",
    switch: 0,
    answer: 6,
   
    
  },
  {
    name: "Mohammad Helal",
    switch: 0,
    answer: 45,
    
    
  },
  {
    name: "Mohammad Ismail",
    switch: 7,
    answer: 7,
    
    
  },
  {
    name: "Yasmin",
    switch: 0,
    answer: 53,
    
    
  },
  {
    name: "Ahmad Aslam",
    switch: 0,
    answer: 54,
    
    
  },
  {
    name: "Sheikh",
    switch: 0,
    answer: 5,
  },
  
  
];

const AgentResponseTable = () => {
  // Set pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 18;

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
        <h2>Response Time Report</h2>
        
      </div>

      <div className="table-container">
        <div className="table response-table">
          {/* Render table header */}
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Users</div>
            <div className="table-header-cell">Number Of Leads</div>
            <div className="table-header-cell">Avg Response Time</div>
            
          </div>

          {/* Render table rows */}
          {currentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="table-cell sticky-col">{row.name}</div>
              <div className="table-cell">{row.switch}</div>
              <div className="table-cell">{row.answer}</div>
              
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

export default AgentResponseTable;
