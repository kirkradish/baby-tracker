import { useState } from 'react';
import PropTypes from 'prop-types';
import './FormItems.css';

export function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  );
}
Form.propTypes = {
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export function Input({
  id,
  labelText,
  inputType,
  placeholderText,
  additionalClasses,
  value,
  lifter
}) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e) {
    lifter(e.target.value);
    setInputValue(e.target.value);
  }

  return (
    <div className={`input-group input-group__header ${additionalClasses}`}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={inputType}
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
Input.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string,
  value: PropTypes.string,
  lifter: PropTypes.func.isRequired
};
Input.defaultProps = {
  inputType: 'text',
  placeholderText: ' ',
  additionalClasses: '',
  value: ''
};

export const Textarea = ({
  id,
  labelText,
  placeholderText,
  additionalClasses,
  value,
  lifter
}) => {
  const [textareaValue, setTextareaValue] = useState(value);

  function handleChange(e) {
    lifter(e.target.value);
    setTextareaValue(e.target.value);
  }

  return (
    <div className={`input-group input-group__body ${additionalClasses}`}>
      <label htmlFor={id}>{labelText}</label>
      <textarea
        id={id}
        placeholder={placeholderText}
        value={textareaValue}
        onChange={handleChange}
      >
      </textarea>
    </div>
  );
}
Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string,
  value: PropTypes.string,
  lifter: PropTypes.func.isRequired
};
Textarea.defaultProps = {
  inputType: 'text',
  placeholderText: ' ',
  additionalClasses: '',
  value: ''
};

export function ActionButtons ({
  primaryButtonText,
  secondaryButtonText,
  primaryClickFn,
  secondaryClickFn
}) {
  return (
    <div className="action-buttons">
      <button
        type="button"
        className="form__cancel"
        onClick={secondaryClickFn}
      >
        {secondaryButtonText}
      </button>
      <input
        type="submit"
        className="submit-form"
        onClick={primaryClickFn}
        value={primaryButtonText}
      />
    </div>
  )
}
ActionButtons.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  secondaryClickFn: PropTypes.func.isRequired,
  primaryClickFn: PropTypes.func
};
ActionButtons.defaultProps = {
  primaryClickFn: undefined
};