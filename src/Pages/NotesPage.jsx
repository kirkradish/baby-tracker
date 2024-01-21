import { notes } from '../assets/data/notes';
import ListItem from '../components/ListItem/ListItem';
import './pages.css';

export default function NotesPage() {
  return(
    <section className="page tracker-container">
      {notes.map(item => (
        <ListItem
          key={item.header}
          header={item.header}
          aside={item.date}
        />
      ))}
    </section>
  );
}