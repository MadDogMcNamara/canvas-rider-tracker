function wrapTrack(img,tracknum,parent){
  var container = document.createElement("a");
  container.className = "imgContainer";
  container.style.backgroundImage = "url(" + img.src + ")";
  container.href = "http://canvasrider.com/tracks/" + tracknum;
  parent.appendChild(container);
}

TrackDB.getCompleteTracks(function(tracks){
  var div = document.getElementById("complete");
  for (var x in tracks) {
    (function(track){
      TrackDB.loadTrackThumbnail(track,function(img){
        wrapTrack(img,track,div);
      });
    })(tracks[x]);
  }
});

TrackDB.getIncompleteTracks(function(tracks){
  var div = document.getElementById("incomplete");
  for (var x in tracks) {
    (function(track){
      TrackDB.loadTrackThumbnail(track,function(img){
        wrapTrack(img,track,div);
      });
    })(tracks[x]);
  }
});
