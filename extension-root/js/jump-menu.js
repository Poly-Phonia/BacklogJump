import { SettingManager } from "./setting-manager.js";

/* Backlogに飛ぶメインのコンテキストメニューを処理するクラス */
export class BacklogJumpMenu{
    //プロジェクトキーはアルファベット大文字と数値とアンダーバーが有効
    static issuePtn = /^[_A-Z0-9]+-\d+$/;
    static MenuKey = "backlog-jump-menu";

    /* メニューを作成する */
    static createMenu(){
        chrome.contextMenus.create({
            "id": BacklogJumpMenu.MenuKey,
            "title": "Backlog Jump",
            "contexts": ["selection"]
          });
    };

    /* テキストを引き渡してBacklogへ移動 */
    static jumpToBacklog(_text){
        let manager = new SettingManager();
        var baseUrl = "";

        //URLを取得
        manager.getLinkUrl().then((url) => {
            if(url != null){
                baseUrl = url;
            }
        }).then(() => {
            //URLが空白だったら抜ける
            if(baseUrl == "") return;

            //選択中テキストの前後スペースは無視する
            let selectedText = _text.trim();

            if(selectedText.match(BacklogJumpMenu.issuePtn) != null){
                /* 課題キーパターンと一致した場合 */

                //課題へ移動
                var url = baseUrl + "/view/" + selectedText;
                //タブ作成時のオプション作成
                var tabOption = {
                    active: true,
                    url: url
                };
                chrome.tabs.create(tabOption);
            }
            else{
                /* 課題キーパターンと一致しない場合 */

                //キーワード検索へ移動
                var url = baseUrl + "/FindIssueAllOver.action?limit=20&offset=0&query=" + selectedText + "&sort=UPDATED&order=false&simpleSearch=false&allOver=true&startDate.unspecified=false&limitDate.unspecified=false";
                
                //タブ作成時のオプション作成
                var tabOption = {
                    active: true,
                    url: url
                };
                chrome.tabs.create(tabOption);
            }
        });

        
    }
}