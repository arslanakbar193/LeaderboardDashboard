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
import LeadSourceReport from "./LeadSourceReport";
import AgentWiseLeadReport from "./AgentWiseLeadReport";
import AverageResponseTimeReport from "./AverageResponseTimeReport";
import { NumberConversion, fetchWithTokenRetry } from '../components/common/CommonFunctions';
import FullscreenToggle from "../components/FullScreen";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import MonthYearRangePicker from "./MonthYearPicker";

const LeaderBoardDashboard = () => {
  const [apiUrl , setApiUrl] = useState('');
  const [groupId, setGroupId] = useState('');
  const [companyLogo , setCompanyLogo] = useState('');
  const [selectedLeader, setSelectedLeader] = useState(leaderOptions[0].subOptions[0]);
  const [expandedLeader, setExpandedLeader] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ value: 0, label: 'ALL' });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [leadSourceReportData, setleadSourceReportData] = useState([]);
  const [agentWiseLeadReportData, setAgentWiseLeadReportData] = useState([]);
  const [averageResponseTimeReportData, setaverageResponseTimeReportData] = useState([]);
  const [dataTotals, setDataTotals] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [startMonth, setStartMonth] = useState(() => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return startOfMonth;
  });
  const [endMonth, setEndMonth] = useState(() => {
    const currentDate = new Date();
    const startOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return startOfNextMonth;
  });

  useEffect(() => {
    if (opener?.parent?.application?.context != null) {
      setEnvironment();
    } else {
      alert("Invalid operation. Please reopen the leaderboard from the main application.");
      window.close();
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
      populateBranches();
    }
  }, [token]);

  useEffect(()=>{
    if(profileData.length === 0){
      getAgentImage();
    }
  },[profileData])

  useEffect(() => {
    if (!loading && token) {
      getUserData();
    }
  }, [selectedOption, startMonth, endMonth, selectedLeader]);

  const getUserData = async () => {
    if (leaderValueMapping.hasOwnProperty(selectedLeader.value)) {
      setLoading(true);
      const leaderValue = leaderValueMapping[selectedLeader.value];
      try {
        const options = {
          filter: {
            filters: [
              {
                operator: "gte",
                field: "start_date",
                value: formatDateToISOString(startMonth),
              },
              {
                operator: "lte",
                field: "end_date",
                value: formatDateToISOString(endMonth),
              },
              {
                field: "branch_id",
                value: selectedOption.value,
              },
            ],
          },
        };

        const response = await fetchWithTokenRetry(
          apiUrl + '/leaderboard/' + leaderValue,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': token
            },
            body: JSON.stringify(options),
          }
        );
        if (response && response.ok) {
          const responseJson = await response.json();
          const responseData = JSON.parse(responseJson);
          const NoOfMonths = getNoOfMonths();

          const transformedData = responseData.data.map(item => {
              const kpi = item.KPI ? JSON.parse(item.KPI) : {};

            const saleDeals = parseFloat(kpi.saleDeals ?? 0) * NoOfMonths;
            const rentDeals = parseFloat(kpi.rentDeals ?? 0) * NoOfMonths;
            const calls = parseFloat(kpi.calls ?? 0) * NoOfMonths;
            const viewing = parseFloat(kpi.viewing ?? 0) * NoOfMonths;
            const saleListings = parseFloat(kpi.saleListings ?? 0) * NoOfMonths;
            const rentListings = parseFloat(kpi.rentListings ?? 0) * NoOfMonths;

            return {
              id: item.agent_id,
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
                ? ((item.sale_listings_commission / saleDeals) * 100).toFixed(2) + "%"
                : "0.00%",
              rentDealsPct: rentDeals
                ? ((item.rent_listings_commission / rentDeals) * 100).toFixed(2) + "%"
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

          const totalTargets = transformedData.reduce(
            (acc, item) => {
              if (leaderValue === leaderValueMapping.saleDeals) {
                acc.saleDealsTarget += parseFloat(item.saleDealsTarget ?? 0);
              } else if (leaderValue === leaderValueMapping.rentalDeals) {
                acc.rentDealsTarget += parseFloat(item.rentDealsTarget ?? 0);
              } else if (leaderValue === leaderValueMapping.calls) {
                acc.callsTarget += parseFloat(item.callsTarget ?? 0);
              } else if (leaderValue === leaderValueMapping.viewings) {
                acc.viewingTarget += parseFloat(item.viewingTarget ?? 0);
              } else if (leaderValue === leaderValueMapping.salesListing) {
                acc.saleListingsTarget += parseFloat(item.saleListingsTarget ?? 0);
              } else if (leaderValue === leaderValueMapping.rentalListing) {
                acc.rentListingsTarget += parseFloat(item.rentListingsTarget ?? 0);
              }
              return acc;
            },
            {
              saleDealsTarget: 0,
              rentDealsTarget: 0,
              callsTarget: 0,
              viewingTarget: 0,
              saleListingsTarget: 0,
              rentListingsTarget: 0,
            }
            );
            const percentageTotals = {
                saleDealsPct: (totalTargets.saleDealsTarget || leaderValue == leaderValueMapping.saleDeals)
                    ? (
                        (responseData.totals.saleCommission / totalTargets.saleDealsTarget) *
                        100
                    ).toFixed(2) + "%"
                    : "0.00%",
                rentDealsPct: (totalTargets.rentDealsTarget || leaderValue == leaderValueMapping.rentalDeals)
                    ? (
                        (responseData.totals.rentCommission / totalTargets.rentDealsTarget) *
                        100
                    ).toFixed(2) + "%"
                    : "0.00%",
                callsPct: (totalTargets.callsTarget || leaderValue == leaderValueMapping.calls)
                    ? ((responseData.totals.phoneCalls / totalTargets.callsTarget) * 100).toFixed(2) + "%"
                    : "0.00%",
                viewingPct: (totalTargets.viewingTarget || leaderValue == leaderValueMapping.viewings)
                    ? ((responseData.totals.noOfViewings / totalTargets.viewingTarget) * 100).toFixed(2) +
                    "%"
                    : "0.00%",
                saleListingsPct: (totalTargets.saleListingsTarget || leaderValue == leaderValueMapping.salesListing)
                    ? ((responseData.totals.saleListings / totalTargets.saleListingsTarget) * 100).toFixed(
                        2
                    ) + "%"
                    : "0.00%",
                rentListingsPct: (totalTargets.rentListingsTarget || leaderValue == leaderValueMapping.rentalListing)
                    ? ((responseData.totals.rentListings / totalTargets.rentListingsTarget) * 100).toFixed(
                        2
                    ) + "%"
                    : "0.00%",
            };
          
          const totals = { ...responseData.totals, ...totalTargets, ...percentageTotals };
          setDataTotals(totals);

          setSampleData(transformedData);
          if(profileData.length > 0){
            setSampleData((prevData) =>
              prevData.map((item) => {
                const updated = profileData.find((result) => result.id === item.id);
                return updated ? { ...item, profile: updated.profile } : item;
              })
            );
          }
          else{
            getAgentImage();
          }
        } else {
          console.error("Failed to fetch data:", response.status, response.statusText);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("There is an error in pulling the data. Contact support to review it.");
        //setSampleData(initialSampleData);
        //setDataTotals({ ...sampleDataTotals, ...sampleDataPercentageTotals });
      } finally {
        setLoading(false);
      }
    }
  };

  const populateBranches = async () => {
    try {
      const response = await fetchWithTokenRetry(
        apiUrl + '/users/all-branches',
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
        const everyoneOptions = [
          { value: 0, label: "ALL" },
          ...responseData.map((branch) => ({ value: branch.id, label: branch.name })),
        ];

        setDropdownOptions(everyoneOptions);
      }
    } catch (error) {
      console.log(error);
      setDropdownOptions(everyoneOptions);
    }
  };

  const getAgentImage = async () => {
    const imagePromises = sampleData.map(async (item) => {
      const response = await fetchWithTokenRetry(
        `${apiUrl}/documents/${item.id}/UserMaintenance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        }
      );

      if (!response.ok) {
        console.warn(`Request failed for ID ${item.id}:`, response.status);
        return null;
      }

      const data = await response.json();
      if (data.length > 0) {
        const imageUrl = `${location.origin}/${data[0].name}`;
        return { id: item.id, profile: imageUrl };
      }
    });

      const imageResults = (await Promise.all(imagePromises)).filter(Boolean);

      setSampleData((prevData) =>
        prevData.map((item) => {
          const updated = imageResults.find((result) => result.id === item.id);
          return updated ? { ...item, profile: updated.profile } : item;
        })
      );
      
      setProfileData(imageResults);

  };

  const setEnvironment = () => {
    setToken(`Bearer ${JSON.parse(localStorage.jStorage)[opener.parent.application.context.get_apiTokenKey()]}`);
    setApiUrl(opener.parent.application.context.get_apiUrl());
    setGroupId(opener.parent.application.context.get_groupId());
    setCompanyLogo(opener.parent.application.context.get_companyLogoUrl());
  };
  
  const formatDateToISOString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    return `${year}-${month}-${day}T00:00:00`; // Local time without timezone
  };

  const getNoOfMonths = () => {
    const start = new Date(startMonth);
    const end = new Date(endMonth);
    start.setDate(1);
    end.setDate(1);
    const yearDifference = end.getFullYear() - start.getFullYear();
    const monthDifference = end.getMonth() - start.getMonth();
    return yearDifference * 12 + monthDifference + 1;
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
  useEffect(() => {
    const fetchData = async () => {
      if (!loading && token) {      
        if (selectedLeader.value === "agentwiseleadreport") {
          const data = await getAgentWiseLeadReport();
          setAgentWiseLeadReportData(data);
        } else if (selectedLeader.value === "leadsourcereport") {
          const data = await getLeadSourceReport();
          setleadSourceReportData(data);
        } else if (selectedLeader.value === "averageresponsetimereport") {
          const data = await getAverageResponseTimeReport();
          setaverageResponseTimeReportData(data);
        }        
      }
    };
    fetchData();
  }, [startMonth, endMonth, selectedLeader.value,selectedOption]); 
  
  const getLeadSourceReport = async () =>
    {      
      try {
        const DashboardGraph = {
         id: opener.parent.application.context.get_userId(),
          startDate: formatDateToISOString(startMonth),
          endDate: formatDateToISOString(new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0)),
        };
        const response = await fetchWithTokenRetry(
          apiUrl + '/graph/leadssource',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': token
            },
            body: JSON.stringify(DashboardGraph),
          }
        );
        if (response && response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
          return responseJson;
        }
      } catch (error) {
        console.error("Error fetching lead source report:", error);
       return {};
      }
    };

    const getAgentWiseLeadReport = async () =>
      {      
        try {
          const selectedIds = selectedOption.value === 0
          ? dropdownOptions.filter(option => option.value !== 0).map(option => option.value).join(',')
          : selectedOption.value;

          const DashboardGraph = {
            id: opener.parent.application.context.get_userId(),
            startDate: formatDateToISOString(startMonth),
            endDate: formatDateToISOString(new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0)),
            branch: selectedIds,
          };
          const response = await fetchWithTokenRetry(
            apiUrl + '/graph/agentwiseleadreport',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': token
              },
              body: JSON.stringify(DashboardGraph),
            }
          );
          if (response && response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
          }
        } catch (error) {
          console.error("Error fetching agent wise lead report:", error);
         return {};
        }
      };
      
      const getAverageResponseTimeReport = async () =>
        {      
          try {
            const DashboardGraph = {
             id: opener.parent.application.context.get_userId(),
              startDate: formatDateToISOString(startMonth),
              endDate: formatDateToISOString(new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0)),
            };
            const response = await fetchWithTokenRetry(
              apiUrl + '/averageresponsetimereport',
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': token
                },
                body: JSON.stringify(DashboardGraph),
              }
            );
            if (response && response.ok) {
              const responseJson = await response.json();
              console.log(responseJson);
              return responseJson;
            }
          } catch (error) {
            console.error("Error fetching avergae response time report:", error);
           return {};
          }
        };
  return (
    <>
      <div className="container-fluid">
        <div className="dashboard-wrapper row">
          <div className="leaderboard-sidebar col-2">
            <div>
              <img
                src={companyLogo}
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
                <MonthYearRangePicker
                  startMonth={startMonth}
                  setStartMonth={setStartMonth}
                  endMonth={endMonth}
                  setEndMonth={setEndMonth}
                />
                <Dropdown
                  label="Select Option"
                  options={dropdownOptions}                 
                  selected={selectedOption}
                  onSelectedChange={setSelectedOption}
                />
              </div>
            </div>

            {selectedLeader.value === "averageresponsetimereport" ? (
              <AverageResponseTimeReport  data={averageResponseTimeReportData}/>
            ) : selectedLeader.value === "agentwiseleadreport" ? (
              <AgentWiseLeadReport data={agentWiseLeadReportData}/>
            ) : selectedLeader.value === "leadsourcereport" ? (
              <LeadSourceReport data={leadSourceReportData} />
            ) : selectedLeader.value === "totalDashboard" ? (
              <TotalDashboard data={sampleData} />
            ) : loading ? ( // Display loading state
              <div className="loading">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
              </div>
            ) : (
              <>
                <LeaderbordCard
                  data={sampleData}
                  selectedLeader={selectedLeader}
                />
                <SecondLeaderboardCard
                  totals={selectedLeader.value == "saleDeals" ? NumberConversion(dataTotals.saleCommission) : (selectedLeader.value == "rentalDeals" ? NumberConversion(dataTotals.rentCommission) :
                    (selectedLeader.value == "calls" ? dataTotals.phoneCalls : (selectedLeader.value == "viewings" ? dataTotals.noOfViewings :
                      (selectedLeader.value == "salesListing" ? dataTotals.saleListings : dataTotals.rentListings)
                    )))}
                  deals={selectedLeader.value == "saleDeals" ? NumberConversion(dataTotals.saleListingValue) : (selectedLeader.value == "rentalDeals" ?
                    NumberConversion(dataTotals.rentListingValue) : 0)}
                  closed={selectedLeader.value == "saleDeals" ? dataTotals.saleListingsClosed : (selectedLeader.value == "rentalDeals" ? dataTotals.rentListingsClosed : 0)}
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
            <div className="branding">Powered by Goyzer.com | All rights reserved.</div>
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
    value: "totalDashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    label: "Lead Source Report",
    value: "leadsourcereport",
    icon: <HiDocumentReport />,
  },
  {
    label: "Agent Lead Report",
    value: "agentwiseleadreport",
    icon: <HiOutlineDocumentReport />,
  },
  {
    label: "Agent Response Time",
    value: "averageresponsetimereport",
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

const leaderValueMapping = {
  saleDeals: 1,
  rentalDeals: 2,
  calls: 3,
  viewings: 4,
  salesListing: 5,
  rentalListing: 6,
  totalDashboard: 7,
};
