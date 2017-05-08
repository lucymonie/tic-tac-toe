const test = require('tape');
const helpers = require('../game/gameHelpers.js');

test('Checks that if the board is not terminal it should return null', function (t) {
  let board = ['e', 'X', 'O',
               'e', 'X', 'O',
               'X', 'O', 'e'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, null, 'Result should be null');
  t.end();
});

test('Checks that if there is a draw, it should return 0', function (t) {
  let board = ['O', 'X', 'O',
               'O', 'X', 'O',
               'X', 'O', 'X'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, 0, 'Result should be 0');
  t.end();
});

test('Checks that if there is a winner, and it is X it should return 1', function (t) {
  let board = ['O', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, 1, 'Result should be 1');
  t.end();
});

test('Checks that if there is a winner, and it is current player it should return 1', function (t) {
  let board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
  let result = helpers.checkTerminal(board, 'O');
  t.equal(result, 1, 'Result should be 1');
  t.end();
});

test('Checks that if there is a winner, and it is opponent it should return -1', function (t) {
  let board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
  let result = helpers.checkTerminal(board, 'X');
  t.equal(result, -1, 'Result should be -1');
  t.end();
});

test('Check that it can recognise a winning pattern', function (t) {
  let boardString = 'XXXeOeOee';
  let winner = helpers.checkWinner(boardString);
  t.equal(winner, 'X', 'The winner should be X')
  t.end();
});

test('Check that it can recognise a lack of winning pattern', function (t) {
  let boardString = 'XXeeOeOee';
  let winner = helpers.checkWinner(boardString);
  t.false(winner, 'There should be no winner');
  t.end();
});

test('Checks that win or draw outcome notifies players appropriately', function (t) {
  let game = new helpers.Game();
  game.board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
  let updatedGame = helpers.setOutcome(game, -1);
  t.equal(updatedGame.gameStatus, 'winner', 'Game status should be winner');
  t.end();
});

test('Creates a new board with latest move by the correct player', function (t) {
  let board = ['e', 'X', 'O', 'e', 'X', 'O', 'X', 'O', 'e'];
  let player = 'X';
  let move = 0;
  let newBoardState = helpers.newBoard(board, move, player);
  t.deepEqual(newBoardState, ['X', 'X', 'O', 'e', 'X', 'O', 'X', 'O', 'e'], 'Result should be an array with the new move');
  t.equal(newBoardState[0], player, 'Result should be correct player');
  t.end();
});

test('Can set player according to the human player preference', function (t) {
  let playerInput = 'x';
  let game = new helpers.Game();
  let updatedGame = helpers.setMarkers(playerInput, game);
  t.equal(updatedGame.player2, 'X', 'Function should translate input into a property of the game state passed in');
  t.equal(updatedGame.player1, 'O', 'Computer player should be set to be the other player');
  t.end();
});

test('Game object constructor creates a game object with various properties', function (t) {
  let game = new helpers.Game();
  t.equal(game.welcome, `\nWelcome to Tic Tac Toe! You\'re ${game.player}. Let\'s play!\n`, 'Result should be a greeting');
  t.equal(game.inviteMove, '\nPlease choose a move [1-9]: ', 'Result should invite player to make a move from 1-9');
  t.deepEqual(game.board, ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'], 'Result should be an empty board');
  t.equal(game.gameStatus, null, 'Game status should be null');
  t.equal(game.player, 'X', 'Game player defaults to X');
  t.deepEqual(game.player1, {
    marker: 'O',
    isComputer: true
  },
    'Game player1 should be set to O and isComputer is true as default');
  t.deepEqual(game.player2, {
    marker: 'X',
    isComputer: false
  }, 'Game player2 should be set to X and isComputer is false as default');
  t.end();
});

test('Can check which player is the winner', function (t) {
  let boardString = ['O', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  let winner = helpers.checkWinner(boardString);
  t.equal(winner, 'X', 'Result should be X');
  t.end();
});

test('Can toggle player from X to O and back', function (t) {
  let player = 'X';
  let otherPlayer = helpers.togglePlayer(player);
  t.equal(otherPlayer, 'O', 'Result should be O');
  t.end();
});

test('Can announce the end of the game and name the winner or that it\'s a draw', function (t) {
  let game = new helpers.Game();
  game.board = ['O', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  game.gameStatus = 'winner';
  let result = helpers.getStatement(game)
  t.equal(result, 'You win!', 'Expect X to be the winner');
  t.end();
});
