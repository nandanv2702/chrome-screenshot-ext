console.log('we on');

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('screenshot').addEventListener("click", () => {
    chrome.extension.sendRequest({msg:"screenshot"});
  });
});
