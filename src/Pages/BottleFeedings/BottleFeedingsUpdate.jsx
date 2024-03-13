import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../store/GlobalState.jsx';
import { useNavUpdate } from '../../store/NavContext.jsx';
import { Form, Input, Textarea } from '../../components/FormItems/FormItems';
import Calendar from '../../components/Calendar/Calendar';
import MeasurementToggle from '../../components/MeasurementToggle/MeasurementToggle.jsx';
import '../../components/FormItems/FormItems.css';

export default function BottleFeedingsUpdate() {
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const {bottles, bottleUpdates } = useContext(GlobalStateContext);
  const [ isHeaderValid, setIsHeaderValid ] = useState(true);
  const { id } = useParams();
  const allMeasurements = ['oz', 'mL'];

  const curItemArray = id ? bottles.filter(bottle => bottle.id === id) : '';
  const curItem = curItemArray[0] || '';
  const liftedInputContent = {};
  const inputDate = curItem ? new Date(curItem.date) : new Date();
  const twoDigitHour = inputDate.getHours() < 10 ? `0${inputDate.getHours()}` : inputDate.getHours();
  const twoDigitMinutes = inputDate.getMinutes() < 10 ? `0${inputDate.getMinutes()}` : inputDate.getMinutes();
  const inputTime = `${twoDigitHour}:${twoDigitMinutes}`;

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

  function timeLifter(timeValue) {
    liftedInputContent.time = timeValue;
  }

  function textareaLifter(inputValue) {
    liftedInputContent.textarea = inputValue;
  }

  const measurementLifter = (str) => {
    liftedInputContent.measurement = str;
  }

  function bottleAssembly(e) {
    e.preventDefault();
    const itemDate = liftedInputContent.date ? new Date(liftedInputContent.date) : inputDate;
    if (liftedInputContent.time) {
      const userInputTime = [liftedInputContent.time.split(":")[0], liftedInputContent.time.split(":")[1]]
      itemDate.setHours(userInputTime[0], userInputTime[1]);
    }
    
    const updateType = id ? 'UPDATE_ITEM' : 'ADD_ITEM';
    let headerText = liftedInputContent.input || curItem.header;
    const bodyText = liftedInputContent.textarea || curItem.body;
    const measurementInputType = liftedInputContent.measurement || curItem.measurementType || allMeasurements[0];

    if (headerText) {
      const assebmledBottle = {id, headerText, measurementInputType, itemDate, bodyText, updateType};
      bottleUpdates(assebmledBottle);
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
          {id ? `Edit ` : `Add `}
          bottle deeding
        </h2>
      </header>
      <Form onSubmit={bottleAssembly}>
        <div className="flex-group">
          <Input
            id="amount"
            labelText="Amount"
            type="number"
            value={curItem.header || ''}
            lifter={inputLifter}
            validity={isHeaderValid}
          />
          <MeasurementToggle
            items={allMeasurements}
            lifter={measurementLifter}
            curMeasurement={curItem.measurementType}
          />
        </div>
        <div className="flex-group">
          <Calendar lifter={dateLifter} inputDate={new Date(inputDate)} />
          <Input
            id="time"
            labelText="time"
            type="time"
            value={inputTime}
            lifter={timeLifter}
            validity={true}
          />
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
          value="Submit"
        />
      </Form>
    </section>
  );
}