var saveButton = "saveButton";

function loadSetting(key) {
    chrome.storage.sync.get(key, function (items, key) {
        console.log("Loading " + key + " with value " + items[key]);
        var el = document.getElementById(key);
        if (items[key] && el.type == "text")
            el.value = items[key];
        if (items[key] && el.type == "checkbox")
            el.checked = items[key];
    });
};

 
 function saveSetting (key) {
    var el = document.getElementById(key);
    var value = "fuck";
    if (el.type == "text")
        value = el.value;
    if (el.type == "checkbox")
        value = el.checked;
    chrome.storage.sync.set({key: value}, function() {
        console.log("Saving " + key + " with value " + value);
        
    });
};

function init () {
    loadSetting("executeFromAddressbar");
    loadSetting("defaultSearchUrl");
    loadSetting("commandFolderPath");
    var sb = document.getElementById(saveButton);
    sb.addEventListener('click', function(e){
        saveSetting("executeFromAddressbar");
        saveSetting("defaultSearchUrl");
        saveSetting("commandFolderPath");
        e.preventDefault();
    });
}

init();