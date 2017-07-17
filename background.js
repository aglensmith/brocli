function creatTab(url){
    chrome.tabs.create({
        'url': url
    })
}

function urlToHref (url) {
    var u = new URL(url);
    return u.origin;
}

function getActiveTabUrl (){

    var activeTabUrl;
    var query = {currentWindow: true, active: true};
    chrome.tabs.query(query, function (foundTabs) {
            if (foundTabs.length > 0) {
                console.log('found tab: ' + foundTabs[0].url);
                activeTabUrl = foundTabs[0].url; // <--- this is what you are looking for
                console.log('active tab: ' + activeTabUrl);
            } 
            else {
                // there's no window or no selected tab
            }
        }
    ); 
    console.log('outer active tab: ' + activeTabUrl);
    return activeTabUrl;
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

    //execute commands
    if (splitText[0].toLowerCase() == 'order') {

        var activeUrl = getActiveTabUrl();
        console.log('listener active tab: ' + activeUrl)
        var href = urlToHref(activeUrl);
        var navto = href + orderUrl;
        creatTab(href);

    }
});
