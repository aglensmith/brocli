var input = document.getElementById("blocliInput");
var brocliOutput = document.getElementById("brocliOutput");

var buffer = [];
var bufferLimit = 100;
var up = 38;
var down = 40;
var index = 0;
var pos = 0;

function loadOutput() {
    chrome.storage.local.get('output', function (items) {
        brocliOutput.innerHTML = items.output;
    });
}

function loadBuffer() {
    chrome.storage.local.get('buffer', function (items) {
        if (items.buffer)
            buffer = items.buffer;
    });
}

function saveBuffer () {
    chrome.storage.local.set({'buffer': buffer.slice(0,bufferLimit)}, function() {
    });
}

function extensionPage(url) {
    return "chrome-extension://" + chrome.runtime.id + url
}

input.focus();
loadOutput();
loadBuffer();

input.addEventListener( 'keyup', function (e) {
    if ( e.keyCode == 13 ) {
        var commands = input.value;
        buffer.push(commands);
        chrome.runtime.sendMessage({commands: commands}, function(response) {
            loadOutput();
        });
        input.value = "";
        if (commands.toLowerCase() == "clear")
        {
            buffer = [];
            pos = 0;
        }
        saveBuffer();
    }
    if (e.keyCode == down) {
        pos += 1;
        pos = buffer[pos] ? pos : 0;
        if (buffer[pos])
            input.value = buffer[pos];
    }
    if (e.keyCode == up) {
        pos -= 1;
        pos = buffer[pos] ? pos : buffer.length - 1
        if (buffer[pos])
            input.value = buffer[pos];
    }
  });

  $("#settings").click(function(){
      chrome.tabs.create({'url': extensionPage("/options.html")});
  });