let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded', function() {
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previous = document.querySelector('.previous');
    let current = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', function(event) {
        handleNumber(event.target.textContent);
        current.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener('click', function(event) {
        if (currentValue != '') {
            handleOperator(event.target.textContent);
            previous.textContent = previousValue + ' ' + operator;
            current.textContent = '';
        }
    }));

    clear.addEventListener('click', function() {
        current.textContent = '';
        previous.textContent = '';
        currentValue = '';
        previousValue = '';
        operator = '';
    });

    equal.addEventListener('click', function() {
        if (currentValue != '' && previousValue != '') {
            calculator();
            previous.textContent = '';
            current.textContent = previousValue;
            currentValue = previousValue;
        }
    });

    decimal.addEventListener('click', function() {
        decimalPoint();
        current.textContent = currentValue;
    });
})

function handleNumber(number) {
    if (currentValue.length <= 7)
        currentValue += number;
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculator() {
    currentValue = Number(currentValue);
    previousValue = Number(previousValue);

    if (operator === '+')
        previousValue += currentValue;
    else if (operator == '-')
        previousValue -= currentValue;
    else if (operator == 'x')
        previousValue *= currentValue;
    else {
       
        previousValue /= currentValue;
    }
    previousValue = roundit(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
    console.log(previousValue);
}

function roundit(number) {
    return Math.round(number * 10000000000) / 10000000000;
}

function decimalPoint() {
    if (!currentValue.includes('.'))
        currentValue += '.';
}