import * as React from 'react';
import './ResultDisplay.css';
import { ProblemInfo } from '../../core/types';
import { useEffect, useState } from 'react';
import {
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share"

/**
 * ResultDisplayコンポーネントのProps
 * @property {boolean} isOpen - 結果ダイアログの表示フラグ
 * @property {ProblemInfo[]} problemInfoList - 問題情報リスト
 * @property {string} allProblemClearTime - 全問正解までのタイム
 * @property {boolean} isSurrender - 降参フラグ
 */
type Props = {
  isOpen: boolean;
  problemInfoList: ProblemInfo[];
  allProblemClearTime: string;
  isSurrender: boolean;
}

/**
 * ResultDisplayコンポーネント
 * @param {boolean} isOpen - 結果ダイアログの表示フラグ
 * @param {ProblemInfo[]} problemInfoList - 問題情報リスト
 * @param {string} allProblemClearTime - 全問正解までのタイム
 * @param {boolean} isSurrender - 降参フラグ
 * @returns ResultDisplayコンポーネント
 */
const ResultDisplay = ({ isOpen, problemInfoList, allProblemClearTime, isSurrender }: Props): JSX.Element => {
  const nextProblemWaitTimeUpdateCycle = 500; // 問題更新までの残り時間の更新周期(ms)
  const pageReloadWaitTime = 1000; // 日付変更時の画面リロード待機時間(ms)
  const resizeEventInterval: number = 50; // リサイズイベントの発生インターバル(ms)
  let resizeEventSetTimeoutId: number = 0; // リサイズイベント時のsetTimeoutID
  const pageURL = 'https://c-jacknon.github.io/make10/'; // ページのURL

  // 問題更新までの残り時間
  const [nextProblemWaitTime, setNextProblemWaitTime] = useState<string>('');

  // 結果画面の高さ
  const [resultDisplayHeight, setResultDisplayHeight] = useState<number>(0);

  useEffect(() => {
    // 結果画面の高さを算出
    const newResultDisplayHeight = calcResultDisplayHeight();
    // 画面高さを更新
    setResultDisplayHeight(newResultDisplayHeight);

    // 問題更新までの残り時間を更新させる周期処理
    const intervalId = window.setInterval(() => {
      const date = new Date();
      
      // 残り時間の時を算出
      const waitTimeHour = 23 - date.getHours();
      // 残り時間の分を算出
      const waitTimeMin = 59 - date.getMinutes();
      // 残り時間の秒を算出
      const waitTimeSec = 59 - date.getSeconds();
      // 新たな残り時間の文字配列を生成
      const newNextProblemWaitTime: string[] = [
        waitTimeHour.toString().padStart(2, '0'),
        waitTimeMin.toString().padStart(2, '0'),
        waitTimeSec.toString().padStart(2, '0')
      ];

      // 日付が更新されたか判定
      if (date.getHours() === 0
        && date.getMinutes() === 0
        && date.getSeconds() === 0) {
        // 残り時間を更新
        setNextProblemWaitTime('00:00:00');

        // 周期処理を終了する
        window.clearInterval(intervalId);

        // 一定時間待機後に画面を更新させる
        window.setTimeout(() => {
          // ページリロード
          window.location.reload();
        }, pageReloadWaitTime);
      }
      else {
        // 残り時間を更新
        setNextProblemWaitTime(newNextProblemWaitTime.join(':'));
      }
    }, nextProblemWaitTimeUpdateCycle)

    // ブラウザリサイズイベントの登録
		window.addEventListener('resize', (): void => {
      // タイムアウトが走っていない、かつ正解アニメーション実行中でない場合
			if (resizeEventSetTimeoutId === 0) {
        resizeEventSetTimeoutId = window.setTimeout(() => {
          // 結果画面の高さを算出
          const newResultDisplayHeight = calcResultDisplayHeight();
          // 画面高さを更新
          setResultDisplayHeight(newResultDisplayHeight);
          window.clearTimeout(resizeEventSetTimeoutId); // タイムアウトイベントの削除
					resizeEventSetTimeoutId = 0; // IDリセット
        }, resizeEventInterval);
      }
    });
  }, []);

  /**
   * 結果画面の高さを算出
   * @returns {number} 結果画面の高さ(px)
   */
  const calcResultDisplayHeight = (): number => {
    const appDisplayElement = document.getElementById('app-core');
    if (appDisplayElement === null) {
      throw new Error('Failed access "app-core" element.');
    }
    const appHeaderElement = document.getElementById('app-header');
    if (appHeaderElement === null) {
      throw new Error('Failed access "app-header" element.');
    }
    return appDisplayElement.clientHeight - appHeaderElement.clientHeight;
  }
  
  // 解答時間の表示要素
  let answerTime: JSX.Element = <></>;
  if (isSurrender) {
    answerTime = <>記録なし</>;
  }
  else {
    answerTime = <>{allProblemClearTime}</>
  }

  return (
    <div id="answer-area" style={{ display: isOpen ? 'flex' : '', height: resultDisplayHeight + 'px' }}>
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
      <div className="answer-info-title">- 友達にシェア -</div>
      <div className="share-button-area">
        <TwitterShareButton
          url={pageURL}
          title={'【Make10】\n今日のタイムは[' + (isSurrender ? '記録なし' : allProblemClearTime)  +']でした。\n'}
        >
          <TwitterIcon size={'2em'} round />
        </TwitterShareButton>
        <LineShareButton url={pageURL + '\n【Make10】\n今日のタイムは[' + (isSurrender ? '記録なし' : allProblemClearTime) + ']でした。'}>
          <LineIcon size={'2em'} round />
        </LineShareButton>
        <FacebookShareButton url={pageURL}>
          <FacebookIcon size={'2em'} round />
        </FacebookShareButton>
      </div>
      <div className="answer-info-title">- 問題の更新まで -</div>
      <div className="next-problem-wait-time">
        {nextProblemWaitTime}
      </div>
    </div>
  );
}

export default ResultDisplay;