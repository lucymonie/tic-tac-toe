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
  t.notDeepEqual(game, updatedGame, 'The game states should be different objects with different values');
  t.end();
});

test('Checks that function generates state objects for each available move', function (t) {
  let game = new helpers.Game();
  game.board = ['e', 'X', 'O',
                'e', 'X', 'O',
                'X', 'O', 'e'];
  game.player = 'O';
  let states = aiPlayer.getAllNextStates(game);
  t.deepEqual(states.length, 3, 'As there are three available places on the board, there should be three state objects');
  t.deepEqual(states[0].position, 0, 'The first available position in the game states should be 0');
  t.deepEqual(typeof states[1].boardCP, 'object', 'The property boardCP should be an object');
  t.equal(states[2].winnerCP, 1, 'The third move would be a winning move, so the value should be 1');
  t.end();
});

test('Checks that AI player will take the winning move if available', function (t) {
  let moves = [
    {
     winnerOP: null,
     winnerCP: null,
     position: 0
    },
    {
     winnerOP: null,
     winnerCP: null,
     position: 3
    },
    {
     winnerOP: null,
     winnerCP: 1,
     position: 8
    }
  ]
  let move = aiPlayer.chooseNextMove(moves);
  t.equal(move, 8, 'The AI player should choose 8');
  t.end();
});

test('Checks that AI player will prevent a loss if no winning move is available', function (t) {
  let moves = [
    {
     winnerOP: 1,
     winnerCP: null,
     position: 0
    },
    {
     winnerOP: null,
     winnerCP: null,
     position: 3
    },
    {
     winnerOP: null,
     winnerCP: null,
     position: 8
    }
  ]
  let move = aiPlayer.chooseNextMove(moves);
  t.equal(move, 0, 'The AI player should choose 0');
  t.end();
});

test('Checks that the function returns null if no win or loss prevention is possible', function (t) {
  let moves = [
    {
     winnerOP: null,
     winnerCP: null,
     position: 0
    },
    {
     winnerOP: null,
     winnerCP: null,
     position: 3
    },
    {
     winnerOP: null,
     winnerCP: null,
     position: 8
    }
  ]
  let move = aiPlayer.chooseNextMove(moves);
  t.equal(move, null, 'The function should return null');
  t.end();
});

test('AI player should choose 4 if there is no winning or losing move and 4 is available', function (t) {
  let board = ['e', 'X', 'O',
               'X', 'e', 'O',
               'X', 'O', 'e'];
  let move = aiPlayer.getNaiveMove(board);
  t.equal(move, 4, 'Result should be a considered naive move (board index)');
  t.end();
});

test('AI player should choose a non-corner move if move 4 is not available and opponent has two opposite corners', function (t) {
  let board = ['X', 'e', 'e',
               'e', 'O', 'e',
               'e', 'e', 'X'];
  let move = aiPlayer.getNaiveMove(board);
  t.equal(move, 1, 'Result should be board position 1');
  t.end();
});

test('AI player should choose a corner move if opponent has not taken two opposite corners', function (t) {
  let board = ['O', 'e', 'e',
               'e', 'X', 'e',
               'X', 'e', 'e'];
  let move = aiPlayer.getNaiveMove(board);
  t.equal(move, 2, 'Result should be board position 8');
  t.end();
});

test('AI player should choose first available move if there is no win, loss, corner or opposite corner setup', function (t) {
  let board = ['O', 'e', 'O',
               'e', 'X', 'O',
               'O', 'e', 'X'];
  let move = aiPlayer.getNaiveMove(board);
  t.equal(move, 1, 'Result should be a considered naive move (board index)');
  t.end();
});
