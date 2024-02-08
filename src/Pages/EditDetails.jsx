import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
import { notes } from '../assets/data/notes';
import { Form, ActionButtons, Input, Textarea } from '../components/FormItems/FormItems';
import { randomFourDigitId, dateSlashFormatter } from '../assets/commonFns';
import DateDropdown from '../components/Calendar/DateDropdown';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const [headerText, setHeaderText] = useState();
  const [bodyText, setBodyText] = useState();
  const inputDate = useDate();
  const { id } = useParams();
  let editableNote;

  function pageSetup() {
    if (id) {
      editableNote = notes.filter(note => note.id === id);
      editableNote = editableNote[0];
      setHeaderText(editableNote.header);
      setBodyText(editableNote.body);
    } else {
      setHeaderText('');
      setBodyText('');
    }
  }

  useEffect(() => {
    navUpdater(false);
    pageSetup();
  }, []);

  function handleHeaderChange(e) {
    setHeaderText(e.target.value);
  }

  function handleBodyChange(e) {
    setBodyText(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    if (headerText.length > 0) {
      if (id) {
        const curNote = notes.filter(note => note.id === id);
        curNote[0].header = headerText
        curNote[0].date = dateSlashFormatter(inputDate);
        curNote[0].body = bodyText;
        navigate(`../note-detail/${curNote[0].id}`);
      } else {
        notes.unshift({
          id: randomFourDigitId().toString(),
          header: headerText,
          date: dateSlashFormatter(inputDate),
          body: bodyText
        });
        navigate(-1);
      }
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page tracker-container">
      <Form onSubmit={handleSubmit}>
        <Input
          labelText="header"
          value={headerText}
          onChange={handleHeaderChange}
        />
        <DateDropdown />
        <Textarea
          labelText="body"
          value={bodyText}
          onChange={handleBodyChange}
        />
        <ActionButtons
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          secondaryClickFn={handleCancel}
        />
      </Form>
    </section>
  );
}