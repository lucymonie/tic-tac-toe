const helpers = require('./helpers.js');
const players = require('./players.js');

let game = new helpers.Game();
let welcome = game.welcome();
helpers.render(welcome);
process.stdout.write(game.inviteMove + '\n');
let board = helpers.getBoardForTerminal(game.board);
helpers.render(board);

function gameLoop () {
  process.openStdin().on('data', playTerminalGame);
}

let playTerminalGame = function(str) {
  game.move = Math.abs(+str.toString().trim())-1;
  game.board = helpers.newBoard(game.board, game.move, game.player);
  let winner = helpers.checkTerminal(game.board, game.player);
    if (winner !== null) {
      helpers.notifyOutcome(game, winner);
      process.exit();
    }
    game = players.getHumanMove(game);
    winner = helpers.checkTerminal(game.board, game.player);
      if (winner !== null) {
        helpers.notifyOutcome(game, winner);
        process.exit();
      }
    board = helpers.getBoardForTerminal(game.board);
    helpers.render(board);
    game.player = helpers.togglePlayer(game.player);
    game = players.getComputerMove(game);
    winner = helpers.checkTerminal(game.board, game.player);
      if (winner !== null) {
        helpers.notifyOutcome(game, winner);
        process.exit();
      }
    board = helpers.getBoardForTerminal(game.board);
    helpers.render(board);
    game.player = helpers.togglePlayer(game.player);
}

gameLoop(game);
