import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate } from '../store/DateContext';
// import { notes } from '../assets/data/notes';
import { Form, ActionButtons, Input, Textarea } from '../components/FormItems/FormItems';
import { dateSlashFormatter } from '../assets/commonFns';
import DateDropdown from '../components/Calendar/DateDropdown';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { notes, addOrUpdateNote } = useContext(GlobalStateContext);
  let curNote = notes.filter(note => note.id === id);
  curNote = curNote[0] || curNote;
  const [headerText, setHeaderText] = useState(curNote.header || '');
  const [bodyText, setBodyText] = useState(curNote.body || '');
  const inputDate = useDate(curNote.date || '');
  let editableNote;

  // function pageSetup() {
  //   if (id) {
  //     editableNote = notes.filter(note => note.id === id);
  //     editableNote = editableNote[0];
  //     setHeaderText(editableNote.header);
  //     setBodyText(editableNote.body);
  //   } else {
  //     setHeaderText('');
  //     setBodyText('');
  //   }
  // }

  // useEffect(() => {
  //   navUpdater(false);
  //   pageSetup();
  // }, []);

  function handleHeaderChange(e) {
    setHeaderText(e.target.value);
  }

  function handleBodyChange(e) {
    setBodyText(e.target.value);
  }
  
  function noteAssembly(e) {
    e.preventDefault();
    const noteDate = dateSlashFormatter(inputDate);
    const assebmledNote = {id, headerText, noteDate, bodyText};
    addOrUpdateNote(assebmledNote);
    id ? navigate(`../note-detail/${id}`) : navigate(-1);

    // if (headerText.length > 0) {
    //   if (id) {
    //     const curNote = notes.filter(note => note.id === id);
    //     curNote[0].header = headerText
    //     curNote[0].date = dateSlashFormatter(inputDate);
    //     curNote[0].body = bodyText;
    //     navigate(`../note-detail/${curNote[0].id}`);
    //   }
    // }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page tracker-container">
      <Form onSubmit={noteAssembly}>
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