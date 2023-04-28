import React from 'react';
import './Header.css';

import { Divider, IconButton } from '@mui/material';

/**
 * Headerコンポーネントのprops
 * @property {Function} openHowToPlayDialog - 遊び方ダイアログの表示
 * @property {boolean} isDevelopMode - 開発モード
 */
type Props = {
	openHowToPlayDialog: () => void;
	isDevelopMode: boolean;
}

/**
 * Headerコンポーネント
 * @param {Function} openHowToPlayDialog - 遊び方ダイアログの表示
 * @param {boolean} isDevelopMode - 開発モード
 * @returns Headerコンポーネント
 */
const Header = ({ openHowToPlayDialog, isDevelopMode }: Props): JSX.Element => {
	/**
	 * 遊び方ボタンクリックイベント
	 */
	const handleClickOpenHowToPlayDialogButton = () => {
		openHowToPlayDialog(); // 遊び方ダイアログを表示
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
						size="small"
						sx={{ color: '#469b98' }}
						onClick={handleClickOpenHowToPlayDialogButton}
					>?</IconButton>
					<IconButton size="small" sx={{ color: '#469b98' }}>W</IconButton>
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