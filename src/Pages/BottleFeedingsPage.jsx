import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { displayFormattedTime, cutDateObjToDateOnly } from '../assets/commonFns.js';
import Calendar from '../components/Calendar/Calendar';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

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
      <div className="date-picker">
        <Calendar lifter={dateLifter} inputDate={stateDate} showClearFilter={true} />
      </div>
      {filteredList.length > 0 ? (
        filteredList.map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            path="detail"
            header={item.header}
            aside={displayFormattedTime(new Date(item.date))}
          />
        ))
      ) : (
        <p>Enter the first bottle feeding of the day.</p>
      )}
    </section>
  );
}