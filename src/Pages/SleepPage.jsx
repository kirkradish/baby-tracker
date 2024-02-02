import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function SleepPage() {
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = sleepSchedule.filter(item => (item.date === formattedDateFilterDate));

  useEffect(() => {
    navUpdater(true);
  }, []);

  return (
    <section className="page tracker-container">
      <div className="date-picker">
        <DateDropdown showClearFilter={true} />
      </div>
      {filteredList.length > 0 ? (
        filteredList.map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            path="sleep-schedule-detail"
            header={item.header}
            aside={item.date}
          />
        ))
      ) : (
        <p>No documented sleep for this date.</p>
      )}
    </section>
  );
}