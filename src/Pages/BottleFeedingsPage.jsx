import { bottleFeedings } from '../assets/data/bottleFeedings';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './pages.css';

export default function BottleFeedingsPage() {
  return (
    <section className="page tracker-container">
      <div className="date-picker">
        <DateDropdown />
      </div>
      {bottleFeedings.map(item => (
        <ListItem
          key={item.header}
          id={item.id}
          path="bottle-feeding-detail"
          data={bottleFeedings}
          header={item.header}
          aside={item.date}
        />
      ))}
    </section>
  );
}