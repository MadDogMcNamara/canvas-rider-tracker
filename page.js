var track = 0;

function inject(script) {
  var s = document.createElement("script");
  s.src = chrome.extension.getURL(script);
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);
}

var finish = window.location.search == "?finish";

var span = document.createElement("span");
span.className = "status";
document.body.appendChild(span);

var statisticsSpan = document.createElement("span");
statisticsSpan.className = "statistics";
document.body.appendChild(statisticsSpan);

var deathsSpan = document.createElement("span");
$(deathsSpan).addClass("statistic_key").text("deaths:");

var deathsSpanValue = document.createElement("span");
$(deathsSpanValue).addClass("statistic_value").text("");

statisticsSpan.appendChild(deathsSpan);
statisticsSpan.appendChild(deathsSpanValue);

var href = $("span.green").next().attr("href");
track = parseInt(href.split("/")[1]);

chrome.runtime.sendMessage({"get":track},function(res) {
  if (res == 0) {
    $(span).addClass("status_new").text("NEW");
  } else if (res == 1) {
    $(span).addClass("status_played").text("PLAYED");
  } else {
    $(span).addClass("status_completed").text("COMPLETED");
  }
  $(span).click(function(){
    if (statisticsSpan.style.visibility == 'hidden') {
      statisticsSpan.style.visibility = 'visible';   
    }
    else {
      statisticsSpan.style.visibility = 'hidden';
    }
  });

  statisticsSpan.style.visibility = 'visible';
});

$(document).ready(function(){
  inject("inject.js");
});

window.addEventListener("message", function(event){
  var data = event.data;
  if (data.type && data.type == "COMPLETE") {
    chrome.runtime.sendMessage({"complete":track,"finish":finish},function(response){
      if (finish && response.next && response.next != 0) {
        window.location = "http://canvasrider.com/tracks/" + response.next + "?finish";
      }
    });
  }
}, false);

