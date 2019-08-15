import * as React from 'react';

import './Field.scss';

export interface IProps {
  field: {
    name: string,
    required: boolean,
    id: string,
    value: string,
    touched: boolean,
    valid: boolean,
    options?: Array<{
      name: string,
      value: string
    }>
  };
  onChange: (event: any) => void;
  validate: () => void;
  blurHandler: () => void;
}

const initialState = {
  organizationFormat: '',
};

const Field = (props: IProps) => {
  const { field, onChange, validate, blurHandler } = props;
  const [state, setState] = React.useState();
  const handleChange = (event) => {
    return setState({
      ...state,
      organizationFormat: event.target.value
    });
  };
  if (field.options) {
    return (
      <div className="field">
        {field.name}
        {field.options.map(option => (
          <label key={option.value}>
            <input type={field.type} name={field.id} value={option.value} onChange={onChange} checked={field.value === option.value} />{option.name}
          </label>
        ))}
      </div>
    );
  }
  const labelClasses = ['flex'];
  if (field.required) {
    labelClasses.push('required');
  }
  if (field.valid && field.touched) {
    labelClasses.push('valid');
  }
  if (!field.valid && field.touched) {
    labelClasses.push('invalid');
  }
  return (
    <div className="field">
      <label className={labelClasses.join(' ')}>
        <span>{field.name}</span>
        <input name={field.id} type={field.type} onBlur={blurHandler} onChange={onChange} value={field.value} />
      </label>
    </div>
  );
};

export default Field;