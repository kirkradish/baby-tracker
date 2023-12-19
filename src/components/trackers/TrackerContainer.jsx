import { notes } from '../../assets/data/notes';
import { bottleFeedings } from '../../assets/data/bottleFeedings';
import { solidFoods } from '../../assets/data/solidFoods';
import { sleepSchedule } from '../../assets/data/sleepSchedule';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/icons/CloseIcon';
import ListItem from '../ListItem/ListItem';
import './TrackerContainer.css';

function determingPage(path) {
  let pageContent = {};
  switch(path) {
    case 'bottle-feeding':
      pageContent.header = "Bottle Feeding";
      pageContent.items = bottleFeedings;
      break;
    case 'solid-foods':
      pageContent.header = 'Solid Foods';
      pageContent.items = solidFoods;
      break;
    case 'sleep':
      pageContent.header = 'Sleep';
      pageContent.items = sleepSchedule;
      break;
    default:
      pageContent.header = 'Notes';
      pageContent.items = notes;
  }
  return pageContent;
}

export default function TrackerContainer({ path }) {
  return (
    <section className="tracker-container">
      <header>
        <h2>{determingPage(path).header}</h2>
        <span className="add-button"><CloseIcon /></span>
      </header>
      <article>
        {determingPage(path).items.map(item => (
          <ListItem
            key={item.header}
            header={item.header}
            aside={item.date}
          />
        ))}
      </article>
    </section>
  );
}

TrackerContainer.propTypes = {
  path: PropTypes.string.isRequired
}