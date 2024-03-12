import { useNav } from '../../store/NavContext.jsx';
import NavItem from './NavItem';
import NotesIcon from '../../assets/icons/NotesIcon';
import BottleIcon from '../../assets/icons/BottleIcon';
import SolidFoodIcon from '../../assets/icons/SolidFoods.jsx';
import CribIcon from '../../assets/icons/CribIcon';
import './navigation.css';

export default function NavigationBar() {
  const fullNav = useNav();
  
  return (
    <nav className={fullNav ? 'icon-nav-bar' : 'minimal-nav-bar'}>
      <NavItem
        Icon={NotesIcon}
        text="Notes"
        endPath="notes"
      />
      <NavItem
        Icon={BottleIcon}
        text="Bottle Feedings"
        endPath="bottles"
      />
      <NavItem
        Icon={SolidFoodIcon}
        text="Solid Foods"
        endPath="solid-foods"
      />
      <NavItem
        Icon={CribIcon}
        text="Sleep"
        endPath="sleep-schedule"
      />
    </nav>
  );
}
