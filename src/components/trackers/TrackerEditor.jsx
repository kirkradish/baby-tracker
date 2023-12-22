import { useRef } from 'react'
import PropTypes from 'prop-types';

export default function TrackerEditor({ lifter, stateFn, toggleHander }) {
  const inputHeader = useRef();
  const inputDate = useRef();
  const inputBody = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    lifter(stateFn, {
      header: inputHeader.current.value,
      date: inputDate.current.value,
      body: inputBody.current.value
    });
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="input-group input-group__header">
        <label>Header</label>
        <input ref={inputHeader} type="text" placeholder=" " />
      </div>
      <div className="input-group input-group__date">
        <label>Date</label>
        <input ref={inputDate} type="text" placeholder=" " />
      </div>
      <div className="input-group input-group__body">
        <label>Body</label>
        <textarea ref={inputBody} placeholder=" "></textarea>
      </div>
      <div className="action-buttons">
        <button
          className="form__cancel"
          type="button"
          onClick={toggleHander}
        >
          Cancel
        </button>
        <input className="submit-form" type="submit" />
      </div>
    </form>
  );
}

TrackerEditor.propTypes = {
  lifter: PropTypes.func.isRequired,
  stateFn: PropTypes.func.isRequired,
  toggleHander: PropTypes.func.isRequired
}