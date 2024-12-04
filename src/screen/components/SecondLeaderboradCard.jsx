import {React, useEffect} from "react";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";

const LeaderboradCard = ({ totals, commission, closed, percentage, selectedLeader }) => {
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
    viewings: "Total Viewing",
    salesListing: "Total Listing",
    rentalListing: "Total Listing",
  };
  const isDealsDashboard = ["leaders", "saleDeals", "rentalDeals"].includes(
    selectedLeader.value
  );
  // useEffect(() => {
  //   console.log(data);
  // }, data);
  return (
    <>
      <div className="card-wrapper card-wrapper-second">
        <div className="card-items">
          <div className="cards flex deals-info">
            <div>
              <div>{iconMap[selectedLeader.value]}</div>
            </div>
            <div className="description">
              <div className="text-left fs-18">{totals}</div>
              <div className="status">{titleMap[selectedLeader.value]}</div>
            </div>
          </div>

          {isDealsDashboard && (
            <>
          <div className="cards flex deals-info">
            <div>
              <div><BsCash style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} /></div>
            </div>
            <div className="description">
              <div className="text-left fs-18">{commission}</div>
              <div className="status">Total Commission</div>
            </div>
          </div>
          <div className="cards flex deals-info">
            <div>
              <div><MdLabelOutline style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} /></div>
            </div>
            <div className="description">
              <div className="text-left fs-18">{closed}</div>
              <div className="status">Total Close</div>
            </div>
          </div>
          </>
          )}

          <div className="cards flex deals-info">
            <div>
              <div><LiaPercentageSolid style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} /></div>
            </div>
            <div className="description">
              <div className="text-left fs-18">{percentage}</div>
              <div className="status">Total Percentage</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboradCard;
