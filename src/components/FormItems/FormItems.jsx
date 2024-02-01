import { forwardRef } from 'react';
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

export const Input = forwardRef(function Input({ labelText, inputType, placeholderText, additionalClasses }, ref) {
  return (
    <div className={`input-group input-group__header ${additionalClasses}`}>
      <label>{labelText}</label>
      <input ref={ref} type={inputType} placeholder={placeholderText} />
    </div>
  )
});
Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string
};
Input.defaultProps = {
  inputType: 'text',
  placeholderText: ' ',
  additionalClasses: ''
};

export const Textarea = forwardRef(function Textarea({ labelText, placeholderText, additionalClasses }, ref) {
  return (
    <div className={`input-group input-group__body ${additionalClasses}`}>
      <label>{labelText}</label>
      <textarea placeholder={placeholderText} ref={ref}></textarea>
    </div>
  );
});
Textarea.propTypes = {
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string
};
Textarea.defaultProps = {
  inputType: 'text',
  placeholderText: ' ',
  additionalClasses: ''
};

export function ActionButtons ({ primaryButtonText, secondaryButtonText, clickFn }) {
  return (
    <div className="action-buttons">
      <button
        className="form__cancel"
        type="button"
        onClick={clickFn}
      >
        {secondaryButtonText}
      </button>
      <input className="submit-form" type="submit" value={primaryButtonText} />
    </div>
  )
}
ActionButtons.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  clickFn: PropTypes.func.isRequired
};