import { useEffect } from 'react';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../store/DateContext';
import { useRef } from 'react';
import { notes } from '../assets/data/notes';
import { Form, ActionButtons, Input, Textarea } from '../components/FormItems/FormItems';
import { randomFourDigitId, dateSlashFormatter } from '../assets/commonFns';
import DateDropdown from '../components/Calendar/DateDropdown';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const headerRef = useRef();
  const inputDate = useDate();
  const bodyRef = useRef();

  useEffect(() => {
    navUpdater(false);
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (headerRef.current.value && bodyRef.current.value) {
      notes.unshift({
        id: randomFourDigitId().toString(),
        header: headerRef.current.value,
        date: dateSlashFormatter(inputDate),
        body: bodyRef.current.value
      });
      navigate(-1);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page tracker-container">
      <Form onSubmit={handleSubmit}>
        <Input labelText="header" ref={headerRef} />
        <DateDropdown />
        <Textarea labelText="body" ref={bodyRef} />
        <ActionButtons
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          clickFn={handleCancel}
        />
      </Form>
    </section>
  );
}