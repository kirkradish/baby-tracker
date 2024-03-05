import { useState, useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { pureeFeedinds } from '../assets/data/pureeFeedings.js';
import Calendar from '../components/Calendar/Calendar.jsx';
import ListItem from '../components/ListItem/ListItem.jsx';
import './Pages.css';

export default function PureePage() {
  const [stateDate, setStateDate] = useState(new Date());
  const navUpdater = useNavUpdate();

  const formattedDateFilterDate = `${stateDate.getMonth() + 1}/${stateDate.getDate()}/${stateDate.getFullYear()}`;
  const filteredList = pureeFeedinds.filter(item => (item.date === formattedDateFilterDate));

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