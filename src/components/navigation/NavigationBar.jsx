import { Routes, Route } from 'react-router-dom';
import NavItem from './NavItem';
import NotesIcon from '../../assets/icons/NotesIcon';
import BottleIcon from '../../assets/icons/BottleIcon';
import SolidFoodIcon from '../../assets/icons/SolidFoodIcon';
import CribIcon from '../../assets/icons/CribIcon';
import HomePage from '../../Pages/HomePage';
import NotesPage from '../../Pages/NotesPage';
import BottleFeedingsPage from '../../Pages/BottleFeedingsPage';
import SolidFoodsPage from '../../Pages/SolidFoodsPage';
import SleepPage from '../../Pages/SleepPage';
import './navigation.css'

export default function NavigationBar() {
  return (
    <>
      <nav className="navigation-bar">
        <NavItem
          Icon={NotesIcon}
          text="Notes"
          endPath="notes"
        />
        <NavItem
          Icon={BottleIcon}
          text="Bottle Feeding"
          endPath="bottle-feeding"
        />
        <NavItem
          Icon={SolidFoodIcon}
          text="Solid Foods"
          endPath="solid-foods"
        />
        <NavItem
          Icon={CribIcon}
          text="Sleep"
          endPath="sleep"
        />
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='notes/*' element={<NotesPage />} />
        <Route path='bottle-feeding' element={<BottleFeedingsPage />} />
        <Route path='solid-foods' element={<SolidFoodsPage />} />
        <Route path='sleep' element={<SleepPage />} />
      </Routes>
    </>
  );
}
