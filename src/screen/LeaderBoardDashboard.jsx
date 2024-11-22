import { useState , useEffect } from 'react';  
import LeaderbordCard from "./components/LeaderboradCard";
import SecondLeaderboardCard from "./components/SecondLeaderboradCard";
import ThirdLeaderboardCard from "./components/ThirdLeaderboradCard";
import Avatar from "../images/avatar.png";
import dollar from "../images/dollar.png";
import dollarcoin from "../images/dollar-coin.png";
import iconlabel from "../images/label.png";
import Dropdown from "./components/Dropdown";
import TotalDashboard from "./components/TotalDashboard";
import NewReports from './components/NewReports';

import FullscreenToggle from './components/FullScreen';
// import ToggleComponent from './components/ToggleComponent';

const LeaderBoardDashboard = () => {
  
  const [selectedLeader, setSelectedLeader] = useState(leaderOptions[0]);
  const [selectedMember, setSelectedMember] = useState(everyoneOptions[0]);
  const [selectedMonth, setSelectedMonth] = useState(everymonthOptions[0]);
  const [sampleData, setSampleData] = useState(initialSampleData);

  useEffect(() => {
    if (selectedLeader.value === 'leaders') {
      setSampleData(initialSampleData);
    } else if (selectedLeader.value === 'leaders2') {
      setSampleData(initialSampleData1);
    } else if (selectedLeader.value === 'leaders3') {
      setSampleData(initialSampleData2);
    } else if (selectedLeader.value === 'leaders4') {
      setSampleData(initialSampleData3);
    } else if (selectedLeader.value === 'leaders5') {
      setSampleData([
        ...initialSampleData,
        ...initialSampleData1,
        ...initialSampleData2,
        ...initialSampleData3,
        ...initialSampleData4
      ]);
    }
  }, [selectedLeader]);
  const handleDropdownChange = (newSelection) => {
    console.log("Dropdown value changed to:", newSelection);
    setSelectedLeader(newSelection);
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="topbar">
          <Dropdown
            label="Show me"
            options={leaderOptions}
  selected={selectedLeader}
            onSelectedChange={handleDropdownChange}
          />
          <div className='top-right-select'>
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
            <FullscreenToggle />
          </div>
          
        </div>
        {selectedLeader.value === 'leaders5' && (
          <TotalDashboard data={sampleData} />
        )}

        {selectedLeader.value === 'leaders6' && (
          <NewReports data={sampleData} />
        )}

        {(selectedLeader.value !== 'leaders5' && selectedLeader.value !== 'leaders6') && (
          <>
            <LeaderbordCard data={sampleData} />
            <SecondLeaderboardCard data={secondsampleData} />
            <ThirdLeaderboardCard data={thirdsampleData} />
          </>
        )}

        
        
      </div>
    </>
  );
};

export default LeaderBoardDashboard;

const initialSampleData = [
  {
    name: "Emily Williams",
    profile: Avatar,
    rank: "1",
    totalDeals: 15,   // Make sure this property exists
    totalCalls: 35,  // Add all required properties
    totalViewings: 65,
    totalListings: 12,
    totalEarning: "$3.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Lily Adams",
    profile: Avatar,
    rank: "2",
    totalDeals: 17,   // Make sure this property exists
    totalCalls: 212,  // Add all required properties
    totalViewings: 21,
    totalListings: 238,
    totalEarning: "$2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Sarah Brown",
    profile: Avatar,
    rank: "2",
    totalDeals: 67,   // Make sure this property exists
    totalCalls: 20,  // Add all required properties
    totalViewings: 83,
    totalListings: 58,
    totalEarning: "$2.9M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  
];
const initialSampleData1 = [
  {
    name: "Emily Williams2",
    profile: Avatar,
    rank: "1",
    totalDeals:99,   // Make sure this property exists
    totalCalls: 15,  // Add all required properties
    totalViewings: 85,
    totalListings: 712,
    totalEarning: "$34.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Lily Adams 2",
    profile: Avatar,
    rank: "2",
    totalDeals: 57,   // Make sure this property exists
    totalCalls: 512,  // Add all required properties
    totalViewings: 53,
    totalListings: 58,
    totalEarning: "$234.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Sarah Brown 2",
    profile: Avatar,
    rank: "2",
    totalDeals: 47,   // Make sure this property exists
    totalCalls: 312,  // Add all required properties
    totalViewings: 33,
    totalListings: 38,
    totalEarning: "$25.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
];
const initialSampleData2 = [
  {
    name: "Emily Williams 3",
    profile: Avatar,
    rank: "1",
    totalDeals: 29,   // Make sure this property exists
    totalCalls: 215,  // Add all required properties
    totalViewings: 25,
    totalListings: 212,
    totalEarning: "$33.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Sarah Brown 3",
    profile: Avatar,
    rank: "2",
    totalDeals: 57,   // Make sure this property exists
    totalCalls: 12,  // Add all required properties
    totalViewings: 3,
    totalListings:48,
    totalEarning: "$9.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Lily Adams 3",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,   // Make sure this property exists
    totalCalls: 12,  // Add all required properties
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "$2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
];
const initialSampleData3 = [
  {
    name: "Lily Adams 4",
    profile: Avatar,
    rank: "1",
    totalDeals: 9,   // Make sure this property exists
    totalCalls: 15,  // Add all required properties
    totalViewings: 5,
    totalListings: 12,
    totalEarning: "$3.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "Sarah Brwon 4",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,   // Make sure this property exists
    totalCalls: 12,  // Add all required properties
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "$2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Emily Williams 4",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,   // Make sure this property exists
    totalCalls: 12,  // Add all required properties
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "$2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
];
const initialSampleData4 = [
  {
    name: "gassy asdadasdasdadadssdadasadsdas",
    profile: Avatar,
    rank: "1",
    totalDeals: 9,   // Make sure this property exists
    totalCalls: 15,  // Add all required properties
    totalViewings: 5,
    totalListings: 12,
    totalEarning: "$3.4M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "110%",
  },
  {
    name: "brarh asdadaasdasddsadasdas",
    profile: Avatar,
    rank: "2",
    totalDeals: 7,   // Make sure this property exists
    totalCalls: 12,  // Add all required properties
    totalViewings: 3,
    totalListings: 8,
    totalEarning: "$2.7M",
    status: "Deals closed",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
];
const secondsampleData = [
  {
    icon: dollar,
    totalEarning: "$3.4M",
    status: "Total Commision",
  },
  {
    icon: dollarcoin,
    totalEarning: "$3.4M",
    status: "Deals closed"
  },
  {
    icon: iconlabel,
    totalEarning: "$3.4M",
    status: "Deal close"
  },
  {
    icon: dollar,
    totalEarning: "$3.4M",
    status: "Deal close"  
  },
];

const thirdsampleData = [
  {
    name: "Lara Boyd",
    profile: Avatar,
    rank: "4",

    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "90%",
  },
  {
    name: "Devin Cook",
    profile: Avatar,
    rank: "5",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    commission: "$92.2k",
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "60%",
  },
  {
    name: "Jennifer McKay",
    profile: Avatar,
    rank: "6",
    commission: "$92.2k",
    icon: dollar,
    icondollar: dollarcoin,
    iconlabel: iconlabel,
    dealAverage: "$381.5k",
    closed: 9,
    dealPercentage: "180%",
  },
];



const leaderOptions = [
  { label: 'Deals Dashboard', value: 'leaders' },
  { label: 'Calls Dashboard', value: 'leaders2' },
  { label: 'Viewings Dashboard', value: 'leaders3' } ,   
  { label: 'Listing Dashboard', value: 'leaders4' }, 
  { label: 'Total Dashboard', value: 'leaders5' },
  { label: 'Reports', value: 'leaders6' }
];


const everyoneOptions = [
  { label: 'EveryOne', value: '1' },
  { label: 'Emily Williams', value: '2' },
  { label: 'Lily Adams', value: '3' }
];
const everymonthOptions = [
  { label: 'This month', value: '1' },
  { label: 'This Quarter', value: '2' },
  { label: 'Year To Date', value: '3' }
];