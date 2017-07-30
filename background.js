/**
 * @fileOverview Event listeners that listen and respond to Chrome events
 */
var activeTabOrigin = "";
chrome.omnibox.onInputChanged.addListener(function (text, suggest) { 
    var suggestions = [];
    var query = {currentWindow: true, active: true};
    
    chrome.tabs.query(query, function (results) {
        if (results.length > 0) {
            activeTabOrigin = urlOrigin(results[0].url);
            suggestions.push({ content: activeTabOrigin + " " + text, description: "Run Command: " + activeTabOrigin + " " + text});
            
            chrome.omnibox.setDefaultSuggestion({description:suggestions[0].description});
            // Remove the first suggestion from the array since we just suggested it
            
            suggest(suggestions);
        }
    });

    
    //if (text.search('o') > -1) {
        //var suggestions = [];
        //suggestions.push({ content: 'order', description: 'Coffee - Wikipedia' });
        //suggestions.push({ content: 'Starbucks Coffee', description: 'Starbucks Coffee' });
        //suggest(suggestions);
    //}
});

chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    var splitText = text.split(" ");
    runAcCommands(splitText);
    console.log('test3')
    console.log(options.domain);
    console.log(options.path);
});
