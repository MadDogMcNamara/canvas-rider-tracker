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

  getCompleteTracks: function(cb) {
    chrome.storage.local.get(null,function(res){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError());
        cb([]);
      } else {
        var tracks = [];
        for (var x in res) {
          if (res[x]) {
            tracks.push(x);
          }
        }
        if (cb) {
          cb(tracks);
        }
      }
    });
  },

  getIncompleteTracks: function(cb) {
    chrome.storage.local.get(null,function(res){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError());
        cb([]);
      } else {
        var tracks = [];
        for (var x in res) {
          if (!res[x]) {
            tracks.push(x);
          }
        }
        if (cb) {
          cb(tracks);
        }
      }
    });
  },

  getFirstIncomplete: function(cb) {
    chrome.storage.local.get(null,function(res){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError());
        cb(0);
      } else {
        var track = 0;
        for (var x in res) {
          if (!res[x]) {
            track = x;
            break;
          }
        }
        if (cb) {
          cb(track);
        }
      }
    });
  },

  loadTrackThumbnail: function(tracknum, cb) {
    var img = new Image();
    var loaded = false;

    img.src = "http://canvasrider.com/images/thumbnails/" + tracknum;
    img.onload = function() {
      if (!loaded) {
        loaded = true;
        cb(img);
      }
    };

    if (img.complete && !loaded) {
      loaded = true;
      cb(img);
    }
  },
};


