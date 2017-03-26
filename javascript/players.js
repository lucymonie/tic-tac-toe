const fs = require('fs');
const helpers = require('./helpers.js');
const aiHelpers = require('./aiHelpers.js');
const prompt = require('prompt');

module.exports.getHumanMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moveIsOk = helpers.checkMoveIsAvailable(updatedGame.board, updatedGame.move);
  if(moveIsOk === false) {
    console.log('Sorry, that move is not available, please try again');
  }
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  let winner = helpers.checkTerminal(updatedGame.board, updatedGame.player);
  if(winner !== null) {
    if (winner === 1 || winner === -1) {
      updatedGame.gameStatus = 'winner';
    } else if (winner === 0) {
      updatedGame.gameStatus = 'draw';
    }
    helpers.show(updatedGame.board);
    helpers.finishGame(updatedGame);
  }
  return updatedGame;
}

module.exports.getComputerMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moves = aiHelpers.getAllNextMoves(updatedGame);
  let move = aiHelpers.chooseNextMove(moves);
  if (move === null) {
    move = helpers.getAiMove(updatedGame.board);
  }
  updatedGame.move = move;
  console.log(`Hmm, then I choose ${updatedGame.move}`);
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  let winner = helpers.checkTerminal(updatedGame.board, updatedGame.player);
  if (winner !== null) {
    if (winner === 1 || winner === -1) {
      updatedGame.gameStatus = 'winner';
    } else if (winner === 0) {
      updatedGame.gameStatus = 'draw';
    }
    helpers.show(updatedGame.board);
    helpers.finishGame(updatedGame);
  }
  return updatedGame;
}
