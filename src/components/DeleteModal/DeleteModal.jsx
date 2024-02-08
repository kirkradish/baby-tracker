import { useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { ActionButtons } from '../FormItems/FormItems';
import './DeleteModal.css';

const DeleteModal = forwardRef(function DeleteModal({ noteName, checker }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
   })

  function handleClose(e) {
    checker(e.target.type);
    dialog.current.close();
  }

  return (
    <dialog ref={dialog}>
      <p>Are you sure you want to delete the <span className="bold-text">{noteName}</span> note?</p>
      <ActionButtons
        primaryButtonText="Yes"
        secondaryButtonText="No"
        primaryClickFn={handleClose}
        secondaryClickFn={e => handleClose(e)}
      />
    </dialog>
  );
});

DeleteModal.propTypes = {
  noteName: PropTypes.string.isRequired,
  checker: PropTypes.func.isRequired
};

export default DeleteModal;