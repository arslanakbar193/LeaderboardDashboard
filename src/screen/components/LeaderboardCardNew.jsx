import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeaderbordCard from "../components/LeaderboradCard";
import SecondLeaderboardCard from "../components/SecondLeaderboradCard";
import ThirdLeaderboardCard from "../components/ThirdLeaderboradCard";
import dollar from "../../images/dollar.png";
import dollarcoin from "../../images/dollar-coin.png";
import iconlabel from "../../images/label.png";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import Dropdown from "../components/Dropdown";
import TotalDashboard from "../components/TotalDashboard";
import { MdSpaceDashboard } from "react-icons/md";
import ReportsTable from "./NewReports";
import AgentReportsTable from "./AgentReport";
import { fetchWithTokenRetry } from '../components/common/CommonFunctions';

import FullscreenToggle from "../components/FullScreen";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import AgentResponseTable from "./AgentResponseTime";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const LeaderBoardDashboard = () => {
  const ApiUrl = 'http://localhost:54103';
  const [selectedLeader, setSelectedLeader] = useState(leaderOptions[0].subOptions[0]);
  const [expandedLeader, setExpandedLeader] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState(everyyearOptions[0]);
  const [sampleData, setSampleData] = useState(initialSampleData);
  const [token, setToken] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {
      if (window.ZoneMasterGlobels && window.application) {
        setEnvironment();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (token && token !== '') {
      console.log("Token received");
      console.log(token);
      // console.log(ApiUrl);
      // getUserData();
      getUserData1();

    }
  }, [token]);

  const getUserData = async () => {
    try {
      const response = await fetchWithTokenRetry(
        ApiUrl + '/leaderboard/KPI',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token
          }
        }
      );
      // console.log(response);
      if (response && response.ok) {
        const data = await response.json();

      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getUserData1 = async () => {
    try {
      const response = await fetchWithTokenRetry(
        ApiUrl + '/leaderboard',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token
          }
        }
      );
      if (response && response.ok) {
        const responseData = await response.json();
        console.log(responseData, "Leaderbord data");

        const transformedData = responseData.data.map(item => {
          const kpi = item.KPI ? JSON.parse(item.KPI) : {}; // Parse KPI or fallback to an empty object

          const saleDeals = parseFloat(kpi.saleDeals ?? 0);
          const rentDeals = parseFloat(kpi.rentDeals ?? 0);
          const calls = parseFloat(kpi.calls ?? 0);
          const viewing = parseFloat(kpi.viewing ?? 0);
          const saleListings = parseFloat(kpi.saleListings ?? 0);
          const rentListings = parseFloat(kpi.rentListings ?? 0);

          return {
            name: item.agent_name,
            saleListingValue: item.sale_listings_value,
            rentListingValue: item.rent_listings_value,
            salecommission: item.sale_listings_commission,
            rentcommission: item.rent_listings_commission,
            saleListingsclosed: item.sale_listings_sold,
            rentListingsclosed: item.rent_listings_sold,
            phoneCalls: item.phone_calls,
            noOfViewings: item.no_of_viewings,
            saleListings: item.sale_new_listings,
            rentListings: item.rent_new_listings,
            saleDealsTarget: saleDeals,
            rentDealsTarget: rentDeals,
            callsTarget: calls,
            viewingTarget: viewing,
            saleListingsTarget: saleListings,
            rentListingsTarget: rentListings,
            saleDealsPct: saleDeals ? ((item.sale_listings_value / saleDeals) * 100).toFixed(2) + '%' : '0%',
            rentDealsPct: rentDeals ? ((item.rent_listings_value / rentDeals) * 100).toFixed(2) + '%' : '0%',
            callsPct: calls ? ((item.phone_calls / calls) * 100).toFixed(2) + '%' : '0%',
            viewingPct: viewing ? ((item.no_of_viewings / viewing) * 100).toFixed(2) + '%' : '0%',
            saleListingsPct: saleListings ? ((item.sale_new_listings / saleListings) * 100).toFixed(2) + '%' : '0%',
            rentListingsPct: rentListings ? ((item.rent_new_listings / rentListings) * 100).toFixed(2) + '%' : '0%',
          };
        });

        // Set the transformed data
        setSampleData(transformedData);

      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setSampleData(initialSampleData);
  // }, [selectedLeader]);

  const setEnvironment = () => {
    if (process.env.NODE_ENV === 'development') {
      setToken('bearer hosLKzrH8zEyEUq9KLgo6DOV-tWq67D5tGedfoQW7zM_dUuNIpuq4fRSp2tbafk2z7UrKzTnfao-XhoKWin6zwz2igXLMTvnW_3nw5jPnT4um3J1_EtNnRhoFIEzlNUAFOn4G_fipnEYMBiYQa0KhfBwmJ1J4UoJdexYT-8qj86p6J79LK3AAoRNIdY2rZbmbPudLxLiCLxO9FCD3VFcWMN0q-wqFuyvqXFz7ONZ2Mk1ok43C1cBHjYa-MBxnQxu4x0L2um6BjIG16GkS1BDJkdvJLi1vfgjA_42bozCh5oPuRraXTbj20AKOqHDT1WWnoZyEYgmt3vl7HsuznIpDpxDXD2k9b-tTCB9hcom1M5F-vhT7Xk2v7MmI01M6rZLykgBY4TjPfzUHuUO6tlzU2_KrrUrVIRC_Y4rvtZeA3qhCgM4d2iZvyC9EzW3DM5nl9TTqWU05BUlvHCoqlFbX2xVHR7mhHhUGq66h4iMV44ke0Zd01T_eiFjOC9C94_CNM5A3HSbhYZirPdzEL2QEvBweZZh3tBzMxD0kFd85gM');
    }
    else {
      setToken(`Bearer ${JSON.parse(localStorage.jStorage)[window.parent.application.context.get_apiTokenKey()]}`);
    }
  };

  const handleLeaderClick = (option) => {
    if (option.subOptions) {
      setExpandedLeader(option.value === expandedLeader ? null : option.value);
    } else {
      setSelectedLeader(option);
      setExpandedLeader(null); // Close other sub-options
    }
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedLeader(newSelection);
  };
  const handleSelection = (option) => {
    if (selected.some((sel) => sel.value === option.value)) {
      // If the option is already selected, remove it
      onSelectedChange(selected.filter((sel) => sel.value !== option.value));
    } else {
      // Otherwise, add it
      onSelectedChange([...selected, option]);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="dashboard-wrapper row">
          <div className="leaderboard-sidebar col-2">
            <div>
              <img
                src="https://demo.goyzer.com/uploadedfiles/Group/2677/logo__original.png?v=1.1"
                style={{ width: "150px", marginBottom: "20px" }}
              />{" "}
            </div>
            <ul className="leader-options">
              {leaderOptions.map((option, index) => {
                const isParentActive =
                  option.value === selectedLeader.value ||
                  (option.subOptions &&
                    option.subOptions.some(
                      (subOption) => subOption.value === selectedLeader.value
                    ));
                const isExpanded = expandedLeader === option.value;

                return (
                  <li
                    key={index}
                    style={{ cursor: "pointer", marginBottom: "10px" }}
                    className={isParentActive ? "active" : ""}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        onClick={() => handleLeaderClick(option)}
                        className={
                          option.value === selectedLeader.value ? "active" : ""
                        }
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#1f7bc1",
                            marginRight: "8px",
                            position: "relative",
                            top: "3px",
                          }}
                        >
                          {option.icon}
                        </span>
                        {option.label}
                      </div>
                      {option.subOptions && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click
                            setExpandedLeader(isExpanded ? null : option.value);
                          }}
                          style={{
                            cursor: "pointer",
                            marginLeft: "10px",
                            position: "relative",
                            top: "4px",
                          }}
                        >
                          {isExpanded ? (
                            <FiChevronUp size={20} color="#1f7bc1" />
                          ) : (
                            <FiChevronDown size={20} color="#1f7bc1" />
                          )}
                        </span>
                      )}
                    </div>
                    {option.subOptions && isExpanded && (
                      <ul style={{ paddingLeft: "58px" }} className="sub-child">
                        {option.subOptions.map((subOption, subIndex) => (
                          <li
                            key={subIndex}
                            onClick={() => setSelectedLeader(subOption)}
                            className={
                              subOption.value === selectedLeader.value
                                ? "active"
                                : ""
                            }
                            style={{
                              cursor: "pointer",
                              marginTop: "5px",
                              padding: "5px",
                            }}
                          >
                            {subOption.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right-sideContent col-9">
            <div className="topbar">
              <div className="top-right-select">
                <FullscreenToggle />
                <Dropdown
                  label="Select Month"
                  options={everymonthOptions}
                  selected={selectedMonths}
                  onSelectedChange={setSelectedMonths}
                  multiSelect={true} // Pass multiSelect prop
                />
                <Dropdown
                  label=""
                  options={everyyearOptions}
                  selected={selectedYear}
                  onSelectedChange={setSelectedYear}
                />
                {/* <p>
        Selected Months:{" "}
        {selectedMonths.length > 0
          ? selectedMonths.map((month) => month.label).join(", ")
          : "None"}
      </p> */}

                {/* <h3>Everyone Options</h3> */}
                <Dropdown
                  label="Select Option"
                  options={everyoneOptions}
                  selected={selectedOption}
                  onSelectedChange={setSelectedOption}
                />
                {/* <p>Selected Option: {selectedOption?.label || "None"}</p> */}

              </div>
            </div>

            {selectedLeader.value === "leaders8" ? (
              <AgentResponseTable />
            ) : selectedLeader.value === "leaders7" ? (
              <AgentReportsTable />
            ) : selectedLeader.value === "leaders6" ? (
              <ReportsTable />
            ) : selectedLeader.value === "leaders5" ? (
              <TotalDashboard data={sampleData} />
            ) : (
              <>
                <LeaderbordCard data={sampleData} selectedLeader={selectedLeader} />
                <SecondLeaderboardCard
                    totals="2043M"
                    commission="100M"
                    closed="9"
                    percentage="90%"
                    selectedLeader={selectedLeader}
                  />

                {selectedLeader.value === "calls" ? (
                  <ThirdLeaderboardCard data={thirdsampleData1} type="calls" />
                ) : selectedLeader.value === "viewings" ? (
                  <ThirdLeaderboardCard
                    data={thirdsampleData2}
                    type="viewings"
                  />
                ) : selectedLeader.value === "salesListing" || selectedLeader.value === "rentalListing" ? (
                  <ThirdLeaderboardCard
                    data={thirdsampleData3}
                    type="listings"
                  />
                ) : selectedLeader.value === "leaders4" ? (
                  <ThirdLeaderboardCard
                    data={thirdsampleData3}
                    type="listings"
                  />
                ) : (
                  <ThirdLeaderboardCard data={thirdsampleData} type="default" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
LeaderBoardDashboard.propTypes = {
  selectedLeader: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  selectedMember: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  selectedMonth: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};
export default LeaderBoardDashboard;


const initialSampleData = [
  {
    name: "Emily Williamsa",
    saleListingValue: "340000",
    rentListingValue: "3500202",
    salecommission: "9220202",
    rentcommission: "93242342",
    saleListingsclosed: 9,
    rentListingsclosed: 10,
    phoneCalls: "49",
    noOfViewings: "300",
    saleListings: "33",
    rentListings: "41",
    saleDealsTarget: "500034433",
    rentDealsTarget: "64343434",
    callsTarget: "150",
    viewingTarget: "50",
    saleListingsTarget: "20",
    rentListingsTarget: "90",
    saleDealsPct: "493.9%",
    rentDealsPct: "89%",
    callsPct: "20%",
    viewingPct: "120%",
    saleListingsPct: "60%",
    rentListingsPct: "10%",
  },
  {
    name: "Lily Adams",
    saleListingValue: "340000",
    rentListingValue: "3500202",
    salecommission: "9220202",
    rentcommission: "93242342",
    saleListingsclosed: 9,
    rentListingsclosed: 10,
    phoneCalls: "49",
    noOfViewings: "300",
    saleListings: "33",
    rentListings: "41",
    saleDealsTarget: "500034433",
    rentDealsTarget: "64343434",
    callsTarget: "150",
    viewingTarget: "50",
    saleListingsTarget: "20",
    rentListingsTarget: "90",
    saleDealsPct: "4943.9%",
    rentDealsPct: "849%",
    callsPct: "240%",
    viewingPct: "1420%",
    saleListingsPct: "460%",
    rentListingsPct: "140%",
  },
  {
    name: "Sarah Brown",
    saleListingValue: "340000",
    rentListingValue: "3500202",
    salecommission: "9220202",
    rentcommission: "93242342",
    saleListingsclosed: 9,
    rentListingsclosed: 10,
    phoneCalls: "49",
    noOfViewings: "300",
    saleListings: "33",
    rentListings: "41",
    saleDealsTarget: "500034433",
    rentDealsTarget: "64343434",
    callsTarget: "150",
    viewingTarget: "50",
    saleListingsTarget: "20",
    rentListingsTarget: "90",
    saleDealsPct: "4932.9%",
    rentDealsPct: "892%",
    callsPct: "202%",
    viewingPct: "1220%",
    saleListingsPct: "620%",
    rentListingsPct: "120%",
  },
];

const thirdsampleData = [
  {
    name: "Lara Boyd",

    rank: "4",
    icon: <CiDollar style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "70%",
  },
  {
    name: "Devin Cook",

    rank: "5",
    icon: <BsCash style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "60%",
  },
  {
    name: "Jennifer McKay",

    rank: "6",
    commission: "92.2k",
    icon: (
      <MdLabelOutline
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "180%",
  },
  {
    name: "Lara Boyd",

    rank: "4",
    icon: <CiDollar style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "70%",
  },
  {
    name: "Devin",

    rank: "5",
    icon: <BsCash style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "60%",
  },
  {
    name: "Jennifer ",

    rank: "6",
    commission: "92.2k",
    icon: (
      <MdLabelOutline
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "180%",
  },
];

const thirdsampleData1 = [
  {
    name: "Lara Boyd",

    rank: "4",
    icon: (
      <MdOutlineCall style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />
    ),
    calls: "49",
    dealPercentage: "90%",
    iconp: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
  },
  {
    name: "Devin Cook",

    rank: "5",
    icon: (
      <MdOutlineCall style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />
    ),
    calls: "23",
    dealPercentage: "80%",
    iconp: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
  },
  {
    name: "Jennifer McKay",

    rank: "6",
    commission: "92.2k",
    icon: (
      <MdOutlineCall style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />
    ),
    calls: "25",
    dealPercentage: "70%",
    iconp: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
  },
];
const thirdsampleData2 = [
  {
    name: "Lara Boyd",

    rank: "4",
    viewing: "400",
    dealPercentage: "70%",
  },
  {
    name: "Devin Cook",

    rank: "5",
    viewing: "400",
    dealPercentage: "50%",
  },
  {
    name: "Jennifer McKay",

    rank: "6",
    viewing: "400",
    dealPercentage: "90%",
  },
];
const thirdsampleData3 = [
  {
    name: "Lara Boyd",

    rank: "4",
    listing: "36",
    dealPercentage: "90%",
  },
  {
    name: "Devin Cook",

    rank: "5",
    listing: "27",
    dealPercentage: "60%",
  },
  {
    name: "Jennifer McKay",

    rank: "6",
    listing: "72",
    dealPercentage: "50%",
  },
];

const leaderOptions = [
  {
    label: "Deals Dashboard",
    value: "leaders",
    icon: <MdSpaceDashboard />,
    subOptions: [
      { label: "Sale Deals", value: "saleDeals" },
      { label: "Rental Deals", value: "rentalDeals" },
    ],
  },
  {
    label: "Calls Dashboard",
    value: "calls",
    icon: <MdOutlineCall />,
  },
  {
    label: "Viewings Dashboard",
    value: "viewings",
    icon: <CiViewBoard />,
  },
  {
    label: "Listing Dashboard",
    value: "leaders4",
    icon: <BiListUl />,
    subOptions: [
      { label: "Sales Listing", value: "salesListing" },
      { label: "Rental Listing", value: "rentalListing" },
    ],
  },
  {
    label: "Lead Source Report",
    value: "leaders6",
    icon: <HiDocumentReport />,
  },
  {
    label: "Agent Lead Report",
    value: "leaders7",
    icon: <HiOutlineDocumentReport />,
  },
  {
    label: "Agent Response Time",
    value: "leaders8",
    icon: <HiOutlineDocumentReport />,
  },
];

// const everyoneOptions = [
//   { label: "All", value: "1" },
//   { label: "Branches", value: "2" },
//   { label: "Teams", value: "3" },
// ];

const everyoneOptions = [
  { label: "All", value: "1" },
  {
    label: "Branches",
    value: "2",
    subOptions: [
      { label: "Branch 1", value: "2-1" },
      { label: "Branch 2", value: "2-2" },
      { label: "Branch 3", value: "2-3" },
    ],
  },
  {
    label: "Teams",
    value: "3",
    subOptions: [
      { label: "Team A", value: "3-1" },
      { label: "Team B", value: "3-2" },
      { label: "Team C", value: "3-3" },
    ],
  },
];
const everymonthOptions = [
  // { label: "This month", value: "1" },
  { label: "December", value: "2" },
  { label: "January", value: "3" },
  { label: "Feburary", value: "4" },
  { label: "March", value: "5" },
  { label: "April", value: "6" },
  { label: "May", value: "7" },
  { label: "June", value: "8" },
  { label: "July", value: "9" },
  { label: "August", value: "10" },
  { label: "September", value: "11" },
  { label: "October", value: "12" },
  { label: "November", value: "13" },
];
const everyyearOptions = [
  { label: "Year", value: "1" },
  { label: "2024", value: "2" },
  { label: "2023", value: "3" },
];
