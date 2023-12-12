import PropTypes from 'prop-types';

export default function NavItem({ Icon, name, activeItem, changeSelection }) {
  function handleClick() {
    changeSelection(name);
  }

  return (
    <div
      className={activeItem === name ? 'nav-item active' : 'nav-item'}
      onClick={handleClick}
    >
      <Icon className="nav-icon" />
    </div>
  );
}

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  changeSelection: PropTypes.func.isRequired
}