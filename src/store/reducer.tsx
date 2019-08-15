import fields from '../api/fields.json';
import { IField } from 'components/App.js';

const transformedFields: {
  [key: string]: Array<IField>
} = {};

Object.keys(fields).forEach((key: string) => {
  if (!fields.hasOwnProperty(key)) {
    return;
  }
  transformedFields[key] = fields[key].map(field => {
    return {
      ...field,
      value: '',
      touched: false,
      valid: !field.required
    };
  });
});

const initialState = {
  ...transformedFields,
  introduction: [
    {
      name: "Выберите нужную форму регистрации:",
      required: true,
      id: 'organization-format',
      value: '',
      touched: false,
      valid: false,
      type: 'radio',
      options: [
        {
          name: "Юр.лицо",
          value: "organization"
        },
        {
          name: "ИП",
          value: "individual_organization"
        }
      ]
    }
  ]
};

export interface IStore {
  introduction: Array<IField>,
  organization: Array<IField>,
  individual_organization: Array<IField>,
  personal: Array<IField>
};

interface IAction {
  type: string;
  [key: string]: any;
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SET_FIELDS':
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};

export default reducer;