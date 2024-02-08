import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import { useNavUpdate } from '../store/NavContext.jsx';
import { grabParentFromUrl } from '../assets/commonFns.js';
import { useParams, useNavigate } from 'react-router-dom';
import { notes } from '../assets/data/notes';
import DeleteModal from '../components/DeleteModal/DeleteModal.jsx';
import { bottleFeedings } from '../assets/data/bottleFeedings';
import { pureeFeedinds } from '../assets/data/pureeFeedings.js';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import './DetailsPages.css';

export default function DetailsPage() {
  const navUpdater = useNavUpdate();
  const dialog = useRef();

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

  const idObj = displayObj.filter(item => item.id === id)[0];

  function checkDeleteResponse(response) {
    if (response === 'submit') {
      const newNotes = notes.filter(note => note.id !== id);
      navigate(`/${grabParentFromUrl()}`, {state: {newNotes}});
    }
  }

  function handleDeleteButtonClick() {
    dialog.current.open();
  }

  return (
    <>
      <DeleteModal
        ref={dialog}
        noteName={idObj.header}
        checker={checkDeleteResponse}
      />
      <section className="page tracker-container">
        <div className="details-masthead">
          <button className="page-function" onClick={handleBackClick}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <NavLink to={`../editor/${id}`}>
            <span className="material-symbols-outlined">edit</span>
          </NavLink>
        </div>

        <article key={idObj.id} className="detail-content">
          <header>
            <h2>{idObj.header}</h2>
            <aside>{idObj.date}</aside>
          </header>
          <p>{idObj.body}</p>
        </article>

        <div className="details-footer">
          <button onClick={handleDeleteButtonClick}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </section>
    </>
  );
}