import PropTypes from 'prop-types';
import NavItem from './NavItem';
import NotesIcon from '../../assets/icons/NotesIcon';
import BottleIcon from '../../assets/icons/BottleIcon';
import SolidFoodIcon from '../../assets/icons/SolidFoodIcon';
import CribIcon from '../../assets/icons/CribIcon'
import './navigation.css'

export default function NavigationBar({ activeItem, selectedNav }) {
  return (
    <div className="navigation-bar">
      <NavItem
        Icon={NotesIcon}
        name="Notes"
        activeItem={activeItem}
        changeSelection={selectedNav}
      />
      <NavItem
        Icon={BottleIcon}
        name="Bottle Feeding"
        activeItem={activeItem}
        changeSelection={selectedNav}
      />
      <NavItem Icon={SolidFoodIcon}
        name="Solid Foods"
        activeItem={activeItem}
        changeSelection={selectedNav}
      />
      <NavItem Icon={CribIcon}
        name="Sleep"
        activeItem={activeItem}
        changeSelection={selectedNav}
      />
    </div>
  );
}

NavigationBar.propTypes = {
  activeItem: PropTypes.string.isRequired,
  selectedNav: PropTypes.func.isRequired
}