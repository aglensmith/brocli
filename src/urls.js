var utilityPaths = {
    "bookmark-commands": 'chrome://bookmarks/?id=',
    "keyboard-shortcuts": 'chrome://extensions/configureCommands',
    "pretty-print": "chrome-extension://%s/output.html",
    "url-encode": "chrome-extension://%s/output.html",
    "help": "https://github.com/aglensmith/brocli",
    "documentation": "https://github.com/aglensmith/brocli",
    "extensions": "chrome://extensions/",
    "options": "chrome-extension://%s/options.html",
    "settings": "chrome://extensions/?id="
}

function buildUtilityPaths (name, val) {
    var paths = [];
    name.split(",").forEach(cmd => {
        switch(cmd) {
            case "bookmark-commands":
                paths.push(utilityPaths[cmd] + brocliCommandFolderId.toString());
                break;
            case "url-encode":
                chrome.storage.local.set({'output': encodeURIComponent(val)});
                paths.push(utilityPaths[cmd].split("%s").join(extensionId));
                break;
            case "pretty-print":
                chrome.storage.local.set({'output': formatXml(val)});
                paths.push(utilityPaths[cmd].split("%s").join(extensionId));
                break;
            case "settings":
                paths.push(utilityPaths[cmd] + extensionId);
                break;
            case "options":
                paths.push(utilityPaths[cmd].split("%s").join(extensionId));
                break;
            default:
                if (utilityPaths[cmd])
                    paths.push(utilityPaths[cmd])
                break;
        }
    });
    return paths;
}