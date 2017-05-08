const helpers = require('./gameHelpers.js');

module.exports.manageMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moveIsOk = this.checkMoveIsAvailable(updatedGame.board, updatedGame.move);
  if(moveIsOk === false) {
    updatedGame.error = 'Sorry, that move is not available, please try again';
  } else {
    updatedGame.board = helpers.getNewBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  }
  return updatedGame;
}

module.exports.checkMoveIsAvailable = function (board, move) {
  if (move >= 0 && move <= 8 && !isNaN(move) && board[move] === 'e') {
    return true;
  }
  return false;
}
