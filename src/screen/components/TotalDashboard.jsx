import React, { useState } from 'react';
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";

const TotalDashboard = ({ data }) => {
  // Toggle state for the columns (totalCalls, totalViewings, totalListings)
  const [toggleStates, setToggleStates] = useState({
    totalSalesDeals:false,
    totalRentalDeals:false,
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
  const itemsPerPage = 10; // Change this value based on your requirement

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
            <div style={{ position: 'absolute', top: '11px',right:"10px" }}>
                {toggleStates.totalSalesDeals ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesDeals')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesDeals')}
                  />
                )}
              </div>
            </th>
            <th>Total Rental Deals
            <div style={{ position: 'absolute', top: '11px',right:"10px" }}>
                {toggleStates.totalRentalDeals ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalDeals')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalDeals')}
                  />
                )}
              </div>
            </th>

            {/* Total Calls with Toggle */}
            <th>
              Total Calls
              <div style={{ position: 'absolute', top: '11px',right:"10px"  }}>
                {toggleStates.totalCalls ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalCalls')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalCalls')}
                  />
                )}
              </div>
            </th>

            {/* Total Viewings with Toggle */}
            <th>
              Total Viewings
              <div style={{ position: 'absolute', top: '11px',right:"10px"  }}>
                {toggleStates.totalViewings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalViewings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalViewings')}
                  />
                )}
              </div>
            </th>

            {/* Total Listings with Toggle */}
            <th>
            Total Sales Listings
              <div style={{ position: 'absolute', top: '11px',right:"10px"  }}>
                {toggleStates.totalSalesListings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesListings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalSalesListings')}
                  />
                )}
              </div>
            </th>
            <th>
              Total Rental Listings
              <div style={{ position: 'absolute', top: '11px',right:"10px"  }}>
                {toggleStates.totalRentalListings ? (
                  <MdOutlineToggleOn
                    style={{ fontSize: '32px', color: "#1f7bc1", cursor: 'pointer' }}
                    onClick={() => handleToggle('totalRentalListings')}
                  />
                ) : (
                  <MdOutlineToggleOff
                    style={{ fontSize: '32px', color: "#000", cursor: 'pointer' }}
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
              {/* <td>{agent.totalDeals}</td> */}
              <td>{agent.totalSalesCalls}</td>
              <td>{agent.totalRentalCalls}</td>
              <td>{agent.totalViewings}</td>
              <td>{agent.totalListings}</td>
              <td>{agent.totalSalesListings}</td>
              <td>{agent.totalRentalListings}</td>
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
