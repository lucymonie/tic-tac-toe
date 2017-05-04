const helpers = require('./gameHelpers.js');
const humanPlayer = require('./humanPlayer.js');
const aiPlayer = require('./aiPlayer.js');

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
  game = humanPlayer.manageHumanMove(game);
  let winner = helpers.checkTerminal(game.board, game.player);
    if (winner !== null) {
      helpers.notifyOutcome(game, winner);
      process.exit();
    }
  board = helpers.getBoardForTerminal(game.board);
  helpers.render(board);
  game.player = helpers.togglePlayer(game.player);
  game = aiPlayer.getMove(game);
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
