/**
 * @fileOverview - 
 */


var options = {
    action: undefined,
    domain: undefined,
    newTab: false,
    path: undefined,
    paths: [],
    suggestions: []
};

var acSwitches = [
    ['-c', '--customer-edit [ID]', '<url><match>-c [id]</match></url><dim> - Go to customer edit. <match>Ex: -c 1298</match></dim>'],
    ['-cd', '--changedir [LOC]',  '<url><match>-cd [loc]</match></url><dim> - Change directory. <match>Ex: -cd ???</match></dim>'],
    ['-ca', '--customer-audit [ID]', '<url><match>-ca [id]</match></url><dim> - Go to customer audit history. <match>Ex: -ca 1298</match></dim>'],
    ['-cat', '--category-edit [ID]', '<url><match>-cat [id]</match></url><dim> - Go to category edit. <match>Ex: -cat 1298</match></dim>'],
    ['-catv', '--category-view [ID]', '<url><match>-catv [id]</match></url><dim> - Go to category view. <match>Ex: -catv 1298</match></dim>'],
    ['-cata', '--category-audit [ID]', '<url><match>-cata [id]</match></url><dim> - Go to category audit. <match>Ex: -cata 1298</match></dim>'],
    ['-cp', '--page-edit [ID]', '<url><match>-cp [id]</match></url><dim> - Go to content page edit. <match>Ex: -cp 1298</match></dim>'],
    ['-d', '--discount-edit [ID]', '<url><match>-d [id]</match></url><dim> - Go to discount edit. <match>Ex: -cd 1298</match></dim>'],
    ['-eh', '--email-view [ID]', '<url><match>-eh [id]</match></url><dim> - Go to customer email history. <match>Ex: -eh 1298</match></dim>'],
    ['-l','--list [ENTITY]', '<url><match>-l [entity]</match></url><dim> - Go to an admin list page. <match>Ex: -l orders</match></dim>'],
    ['-p','--product-edit [ID]', '<url><match>-p [id]</match></url><dim> - Go to product edit. <match>Ex: -p 1298</match></dim>'],
    ['-pa','--product-audit [ID]', '<url><match>-pa [-id]</match></url><dim> - Go to product audit history. <match>Ex: -pa 1298</match></dim>'],
    ['-o','--order-edit [ID]', '<url><match>-o [id]</match></url><dim> - Go to order edit. <match>Ex: -o 1298</match></dim>'],
    ['-oa','--order-audit [ID]', '<url><match>-oa [id]</match></url><dim> - Go to order audit. <match>Ex: -oa 1298</match></dim>'],
    ['-ov','--order-view [ID]', '<url><match>-ov [id]</match></url><dim> - Go to order view. <match>Ex: -ov 1298</match></dim>'],
    ['-vs','--view-session [ID]', '<url><match>-vs [id]</match></url><dim> - Go to view session. <match>Ex: -vs 1298</match></dim>'],
    ['-s','--settings [PAGE]', '<url><match>-s [page]</match></url><dim> - Go to a settings page. <match>Ex: -s security</match></dim>']
];

var webSwitches = [
    ['-bc','--bookmark-commands', '<url><match>-bc</match></url><dim> - Go to your bookmark command folder. <match>Ex: -bc</match></dim>'],
    ['-docs', '--documentation', '<url><match>-docs</match></url><dim> - Go to brocli documentation. <match>Ex: -docs</match></dim>'],
    ['-t','--new-tab', '<url><match>-t</match></url><dim> - Forces a command to open a new tab. <match>Ex: -l orders -t</match></dim>'],
    ['-k', '--keyboard-shortcuts', '<url><match>-k</match></url><dim> - Go to brocli keyboard shortcut settings. <match>Ex: -k</match></dim>'],
    ['-cs', '--custom-searches', '<url><match>alias</match></url><dim> - description. <match>Ex: example</match></dim>'],
    ['-h', '--help', '<url><match>-h</match></url><dim> - Go to brocli documentation. <match>Ex: -h</match></dim>'],
    ['-pp', '--pretty-print [STRING]', '<url><match>-pp [xml]</match></url><dim> - Pretty print xml (or html?) string. <match>Ex: -xml <some><ugly><xml></xml></ugly></some> </match></dim>'],
    ['-url', '--url-encode [STRING]', '<url><match>-url [string]</match></url><dim> - Url encode a string. <match>Ex: -url /some string</match></dim>'],
    ['-com', '--command [BOOKMARK]', '<url><match>-com</match></url><dim> - Execute a bookmark or bookmarklet. <match>Ex: -com ClearCache</match></dim>']
]

var allSwitches = acSwitches.concat(webSwitches);


/**
 * AC Parser
 */
var acParser = new optparse.OptionParser(acSwitches);

acParser.on(0, function (value) {
    if (isUrl(value)) {
      options.domain = value;
    }else if (isUrl('https://'.concat(value))) {
        var cmdUrl = new URL(chrome.runtime.getURL('/_generated_background_page.html'));
        if (options.domain != cmdUrl.hostname) {
            options.domain = 'https://'.concat(value);
        }
    }
});

acParser.on('*', function (name, value) {
    options.action = name;
    options.entered = true;
    buildAcPaths(name, value).forEach(function(path){
        options.paths.push(path);
    });
});


/**
 * Web Parser
 */
var webParser = new optparse.OptionParser(webSwitches);
webParser.on('new-tab', function (name) {
    options.newTab = true;
});

webParser.on(0, function (value) {
    var commandSeparator = ".";
    commands = value.split(commandSeparator);
    var url = getBookmarkCommandUrl(commands, 0, commandNode);
    if (url)
    {
        goTo(url);
    } else {
        chrome.bookmarks.search(value, function(results){
            var bookmarkFound = false;
            results.forEach(function(res){
                if (res.title == value)
                {
                    bookmarkFound = true;
                    goTo(res.url);
                }
            });
        });
    }
});

webParser.on('*', function (name, value) {
    options.entered = true;
    buildWebPaths(name, value).forEach(function(path){
        options.paths.push(path);
    });
});

webParser.on('command', function (name, value) {
    chrome.bookmarks.search(value, function(results){
        results.forEach(function(res){
            if (res.title == value)
                goTo(res.url);      
        });
    });
});


/**
 * Command Helpers
 */
function resetOptions () {
    options.newTab = false;
    options.paths = [];
    options.action = undefined;
    options.domain = undefined;
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


/**
 * Executer - Executes all commands
 */
function Executer () {
    // - Use the parsers to add commands entered to array for that type of command
    // - If the array is not empty, then you know that there are some of that type of command
    // - If the array is empty, try executing a bookmark
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

var Executer = Executer();

Executer.push(runAcCommands);