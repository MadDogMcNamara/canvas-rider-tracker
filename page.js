var track = 0;

function inject(script) {
  var s = document.createElement("script");
  s.src = chrome.extension.getURL(script);
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);
}

$(document).ready(function(){
  var span = document.createElement("span");
  span.className = "status";
  document.body.appendChild(span);

  var href = $("span.green").next().attr("href");
  track = parseInt(href.split("/")[1]);

  TrackDB.getTrack(track,function(res){
    if (res == 0) {
      $("span.status").addClass("status_new").text("NEW");
    } else if (res == 1) {
      $("span.status").addClass("status_played").text("PLAYED");
    } else {
      $("span.status").addClass("status_completed").text("COMPLETED");
    }
  });

  inject("trackdb.js");
  inject("inject.js");
});

