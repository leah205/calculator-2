const btnContainer = document.querySelector('.btn-container');
const numberBtns = btnContainer.querySelectorAll('.digit');
const operatorBtns = btnContainer.querySelectorAll('.operator');
const equalsBtn = btnContainer.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const btns = btnContainer.querySelectorAll('button');
const displayText = document.querySelector('.calc-text');
const answerText = document.querySelector('.answer-text');
let displayValue = '';
let firstNum = 0;
let secondNum = 0;
let operator = null;
let answer = false;

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pressNumberBtn(btn);
        
    })
    
})

clearBtn.addEventListener('click', () => {
    displayText.textContent = '';
    firstNum = 0;
    secondNum = 0;
    operator = null;
    answer = false;
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pressOperatorBtn(btn);
    })
})

equalsBtn.addEventListener('click', () => {
    pressEqualsBtn();
})

function pressNumberBtn(btn){
    if(answer == true){
        displayText.textContent = btn.textContent;
        answer = false;
    }
    else{
        if(displayText.textContent.includes(".") && btn.textContent == ".") return;
        displayText.textContent += btn.textContent;
    }
    displayValue += btn.textContent;
}

function pressOperatorBtn(btn){
    if(operator){
        calculateAnswer();
    }
    else{
        firstNum = displayText.textContent;
        displayText.textContent = '';
    }
    operator = findOperator(btn.textContent);
}

function pressEqualsBtn(){
    calculateAnswer();
    operator = null;
   
}

function findOperator(operation){
    switch(operation){
        case '+':
            return add;
        case '/':
            return divide;
        case '-':
            return substract;
        case 'X': 
            return multiply;
        default:
            return add;

    }
}

function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    return operator(a, b);
}

function calculateAnswer(){
    secondNum = displayText.textContent;

    if(!operator ){
        answer = true;
        return;
    };
    if(!firstNum || firstNum == 'ERROR') firstNum = 0;
    if(!secondNum || answer == true){
        secondNum = 0;
    }

    if(secondNum == 0 && operator == divide){
        displayText.textContent = 'ERROR';
        firstNum = 0;
    }
    else {
        displayText.textContent = Math.round((operate(operator, firstNum, secondNum) * Math.pow(10,6))) / Math.pow(10,6);
        firstNum = displayText.textContent;
    }
    answer = true;
    secondNum = 0;
}
