import * as React from 'react';

import './Buttons.scss';

export interface IProps {
  onContinue: () => void;
  onBack: () => void;
  allowNext: boolean;
}

const Buttons = (props: IProps) => {
  const { onContinue, onBack, allowNext } = props;
  let continueFunction = () => { };
  if (allowNext) {
    continueFunction = onContinue;
  }
  return (
    <div className="buttons">
      <button type="button" onClick={onBack}>Назад</button>
      <button type="button" onClick={continueFunction} disabled={!allowNext}>Отправить</button>
    </div >
  );
};

export default Buttons;