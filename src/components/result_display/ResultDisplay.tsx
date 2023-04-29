import * as React from 'react';
import './ResultDisplay.css';
import { ProblemInfo } from '../../core/types';

/**
 * ResultDisplayコンポーネントのProps
 * @property {boolean} isOpen - 結果ダイアログの表示フラグ
 * @property {ProblemInfo[]} problemInfoList - 問題情報リスト
 * @property {boolean} isSurrender - 降参フラグ
 */
type Props = {
  isOpen: boolean;
  problemInfoList: ProblemInfo[];
  isSurrender: boolean;
}

/**
 * ResultDisplayコンポーネント
 * @param {boolean} isOpen - 結果ダイアログの表示フラグ
 * @param {ProblemInfo[]} problemInfoList - 問題情報リスト
 * @param {boolean} isSurrender - 降参フラグ
 * @returns ResultDisplayコンポーネント
 */
const ResultDisplay = ({ isOpen, problemInfoList, isSurrender }: Props): JSX.Element => {
  // 解答時間の表示要素
  let answerTime: JSX.Element = <></>;
  if (isSurrender) {
    answerTime = <>記録なし</>;
  }
  else {
    answerTime = <>TODO: タイムを出力</>
  }

  return (
    <div id="answer-area" style={{ display: isOpen ? 'flex' : '' }}>
      <div className="answer-info-title">- タイム -</div>
      <div className="answer-time">
        {answerTime}
      </div>
      <div className="answer-info-title">- 答え -</div>
      <div id="answer-list">
        {problemInfoList.map((problemInfo: ProblemInfo, i: number) => 
            <div key={i} className="answer-list-row">
              {(i + 1) + '. ' + problemInfo.answer}
            </div>
        )}
      </div>
    </div>
  );
}

export default ResultDisplay;