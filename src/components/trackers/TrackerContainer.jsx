import Headline from '../headline/Headline';
import {
  notes,
  bottleFeedingNotes,
  solidFoodsNotes,
  sleepNotes
} from '../../assets/data/notes'
import PropTypes from 'prop-types';

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
    <Headline title={determingNotes(path).header} notes={determingNotes(path).showNotes} />
  );
}

TrackerContainer.propTypes = {
  path: PropTypes.string.isRequired
}