import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function NavItem({ Icon, endPath }) {

  return (
    <>
      <NavLink to={endPath}>
        <div className='nav-item'>
          <Icon className="nav-icon" />
        </div>
      </NavLink>
    </>
  );
}

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  endPath: PropTypes.string.isRequired
}