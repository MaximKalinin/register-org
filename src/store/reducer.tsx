import fields from '../api/fields.json';

const transformedFields = {};
Object.keys(fields).forEach(key => {
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

const reducer = (state = initialState, action) => {
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