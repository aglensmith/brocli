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
        
    //parse input
    var splitText = text.split(" ");
    var orderNum = splitText[1];

    //build urls
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+orderNum+'&ovw=1&ovn=0';

    console.log(SWITCHES);
    //execute commands
    if (splitText[0].toLowerCase() == 'order') {
        navCurrentDomain(orderUrl)
        console.log(orderUrl);
    }
});
