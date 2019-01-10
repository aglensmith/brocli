/**
 * @fileOverview - Event listeners that listen and respond to Chrome events
 */


var currentLocation;

/**
 * Commands Entered
 */

// omnibar
chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    var splitText = text.split(" ");
    Executer.executeAll(splitText);
});

// popup terminal
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        Executer.executeAll(request.commands.split(" "));
});

// directly from addressbar
chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) {
        if (!executeFromAddressbar)
            return
            
        var url = new URL(details.url);
        var query = url.searchParams.get(searchParam);
        var cl = new URL(currentLocation);
        var splitText = query.split(' ');
        if (cl.origin != defaultSearch.origin && splitText[0] != 's')
        {
            Executer.executeAll(query.split(' '));
        }
    }, {url: [{urlContains: defaultSearchPath}]}
);

// keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
    var splitText = command.split("_");
    runAcCommands(splitText);
    resetOptions();
});


/**
 * Tab Events
 */
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        currentLocation = tab.url;
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo['url']) {
        currentLocation = changeInfo['url'];
    }
});


/**
 * Ombibar
 */
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    var sugs = [];
    var suggestions = [];
    var splitText = text.split(" ");
    allSwitches.forEach(function(s){
        if (s[1].indexOf(splitText[0]) != -1)
        {
            sugs.push({content: s[0] + " ", description: "<url><match>" + s[1] + "</match></url> or " + s[2]});
        }
    });
    
    commandNode.children.forEach(child => {
        if (splitText[0].split(".")[0] == child.title) {
            child.children.forEach(subchild => {
                sugs.push({content: subchild.url+" ", description: "<url><match>"+child.title +"."+ subchild.title + "</match></url> - " + urlOrigin(subchild.url)});
            });
        }
    });

    sugs.forEach(function(s){suggestions.push(s)});
    suggest(suggestions);
});


/**
 * Bookmarks
 */
chrome.bookmarks.onCreated.addListener(function (id, node) {
    refreshCommandNode();
});
chrome.bookmarks.onChanged.addListener(function (id, node) {
    refreshCommandNode();
});
chrome.bookmarks.onRemoved.addListener(function (id, node) {
    refreshCommandNode();
});
chrome.bookmarks.onMoved.addListener(function (id, node) {
    refreshCommandNode();
});