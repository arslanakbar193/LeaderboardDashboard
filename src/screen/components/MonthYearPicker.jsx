import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon from react-icons

const MonthYearRangePicker = () => {
  const [startDate, setStartDate] = useState(null); // Default: No date selected
  const [endDate, setEndDate] = useState(null); // Default: No date selected

  // Custom input component to include the dropdown icon
  const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        cursor: "pointer",
        gap: "8px",
        width: "176px",
        justifyContent: "space-between",
      }}
      onClick={onClick}
      ref={ref}
    >
      <span>{value || placeholder}</span>
      <FaCalendarAlt style={{ color: "#888" }} />
    </div>
  ));

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {/* Start Date Picker */}
      <div className="datepicker-settings">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          minDate={new Date(2024, 10)} // Minimum: November 2024
          maxDate={endDate} // Dynamically limit max date based on selected end date
          placeholderText="Start Month/Year" // Placeholder text inside the input
          customInput={<CustomInput />} // Use the custom input with an icon
        />
      </div>

      {/* End Date Picker */}
      <div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          minDate={startDate} // Dynamically set minimum to the selected start date
          placeholderText="End Month/Year" // Placeholder text inside the input
          customInput={<CustomInput />} // Use the custom input with an icon
        />
      </div>
    </div>
  );
};

export default MonthYearRangePicker;
