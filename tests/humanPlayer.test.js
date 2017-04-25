const test = require('tape');
const humanPlayer = require('../game/humanPlayer.js');
const helpers = require('../game/gameHelpers.js');

test('Checks that humanPlayer.getMove returns an updated game state', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let updatedGame = humanPlayer.getMove(game);
  t.deepEqual(typeof updatedGame, 'object', 'The returned value should be an object');
  t.end();
});
