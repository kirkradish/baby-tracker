import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar';
import './App.css'

function App() {
  return (
    <div id="container">
      <header className="add-head">
      <NavLink to='/'>
        <h1>Baby Tracker</h1>
      </NavLink>
      </header>
      <NavigationBar />
      <Outlet />
    </div>
  )
}

export default App
