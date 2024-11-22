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
import { HiDocumentReport ,HiOutlineDocumentReport  } from "react-icons/hi";
import AgentResponseTable from "./AgentResponseTime";

const LeaderBoardDashboard = () => {
  const [selectedLeader, setSelectedLeader] = useState(leaderOptions[0]);
  const [selectedMember, setSelectedMember] = useState(everyoneOptions[0]);
  const [selectedMonth, setSelectedMonth] = useState(everymonthOptions[0]);
  const [sampleData, setSampleData] = useState(initialSampleData);

  useEffect(() => {
    if (selectedLeader.value === "leaders") {
      setSampleData(initialSampleData);
    } else if (selectedLeader.value === "leaders2") {
      setSampleData(initialSampleData1);
    } else if (selectedLeader.value === "leaders3") {
      setSampleData(initialSampleData2);
    } else if (selectedLeader.value === "leaders4") {
      setSampleData(initialSampleData3);
    } else if (selectedLeader.value === "leaders5") {
      setSampleData([
        ...initialSampleData,
        ...initialSampleData1,
        ...initialSampleData2,
        ...initialSampleData3,
        ...initialSampleData4,
      ]);
    }
  }, [selectedLeader]);

  const handleSelectionChange = (newSelection) => {
    setSelectedLeader(newSelection);
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
              {leaderOptions.map((option, index) => (
                <li
                  key={index}
                  className={
                    option.value === selectedLeader.value ? "active" : ""
                  }
                  onClick={() => handleSelectionChange(option)}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ fontSize: "20px", color: "#1f7bc1", marginRight: "8px" }}>
            {option.icon}
          </span>
          {option.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="right-sideContent col-9">
            <div className="topbar">
              <div className="top-right-select">
                <FullscreenToggle />
                <Dropdown
                  label=""
                  options={everymonthOptions}
                  selected={selectedMonth}
                  onSelectedChange={setSelectedMonth}
                />
                <Dropdown
                  label=""
                  options={everyoneOptions}
                  selected={selectedMember}
                  onSelectedChange={setSelectedMember}
                />
              </div>
            </div>

            {selectedLeader.value === "leaders8" ? (
              <AgentResponseTable />
            ) :selectedLeader.value === "leaders7" ? (
              <AgentReportsTable />
            ) : selectedLeader.value === "leaders6" ? (
              <ReportsTable />
            ) : selectedLeader.value === "leaders5" ? (
              <TotalDashboard data={sampleData} />
            ) : (
              <>
                <LeaderbordCard
                  data={sampleData}
                  selectedLeader={selectedLeader}
                />

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
  { label: "Deals Dashboard", value: "leaders" ,icon: <MdSpaceDashboard />},
  { label: "Calls Dashboard", value: "leaders2", icon: <MdOutlineCall  />  },
  { label: "Viewings Dashboard", value: "leaders3", icon: <CiViewBoard /> },
  { label: "Listing Dashboard", value: "leaders4",icon: <BiListUl />},
  { label: "Total Dashboard", value: "leaders5",icon: <MdSpaceDashboard /> },
  { label: "Reports", value: "leaders6" ,icon:<HiDocumentReport />},
  { label: "Agent Reports", value: "leaders7",icon:<HiOutlineDocumentReport  /> },
  { label: "Agent Response Time", value: "leaders8",icon:<HiOutlineDocumentReport  /> },
];

const everyoneOptions = [
  { label: "EveryOne", value: "1" },
  { label: "Emily Williams", value: "2" },
  { label: "Lily Adams", value: "3" },
];
const everymonthOptions = [
  { label: "This month", value: "1" },
  { label: "This Quarter", value: "2" },
  { label: "Year To Date", value: "3" },
];
