import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeaderbordCard from "../components/LeaderboradCard";
import SecondLeaderboardCard from "../components/SecondLeaderboradCard";
import ThirdLeaderboardCard from "../components/ThirdLeaderboradCard";
import Avatar from "../../images/avatar.png";
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
import FullscreenToggle from "../components/FullScreen";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import AgentResponseTable from "./AgentResponseTime";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const LeaderBoardDashboard = () => {
  const [selectedLeader, setSelectedLeader] = useState(leaderOptions[0]);
  const [expandedLeader, setExpandedLeader] = useState(null);
  // const [selectedMember, setSelectedMember] = useState(everyoneOptions[0]);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [selectedMonth, setSelectedMonth] = useState(null);
  // const [selectedMonth, setSelectedMonth] = useState(everymonthOptions[0]);
  // const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]); // Multi-select for months
  const [selectedOption, setSelectedOption] = useState(null); 
  const [selectedYear, setSelectedYear] = useState(everyyearOptions[0]);
  const [sampleData, setSampleData] = useState(initialSampleData);

  useEffect(() => {
    switch (selectedLeader.value) {
      case "leaders":
        setSampleData(initialSampleData);
        break;
      case "leaders2":
        setSampleData(initialSampleData1);
        break;
      case "leaders3":
        setSampleData(initialSampleData2);
        break;
      case "saleDeals":
        setSampleData(initialSampleData);
        break;
      case "rentalDeals":
        setSampleData(initialSampleData);
        break;

      case "salesListing":
        setSampleData(initialSampleData3); // Same as Listing Dashboard
        break;
      case "rentalListing":
        setSampleData(initialSampleData3); // Same as Listing Dashboard
        break;
      default:
        setSampleData([]);
    }
  }, [selectedLeader]);

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

    {selectedLeader.value === "leaders2" ? (
      <SecondLeaderboardCard
        data={secondsampleData1}
        title="Calls Data"
      />
    ) : selectedLeader.value === "leaders3" ? (
      <SecondLeaderboardCard
        data={secondsampleData2}
        title="Viewing Data"
      />
    ) : selectedLeader.value === "salesListing" || selectedLeader.value === "rentalListing" ? (
      <SecondLeaderboardCard
        data={secondsampleData3}
        title="Listing Data"
      />
    ) : selectedLeader.value === "leaders4" ? (
      <SecondLeaderboardCard
        data={secondsampleData3}
        title="New Data for Leader 4"
      />
    ) : (
      <SecondLeaderboardCard
        data={secondsampleData}
        title="Default Data"
      />
    )}

    {selectedLeader.value === "leaders2" ? (
      <ThirdLeaderboardCard data={thirdsampleData1} type="calls" />
    ) : selectedLeader.value === "leaders3" ? (
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
    name: "Emily Williams",
    profile: Avatar,
    rank: "1",
    totalDeals: 15,
    totalCalls: 35,
    totalViewings: 65,
    totalListings: 12,
    totalEarning: "3.4M",
    status: "Total Deals",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Lily Adams",
    profile: Avatar,
    rank: "2",
    totalDeals: 17,
    totalCalls: 212,
    totalViewings: 21,
    totalListings: 238,
    totalEarning: "2.7M",
    status: "Total Deals",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Sarah Brown",
    profile: Avatar,
    rank: "2",
    totalDeals: 67,
    totalCalls: 20,
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "2.9M",
    status: "Total Deals",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
];
const initialSampleData1 = [
  {
    name: "Emily Williams",
    profile: Avatar,
    rank: "1",
    totalDeals: 99,
    totalCalls: 15,
    totalViewings: 85,
    totalListings: 712,
    totalEarning: "49",
    status: "Total Calls",
    // icon: <IoCall /> ,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Lily Adams",
    profile: Avatar,
    rank: "2",
    totalDeals: 57,
    totalCalls: 512,
    totalViewings: 53,
    totalListings: 58,
    totalEarning: "23",
    status: "Total Calls",
    // icon: <IoCall /> ,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
  {
    name: "Sarah Brown",
    profile: Avatar,
    rank: "2",
    totalDeals: 47,
    totalCalls: 312,
    totalViewings: 33,
    totalListings: 38,
    totalEarning: "25",
    status: "Total Calls",
    // icon: <IoCall /> ,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "70%",
  },
];
const initialSampleData2 = [
  {
    name: "Emily Williams",
    profile: Avatar,
    rank: "1",
    totalDeals: 29,
    totalCalls: 215,
    totalViewings: 25,
    totalListings: 212,
    totalEarning: "300",
    status: "Total Viewings",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "60%",
  },
  {
    name: "Sarah Brown",
    profile: Avatar,
    rank: "2",
    totalDeals: 57,
    totalCalls: 12,
    totalViewings: 3,
    totalListings: 48,
    totalEarning: "90",
    status: "Total Viewings",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "50%",
  },
  {
    name: "Lily Adams",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,
    totalCalls: 12,
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "2.0",
    status: "Total Viewings",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "80%",
  },
];
const initialSampleData3 = [
  {
    name: "Lily Adams",
    profile: Avatar,
    rank: "1",
    totalDeals: 9,
    totalCalls: 15,
    totalViewings: 5,
    totalListings: 12,
    totalEarning: "36",
    status: "Total Listing",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Sarah Brwon",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,
    totalCalls: 12,
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "27",
    status: "Total Listing",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "60%",
  },
  {
    name: "Emily Williams",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,
    totalCalls: 12,
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "72",
    status: "Total Listing",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "50%",
  },
];
const initialSampleData4 = [
  {
    name: "William4",
    profile: Avatar,
    rank: "1",
    totalDeals: 9,
    totalCalls: 15,
    totalViewings: 5,
    totalListings: 12,
    totalEarning: "3.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "jessica",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,
    totalCalls: 12,
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "92.2k",
    dealAverage: "381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
];

const secondsampleData = [
  {
    icon: <CiDollar style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    totalEarning: "2.7M",
    status: "Total Deals",
  },
  {
    icon: <BsCash style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    totalEarning: "3.4M",
    status: "Total Commision",
  },

  {
    icon: (
      <MdLabelOutline
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    totalEarning: "2.4M",
    status: "Total Close",
  },
  {
    icon: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    totalEarning: "90%",
    status: "Total Percentage",
  },
];
const secondsampleData1 = [
  {
    icon: (
      <MdOutlineCall style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />
    ),
    totalEarning: "100",
    status: "Total Calls",
  },
  {
    icon: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    totalEarning: "60%",
    status: "Total Percentage",
  },
];
const secondsampleData2 = [
  {
    icon: (
      <CiViewBoard style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />
    ),
    totalEarning: "100",
    status: "Total Viewing",
  },
  {
    icon: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    totalEarning: "80%",
    status: "Total Percentage",
  },
];

const secondsampleData3 = [
  {
    icon: <BiListUl style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }} />,
    totalEarning: "100",
    status: "Total Listing",
  },
  {
    icon: (
      <LiaPercentageSolid
        style={{ color: "rgb(31, 123, 193)", fontSize: "25px" }}
      />
    ),
    totalEarning: "90%",
    status: "Total Percentage",
  },
];

const thirdsampleData = [
  {
    name: "Lara Boyd",
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
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
    profile: Avatar,
    rank: "4",
    viewing: "400",
    dealPercentage: "70%",
  },
  {
    name: "Devin Cook",
    profile: Avatar,
    rank: "5",
    viewing: "400",
    dealPercentage: "50%",
  },
  {
    name: "Jennifer McKay",
    profile: Avatar,
    rank: "6",
    viewing: "400",
    dealPercentage: "90%",
  },
];
const thirdsampleData3 = [
  {
    name: "Lara Boyd",
    profile: Avatar,
    rank: "4",
    listing: "36",
    dealPercentage: "90%",
  },
  {
    name: "Devin Cook",
    profile: Avatar,
    rank: "5",
    listing: "27",
    dealPercentage: "60%",
  },
  {
    name: "Jennifer McKay",
    profile: Avatar,
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
    value: "leaders2",
    icon: <MdOutlineCall />,
  },
  {
    label: "Viewings Dashboard",
    value: "leaders3",
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
