//comamands.js
//['order', '-e', '123456']

//create multiple parser for each command

//Might use for initial parse
var initialSwitches = [
	['-h', '--help', 'Shows help section']
];
var initialParser = new optparse.OptionParser();

//Define Order Parser
var orderSwitches = [
    ['-v', '--view [ID]', 'view orders'],
    ['-e','--edit [ID]', 'edit orders'],
    ['-a', '--audit [ID]', 'audit orders'],
    ['-s', '--search [TERM]', 'search orders'],
]
var orderParser = new optparse.OptionParser(orderSwitches);

orderParser.on('view', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/orders/viewOrder.aspx%3ForderID%3D'+value+'&ovw=1&ovn=0';
    navCurrentDomain(orderUrl);
});

orderParser.on('edit', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+value+'&ovw=1&ovn=0';
    navCurrentDomain(orderUrl);
});

orderParser.on('audit', function (name, value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/orders/ViewOrder.aspx%3ForderID%3D'+value+'&ovw=1&ovn=0';
    navCurrentDomain(orderUrl);
});

//Search doesn't appear to be URL based
orderParser.on('search', function (value) {

});

function runCommands (commands) {
    console.log(commands)
    orderParser.parse(commands)
}

//at end executeCommands function with all arg parser.parse(ARGS);
// first argument determines which parser is used?