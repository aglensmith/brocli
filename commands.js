/**
 * @fileOverview Uses optparse.js to parse command switches
 * 
 * TODO: 
 * - make AC commands use one parser that uses option dict
 * 
 */



/**
 * AC Commands
 * 
 */

var acSwitches = [
    ['-c', '--customeredit [ID]', 'customer edit'],
    ['-cd', '--changedir [LOC]', 'change directories'],
    ['-ca', '--customeraudit [ID]', 'customer audit'],
    ['-cat', '--categoryedit [ID]', 'category edit'],
    ['-catv', '--categoryview [ID]', 'category view'],
    ['-cata', '--categoryaudit [ID]', 'category audit'],
    ['-d', '--categoryaudit [ID]', 'category audit'],
    ['-p','--productedit [ID]', 'product edit'],
    ['-o','--orderedit [ID]', 'order edit'],
    ['-oa','--orderaudit [ID]', 'order audit'],
    ['-ov','--orderview [ID]', 'order view'],
    ['-ov','--orderview [ID]', 'order view'],
    ['-ls','--list [ENTITY]', 'list entity']
];

var acParser = new optparse.OptionParser(acSwitches);

var options = {
    action: undefined,
    domain: undefined,
    path: undefined
};

//domain -- set to domain, if domain, otherwise set to current tab location
acParser.on(0, function (name, value) {
    options[domain] = value;
});

acParser.on('customeredit', function (name, value) {
    options[action] = name;
    options[entityId] = value;
    option[path] = buildAcPath(name);
});

function runCommands (commands) {
    switch (commands[0]) {
        case 'order':
            //note to self: break is optional
            orderParser.parse(commands);
            break;
        case 'product':
            productParser.parse(commands);
            break;
    }   
}

function runAcCommands (commands) {
    acParser.parse(commands)
    var domain = options[domain] || "";
    var relUrl = buildUrl ()
}