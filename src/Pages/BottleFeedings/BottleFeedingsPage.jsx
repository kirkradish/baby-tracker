import { useState, useEffect, useContext } from 'react';
import { useNavUpdate } from '../../store/NavContext.jsx';
import { NavLink } from 'react-router-dom';
import { GlobalStateContext } from '../../store/GlobalState.jsx';
import { displayFormattedTime, cutDateObjToDateOnly, dateSorter } from '../../assets/commonFns.js';
import Calendar from '../../components/Calendar/Calendar.jsx';
import ListItem from '../../components/ListItem/ListItem.jsx';
import '../Pages.css';

export default function BottleFeedingsPage() {
  const [stateDate, setStateDate] = useState(new Date());
  const navUpdater = useNavUpdate();
  const { bottles } = useContext(GlobalStateContext);

  const shortenedDate = cutDateObjToDateOnly(stateDate);
  const filteredList = bottles.filter(item => item.date.toString().includes(shortenedDate));
  useEffect(() => {
    navUpdater(true);
  }, []);

  const dateLifter = (d) => {
    setStateDate(d);
  }

  return (
    <section className="page tracker-container">
      <div className="details-masthead details-masthead--end">
        <NavLink to='add-bottle'>
          <button className="entry-function">
            <span className="bold-text">Add bottle feeding</span>
            <span className="material-symbols-outlined">add</span>
          </button>
        </NavLink>
      </div>
      <div className="date-picker form-block">
        <Calendar lifter={dateLifter} inputDate={stateDate} showClearFilter={true} />
      </div>
      {filteredList.length > 0 ? (
        dateSorter(filteredList).map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            path="detail"
            header={`${item.header} ${item.measurementType}`}
            aside={displayFormattedTime(new Date(item.date))}
          />
        ))
      ) : (
        <p>Enter the first bottle feeding of the day.</p>
      )}
    </section>
  );
}