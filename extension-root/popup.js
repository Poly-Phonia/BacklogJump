import { SettingManager } from "./js/setting-manager.js";
import { BacklogJumpMenu } from "./js/jump-menu.js";

const settingManager = new SettingManager();

//設定値を取得
settingManager.getLinkUrl().then((url) => {
    if(url == null || url == "") return;
    document.getElementById("inpLinkUrl").value = url;
});

//ボタンクリックで設定値を保存する処理呼び出し
document.getElementById("btnSave").addEventListener("click", () =>{
    settingManager.setLinkUrl(document.getElementById("inpLinkUrl").value).then(() => {
        settingManager.getLinkUrl().then((url) => {
            //作成済みのメニューを削除する
            chrome.contextMenus.removeAll();

            if(url != null && url != ""){
                //URLが保存されていたらメニューを作成する
                BacklogJumpMenu.createMenu();
            }
        }).then(() => {
            document.getElementById("spnResult").textContent = "保存しました。";
            document.getElementById("divResult").style.display = "block";
        });
    });
});

//マニフェストからバージョンを取得して表示
var manifest = "manifest.json";
fetch(manifest).then(response => response.json())
               .then(json => {
                document.getElementById("version-label").innerText = json.version;
               });