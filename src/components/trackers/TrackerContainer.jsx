import { useState } from 'react';
import { notes } from '../../assets/data/notes';
import { bottleFeedings } from '../../assets/data/bottleFeedings';
import { solidFoods } from '../../assets/data/solidFoods';
import { sleepSchedule } from '../../assets/data/sleepSchedule';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader/PageHeader'
import DateDropdown from '../Calendar/DateDropdown';
import ListItem from '../ListItem/ListItem';
import TrackerEditor from './TrackerEditor';
import './TrackerContainer.css';

export default function TrackerContainer({ page }) {
  const [isEditing, setIsEditin] = useState(false);
  const [allNotes, setAllNotes] = useState(notes);
  const [allBottleFeedings, setAllBottleFeedings] = useState(bottleFeedings);
  const [allSolidFoods, setAllSolidFoods] = useState(solidFoods);
  const [allSleep, setAllSleep] = useState(sleepSchedule);

  function displayItems(page) {
    let list = {};
    switch(page) {
      case 'Notes':
        list.items = allNotes;
        list.fn = setAllNotes;
        break;
      case 'Bottle Feeding':
        list.items = allBottleFeedings;
        list.fn = setAllBottleFeedings;
        break;
      case 'Solid Foods':
        list.items = allSolidFoods;
        list.fn = setAllSolidFoods;
        break;
      case 'Sleep':
        list.items = allSleep;
        list.fn = setAllSleep;
        break;
      default:
        list.items = allNotes;
        list.fn = setAllNotes
    }
    return list;
  }

  function determineEditing() {
    setIsEditin(prevEditingState => !prevEditingState);
  }

  function getBack(stateFunction, newNote) {
    stateFunction(prevNotes => [newNote, ...prevNotes]);
    setIsEditin(false);
  }

  return (
    <section className="tracker-container">
      {/* <PageHeader
        header={page}
        editState={isEditing}
        toggleHander={determineEditing}
      /> */}
      <DateDropdown />
      <section className="tracker-pad">
        {!isEditing ? (
          displayItems(page).items.map(item => (
            <ListItem
              key={item.header}
              header={item.header}
              aside={item.date}
            />
          ))
        ) : (
          <TrackerEditor
            lifter={getBack}
            stateFn={displayItems(page).fn}
            toggleHander={determineEditing}
          />
        )}
      </section>
    </section>
  );
}

TrackerContainer.propTypes = {
  page: PropTypes.string.isRequired
}