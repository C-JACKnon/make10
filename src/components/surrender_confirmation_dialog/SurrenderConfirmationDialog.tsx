import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * SurrenderConfirmationDialogコンポーネントのProps
 * @property {boolean} isOpen - 降参ダイアログの表示フラグ
 * @property {Function} closeSurrenderConfirmationDialog - 降参ダイアログの非表示
 * @property {Function} openResultDisplay - 結果画面の表示
 */
type Props = {
  isOpen: boolean;
  closeSurrenderConfirmationDialog: () => void;
  openResultDisplay: () => void;
}

/**
 * SurrenderConfirmationDialogコンポーネント
 * @param {boolean} isOpen - 降参ダイアログの表示フラグ
 * @param {Function} closeSurrenderConfirmationDialog - 降参ダイアログの非表示
 * @param {Function} openResultDisplay - 結果の表示
 * @returns SurrenderConfirmationDialogコンポーネント
 */
const SurrenderConfirmationDialog = ({ isOpen, closeSurrenderConfirmationDialog, openResultDisplay }: Props): JSX.Element => {
  const buttonStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '5px 30px',

  }
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeSurrenderConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'答えを見ますか？'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            「はい」を選択すると解答が表示され、<br />
            本日の問題は遊べなくなりますがよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={openResultDisplay}
            sx={buttonStyle}
          >
            はい
          </Button>
          <Button
            color="primary"
            onClick={closeSurrenderConfirmationDialog}
            autoFocus
            sx={buttonStyle}
          >
            戻る
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SurrenderConfirmationDialog;