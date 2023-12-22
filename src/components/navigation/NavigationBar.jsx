import { Routes, Route } from 'react-router-dom'
import TrackerContainer from '../trackers/TrackerContainer';
import NavItem from './NavItem'
import NotesIcon from '../../assets/icons/NotesIcon'
import BottleIcon from '../../assets/icons/BottleIcon';
import SolidFoodIcon from '../../assets/icons/SolidFoodIcon'
import CribIcon from '../../assets/icons/CribIcon'
import './navigation.css'

export default function NavigationBar() {
  return (
    <>
      <nav className="navigation-bar">
        <NavItem
          Icon={NotesIcon}
          endPath="notes"
        />
        <NavItem
          Icon={BottleIcon}
          endPath="bottle-feeding"
        />
        <NavItem
          Icon={SolidFoodIcon}
          endPath="solid-foods"
        />
        <NavItem
          Icon={CribIcon}
          endPath="sleep"
        />
      </nav>
      <Routes>
        <Route path='/' element={<TrackerContainer page="Notes" />} />
        <Route path='notes/*' element={<TrackerContainer page="Notes" />} />
        <Route path='bottle-feeding' element={<TrackerContainer page="Bottle Feeding" />} />
        <Route path='solid-foods' element={<TrackerContainer page="Solid Foods" />} />
        <Route path='sleep' element={<TrackerContainer page="Sleep" />} />
      </Routes>
    </>
  );
}
