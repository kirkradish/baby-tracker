import { Outlet } from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
import './App.css'

function App() {
  return (
    <div id="container">
      <div id="baby-tracker">
        <NavigationBar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
