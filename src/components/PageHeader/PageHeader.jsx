import PropTypes from 'prop-types'
import AddCloseIcon from '../../assets/icons/AddCloseIcon';

export default function PageHeader({ header, editState, toggleHander}) {
  return (
    <header>
      <h2>{editState && 'Add '}{header}</h2>
      <span
        className="add-close-button"
        style={{transform: `${!editState ? 'rotate(45deg)' : ''}` }}
        onClick={toggleHander}
      >
        <AddCloseIcon />
      </span>
    </header>
  );
}

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  editState: PropTypes.bool.isRequired,
  toggleHander: PropTypes.func.isRequired
}