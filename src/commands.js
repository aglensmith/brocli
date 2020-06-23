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

var utilitySwitches = [
    ['-bc','--bookmark-commands', '<url><match>-bc</match></url><dim> - Go to your bookmark command folder. <match>Ex: -bc</match></dim>'],
    ['-docs', '--documentation', '<url><match>-docs</match></url><dim> - Go to brocli documentation. <match>Ex: -docs</match></dim>'],
    ['-t','--new-tab', '<url><match>-t</match></url><dim> - Forces a command to open a new tab. <match>Ex: -l orders -t</match></dim>'],
    ['-k', '--keyboard-shortcuts', '<url><match>-k</match></url><dim> - Go to brocli keyboard shortcut settings. <match>Ex: -k</match></dim>'],
    ['-cs', '--custom-searches', '<url><match>alias</match></url><dim> - description. <match>Ex: example</match></dim>'],
    ['-h', '--help', '<url><match>-h</match></url><dim> - Go to brocli documentation. <match>Ex: -h</match></dim>'],
    ['-pp', '--pretty-print [STRING]', '<url><match>-pp [xml]</match></url><dim> - Pretty print xml (or html?) string. <match>Ex: -xml <some><ugly><xml></xml></ugly></some> </match></dim>'],
    ['-url', '--url-encode [STRING]', '<url><match>-url [string]</match></url><dim> - Url encode a string. <match>Ex: -url /some string</match></dim>'],
    ['-com', '--command [BOOKMARK]', '<url><match>-com</match></url><dim> - Execute a bookmark or bookmarklet. <match>Ex: -com ClearCache</match></dim>'],
    ['-ext', '--extensions', '<url><match>-ext</match></url><dim> - Go to chrome extension settings. <match>Ex: -ex</match></dim>'],
    ['-opt', '--options', '<url><match>-opt</match></url><dim> - Go to brocli options. <match>Ex: -opt</match></dim>'],
    ['-set', '--settings', '<url><match>-set</match></url><dim> - Go to brocli settings. <match>Ex: -set</match></dim>']
];

var allSwitches = utilitySwitches;

/**
 * Web Parser
 */
var utilityParser = new optparse.OptionParser(utilitySwitches);
utilityParser.on('new-tab', function (name) {
    options.newTab = true;
});

utilityParser.on(0, function (value) {
    var commandSeparator = ".";
    commands = value.split(commandSeparator);
    if (!brocliCommandFolderId)
        refreshCommandNode();
    var url = getBookmarkCommandUrl(commands, 0, commandNode);

    if (url)
    {
        goTo(url);
    } else {
        chrome.bookmarks.search(value, function(results){
            var bookmarkFound = false;
            results.forEach(function(res){
                if (res.title.split(" ")[0] == value)
                {
                    bookmarkFound = true;
                    goTo(res.url);
                }
            });
        });
    }
});

utilityParser.on('*', function (name, value) {
    options.entered = true;
    buildUtilityPaths(name, value).forEach(function(path){
        options.paths.push(path);
    });
});

utilityParser.on('command', function (name, value) {
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

function runUtilityCommands (commands) {
    options.entered = false;
    utilityParser.parse(commands);
    var domainPresent = options.domain || "";
    goToMany(domainPresent, options.paths);
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

Executer.push(runUtilityCommands);