import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { notes } from '../assets/data/notes';
import { bottles } from '../assets/data/bottleFeedings';
import { solidFoodsFeedings } from '../assets/data/solidFoodsFeedings';
import { randomFourDigitId } from '../assets/commonFns';

export const GlobalStateContext = createContext({
  notes,
  notesUpdates: () => {},
  bottles,
  bottleUpdates: () => {},
  solidFoodsFeedings,
  solidsUpdates: () => {}
});

function crudReducer(state, action) {
  const updatedGroup = [...state];

  if (action.type === 'ADD_ITEM') {
    const newItem = {
      id: randomFourDigitId().toString(),
      header: action.payload.headerText,
      date: action.payload.itemDate,
      body: action.payload.bodyText
    }
    if (action.payload.solidFoodFormat) {
      console.log('titties');
      console.log(action.payload.purreedAmount);
      newItem.solidFoodFormat = action.payload.solidFoodFormat;
      newItem.amount = action.payload.purreedAmount;
    }
    if (action.payload.measurementInputType) {
      newItem.measurementType = action.payload.measurementInputType;
    }
    updatedGroup.unshift(newItem);
  }

  if (action.type === 'UPDATE_ITEM') {
    const curNoteIndex = updatedGroup.findIndex(x => x.id === action.payload.id);
    updatedGroup[curNoteIndex].header = action.payload.headerText;
    if (action.payload.measurementInputType) {
      updatedGroup[curNoteIndex].measurementType = action.payload.measurementInputType;
    }
    updatedGroup[curNoteIndex].date = action.payload.itemDate;
    updatedGroup[curNoteIndex].body = action.payload.bodyText;
  }

  if (action.type === 'DELETE_ITEM') {
    return updatedGroup.filter(note => note.id !== action.payload.id);
  }
  
  return updatedGroup;
}

export default function GlobalStateProvider({ children }) {
  const [notesState, notesDispatch] = useReducer(crudReducer, notes);
  const [bottleState, bottleDispatch] = useReducer(crudReducer, bottles);
  const [solidFoodsState, solidFoodsDispatch] = useReducer(crudReducer, solidFoodsFeedings);

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

  function handleSolidsUpdates(newSolidFood) {
    solidFoodsDispatch({
      type: newSolidFood.updateType,
      payload: newSolidFood
    })
  }

  const gscValues = {
    notes: notesState,
    notesUpdates: handleNotesUpdates,
    bottles: bottleState,
    bottleUpdates: handleBottleUpdates,
    solidFoods: solidFoodsState,
    solidsUpdates: handleSolidsUpdates
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