# Tic Tac Toe

### About the code
- This is a terminal game adapted from an existing code base using Node.js
- If you want to use the game, first clone the repo, cd into the folder and run `npm install`
- To play, enter `npm run play`
- to run the tests, enter `npm test`

## Initial requirements
1. Game should be unbeatable
2. Improve communication about game flow
3. Player should have choice of marker
4. Platform adaptability (I/O)
5. Unit tests
6. Handle bad user input

## Feedback
### Tests
- The test runner does not complete unless you hit enter several times.
- There should be a test file for each game file, with tests for the respective functions.
- Test coverage is incomplete.
- There should be some sort of test coverage tool in place.

### Difficulty level
- The AI player is not unbeatable.

### Separation of concerns
- The game files are not currently separated consistently, and there should be a module for each player.
- In order to model game entities, players and I/O should be organised as classes.
- Rendering should be abstracted to a function so game is decoupled from terminal.

### Lint
- There are unsued variables in some files.

### File structure
- Package.json should be in the root folder, not in a subfolder.

## How I addressed these issues
### Tests
- I removed the prettifier tapspec, which solved the test run issue.
- After I refactored the player functions into separate files, I also reorganised the tests into mirroring files with 'test' in the file name.
- I implemented CodeCov to track test coverage.
- I added tests improve the test coverage.

The initial test coverage was as follows
```
=============================== Coverage summary ===============================
Statements   : 60.95% ( 64/105 )
Branches     : 55.17% ( 32/58 )
Functions    : 73.68% ( 14/19 )
Lines        : 60.19% ( 62/103 )
================================================================================
```

After I added more tests, the coverage assessment improved
```
=============================== Coverage summary ===============================
Statements   : 86.54% ( 135/156 )
Branches     : 68.89% ( 62/90 )
Functions    : 100% ( 25/25 )
Lines        : 86.36% ( 133/154 )
================================================================================
```

### Difficulty level
My ideal is to implement a minimax algorithm, and I have made progress towards understanding how to do this. In the meantime, I have added if/else statements to the getNaiveMove function that I believe make the AI player unbeatable. I have made some [notes on minimax](https://github.com/lucymonie/notes-learning/blob/master/03-june-2017/minimax.md) to record what I've learned.

### Separation of concerns
- I have separated the two player functions into different files.
- I abstracted rendering to a function so the game isn't so tightly coupled to the terminal.

### Lint
I installed eslint in my files to track syntax errors and unused variables.

### File structure
I reorganised my file structure so the package.json is in the root folder, and there are game and test folders.

## Additional issues
### Error handling
This was not part of the feedback, but in the course of this work I added an error property to my game state so the gameLoop function can now handle bad player input gracefully.
