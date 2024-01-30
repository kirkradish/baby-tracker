import { useNavUpdate } from '../store/NavContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { notes } from '../assets/data/notes';
import { bottleFeedings } from '../assets/data/bottleFeedings';
import { solidFoods } from '../assets/data/solidFoods';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import './DetailsPages.css';

export default function DetailsPage() {
  const navUpdater = useNavUpdate();

  const { id } = useParams();
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(-1);
    navUpdater();
  }

  const parentPageData = window.location.href.split('/')[3];
  let displayObj;
  
  switch(parentPageData) {
    case 'bottle-feedings' :
      displayObj = bottleFeedings;
      break;
    case 'solid-foods' :
      displayObj = solidFoods;
      break;
    case 'sleep-schedule' :
      displayObj = sleepSchedule;
      break;
    default:
      displayObj = notes;
  }

  return (
    <section className="page tracker-container">
      <div className="details-masthead">
        <button onClick={handleBackClick}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button>
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      {displayObj.filter(item => item.id === id).map(notePiece => (
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