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
  labelText,
  inputType,
  placeholderText,
  additionalClasses,
  value,
  onChange
}) {
  return (
    <div className={`input-group input-group__header ${additionalClasses}`}>
      <label>{labelText}</label>
      <input
        type={inputType}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string,
  value: PropTypes.string
};
Input.defaultProps = {
  inputType: 'text',
  placeholderText: ' ',
  additionalClasses: '',
  value: ''
};

export const Textarea = ({
  labelText,
  placeholderText,
  additionalClasses,
  value,
  onChange
}) => {
  return (
    <div className={`input-group input-group__body ${additionalClasses}`}>
      <label>{labelText}</label>
      <textarea
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
      >
      </textarea>
    </div>
  );
}
Textarea.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  placeholderText: PropTypes.string,
  additionalClasses: PropTypes.string,
  value: PropTypes.string
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