"use strict";

const game = ['Rock', 'Paper', 'Scissor'];

function getComputerChoice() {
    return game[Math.floor(Math.random() * 3)];
}

function getPlayerSelection() {
    return playerSelection;
}

const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissor = document.querySelector('#scissor');

const playerCounter = document.querySelector('#playerCounter');
const computerCounter = document.querySelector('#computerCounter');
const score = document.querySelector('#score');

const currentPlayerWeapon = document.querySelector('#playerSelection');
const currentComputerWeapon = document.querySelector('#computerSelection');

let playerSelection = '';
rock.addEventListener('click', function() {
    playerSelection = 'Rock';
    playTheGame();
});

paper.addEventListener('click', function() {
    playerSelection = 'Paper';
    playTheGame();
});

scissor.addEventListener('click', function() {
    playerSelection = 'Scissor';
    playTheGame();
});

function playRound(computerSelection, playerSelection) {
    if (playerSelection == computerSelection)
        return 'Tie!';
    else if (playerSelection == 'Rock' && computerSelection == 'Paper')
        return 'You Lose! Paper beats rock';
    else if (playerSelection == 'Rock' && computerSelection == 'Scissor')
        return 'You Won! Rock beats Scissor';
    else if (playerSelection == 'Paper' && computerSelection == 'Rock')
        return 'You Won! Paper beats Rock';
    else if (playerSelection == 'Paper' && computerSelection == 'Scissor')
        return 'You Lose! Scissor beats Paper';
    else if (playerSelection == 'Scissor' && computerSelection == 'Paper')
        return "You Won! Scissor beats Paper";
    else if (playerSelection == 'Scissor' && computerSelection == 'Rock')
        return "You Lose! Rock beats Scissor";
    else
        return "Something Wrong!";
}

let computerSelection = '';
function thegame() {
    computerSelection = getComputerChoice();
    return playRound(computerSelection, playerSelection);
}

let computer = 0,
    human = 0;

let times = 5;

function playTheGame() {
    if (times > 0) {
        let result = thegame();
        if (result.includes("Won"))
            human++;
        else if (result.includes("Lose"))
            computer++;
        score.textContent = result;
        currentPlayerWeapon.textContent = playerSelection;
        currentComputerWeapon.textContent = computerSelection;
    }
    
    playerCounter.textContent = human;
    computerCounter.textContent = computer;
    if (!times) {
        if (computer > human)
            score.textContent = 'You Lose! :(';
        else if (computer < human)
            score.textContent = 'You Won! (:';
        else
            score.textContent = 'Tie!';
    }
    times--;    
}
function resetTheGame() {
    computer = 0;
    human = 0;
    times = 5;
    score.textContent = 'Choose your weapon';
    playerCounter.textContent = 0;
    computerCounter.textContent = 0;
    currentPlayerWeapon.textContent = '';
    currentComputerWeapon.textContent = ''; 
}