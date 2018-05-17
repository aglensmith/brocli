/**
 * @fileOverview Uses optparse.js to parse command switches
 */

var extensionId = chrome.runtime.id;

var options = {
    action: undefined,
    domain: undefined,
    newTab: false,
    path: undefined,
    paths: [],
    suggestions: []
};

var acSwitches = [
    ['-c', '--customer-edit [ID]', 'customer edit'],
    ['-cd', '--changedir [LOC]', 'change directories'],
    ['-ca', '--customer-audit [ID]', 'customer audit'],
    ['-cat', '--category-edit [ID]', 'category edit'],
    ['-catv', '--category-view [ID]', 'category view'],
    ['-cata', '--category-audit [ID]', 'category audit'],
    ['-cp', '--page-edit [ID]', 'edit content page'],
    ['-d', '--discount-edit [ID]', 'discount edit'],
    ['-eh', '--email-view [ID]', 'view email history'],
    ['-l','--list [ENTITY]', 'list entity'],
    ['-p','--product-edit [ID]', 'product edit'],
    ['-pa','--product-audit [ID]', 'product audit'],
    ['-o','--order-edit [ID]', 'order edit'],
    ['-oa','--order-audit [ID]', 'order audit'],
    ['-ov','--order-view [ID]', 'order view'],
    ['-vs','--view-session [ID]', 'view session'],
    ['-s','--settings [PAGE]', 'settings page'],
];

var acParser = new optparse.OptionParser(acSwitches);

acParser.on(0, function (value) {
    if (isUrl(value)) {
      options.domain = value;
    }else if (isUrl('https://'.concat(value))) {
        var cmdUrl = new URL(chrome.runtime.getURL('/_generated_background_page.html'));
        if (domain != cmdUrl.hostname) {
            options.domain = 'https://'.concat(value);
        }
    }
});

acParser.on('*', function (name, value) {
    options.action = name;
    options.entered = true;
    options.paths.extend(buildAcPaths(name, value));
});

/**
* General Web Switches and Parser
*/
var webSwitches = [
    ['-t','--new-tab', 'open in new tab'],
    ['-k', '--keyboard-shortcuts', 'view and configure all extension keyboard shortcusts'],
    ['-cs', '--custom-searches', 'configure chrome customer searches'],
    ['-pp', '--pretty-print [STRING]', 'pretty print a string of code'],
    ['-url', '--url-encode [STRING]', 'url encode a string'],
    ['-com', '--command [BOOKMARK]', 'url encode a string']
]

var webParser = new optparse.OptionParser(webSwitches);
webParser.on('new-tab', function (name) {
    options.newTab = true;
});

webParser.on(0, function (value) {
    chrome.bookmarks.search(value, function(results){
        console.log(results);
        results.forEach(function(res){
            if (res.title == value)
                goTo(res.url);         
        });
    });
});

webParser.on('*', function (name) {
    options.entered = true;
});

webParser.on('keyboard-shortcuts', function (name) {
    options.newTab = true;
    options.paths.push('chrome://extensions/configureCommands');
});

webParser.on('pretty-print', function (name, value) {
    chrome.storage.local.set({'output': formatXml(value)}, function() {
        window.open("chrome-extension://"+ extensionId +"/output.html");
    });
});

webParser.on('url-encode', function (name, value) {
    chrome.storage.local.set({'output': encodeURIComponent(value)}, function() {
        window.open("chrome-extension://"+ extensionId +"/output.html");
    });
});

webParser.on('command', function (name, value) {
    chrome.bookmarks.search(value, function(results){
        console.log(results);
        results.forEach(function(res){
            if (res.title == value)
                goTo(res.url);      
        });
    });
});

var sugs = [];
var allSwitches = acSwitches.concat(webSwitches);
var sugParser = new optparse.OptionParser(allSwitches);
sugParser.on('list', function (name, value) {
    sugs.push('-l products', '-l orders', '-l customers');
});

function isZD (url) {
    var zdRe = new RegExp('.zendesk.com');
    return zdRe.test(url);
}

function isTicket (url) {
    var ticketRe = new RegExp('/agent/tickets/');
    return ticketRe.test(url);
}

function goToFromZD() {
    var split = currentLocation.split('/agent/tickets/');
    var ticketID = split[split.length-1];
    var url = zdDomain.concat('/api/v2/tickets/', ticketID);
    getJson(url, function (data) {
        var fields = {};
        data.ticket.fields.forEach(function(i) {
            fields[i.id] = i.value;
        });
        var site = fields[21662133];
        if (isUrl(site)) {
        options.domain = site;
        }else if (isUrl('http://'.concat(site))) {
            options.domain = 'http://'.concat(site);
        }
        var domainPresent = options.domain || "";
        goToMany(domainPresent, options.paths);
    });
}

function Executer () {
    var array = [];
    array.executeAll = function(commands) {
        array.forEach(function (element) {
           if (typeof element == 'function') {
               element(commands);
           }
        });
    };
    return array;
};

function resetOptions () {
    options.newTab = false;
    options.paths = [];
    options.action = undefined;
    options.domain = undefined;
}

var Executer = Executer();

function runAcCommands (commands) {
    options.entered = false;
    acParser.parse(commands);
    webParser.parse(commands);
    if (isZD(currentLocation) && isTicket(currentLocation)) {
        goToFromZD();
    } else {
        var domainPresent = options.domain || "";
        goToMany(domainPresent, options.paths);
    }
}

Executer.push(runAcCommands);