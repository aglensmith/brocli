/**
 * @fileOverview Uses optparse.js to parse command switches
 */

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
];

var acParser = new optparse.OptionParser(acSwitches);

var options = {
    action: undefined,
    domain: undefined,
    path: undefined,
    suggestions: []
};

acParser.on(0, function (value) {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(expression);
    var isUrl = regex.test(value)
    if (isUrl) {
      options.domain = value;
    }else if (regex.test('https://'.concat(value))) {
        options.domain = 'https://'.concat(value);
    }
});

//audit parsers
acParser.on('category-audit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('customer-audit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('order-audit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('product-audit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

//list parser
acParser.on('list', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
    options.suggestions.push('-l products', '-l orders', '-l customers');
});

//edit parsers
acParser.on('category-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('customer-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('discount-edit', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('page-edit', function (name, value) {
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

//view parsers
acParser.on('category-view', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('email-view', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});

acParser.on('order-view', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});
acParser.on('session-view', function (name, value) {
    options.action = name;
    options.path = buildAcPath(name, value);
});


//parse commands an execute navigation
function runAcCommands (commands) {
    acParser.parse(commands);
    var domainPresent = options.domain || "";
    var path = options.path;
    var url = domainPresent + path;
    goTo(url);
}