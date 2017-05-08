const test = require('tape');
const terminal = require('../game/terminalGame.js');
const helpers = require('../game/gameHelpers.js');

test('Can render the output by calling this function', function (t) {
  let returnVal = terminal.render('a string');
  t.equal(returnVal, console.log('a string'), 'The render function should return 1');
  t.end();
});

test('Can display the board with spaces rather than the letter e in empty spaces', function (t) {
  let board = ['O', 'e', 'X', 'O', 'X', 'O', 'X', 'O', 'e'];
  let displayBoard = terminal.getBoard(board);
  let output = '\n  ' + 'O' + ' |' + ' ' + ' ' + ' |' + ' ' + 'X' +
               '\n ===+===+===\n' +
               '  ' + 'O' + ' |' + ' ' + 'X' + ' |' + ' ' + 'O' +
               '\n ===+===+===\n' +
               '  ' + 'X' + ' |' + ' ' + 'O' + ' |' + ' ' + ' ' + '\n';
  t.equal(displayBoard, output, 'Result should be a matching board');
  t.end();
});

// test('It can start listening for inputs', function (t) {
//   let listening = terminal.listen();
//   t.equal(listening, process.openStdin(), 'It should be listening');
//   process.exit();
//   t.end();
// })
