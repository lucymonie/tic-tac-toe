const helpers = require('./helpers.js');
const aiHelpers = require('./aiHelpers.js');

module.exports.getHumanMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moveIsOk = helpers.checkMoveIsAvailable(updatedGame.board, updatedGame.move);
  if(moveIsOk === false) {
    helpers.render('Sorry, that move is not available, please try again');
  }
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  let winner = helpers.checkTerminal(updatedGame.board, updatedGame.player);
  if (winner !== null) {
    updatedGame = helpers.notifyOutcome(game, winner);
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
  helpers.render(`Hmm, then I choose ${(updatedGame.move)+1}`);
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  let winner = helpers.checkTerminal(updatedGame.board, updatedGame.player);
  if (winner !== null) {
    updatedGame = helpers.notifyOutcome(game, winner);
  }
  return updatedGame;
}
