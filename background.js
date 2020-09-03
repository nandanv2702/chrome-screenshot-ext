let id = 1;

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
});

// listens to messages from the js file attached to the popup and then executes respective functions if it's a screenshot or screen capture (coming soon)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.msg == "screenshot"){
    captureTab();
  } else if(request.msg == "scrcapture"){
    // records the tab/window/anything you need
    recordTab();
  } else if(request.msg == "stop"){
    stopRec();
  };
});

function captureTab(){
  // captures the given tab
  chrome.tabs.captureVisibleTab((url) => {
    console.log("captured, id is: " + id);
    // set url of page where the capture will be shown
    const capture_url = chrome.extension.getURL(`capture.html?id=${id++}`);
    console.log(capture_url);
    let targetID = null;
    // create a tab to show the screenshot
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
      // gets all tabs currently open and then checks if the url is the same as the one we want to modify
      chrome.extension.getViews().map((view) => {
        console.log("location is: " + view.location.href);
        if (view.location.href === capture_url) {
          console.log("capture url is: " + capture_url);
          // once we have the url, we send the image data to the 'capture.js' file in the html page we created. The image will then be rendered on the html page
          chrome.runtime.onConnect.addListener(function(port){
            port.postMessage({url: url, id: id-1});
          });
          console.log("yes");
        };
      });
    });
    console.log("id is: " + id);
  });
};

let video = document.getElementById("video");

function recordTab(){
  let sources = ["screen", "tab", "window", "audio"];
  let constraints = {video: true};

  chrome.desktopCapture.chooseDesktopMedia(sources, async function(streamId){
    let captureStream = null;
    try {
      let stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      
      stream.getVideoTracks()[0].addEventListener('ended', (stream) => {
        console.log("user ended rec session");

        console.log(stream);

      //   chrome.downloads.download({
      //     url: stream,
      //     filename: 'video',
      //     saveAs: false
      // }, function (downloadId) {
      //     console.log(downloadId);
      // });
      });
    } catch(err) {
      console.log(err);
    }
    return captureStream;
    console.log("does this work?");
  });
};

function stopRec(){
  let tracks = video.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  video.srcObject = null;
  video.style.display = "none";
};
