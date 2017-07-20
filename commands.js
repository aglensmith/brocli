/**
 * @fileOverview Uses optparse.js to parse command switches
 * 
 * TODO: 
 * - make AC commands use one parser that uses option dict
 * 
 */


var entities = [
    "category",
    "customer",
    "order",
    "product"
];

var options = {
    action: undefined,
    entity: undefined,  
    entityId: undefined,
    domain: undefined
};

/**
 * AC Commands
 * 
 */
var acSwitches = [
    ['-c', '--customer [ID]', 'specify customer entity'],
    ['-p', '--product [ID]', 'specify product entity'],
    ['-o', '--order [ID]', 'specify order entity'],
    ['-v', '--view [ID]', 'view entity'],
    ['-e','--edit [ID]', 'edit entity'],
    ['-l','--list [ENTITY]', 'list entity']
];

var acParser = optparse.OptionParser(acSwitches);

//actions
acParser.on('edit', function (name, value) {
    options[action] = name;
    options[entityId] = value;
});

acParser.on('list', function (name, value) {
    options[action] = name;
    options[entityId] = value;
});

acParser.on('view', function (name, value) {
    options[action] = name;
    options[entityId] = value;
});


//domain
acParser.on(-1, function (name, value) {
    options[domain] = value;
});


//entities
acParser.on('customer', function (name, value) {
    options[entity] = name;
    options[entityId] = value;
});

acParser.on('order', function (name, value) {
    options[entity] = name;
    options[entityId] = value;
});

acParser.on('product', function (name, value) {
    options[entity] = name;
    options[entityId] = value;
});



/** 
* Order Commands
*
*/
var orderSwitches = [
    ['-v', '--view [ID]', 'view orders'],
    ['-e','--edit [ID]', 'edit orders'],
    ['-a', '--audit [ID]', 'audit orders'],
]
var orderParser = new optparse.OptionParser(orderSwitches);

orderParser.on('view', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/orders/viewOrder.aspx%3ForderID%3D'+value;
    goTo(orderUrl);
});

orderParser.on('edit', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+value;
    goTo(orderUrl);
});

orderParser.on('audit', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/orders/ViewOrder.aspx%3ForderID%3D'+value;
    goTo(orderUrl);
});

orderParser.on(function(opt) {
	console.log('No handler was defined for option:' +  opt);
});

orderParser.on('*', function(opt, value) {
    console.log('wild handler for ' + opt + ', value=' + value);
});


/** 
* Product Commands
*
*/
var productSwitches = [
    ['-e','--edit [ID]', 'edit products'],
    ['-a', '--audit [ID]', 'audit products'],
]

var productParser = new optparse.OptionParser(productSwitches);

productParser.on('edit', function (name, value) {
    var productUrl = '/store/admin/products/listproducts.aspx?ovu=/store/admin/products/productedit/general.aspx%3FcatID%3D21%26ID%3D'+value+'&ovw=0&ovn=1';
    goTo(productUrl);
});

productParser.on('audit', function (name, value) {
    var orderUrl = '/store/admin/products/listproducts.aspx?ovu=/store/admin/site/entityaudithistory.aspx%3FEntityID%3D36%26EntityTypeID%3D'+value;
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


/* var options = {
    action: undefined,
    entity: undefined,  
    entityId: undefined,
    domain: undefined
};
 */
function runAcCommands (commands) {
    acParser.parse(commands)
    var domain = options[domain] || "";
    var relUrl = buildUrl ()
}