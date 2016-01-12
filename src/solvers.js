/*          _
 ___  ___ | |_   _____ _ __ ___
 / __|/ _ \| \ \ / / _ \ '__/ __|
 \__ \ (_) | |\ V /  __/ |  \__ \
 |___/\___/|_| \_/ \___|_|  |___/

 */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting
//base case, no more rows to put pieces in, number of pieces on the board, check for conflicts as you put pieces as the board

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  var solution = []; //fixme

  var newBoard = new Board({n: n});

  for (var i = 0; i < newBoard.rows().length; i++) {
    newBoard.togglePiece(i, i);
  }

  solution.push(newBoard.rows());

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  // create a board to work with
  var board = new Board({n: n});

  //find a solution
  var findSolution = function (row) {
    // if all rows exhausted
    if (row === n){
      // increment solution count
      solutionCount++;
      // stop
      return;
    }

    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyRooksConflicts()){
        // unplace piece}
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


/*var state = [0, 1];
 var subMatrixSolution = function (superPosition, currentSolution) {
 if (superPosition === 0) {
 solution.push([]);
 } else if (superPosition === 1) {
 solution.push([1]);
 } else if (superPosition > 1) {
 for (var i = 0; i < state.length; i++) {
 var currentState = state[i];
 subMatrixSolution(superPosition, currentSolution.concat(currentState));
 }
 if (!currentSolution.hasAnyRooksConflicts()) {
 solution.push(currentSolution);
 }
 }
 };
 subMatrixSolution(n, []);


 var rps = function (rounds) {
 // rounds can be defaulted to 3, or anything passed in the function
 rounds = rounds || 3; // n
 // the outcomes to return once manipulated.
 var outcomes = []; // solutions
 // the option in a basic "Rock, Paper, Scissors" game.
 var plays = ["rock", "paper", "scissors"]; // state


 // A recursively called helper function that calculates all the outcomes.
 // roundsToGo is equal to rounds once combo is invoked
 var combos = function (roundsToGo /!* n, initially *!/, playedSoFar) {
 // initially, roundsToGo is at 3; so the if statement is ignored.
 if (roundsToGo === 0) {
 outcomes.push(playedSoFar);
 return;
 }
 for (var i = 0; i < plays.length; i++) { // loop over the states
 var currentPlay = plays[i]; // a given state
 combos(roundsToGo - 1, playedSoFar.concat(currentPlay));
 }
 };

 combos(rounds, []);
 return outcomes;

 };*/
/*if (n === 1) {
 solution.push([1]);
 } else if (n === 2) {
 solution.push([0, 1],
 [1, 0]);
 } else if (n === 3) {
 solution.push([1, 0, 0],
 [0, 1, 0],
 [0, 0, 1]);
 } else if (n === 4) {
 solution.push([1, 0, 0, 0],
 [0, 1, 0, 0],
 [0, 0, 1, 0],
 [0, 0, 0, 1]);
 }*/