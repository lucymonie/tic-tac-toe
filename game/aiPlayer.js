const helpers = require('./gameHelpers.js');

module.exports.getMove = function (game) {
  let updatedGame = Object.assign({}, game);
  let moves = this.getAllNextStates(updatedGame);
  let move = this.chooseNextMove(moves);
  if (move === null) {
    move = this.getNaiveMove(updatedGame.board);
  }
  updatedGame.move = move;
  helpers.render(`Hmm, then I choose ${(updatedGame.move)+1}`);
  let board = helpers.newBoard(updatedGame.board, updatedGame.move, updatedGame.player);
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
    newState.boardCP = helpers.newBoard(currentBoard, position, currentPlayer);
    newState.boardOP = helpers.newBoard(currentBoard, position, opponent);
    newState.winnerCP = helpers.checkTerminal(newState.boardCP, currentPlayer);
    newState.winnerOP = helpers.checkTerminal(newState.boardOP, opponent);
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
    if(move.winnerCP === 1)
      win = move.position;
    else if(move.winnerOP === 1)
      preventLoss = move.position;
  });
  if (win !== null)
    return win ;
  else if (preventLoss !== null)
    return preventLoss;
  else
    return null;
}

module.exports.getNaiveMove = function (board) {
  let move;
  if (board[4] === 'e') {
    move = 4;
  } else {
    move = board.indexOf('e');
  }
  return move;
}
