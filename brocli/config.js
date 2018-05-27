// This will become options page at some point
// Or, set values from storage/sync. 

var defaultCommandFolder = "BrocliCommands";

function findCommandFolderId (folder) {
    chrome.bookmarks.search(folder, function(res){
        chrome.storage.local.set({'brocliCommandFolderId': res[0].id}, function() {
            console.log("brocli: command folder found. Set to " + res[0].title + " ID " + res[0].id);
        });
    });
}


// if there's one set in stoage, get it; if not, search and set.
function setCommandFolder () {
    chrome.storage.local.get('brocliCommandFolderId', function (items) {
        if (items.brocliCommandFolderId < 1) {
            findCommandFolderId(defaultCommandFolder);
        }
    });
}

// chrome.bookmarks.getSubTree("734", function(res){console.log(res)});
// returns array of objects. Each object has children property. If child is a link
// it will have a url property. Recursively build a list of commands mapped to the url.
// and store in storage as a cache. 
function getBookmarkCommands () {

}

function getParams (urlString) {
    var url = new URL(urlString);
    var params = {};
    url.searchParams.forEach(function(k,v) {
        if (k && v) {
            params[k] = v;
        }
    });
    return params;
}

// for getting website field value
var zdDomain = 'https://americommerce.zendesk.com';

// default search -- for executing commands without keyword
var defaultSearch = new URL("https://www.google.com/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}");
var defaultSearchPath = defaultSearch.origin + defaultSearch.pathname;
var defaultSearchUrl = defaultSearch.href;
var searchParam = getParams(defaultSearch.href)['%s'];

setCommandFolder();
