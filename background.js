let id = 001;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.captureVisibleTab((url) => {
    console.log("captured, id is: " + id);
    chrome.windows.create({url: `capture.html?id=${id++}`, type:"normal"});
    console.log("id is: " + id)
  })
})
