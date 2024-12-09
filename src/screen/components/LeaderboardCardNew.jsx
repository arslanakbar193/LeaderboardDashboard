import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeaderbordCard from "../components/LeaderboradCard";
import SecondLeaderboardCard from "../components/SecondLeaderboradCard";
import ThirdLeaderboardCard from "../components/ThirdLeaderboradCard";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";
import Dropdown from "../components/Dropdown";
import TotalDashboard from "../components/TotalDashboard";
import { MdSpaceDashboard } from "react-icons/md";
import ReportsTable from "./NewReports";
import AgentReportsTable from "./AgentReport";
import { NumberConversion, fetchWithTokenRetry } from '../components/common/CommonFunctions';

import FullscreenToggle from "../components/FullScreen";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import AgentResponseTable from "./AgentResponseTime";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import MonthYearRangePicker from "./MonthYearPicker";

const LeaderBoardDashboard = () => {
  const ApiUrl = "http://localhost:54103";
  const [selectedLeader, setSelectedLeader] = useState(
    leaderOptions[0].subOptions[0]
  );
  const [expandedLeader, setExpandedLeader] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [dataTotals, setDataTotals] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEnvironment();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetchWithTokenRetry(
        ApiUrl + '/leaderboard/' + selectedLeader.value,
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
        const transformedData = JSON.parse(responseData).data.map(item => {
          const kpi = item.KPI ? JSON.parse(item.KPI) : {};

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
            saleDealsPct: saleDeals
              ? ((item.sale_listings_value / saleDeals) * 100).toFixed(2) + "%"
              : "0.00%",
            rentDealsPct: rentDeals
              ? ((item.rent_listings_value / rentDeals) * 100).toFixed(2) + "%"
              : "0.00%",
            callsPct: calls
              ? ((item.phone_calls / calls) * 100).toFixed(2) + "%"
              : "0.00%",
            viewingPct: viewing
              ? ((item.no_of_viewings / viewing) * 100).toFixed(2) + "%"
              : "0.00%",
            saleListingsPct: saleListings
              ? ((item.sale_new_listings / saleListings) * 100).toFixed(2) + "%"
              : "0.00%",
            rentListingsPct: rentListings
              ? ((item.rent_new_listings / rentListings) * 100).toFixed(2) + "%"
              : "0.00%",
          };
        });

        const totals = transformedData.reduce(
          (acc, item) => {
            acc.saleListingValue += parseFloat(item.saleListingValue ?? 0);
            acc.rentListingValue += parseFloat(item.rentListingValue ?? 0);
            acc.salecommission += parseFloat(item.salecommission ?? 0);
            acc.rentcommission += parseFloat(item.rentcommission ?? 0);
            acc.saleListingsclosed += parseFloat(item.saleListingsclosed ?? 0);
            acc.rentListingsclosed += parseFloat(item.rentListingsclosed ?? 0);
            acc.phoneCalls += parseFloat(item.phoneCalls ?? 0);
            acc.noOfViewings += parseFloat(item.noOfViewings ?? 0);
            acc.saleListings += parseFloat(item.saleListings ?? 0);
            acc.rentListings += parseFloat(item.rentListings ?? 0);
            acc.saleDealsTarget += parseFloat(item.saleDealsTarget ?? 0);
            acc.rentDealsTarget += parseFloat(item.rentDealsTarget ?? 0);
            acc.callsTarget += parseFloat(item.callsTarget ?? 0);
            acc.viewingTarget += parseFloat(item.viewingTarget ?? 0);
            acc.saleListingsTarget += parseFloat(item.saleListingsTarget ?? 0);
            acc.rentListingsTarget += parseFloat(item.rentListings ?? 0);
            return acc;
          },
          {
            saleListingValue: 0,
            rentListingValue: 0,
            salecommission: 0,
            rentcommission: 0,
            saleListingsclosed: 0,
            rentListingsclosed: 0,
            phoneCalls: 0,
            noOfViewings: 0,
            saleListings: 0,
            rentListings: 0,
            saleDealsTarget: 0,
            rentDealsTarget: 0,
            callsTarget: 0,
            viewingTarget: 0,
            saleListingsTarget: 0,
            rentListingsTarget: 0,
          }
        );

        const percentageTotals = {
          saleDealsPct: totals.saleDealsTarget
            ? (
                (totals.saleListingValue / totals.saleDealsTarget) *
                100
              ).toFixed(2) + "%"
            : "0.00%",
          rentDealsPct: totals.rentDealsTarget
            ? (
                (totals.rentListingValue / totals.rentDealsTarget) *
                100
              ).toFixed(2) + "%"
            : "0.00%",
          callsPct: totals.callsTarget
            ? ((totals.phoneCalls / totals.callsTarget) * 100).toFixed(2) + "%"
            : "0.00%",
          viewingPct: totals.viewingTarget
            ? ((totals.noOfViewings / totals.viewingTarget) * 100).toFixed(2) +
              "%"
            : "0.00%",
          saleListingsPct: totals.saleListingsTarget
            ? ((totals.saleListings / totals.saleListingsTarget) * 100).toFixed(
                2
              ) + "%"
            : "0.00%",
          rentListingsPct: totals.rentListingsTarget
            ? ((totals.rentListings / totals.rentListingsTarget) * 100).toFixed(
                2
              ) + "%"
            : "0.00%",
        };
        setDataTotals({ ...totals, ...percentageTotals });
        console.log("Totals:", totals);
        console.log("Percentage Totals:", percentageTotals);
        console.log("data totals:", { ...totals, ...percentageTotals });

        setSampleData(transformedData);
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSampleData(initialSampleData);
      setDataTotals({ ...sampleDataTotals, ...sampleDataPercentageTotals });
    } finally {
      setLoading(false);
    }
  };

  const setEnvironment = () => {
    if (process.env.NODE_ENV === 'development') {
      setToken('bearer hosLKzrH8zEyEUq9KLgo6DOV-tWq67D5tGedfoQW7zM_dUuNIpuq4fRSp2tbafk2z7UrKzTnfao-XhoKWin6zwz2igXLMTvnW_3nw5jPnT4um3J1_EtNnRhoFIEzlNUAFOn4G_fipnEYMBiYQa0KhfBwmJ1J4UoJdexYT-8qj86p6J79LK3AAoRNIdY2rZbmbPudLxLiCLxO9FCD3VFcWMN0q-wqFuyvqXFz7ONZ2Mk1ok43C1cBHjYa-MBxnQxu4x0L2um6BjIG16GkS1BDJkdvJLi1vfgjA_42bozCh5oPuRraXTbj20AKOqHDT1WWnoZyEYgmt3vl7HsuznIpDpxDXD2k9b-tTCB9hcom1M5F-vhT7Xk2v7MmI01M6rZLykgBY4TjPfzUHuUO6tlzU2_KrrUrVIRC_Y4rvtZeA3qhCgM4d2iZvyC9EzW3DM5nl9TTqWU05BUlvHCoqlFbX2xVHR7mhHhUGq66h4iMV44ke0Zd01T_eiFjOC9C94_CNM5A3HSbhYZirPdzEL2QEvBweZZh3tBzMxD0kFd85gM');
    }
    else {
      setToken(`Bearer ${JSON.parse(localStorage.jStorage)[opener.parent.application.context.get_apiTokenKey()]}`);
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

  useEffect(() => {
    getUserData();
  }, [selectedLeader]);

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

  useEffect(() => {
    // console.log(selectedMonths);
    // console.log(selectedYear);
  }, [selectedMonths, selectedYear]);

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
                <MonthYearRangePicker />
                {/* <Dropdown
                  label="Select Month"
                  options={everymonthOptions}
                  selected={selectedMonths}
                  onSelectedChange={setSelectedMonths}
                  multiSelect={true} // Pass multiSelect prop
                />
                <Dropdown
                  label="Select Year"
                  options={everyyearOptions}
                  selected={selectedYear}
                  onSelectedChange={setSelectedYear}
                  multiSelect={true} // Enable multi-selection for years
                /> */}
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
            ) : loading ? ( // Display loading state
              <div>Loading...</div>
            ) : (
              <>
                <LeaderbordCard
                  data={sampleData}
                  selectedLeader={selectedLeader}
                />
                <SecondLeaderboardCard
                  totals={selectedLeader.value == "saleDeals" ? NumberConversion(dataTotals.saleListingValue) : (selectedLeader.value == "rentalDeals" ? NumberConversion(dataTotals.rentListingValue) :
                    (selectedLeader.value == "calls" ? dataTotals.phoneCalls : (selectedLeader.value == "viewings" ? dataTotals.noOfViewings :
                      (selectedLeader.value == "salesListing" ? dataTotals.saleListings : dataTotals.rentListings)
                    )))}
                  commission={selectedLeader.value == "saleDeals" ? NumberConversion(dataTotals.salecommission) : (selectedLeader.value == "rentalDeals" ?
                    NumberConversion(dataTotals.rentcommission) : 0)}
                  closed={selectedLeader.value == "saleDeals" ? dataTotals.saleListingsclosed : (selectedLeader.value == "rentalDeals" ? dataTotals.rentListingsclosed : 0)}
                  percentage={selectedLeader.value == "saleDeals" ? dataTotals.saleDealsPct : (selectedLeader.value == "rentalDeals" ? dataTotals.rentDealsPct :
                    (selectedLeader.value == "calls" ? dataTotals.callsPct : (selectedLeader.value == "viewings" ? dataTotals.viewingPct :
                      (selectedLeader.value == "salesListing" ? dataTotals.saleListingsPct : dataTotals.rentListingsPct)
                    )))}
                  selectedLeader={selectedLeader}
                />
                <ThirdLeaderboardCard
                  data={sampleData}
                  selectedLeader={selectedLeader}
                />
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
    saleListingValue: "3400000",
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
  {
    name: "Emily",
    saleListingValue: "34320000",
    rentListingValue: "350020432",
    salecommission: "924320202",
    rentcommission: "9324235342",
    saleListingsclosed: 9,
    rentListingsclosed: 10,
    phoneCalls: "449",
    noOfViewings: "3300",
    saleListings: "335",
    rentListings: "461",
    saleDealsTarget: "500433",
    rentDealsTarget: "64334",
    callsTarget: "1540",
    viewingTarget: "550",
    saleListingsTarget: "260",
    rentListingsTarget: "930",
    saleDealsPct: "443.9%",
    rentDealsPct: "19%",
    callsPct: "202%",
    viewingPct: "123%",
    saleListingsPct: "30%",
    rentListingsPct: "90%",
  },
  {
    name: "Lily",
    saleListingValue: "30000",
    rentListingValue: "35202",
    salecommission: "90202",
    rentcommission: "932342",
    saleListingsclosed: 93,
    rentListingsclosed: 104,
    phoneCalls: "349",
    noOfViewings: "3040",
    saleListings: "353",
    rentListings: "441",
    saleDealsTarget: "5004433",
    rentDealsTarget: "643434",
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
    name: "Sarah",
    saleListingValue: "34000",
    rentListingValue: "350202",
    salecommission: "922022",
    rentcommission: "9324342",
    saleListingsclosed: 2,
    rentListingsclosed: 3,
    phoneCalls: "9",
    noOfViewings: "30",
    saleListings: "3",
    rentListings: "4",
    saleDealsTarget: "50003433",
    rentDealsTarget: "6434344",
    callsTarget: "10",
    viewingTarget: "2",
    saleListingsTarget: "2",
    rentListingsTarget: "9",
    saleDealsPct: "493.9%",
    rentDealsPct: "89%",
    callsPct: "205%",
    viewingPct: "120%",
    saleListingsPct: "62%",
    rentListingsPct: "12%",
  },
];
const sampleDataTotals = initialSampleData.reduce(
  (acc, item) => {
    acc.saleListingValue += parseFloat(item.saleListingValue ?? 0);
    acc.rentListingValue += parseFloat(item.rentListingValue ?? 0);
    acc.salecommission += parseFloat(item.salecommission ?? 0);
    acc.rentcommission += parseFloat(item.rentcommission ?? 0);
    acc.saleListingsclosed += parseFloat(item.saleListingsclosed ?? 0);
    acc.rentListingsclosed += parseFloat(item.rentListingsclosed ?? 0);
    acc.phoneCalls += parseFloat(item.phoneCalls ?? 0);
    acc.noOfViewings += parseFloat(item.noOfViewings ?? 0);
    acc.saleListings += parseFloat(item.saleListings ?? 0);
    acc.rentListings += parseFloat(item.rentListings ?? 0);
    acc.saleDealsTarget += parseFloat(item.saleDealsTarget ?? 0);
    acc.rentDealsTarget += parseFloat(item.rentDealsTarget ?? 0);
    acc.callsTarget += parseFloat(item.callsTarget ?? 0);
    acc.viewingTarget += parseFloat(item.viewingTarget ?? 0);
    acc.saleListingsTarget += parseFloat(item.saleListingsTarget ?? 0);
    acc.rentListingsTarget += parseFloat(item.rentListings ?? 0);
    return acc;
  },
  {
    saleListingValue: 0,
    rentListingValue: 0,
    salecommission: 0,
    rentcommission: 0,
    saleListingsclosed: 0,
    rentListingsclosed: 0,
    phoneCalls: 0,
    noOfViewings: 0,
    saleListings: 0,
    rentListings: 0,
    saleDealsTarget: 0,
    rentDealsTarget: 0,
    callsTarget: 0,
    viewingTarget: 0,
    saleListingsTarget: 0,
    rentListingsTarget: 0,
  }
);

const sampleDataPercentageTotals = {
  saleDealsPct: sampleDataTotals.saleDealsTarget
    ? (
        (sampleDataTotals.saleListingValue / sampleDataTotals.saleDealsTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
  rentDealsPct: sampleDataTotals.rentDealsTarget
    ? (
        (sampleDataTotals.rentListingValue / sampleDataTotals.rentDealsTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
  callsPct: sampleDataTotals.callsTarget
    ? (
        (sampleDataTotals.phoneCalls / sampleDataTotals.callsTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
  viewingPct: sampleDataTotals.viewingTarget
    ? (
        (sampleDataTotals.noOfViewings / sampleDataTotals.viewingTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
  saleListingsPct: sampleDataTotals.saleListingsTarget
    ? (
        (sampleDataTotals.saleListings / sampleDataTotals.saleListingsTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
  rentListingsPct: sampleDataTotals.rentListingsTarget
    ? (
        (sampleDataTotals.rentListings / sampleDataTotals.rentListingsTarget) *
        100
      ).toFixed(2) + "%"
    : "0.00%",
};

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
    label: "Total Dashboards",
    value: "leaders5",
    icon: <MdSpaceDashboard />,
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
  { label: "January", value: "1" },
  { label: "Feburary", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
const everyyearOptions = [
  { label: "2024", value: "1" },
  { label: "2023", value: "2" },
];
