import * as React from 'react';

import './ProgressBar.scss';

interface IProps {
  stage: number;
}

const ProgressBar = (props: IProps) => {
  const { stage } = props;
  return (
    <div className="progress-bar__wrapper">
      <span>Шаг {stage + 1} из 3</span>
      <div className={`progress-bar stage-${stage}`} />
    </div>
  );
};

export default ProgressBar;