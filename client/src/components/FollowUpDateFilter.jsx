// FollowUpDateFilter.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FollowUpDateFilter = ({ filters, dispatch, setFilters }) => {
  const startDate = filters.followUpStartDate
    ? new Date(filters.followUpStartDate)
    : null;
  const endDate = filters.followUpEndDate
    ? new Date(filters.followUpEndDate)
    : null;

  const handleChange = (dates) => {
    const [start, end] = dates;

    dispatch(
      setFilters({
        ...filters,
        followUpStartDate: start ? start.toLocaleDateString("en-CA") : "",
        followUpEndDate: end ? end.toLocaleDateString("en-CA") : "",
      })
    );
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const placeholderText = () => {
    if (!startDate && !endDate) {
      // No dates selected
      return "Select Follow-Up Date";
    }

    if (startDate && endDate) {
      if (formatDate(startDate) === formatDate(endDate)) {
        if (formatDate(startDate) === formatDate(new Date())) {
          // Both dates are today
          return "Today's Follow-Up";
        } else {
          // Same date but not today
          return formatDate(startDate);
        }
      } else {
        // Range selected
        return `${formatDate(startDate)} – ${formatDate(endDate)}`;
      }
    }

    // Only startDate selected (rare case)
    if (startDate) return formatDate(startDate);

    return "Select Follow-Up Date";
  };

  return (
    <div className="date-range-wrapper">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        isClearable
        placeholderText={placeholderText()}
        dateFormat="yyyy-MM-dd"
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        className="clg-datepicker"
      />
    </div>
  );
};

export default FollowUpDateFilter;
