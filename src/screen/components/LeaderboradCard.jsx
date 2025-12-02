import { useEffect, useState } from "react";
import AEDIcon from "../../images/aed-coin.png";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import Avatar from "../../images/avatar.png";
import { NumberConversion } from '../components/common/CommonFunctions';

const LeaderboradCard = ({ data, selectedLeader }) => {
  const [filteredData, setFilteredData] = useState([]);
  const iconMap = {
    saleDeals: <BsCash style={{ fontSize: "50px", paddingRight: "10px" }} />,
    rentalDeals: <BsCash style={{ fontSize: "50px", paddingRight: "10px" }} />,
    leaders: <img src={AEDIcon} alt="AED" style={{ width: "50px" }} />,
    calls: <MdOutlineCall style={{ fontSize: "50px" }} />,
    viewings: <CiViewBoard style={{ fontSize: "50px" }} />,
    leaders4: <BiListUl style={{ fontSize: "50px" }} />,
  };
  const titleMap = {
    saleDeals: "Commission",
    rentalDeals: "Commission",
    calls: "Total Calls",
    viewings: "Total Viewings",
    salesListing: "Total Listing",
    rentalListing: "Total Listing",
  };

  const isDealsDashboard = ["leaders", "saleDeals", "rentalDeals"].includes(
    selectedLeader.value
  );

  const sortKeyMap = {
    saleDeals: "salecommission",
    rentalDeals: "rentcommission",
    calls: "phoneCalls",
    viewings: "noOfViewings",
    salesListing: "saleListings",
    rentalListing: "rentListings",
  };

  useEffect(() => {
    const sortKey = sortKeyMap[selectedLeader.value];
    if (sortKey) {
      setFilteredData([...data].sort((a, b) => b[sortKey] - a[sortKey]).slice(0, 3));
    } else {
      setFilteredData(data.slice(0, 3));
    }
  }, [selectedLeader.value, data]);

  const getValue = (item, selectedLeaderValue) => {
    const valueMap = {
      saleDeals: item.salecommission,
      rentalDeals: item.rentcommission,
      calls: item.phoneCalls,
      viewings: item.noOfViewings,
      salesListing: item.saleListings,
      rentalListing: item.rentListings,
    };
    return valueMap[selectedLeaderValue];
  };

  const getPercentage = (item, selectedLeaderValue) => {
    const percentageMap = {
      saleDeals: item.saleDealsPct,
      rentalDeals: item.rentDealsPct,
      calls: item.callsPct,
      viewings: item.viewingPct,
      salesListing: item.saleListingsPct,
      rentalListing: item.rentListingsPct,
    };
    return percentageMap[selectedLeaderValue];
  };

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
                  {NumberConversion(getValue(item, selectedLeader.value))}
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
                        <img src={AEDIcon} alt="AED" style={{ width: "25px", paddingBottom: "8px" }} />
                        <span>{selectedLeader.value == "saleDeals" ? NumberConversion(item.saleListingValue) : NumberConversion(item.rentListingValue)}</span>
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
                    <LiaPercentageSolid style={{ fontSize: "25px", color: "#1f7bc1" }} />
                    {getPercentage(item, selectedLeader.value)}
                  </div>
                </div>

                <div className="flex deals-info deals-info2 justify-between">
                  {isDealsDashboard && (
                    <>
                      <div className="flex align-center">
                        <span className="status">Total Deals</span>
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
