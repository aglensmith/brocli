var options = {
    action: undefined,
    domain: undefined,
    newTab: false,
    path: undefined,
    paths: [],
    suggestions: [],
    args: []
};

var acSwitches = [];

var webSwitches = [
    ['-bc','--bookmark-commands', '<url><match>-bc</match></url><dim> - Go to your bookmark command folder. <match>Ex: -bc</match></dim>'],
    ['-docs', '--documentation', '<url><match>-docs</match></url><dim> - Go to brocli documentation. <match>Ex: -docs</match></dim>'],
    ['-t','--new-tab', '<url><match>-t</match></url><dim> - Forces a command to open a new tab. <match>Ex: -l orders -t</match></dim>'],
    ['-k', '--keyboard-shortcuts', '<url><match>-k</match></url><dim> - Go to brocli keyboard shortcut settings. <match>Ex: -k</match></dim>'],
    ['-cs', '--custom-searches', '<url><match>alias</match></url><dim> - description. <match>Ex: example</match></dim>'],
    ['-h', '--help', '<url><match>-h</match></url><dim> - Go to brocli documentation. <match>Ex: -h</match></dim>'],
    ['-pp', '--pretty-print [STRING]', '<url><match>-pp [xml]</match></url><dim> - Pretty print xml (or html?) string. <match>Ex: -xml <some><ugly><xml></xml></ugly></some> </match></dim>'],
    ['-url', '--url-encode [STRING]', '<url><match>-url [string]</match></url><dim> - Url encode a string. <match>Ex: -url /some string</match></dim>'],
    ['-ext', '--extensions', '<url><match>-ext</match></url><dim> - Go to chrome extension settings. <match>Ex: -ex</match></dim>'],
    ['-opt', '--options', '<url><match>-opt</match></url><dim> - Go to brocli options. <match>Ex: -opt</match></dim>'],
    ['-set', '--settings', '<url><match>-set</match></url><dim> - Go to brocli settings. <match>Ex: -set</match></dim>']
]

var allSwitches = acSwitches.concat(webSwitches);

/**
 * Web Parser
 */
var webParser = new optparse.OptionParser(webSwitches);

webParser.on('new-tab', function (name) {
    options.newTab = true;
});

// TODO: on "0" shouldn't navigate if there's more than 1 command
// and on 1, 2, etc should be used to set positional options like below
// then build url and navigae in executeAll
// webParser.on(1, function (value) {
//     options.positional.push(value);
// });

// since there's always a 0 for bookmark commands, if we end up navigating in on 0, 
// then none of the options or other commands get used, ex: -new-tab
webParser.on(0, function (value) {
    if (isUrl(value))
        goTo(value);
    var commandSeparator = ".";
    console.log('webParser.on value: ' + value);
    bookmarkPath = value.split(' ')[0].split('.');
    commands = value.split(commandSeparator)
    if (!brocliCommandFolderId)
        refreshCommandNode();
    var url = getBookmarkCommandUrl(bookmarkPath, 0, commandNode);
    if (url)
    {
        goTo(url, false, value);
    } else {
        value = value.split(commandSeparator)[0];
        console.log('webParser.on value: ' + value);
        chrome.bookmarks.search(value, function(results){
            var bookmarkFound = false;
            results.forEach(function(res){
                if (res.title.split(" ")[0] == value)
                {
                    bookmarkFound = true;
                    if ('url' in res){
                        url = res.url.replace('brocli.example.com', (new URL(currentLocation).hostname));
                        value.split(' ').forEach(function(i){
                            if ( value.split(' ').indexOf(i) != 0) {
                                url = res.url.replace('broclistr', p)
                                url = res.url.replace('broclistr'.concat(params.indexOf(p)), p);
                                url = res.url.replace('%s', value);
                                url = res.url.replace('%s'.concat(i), value);
                                console.log('commands.js > webparser.on(): ', url)
                            }
                        });
                    }
                    goTo(url);
                }
            });
        });
    }
});

webParser.on(1, function (value) {
    options.args.push[value];
});

webParser.on('*', function (name, value) {
    console.log('name' + name);
    value = value.split(' ')
    options.entered = true;
    buildWebPaths(name, value).forEach(function(path){
        options.paths.push(path);
    });
});


function resetOptions () {
    options.newTab = false;
    options.paths = [];
    options.action = undefined;
    options.domain = undefined;
    options.args = [];
}

function runAcCommands (commands) {
    options.entered = false;
    /* acParser.parse(commands); */
    webParser.parse(commands);
    if (isZD(currentLocation) && isTicket(currentLocation)) {
        goToFromZD();
    } else {
        var domainPresent = options.domain || "";
        goToMany(domainPresent, options.paths);
    }
}

function Executer () {
    // - Use the parsers to add commands entered to array for that type of command
    // - If the array is not empty, then you know that there are some of that type of command
    // - If the array is empty, try executing a bookmark
    var array = [];
    array.executeAll = function(commands) {
        console.log(commands);
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