import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function NavItem({ Icon, name }) {

  return (
    <>
      <NavLink to={name}>
        <div className='nav-item'>
          <Icon className="nav-icon" />
        </div>
      </NavLink>
    </>
  );
}

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired
}