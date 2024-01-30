import { NavProvider } from './store/NavContext.jsx';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar';
import HomePage from './Pages/HomePage';
import NotesPage from './Pages/NotesPage';
import DetailsPage from './Pages/DetailsPages';
import BottleFeedingsPage from './Pages/BottleFeedingsPage';
import SolidFoodsPage from './Pages/SolidFoodsPage';
import SleepPage from './Pages/SleepPage';
import './App.css';

function App() {
  return (
    <NavProvider>
      <div id="container">
        <header className="add-head">
        <NavLink to='/' >
          <h1>Baby Tracker</h1>
        </NavLink>
        </header>
        <NavigationBar />
        <Outlet />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='notes'>
            <Route index={true} element={<NotesPage />}></Route>
            <Route path='note-detail/:id' element={<DetailsPage />} />
          </Route>
          <Route path='bottle-feedings'>
            <Route index={true} element={<BottleFeedingsPage />}></Route>
            <Route path='bottle-feeding-detail/:id' element={<DetailsPage />} />
          </Route>
          <Route path='solid-foods'>
            <Route index={true} element={<SolidFoodsPage />}></Route>
            <Route path='solid-food-detail/:id' element={<DetailsPage />} />
          </Route>
          <Route path='sleep-schedule'>
            <Route index={true} element={<SleepPage />}></Route>
            <Route path='sleep-schedule-detail/:id' element={<DetailsPage />} />
          </Route>
        </Routes>
      </div>
    </NavProvider>
  )
}

export default App
