Bn.prototype.oldDC = Bn.prototype.DC;
Bn.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    TrackDB.completeTrack(C.ID);
    //$("span.status").addClass("status_completed").text("COMPLETED");
  }
  this.oldDC();
};

Bk.prototype.oldDC = Bk.prototype.DC;
Bk.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    TrackDB.completeTrack(C.ID);
    //$("span.status").addClass("status_completed").text("COMPLETED");
  }
  this.oldDC();
};
