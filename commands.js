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

function runCommands (commands) {

}

//at end executeCommands function with all arg parser.parse(ARGS);