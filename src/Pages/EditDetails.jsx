import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../store/GlobalState.jsx';
import { useNavUpdate } from '../store/NavContext.jsx';
import { useDateUpdate } from '../store/DateContext';
import { Form, Input, Textarea } from '../components/FormItems/FormItems';
import { grabParentFromUrl, selectPageTypeData } from '../assets/commonFns';
import Calendar from '../components/Calendar/Calendar';
import MeasurementToggle from '../components/MeasurementToggle/MeasurementToggle.jsx';
import '../components/FormItems/FormItems.css';

export default function EditDetails() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const dateUpdater = useDateUpdate();
  const { notes, notesUpdates, bottles, bottleUpdates } = useContext(GlobalStateContext);
  const [ isHeaderValid, setIsHeaderValid ] = useState(true);
  const { id } = useParams();
  const pageGroup = {};
  const allMeasurements = ['oz', 'mL'];

  pageGroup.page = grabParentFromUrl();
  pageGroup.utils = selectPageTypeData(pageGroup.page);
  pageGroup.measurement = allMeasurements[0];
  
  switch (pageGroup.page) {
    case 'notes':
      pageGroup.objTypeContext = notes;
      pageGroup.updaterContext = notesUpdates;
      break;
    case 'bottles':
      pageGroup.objTypeContext = bottles;
      pageGroup.updaterContext = bottleUpdates;
      break;
  }

  const curItemArray = id ? pageGroup.objTypeContext.filter(note => note.id === id) : '';
  const curItem = curItemArray[0] || '';
  const liftedInputContent = {};
  const inputDate = curItem ? new Date(curItem.date) : new Date();
  const twoDigitHour = inputDate.getHours() < 10 ? `0${inputDate.getHours()}` : inputDate.getHours();
  const twoDigitMinutes = inputDate.getMinutes() < 10 ? `0${inputDate.getMinutes()}` : inputDate.getMinutes();
  const inputTime = `${twoDigitHour}:${twoDigitMinutes}`;

  useEffect(() => {
    navUpdater(false);
    dateUpdater(id ? new Date(curItem.date) : new Date());
  }, []);

  function inputLifter(inputValue) {
    liftedInputContent.input = inputValue;
  }

  const dateLifter = (d) => {
    liftedInputContent.date = d;
  }

  function timeLifter(timeValue) {
    liftedInputContent.time = timeValue;
  }

  function textareaLifter(inputValue) {
    liftedInputContent.textarea = inputValue;
  }

  function noteAssembly(e) {
    e.preventDefault();
    const noteDate = liftedInputContent.date ? new Date(liftedInputContent.date) : inputDate;
    if (liftedInputContent.time) {
      const userInputTime = [liftedInputContent.time.split(":")[0], liftedInputContent.time.split(":")[1]]
      noteDate.setHours(userInputTime[0], userInputTime[1]);
    }
    
    const updateType = id ? 'UPDATE_ITEM' : 'ADD_ITEM';
    let headerText = liftedInputContent.input || curItem.header;
    headerText = (pageGroup.page === 'bottles') ? `${headerText.split(" ").splice(0, 1).toString()} ${pageGroup.measurement}` : headerText;
    const bodyText = liftedInputContent.textarea || curItem.body;
    if (headerText) {
      const assebmledNote = {id, headerText, noteDate, bodyText, updateType};
      pageGroup.updaterContext(assebmledNote);
      id ? navigate(`../detail/${id}`) : navigate(-1);
    } else {
      setIsHeaderValid(prevState => !prevState);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  const measurementLifter = (str) => {
    pageGroup.measurement = str;
  }

  const configureHeader = (header) => {
    header = (pageGroup.page === 'bottles' && id) ?
      header.split(" ").splice(0, 1).toString() :
      header;
    return header;
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
        <h2 className="page-edit__header">{pageGroup.utils.addPageTitle}</h2>
      </header>
      <Form onSubmit={noteAssembly}>
        <div className="flex-group">
          <Input
            id={pageGroup.utils.inputLabel.toLowerCase()}
            labelText={pageGroup.utils.inputLabel}
            type={pageGroup.utils.inputType}
            value={configureHeader(curItem.header) || ''}
            lifter={inputLifter}
            validity={isHeaderValid}
            errorText="Header text is required"
          />
          {pageGroup.page === 'bottles' && (
            <MeasurementToggle items={allMeasurements} lifter={measurementLifter} />
          )}
        </div>
        <div className="flex-group">
          <Calendar lifter={dateLifter} inputDate={new Date(inputDate)} />
          {pageGroup.page === 'bottles' && (
            <Input
              id="time"
              labelText="time"
              type="time"
              value={inputTime}
              lifter={timeLifter}
              validity={true}
            />
          )}
        </div>
        <Textarea
          id="body"
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