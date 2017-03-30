# Tic Tac Toe

### About the code
- This is a terminal game adapted from an existing code base using Node.js
- If you want to use the game, first clone the repo, cd into the folder and run `npm install`
- To play, enter `npm run play`
- to run the tests, enter `npm run test`

## Requested features
### Difficulty level
**Problem**: the game is supposed to be played at a difficulty level of 'hard', meaning the computer
player cannot be beaten.  

**Solution**: I did some research and the best-practice solution is a minimiax algorithm. I have put in place some code the does quite a good job though it isn't recursive - it looks at all possible next moves on the board for a potential win or loss outcome.

### Communication
**Problem**: the game did not communicate with the player about its choice of move, and the board itself is unclear.  

**Solution**:
- I changed the numbering of positions on the board from 0-8 to 1-9, which seems more intuitive.
- I added a welcome message and comments from the computer about which move it was choosing, so game play is now narrated a little.
- I added messages about the end of play, whether the game was brought to an end by a win or a draw.

### Player choices
**Problem**: the user should be able to choose the player type, which player goes first, and which symbol to use (traditionally 'X' and 'O').  

**Solution**: I added code that gives potential to adapt the game to these requirements, though they are not currently implemented

### Testing
**Problem**: the code was difficult to maintain as there were no unit tests.  

**Soution**: I have written unit tests for all the helper functions.

### Error handling
**Problem**: the game does not gracefully handle bad user input.  

**Solution**: I did not implement a solution to this problem as most of my solutions resulted in other game-flow problems. If I were to continue building this game in the terminal I would probably implement a stdin validation tool (available in some npm modules for managing standard input/output).

## Next steps
### User interface
I completed this challenge in Javascript and Node.js, which is best adapted for the browser. I would suggest that all remaining issues could be resolved by creating a web UI for the game. In this context error handling and player choices could be implemented gracefully.  

### Language choice
Javascript/Node does offer terminal capabilities but my impression is that these are less mature than a language like Ruby with its native get-string function 'gets'.  

By comparison, the terminal isn't a particuarly nice context for a Node game. Node seems set up to offer basic http functionality and the ability to handle streams. However, it's been fun to explore some npm packages that work with standard input and output though none that I tried ultimately solved the issues. Of those I tried, I found one called 'prompt' to be most promising, particularly because it offers validation.
