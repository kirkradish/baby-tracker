import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function BottleFeedingsPage() {
  const [stateDate, setStateDate] = useState(new Date());
  const navUpdater = useNavUpdate();
  const { bottles } = useContext(GlobalStateContext);

  const formattedDateFilterDate = `${stateDate.getMonth() + 1}/${stateDate.getDate()}/${stateDate.getFullYear()}`;
  const filteredList = bottles.filter(item => (item.date === formattedDateFilterDate));

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
        <DateDropdown lifter={dateLifter} inputDate={stateDate} showClearFilter={true} />
      </div>
      {filteredList.length > 0 ? (
        filteredList.map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            path="detail"
            header={item.header}
            aside={item.time}
          />
        ))
      ) : (
        <p>Enter the first bottle feeding of the day.</p>
      )}
    </section>
  );
}