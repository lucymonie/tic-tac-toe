const test = require('tape');
const humanPlayer = require('../game/humanPlayer.js');
const helpers = require('../game/gameHelpers.js');

test('Checks that humanPlayer.manageHumanMove returns an updated game state', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
                'e', 'X', 'O',
                'X', 'O', 'e'];
  game.move = 3;
  game.player = 'O';
  let updatedGame = humanPlayer.manageHumanMove(game);
  t.deepEqual(typeof updatedGame, 'object', 'The returned value should be an object');
  t.notDeepEqual(game, updatedGame, 'The two objects should be different');

  t.end();
});


test('Checks that humanPlayer.manageHumanMove appends an error to game state if there is an error', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
                'e', 'X', 'O',
                'X', 'O', 'e'];
  game.move = 1;
  game.player = 'O';
  let updatedGame = humanPlayer.manageHumanMove(game);
  t.notEqual(updatedGame.error, null, 'There should be an error on the updated game state if the move was already taken');
  t.end();
});
