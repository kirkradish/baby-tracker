import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useNavUpdate } from '../store/NavContext.jsx';
import { grabParentFromUrl } from '../assets/commonFns.js';
import { useParams, useNavigate } from 'react-router-dom';
import { notes } from '../assets/data/notes';
import { bottleFeedings } from '../assets/data/bottleFeedings';
import { pureeFeedinds } from '../assets/data/pureeFeedings.js';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import './DetailsPages.css';

export default function DetailsPage() {
  const navUpdater = useNavUpdate();

  useEffect(() => {
    navUpdater(false);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(`/${grabParentFromUrl()}`);
    navUpdater(true);
  }

  const parentPageData = grabParentFromUrl();
  let displayObj;
  
  switch(parentPageData) {
    case 'bottle-feedings' :
      displayObj = bottleFeedings;
      break;
    case 'puree-foods' :
      displayObj = pureeFeedinds;
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
        <button className="page-function" onClick={handleBackClick}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <NavLink to={`../editor/${id}`}>
          <span className="material-symbols-outlined">edit</span>
        </NavLink>
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