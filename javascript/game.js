const fs = require('fs');
const helpers = require('./helpers.js');
const prompt = require('prompt');

let play = function () {
  let board = helpers.initialBoard();
  let player = 'X';
  let input;

  helpers.welcome();
  helpers.show(board);
  gameLoop(board, player);

  function gameLoop (board, player) {
    let gameOver = helpers.checkTerminal(board, player);
      if (gameOver !== null) {
        helpers.finishGame(gameOver);
      } else {
        prompt.start();
        console.log('Enter your choice [0-8] ');
        prompt.get(['position'], function (err, result) {
          input = result.position;
          input = helpers.manageInputs(input);
          board = helpers.checkMove(board, input, player);
          helpers.show(board);
          player = helpers.togglePlayer(player);
          board = helpers.getAiMove(board, player);
          if (typeof board === 'number') {
            helpers.finishGame(board);
          } else {
            helpers.show(board);
            player = helpers.togglePlayer(player);
            input = '';
            return gameLoop(board, player);
          }
        });
      }
  }
}

// Play is called
play()
