
 function clip(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
}

function load() {
    chrome.storage.local.get('output', function (items) {
        var terminal = document.getElementById("terminal");
        terminal.innerHTML = items.output;
    });
}

var copyLink = document.getElementById("copy");

copyLink.onclick = function(){clip("terminal")};

load();
