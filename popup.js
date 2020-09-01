console.log('we on');


// waits for load and then sends message to 'background.js' about which button has been clicked
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('screenshot').addEventListener("click", () => {
    chrome.extension.sendRequest({msg:"screenshot"});
  });
  document.getElementById('scrcapture').addEventListener("click", () => {
    chrome.extension.sendRequest({msg:"scrcapture"});
  });
});
