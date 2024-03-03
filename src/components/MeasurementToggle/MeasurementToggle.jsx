import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MeasurementToggle.css';

export default function MeasurementToggle({ items, lifter }) {
  const [itemOn, setItemOn] = useState(items[0]);

  useEffect(() => {
    lifter(items[0]);
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
  lifter: PropTypes.func.isRequired
}