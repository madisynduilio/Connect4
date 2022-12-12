// Create function set variables

(function (w, d) {
  "use strict";
  var players = ["red", "yellow"];
  var numPlayer;
  var numTries;
  var columns = [];
  var columnWin = [];
  var theCells = [];
  var redScore = 0;
  var yellowScore = 0;

    //Creating the game
  theCells = Array.from(d.querySelectorAll(".connect4 > div"));

  for (var i = 0; i < theCells.length; i++) {
    theCells[i].classList.add("c" + i);
  }

  init();

  var handleClick = (e) => {
   
    var active = d.querySelector(".connect4 .active");

    // Drop piece in column and check for winner
    if (active) active.classList.remove("active");
    e.currentTarget.classList.add("active");
    dropPiece(e.currentTarget.className);
    checkWinner();
  };

  function dropPiece(theClass) {
    var theCol = theClass.substring(1, 3);
    var theColumn = Number(theCol) % 7;

    // Players turns
    var player = players[(numPlayer = ++numPlayer % 2)];


    for (let i = 0; i < 7; i++) {
      if (theColumn === i) {
   // make sure column has empty spaces
        if (columns[i].length === 0) {
          player = players[(numPlayer = ++numPlayer % 2)];
          break;
        }
        
        d.querySelector(
          "div.c" + columns[i][columns[i].length - 1]
        ).classList.add("filled", player);
       
        columnWin[columns[i].length - 1][i] = player;
        columns[i].splice(columns[i].length - 1, 1);
     
        ++numTries;
      }
    }
  }

  function checkWinner() {
    // cycle through to find winners twice for each color

    var x = 0;
    var winnerName = 'red';
    var i;
    var j;
    var k;
    //used like a bool
    var win = 1;
    
    //&& win with each position to check for 4 in a row
    for (k = 0; k < 2; k++) {
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 4; j++) {
          win = (columnWin[i][j] === winnerName);
          win = win && (columnWin[i][j + 1] === winnerName);
          win = win && (columnWin[i][j + 2] === winnerName);
          win = win && (columnWin[i][j + 3] === winnerName);
          if (win) {
            showWinner(winnerName);
          }
        }
      }
      //vertical
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 7; j++) {
          win = (columnWin[i][j] === winnerName);
          win = win && (columnWin[i+1][j] === winnerName);
          win = win && (columnWin[i+2][j] === winnerName);
          win = win && (columnWin[i+3][j] === winnerName);
          if (win) {
            showWinner(winnerName);
          }
        }
      }
      // Find Winner
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 7; j++) {
          win = (columnWin[i][j] === winnerName);
          win = win && (columnWin[i+1][j+1] === winnerName);
          win = win && (columnWin[i+2][j+2] === winnerName);
          win = win && (columnWin[i+2][j+2] === winnerName);
          if (win) {
            showWinner(winnerName);
          }
        }
      }


      for (i = 0; i < 3; i++) {
        for (j = 3; j < 7; j++) {
          win = (columnWin[i][j] === winnerName);
          win = win && (columnWin[i+1][j-1] === winnerName);
          win = win && (columnWin[i+2][j-2] === winnerName);
          win = win && (columnWin[i+3][j-3] === winnerName);
          if (win) {
            showWinner(winnerName);
          }
        }
      }
      //Change winner name to check if yellow won
      winnerName = "yellow";
    }
    if (numTries > 41) {
      showWinner("No One");
      return;
    }
  }
 
  function showWinner(playername) {
    d.querySelector(".board").classList.add("winner", playername);
    if (playername === "red") {
      ++redScore;
      d.querySelector("#rscore").textContent = redScore;
    } if (playername === "yellow") {
      ++yellowScore;
      d.querySelector("#yscore").textContent = yellowScore;
    }
  }
  //add click event to each square
  theCells.forEach((node) => {
    node.addEventListener("click", handleClick);
  });

  d.getElementById("reset").addEventListener("click", playAgain);

  function playAgain() {
    init();
  }

  function init() {
    numPlayer = 1;
    numTries = 0;

    // Vertical columns
    columns = [
      ["0", "7", "14", "21", "28", "35"],
      ["1", "8", "15", "22", "29", "36"],
      ["2", "9", "16", "23", "30", "37"],
      ["3", "10", "17", "24", "31", "38"],
      ["4", "11", "18", "25", "32", "39"],
      ["5", "12", "19", "26", "33", "40"],
      ["6", "13", "20", "27", "34", "41"]
    ];

    //This array keeps track of tokens and is used to keep track of winners
    columnWin = [
      ["0", "6", "12", "18", "24", "30", "36"],
      ["1", "7", "13", "19", "25", "31", "37"],
      ["2", "8", "14", "20", "26", "32", "38"],
      ["3", "9", "15", "21", "27", "33", "39"],
      ["4", "10", "16", "22", "28", "34", "40"],
      ["5", "11", "17", "23", "29", "35", "41"]
    ];

    // reset if new game
    for (var i = 0; i < theCells.length; i++) {
      theCells[i].classList.remove(
        "active",
        "red",
        "yellow",
        "filled"
      );
    }

    d.querySelector(".board").classList.remove(
      "winner",
      "red",
      "yellow",
      "noplayer"
    );
  }
})(window, document);
