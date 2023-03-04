'use strict';

const theGame = function() {
    let roundNumber = 1;
    let board = document.querySelectorAll('.cell');
    let turn = true;
    const grid = [];
    let i = 0;
    let playerOne = 0;
    let playerTwo = 0;
    let emptyCells = 0;
    for (let cell of board) {
        grid[i++] = cell;
        cell.addEventListener('click', function() {
            if (cell.textContent != '') {
                cell.style.backgroundColor = 'red';
                setTimeout(() => {
                    cell.style.backgroundColor = '#E2E8F0';
                }, 500);
            }
            else {
                if (turn) {
                    cell.textContent = 'X';
                    turn = !turn;
                }
                else {
                    cell.textContent = 'O';
                    turn = !turn;
                }
                checkTheWinner(turn);
            }
        });
    }
    const checkTheWinner = function(turn) {
        let probabilities = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < 8; i++) {
            if (grid[probabilities[i][0]].textContent != '' && (grid[probabilities[i][0]].textContent == 
                grid[probabilities[i][1]].textContent &&
                grid[probabilities[i][0]].textContent == grid[probabilities[i][2]].textContent &&
                grid[probabilities[i][1]].textContent == grid[probabilities[i][2]].textContent)) {
                    endtheGame(turn);
                }
        }
        checkForTie();
    };

    const endtheGame = function(turn) {
       let popup = document.querySelector('.game-over');
       setTimeout(() => {
           popup.style.display = 'flex';
       }, 400);
       let message = document.querySelector('#message');
       if (turn) {
            playerTwo++;
            message.textContent = 'Player 2 Won (:';
       }
       else {
            playerOne++;
            message.textContent = 'Player 1 Won (:';
        }
       document.body.style.backgroundColor = '#E2E8F0';
    }

    const checkForTie = function() {
        let fail = true;
        for (let i = 0; i < 9; i++) {
            if (grid[i].textContent === '') {
                fail = false;
            }
        }
        if (fail) {
            let popup = document.querySelector('.game-over');
            setTimeout(() => {
                popup.style.display = 'flex';
            }, 400);
            let message = document.querySelector('#message');
            message.textContent = 'Tie! :)';
            document.body.style.backgroundColor = '#E2E8F0';
            let playerOneScore = document.querySelector('#player-1-score');
            let playerTwoScore = document.querySelector('#player-2-score');
            playerOneScore.textContent = 'Score: ' + playerOne;
            playerTwoScore.textContent = 'Score: ' + playerTwo;
        }
    };
    let round = document.querySelector('#newRound');
    round.addEventListener 
    round.addEventListener('click', function() {
        document.body.style.backgroundColor = 'white';
        let popup = document.querySelector('.game-over');
        popup.style.display = 'none';
        for (let i = 0; i < 9; i++) {
            grid[i].textContent = '';
        }
        roundNumber++;
        let playerOneScore = document.querySelector('#player-1-score');
            let playerTwoScore = document.querySelector('#player-2-score');
            playerOneScore.textContent = 'Score: ' + playerOne;
            playerTwoScore.textContent = 'Score: ' + playerTwo;
        let roundDetail = document.querySelector('#round');
        roundDetail.textContent = 'Round ' + roundNumber;
    });
}();

