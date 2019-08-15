import * as React from 'react';

import './Field.scss';
import { IField } from '../App';

export interface IProps {
  field: IField;
  onChange: (event: any) => void;
  blurHandler: (event: any) => void;
}

const Field = (props: IProps) => {
  const { field, onChange, blurHandler } = props;

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