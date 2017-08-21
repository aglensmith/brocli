/**
 * @fileOverview helpers
 */



function getJson (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function(data) {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText);
            if(typeof callback == "function")
            callback(data);
        } else {
        // We reached our target server, but it returned an error
        }
    };
    request.onerror = function() {
    // There was a connection error of some sort
    };
    request.send();
}


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
        //if newUrl is relative path, use active tab url
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

