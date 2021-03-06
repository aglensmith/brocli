/**
 * config.js -- Dynamic extension or configuration variables and objected defined and initialized here
 */

chrome.omnibox.setDefaultSuggestion({description: "<url><match>B ></match></url><dim> Enter <match>-h</match> to go to docs, <match>-cmds</match> for commands list, <match>-k</match> for keyboard shortcuts.</dim>"});

// for getting website field value
var zdDomain = 'https://americommerce.zendesk.com';

// Extension Specific Stuff
var extensionId = chrome.runtime.id;
var outputPageUrl = "chrome-extension://"+ extensionId +"/output.html";

// default search -- for executing commands without keyword
var defaultSearch = new URL("https://www.google.com/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}");

// used on events .js to filter
var defaultSearchPath = defaultSearch.origin + defaultSearch.pathname;
var defaultSearchUrl = defaultSearch.href;
var searchParam = getParams(defaultSearch.href)['%s'];

// links and folders in this folder used to create custom bookmark commands
var defaultCommandFolder = "BrocliCommands";
var brocliCommandFolderId;
var commandNode;
var executeFromAddressbar = false;

chrome.storage.local.get("executeFromAddressbar", function(items){
    executeFromAddressbar = items["executeFromAddressbar"];
});

// Bookmark Command Folder Helpers
function findSetCommandFolderId (folderTitle, callback) {
    chrome.bookmarks.search(folderTitle, function(res){
        if (res && res[0].id)
        {
            chrome.storage.local.set({'brocliCommandFolderId': res[0].id}, function() {
                console.log("brocli: command folder found. Set to " + res[0].title + " ID " + res[0].id);
                if (typeof callback === "function")
                    callback(res[0].id);
            });
        } else {
            console.log("brocli: command folder not set. Could not find folder with name " + folderTitle);
        }

    });
}

function getCommandNode (folderTitle, callback) {
    chrome.storage.local.get('brocliCommandFolderId', function (items) {
        if (!items.brocliCommandFolderId) {
            console.log("brocli: command folder not in storage. Searching for folder named " + folderTitle + "...");
            findSetCommandFolderId(folderTitle, callback);
        }
        else {
            if (typeof callback === "function")
                callback(items.brocliCommandFolderId);
        }
    });
}

function getBookmarkCommandUrl (commands, index, node) {
    if (node && node.url) {
        console.log("brocli: getBookmarkCommandUrl - " + node.url);
        return node.url;
    }
    if (node && commands && index >= 0) {
        var child = node.children.find(function(element){
            // returns element that matches to child var. Doesn't return this method.
            var elementTitle = element.title.toLowerCase().split(" ")[0];
            var commandTitle = commands[index].toLowerCase();
            return elementTitle == commandTitle;
        });
        return getBookmarkCommandUrl(commands, index+1, child);
    }
    else {
        console.log("brocli: getBookmarkCommandUrl - No URL Found");
    }
}

function suggestChildNodes(node) {
    node.children.forEach(child => {
        if (splitText[0].split(".")[0] == child.title) {
            child.children.forEach(subchild => {
                sugs.push({content: subchild.url+" ", description: "<url><match>"+child.title +"."+ subchild.title + "</match></url> - " + urlOrigin(subchild.url)});
            });
        }
    });
}

function refreshCommandNode () {
    getCommandNode(defaultCommandFolder, function(id){
        brocliCommandFolderId = id;
        chrome.bookmarks.getSubTree(brocliCommandFolderId, function(items){
            commandNode = items[0];
        });
    });
}

refreshCommandNode();