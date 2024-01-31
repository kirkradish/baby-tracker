import { useContext, createContext, useState } from 'react';

const DateContext = createContext();
const DateUpdateContext = createContext();

export function useDate() {
  return useContext(DateContext);
}

export function useDateUpdate() {
  return useContext(DateUpdateContext);
}

export function DateProvider({ children }) {
  const [theDate, setTheDate] = useState(new Date());

  function dateChanger(newDate) {
    setTheDate(newDate);
  }

  return (
    <DateContext.Provider value={theDate}>
      <DateUpdateContext.Provider value={dateChanger}>
        {children}
      </DateUpdateContext.Provider>
    </DateContext.Provider>
  )
}