import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDate, useDateUpdate } from '../store/DateContext';
import { Form, Input, Textarea } from '../components/FormItems/FormItems';
import { grabParentFromUrl, dateSlashFormatter } from '../assets/commonFns';
import DateDropdown from '../components/Calendar/DateDropdown';
import '../components/FormItems/FormItems.css';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const contextDate = useDate();
  const dateUpdater = useDateUpdate();
  const { notes, notesUpdates, bottles, bottleUpdates } = useContext(GlobalStateContext);
  const { id } = useParams();
  const pageGroup = {};

  pageGroup.page = grabParentFromUrl();
  
  switch (pageGroup.page) {
    case 'notes':
      pageGroup.objType = notes;
      pageGroup.updater = notesUpdates;
      break;
    case 'bottles':
      pageGroup.objType = bottles;
      pageGroup.updater = bottleUpdates;
      break;
  }

  const curObjItem = id ? pageGroup.objType.filter(note => note.id === id) : '';
  const curItem = curObjItem[0] || curObjItem;
  const liftedInputContent = {};
  const inputDate = curItem.date || contextDate;

  useEffect(() => {
    navUpdater(false);
    dateUpdater(id ? new Date(curItem.date) : new Date());
  }, []);

  function inputLifter(inputValue) {
    liftedInputContent.input = inputValue;
  }

  function textareaLifter(inputValue) {
    liftedInputContent.textarea = inputValue;
  }
  
  function noteAssembly(e) {
    e.preventDefault();
    const noteDate = dateSlashFormatter(new Date(contextDate));
    const updateType = id ? 'UPDATE_ITEM' : 'ADD_ITEM';
    const headerText = liftedInputContent.input;
    const bodyText = liftedInputContent.textarea;
    const assebmledNote = {id, headerText, noteDate, bodyText, updateType};
    pageGroup.updater(assebmledNote);
    id ? navigate(`../detail/${id}`) : navigate(-1);
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page page-edit tracker-container">
      <header>
        <button
          className="page-edit__return material-symbols-outlined"
          onClick={handleCancel}
        >
          <span>close</span>
        </button>
        <h2 className="page-edit__header">{id ? 'Edit Note' : 'Add Note'}</h2>
      </header>
      <Form onSubmit={noteAssembly}>
        <Input
          labelText="header"
          value={curItem.header || ''}
          lifter={inputLifter}
        />
        <DateDropdown itemDate={inputDate} />
        <Textarea
          labelText="body"
          value={curItem.body || ''}
          lifter={textareaLifter}
        />
        <input
          type="submit"
          className="submit-form"
          value={"Submit"}
        />
      </Form>
    </section>
  );
}