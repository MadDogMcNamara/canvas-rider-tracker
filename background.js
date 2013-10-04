chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if (message.get) {
    TrackDB.getTrack(message.get, sendResponse);
  } else if (message.complete) {
    TrackDB.completeTrack(message.complete, function(){ sendResponse(2); });
  }
  return true;
});
