const helpers = require('./gameHelpers.js');

module.exports.getMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  return updatedGame;
}
