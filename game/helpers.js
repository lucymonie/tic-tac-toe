module.exports.patternWin = [[/OOO....../,'O'], [/...OOO.../,'O'], [/......OOO/,'O'], [/O..O..O../,'O'],
                             [/.O..O..O./,'O'], [/..O..O..O/,'O'], [/O...O...O/,'O'], [/..O.O.O../,'O'],
                             [/XXX....../,'X'], [/...XXX.../,'X'], [/......XXX/,'X'], [/X..X..X../,'X'],
                             [/.X..X..X./,'X'], [/..X..X..X/,'X'], [/X...X...X/,'X'], [/..X.X.X../,'X']];

module.exports.checkTerminal = function (board, player) {
  let boardString = board.join('');
  let winner = this.checkWinner(boardString);
    if (winner) {
      if (winner === player) {
        return 1;
      } else if (winner !== player) {
        return -1;
      }
    } else if (boardString.indexOf('e') === -1) {
      return 0;
    }
  return null;
}

module.exports.checkWinner = function (boardString) {
	let winner;
  this.patternWin.forEach(function(pattern) {
    if (pattern[0].test(boardString))
      winner = pattern[1];
  });
  return winner;
}

module.exports.notifyOutcome = function (game, winner) {
  let updatedGame = Object.assign({}, game);
  if (winner === 1 || winner === -1) {
    updatedGame.gameStatus = 'winner';
  } else if (winner === 0) {
    updatedGame.gameStatus = 'draw';
  }
  let board = this.getBoardForTerminal(updatedGame.board);
  this.render(board);
  let result = this.finishGame(updatedGame);
  this.render(result);
  process.exit();
  return updatedGame;
}

module.exports.newBoard = function (board, move, player) {
  let newBoardState = Object.assign([], board);
  newBoardState.splice(move, 1, player);
  return newBoardState;
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

module.exports.togglePlayer = function (player) {
  return player === 'X'
  ? 'O'
  : 'X';
}

module.exports.checkMoveIsAvailable = function (board, move) {
  if (move >= 0 && move <= 8 && !isNaN(move) && board[move] === 'e') {
    return true;
  }
  return false;
}

module.exports.getBoardForTerminal = function (board) {
  board = board.map(function (pos) {
    if(pos === 'X') return 'X';
    else if(pos === 'O') return 'O';
    else return ' ';
  });
  return '\n  ' + board[0] + ' |' + ' ' + board[1] + ' |' + ' ' + board[2] +
         '\n ===+===+===\n' +
         '  ' + board[3] + ' |' + ' ' + board[4] + ' |' + ' ' + board[5] +
         '\n ===+===+===\n' +
         '  ' + board[6] + ' |' + ' ' + board[7] + ' |' + ' ' + board[8] + '\n';
}

module.exports.render = function (string) {
  console.log(string);
  return 1;
}

module.exports.finishGame = function (game) {
  if (game.gameStatus === 'winner') {
    if (game.player1.isComputer === true && game.player1.marker === game.player
      || game.player2.isComputer === true && game.player.marker === game.player) {
      return 'Computer wins! Better luck next time';
    } else if(game.player1.isComputer === false && game.player1.marker === game.player
      || game.player2.isComputer === false && game.player2.marker === game.player) {
      return 'You win!';
    }
  } else if (game.gameStatus === 'draw') {
    return 'It\'s a draw!';
  }
}

module.exports.setMarkers = function (userInput) {
  let player1 = '';
  let player2 = '';
  if(userInput === 'X' || userInput === 'x') {
    player1 = 'O';
    player2 = 'X';
  } else if (userInput === 'O' || userInput === 'o') {
    player1 = 'X';
    player2 = 'O';
  } else {
    this.render('Oops, you seem to have mistyped. How about you be X');
    player1 = 'O';
    player2 = 'X';
  }
  return player2;
}

module.exports.Game = function () {
  this.inviteMove = 'Please choose a move [1-9]: '
  this.board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
  this.gameStatus = null;
  this.player = 'X';
  this.player1 = {
    marker: 'O',
    isComputer: true
  };
  this.player2 = {
    marker: 'X',
    isComputer: false
  };
}

module.exports.Game.prototype.welcome = function () {
  return `\nWelcome to Tic Tac Toe! You\'re ${this.player}. Let\'s play`;
}
