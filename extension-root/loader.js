(async() => {
    const src = chrome.runtime.getURL("contents.js");
    const contentMain = await import(src);
})();