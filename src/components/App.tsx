import * as React from 'react';
import { connect } from 'react-redux';

import Field from './Field/Field';
import ProgressBar from './ProgressBar/ProgressBar';
import Buttons from './Buttons/Buttons';
import './App.scss';

const initialState = {
  stage: 0
};

const App = ({ initialFields, setStoreFields }) => {
  const [stage, setStage] = React.useState(initialState.stage);
  const [fields, setFields] = React.useState(initialFields.introduction);

  const getFieldsFromStore = (newStage: number) => {
    switch (newStage) {
      case 0:
        return setFields(initialFields.introduction);
      case 1:
        return setFields(initialFields.personal);
      case 2:
        const format = initialFields.introduction[0].value;
        return setFields(initialFields[format]);
      default:
        return;
    }
  };

  const setFieldsToStore = (thisStage: number) => {
    const newFields = fields.map(field => {
      return { ...field, touched: field.value.trim() !== '' };
    });
    switch (thisStage) {
      case 0:
        return setStoreFields('introduction', newFields);
      case 1:
        return setStoreFields('personal', newFields);
      case 2:
        const format = initialFields.introduction[0].value;
        return setStoreFields(format, newFields);
      default:
        return;
    }
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    const field = newFields.find(field => field.id === name);
    if (!field) {
      return;
    }
    field.value = value;
    if (field.type === 'radio') {
      field.valid = true;
      field.touched = true;
    }
    setFields(validate(name, newFields));
  };

  const next = () => {
    if (stage < 2) {
      setFieldsToStore(stage);
      getFieldsFromStore(stage + 1);
      return setStage(stage + 1);
    } else {
      // setStage(3);
      printInfo();
    }
  };

  const prev = () => {
    if (stage > 0) {
      setFieldsToStore(stage);
      getFieldsFromStore(stage - 1);
      return setStage(stage - 1);
    }
  };

  const validate = (id: string, thisFields: {}) => {
    const newFields = thisFields.map(field => {
      if (field.id !== id) {
        return field;
      }
      if (!field.required) {
        return field;
      }
      let valid = true;
      switch (field.type) {
        case 'text':
        case 'radio':
          valid = valid && field.value.trim() !== '';
          break;
        case 'number':
          const numberRE = /^[0-9]+$/;
          valid = valid && numberRE.test(field.value.trim());
          break;
        case 'email':
          const emailRE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          valid = valid && emailRE.test(field.value.trim());
          break;
        default:
          break;
      }
      if (field.length) {
        valid = valid && field.value.toString().length === field.length;
      }
      return {
        ...field,
        valid,
        touched: true
      };
    });
    return newFields;
  };

  const blurHandler = (event: any) => {
    const { name } = event.target;
    const newFields = fields.map(field => {
      if (field.id !== name) {
        return field;
      }
      return {
        ...field,
        touched: true
      };
    });
    setFields(newFields);
  };

  const printInfo = () => {
    const key = initialFields.introduction[0].value;
    const ogrnId = key === 'individual_organization' ? 'OGRNIP' : 'OGRN';
    const output = {
      id: Math.trunc(Math.random()) * 14,
      username: '77777777777',
      params: {
        C: initialFields.personal.find(field => field.id === 'C'),
        S: initialFields.personal.find(field => field.id === 'S'),
        SNILS: fields.find(field => field.id === 'SNILS'),
        E: fields.find(field => field.id === 'E'),
        [ogrnId]: fields.find(field => field.id === ogrnId),
        G: initialFields.personal.find(field => field.id === 'G'),
        INN: fields.find(field => field.id === 'INN'),
        CN: initialFields.personal.find(field => field.id === 'CN'),
        SN: initialFields.personal.find(field => field.id === 'SN'),
        STREET: initialFields.personal.find(field => field.id === 'STREET'),
        L: initialFields.personal.find(field => field.id === 'L'),
      },
      createdTime: new Date(),
      status: 'INITIATED',
      comment: null
    };
    console.log('request is ', output);
    window.alert('Форма успешно отправлена! Загляни в консоль, чтобы увидеть запрос');
  };

  return (
    <main>
      <div>
        <h3>Заявление на регистрацию</h3>
        <form>
          <ProgressBar stage={stage} />
          <div>
            {fields.map(field => <Field key={field.id} field={field} onChange={onChange} validate={() => validate(field.id)} blurHandler={blurHandler} />)}
          </div>
          <Buttons onContinue={next} onBack={prev} allowNext={fields.reduce(
            (isAllValid: boolean, field) => (isAllValid && field.valid),
            true)} />
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    initialFields: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStoreFields: (key, fields) => dispatch({ type: 'SET_FIELDS', key, value: fields })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);