/**
 * @fileOverview helpers
 */


function creatTab (url) {
    chrome.tabs.create({
        'url': url
    })
}

function urlOrigin (url) {
    try {
        var u = new URL(url);
        return u.origin;
    } catch (err) {
        return  false;
    }
}

function goTo (newUrl, newTab) {
    var query = {currentWindow: true, active: true};    
    chrome.tabs.query(query, function (results) {
        if (results.length > 0) {
            var tab = results[0];
            if (!urlOrigin(newUrl)) {
                newUrl = urlOrigin(tab.url) + newUrl;
            }
            if (newTab) {
                creatTab(newUrl);
            } else {
                chrome.tabs.update(tab.id, {url: newUrl});
            }
        } 
    }); 
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

