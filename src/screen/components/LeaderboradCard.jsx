import { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
const LeaderboradCard = ({ data, selectedLeader }) => {
  const iconMap = {
    leaders: <CiDollar style={{ fontSize: "50px" }} />,
    leaders2: <MdOutlineCall style={{ fontSize: "50px" }} />,
    leaders3: <CiViewBoard style={{ fontSize: "50px" }} />,
    leaders4: <BiListUl style={{ fontSize: "50px" }} />,
  };

  // Group leaders, saleDeals, and rentalDeals for Deals Dashboard logic
  const isDealsDashboard = ["leaders", "saleDeals", "rentalDeals"].includes(
    selectedLeader.value
  );
  return (
    <>
      <div className="card-wrapper">
        <div className="card-items">
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <div
                className="cards"
                key={index}
                style={{ position: "relative" }}
              >
                <div className="profile-image">
                  <img src={item.profile} alt="" />
                </div>
                <div className="rank">{item.rank}</div>
                <div className="profile-name">{item.name}</div>

                <div className="earning">
                  {iconMap[selectedLeader.value] || <CiDollar />}
                  {item.totalEarning}
                </div>

                <div className="status">{item.status}</div>

                {/* Apply 'center-items' class for 'Viewing' and 'Listing' dashboards */}
                <div
                  className={`flex deals-info ${
                    ["leaders2", "leaders3", "leaders4" , "salesListing" , "rentalListing"].includes(
                      selectedLeader.value
                    )
                      ? "center-items"
                      : "justify-between"
                  }`}
                >
                  {isDealsDashboard && (
                    <>
                      <div className="flex align-center">
                        <BsCash
                          style={{ fontSize: "25px", color: "#1f7bc1" }}
                        />
                        <span>{item.commission}</span>
                      </div>
                      <div className="flex align-center label-image">
                        <MdLabelOutline
                          style={{ fontSize: "25px", color: "#1f7bc1" }}
                        />
                        <span>{item.closed}</span>
                      </div>
                    </>
                  )}
                  <div className="flex align-center label-image">
                    <LiaPercentageSolid
                      style={{ fontSize: "25px", color: "#1f7bc1" }}
                    />
                    {item.dealPercentage}
                  </div>
                </div>

                <div className="flex deals-info deals-info2 justify-between">
                  {isDealsDashboard && (
                    <>
                      <div className="flex align-center">
                        <span className="status">Commission</span>
                      </div>
                      <div className="flex align-center label-image">
                        <span className="status">Closed</span>
                      </div>
                    </>
                  )}
                  <div className="flex align-center label-image">
                    <span className="status">Deal Pct.</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LeaderboradCard;
