import { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import DateDropdown from '../components/Calendar/DateDropdown';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function BottleFeedingsPage() {
  const navUpdater = useNavUpdate();
  const contextDate = useDate();
  const { bottles } = useContext(GlobalStateContext);
  const formattedDateFilterDate = `${contextDate.getMonth() + 1}/${contextDate.getDate()}/${contextDate.getFullYear()}`;
  const filteredList = bottles.filter(item => (item.date === formattedDateFilterDate));

  useEffect(() => {
    navUpdater(true);
  }, []);

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
        <DateDropdown showClearFilter={true} />
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