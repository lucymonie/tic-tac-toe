module.exports.listen = function () {
  return process.openStdin();
}

module.exports.write = function (string) {
  return process.stdout.write(string);
}

module.exports.render = function (string) {
  console.log(string);
  return 1;
}

module.exports.exit = function () {
  return process.exit();
}

module.exports.getBoard = function (board) {
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
