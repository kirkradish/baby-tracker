import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { notes } from '../assets/data/notes';
import { bottles } from '../assets/data/bottleFeedings';
import { dateSorter, randomFourDigitId } from '../assets/commonFns';

export const GlobalStateContext = createContext({
  notes,
  addNote: () => {},
  bottles,
  bottleUpdates: () => {}
});

function crudReducer(state, action) {
  const updatedGroup = [...state];
  dateSorter(updatedGroup);

  if (action.type === 'ADD_ITEM') {
    if (action.payload.headerText.length > 0) {
      updatedGroup.unshift({
        id: randomFourDigitId().toString(),
        header: action.payload.headerText,
        date: action.payload.noteDate,
        body: action.payload.bodyText
      });
    }
  }

  if (action.type === 'UPDATE_ITEM') {
    if (action.payload.headerText.length > 0) {
      const curNoteIndex = updatedGroup.findIndex(x => x.id === action.payload.id);
      updatedGroup[curNoteIndex].header = action.payload.headerText;
      updatedGroup[curNoteIndex].date = action.payload.noteDate;
      updatedGroup[curNoteIndex].body = action.payload.bodyText;
    }
  }

  if (action.type === 'DELETE_ITEM') {
    return updatedGroup.filter(note => note.id !== action.payload.id);
  }
  
  return updatedGroup;
}

export default function GlobalStateProvider({ children }) {
  const [notesState, notesDispatch] = useReducer(crudReducer, notes);
  const [bottleState, bottleDispatch] = useReducer(crudReducer, bottles);

  function handleNotesUpdates(newNote) {
    notesDispatch({
      type: newNote.updateType,
      payload: newNote
    })
  }

  function handleBottleUpdates(newBottle) {
    bottleDispatch({
      type: newBottle.updateType,
      payload: newBottle
    })
  }

  const gscValues = {
    notes: notesState,
    notesUpdates: handleNotesUpdates,
    bottles: bottleState,
    bottleUpdates: handleBottleUpdates
  };

  return (
    <GlobalStateContext.Provider value={gscValues}>
      {children}
    </GlobalStateContext.Provider>
  )
}

GlobalStateProvider.propTypes = {
  children: PropTypes.shape({}).isRequired
};