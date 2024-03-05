import { useState, useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import Calendar from '../components/Calendar/Calendar';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function SleepPage() {
  const [stateDate, setStateDate] = useState(new Date());
  const navUpdater = useNavUpdate();
  
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
      <Calendar lifter={dateLifter} inputDate={stateDate} showClearFilter={true} />
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