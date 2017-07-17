chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    
    if (text.search('o') > -1) {
        var suggestions = [];

        suggestions.push({ content: 'order', description: 'Coffee - Wikipedia' });
        suggestions.push({ content: 'Starbucks Coffee', description: 'Starbucks Coffee' });

        suggest(suggestions);

    }
});

chrome.omnibox.onInputEntered.addListener(function(text, disposition) {

    chrome.tabs.create({"url": text});
});
