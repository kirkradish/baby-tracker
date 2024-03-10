import { useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { grabParentFromUrl, dateSlashFormatter, displayFormattedTime } from '../assets/commonFns.js';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal/DeleteModal.jsx';
import { pureeFeedinds } from '../assets/data/pureeFeedings.js';
import { sleepSchedule } from '../assets/data/sleepSchedule';
import './DetailsPages.css';

export default function DetailsPage() {
  const navUpdater = useNavUpdate();
  const dialog = useRef();
  const { notes, notesUpdates, bottles, bottleUpdates } = useContext(GlobalStateContext);

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
  const detailGroup = {};
  
  switch(parentPageData) {
    case 'bottles' :
      detailGroup.detailParent = bottles;
      detailGroup.updater = bottleUpdates;
      break;
    case 'puree-foods' :
      detailGroup.detailParent = pureeFeedinds;
      break;
    case 'sleep-schedule' :
      detailGroup.detailParent = sleepSchedule;
      break;
    default:
      detailGroup.detailParent = notes;
      detailGroup.updater = notesUpdates;
  }

  let idObj = detailGroup.detailParent.filter(item => item.id === id)[0];

  function checkDeleteResponse(response) {
    if (response === 'submit') {
      const updateType = 'DELETE_ITEM'
      detailGroup.updater({id, updateType});
      navigate(`/${grabParentFromUrl()}`);
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
          <button className="page-function details-masthead__back" onClick={handleBackClick}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <NavLink to={`../editor/${id}`} className="details-masthead__edit">
            <span className="material-symbols-outlined">edit</span>
          </NavLink>
          <button onClick={handleDeleteButtonClick} className="details-masthead__delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <article key={idObj.id} className="detail-content">
          <header>
            <h2>{`${idObj.header} ${idObj.measurementType}`}</h2>
            <aside>{dateSlashFormatter(new Date(idObj.date))}</aside>
          </header>
          <p>
            {grabParentFromUrl() !== 'notes' && <span style={{display: 'block'}}>{displayFormattedTime(new Date(idObj.date))}</span>}
            {idObj.body}
          </p>
        </article>
      </section>
    </>
  );
}