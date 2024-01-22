import { useParams } from 'react-router-dom';
import { notes } from '../assets/data/notes';
import './DetailsPages.css';

export default function DetailsPage() {
  const { id } = useParams();
  // const parentPageData = window.location.href.split('/')[3];
  // use Redux or some state management to dynamically load js data objects

  return (
    <section className="page tracker-container">
      {/* need back button */}
      {/* need edit button */}
      {notes.filter(item => item.id === id).map(notePiece => (
        <article key={notePiece.id} className="detail-content">
          <header>
            <h2>{notePiece.header}</h2>
            <aside>{notePiece.date}</aside>
          </header>
          <p>{notePiece.body}</p>
        </article>  
      ))}
    </section>
  );
}