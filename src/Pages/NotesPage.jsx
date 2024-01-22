import { notes } from '../assets/data/notes';
import ListItem from '../components/ListItem/ListItem';
import './pages.css';

export default function NotesPage() {
  return(
    <section className="page tracker-container">
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