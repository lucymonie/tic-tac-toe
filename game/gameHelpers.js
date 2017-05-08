module.exports.patternWin = [[/OOO....../,'O'], [/...OOO.../,'O'], [/......OOO/,'O'], [/O..O..O../,'O'],
                             [/.O..O..O./,'O'], [/..O..O..O/,'O'], [/O...O...O/,'O'], [/..O.O.O../,'O'],
                             [/XXX....../,'X'], [/...XXX.../,'X'], [/......XXX/,'X'], [/X..X..X../,'X'],
                             [/.X..X..X./,'X'], [/..X..X..X/,'X'], [/X...X...X/,'X'], [/..X.X.X../,'X']];

module.exports.checkEnd = function (board, player) {
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

module.exports.setOutcome = function (game, winner) {
  let updatedGame = Object.assign({}, game);
  if (winner === 1 || winner === -1) {
    updatedGame.gameStatus = 'winner';
  } else if (winner === 0) {
    updatedGame.gameStatus = 'draw';
  }
  return updatedGame;
}

module.exports.getNewBoard = function (board, move, player) {
  let newBoardState = Object.assign([], board);
  newBoardState.splice(move, 1, player);
  return newBoardState;
}

module.exports.togglePlayer = function (player) {
  return player === 'X'
  ? 'O'
  : 'X';
}

module.exports.getStatement = function (game) {
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

module.exports.setMarkers = function (userInput, game) {
  let updatedGame = Object.assign({}, game);
  let player1 = '';
  let player2 = '';
  if(userInput === 'X' || userInput === 'x') {
    updatedGame.player1 = 'O';
    updatedGame.player2 = 'X';
  } else if (userInput === 'O' || userInput === 'o') {
    updatedGame.player1 = 'X';
    updatedGame.player2 = 'O';
  } else {
    this.render('Oops, you seem to have mistyped. How about you be X');
    updatedGame.player1 = 'O';
    updatedGame.player2 = 'X';
  }
  return updatedGame;
}

module.exports.Game = function () {
  this.welcome = `\nWelcome to Tic Tac Toe! You\'re X. Let\'s play!\n`;
  this.inviteMove = '\nPlease choose a move [1-9]: ';
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
