import { useState } from 'react';
import Calendar from './Calendar';
import './DateDropdown.css';

export default function DateDropdown() {
  const [dateVal, setDateVal] =  useState(new Date());

  function grabCalendarDate(selectedDate) {
    setDateVal(new Date(selectedDate));
  }

  return (
    <div className="date-dropdown">
      <Calendar dateLifter={grabCalendarDate} />
      <p>Show me feeds for {`${dateVal.getMonth() + 1}/${dateVal.getDate()}/${dateVal.getFullYear()}`}</p>
    </div>
  );
}