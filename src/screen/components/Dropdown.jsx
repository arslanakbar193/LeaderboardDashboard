import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange, multiSelect = false }) => {
  const [open, setOpen] = useState(false);
  const [subSelected, setSubSelected] = useState(null); // For sub-options in Everyone dropdown
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const handleSelection = (option) => {
    if (multiSelect) {
      // Handle multi-select logic for checkboxes
      const isSelected = selected.some((item) => item.value === option.value);
      const updatedSelection = isSelected
        ? selected.filter((item) => item.value !== option.value)
        : [...selected, option];
      onSelectedChange(updatedSelection);
    } else {
      // Handle single-select logic for radio buttons
      onSelectedChange(option);
      if (!option.subOptions) {
        setSubSelected(null); // Reset sub-selection if no sub-options
      }
    }
  };

  const handleSubSelection = (subOption) => {
    setSubSelected(subOption);
  };

  const renderedOptions = options.map((option) => {
    const isSelected = multiSelect
      ? selected.some((item) => item.value === option.value)
      : selected?.value === option.value;

    return (
      <div key={option.value} className="item">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "5px 0",
          }}
        >
          <input
            id={`dropdown-${option.value}`}
            type={multiSelect ? "checkbox" : "radio"}
            name={multiSelect ? undefined : "dropdown-selection"}
            checked={isSelected}
            onChange={() => handleSelection(option)}
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              marginRight: "8px",
              border: "2px solid #ccc",
              borderRadius: multiSelect ? "3px" : "50%", // Checkbox (square) or radio (circle)
              backgroundColor: isSelected ? "rgb(31 123 193)" : "#fff",
              transition: "background-color 0.2s ease",
            }}
          ></span>
          <span style={{ fontSize: "14px" }}>{option.label}</span>
        </label>

        {/* Render sub-options for single-select options with subOptions */}
        {!multiSelect && selected?.value === option.value && option.subOptions && (
          <div style={{ paddingLeft: "20px" }}>
            {option.subOptions.map((subOption) => (
              <div key={subOption.value} className="item">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "5px 0",
                  }}
                >
                  <input
                    id={`subdropdown-${subOption.value}`}
                    type="radio"
                    name="subdropdown-selection"
                    checked={subSelected?.value === subOption.value}
                    onChange={() => handleSubSelection(subOption)}
                    style={{
                      visibility: "hidden",
                      position: "absolute",
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                      border: "2px solid #ccc",
                      borderRadius: "3px", // Square corners for sub-checkbox
                      backgroundColor:
                        subSelected?.value === subOption.value ? "rgb(31 123 193)" : "#fff",
                      transition: "background-color 0.2s ease",
                    }}
                  ></span>
                  <span style={{ fontSize: "14px" }}>{subOption.label}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        {/* <label className="label">{label}</label> */}
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">
            {multiSelect
              ? selected.length > 0
                ? `${selected.length} selected`
                : "Select Months"
              : subSelected
              ? subSelected.label
              : selected
              ? selected.label
              : "Select Members"}
          </div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
