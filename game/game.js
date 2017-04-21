const helpers = require('./helpers.js');
const aiHelpers = require('./aiHelpers.js');
const players = require('./players.js');

let game = new helpers.Game();
let welcome = game.welcome();
console.log(welcome);
process.stdout.write(game.inviteMove + '\n');
let displayBoard = helpers.show(game.board);
console.log(displayBoard);

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
      let displayBoard = helpers.show(game.board);
      console.log(displayBoard);
      let result = helpers.finishGame(game);
      console.log(result);
      process.exit();
    }
    game = players.getHumanMove(game);
    displayBoard = helpers.show(game.board);
    console.log(displayBoard);
    game.player = helpers.togglePlayer(game.player);
    game = players.getComputerMove(game);
    displayBoard = helpers.show(game.board);
    console.log(displayBoard);
    game.player = helpers.togglePlayer(game.player);
}

gameLoop(game);
