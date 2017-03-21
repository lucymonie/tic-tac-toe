module.exports.patternWin = [/CCC....../, /...CCC.../,
                             /......CCC/, /C..C..C../,
                             /.C..C..C./, /..C..C..C/,
                             /C...C...C/, /..C.C.C../]

module.exports.checkTerminal = function (board, player) {
  let boardString = board.join('');
  let isWinner = this.checkWinner(boardString, player);
  if (isWinner.length) {
    if (player === 'X')
      return 1;
    else if (player === 'O')
      return -1;
  } else if (boardString.indexOf('e') === -1) {
    return 0;
  }
  return null;
}

module.exports.checkWinner = function (boardString, player) {
  let re;
  if (player === 'X') re = /X/g;
  else re = /O/g;
  let neutralBoardString = boardString.replace(re, 'C');
  return this.patternWin.filter(function(pattern) {
    return pattern.test(neutralBoardString);
  });
}

module.exports.availableMoves = function(board) {
  let ind = [];
  for (i = 0; i < board.length; i++) {
    if (board[i] === 'e')
    ind.push(i);
  }
  return ind;
}

module.exports.newBoard = function (board, move, player) {
  let newBoardState = Object.assign([], board);
  newBoardState.splice(move, 1, player);
  return newBoardState;
}

module.exports.getAiMove = function (board, player) {
  let end = this.checkTerminal(board, player);
  let move;
  if (end === null) {
    if (board[4] === 'e') {
      move = 4;
    } else {
      move = board.indexOf('e');
    }
    return this.newBoard(board, move, player);
  } else {
    return end;
    process.exit();
  }
}

module.exports.togglePlayer = function (player) {
  return player === 'X'
  ? 'O'
  : 'X';
}

module.exports.checkMove = function (board, move, player) {
  if (player === 'X') {
    if (move >= 0 && move <= 8 && !isNaN(move) && board[move] === 'e') {
      return this.newBoard(board, move, player);
    }
    console.log(`Oops, I don\'t think that move is possible`);
    this.inviteInput();
  }
}

module.exports.welcome = function () {
  console.log('\nWelcome to Tic Tac Toe!');
  console.log('You\'re X. Let\'s play');
}

module.exports.show = function (board) {
  board = board.map(function (pos) {
    return pos === 'e' ? ' '
    : pos === 'X' ? 'X'
    : 'O';
  });
  console.log(
    '\n  ' + board[0] + ' |' + ' ' + board[1] + ' |' + ' ' + board[2] +
    '\n ===+===+===\n' +
    '  ' + board[3] + ' |' + ' ' + board[4] + ' |' + ' ' + board[5] +
    '\n ===+===+===\n' +
    '  ' + board[6] + ' |' + ' ' + board[7] + ' |' + ' ' + board[8]) + '\n';
}

module.exports.finishGame = function (gameOver) {
  if(gameOver === 1) {
    console.log('Computer wins! Better luck next time');
  } else if (gameOver === -1) {
    console.log('You win!');
  } else if (gameOver === 0) {
    console.log('It\'s a draw!');
  }
  // process.exit();
}

module.exports.setMarkers = function (userInput) {
  let computer = '';
  let opponent = '';
  if(userInput === 'X' || userInput === 'x') {
    computer = 'O';
    opponent = 'X';
  } else if (userInput === 'O' || userInput === 'o') {
    computer = 'X';
    opponent = 'O';
  } else {
    console.log('Oops, you seem to have mistyped. How about you be X');
    computer = 'O';
    opponent = 'X';
  }
  return opponent;
}

module.exports.manageInputs = function (input) {
  return input.toString().trim();
}

module.exports.initialBoard = function () {
  return ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
}
