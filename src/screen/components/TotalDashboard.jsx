import React, { useState } from 'react';
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import { NumberConversion } from '../components/common/CommonFunctions';

const TotalDashboard = ({ data }) => {
  // Toggle state for the columns (totalCalls, totalViewings, totalListings)
  const [toggleStates, setToggleStates] = useState({
    totalSalesDeals: false,
    totalRentalDeals: false,
    totalCalls: false,
    totalViewings: false,
    totalSalesListings: false,
    totalRentalListings: false,
  });

  // Handle toggle for each column in the thead
  const handleToggle = (field) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the specific column
    }));
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Change this value based on your requirement

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='table-layout'>
      <table className="total-table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Total Sales Deals
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalSalesDeals ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesDeals')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesDeals')}
                  />
                )}
              </div>
            </th>
            <th>Total Rental Deals
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalRentalDeals ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalDeals')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalDeals')}
                  />
                )}
              </div>
            </th>

            {/* Total Calls with Toggle */}
            <th>
              Total Calls
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalCalls ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalCalls')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalCalls')}
                  />
                )}
              </div>
            </th>

            {/* Total Viewings with Toggle */}
            <th>
              Total Viewings
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalViewings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalViewings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalViewings')}
                  />
                )}
              </div>
            </th>

            {/* Total Listings with Toggle */}
            <th>
              Total Sales Listings
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalSalesListings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesListings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesListings')}
                  />
                )}
              </div>
            </th>
            <th>
              Total Rental Listings
              <div style={{ position: 'absolute', top: '17px', left: "2%" }}>
                {toggleStates.totalRentalListings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '18px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalListings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '18px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalListings')}
                  />
                )}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((agent, index) => (
            <tr key={index}>
              <td>{agent.name}</td>

              <td>
                {toggleStates.totalSalesDeals
                  ? agent.saleDealsTarget
                    ? `${((agent.saleListingValue / agent.saleDealsTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : NumberConversion(agent.saleListingValue)}
              </td>

              <td>
                {toggleStates.totalRentalDeals
                  ? agent.rentDealsTarget
                    ? `${((agent.rentListingValue / agent.rentDealsTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : NumberConversion(agent.rentListingValue)}
              </td>

              <td>
                {toggleStates.totalCalls
                  ? agent.callsTarget
                    ? `${((agent.phoneCalls / agent.callsTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : agent.phoneCalls}
              </td>

              <td>
                {toggleStates.totalViewings
                  ? agent.viewingTarget
                    ? `${((agent.noOfViewings / agent.viewingTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : agent.noOfViewings}
              </td>

              <td>
                {toggleStates.totalSalesListings
                  ? agent.saleListingsTarget
                    ? `${((agent.saleListings / agent.saleListingsTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : agent.saleListings}
              </td>

              <td>
                {toggleStates.totalRentalListings
                  ? agent.rentListingsTarget
                    ? `${((agent.rentListings / agent.rentListingsTarget) * 100).toFixed(2)}%`
                    : "0.00%"
                  : agent.rentListings}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#10094; {/* Left arrow */}
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage} // Disable button if it's the current page
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#10095; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default TotalDashboard;
