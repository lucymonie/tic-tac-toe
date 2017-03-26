const helpers = require('./helpers.js');

module.exports.getAllNextMoves = function (game) {
  let currentPlayer = game.player;
  let opponent = helpers.togglePlayer(currentPlayer);
  let currentBoard = Object.assign([], game.board);
  let availablePositions = this.availableMoves(currentBoard);

  return availablePositions.reduce(function(nextStates, position, i) {
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

module.exports.availableMoves = function(board) {
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
