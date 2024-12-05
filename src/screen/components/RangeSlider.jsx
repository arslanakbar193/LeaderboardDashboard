import React, { useState, useEffect } from 'react';

const RangeSlider = ({ value: initialValue = 0 }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        setValue(initialValue.replace("%", "")); 
    }, [initialValue]);

    const sliderStyle = {
        background: `linear-gradient(to right, #1f7bc1 ${value}%, #1f7bc129 ${value}%)`
    };

    return (
        <div className="range-slider">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="slider"
                style={sliderStyle}
            />
            <div className="slider-value" style={{ left: `${value}%` }}>
                {value}
            </div>
        </div>
    );
};

export default RangeSlider;