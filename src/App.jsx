import { useState } from 'react';
import NavigationBar from './components/navigation/NavigationBar';
import TrackerContainer from './components/trackers/TrackerContainer';
import './App.css'

function App() {
  const [activeNav, setActiveNav] = useState('Notes');

  function handleActive(item) {
    setActiveNav(item)
  }

  return (
    <div id="container">
      <div id="baby-tracker">
        <NavigationBar activeItem={activeNav} selectedNav={handleActive} />
        <TrackerContainer subject={activeNav} />
      </div>
    </div>
  )
}

export default App
