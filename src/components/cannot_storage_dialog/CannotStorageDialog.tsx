import * as React from 'react';
import './CannotStorageDialog.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * CannotStorageDialogコンポーネントのprops
 * @property {boolean} isOpen - 遊び方ダイアログの表示フラグ
 */
type Props = {
	isOpen: boolean;
}

/**
 * CannotStorageDialogコンポーネント
 * @param {boolean} isOpen - 遊び方ダイアログの表示フラグ
 * @returns CannotStorageDialogコンポーネント
 */
const CannotStorageDialog = ({ isOpen }: Props): JSX.Element => {

  return (
    <>
      <Dialog
        open={isOpen}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <CancelIcon sx={{ color: '#db0000', verticalAlign: 'middle', paddingBottom: '4px', paddingRight: '4px' }} />
          ゲームをプレイできません
        </DialogTitle>
        <DialogContent id="scroll-dialog-content" dividers={true}>
          開いているブラウザではゲームをプレイすることができません。<br />
          キャッシュを使用可能に設定するか、別のブラウザを使用してください。
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CannotStorageDialog;