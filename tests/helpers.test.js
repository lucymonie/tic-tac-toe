const test = require('tape');
const helpers = require('../game/helpers.js');

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

test('Checks that win or draw outcome notifies players appropriately', function (t) {
  let game = new helpers.Game();
  game.board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
  let updatedGame = helpers.notifyOutcome(game, -1);
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

test('Can get a naive computer-generated move', function (t) {
  let board = ['e', 'X', 'O',
               'X', 'e', 'O',
               'X', 'O', 'e'];
  let move = helpers.getNaiveMove(board);
  t.deepEqual(move, 4, 'Result should be a naive move (board index)');
  t.end();
});

test('Game object constructor creates a game object with various properties', function (t) {
  let game = new helpers.Game();
  t.equal(game.welcome(), `\nWelcome to Tic Tac Toe! You\'re ${game.player}. Let\'s play`, 'Result should be a greeting');
  t.equal(game.inviteMove, 'Please choose a move [1-9]: ', 'Result should invite player to make a move from 1-9');
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

test('Can check if a human-selected move is in fact valid', function (t) {
  let board = ['e', 'e', 'X', 'e', 'X', 'O', 'X', 'O', 'X'];
  let move1 = 2;
  let move2 = 'B';
  let move3 = 9;
  let move4 = -1;
  let move5 = 0;
  let isPossible = helpers.checkMoveIsAvailable(board, move1);
  t.equal(isPossible, false, 'If move is already taken, result should be false');
  isPossible = helpers.checkMoveIsAvailable(board, move2);
  t.equal(isPossible, false, 'If move is NaN, result should be false');
  isPossible = helpers.checkMoveIsAvailable(board, move3);
  t.equal(isPossible, false, 'If move > 8 result should be false');
  isPossible = helpers.checkMoveIsAvailable(board, move4);
  t.equal(isPossible, false, 'If move < 0, result should be false');
  isPossible = helpers.checkMoveIsAvailable(board, move5);
  t.equal(isPossible, true, 'If move is available and otherwise valid, result should be true');
  t.end();
});

test('Can display the board with spaces rather than the letter e in empty spaces', function (t) {
  let board = ['O', 'e', 'X', 'O', 'X', 'O', 'X', 'O', 'e'];
  let displayBoard = helpers.getBoardForTerminal(board);
  let output = '\n  ' + 'O' + ' |' + ' ' + ' ' + ' |' + ' ' + 'X' +
               '\n ===+===+===\n' +
               '  ' + 'O' + ' |' + ' ' + 'X' + ' |' + ' ' + 'O' +
               '\n ===+===+===\n' +
               '  ' + 'X' + ' |' + ' ' + 'O' + ' |' + ' ' + ' ' + '\n';
  t.equal(displayBoard, output, 'Result should be a matching board');
  t.end();
});

test('Can render the output by calling this function', function (t) {
  let returnVal = helpers.render('a string');
  t.equal(returnVal, 1, 'The render function should return 1');
  t.end();
})

test('Can announce the end of the game and name the winner or that it\'s a draw', function (t) {
  let game = new helpers.Game();
  game.board = ['O', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  game.gameStatus = 'winner';
  let result = helpers.finishGame(game)
  t.equal(result, 'You win!', 'Expect X to be the winner');
  t.end();
});
