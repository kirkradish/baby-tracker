import { useDate, useDateUpdate } from '../../store/DateContext';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import { dateSlashFormatter } from '../../assets/commonFns';
import './DateDropdown.css';

export default function DateDropdown({ lifter, inputDate, showClearFilter }) {
  const currentDate = new Date();
  const dateUpdater = useDateUpdate();
  const contextDate = useDate();

  const currentDateFormatted = dateSlashFormatter(currentDate);
  const contextDateFormatted = dateSlashFormatter(contextDate);

  const formattedDateFilterDate = (!inputDate && contextDate) ? contextDateFormatted : currentDateFormatted;

  function handleFilter() {
    dateUpdater(currentDate);
  }

  return (
    <div className="date-dropdown">
      <p className="date-dropdown-title">Select a date</p>
      <Calendar lifter={lifter} inputDate={inputDate} />
      {formattedDateFilterDate != currentDateFormatted && showClearFilter && (
        <button className="clear-calendar-filter" onClick={handleFilter}>Back to today</button>
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