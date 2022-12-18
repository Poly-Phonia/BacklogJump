const issuePtn = /^[a-zA-Z]+-\d+$/
const issueMenuJumpKey = "issue-jump-menu";
let baseUrl = "";
let issueIdInContext = "";

//初期設定ここから
loadBaseUrl();

//初期設定ここまで

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      "id": issueMenuJumpKey,
      "title": "Backlog 課題へ移動",
      "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if(info.menuItemId == issueMenuJumpKey){
        //課題へ移動
        var url = baseUrl + "/view/" + issueIdInContext;
        //タブ作成時のオプション作成
        var tabOption = {
            active: true,
            openerTabId: tab.id,
            url: url
        };
        chrome.tabs.create(tabOption);
    }
    console.log(info);
    console.log(tab);
});

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse){
        //typeによって分岐
        if(message.type == undefined) {
            return;
        }

        if(message.type == "saveSettings"){
            //設定値が保存れた

            //再読込
            loadBaseUrl().then(() => {
                return;
            });
        }
        else if(message.type == "onselectionchange" || message.type == "oncontextmenu"){
            //選択文字列の変更

            //メニューの状態変更
            var option = {
                visible: baseUrl != "" && message.selectedText.match(issuePtn) != null
            };
            chrome.contextMenus.update(
                issueMenuJumpKey,
                option,
                function(){
                    issueIdInContext = message.selectedText;
                }
            );
            
        }

    }
);


//保存済みURLを取得する
async function loadBaseUrl(){
    await chrome.storage.local.get(["linkUrl"]).then((data) => {
        if(data == null || data.linkUrl == null) {
            baseUrl = "";
        }
        else {
            baseUrl = data.linkUrl;
        };
    });
}