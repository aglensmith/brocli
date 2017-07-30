/**
 * @fileOverview Uses optparse.js to parse command switches
 * 
 */

var acSwitches = [
    ['-c', '--customer-edit [ID]', 'customer edit'],
    ['-cd', '--changedir [LOC]', 'change directories'],
    ['-ca', '--customer-audit [ID]', 'customer audit'],
    ['-cat', '--category-edit [ID]', 'category edit'],
    ['-catv', '--category-view [ID]', 'category view'],
    ['-cata', '--category-audit [ID]', 'category audit'],
    ['-d', '--discount-edit [ID]', 'discount edit'],
    ['-p','--product-edit [ID]', 'product edit'],
    ['-o','--order-edit [ID]', 'order edit'],
    ['-oa','--order-audit [ID]', 'order audit'],
    ['-ov','--order-view [ID]', 'order view'],
    ['-l','--list [ENTITY]', 'list entity']
];

var acParser = new optparse.OptionParser(acSwitches);

var options = {
    action: undefined,
    domain: undefined,
    path: undefined,
    suggestions: []
};

acParser.on(0, function (value) {
    if (urlOrigin(value)) {
      options.domain = value;
    } 
});

acParser.on('list', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
    options.suggestions.push('-l products', '-l orders', '-l customers');
});

acParser.on('customer-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('discount-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('product-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('order-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

function runAcCommands (commands) {
    acParser.parse(commands);
    var domainPresent = options.domain || "";
    var path = options.path;
    var url = domainPresent + path;
    goTo(url);
}