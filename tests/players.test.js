const test = require('tape');
const players = require('../game/players.js');
const helpers = require('../game/helpers.js');

test('Checks that getHumanMove returns an updated game state', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let updatedGame = players.getHumanMove(game);
  t.deepEqual(typeof updatedGame, 'object', 'The returned value should be an object');
  t.end();
});

test('Checks that getComputerMove returns an updated game state', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let updatedGame = players.getComputerMove(game);
  t.deepEqual(typeof updatedGame, 'object', 'The returned value should be an object');
  t.end();
});
