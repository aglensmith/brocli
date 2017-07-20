
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
