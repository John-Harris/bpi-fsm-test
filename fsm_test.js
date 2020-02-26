// BPI Finite State Automata Sample Code

var FSM_States = [
    { name: 'S0', output: 0, final: true },
    { name: 'S1', output: 1, final: true },
    { name: 'S2', output: 2, final: true }
];

var FSM_TransitionTable = [
    { current: 'S0', input: 0, result: 'S0' },
    { current: 'S0', input: 1, result: 'S1' },
    { current: 'S1', input: 0, result: 'S2' },
    { current: 'S1', input: 1, result: 'S0' },
    { current: 'S2', input: 0, result: 'S1' },
    { current: 'S2', input: 1, result: 'S2' }
];


var transitionFunc = function (FSM_States, FSM_TransitionTable, myCurrentState, myInput) {
    var errorState = false;
    for (var ii = 0; ii < FSM_TransitionTable.length; ii++ ) {
        var testMatchState = FSM_TransitionTable[ii];

        if (testMatchState.current == myCurrentState && testMatchState.input == myInput) {
            return testMatchState.result;        
        }
    }

    throw Error ('not found  a state transition for currentState/input =' +
         myCurrentState + '/' + myInput +
        ' in table:' +  FSM_TransitionTable.toString());

};


var runFSM = function (FSM_States, FSM_TransitionTable, transitionFunc, inputStr) {

    var currentState = FSM_States[0].name;
    var resultState;

    // run state transitions as per input
    for (var ii = 0; ii < inputStr.length; ii++ ) {
        var inputVal = inputStr.charAt (ii);
        resultState = transitionFunc (FSM_States, FSM_TransitionTable, currentState, inputVal);
        currentState = resultState;
    }

    // determine final state value and validity
    var validFinal = false;
    var finalOutput;
    for (var jj = 0; jj < FSM_States.length && !validFinal; jj++) {
        var testFinal = FSM_States[jj];
        if (testFinal.name == currentState && testFinal.final) {
            validFinal = true;
            finalOutput = testFinal.output;
        }
    }

    if (validFinal) {
        console.log ('output value:', finalOutput);
    }
    if ( ! validFinal) {
        console.log ('invalid input in inputStr: [' + inputStr + ']');
    }
    return finalOutput;
}

var unitTest = function (inputStr, expectedOutput) {

    console.log ('');
    console.log ('Test input: [' + inputStr + ']')
    testOutput = runFSM (FSM_States, FSM_TransitionTable, transitionFunc, inputStr);
    if (testOutput == expectedOutput) {
        console.log ('test passed for input [' + inputStr + ']');
    } else {
        console.log ('test FAILED for input [' + inputStr + ']');
    }

};

unitTest ('110', 0);
unitTest ('1010', 1);
unitTest ('0', 0);
unitTest ('1', 1);
unitTest ('10', 2);
unitTest ('11', 0);
unitTest ('111', 1);
unitTest ('', 0);
unitTest ('ABC', 0);