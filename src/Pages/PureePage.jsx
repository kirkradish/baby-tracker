import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext.jsx';
import { pureeFeedinds } from '../assets/data/pureeFeedings.js';
import DateDropdown from '../components/Calendar/DateDropdown.jsx';
import ListItem from '../components/ListItem/ListItem.jsx';
import './Pages.css';

export default function PureePage() {
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = pureeFeedinds.filter(item => (item.date === formattedDateFilterDate));

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
            path="puree-detail"
            header={item.header}
            aside={item.date}
          />
        ))
      ) : (
        <p>Enter the first feeding of pur&eacute;e for the day.</p>
      )}
    </section>
  );
}