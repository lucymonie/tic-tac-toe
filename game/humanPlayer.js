const helpers = require('./gameHelpers.js');

module.exports.manageHumanMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moveIsOk = helpers.checkMoveIsAvailable(updatedGame.board, updatedGame.move);
  if(moveIsOk === false) {
    updatedGame.error = 'Sorry, that move is not available, please try again';
    helpers.render(updatedGame.error);
  }
  updatedGame.board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  return updatedGame;
}
