import { useState } from 'react';
import { useDate, useDateUpdate } from '../../store/DateContext';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// https://www.npmjs.com/package/react-datepicker?activeTab=readme

export default function Calendar({ lifter, inputDate }) {
  const [stateDate, setStateDate] = useState(new Date(inputDate) || new Date());

  const dateUpdater = useDateUpdate();
  const contextDate = useDate();
  const propDate = inputDate.length > 1 ? new Date(inputDate) : undefined;
  const theDate = propDate || contextDate;

  function handleChange(date) {
    lifter(date);
    setStateDate(date);
    // dateUpdater(date);
  }

  return (
    <DatePicker
      // selected={theDate}
      selected={stateDate}
      onChange={(date) => handleChange(date)}
    />
  );
}

Calendar.propTypes = {
  lifter: PropTypes.func,
  inputDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
};

Calendar.defaultProps = {
  lifter: undefined,
  inputDate: ''
};