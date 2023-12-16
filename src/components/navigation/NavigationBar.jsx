import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom'
import TrackerComponent from '../trackers/TrackerContainer'
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
          name="notes"
        />
        <NavItem
          Icon={BottleIcon}
          name="bottle-feeding"
        />
        <NavItem
          Icon={SolidFoodIcon}
          name="solid-foods"
        />
        <NavItem
          Icon={CribIcon}
          name="sleep"
        />
      </nav>
      <Routes>
        <Route path='/' element={<TrackerComponent path="notes" />} />
        <Route path='notes' element={<TrackerComponent path="notes" />} />
        <Route path='bottle-feeding' element={<TrackerComponent path="bottle-feeding" />} />
        <Route path='solid-foods' element={<TrackerComponent path="solid-foods" />} />
        <Route path='sleep' element={<TrackerComponent path="sleep" />} />
      </Routes>
    </>
  );
}

NavigationBar.propTypes = {
  
}