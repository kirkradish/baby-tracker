import { useState, useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function SleepPage() {
  const [stateDate, setStateDate] = useState(new Date());
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  
  const formattedDateFilterDate = `${stateDate.getMonth() + 1}/${stateDate.getDate()}/${stateDate.getFullYear()}`;
  const filteredList = sleepSchedule.filter(item => (item.date === formattedDateFilterDate));

  useEffect(() => {
    navUpdater(true);
  }, []);

  const dateLifter = (d) => {
    setStateDate(d);
  }

  return (
    <section className="page tracker-container">
      <div className="date-picker">
      <DateDropdown lifter={dateLifter} inputDate={stateDate} showClearFilter={true} />
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
        <p>Enter the first sleep schedule of the day.</p>
      )}
    </section>
  );
}