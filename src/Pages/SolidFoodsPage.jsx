import { solidFoods } from '../assets/data/solidFoods';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './pages.css';

export default function SolidFoodsPage() {
  return (
    <section className="page tracker-container">
      <div className="date-picker">
        <DateDropdown />
      </div>
      {solidFoods.map(item => (
        <ListItem
          key={item.header}
          header={item.header}
          aside={item.date}
        />
      ))}
    </section>
  );
}