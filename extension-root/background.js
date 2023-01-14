import { BacklogJumpMenu } from "./js/jump-menu.js";
import { SettingManager } from "./js/setting-manager.js";

/* インストール時のイベント */
chrome.runtime.onInstalled.addListener(async (details) => {
    //コンテキストメニューを全て消去
    chrome.contextMenus.removeAll();

    //保存済みベースURLを取得する。
    let settingManager = new SettingManager();
    let baseUrl = await settingManager.getLinkUrl();
    if(baseUrl != null && baseUrl != ""){
        //URLが保存されていたらメニューを作成する
        BacklogJumpMenu.createMenu();
    }
});

/* コンテキストメニューのイベント */
chrome.contextMenus.onClicked.addListener((info) => {
    if(info.menuItemId == BacklogJumpMenu.MenuKey){
        /* 選択中テキストをメニュークリック時の処理に渡す */
        BacklogJumpMenu.jumpToBacklog(info.selectionText);
    }
});