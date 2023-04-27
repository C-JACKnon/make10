/**
 * ストレージに保存するデータ種類
 */
export enum StorageData {
  /**
   * ページを開いた日付
   */
  OpenPageDate = 'OpenPageDate',
  /**
   * その日の正解数
   */
  CorrectAnswerCount = 'CorrectAnswerCount',
}

/**
 * 問題情報
 * @property {number[]} problem - 問題
 * @property {string} answer - 答え
 */
export interface ProblemInfo {
  problem: number[];
  answer: string;
}

/**
 * ボタン種類
 */
export enum ButtonType {
  /**
   * 左から1つ目の数字ボタン
   */
  FirstNumber = 'first',
  /**
   * 左から2つ目の数字ボタン
   */
  SecondNumber = 'second',
  /**
   * 左から3つ目の数字ボタン
   */
  ThirdNumber = 'third',
  /**
   * 左から4つ目の数字ボタン
   */
  FourthNumber = 'fourth',
  /**
   * 算出された1つ目の数字ボタン
   */
  FirstResultNumber = 'firstResult',
  /**
   * 算出された2つ目の数字ボタン
   */
  SecondResultNumber = 'secondResult',
  /**
   * 回答
   */
  AnswerNumber = 'answer',
  /**
   * 「＋」ボタン
   */
  Plus = 'plus',
  /**
   * 「ー」ボタン
   */
  Minus = 'minus',
  /**
   * 「×」ボタン
   */
  Multiply = 'multiply',
  /**
   * 「÷」ボタン
   */
  Division = 'division',
}

/**
 * 数字ボタンと演算ボタンに動的に設定するスタイル
 * ※pxをつけること
 * @property {string} width - 幅
 * @property {string} height - 高さ
 * @property {string} lineHeight - 文字表示高さ
 * @property {string} top - 上からの表示位置
 * @property {string} left - 左からの表示位置
 * @property {string} backgroundColor - 色
 * @property {string} opacity - 透明度
 * @property {VisibilityInButtonStyle} visibility - 表示非表示
 */
export interface ButtonStyle {
	width: string,
	height: string,
	lineHeight: string,
  top: string,
	left: string,
  backgroundColor: string,
  opacity: string,
  visibility: VisibilityInButtonStyle,
}

/**
 * 数字と演算子ボタンの動的に設定するスタイル配列
 * @property {ButtonStyle} first - 1つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} second - 2つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} third - 3つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} fourth - 4つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} firstResult - 算出された1つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} secondResult - 算出された2つ目の数字ボタンに設定するスタイル
 * @property {ButtonStyle} answer - 回答
 * @property {ButtonStyle} plus - 「＋」ボタンに設定するスタイル
 * @property {ButtonStyle} minus - 「ー」ボタンに設定するスタイル
 * @property {ButtonStyle} multiply - 「×」ボタンに設定するスタイル
 * @property {ButtonStyle} division - 「÷」ボタンに設定するスタイル
 */
export interface NumberCalcButtonStyles {
  [ButtonType.FirstNumber]: ButtonStyle,
  [ButtonType.SecondNumber]: ButtonStyle,
  [ButtonType.ThirdNumber]: ButtonStyle,
  [ButtonType.FourthNumber]: ButtonStyle,
  [ButtonType.FirstResultNumber]: ButtonStyle,
  [ButtonType.SecondResultNumber]: ButtonStyle,
  [ButtonType.AnswerNumber]: ButtonStyle,
  [ButtonType.Plus]: ButtonStyle,
  [ButtonType.Minus]: ButtonStyle,
  [ButtonType.Multiply]: ButtonStyle,
  [ButtonType.Division]: ButtonStyle,
}

/**
 * ボタンエリアサイズ
 * @property {number} width - ボタンエリアの幅(px)
 * @property {number} height - ボタンエリアの高さ(px)
 */
export interface ButtonAreaSize {
  width: number;
  height: number;
}

/**
 * 数字ボタンと演算ボタンの表示非表示切り替え
 */
export enum VisibilityInButtonStyle {
  /**
   * 表示
   */
  Visible = 'unset',
  /**
   * 非表示
   */
  Hidden = 'hidden',
}