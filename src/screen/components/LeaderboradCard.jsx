import { useEffect, useState } from "react";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Avatar from "../../images/avatar.png";
const LeaderboradCard = ({ data, selectedLeader }) => {
  const [filteredData, setFilteredData] = useState([]);
  const iconMap = {
    saleDeals: <CiDollar />,
    rentalDeals: <CiDollar />,
    leaders: <CiDollar style={{ fontSize: "50px" }} />,
    calls: <MdOutlineCall style={{ fontSize: "50px" }} />,
    viewings: <CiViewBoard style={{ fontSize: "50px" }} />,
    leaders4: <BiListUl style={{ fontSize: "50px" }} />,
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
    switch (selectedLeader.value) {
      case "saleDeals":
        setFilteredData(data.sort((a, b) => b.saleListingValue - a.saleListingValue).slice(0, 3));
        break;
      case "rentalDeals":
        setFilteredData(data.sort((a, b) => b.rentListingValue - a.rentListingValue).slice(0, 3));
        break;
      case "calls":
        setFilteredData(data.sort((a, b) => b.phoneCalls - a.phoneCalls).slice(0, 3));
        break;
      case "viewings":
        setFilteredData(data.sort((a, b) => b.noOfViewings - a.noOfViewings).slice(0, 3));
        break;
      case "salesListing":
        setFilteredData(data.sort((a, b) => b.saleListings - a.saleListings).slice(0, 3));
        break;
      case "rentalListing":
        setFilteredData(data.sort((a, b) => b.rentListings - a.rentListings).slice(0, 3));
        break;
      default:
        setFilteredData(data.slice(0, 3));
    }
  }, [selectedLeader.value]);
  

  function NumberConversion (labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e+9
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e+6
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e+3
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
  }

  return (
    <>
      <div className="card-wrapper">
        <div className="card-items">
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.map((item, index) => (
              <div
                className="cards"
                key={index}
                style={{ position: "relative" }}
              >
                <div className="profile-image">
                  <img src={item.profile ? item.profile : Avatar} alt="" />
                </div>
                <div className="rank">{index + 1}</div>
                <div className="profile-name">{item.name}</div>

                <div className="earning">
                  {iconMap[selectedLeader.value]}
                  {selectedLeader.value == "saleDeals" ? NumberConversion(item.saleListingValue) : (selectedLeader.value == "rentalDeals" ? NumberConversion(item.rentListingValue) :
                    (selectedLeader.value == "calls" ? item.phoneCalls : (selectedLeader.value == "viewings" ? item.noOfViewings :
                      (selectedLeader.value == "salesListing" ? item.saleListings : item.rentListings)
                    )))}
                </div>

                <div className="status">{titleMap[selectedLeader.value]}</div>

                {/* Apply 'center-items' class for 'Viewing' and 'Listing' dashboards */}
                <div
                  className={`flex deals-info ${["calls", "viewings", "leaders4", "salesListing", "rentalListing"].includes(
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
                        <span>{selectedLeader.value == "saleDeals" ? NumberConversion(item.salecommission) : NumberConversion(item.rentcommission)}</span>
                      </div>
                      <div className="flex align-center label-image">
                        <MdLabelOutline
                          style={{ fontSize: "25px", color: "#1f7bc1" }}
                        />
                        <span>{selectedLeader.value == "saleDeals" ? item.saleListingsclosed : item.rentListingsclosed}</span>
                      </div>
                    </>
                  )}
                  <div className="flex align-center label-image">
                    <LiaPercentageSolid
                      style={{ fontSize: "25px", color: "#1f7bc1" }}
                    />
                    {selectedLeader.value == "saleDeals" ? item.saleDealsPct : (selectedLeader.value == "rentalDeals" ? item.rentDealsPct :
                      (selectedLeader.value == "calls" ? item.callsPct : (selectedLeader.value == "viewings" ? item.viewingPct :
                        (selectedLeader.value == "salesListing" ? item.saleListingsPct : item.rentListingsPct)
                      )))}
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
