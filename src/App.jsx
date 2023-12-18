import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar';
import './App.css'

function App() {
  return (
    <div id="container">
      <header className="add-head">
        <h1>Baby Tracker</h1>
      </header>
      <NavigationBar />
      <Outlet />
    </div>
  )
}

export default App
