import { sleepSchedule } from '../assets/data/sleepSchedule';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './pages.css';

export default function SleepPage() {
  return (
    <section className="page tracker-container">
      <div className="date-picker">
        <DateDropdown />
      </div>
      {sleepSchedule.map(item => (
        <ListItem
          key={item.header}
          header={item.header}
          aside={item.date}
        />
      ))}
    </section>
  );
}