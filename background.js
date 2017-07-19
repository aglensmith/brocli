
//Move these functions to a helpers.js file
function creatTab (url) {
    chrome.tabs.create({
        'url': url
    })
}

function urlOrigin (url) {
    var u = new URL(url);
    return u.origin;
}

function navCurrentDomain (relativePath) {
    var query = {currentWindow: true, active: true};
    chrome.tabs.query(query, function (results) {
        if (results.length > 0) {
            var activeTabOrigin = urlOrigin(results[0].url);
            creatTab(activeTabOrigin + relativePath)
        } 
    }); 
}

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    
    if (text.search('o') > -1) {
        var suggestions = [];

        suggestions.push({ content: 'order', description: 'Coffee - Wikipedia' });
        suggestions.push({ content: 'Starbucks Coffee', description: 'Starbucks Coffee' });

        suggest(suggestions);

    }
});

chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
        
    var splitText = text.split(" ");
    runCommands(splitText);

});
