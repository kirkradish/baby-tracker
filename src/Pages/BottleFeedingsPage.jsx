import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import { bottleFeedings } from '../assets/data/bottleFeedings';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function BottleFeedingsPage() {
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = bottleFeedings.filter(item => (item.date === formattedDateFilterDate));

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
            path="bottle-feeding-detail"
            header={item.header}
            aside={item.date}
          />
        ))
      ) : (
        <p>Enter the first bottle feeding of the day.</p>
      )}
    </section>
  );
}