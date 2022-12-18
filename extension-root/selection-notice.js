document.oncontextmenu  = () => {
    var messagePromise = chrome.runtime.sendMessage(null,{
        type: "oncontextmenu",
        selectedText: document.getSelection().toString()
    });
    messagePromise.then((response) => {
        //console.log(response);
    });
}