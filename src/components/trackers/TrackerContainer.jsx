import Headline from '../headline/Headline';
import {
  notes,
  bottleFeedingNotes,
  solidFoodsNotes,
  sleepNotes
} from '../../assets/data/notes'
import PropTypes from 'prop-types';

function determingNotes(subject) {
  let showNotes;
  switch(subject) {
    case 'Notes':
      showNotes = notes;
      break;
    case 'Bottle Feeding':
      showNotes = bottleFeedingNotes;
      break;
    case 'Solid Foods':
      showNotes = solidFoodsNotes;
      break;
    case 'Sleep':
      showNotes = sleepNotes;
      break;
    default:
      showNotes = notes;
  }
  return showNotes;
}

export default function TrackerContainer({ subject }) {
  return (
    <Headline title={subject} notes={determingNotes(subject)} />
  );
}

TrackerContainer.propTypes = {
  subject: PropTypes.string.isRequired
}