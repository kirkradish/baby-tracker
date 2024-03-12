import { NavProvider } from './store/NavContext.jsx';
import { DateProvider } from './store/DateContext.jsx';
import GlobalStateProvider from './store/GlobalState.jsx';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar';
import HomePage from './Pages/HomePage';
import NotesPage from './Pages/NotesPage';
import DetailsPage from './Pages/DetailsPages';
import BottleFeedingsPage from './Pages/BottleFeedingsPage';
import SolidFoodsPage from './Pages/SolidFoodsPage';
import SleepPage from './Pages/SleepPage';
import EditDetails from './Pages/EditDetails.jsx';
import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <NavProvider>
        <DateProvider>
          <main id="container">
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
                <Route path='editor/' element={<EditDetails />} />
                <Route path='editor/:id' element={<EditDetails />} />
                <Route path='detail/:id' element={<DetailsPage />} />
              </Route>
              <Route path='bottles'>
                <Route index={true} element={<BottleFeedingsPage />}></Route>
                <Route path='add-bottle/' element={<EditDetails />} />
                <Route path='editor/:id' element={<EditDetails />} />
                <Route path='detail/:id' element={<DetailsPage />} />
              </Route>
              <Route path='solid-foods'>
                <Route index={true} element={<SolidFoodsPage />}></Route>
                <Route path='add-solid-food/' element={<EditDetails />} />
                <Route path='editor/:id' element={<EditDetails />} />
                <Route path='detail/:id' element={<DetailsPage />} />
              </Route>
              <Route path='sleep-schedule'>
                <Route index={true} element={<SleepPage />}></Route>
                <Route path='detail/:id' element={<DetailsPage />} />
              </Route>
            </Routes>
          </main>
        </DateProvider>
      </NavProvider>
    </GlobalStateProvider>
  )
}

export default App
