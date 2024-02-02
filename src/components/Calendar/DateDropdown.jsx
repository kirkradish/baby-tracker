import { useDate, useDateUpdate } from '../../store/DateContext';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import { dateSlashFormatter } from '../../assets/commonFns';
import './DateDropdown.css';

export default function DateDropdown({ showClearFilter }) {
  const currentDate = new Date();
  const dateUpdater = useDateUpdate();
  const contextDate = useDate();

  const currentDateFormatted = dateSlashFormatter(currentDate);
  const contextDateFormatted = dateSlashFormatter(contextDate);

  const formattedDateFilterDate = contextDate ? contextDateFormatted : currentDateFormatted;

  function handleFilter() {
    dateUpdater(currentDate);
  }

  function grabCalendarDate(selectedDate) {
    dateUpdater(selectedDate);
  }

  return (
    <div className="date-dropdown">
      <p className="date-dropdown-title">Select a date</p>
      <Calendar dateLifter={grabCalendarDate} />
      {formattedDateFilterDate != currentDateFormatted && showClearFilter && (
        <button className="clear-calendar-filter" onClick={handleFilter}>Back to today</button>
      )}
    </div>
  );
}

DateDropdown.propTypes = {
  showClearFilter: PropTypes.bool.isRequired
};

DateDropdown.defaultProps = {
  showClearFilter: false
};