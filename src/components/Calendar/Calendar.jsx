import { useState } from 'react';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import { dateSlashFormatter } from '../../assets/commonFns';
import './CalendarDropdown.css';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// https://www.npmjs.com/package/react-datepicker?activeTab=readme

export default function Calendar({ lifter, inputDate, showClearFilter }) {
  const [stateDate, setStateDate] = useState(new Date(inputDate) || new Date());
  const currentDate = new Date();
  const formattedDates = {};
  formattedDates.current = dateSlashFormatter(currentDate);
  formattedDates.userInput = dateSlashFormatter(inputDate);

  function handleChange(date) {
    formattedDates.userInput = date;
    lifter(date);
    setStateDate(date);
  }
  function handleFilterChange() {
    lifter(new Date(formattedDates.current));
    setStateDate(new Date(formattedDates.current));
  }

  return (
    <div className="date-dropdown">
      <p className="date-dropdown-title">Select a date</p>
      <DatePicker
        selected={stateDate}
        onChange={(date) => handleChange(date)}
      />
      {(formattedDates.current !== formattedDates.userInput) && showClearFilter && (
        <button className="clear-calendar-filter" onClick={handleFilterChange}>Back to today</button>
      )}
    </div>
  );
}

Calendar.propTypes = {
  lifter: PropTypes.func,
  inputDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  showClearFilter: PropTypes.bool
};

Calendar.defaultProps = {
  lifter: undefined,
  inputDate: '',
  showClearFilter: false
};