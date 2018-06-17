/**
 * config.js -- Dynamic extension or configuration variables and objected defined and initialized here
 */

chrome.omnibox.setDefaultSuggestion({description: "<url><match>Welcome to Brocli!</match></url><dim> - Enter <match>-h</match> to go to docs. Enter <match>-cmds</match> to see a list of commands. Enter <match>-k</match> to set keyboard shortcuts.</dim>"});

// for getting website field value
var zdDomain = 'https://americommerce.zendesk.com';

// Extension Specific Stuff
var extensionId = chrome.runtime.id;
var outputPageUrl = "chrome-extension://"+ extensionId +"/output.html";

// default search -- for executing commands without keyword
var defaultSearch = new URL("https://www.google.com/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}");
var defaultSearchPath = defaultSearch.origin + defaultSearch.pathname;
var defaultSearchUrl = defaultSearch.href;
var searchParam = getParams(defaultSearch.href)['%s'];

// links and folders in this folder used to create custom bookmark commands
var defaultCommandFolder = "BrocliCommands";
var commandFolderId;
var commandNode;


// Bookmark Command Folder Helpers
function findSetCommandFolderId (folderTitle, callback) {
    chrome.bookmarks.search(folderTitle, function(res){
        if (res[0].id)
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
    else if (node && commands) {
        var child = node.children.find(function(element){
            return element.title.toLowerCase() == commands[index].toLowerCase();
        });
        return getBookmarkCommandUrl(commands, index+1, child);
    }
    else {
        console.log("brocli: getBookmarkCommandUrl - No URL Found");
    }
}

function refreshCommandNode () {
    getCommandNode(defaultCommandFolder, function(id){
        commandFolderId = id;
        chrome.bookmarks.getSubTree(commandFolderId, function(items){
            commandNode = items[0];
        });
    });
}

refreshCommandNode();