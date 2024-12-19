import React, { useState } from 'react';

// Static data
const initialReportData = [
  {
    name: "Meta Creek EGY Event R",
    profile: "36",
    rank: "5",
    totalDeals: 15,
    totalCalls: 35,
    totalViewings: 65,
    totalListings: 12,
    totalEarning: "3.4M",
    status: "Total Deals",
    icon: "dollar", // Replace with actual icon source if needed
    icondollar: "dollarcoin", // Replace with actual icon source if needed
    iconlabel: "iconlabel", // Replace with actual label or image source if needed
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Meta Creek EGY EN Event R",
    profile: "22",
    rank: "2",
    totalDeals: 17,
    totalCalls: 212,
    totalViewings: 21,
    totalListings: 238,
    totalEarning: "2.7M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "50%",
  },
  {
    name: "Meta Sobha EGY Event R",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Tiktok",
    profile: "29",
    rank: "3",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: "dollar",
    icondollar: "dollarcoin",
    iconlabel: "iconlabel",
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
];

const ReportsTable = () => {
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
        <h2>Lead Source Report</h2>
        
      </div>

      <div className="table-container">
        <div className="table">
          {/* Render table header */}
          <div className="table-header-row">
            <div className="table-header-cell sticky-col">Lead Source</div>
            <div className="table-header-cell">No Answer</div>
            <div className="table-header-cell">Call Back</div>
            <div className="table-header-cell">Not Interested</div>
            <div className="table-header-cell">Not Reachable</div>
            <div className="table-header-cell">Qualified Interested</div>
            <div className="table-header-cell">Long Follow Up</div>
            <div className="table-header-cell">Switched Off</div>
            <div className="table-header-cell">Scheduled Meeting</div>
            <div className="table-header-cell">Follow Up</div>
            <div className="table-header-cell">New</div>
            <div className="table-header-cell">Evalution Options</div>
            <div className="table-header-cell">Closed Lost</div>
            <div className="table-header-cell">Interested</div>
            <div className="table-header-cell">Total</div>
          </div>

          {/* Render table rows */}
          {currentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="table-cell sticky-col">{row.name}</div>
              <div className="table-cell">{row.profile}</div>
              <div className="table-cell">{row.rank}</div>
              <div className="table-cell">{row.totalDeals}</div>
              <div className="table-cell">{row.totalCalls}</div>
              <div className="table-cell">{row.totalViewings}</div>
              <div className="table-cell">{row.totalListings}</div>
              <div className="table-cell">{row.totalEarning}</div>
              <div className="table-cell">{row.status}</div>
              <div className="table-cell">{row.commission}</div>
              <div className="table-cell">{row.dealAverage}</div>
              <div className="table-cell">{row.closed}</div>
              <div className="table-cell">{row.dealPercentage}</div>
              <div className="table-cell">{row.closed}</div>
              <div className="table-cell">{row.dealPercentage}</div>
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

export default ReportsTable;
