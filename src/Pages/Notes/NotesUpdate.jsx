import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../store/GlobalState.jsx';
import { useNavUpdate } from '../../store/NavContext.jsx';
import { Form, Input, Textarea } from '../../components/FormItems/FormItems';
import Calendar from '../../components/Calendar/Calendar';
import '../../components/FormItems/FormItems.css';

export default function NotesUpdate() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const { notes, notesUpdates } = useContext(GlobalStateContext);
  const [ isHeaderValid, setIsHeaderValid ] = useState(true);
  const { id } = useParams();

  const curItemArray = id ? notes.filter(note => note.id === id) : '';
  const curItem = curItemArray[0] || '';
  const liftedInputContent = {};
  const inputDate = curItem ? new Date(curItem.date) : new Date();

  useEffect(() => {
    navUpdater(false);
  }, []);

  function handleCancel() {
    navigate(-1);
  }

  function inputLifter(inputValue) {
    liftedInputContent.input = inputValue;
  }

  const dateLifter = (d) => {
    liftedInputContent.date = d;
  }

  function textareaLifter(inputValue) {
    liftedInputContent.textarea = inputValue;
  }

  function noteAssebly(e) {
    e.preventDefault();
    const updateType = id ? 'UPDATE_ITEM' : 'ADD_ITEM';
    const itemDate = liftedInputContent.date ? new Date(liftedInputContent.date) : inputDate;
    let headerText = liftedInputContent.input || curItem.header;
    const bodyText = liftedInputContent.textarea || curItem.body;

    if (headerText) {
      const assebmledNote = {updateType, id, headerText, itemDate, bodyText};
      notesUpdates(assebmledNote);
      id ? navigate(`../detail/${id}`) : navigate(-1);
    } else {
      setIsHeaderValid(prevState => !prevState);
    }
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
        <h2 className="page-edit__header">
          {id ? 'Edit ' : 'Add '}
          note
        </h2>
      </header>
      <Form onSubmit={noteAssebly}>
        <div className="flex-group">
          <Input
            id='header'
            labelText='header'
            type='text'
            value={curItem.header || ''}
            lifter={inputLifter}
            validity={isHeaderValid}
          />
        </div>
        <div className="flex-group">
          <Calendar lifter={dateLifter} inputDate={new Date(inputDate)} />
        </div>
        <div className="flex-group form-block grow">
          <Textarea
            id="body"
            additionalClasses="grow"
            labelText="body"
            value={curItem.body || ''}
            lifter={textareaLifter}
          />
        </div>
        <input
          type="submit"
          className="submit-form"
          value="Submit"
        />
      </Form>
    </section>
  );
}