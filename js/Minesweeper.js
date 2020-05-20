'use strict'
// const GAME_FREQ = 1000;
const MINE = '💣';
const FLAG = '🚩';
const GAMEDIFFICULTY = 4;
// The Model
var gBoard;
var gFirstClick;//used to clean from mine the first cell that we click on
// This is an object by which the board size is set
var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    // Boolean, when true we let the user play
    isOn: false,
    // How many cells are shown
    shownCount: 0,
    // How many cells are marked (with a flag)
    markedCount: 0,
    //  How many seconds passed
    secsPassed: 0
}
//&#128523
function init() {
    gFirstClick = true;
    var elTBtn = document.querySelector('.playAgain')
    elTBtn.innerText = '😊';
    gBoard = BuildBoard();
    renderBoard(gBoard)
}
function BuildBoard() {
    var boardLength = 2 * GAMEDIFFICULTY
    var board = [];
    for (var i = 0; i < boardLength; i++) {
        board.push([])
        for (var j = 0; j < boardLength; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isFlag: false };
            board[i][j] = cell;
            if (Math.random() > 0.5) cell.isMine = true;

        }
    }
    for (var i = 0; i < boardLength; i++) {
        for (var j = 0; j < boardLength; j++) {
            var mines = setMinesNegsCount(i, j, board)
            board[i][j].minesAroundCount = mines
        }
    }

    return board;
}
function renderBoard(board) {
    //console.table(board);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var viewer;
            if (board[i][j].isMine === true) {
                viewer = MINE;
            }
            else {
                viewer = board[i][j].minesAroundCount;
            }
            var className = 'cell'
            var tdId = `cell-${i}-${j}`;
            //Disable the menu when right clicking, FROM THE WEB
            if (document.addEventListener) {
                document.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                }, false);
            } else {
                document.attachEvent('oncontextmenu', function () {
                    window.event.returnValue = false;
                });
            }
            /////////////////////////////////////////////////
            strHTML += `<td id="${tdId}" class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})"</td>`


            // console.log(board[i][j]);
        }

        strHTML += '</tr>'
    }

    var elTbody = document.querySelector('.board');
    elTbody.innerHTML = strHTML;

}
function setMinesNegsCount(cellI, cellJ, mat) {
    var minesAroundCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat.length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine === true) minesAroundCount++
        }
    }
    return minesAroundCount
}
function cellClicked(elTd, cellI, cellJ, event) {
    if (gFirstClick === true) {
        gBoard[cellI][cellJ].isMine = false;
        gBoard[cellI][cellJ].isShown = true;
        elTd.innerText = gBoard[cellI][cellJ].minesAroundCount;
        gFirstClick = false;

    }
    if (gBoard[cellI][cellJ].isShown === false) {
        if (gBoard[cellI][cellJ].isMine === true) {
            elTd.innerText = MINE;
            gBoard[cellI][cellJ].isShown = true;
            gameOver();
        }
        else {
            elTd.innerText = gBoard[cellI][cellJ].minesAroundCount;
            gBoard[cellI][cellJ].isShown = true;
        }
    }
}

function cellMarked(elTd, cellI, cellJ, event) {
    //console.log('right click!!!!')\

    if (!gBoard[cellI][cellJ].isFlag) {
        if (!gBoard[cellI][cellJ].isShown) {
            gBoard[cellI][cellJ].isFlag = true;
            elTd.innerText = FLAG;
        }
    }
    else {
        gBoard[cellI][cellJ].isFlag = false;
        gBoard[cellI][cellJ].isShown = false;
        elTd.innerText = '';
    }

}
function gameOver() {
    //console.table(board);
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown === true) var cell = gBoard[i][j].minesAroundCount;
            else var cell = '';
            if (gBoard[i][j].isMine === true)
                var cell = MINE;
            var className = 'cell';
            strHTML += `<td data-i="${i}" data-j="${j}"class="${className}">${cell}</td>`

        }
        strHTML += '</tr>'
    }

    var elTbody = document.querySelector('.board');
    elTbody.innerHTML = strHTML;
    var elTBtn = document.querySelector('.playAgain')
    var audioElement = new Audio('sound/0477.wav');
    audioElement.play();
    elTBtn.innerText = '🥺';

}



// function setMinesNegsCount(gBoard, cellI, cellJ) {

//     var minesCount = 0

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard.length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (gBoard[i][j].isMine === true) minesCount++
//         }
//     }
//     return minesCount
// }
// gIsGameOn = true;
// if (gGameInterval) clearInterval(gGameInterval)
// gGameInterval = setInterval(play, GAME_FREQ);

// function toggleGame(elBtn) {

//     if (gIsGameOn) {
//         gIsGameOn = false;
//         clearInterval(gGameInterval)
//         elBtn.innerText = '😄'
//     } else {
//         gIsGameOn = true;
//         gGameInterval = setInterval(play, GAME_FREQ);
//     }
// }


// function play() {
//     gBoard = runGeneration(gBoard);
//     renderBoard(gBoard);
// }

///model







// function blowUpNegs(cellI, cellJ, mat) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= mat[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (mat[i][j] === MINE) {
//                 // update the model:
//                 mat[i][j] = ''

//                 //update the dom:
//                 renderCell({ i: i, j: j }, '')
//             }
//         }
//     }
// }

// function renderCell(pos, value) {
//     var elTd = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`)
//     elTd.innerText = value
//     elTd.classList.remove('occupied')

// }


// function runGeneration(board) {
//     var newBoard = copyMat(board);
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var noOfNeighbors = countNeighbors(i, j, board);
//             if ((noOfNeighbors > 2) && (noOfNeighbors < 6)) {
//                 if (board[i][j] === '') newBoard[i][j] = MINE;
//             }
//             else if (board[i][j] === MINE) newBoard[i][j] = '';
//         }
//     }
//     return newBoard;
// }

// function countNeighbors(cellI, cellJ, mat) {
//     var neighborsSum = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= mat[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (mat[i][j]) neighborsSum++;
//         }
//     }
//     return neighborsSum;
// }





// 'use strict'
// const MINE = '*'
// var gBoard = []

// // This is an object by which the board size is set
// var gLevel = {

//     SIZE: 4,
//     MINES: 2

// }

// var gGame = {
//     // Boolean, when true we let the user play
//     isOn: false,
//     // How many cells are shown
//     shownCount: 0,
//     // How many cells are marked (with a flag)
//     markedCount: 0,
//     //  How many seconds passed
//     secsPassed: 0
// }


// function init() {
//     buildBoard(gBoard)
//     renderBoard(gBoard)
//     console.log(gBoard)
// }



// // Builds the board Set mines at random locations
// function buildBoard(board) {

//     for (var i = 0; i < gLevel.SIZE; i++) {
//         board[i] = []
//         for (var j = 0; j < gLevel.SIZE; j++) {

//             board[i][j] = {

//                 minesAroundCount: 0,
//                 isShown: false,
//                 isMine: false,
//                 isMarked: false
//             }
//         }
//     }

//     // placing mines
//     i = 0
//     while (i < gLevel.MINES) {
//         var rndIdxRow = getRandomIntInclusive(0, gLevel.SIZE-1)
//         var colIdxRow = getRandomIntInclusive(0, gLevel.SIZE-1)
//         if (gBoard[rndIdxRow][colIdxRow].isMine) continue
//         gBoard[rndIdxRow][colIdxRow].isMine = true
//         i++
//     }

//     // updating minds count for each cell when board is ready, might change after first clik
//     updateMindsCount()

//     return board
// }


// //  Render the board as a <table> to the page
// function renderBoard(gBoard) {

//     var strHtml = '';
//     for (var i = 0; i < gBoard.length; i++) {
//         var row = gBoard[i];
//         strHtml += '<tr>';
//         for (var j = 0; j < gBoard.length; j++) {
//             var cell = row[j];
//             var cellContent = (cell.isMine) ? MINE : cell.minesAroundCount
//             // figure class name
//             var className = 'cell'
//             var tdId = `cell-${i}-${j}`;
//             strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this, ${i}, ${j}, event)">
//                             ${cellContent}
//                         </td>`
//         }
//         strHtml += '</tr>';
//     }
//     var elBoard = document.querySelector('.game-board');
//     elBoard.innerHTML = strHtml;
// }

// // updating minds count after first click

// function updateMindsCount() {

//     for (var i = 0; i < gLevel.SIZE; i++) {
//         for (var j = 0; j < gLevel.SIZE; j++) {
//             var mines = setMinesNegsCount(gBoard, i, j)
//             gBoard[i][j].minesAroundCount = mines
//         }
//     }
// }

// // Count mines around each cell and set the cell's minesAroundCount
// function setMinesNegsCount(gBoard, cellI, cellJ) {

//     var minesCount = 0

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard.length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (gBoard[i][j].isMine === true) minesCount++
//         }
//     }
//     return minesCount
// }

// // Called when a cell (td) is clicked
// function cellClicked(elCell, i, j, event) {
//     // first click - if mind moves it, updating minds count... if is showncount = 0 its first click
//     updateMindsCount()
//     console.log (event)
//     // making sure cell content is a number
//     if ((elCell.innerText !== MINE) && (elCell.innerText !== '0')) {
//         gBoard[i][j].isShown = true
//         console.log(elCell.innerText)
//     }
// }

// // Called on right click to mark a cell (suspected to be a mine)
// // how to hide the context menu on right click?
// function cellMarked(elCell) {

// }

// // right left?
// // function mouseClicked(event) {
// //     if (!event.button) console.log('leftclick')
// //     else console.log('rightclick')
// // }

// // Game ends when all mines are marked, and all the other cells are shown
// function checkGameOver() {

// }

// // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// // start with a basic implementation that only opens the non-mine 1st degree neighbors, later recursion? bonus..
// function expandShown(board, elCell, i, j) {

// }

// // help functions

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
//   }