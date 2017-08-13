/**
 * @fileOverview helpers
 */


Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);    
}


function urlOrigin (url) {
    try {
        var u = new URL(url);
        return u.origin;
    } catch (err) {
        return  false;
    }
}

function creatTab (url) {
    chrome.tabs.create({
        'url': url
    })
}

function goTo (newUrl, newTab) {
    var query = {currentWindow: true, active: true};    
    chrome.tabs.query(query, function (results) {
        var tab = results[0];
        if (!urlOrigin(newUrl)) {
            newUrl = urlOrigin(tab.url) + newUrl;
        }
        if (newTab) {
            creatTab(newUrl);
        } else {
            chrome.tabs.update(tab.id, {url: newUrl});
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

