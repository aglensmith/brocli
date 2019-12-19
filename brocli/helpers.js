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

function goTo (newUrl, newTab) {
    var query = {currentWindow: true, active: true};    
    chrome.tabs.query(query, function (results) {
        var tab = results[0];
        //if newUrl is relative path, use active tab url
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

function isZD (url) {
    var zdRe = new RegExp('.zendesk.com');
    return zdRe.test(url);
}

function isTicket (url) {
    var ticketRe = new RegExp('/agent/tickets/');
    return ticketRe.test(url);
}

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.toString().replace(reg, '$1\r\n$2$3');
    var pad = 0;
    var nodes = xml.split('\r\n');
    for(var n in nodes) {
      if (typeof nodes[n] != "string")
        continue;
      var node = nodes[n];
      var indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
    
      var padding = '';
      for (var i = 0; i < pad; i++) {
        padding += '  ';
      }
    
      formatted += padding + node + '\r\n';
      pad += indent;
    }
    return formatted.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;');
  }
