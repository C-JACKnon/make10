import * as React from 'react';
import './ProblemCounter.css';

/**
 * ProblemCounterコンポーネントのprops
 * @property {number} problemNumber - 問題番号
 * @property {number} problemCount - 問題数
 */
type Props = {
	problemNumber: number;
  problemCount: number;
}

/**
 * ProblemCounterコンポーネント
 * @param {number} problemNumber - 問題番号
 * @param {number} problemCount - 問題数
 * @returns ProblemCounterコンポーネント
 */
const ProblemCounter = ({ problemNumber, problemCount }: Props): JSX.Element => {

  return (

    <div id="problem-counter">
      <div id="problem-counter-value">
        <div id="problem-counter-child-number">{problemNumber}</div>
        <div id="problem-counter-number-divider"></div>
        <div id="problem-counter-mother-number">{problemCount}</div>
      </div>
    </div>
  );
}

export default ProblemCounter;