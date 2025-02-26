import React, { useState, useEffect } from "react";
import RangeSlider from "./RangeSlider";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import Avatar from "../../images/avatar.png";
import { NumberConversion } from '../components/common/CommonFunctions';

const ThirdLeaderboardCard = ({ data, selectedLeader }) => {
  const [filteredData, setFilteredData] = useState([]);
  const iconMap = {
    saleDeals: <CiDollar style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    rentalDeals: <CiDollar style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    calls: <MdOutlineCall style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    viewings: <CiViewBoard style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    salesListing: <BiListUl style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    rentalListing: <BiListUl style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
  };
  const titleMap = {
    saleDeals: "Total Deals",
    rentalDeals: "Total Deals",
    calls: "Total Calls",
    viewings: "Total Viewings",
    salesListing: "Total Listing",
    rentalListing: "Total Listing",
  };

  const isDealsDashboard = ["leaders", "saleDeals", "rentalDeals"].includes(
    selectedLeader.value
  );

  useEffect(() => {
    const valueKeyMap = {
      saleDeals: "saleListingValue",
      rentalDeals: "rentListingValue",
      calls: "phoneCalls",
      viewings: "noOfViewings",
      salesListing: "saleListings",
      rentalListing: "rentListings",
    };
  
    const sortKey = valueKeyMap[selectedLeader.value];
    const sortedData = sortKey
      ? [...data].sort((a, b) => b[sortKey] - a[sortKey])
      : [...data];
  
    setFilteredData(sortedData.slice(3));
  }, [selectedLeader.value, data]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="card-wrapper card-wrapper-third leader-board">
      <div className="card-items">
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map((item, index) => (
            <div className="cards" key={index}>
              <div className="card-left center-items">
                <div>
                  <img src={item.profile ? item.profile : Avatar} alt="" />
                </div>
                <div className="rank rank2">{index + 4}</div>
              </div>
              <div className="card-right">
                <div className="profile-name text-left">{item.name}</div>
                <RangeSlider 
                value = {selectedLeader.value == "saleDeals" ? item.saleDealsPct : (selectedLeader.value == "rentalDeals" ? item.rentDealsPct :
                  (selectedLeader.value == "calls" ? item.callsPct : (selectedLeader.value == "viewings" ? item.viewingPct :
                    (selectedLeader.value == "salesListing" ? item.saleListingsPct : item.rentListingsPct)
                  )))}
                />
                <div
                  className={`flex deals-info justify-between ${!isDealsDashboard ? "start-items" : ""}`} >
                  <div className="flex align-center pl-5">
                    {iconMap[selectedLeader.value]}
                    <span>{selectedLeader.value == "saleDeals" ? NumberConversion(item.saleListingValue) : (selectedLeader.value == "rentalDeals" ? NumberConversion(item.rentListingValue) :
                      (selectedLeader.value == "calls" ? item.phoneCalls : (selectedLeader.value == "viewings" ? item.noOfViewings :
                        (selectedLeader.value == "salesListing" ? item.saleListings : item.rentListings)
                      )))}</span>
                  </div>
                  {isDealsDashboard && (
                    <>
                      <div className="flex align-center pl-5">
                        <BsCash style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{selectedLeader.value == "saleDeals" ? NumberConversion(item.salecommission) : NumberConversion(item.rentcommission)}</span>
                      </div>

                      <div className="flex align-center label-image">
                        <MdLabelOutline style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{selectedLeader.value == "saleDeals" ? item.saleListingsclosed : item.rentListingsclosed}</span>
                      </div>
                    </>
                  )}
                  <div className="flex align-center label-image">
                    <LiaPercentageSolid style={{ fontSize: "25", color: "#1f7bc1" }} />
                    <span>{selectedLeader.value == "saleDeals" ? item.saleDealsPct : (selectedLeader.value == "rentalDeals" ? item.rentDealsPct :
                      (selectedLeader.value == "calls" ? item.callsPct : (selectedLeader.value == "viewings" ? item.viewingPct :
                        (selectedLeader.value == "salesListing" ? item.saleListingsPct : item.rentListingsPct)
                      )))}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Pagination Controls */}
      {/* {data.length > itemsPerPage && (
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ThirdLeaderboardCard;
