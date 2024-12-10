import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const MonthYearRangePicker = ({ startMonth, setStartMonth, endMonth, setEndMonth }) => {

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
      <div className="datepicker-settings">
        <DatePicker
          selected={startMonth}
          onChange={(date) => setStartMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          placeholderText="Start Month/Year"
          customInput={<CustomInput />}
        />
      </div>

      <div>
        <DatePicker
          selected={endMonth}
          onChange={(date) => setEndMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          placeholderText="End Month/Year"
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};

export default MonthYearRangePicker;
