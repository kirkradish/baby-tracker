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
  type,
  placeholderText,
  additionalClasses,
  value,
  lifter,
  validity,
  errorText
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
        type={type}
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleChange}
        className={!validity ? 'invalid-input' : ''}
      />
      {!validity && <p className="form-error">{errorText}</p>}
    </div>
  );
}
Input.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string,
  value: PropTypes.string,
  lifter: PropTypes.func.isRequired,
  validity: PropTypes.bool.isRequired,
  errorText:PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  placeholderText: ' ',
  additionalClasses: '',
  value: '',
  errorText: 'This field is required',
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
    <div className={`input-group ${additionalClasses}`}>
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

export function Checkbox({ labelText }) {
  return (
    <span className="checkbox-container">
      <input
        type="checkbox"
        id={labelText}
        name={labelText}
        // value={labelText}
      />
      <label htmlFor={labelText}>{labelText}</label>
    </span>
  )
}

Checkbox.propTypes = {
  labelText: PropTypes.string.isRequired
};

export function RadioButtons({ defaultRadio, buttons, lifter }) {
  const [selectedRadio, setSelectedRadio] = useState(defaultRadio || '');

  const handleRadioSelect = (e) => {
    setSelectedRadio(e.target.value);
    lifter(e.target.value);
  };

  return (
    buttons.map((radio => (
      <div className="radio-button-container" key={radio.id}>
        <input
          type="radio"
          id={radio.id}
          name={radio.name}
          value={radio.id}
          checked={selectedRadio === radio.id}
          onChange={handleRadioSelect}
        />
        <label htmlFor={radio.id}>{radio.label}</label>
      </div>
    )))
  )
}

RadioButtons.propTypes = {
  solidFoodFormat: PropTypes.string,
  buttons: PropTypes.array.isRequired
};
