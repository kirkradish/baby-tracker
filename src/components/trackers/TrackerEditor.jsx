import { useRef } from 'react'
import PropTypes from 'prop-types';

export default function TrackerEditor({ lifter, stateFn }) {
  const inputHeader = useRef();
  const inputDate = useRef();
  const inputBody = useRef();

  function doIt(e) {
    e.preventDefault();
    lifter(stateFn, {
      header: inputHeader.current.value,
      date: inputDate.current.value,
      body: inputBody.current.value
    });
  }
  return (
    <form onSubmit={(e) => doIt(e)}>
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
        {/* change this to textarea */}
        <input ref={inputBody} type="text" placeholder=" " />
      </div>
      <input className="submit-form" type="submit" />
    </form>
  );
}

TrackerEditor.propTypes = {
  lifter: PropTypes.func.isRequired,
  stateFn: PropTypes.func.isRequired
}