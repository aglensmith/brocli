var webPaths = {
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

function buildWebPaths (name, val) {
    var paths = [];
    name.split(",").forEach(cmd => {
        switch(cmd) {
            case "bookmark-commands":
                paths.push(webPaths[cmd] + commandFolderId.toString());
                break;
            case "url-encode":
                chrome.storage.local.set({'output': encodeURIComponent(val)});
                paths.push(webPaths[cmd].split("%s").join(extensionId));
                break;
            case "pretty-print":
                chrome.storage.local.set({'output': formatXml(val)});
                paths.push(webPaths[cmd].split("%s").join(extensionId));
                break;
            case "settings":
                paths.push(webPaths[cmd] + extensionId);
                break;
            case "options":
                paths.push(webPaths[cmd].split("%s").join(extensionId));
                break;
            default:
                if (webPaths[cmd])
                    paths.push(webPaths[cmd])
                break;
        }
    });
    return paths;
}