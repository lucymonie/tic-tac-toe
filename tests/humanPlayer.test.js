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
  let updatedGame = humanPlayer.manageMove(game);
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
  let updatedGame = humanPlayer.manageMove(game);
  t.notEqual(updatedGame.error, null, 'There should be an error on the updated game state if the move was already taken');
  t.end();
});

test('Can check if a human-selected move is in fact valid', function (t) {
  let board = ['e', 'e', 'X', 'e', 'X', 'O', 'X', 'O', 'X'];
  let move1 = 2;
  let move2 = 'B';
  let move3 = 9;
  let move4 = -1;
  let move5 = 0;
  let isPossible = humanPlayer.checkMoveIsAvailable(board, move1);
  t.equal(isPossible, false, 'If move is already taken, result should be false');
  isPossible = humanPlayer.checkMoveIsAvailable(board, move2);
  t.equal(isPossible, false, 'If move is NaN, result should be false');
  isPossible = humanPlayer.checkMoveIsAvailable(board, move3);
  t.equal(isPossible, false, 'If move > 8, result should be false');
  isPossible = humanPlayer.checkMoveIsAvailable(board, move4);
  t.equal(isPossible, false, 'If move < 0, result should be false');
  isPossible = humanPlayer.checkMoveIsAvailable(board, move5);
  t.equal(isPossible, true, 'If move is available and otherwise valid, result should be true');
  t.end();
});
