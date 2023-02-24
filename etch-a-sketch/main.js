let color = 'black';
let black = document.querySelector('.black');
let blue = document.querySelector('.blue');
let fancy = document.querySelector('.fancy');
let clear = document.querySelector('.clear');

black.addEventListener('click', function() {
    color = 'black';
});
fancy.addEventListener('click', function() {
    color = 'fancy';
});
blue.addEventListener('click', function() {
    color = 'blue';
})
clear.addEventListener('click', clearthem);

let draw = false;

document.addEventListener('DOMContentLoaded', function() {
    let grid = document.querySelector('.container');
    grid.addEventListener('click', function() {
        draw = !draw;
    })
    let popup = document.querySelector('.select');
    popup.addEventListener('click', function() {
        let size = getTheSize();
        createBoard(size);
    })
});

function createBoard(size) {
    let sketchpad = document.querySelector('.container');
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchpad.gridTemplateRows = `repeate(${size}, 1fr)`;

    let theDivs = size * size;
    for (let i = 0; i < theDivs; i++) {
        let div = document.createElement('div');
        div.addEventListener('mouseover', colorIt);
        sketchpad.appendChild(div);
    }
}

function getTheSize() {
    let message = document.querySelector('#message');
    let size = prompt("Enter the size you want");
    if (size == '')
        message.textContent = 'Please provide a number';
    else if (size < 1 || size > 100)
        message.textContent = 'Enter a value between 1 and 100';
    else {
        message.textContent = 'Now you can play!';
        return size;
    }
}

function colorIt() {
    if (draw) {
        if (color == 'black')
            this.style.backgroundColor = 'black';
        else if (color == 'fancy')
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        else 
            this.style.backgroundColor = '#3498db';
    }
}

function clearthem() {
    let squares = document.querySelectorAll('div');
    squares.forEach((square) => square.style.backgroundColor = 'white');
}