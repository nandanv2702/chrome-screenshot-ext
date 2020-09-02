"use strict";

console.log("conn on");

//This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({name:"mycontentscript"});
port.onMessage.addListener(function(message,sender){
  if(message.url){
    setScreenshotUrl(message);
  };
});

// sets the image as the image data we received
function setScreenshotUrl(message) {
  console.log("url is: " + message.url);
  document.getElementById('img-target').src = message.url;
  downloadFile(message);
};

function downloadFile(message){
  chrome.downloads.download({
    url: message.url,
    filename: 'some.png',
    saveAs: false
}, function (downloadId) {
    console.log(downloadId);
});
}
