/**
 * @fileOverview helpers.js -- helper functions used throughout extension
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

function getParams (urlString) {
    var url = new URL(urlString);
    var params = {};
    url.searchParams.forEach(function(k,v) {
        if (k && v) {
            params[k] = v;
        }
    });
    return params;
}

function urlOrigin (url) {
    try {
        var u = new URL(url);
        return u.origin;
    } catch (err) {
        return  false;
    }
}

function extensionPage(url) {
    return "chrome-extension://" + chrome.runtime.id + url
}

function isBookmarklet (str) {
    return str.toLowerCase().split("javascript:").length > 1;
}

function creatTab (url) {
    if (isBookmarklet(url))
    {
        chrome.tabs.create({'url': url}, function(tab) {
            chrome.tabs.executeScript(tab.id, {code: url.toLowerCase().split("javascript:")[1]});
        });
    }
    else
    {
        chrome.tabs.create({'url': url});
    }
}

function isUrl (string) {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(expression);
    return regex.test(string);
}

function goTo (newUrl, newTab, value) {
    var query = {currentWindow: true, active: true};    
    chrome.tabs.query(query, function (results) {
        var tab = results[0];
        
        // hack for chrome adding file:// to relative bookmarks
        console.log('goTo: ' + currentLocation);
        newUrl = newUrl.replace('brocli.example.com', (new URL(currentLocation).hostname))


        // For input like 'o 123' replace %s in url with '123'
        if(value && value.split(' ').length > 1) {
            params = value.split(' ');
            params.forEach(function(p){
                if (params.indexOf(p) > 0) {
                    newUrl = newUrl.replace('broclistr', p)
                    newUrl = newUrl.replace('broclistr'.concat(params.indexOf(p)), p);
                    newUrl = newUrl.replace('%s', p);
                    newUrl = newUrl.replace('%s'.concat(params.indexOf(p)), p);
                    console.log(newUrl);
                }
            });
        }

        // newUrl = newUrl.replace('brocli.example.com', (new URL(currentLocation).hostname))

        //if newUrl is relative path, use active tab url
        // don't think works since chrome adds file:// to relative bookmarks
        if (!urlOrigin(newUrl)) {
            newUrl = urlOrigin(currentLocation) + newUrl;
        }
        if (newTab) {
            creatTab(newUrl);
        } else {
            if (isBookmarklet(newUrl))
            {
                chrome.tabs.executeScript(tab.id, {code: newUrl.toLowerCase().split("javascript:")[1]});
            }
            else {
                chrome.tabs.update(tab.id, {url: newUrl});
            }

        }
    }); 
}

function goToMany(domain, paths) {
    paths.forEach(function(path){
        var url = domain + path;
        if (path.indexOf('/Store/Adminundefined') == -1)
        {
            goTo(url, options.newTab);
            options.newTab = true;
        }
        else {
            console.log("Brocli: Invalid Command Entered. Cannot go to " + path);
        }
    });
    resetOptions();
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
