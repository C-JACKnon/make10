import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import HowToPlayDialog from './components/how_to_play_dialog/HowToPlayDialog';
import MakeTen from './components/make_ten/MakeTen';
import { ProblemInfo, StorageData } from './core/types';
import { problemList } from './assets/problem/problemList';
import Chance from 'chance';
import ProblemCounter from './components/problem_counter/ProblemCounter';
import ResultDisplay from './components/result_display/ResultDisplay';
import SurrenderConfirmationDialog from './components/surrender_confirmation_dialog/SurrenderConfirmationDialog';
import CannotStorageDialog from './components/cannot_storage_dialog/CannotStorageDialog';

/**
 * アプリケーションコンポーネント
 * @returns アプリケーションコンポーネント
 */
function App() {
  const idDevelopMode: boolean = true; // 開発モード
  const problemCount: number = 2; // 出題する問題数
  const showResultDisplayWaitTime: number = 800; // 結果画面表示までの待機時間(ms)

  // 問題情報リスト
  const [problemInfoList, setProblemInfoList] = useState<ProblemInfo[]>([]);

  // 問題の数字配列[4]
	const [problemNumbers, setProblemNumbers] = useState<number[]>([0, 0, 0, 0]);

  // 正解数
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  // 全問正解までのタイム
  const [allProblemClearTime, setAllProblemClearTime] = useState('');

  // 遊び方ダイアログの表示フラグ
  const [isOpenHowToDialog, setIsOpenHowToDialog] = useState(false);

  // 遊び方ダイアログの初期表示フラグ
  const [isOpenHowToDialogForInitDisplay, setIsOpenHowToDialogForInitDisplay] = useState(true);

  // 降参ダイアログの表示フラグ
  const [isOpenSurrenderConfirmationDialog, setIsOpenSurrenderConfirmationDialog] = useState(false);

  // 降参フラグ
  const [isSurrender, setIsSurrender] = useState(false);

  // 結果画面の表示フラグ
  const [isOpenResultDisplay, setIsOpenResultDisplay] = useState(false);

  // 画面初期処理完了フラグ
  const [isInitDisplayCompleted, setIsInitDisplayCompleted] = useState(false);

  // ローカルストレージ使用可能フラグ
  const [isAvailableLocalStorage, setIsAvailableLocalStorage] = useState(true);

  /**
	 * 初回レンダリング時処理
	 */
	useEffect(() => {
    // ローカルストレージが使用可能か判定
    setIsAvailableLocalStorage(checkAvailableLocalStorage());
    const today = getNowDate(); // 今日の日付を取得
    let newCorrectAnswerCount = 0;
    // 今日始めてページを表示した場合
    if (localStorage.getItem(StorageData.OpenPageDate) !== today) {
      localStorage.setItem(StorageData.OpenPageDate, today); // ストレージに今日の日付を格納
      localStorage.setItem(StorageData.CorrectAnswerCount, '0'); // ストレージの正解数をリセット
      localStorage.setItem(StorageData.IsSurrender, 'false'); // ストレージの降参フラグをリセット
      setIsOpenHowToDialogForInitDisplay(true); // 遊び方ダイアログ初期表示フラグON
      changeHowToPlayDialog(true); // 遊び方ダイアログを表示
    }
    else {
      // 今日の正解数を取得
      const todayCorrectAnswerCount = localStorage.getItem(StorageData.CorrectAnswerCount);
      if (todayCorrectAnswerCount != null) {
        // 全問正解している場合
        if (Number(todayCorrectAnswerCount) >= problemCount) {
          // 格納されている降参フラグを取得
          const todayIsSurrender = localStorage.getItem(StorageData.IsSurrender);
          
          // 降参フラグを更新
          setIsSurrender(todayIsSurrender === 'true');

          // ストレージに格納されている全問正解までの時間を取得
          const clearTime = localStorage.getItem(StorageData.AllProblemClearTime);

          if (clearTime != null) {
            // 全問正解までの時間を更新
            setAllProblemClearTime(clearTime);
          }

          // 結果画面の表示フラグON
          setIsOpenResultDisplay(true);
        }
        else {
          // 今日の正解数を設定
          setCorrectAnswerCount(Number(todayCorrectAnswerCount));
          newCorrectAnswerCount = Number(todayCorrectAnswerCount);
        }
      }
    }
    // 今日の日付をシード値として問題を生成する
    const problemInfos = createProblem(today);

    // 出題する問題情報リストに格納
    setProblemInfoList(problemInfos);

    const newProblemNumbers = [...problemNumbers]; // 配列の値渡し
    newProblemNumbers[0] = problemInfos[newCorrectAnswerCount].problem[0];
    newProblemNumbers[1] = problemInfos[newCorrectAnswerCount].problem[1];
    newProblemNumbers[2] = problemInfos[newCorrectAnswerCount].problem[2];
    newProblemNumbers[3] = problemInfos[newCorrectAnswerCount].problem[3];

    // 問題の更新
    setProblemNumbers(newProblemNumbers);

    // 画面初期処理完了フラグ
    setIsInitDisplayCompleted(true);
	}, []);

  /**
   * 問題正解イベント
   */
  const handleCorrectAnswer = (): void => {
    // 正解数を加算
    const newCorrectAnswerCount = correctAnswerCount + 1;

    // 正解数を更新
    setCorrectAnswerCount(newCorrectAnswerCount);

    // 正解数をローカルストレージに格納
    localStorage.setItem(StorageData.CorrectAnswerCount, String(newCorrectAnswerCount));

    // 最終問題に正解した場合
    if (newCorrectAnswerCount >= problemCount) {
      // ストレージに格納されている開始時間を取得
      const startTime = localStorage.getItem(StorageData.StartTime);

      // 開始時刻から現在時刻までの時間を取得
      const clearTime = getElapsedTime(Number(startTime));

      // 全問正解までの時間を更新
      setAllProblemClearTime(clearTime);

      // ストレージに全問正解までの経過時間を格納
      localStorage.setItem(StorageData.AllProblemClearTime, clearTime);

      window.setTimeout(() => {
        // 結果画面を表示する
        setIsOpenResultDisplay(true);
      }, showResultDisplayWaitTime);
      return; // 後続処理をスキップする 
    }

    // 新しい問題を設定
    const newProblemNumbers = [...problemNumbers]; // 配列の値渡し
    newProblemNumbers[0] = problemInfoList[newCorrectAnswerCount].problem[0];
    newProblemNumbers[1] = problemInfoList[newCorrectAnswerCount].problem[1];
    newProblemNumbers[2] = problemInfoList[newCorrectAnswerCount].problem[2];
    newProblemNumbers[3] = problemInfoList[newCorrectAnswerCount].problem[3];

    // 問題の更新
    setProblemNumbers(newProblemNumbers);
  }

  /**
   * 現在日付の取得(YYYYMMDD)
   * @returns {string} 現在の日付(YYYYMMDD)
   */
  const getNowDate = (): string => {
    const dateObj = new Date();
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    
    return year + month + day;
  }

  /**
   * 問題の生成
   * @param {string} today - 今日の日付(YYYMMDD)
   * @returns {ProblemInfo[]} 問題情報配列
   */
  const createProblem = (today: string): ProblemInfo[] => {
    // 今日の日付をシード値として乱数生成用インスタンを生成
    const chance = new Chance(today);
    const problemListIndexs: number[] = []; // 乱数で生成する問題のindexリスト
    const problemOrderList: number[][] = []; // 4つの数字の出題順リスト

    // 出題する問題数分乱数を生成
    for (let i = 0; i < problemCount; i++) {
      // 問題インデックス配列に格納
      problemListIndexs.push(chance.integer({ min: 0, max: problemList.length - 1 }));

      // 出題順を生成
      const problemOrder: number[] = [];
      while (problemOrder.length < 4) {
        const order = chance.integer({ min: 0, max: 3 });
        // 重複していない場合
        if (!problemOrder.includes(order)) {
          problemOrder.push(order);
        }
      }
      problemOrderList.push(problemOrder); // リストに格納
    }

    const problemInfos: ProblemInfo[] = []; // 問題情報配列
    // 問題情報配列に情報を設定
    problemListIndexs.forEach((index, i) => {
      // 問題を取得
      const problem = problemList[index].problem;
      problemInfos.push({
        problem: [
          problem[problemOrderList[i][0]],
          problem[problemOrderList[i][1]],
          problem[problemOrderList[i][2]],
          problem[problemOrderList[i][3]],
        ],
        answer: problemList[index].answer,
      })
    });
    
    // 開発者モードの場合
    if (idDevelopMode) {
      console.log('[Develop] Today problems.', problemInfos);
    }
    return problemInfos;
  }

  /**
   * 遊び方ダイアログの表示/非表示の切り替え
   * @param {boolean} isOpen - ダイアログを表示させるか否か
   */
  const changeHowToPlayDialog = (isOpen: boolean): void => {
    setIsOpenHowToDialog(isOpen); // 表示非表示を切り替える
  }

  /**
   * 降参ダイアログの表示/非表示の切り替え
   * @param {boolean} isOpen - ダイアログを表示させるか否か
   */
  const changeSurrenderConfirmationDialog = (isOpen: boolean): void => {
    setIsOpenSurrenderConfirmationDialog(isOpen); // 表示非表示を切り替える
  }

  /**
   * 結果画面の表示/非表示の切り替え
   * @param {boolean} isOpen - ダイアログを表示させるか否か
   */
  const changeResultDisplay = (isOpen: boolean): void => {
    setIsOpenResultDisplay(isOpen); // 表示非表示を切り替える
  }

  /**
   * 降参による結果画面の表示
   */
  const showResultForSurrender = (): void => {
    // 問題数をローカルストレージに格納する
    localStorage.setItem(StorageData.CorrectAnswerCount, String(problemCount));
    // 降参フラグONをローカルストレージに格納する
    localStorage.setItem(StorageData.IsSurrender, 'true');

    // 降参フラグON
    setIsSurrender(true);

    // 降参確認ダイアログを非表示
    changeSurrenderConfirmationDialog(false);
    
    // 結果画面の表示
    changeResultDisplay(true);
  }

  /**
   * 全問正解までの時間の計測開始
   */
  const timerStart = (): void => {
    const nowTime = new Date().getTime();
    // ストレージに現在の時刻を格納する
    localStorage.setItem(StorageData.StartTime, String(nowTime));
  }

  /**
   * 特定の時刻から現在時刻の経過時間を取得
   * @param {number} startTime - 測定開始時刻
   * @returns {string} 経過時間(HH:MM:SS)
   */
  const getElapsedTime = (startTime: number): string => {
    // 現在時刻を取得
    const currentTime = new Date().getTime();
    
    // 開始時刻から現在時刻までの経過時刻を取得
    const diffTime = currentTime - startTime;

    const elapsedTime: string[] = [];

    // 時を算出
    elapsedTime.push(String(Math.floor(diffTime / (1000 * 60 * 60))).padStart(2, '0'));
    // 分を算出
    elapsedTime.push(String(Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'));
    // 秒を算出
    elapsedTime.push(String(Math.floor(((diffTime % (1000 * 60 * 60)) % (1000 * 60)) / 1000)).padStart(2, '0'));
    
    return elapsedTime.join(':');
  }

  /**
   * ローカルストレージが使用可能か判定
   * @returns ローカルストレージが使用可能か否か
   */
  const checkAvailableLocalStorage = (): boolean => {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('dummy', '1');
        if (localStorage.getItem('dummy') === '1') {
          localStorage.removeItem('dummy');
          return true;
        } else {
          return false;
        }
      } catch(e) {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div id="app">
      <div id="app-container" className="app-container-center">
        <div id="app-core">
          <Header
            openHowToPlayDialog={() => {
              setIsOpenHowToDialogForInitDisplay(false);
              changeHowToPlayDialog(true);
            }}
            openSurrenderConfirmationDialog={() => changeSurrenderConfirmationDialog(true)}
            isOpenResultDisplay={isOpenResultDisplay}
            isDevelopMode={idDevelopMode}
          />
          <div
            id="make-ten-area"
            className={`
              ${isOpenResultDisplay ? "area-hidden" : ""}
              ${(isInitDisplayCompleted && !isOpenResultDisplay) ? "area-visible" : ""}
            `} >
            <ProblemCounter
              problemNumber={correctAnswerCount}
              problemCount={problemCount}
            ></ProblemCounter>
            <MakeTen
              problemNumbers={problemNumbers}
              correctAnswer={handleCorrectAnswer}
            />
          </div>
          <HowToPlayDialog
            isOpen={isOpenHowToDialog}
            isInitDisplay={isOpenHowToDialogForInitDisplay}
            closeHowToPlayDialog={() => changeHowToPlayDialog(false)}
            timerStart={timerStart}
            problemCount={problemCount}
          />
          <SurrenderConfirmationDialog
            isOpen={isOpenSurrenderConfirmationDialog}
            closeSurrenderConfirmationDialog={() => changeSurrenderConfirmationDialog(false)}
            openResultDisplay={showResultForSurrender}
          ></SurrenderConfirmationDialog>
          <div
            id="result-display-area"
            className={isOpenResultDisplay ? "area-visible" : "result-area-hidden"}
          >
            <ResultDisplay
              isOpen={isOpenResultDisplay}
              problemInfoList={problemInfoList}
              allProblemClearTime={allProblemClearTime}
              isSurrender={isSurrender}
            ></ResultDisplay>
          </div>
          <CannotStorageDialog isOpen={!isAvailableLocalStorage} ></CannotStorageDialog>
        </div>
      </div>
    </div>
  );
}

export default App;
