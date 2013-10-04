/*
  TrackDB Format:

    chrome.storage.local:
      {
        "<tracknum>" : <date completed>,
        ...
      }
*/

TrackDB = {

  getTrack: function(tracknum,cb) {
    var key = tracknum + "";
    chrome.storage.local.get(key,function(res){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError());
        cb(0);
      } else {
        if (key in res) {
          if (res[key]) {
            cb(2);
          } else {
            cb(1);
          }
        } else {
          var obj = {};
          obj[key] = null;
          chrome.storage.local.set(obj, function(){
            if (chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError());
              cb(0);
            } else {
              cb(0);
            }
          });
        }
      }
    });
  },

  completeTrack: function(tracknum,cb) {
    var key = tracknum + "";
    var obj = {};
    obj[key] = new Date();
    chrome.storage.local.set(obj,function(){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError());
      }
      cb();
    });
  },
};
