/**
 * @fileOverview Event listeners that listen and respond to Chrome events
 */

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
    runAcCommands(splitText);
    resetOptions();
});

chrome.commands.onCommand.addListener(function(command) {
    var splitText = command.split("_");
    runAcCommands(splitText);
    resetOptions();
});
