import { useDate, useDateUpdate } from '../../store/DateContext';
import Calendar from './Calendar';
import './DateDropdown.css';

export default function DateDropdown() {
  const currentDate = new Date();
  const dateUpdater = useDateUpdate();
  const contextDate = useDate();

  const currentDateFormatted = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  const contextDateFormatted = contextDate ? `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}` : '';

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
      {formattedDateFilterDate != currentDateFormatted && (
        <button className="clear-calendar-filter" onClick={handleFilter}>Back to today</button>
      )}
    </div>
  );
}