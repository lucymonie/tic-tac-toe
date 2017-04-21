const test = require('tape');
const aiHelpers = require('../game/aiHelpers.js');

test('Generates a list of available moves', function (t) {
  let board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let moves = aiHelpers.getAvailableMoves(board);
  t.deepEqual(moves, [0, 3, 8], 'Result should be an array with available moves');
  t.end();
});
