import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate, useDateUpdate } from '../store/DateContext';
import { Form, ActionButtons, Input, Textarea } from '../components/FormItems/FormItems';
import { dateSlashFormatter } from '../assets/commonFns';
import DateDropdown from '../components/Calendar/DateDropdown';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const contextDate = useDate();
  const dateUpdater = useDateUpdate();
  const { id } = useParams();
  const { notes, notesUpdates } = useContext(GlobalStateContext);
  let curNote = notes.filter(note => note.id === id);
  curNote = curNote[0] || curNote;
  const [headerText, setHeaderText] = useState(curNote.header || '');
  const [bodyText, setBodyText] = useState(curNote.body || '');
  const inputDate = curNote.date || contextDate;

  useEffect(() => {
    navUpdater(false);
    dateUpdater(id ? new Date(curNote.date) : new Date());
  }, []);

  function handleHeaderChange(e) {
    setHeaderText(e.target.value);
  }

  function handleBodyChange(e) {
    setBodyText(e.target.value);
  }
  
  function noteAssembly(e) {
    e.preventDefault();
    const noteDate = dateSlashFormatter(new Date(contextDate));
    const updateType = id ? 'UPDATE_NOTE' : 'ADD_NOTE';
    const assebmledNote = {id, headerText, noteDate, bodyText, updateType};
    notesUpdates(assebmledNote);
    id ? navigate(`../note-detail/${id}`) : navigate(-1);
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
        <DateDropdown itemDate={inputDate} />
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