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
    var orderUrl = 'store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+orderNum+'&ovw=1&ovn=0';

    //execute commands
    if (splitText[0].toLowerCase() == 'order') {
         
        chrome.tabs.query(
            {
                currentWindow: true,    // currently focused window
                active: true            // selected tab
            },
            function (foundTabs) {
                if (foundTabs.length > 0) {
                    var url = foundTabs[0].url; // <--- this is what you are looking for
                    var loc = new URL(url);
                    var href = loc.href;
                    var navto = href + orderUrl;
                    chrome.tabs.create({"url": navto}); 
                } 
                else {
                    // there's no window or no selected tab
                }
            }
        );
    }
});
