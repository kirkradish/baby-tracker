import { useDate } from '../store/DateContext';
import { solidFoods } from '../assets/data/solidFoods';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function SolidFoodsPage() {
  const contextDate = useDate();
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = solidFoods.filter(item => (item.date === formattedDateFilterDate));

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
            path="solid-food-detail"
            header={item.header}
            aside={item.date}
          />
        ))
      ) : (
        <p>No documented solid food feedings for this date.</p>
      )}
    </section>
  );
}