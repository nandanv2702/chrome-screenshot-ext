console.log('we on');


// waits for load and then sends message to 'background.js' about which button has been clicked
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('screenshot').addEventListener("click", () => {
    chrome.runtime.sendMessage({msg:"screenshot"});
  });
  document.getElementById('scrcapture').addEventListener("click", () => {
    chrome.runtime.sendMessage({msg:"scrcapture"});
  });

  document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({msg:"stoprec"});
  });
});
