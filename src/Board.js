// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
     _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
     / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
     \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
     |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
     =                 TODO: fill in these Helper Functions                    =
     =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      if (this.get(rowIndex).indexOf(1) === -1) {
        return false;
      }
      var rowConflictCounter = 0;
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        if (this.get(rowIndex)[i] === 1) {
          rowConflictCounter++;
        }
      }
      if (rowConflictCounter > 1) {
        return true;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var anyConflictCounter = 0;
      for (var j = 0; j < this.rows().length; j++) {
        if (this.hasRowConflictAt(j)) {
          anyConflictCounter++;
        }
      }
      return anyConflictCounter > 0;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var columnConflictCounter = 0;
      for (var k = 0; k < this.rows().length; k++) {
        if (this.rows()[k][colIndex] === 1) {
          columnConflictCounter++;
        }
      }
      if (columnConflictCounter > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var anyColumConflictCounter = 0;
      for (var l = 0; l < this.rows().length; l++) {
        if (this.hasColConflictAt(l)) {
          anyColumConflictCounter++;
        }
      }
      return anyColumConflictCounter > 0;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var majorDiagonalConflictCounter = 0;
      var diagonalIndex = majorDiagonalColumnIndexAtFirstRow;
      for (var m = 0; m < this.rows().length; m++) {
        if (this.get(m)[diagonalIndex]) {
          majorDiagonalConflictCounter++;
        }
        diagonalIndex++;
      }
      if (majorDiagonalConflictCounter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var anyMajorDiagonalConflictCounter = 0;
      for (var n = 0; n < this.rows().length; n++) {
        for (var o = 0; o < this.rows()[n].length; o++) {
          if (this.hasMajorDiagonalConflictAt(o)) {
            anyMajorDiagonalConflictCounter++;
          }
        }
      }
      if (anyMajorDiagonalConflictCounter > 1) {
        return true;
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var minorDiagonalConflictCounter = 0;
      var minorDiagonalIndex = minorDiagonalColumnIndexAtFirstRow;
      for (var p = 0; p < this.rows().length; p++) {
        if (this.get(p)[minorDiagonalIndex]) {
          minorDiagonalConflictCounter++;
        }
        minorDiagonalIndex--;
      }
      if (minorDiagonalConflictCounter > 1) {
        return true;
      }
      return false;
    },


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var anyMinorDiagonalConflictCounter = 0;
      for (var q = this.rows().length - 1; q > -1; q--) {
        for (var r = this.rows()[q].length - 1; r > -1; r--) {
          if (this.hasMinorDiagonalConflictAt(r)) {
            anyMinorDiagonalConflictCounter++;
          }
        }
      }
      if (anyMinorDiagonalConflictCounter > 1) {
        return true;
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
