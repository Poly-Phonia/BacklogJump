export class SettingManager{
    setLinkUrl(_url){
        return chrome.storage.local.set({
            "linkUrl": _url
        });
    }
    getLinkUrl(){
        return chrome.storage.local.get(["linkUrl"]).then((data) => {
            if(data == null || data.linkUrl == null){
                return null;
            }
            else{
                return data.linkUrl;
            }
        });
    }
}