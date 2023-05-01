import React from 'react';
import './Header.css';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Divider, IconButton } from '@mui/material';

/**
 * Headerコンポーネントのprops
 * @property {Function} openHowToPlayDialog - 遊び方ダイアログの表示
 * @property {Function} openSurrenderConfirmationDialog - 降参ダイアログの表示
 * @property {boolean} isOpenResultDisplay - 結果画面表示フラグ
 * @property {boolean} isDevelopMode - 開発モード
 */
type Props = {
	openHowToPlayDialog: () => void;
	openSurrenderConfirmationDialog: () => void;
	isOpenResultDisplay: boolean;
	isDevelopMode: boolean;
}

/**
 * Headerコンポーネント
 * @param {Function} openHowToPlayDialog - 遊び方ダイアログの表示
 * @param {Function} openSurrenderConfirmationDialog - 降参ダイアログの表示
 * @param {boolean} isOpenResultDisplay - 結果画面表示フラグ
 * @param {boolean} isDevelopMode - 開発モード
 * @returns Headerコンポーネント
 */
const Header = ({ openHowToPlayDialog, openSurrenderConfirmationDialog, isOpenResultDisplay, isDevelopMode }: Props): JSX.Element => {
	/**
	 * 遊び方ボタンクリックイベント
	 */
	const handleClickOpenHowToPlayDialogButton = () => {
		openHowToPlayDialog(); // 遊び方ダイアログを表示
	}

	/**
	 * 降参ボタンクリックイベント
	 */
	const handleClickSurrenderButton = () => {
		openSurrenderConfirmationDialog(); // 降参ダイアログを表示
	}

	/**
	 * ローカルストレージのクリア（開発者用）
	 */
	const handleClickClearLocalStorage = () => {
		localStorage.clear();
		console.log('[Develop] All Clear LocalStorage.');
	}

	return (
		<div id="app-header">
			<div id="header-core">
				<div id="app-title">Make10</div>
				<div id="header-buttons">
					<IconButton
						size="medium"
						sx={{ color: '#469b98' }}
						onClick={handleClickOpenHowToPlayDialogButton}
					>
						<HelpOutlineOutlinedIcon />
					</IconButton>
					<IconButton
						size="medium"
						sx={{ color: '#469b98' }}
						onClick={handleClickSurrenderButton}
						disabled={isOpenResultDisplay}
					>
						<FlagOutlinedIcon />
					</IconButton>
					<button
						style={{ display: (isDevelopMode ? 'unset' : 'none') }}
						onClick={handleClickClearLocalStorage}
					>
						Clear LocalStorage
					</button>
				</div>
			</div>
			<Divider sx={{ borderColor: '#469b98', marginTop: '8px' }} />
		</div>
	);
}

export default Header;