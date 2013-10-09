chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if (message.get) {
    TrackDB.getTrack(message.get, sendResponse);
  } else if (message.complete) {
    TrackDB.completeTrack(message.complete, function(){
      if (message.finish) {
        TrackDB.getFirstIncomplete(function(next){
          sendResponse({"state":2,"next":next});
        });
      } else {
        sendResponse({"state":2});
      }
    });
  }
  return true;
});

