import * as React from 'react';
import './HowToPlayDialog.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

/**
 * ダイアログ表示非表示アニメーション
 */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/**
 * HowToPlayDialogコンポーネントのprops
 * @property {boolean} isOpen - 遊び方ダイアログの表示フラグ
 * @property {boolean} isInitDisplay - 初期表示フラグ
 * @property {Function} closeHowToPlayDialog - 遊び方ダイアログの非表示
 * @property {Function} timerStart - 全問正解までのタイムの計測開始
 * @property {number} problemCount - 問題数
 */
type Props = {
	isOpen: boolean;
  isInitDisplay: boolean;
	closeHowToPlayDialog: () => void;
  timerStart: () => void;
  problemCount: number;
}

/**
 * HowToPlayDialogコンポーネント
 * @param {boolean} isOpen - 遊び方ダイアログの表示フラグ
 * @param {boolean} isInitDisplay - 初期表示フラグ
 * @param {Function} closeHowToPlayDialog - 遊び方ダイアログの非表示
 * @param {Function} timerStart - 全問正解までのタイムの計測開始
 * @param {number} problemCount - 問題数
 * @returns HowToPlayDialogコンポーネント
 */
const HowToPlayDialog = ({ isOpen, isInitDisplay, closeHowToPlayDialog, timerStart, problemCount }: Props): JSX.Element => {

  return (
    <>
      <Dialog
        open={isOpen}
				TransitionComponent={Transition}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          遊び方
          <IconButton
            id="close-how-to-play-dialog-button"
            size="large"
            sx={{ display: isInitDisplay ? 'none' : '' }}
            onClick={closeHowToPlayDialog} 
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent id="scroll-dialog-content" dividers={true}>
          <div className="bold-text large-text">Make10</div>とは4つの数字を組み合わせて10を作り出すゲーム。
          <br />
          全問正解までのタイムを競おう!!
          <br /><br />
          『 1 』→『 + 』→『 2 』の順番に選択すると、1 + 2 = 3 で『 3 』を作ることができます。
          <br /><br />
          <div className="example-round-button-area">
            <div className="example-round-button example-number-button">1</div>
            <div className="example-round-button example-calc-button">+</div>
            <div className="example-round-button example-number-button">2</div>
            <div className="example-round-button-arrow">→</div>
            <div className="example-round-button example-number-button">3</div>
          </div>
          <br />
          途中で最初から計算をやり直したい時は、画面下の<div className="example-reset-button">Reset</div>を押すことでやり直すことができます。
          <br /><br />
          もし途中でも答えが見たい時は、画面右上の<FlagOutlinedIcon sx={{ color: '#469b98', verticalAlign: 'middle', paddingBottom: '4px' }} />を押して、
          <div className="example-yes-button">はい</div> を選択することでリザルト画面から答えを見ることができます。
          <br />
          <div className="example-text-caution">※途中で答えを見た場合、その日のクリアタイムは表示されません。</div>
          <br /><br />
          問題数は<div className="bold-text">1日につき{problemCount}問</div>。
          画面下の<div className="example-start-button">START</div>ボタンを押してから、全問正解するまでのタイムを競います。
          全問正解するとリザルト画面からクリアタイムと問題の答えを確認できます。
          <br /><br />
          この遊び方は画面右上の<HelpOutlineOutlinedIcon sx={{ color: '#469b98', verticalAlign: 'middle', paddingBottom: '4px' }} />を押すことでいつでも確認することができます。
        </DialogContent>
        <DialogActions
          id="scroll-dialog-action"
          sx={{ display: isInitDisplay ? '' : 'none' }}
        >
          <Button
						color="primary"
						variant="contained"
						onClick={() => {
              closeHowToPlayDialog();
              timerStart();
            }}
            sx={{ width: '40%' }}
					>START</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HowToPlayDialog;