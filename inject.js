function notifyComplete() {
  var span = document.getElementsByClassName("status")[0];
  span.className = "status status_completed";
  span.innerHTML = "COMPLETED";
  window.postMessage({ type: "COMPLETE" }, "*");
}

Bn.prototype.oldDC = Bn.prototype.DC;
Bn.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    notifyComplete();
  }
  this.oldDC();
};

Bk.prototype.oldDC = Bk.prototype.DC;
Bk.prototype.DC = function() {
  if (C.BU && C.Be == C.BU) {
    notifyComplete();
  }
  this.oldDC();
};

(function(oldAlert){
  alert = function(x) {
    if (x != "Track complete!") {
      oldAlert(x);
    }
  }
})(alert);

