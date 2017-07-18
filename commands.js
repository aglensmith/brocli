//comamands.js
//['order', '-e', '123456']

//create multiple parser for each command

var orderSwitches = [
    ['-v', '--view [ID]', 'view orders'],
    ['-e','--edit [ID]', 'edit orders'],
    ['-a', '--audit [ID]', 'audit orders'],
    ['-s', '--search [TERM]', 'search orders'],
]

orderParser = new optparse.OptionParser(orderSwitches);

orderParser.on('view', function (value) {

});

orderParser.on('edit', function (value) {
    var orderUrl = '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+orderNum+'&ovw=1&ovn=0';
});

orderParser.on('audit', function (value) {

});

orderParser.on('search', function (value) {

});

function runCommands (commands) {

}

//at end executeCommands function with all arg parser.parse(ARGS);
// first argument determines which parser is used?