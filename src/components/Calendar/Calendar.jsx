import { useDate, useDateUpdate } from '../../store/DateContext';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// https://www.npmjs.com/package/react-datepicker?activeTab=readme

export default function Calendar() {
  const dateUpdater = useDateUpdate(new Date());
  const theDate = useDate();

  function handleChange(date) {
    dateUpdater(date);
  }

  return (
    <DatePicker selected={theDate} onChange={(date) => handleChange(date)} />
  );
}

Calendar.propTypes = {
  dateLifter: PropTypes.func.isRequired
}