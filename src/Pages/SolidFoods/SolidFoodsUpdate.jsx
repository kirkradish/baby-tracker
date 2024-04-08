import { useEffect, useContext, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../store/GlobalState.jsx';
import { useNavUpdate } from '../../store/NavContext.jsx';
import { Form, Input, Textarea, RadioButtons } from '../../components/FormItems/FormItems.jsx';
import Calendar from '../../components/Calendar/Calendar.jsx';
import MeasurementToggle from '../../components/MeasurementToggle/MeasurementToggle.jsx';
import '../../components/FormItems/FormItems.css';

export default function SolidFoodsUpdate() {
  const headerInputRef = useRef();
  const solidFoodTypeRef = useRef();
  const navUpdater = useNavUpdate();
  const navigate = useNavigate();
  const {solidFoods, solidsUpdates} = useContext(GlobalStateContext);
  const [isHeaderValid, setIsHeaderValid] = useState(true);
  const { id } = useParams();
  const allMeasurements = ['tblsp', 'tsp'];
  const solidFoodFormats = [
    { id: 'whole', label: 'Whole', name: "solid-format" },
    { id: 'pureed', label: 'Puréed', name: "solid-format" }
  ];

  const curItemArray = id ? solidFoods.filter(note => note.id === id) : '';
  const curItem = curItemArray[0] || '';
  console.log(curItem);
  const [radioMeaurement, setRadioMeasurement] = useState(curItem.solidFoodFormat);
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

  function headerLifter(str) {
    // Using ref here to persist input value after rerender from solidFoodFormat
    headerInputRef.current = str;
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

  function amountLifter(str) {
    console.log(str);
    liftedInputContent.amount = str;
  }

  const measurementLifter = (str) => {
    liftedInputContent.measurement = str;
  }

  const solidFoodFormatLifter = (str) => {
    solidFoodTypeRef.current = str;
    liftedInputContent.solidFoodFormat = str;
    console.log(liftedInputContent.solidFoodFormat);
    setRadioMeasurement(str);
  }

  function solidFoodAssembly(e) {
    e.preventDefault();
    console.log(liftedInputContent.amount);
    const itemDate = liftedInputContent.date ? new Date(liftedInputContent.date) : inputDate;
    if (liftedInputContent.time) {
      const userInputTime = [liftedInputContent.time.split(":")[0], liftedInputContent.time.split(":")[1]]
      itemDate.setHours(userInputTime[0], userInputTime[1]);
    }
    
    const updateType = id ? 'UPDATE_ITEM' : 'ADD_ITEM';
    const headerText = headerInputRef.current || curItem.header;
    const bodyText = liftedInputContent.textarea || curItem.body;
    const measurementInputType = liftedInputContent.measurement || curItem.measurementType || allMeasurements[0];
    const solidFoodFormat = solidFoodTypeRef.current || curItem.solidFoodFormat || solidFoodFormats[0];
    const purreedAmount = liftedInputContent.amount || curItem.solidFoodFormat;
    if (headerText) {
      const assebmledSolidFood = {
        id,
        itemDate,
        headerText,
        solidFoodFormat,
        purreedAmount,
        measurementInputType,
        bodyText,
        updateType,
      };
      console.log(assebmledSolidFood);
      solidsUpdates(assebmledSolidFood);
      id ? navigate(`../detail/${id}`) : navigate(-1);
    } else {
      setIsHeaderValid(prevState => !prevState);
    }
  }
  console.log(Number(curItem.amount));

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
          solid food
        </h2>
      </header>
      <Form onSubmit={solidFoodAssembly}>
        <div className="flex-group form-block">
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
        <div className="flex-group form-block">
          <Input
            id="food"
            labelText="Food"
            type="text"
            value={curItem.header || ''}
            lifter={headerLifter}
            validity={isHeaderValid}
          />
        </div>
        <div className="flex-gap">
          <RadioButtons
            defaultRadio={curItem.solidFoodFormat}
            buttons={solidFoodFormats}
            lifter={solidFoodFormatLifter}
          />
        </div>
        {radioMeaurement === 'pureed' && (
          <div className="flex-group form-block">
            <Input
              id="amount"
              labelText="Amount"
              type="number"
              value={Number(curItem.amount) || ''}
              lifter={amountLifter}
              validity={true}
            />
            <MeasurementToggle
              items={allMeasurements}
              lifter={measurementLifter}
              curMeasurement={curItem.measurementType}
            />
          </div>
        )}
        <div className="flex-group form-block grow">
          <Textarea
            id="body"
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