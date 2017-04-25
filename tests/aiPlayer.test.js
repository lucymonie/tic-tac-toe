const test = require('tape');
const aiPlayer = require('../game/aiPlayer.js');
const helpers = require('../game/gameHelpers.js');

test('Generates a list of available moves', function (t) {
  let board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let moves = aiPlayer.getAvailableMoves(board);
  t.deepEqual(moves, [0, 3, 8], 'Result should be an array with available moves');
  t.end();
});

test('Checks that aiPlayer.getMove returns an updated game state', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let updatedGame = aiPlayer.getMove(game);
  t.deepEqual(typeof updatedGame, 'object', 'The returned value should be an object');
  t.end();
});

test('Can get a naive computer-generated move', function (t) {
  let board = ['e', 'X', 'O',
               'X', 'e', 'O',
               'X', 'O', 'e'];
  let move = aiPlayer.getNaiveMove(board);
  t.deepEqual(move, 4, 'Result should be a naive move (board index)');
  t.end();
});
