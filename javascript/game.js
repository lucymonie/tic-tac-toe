const fs = require('fs');
const helpers = require('./helpers.js');
const aiHelpers = require('./aiHelpers.js');
const players = require('./players.js');

let game = new helpers.Game();
game.welcome();
process.stdout.write(game.inviteMove + '\n');
helpers.show(game.board);

function gameLoop (game) {
  process.openStdin().on('data', playTerminalGame);
}

let playTerminalGame = function(str) {
  game.move = Math.abs(+str.toString().trim())-1;
  let winner = helpers.checkTerminal(game.board, game.player);
    if (winner !== null) {
      // This process is repeated and probably should be put into a function
      if (winner === 1 || winner === -1) {
        game.gameStatus = 'winner';
      } else if (winner === 0) {
        game.gameStatus = 'draw';
      }
      helpers.show(game.board);
      helpers.finishGame(game);
    }
    game = players.getHumanMove(game);
    helpers.show(game.board);
    game.player = helpers.togglePlayer(game.player);
    game = players.getComputerMove(game);
    helpers.show(game.board);
    game.player = helpers.togglePlayer(game.player);
}

gameLoop(game);
