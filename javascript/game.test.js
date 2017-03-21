const test = require('tape');
const helpers = require('./helpers.js');
const game = require('./game.js');

test('Checks that if the board is not terminal it should return null', function (t) {
  let board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, null);
  t.end();
});

test('Checks that if there is a draw, it should return 0', function (t) {
  let board = ['O', 'X', 'O',
               'O', 'X', 'O',
               'X', 'O', 'X'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, 0);
  t.end();
});

test('Checks that if there is a winner, and it is X it should return 1', function (t) {
  let board = ['O', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, 1);
  t.end();
});

test('Checks that if there is a winner, and it is O it should return -1', function (t) {
  let board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
  let result = helpers.checkTerminal(board, 'O');
  t.equal(result, -1);
  t.end();
});

test('Checks that the regex patterns work', function (t) {
  let typeCheck = typeof helpers.patternWin;
  let testPatternWin = helpers.patternWin[3].test('C  C  C  ');
  t.equal(typeCheck, 'object');
  t.equal(testPatternWin, true);
  t.end();
});

test('Creates a new board with lates move', function (t) {
  let board = ['e', 'X', 'O', 'e', 'X', 'O', 'X', 'O', 'e'];
  let player = 'X';
  let move = 0;
  let newBoardState = helpers.newBoard(board, move, player);
  t.deepEqual(newBoardState, ['X', 'X', 'O', 'e', 'X', 'O', 'X', 'O', 'e']);
  t.end();
});

test('Generates a list of available moves', function (t) {
  let board = ['e', 'X', 'O', 'e', 'X', 'O', 'X', 'O', 'e'];
  let moves = helpers.availableMoves(board);
  t.deepEqual(moves, [0, 3, 8]);
  t.end();
});

test('Can get a computer-generated move, however stoopid', function (t) {
  let board = ['e', 'X', 'O',
               'X', 'e', 'O',
               'X', 'O', 'e'];
  let player = 'X';
  let move = helpers.getAiMove(board, player);
  t.deepEqual(move, ['e', 'X', 'O', 'X', 'X', 'O', 'X', 'O', 'e']);
  t.end();
});

test('AI will not make a move if X wins (and will return 1)', function (t) {
  let board = ['X', 'O', 'O',
               'X', 'e', 'O',
               'X', 'O', 'e'];
  let player = 'X';
  let move = helpers.getAiMove(board, player);
  t.equal(move, 1);
  t.end();
});

test('AI will not make a move if there is a draw (and will return 0)', function (t) {
  let board = ['X', 'O', 'X',
               'O', 'X', 'O',
               'O', 'X', 'O'];
  let player = 'X';
  let move = helpers.getAiMove(board, player);
  t.equal(move, 0);
  t.end();
});

test('AI will not make a move if O wins (and will return -1)', function (t) {
  let board = ['O', 'O', 'X',
               'O', 'X', 'O',
               'O', 'X', 'O'];
  let player = 'O';
  let move = helpers.getAiMove(board, player);
  t.equal(move, -1);
  t.end();
})
