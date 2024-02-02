import { useContext, createContext, useState } from 'react';

const NavContext = createContext();
const NavUpdateContext = createContext();

export function useNav() {
  return useContext(NavContext);
}

export function useNavUpdate() {
  return useContext(NavUpdateContext);
}

export function NavProvider({ children }) {
  const [fullSizeNav, setFullSizeNav] = useState(true);

  function toggleNavSize(bool) {
    setFullSizeNav(bool);
  }

  return (
    <NavContext.Provider value={fullSizeNav}>
      <NavUpdateContext.Provider value={toggleNavSize}>
        {children}
      </NavUpdateContext.Provider>
    </NavContext.Provider>
  )
}
