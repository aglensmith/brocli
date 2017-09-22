/**
 * @fileOverview Event listeners that listen and respond to Chrome events
 */


var currentLocation;


chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) {
        var url = new URL(details.url);
        var query = url.searchParams.get(searchParam);
        var cl = new URL(currentLocation);
        var splitText = query.split(' ');
        if (cl.origin != defaultSearch.origin && splitText[0] != 's')
            Executer.executeAll(query.split(' '));
    }, {url: [{urlContains: defaultSearchPath}]}
);


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(changeInfo['url'] && changeInfo['url']) {
        var url = new URL(changeInfo['url']);
        var cmdUrl = new URL(chrome.runtime.getURL('/_generated_background_page.html'));
        if (url.origin != cmdUrl.origin)
            currentLocation = changeInfo['url'];
        console.log('on updated: ' + currentLocation);
    }
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) { 
    var suggestions = [];
    var query = {currentWindow: true, active: true};
    var splitText = text.split(" ");
    sugParser.parse(splitText);
    chrome.omnibox.setDefaultSuggestion({description:'[site] (-pagetype) [id|entity]'});
    sugs.forEach(function(sug) {
        suggestions.push({content: sug, description: sug})
    });
    suggest(suggestions);
});


chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    var splitText = text.split(" ");
    Executer.executeAll(splitText);
});

chrome.commands.onCommand.addListener(function(command) {
    var splitText = command.split("_");
    runAcCommands(splitText);
    resetOptions();
});
