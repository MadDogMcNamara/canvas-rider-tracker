Bn.prototype.oldDC = Bn.prototype.DC;
Bn.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    TrackDB.completeTrack(C.ID);
    var span = document.getElementsByClassName("status")[0];
    span.className = "status status_completed";
    span.innerHTML = "COMPLETED";
  }
  this.oldDC();
};

Bk.prototype.oldDC = Bk.prototype.DC;
Bk.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    TrackDB.completeTrack(C.ID);
    var span = document.getElementsByClassName("status")[0];
    span.className = "status status_completed";
    span.innerHTML = "COMPLETED";
  }
  this.oldDC();
};
