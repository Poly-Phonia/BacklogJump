//設定値を取得
chrome.storage.local.get(["linkUrl"]).then((data) => {
    if(data == null || data.linkUrl == null) return;
    document.getElementById("inpLinkUrl").value = data.linkUrl;
});

//ボタンクリックで設定値を保存する処理呼び出し
document.getElementById("btnSave").addEventListener("click", () =>{
    chrome.storage.local.set({
        "linkUrl": document.getElementById("inpLinkUrl").value
    }).then(() => {
        document.getElementById("spnResult").textContent = "保存しました。";
        document.getElementById("divResult").style.display = "block";
    });
});