import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { notes } from '../assets/data/notes';
import { randomFourDigitId } from '../assets/commonFns';

export const GlobalStateContext = createContext({
  notes: notes,
  addNote: () => {}
});

function notesReducer(state, action) {
  const updatedNotes = [...state];

  if (action.type === 'ADD_NOTE') {
    // account for adding a date earlier than the current date and reordering
    if (action.payload.headerText.length > 0) {
      updatedNotes.unshift({
        id: randomFourDigitId().toString(),
        header: action.payload.headerText,
        date: action.payload.noteDate,
        body: action.payload.bodyText
      });
    }
    return updatedNotes;
  }

  if (action.type === 'UPDATE_NOTE') {
    if (action.payload.headerText.length > 0) {
      const curNoteIndex = updatedNotes.findIndex(x => x.id === action.payload.id);
      updatedNotes[curNoteIndex].header = action.payload.headerText;
      updatedNotes[curNoteIndex].date = action.payload.noteDate;
      updatedNotes[curNoteIndex].body = action.payload.bodyText;
    }
    return updatedNotes;
  }
}

export default function GlobalStateProvider({ children }) {
  const [notesState, notesDispatch] = useReducer(notesReducer, notes);

  function handleNewOrUpdatedNote(newNote) {
    if (!newNote.id) {
      notesDispatch({
        type: 'ADD_NOTE',
        payload: newNote
      })
    } else {
      notesDispatch({
        type: 'UPDATE_NOTE',
        payload: newNote
      })
    }
  }

  const gscValues = {
    notes: notesState,
    addOrUpdateNote: handleNewOrUpdatedNote
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