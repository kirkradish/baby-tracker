import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import { solidFoods } from '../assets/data/solidFoods';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function SolidFoodsPage() {
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = solidFoods.filter(item => (item.date === formattedDateFilterDate));

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
            path="solid-food-detail"
            header={item.header}
            aside={item.date}
          />
        ))
      ) : (
        <p>Enter the first solid food feeding of the day.</p>
      )}
    </section>
  );
}