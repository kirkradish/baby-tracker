import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// https://www.npmjs.com/package/react-datepicker?activeTab=readme

export default function Calendar({ dateLifter }) {
  const [startDate, setStartDate] = useState(new Date());

  function handleChange(date) {
    setStartDate(date);
    dateLifter(date);
  }

  return (
    <DatePicker selected={startDate} onChange={(date) => handleChange(date)} />
  );
}

Calendar.propTypes = {
  dateLifter: PropTypes.func.isRequired
}