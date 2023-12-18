import {
  notes,
  bottleFeedingNotes,
  solidFoodsNotes,
  sleepNotes
} from '../../assets/data/notes'
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/icons/CloseIcon';
import './TrackerContainer.css';

function determingNotes(path) {
  let notesInfo = {};

  switch(path) {
    case 'bottle-feeding':
      notesInfo.showNotes = bottleFeedingNotes;
      notesInfo.header = "Bottle Feeding";
      break;
    case 'solid-foods':
      notesInfo.showNotes = solidFoodsNotes;
      notesInfo.header = 'Solid Foods';
      break;
    case 'sleep':
      notesInfo.showNotes = sleepNotes;
      notesInfo.header = 'Sleep';
      break;
    default:
      notesInfo.showNotes = notes;
      notesInfo.header = 'Notes';
  }
  return notesInfo;
}

export default function TrackerContainer({ path }) {
  return (
    <section className="tracker-container">
      <header>
        <h2>{determingNotes(path).header}</h2>
        <span className="add-button"><CloseIcon /></span>
      </header>
      <section>
        {notes.map(note => (
          <p key={note.header}>
            <span className="bold-text">{note.header}: </span>
            {note.body}
          </p>
        ))}
      </section>
    </section>
  );
}

TrackerContainer.propTypes = {
  path: PropTypes.string.isRequired
}