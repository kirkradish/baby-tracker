import { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import { dateSlashFormatter } from '../../assets/commonFns';
import './DateDropdown.css';

export default function DateDropdown({ lifter, inputDate, showClearFilter }) {
  const [stateDate, setStateDate] = useState(dateSlashFormatter(new Date()));
  const currentDate = new Date();
  const currentDateFormatted = dateSlashFormatter(currentDate);
  const userDateFormatted = dateSlashFormatter(inputDate);

  function handleRemoveFilter() {
    console.log('dang son');
    setStateDate(currentDateFormatted);
  }

  return (
    <div className="date-dropdown">
      OK TO DELETE
      <p className="date-dropdown-title">Select a date</p>
      <Calendar lifter={lifter} inputDate={stateDate} />
      {(currentDateFormatted !== userDateFormatted) && showClearFilter && (
        <button className="clear-calendar-filter" onClick={handleRemoveFilter}>Back to today</button>
      )}
    </div>
  );
}

DateDropdown.propTypes = {
  lifter: PropTypes.func,
  inputDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  showClearFilter: PropTypes.bool
};

DateDropdown.defaultProps = {
  lifter: undefined,
  inputDate: '',
  showClearFilter: false
};