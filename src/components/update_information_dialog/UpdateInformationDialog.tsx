import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './UpdateInformationDialog.css';

/**
 * UpdateInformationDialogコンポーネントのProps
 * @property {boolean} isOpen - アップデート情報ダイアログの表示フラグ
 * @property {Function} closeUpdateInformationDialog - アップデート情報ダイアログの非表示
 */
type Props = {
  isOpen: boolean;
  closeUpdateInformationDialog: () => void;
}

/**
 * UpdateInformationDialogコンポーネント
 * @param {boolean} isOpen - アップデート情報の表示フラグ
 * @param {Function} closeUpdateInformationDialog - アップデート情報ダイアログの非表示
 * @returns UpdateInformationDialogコンポーネント
 */
const UpdateInformationDialog = ({ isOpen, closeUpdateInformationDialog }: Props): JSX.Element => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeUpdateInformationDialog}
        aria-labelledby="update-information-dialog-title"
        aria-describedby="update-information-dialog-description"
      >
        <DialogTitle id="update-information-dialog-title">
          アップデート情報
          <IconButton
            id="close-update-information-dialog-button"
            size="large"
            onClick={closeUpdateInformationDialog} 
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="update-information-dialog-description">
            ・ゲームのスピード感をアップしました。<br />
            ・問題数を 5 → 7 に増やしました。<br />
            ・LINEで記録を共有できるようにしました。<br />
            ・軽微な不具合を修正しました。
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateInformationDialog;