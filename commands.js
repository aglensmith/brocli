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
    ['-c', '--customer.edit [ID]', 'customer edit'],
    ['-cd', '--changedir [LOC]', 'change directories'],
    ['-ca', '--customer.audit [ID]', 'customer audit'],
    ['-cat', '--category.edit [ID]', 'category edit'],
    ['-catv', '--category.view [ID]', 'category view'],
    ['-cata', '--category.audit [ID]', 'category audit'],
    ['-d', '--category.audit [ID]', 'category audit'],
    ['-p','--product.edit [ID]', 'product edit'],
    ['-o','--order.edit [ID]', 'order edit'],
    ['-oa','--order.audit [ID]', 'order audit'],
    ['-ov','--order.view [ID]', 'order view'],
    ['-l','--list [ENTITY]', 'list entity']
];

var acParser = new optparse.OptionParser(acSwitches);

var options = {
    action: undefined,
    domain: undefined,
    path: undefined
};

//domain -- set to domain, if domain, otherwise set to current tab location
acParser.on(0, function (name, value) {
    options.domain = value;
});

acParser.on('customer.edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('order.edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('product.edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('list', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
    console.log("hello from list");
    console.log(name);
    console.log(value);
});

function runAcCommands (commands) {

    acParser.parse(commands);
    console.log(commands);
    var domainPresent = options.domain || "";
    var path = options.path;
    var url = domainPresent + path;
    console.log('test1');
    console.log(options.domain);
    console.log(options.path);
    console.log(options.action)
    console.log(url);
    if (domainPresent) {
        goTo(url);
    } else {
        goTo(url);
    }
    console.log('test2');
    console.log(options.domain);
    console.log(options.path);
    console.log(url);
}