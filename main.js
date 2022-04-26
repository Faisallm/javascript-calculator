// all elements we are using

// history display
const display1El = document.querySelector('.display-1')
    // main display
const display2El = document.querySelector('.display-2')
    // temporary result display
const tempResultEl = document.querySelector('.temp-result')

// all numbers elements
// get all the numbers element
const numbersEl = document.querySelectorAll('.number')

// get all the operations element
const operationEl = document.querySelectorAll('.operation')

// get the equal element
const equal = document.querySelector('.equal')

// clear buttons
const clearEl = document.querySelector('.all-clear')
const clearLastEl = document.querySelector('.last-entity-clear')


// some variables

// will store the contents of display1
let dis1Num = '';

let dis2Num = '';

// to be computed
let result = null;

// help us keep track of the last operation
// performed
let lastOperation = '';

// will help us track if the user has added
// a dot already to a group of integers
let haveDot = false



////////// Functionality //////////////

// we need to add a click event listener to each number
numbersEl.forEach(number => {
    //  el = element
    number.addEventListener('click', (el) => {
        if (el.target.innerText === '.' && !haveDot) {
            // if we clicked on the dot element and we have
            // never clicked on it before.
            haveDot = true
        } else if (el.target.innerText === '.' && haveDot) {
            // get out of the click event listener
            return
        }
        // main number display
        dis2Num += el.target.innerText
            // showing it on the screen
        display2El.innerText = dis2Num
    })
})



// mathematical operation
operationEl.forEach(operation => {
    operation.addEventListener('click', (el) => {
        // we have to check that the user has a number to
        // add the operation
        if (!dis2Num) return;

        // allows us to add a dot to the new number
        haveDot = false

        // get the operation we want to perform
        const operationName = el.target.innerText

        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num)
        }

        // what this clearVar does is that its clears the...
        // display2El and moves its content to display1El
        clearVar(operationName);
        lastOperation = operationName
        console.log(result)
    })
})


function clearVar(name = ' ') {
    dis1Num += dis2Num + "  " + name + " "
    display1El.innerText = dis1Num

    // clear the main display
    display2El.innerText = ''
    dis2Num = ''

    // show temporary result
    tempResultEl.innerText = result
}

function mathOperation() {
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}


// when we click our equalTo btn
equal.addEventListener('click', el => {
    // check if we have displa1 and display2

    // if we don't have display1 and 2 return
    if (!dis1Num || !dis2Num) return;
    haveDot = false
    mathOperation()
    clearVar()
    dis2Num = result
    display2El.innerText = dis2Num
    tempResultEl.innerText = ''
    dis1Num = ''
})

// clear All btn
clearEl.addEventListener('click', el => {
    display1El.innerText = '0'
    display2El.innerText = '0'
    dis1Num = ''
    dis2Num = ''
    result = ''
    tempResultEl.innerText = '0'
})

// clearLast Element btn
clearLastEl.addEventListener('click', el => {
    // clears the display 2 element
    display2El.innerText = ''
    dis2Num = ''
})


// using keyBoard to operate the calculator
window.addEventListener('keydown', e => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickButtonEl(e.key)
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key)
    } else if (e.key === "*") {
        clickOperation('X')
    } else if (e.key == "Enter" || e.key === '=') {
        clickEqual()
    }
})

function clickButtonEl(key) {
    numbersEl.forEach(number => {
        if (number.innerText === key) {
            // javascript method of clicking a dom
            // click yourself
            number.click();
        }
    })
}

function clickOperation(key) {
    operationEl.forEach(operation => {
        if (operation.innerText === key) {
            // click yourself
            operation.click();
        }
    })
}


function clickEqual() {
    // self-clicking a dom element
    equal.click()
}