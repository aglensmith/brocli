/**
 * @fileOverview Event listeners that listen and respond to Chrome events
 */


var activeTabOrigin = "";
chrome.omnibox.onInputChanged.addListener(function (text, suggest) { 
    var suggestions = [];
    var query = {currentWindow: true, active: true};
    var splitText = text.split(" ");
    acParser.parse(splitText);
    chrome.omnibox.setDefaultSuggestion({description:'[site] (-pagetype) [id|entity]'});
    options.suggestions.forEach(function(sug) {
        suggestions.push({content: sug, description: sug})
    });
    suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    var splitText = text.split(" ");
    runAcCommands(splitText);
    resetOptions();
});
