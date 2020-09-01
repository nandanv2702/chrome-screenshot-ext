"use strict";

console.log("conn on");

//This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({name:"mycontentscript"});
port.onMessage.addListener(function(message,sender){
  setScreenshotUrl(message.url);
});

// sets the image as the image data we received
function setScreenshotUrl(url) {
  console.log("url is: " + url);
  document.getElementById('img-target').src = url;
};
