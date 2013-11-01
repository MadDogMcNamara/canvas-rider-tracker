function notifyComplete() {
  var span = document.getElementsByClassName("status")[0];
  span.className = "status status_completed";
  span.innerHTML = "COMPLETED";
  window.postMessage({ type: "COMPLETE" }, "*");
}

function notifyDeath() {

}

var deathCount = 0;

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

if (window.location.search == "?finish") {
  DQ();
}

if (C.BU == 0){
  notifyComplete();
}
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 13 || key == 8) { 
    // increment death count on backspace or enter (return to previous checkpoint and respawn)
    deathCount++;

    var span = document.getElementsByClassName("statistic_value")[0];
    span.innerHTML = "" + deathCount;
  }
}
var span = document.getElementsByClassName("statistic_value")[0];
span.innerHTML = "" + deathCount;