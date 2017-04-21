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
    let displayBoard = helpers.show(updatedGame.board);
    console.log(displayBoard);
    let result = helpers.finishGame(updatedGame);
    console.log(result);
    process.exit();
  }
  return updatedGame;
}

module.exports.getComputerMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moves = aiHelpers.getAllNextStates(updatedGame);
  let move = aiHelpers.chooseNextMove(moves);
  if (move === null) {
    move = helpers.getNaiveMove(updatedGame.board);
  }
  updatedGame.move = move;
  console.log(`Hmm, then I choose ${(updatedGame.move)+1}`);
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  let winner = helpers.checkTerminal(updatedGame.board, updatedGame.player);
  if (winner !== null) {
    if (winner === 1 || winner === -1) {
      updatedGame.gameStatus = 'winner';
    } else if (winner === 0) {
      updatedGame.gameStatus = 'draw';
    }
    let displayBoard = helpers.show(updatedGame.board);
    console.log(displayBoard);
    let result = helpers.finishGame(updatedGame);
    console.log(result);
    process.exit();
  }
  return updatedGame;
}
