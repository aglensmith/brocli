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
function suggestChildNodes(node, suggestions, commands, ancesterTitle){
    
    // if we're missing something, return empty array
    if (!node || !node.children || !suggestions || !commands)
    {
        return [];
    }
    
    // don't add command node to command name
    if (node.title != commandNode.title)
        ancesterTitle = ancesterTitle.concat(node.title + ".");

    node.children.forEach(child => {
        console.log(commands[0].split(".")[0] + " == " + child.title.toLowerCase())
        if (commands[0].split(".")[0] == node.title.toLowerCase()) {
            var childUrl = urlOrigin(child.url);
            if (!childUrl) {
               childUrl =  "chrome://bookmarks/?id=" + child.id;
               child.url = childUrl;
            }
            suggestions.push({content: child.url+" ", description: "<url><match>"+ ancesterTitle + child.title + "</match></url> - " + childUrl});
        }
  
        suggestChildNodes(child, suggestions, commands, ancesterTitle);
    });

    return suggestions;
}

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    var suggestions = [];
    var splitText = text.split(" ");

    // get the bookmark command suggestions
    var bookmarkCommandSuggestions = suggestChildNodes(commandNode, suggestions, splitText, "");
    bookmarkCommandSuggestions.forEach(function(s){
        suggestions.push(s);
    });

    // get the switch suggestions
    allSwitches.forEach(function(s){
        if (s[1].indexOf(splitText[0]) != -1)
        {
            suggestions.push({content: s[0] + " ", description: "<url><match>" + s[1] + "</match></url> or " + s[2]});
        }
    });


    // suggest    
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