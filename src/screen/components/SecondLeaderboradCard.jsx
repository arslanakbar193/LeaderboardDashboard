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
    saleDeals: <CiDollar />,
    rentalDeals: <CiDollar />,
    calls: <MdOutlineCall />,
    viewings: <CiViewBoard />,
    salesListing: <BiListUl />,
    rentalListing: <BiListUl />,
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
  
  const renderCard = (icon, value, title) => (
    <div className="cards flex deals-info">
      <div>
        <div style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}>{icon}</div>
      </div>
      <div className="description">
        <div className="text-left fs-18">{value}</div>
        <div className="status">{title}</div>
      </div>
    </div>
  );

  return (
    <div className="card-wrapper card-wrapper-second">
      <div className="card-items">
        {renderCard(iconMap[selectedLeader.value], totals, titleMap[selectedLeader.value])}
        {isDealsDashboard &&
          <>
            {renderCard(<BsCash />, commission, "Total Commission")}
            {renderCard(<MdLabelOutline />, closed, "Total Close")}
          </>
        }
        {renderCard(<LiaPercentageSolid />, percentage, "Total Percentage")}
      </div>
    </div>
  );
};

export default LeaderboradCard;
