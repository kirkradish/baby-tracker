import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function NavItem({ Icon, text, endPath }) {

  return (
    <NavLink className="nav-item-container" to={endPath}>
      <div className='nav-item'>
        <Icon className="nav-icon" />
      </div>
      <p>{text}</p>
    </NavLink>
  );
}

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  endPath: PropTypes.string.isRequired
}