import { useNav } from '../../store/NavContext.jsx';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavItem({ Icon, text, endPath }) {
  const fullNav = useNav();

  return (
    <NavLink className="nav-item-container" to={endPath}>
      {fullNav && (
        <div className='nav-item'>
          <Icon className="nav-icon" />
        </div>
     )}
      <p>
        {text}
      </p>
    </NavLink>
  );
}

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  endPath: PropTypes.string.isRequired
}