/**
 * @fileOverview Event listeners that listen and respond to Chrome events
 */


var currentLocation;

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

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    console.log("input changed");
    var sugs = [];
    var suggestions = [];
    var splitText = text.split(" ");
    allSwitches.forEach(function(s){
        if (s[0].indexOf(splitText[0]) != -1)
        {
            sugs.push({content: s[0] + " ", description: s[2]});
        }
    });
    sugs.forEach(function(s){suggestions.push(s)});
    suggest(suggestions);
});

// executeAll
chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) {
        console.log("brocli: Begin onBeforeNavigation - " + details);
        var url = new URL(details.url);
        var query = url.searchParams.get(searchParam);
        var cl = new URL(currentLocation);
        var splitText = query.split(' ');
        console.log("brocli: onBeforeWebNavigation query - " + query);
        if (cl.origin != defaultSearch.origin && splitText[0] != 's')
        {
            console.log("brocli: onBeforeWebNavigation executeAll " + query + " split on space");
            Executer.executeAll(query.split(' '));
        }
        console.log("brocli: End onBeforeNavigation");
    }, {url: [{urlContains: defaultSearchPath}]}
);


// executeAll
chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    console.log("brocli: Begin onInputEntered - " + text);
    var splitText = text.split(" ");
    console.log("brocli: onInputEntered executeAll - " + text + " split on space");
    Executer.executeAll(splitText);
    console.log("brocli: End onInputEntered");
});

// runAcCommands
chrome.commands.onCommand.addListener(function(command) {
    var splitText = command.split("_");
    runAcCommands(splitText);
    resetOptions();
});

// Refresh the commandNode when bookmarks change
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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        Executer.executeAll(request.commands.split(" "));
    console.log('message received')
});
