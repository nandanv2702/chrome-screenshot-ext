let id = 1;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.captureVisibleTab((url) => {
    console.log("captured, id is: " + id);
    const capture_url = chrome.extension.getURL(`capture.html?id=${id++}`);
    console.log(capture_url);
    let targetID = null;
    chrome.tabs.create({
      url: capture_url
    }, tab => {
      targetID = tab.id;
      console.log("targetID in bg is: " + targetID);
    });
    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetID || changedProps.status != "complete") {
        chrome.tabs.onUpdated.removeListener(listener);
      };
      chrome.extension.getViews().map((view) => {
        console.log("location is: " + view.location.href);
        if (view.location.href === capture_url) {
          console.log("capture url is: " + capture_url);
          chrome.runtime.onConnect.addListener(function(port){
            port.postMessage({url: url});
          });
          console.log("yes");
        };
      });
    });
    console.log("id is: " + id);
  });
});
