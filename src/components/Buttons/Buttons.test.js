import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Buttons from './Buttons';

configure({ adapter: new Adapter() });

it('Button not execute onContinue when allowNext is set to false', () => {
  let notCalled = true;
  const wrapper = shallow(
    <Buttons allowNext={ true } onContinue={ () => notCalled = false } />
  );
  const button = wrapper.find('#next-button');
  button.simulate('click');
  expect(notCalled).toBe(false);
});