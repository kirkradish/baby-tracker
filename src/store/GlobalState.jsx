import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { notes } from '../assets/data/notes';
import { dateSorter, randomFourDigitId } from '../assets/commonFns';

export const GlobalStateContext = createContext({
  notes: notes,
  addNote: () => {}
});

function notesReducer(state, action) {
  const updatedNotes = [...state];
  dateSorter(updatedNotes);

  if (action.type === 'ADD_NOTE') {
    if (action.payload.headerText.length > 0) {
      updatedNotes.unshift({
        id: randomFourDigitId().toString(),
        header: action.payload.headerText,
        date: action.payload.noteDate,
        body: action.payload.bodyText
      });
    }
  }

  if (action.type === 'UPDATE_NOTE') {
    if (action.payload.headerText.length > 0) {
      const curNoteIndex = updatedNotes.findIndex(x => x.id === action.payload.id);
      updatedNotes[curNoteIndex].header = action.payload.headerText;
      updatedNotes[curNoteIndex].date = action.payload.noteDate;
      updatedNotes[curNoteIndex].body = action.payload.bodyText;
    }
  }

  if (action.type === 'DELETE_NOTE') {
    return updatedNotes.filter(note => note.id !== action.payload.id);
  }
  
  return updatedNotes;
}

export default function GlobalStateProvider({ children }) {
  const [notesState, notesDispatch] = useReducer(notesReducer, notes);

  function handleNotesUpdates(newNote) {
    notesDispatch({
      type: newNote.updateType,
      payload: newNote
    })
  }

  const gscValues = {
    notes: notesState,
    notesUpdates: handleNotesUpdates
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