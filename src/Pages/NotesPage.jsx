import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { NavLink } from 'react-router-dom'
import { notes } from '../assets/data/notes';
import ListItem from '../components/ListItem/ListItem';
import './Pages.css';

export default function NotesPage() {
  const navUpdater = useNavUpdate();

  useEffect(() => {
    navUpdater(true);
  }, []);

  return(
    <section className="page tracker-container">
      <div className="details-masthead details-masthead--end">
        <NavLink to='new'>
          <button className="entry-function">
            <span className="bold-text">Add note</span>
            <span className="material-symbols-outlined">add</span>
          </button>
        </NavLink>
      </div>
      {notes.map(item => (
        <ListItem
          key={item.id}
          id={item.id}
          path="note-detail"
          header={item.header}
          aside={item.date}
        />
      ))}
    </section>
  );
}