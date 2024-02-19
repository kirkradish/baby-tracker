import { useDate, useDateUpdate } from '../../store/DateContext';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// https://www.npmjs.com/package/react-datepicker?activeTab=readme

export default function Calendar({ itemDate }) {
  const dateUpdater = useDateUpdate();
  const contextDate = useDate();
  const propDate = itemDate.length > 1 ? new Date(itemDate) : undefined;
  const theDate = propDate || contextDate;

  function handleChange(date) {
    dateUpdater(date);
  }

  return (
    <DatePicker selected={theDate} onChange={(date) => handleChange(date)} />
  );
}

Calendar.propTypes = {
  itemDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
};

Calendar.defaultProps = {
  itemDate: ''
};