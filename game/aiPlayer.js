const helpers = require('./gameHelpers.js');

module.exports.getMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moves = this.getAllNextStates(updatedGame);
  let move = this.chooseNextMove(moves);
  if (move === null) {
    move = this.getNaiveMove(updatedGame.board);
  }
  updatedGame.move = move;
  updatedGame.statement = `Hmm, then I choose ${(updatedGame.move)+1}`;
  let board = helpers.getNewBoard(updatedGame.board, updatedGame.move, updatedGame.player);
  updatedGame.board = board;
  return updatedGame;
}

module.exports.getAllNextStates = function (game) {
  let currentPlayer = game.player;
  let opponent = helpers.togglePlayer(currentPlayer);
  let currentBoard = Object.assign([], game.board);
  let availablePositions = this.getAvailableMoves(currentBoard);

  return availablePositions.reduce(function(nextStates, position) {
    let newState = {};
    newState.position = position;
    newState.boardCP = helpers.getNewBoard(currentBoard, position, currentPlayer);
    newState.boardOP = helpers.getNewBoard(currentBoard, position, opponent);
    newState.winnerCP = helpers.checkEnd(newState.boardCP, currentPlayer);
    newState.winnerOP = helpers.checkEnd(newState.boardOP, opponent);
    nextStates.push(newState);
    return nextStates;
  }, []);
}

module.exports.getAvailableMoves = function (board) {
  return board.reduce(function (moves, position, i) {
    if (position === 'e')
    moves.push(i);
    return moves;
  }, []);
}

module.exports.chooseNextMove = function (moves) {
  let win = null;
  let preventLoss = null;
  moves.forEach(function(move) {
    if (move.winnerCP === 1)
      win = move.position;
    else if (move.winnerOP === 1)
      preventLoss = move.position;
  });
  if (win !== null)
    return win;
  else if (preventLoss !== null)
    return preventLoss;
  else
    return null;
}

module.exports.getNaiveMove = function (board) {
  let move;
  if (board[4] === 'e') {
    move = 4;
  } else if (board[0] === 'X' && board[8] === 'X' || board[2] === 'X' && board[6] === 'X') {
    if (board[1] === 'e')
      move = 1;
    else if (board[3] === 'e')
      move = 3;
    else if (board[5] === 'e')
      move = 5;
    else if (board[7] === 'e')
      move = 7;
  } else {
    if (board[0] === 'e')
      move = 0;
    else if (board[2] === 'e')
      move = 2;
    else if (board[6] === 'e')
      move = 6;
    else if (board[8] === 'e')
      move = 8;
    else
      move = board.indexOf('e');
  }
  return move;
}
