const helpers = require('./gameHelpers.js');
const humanPlayer = require('./humanPlayer.js');
const aiPlayer = require('./aiPlayer.js');
const inputOutput = require('./terminalGame.js');

let game = new helpers.Game();
let board = inputOutput.getBoard(game.board);

inputOutput.render(game.welcome);
inputOutput.render(board);
inputOutput.write(game.inviteMove);

let playGame = function(str) {
  game.move = Math.abs(+str.toString().trim())-1;
  game = humanPlayer.manageMove(game);
  if (!game.error) {
    let winner = helpers.checkEnd(game.board, game.player);
      if (winner !== null) {
        manageEnding(game, winner);
      }
    board = inputOutput.getBoard(game.board);
    inputOutput.render(board);
    game.player = helpers.togglePlayer(game.player);
    game = aiPlayer.getMove(game);
    winner = helpers.checkEnd(game.board, game.player);
      if (winner !== null) {
        manageEnding(game, winner);
      }
    board = inputOutput.getBoard(game.board);
    inputOutput.render(game.statement);
    inputOutput.render(board);
    game.player = helpers.togglePlayer(game.player);
  } else {
    inputOutput.render(game.error);
    inputOutput.write(game.inviteMove);
    game.error = null;
    game.move = null;
  }
}

let manageEnding = function (game, winner) {
  game = helpers.setOutcome(game, winner);
  let board = inputOutput.getBoard(game.board);
  let result = helpers.getStatement(game);
  inputOutput.render(board);
  inputOutput.render(result);
  inputOutput.exit();
}

inputOutput.listen().on('data', playGame);
