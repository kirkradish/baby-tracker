import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MeasurementToggle.css';

export default function MeasurementToggle({ items, lifter, curMeasurement }) {
  const [itemOn, setItemOn] = useState(curMeasurement);

  useEffect(() => {
    lifter(curMeasurement);
  }, []);

  const handleClick = (item) => {
    setItemOn(prevState => {
      prevState = item;
      return prevState;
    });
    lifter(item);
  }

  return(
    <div className="measurement-toggle">
      {items.map((item, index) => (
          <button
            key={index}
            className={itemOn === item ? 'active' : 'inactive'}
            type="button"
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
    </div>
  );
}

MeasurementToggle.propTypes = {
  items: PropTypes.array.isRequired,
  curMeasurement: PropTypes.string,
  lifter: PropTypes.func.isRequired
}

MeasurementToggle.defaultProps = {
  curMeasurement: 'oz'
};