var track = 0;

function inject(script) {
  var s = document.createElement("script");
  s.src = chrome.extension.getURL(script);
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);
}

var span = document.createElement("span");
span.className = "status";
document.body.appendChild(span);

var href = $("span.green").next().attr("href");
track = parseInt(href.split("/")[1]);

chrome.runtime.sendMessage({"get":track},function(res){
  if (res == 0) {
    $(span).addClass("status_new").text("NEW");
  } else if (res == 1) {
    $(span).addClass("status_played").text("PLAYED");
  } else {
    $(span).addClass("status_completed").text("COMPLETED");
  }
});

$(document).ready(function(){
  inject("inject.js");
});

window.addEventListener("message", function(event){
  var data = event.data;
  if (data.type && data.type == "COMPLETE") {
    chrome.runtime.sendMessage({"complete":track},function(response){
      // TODO: do something?
    });
  }
}, false);
