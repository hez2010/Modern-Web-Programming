const result = document.querySelector('#result');
const equ = document.querySelector('#btn-equ');

document.onkeydown = function (e) {
    let { key, keyCode } = e;

    if (key.charCodeAt(0) >= '0'.charCodeAt(0) && key.charCodeAt(0) <= '9'.charCodeAt(0)) {
        clickNumber(parseInt(key));
        return;
    }

    switch (key) {
        case '+': clickOperator('+'); break;
        case '-': clickOperator('-'); break;
        case '*': clickOperator('*'); break;
        case '/': clickOperator('/'); break;
        case '.': clickOperator('.'); break;
        case '(': clickOperator('('); break;
        case ')': clickOperator(')'); break;
        default:
            // backspace
            if (keyCode === 8) backspace();
            // enter
            if (keyCode === 13) calc();
            break;
    }
}

function clickNumber(number) {
    equ.focus();
    if (result.value === '0') result.value = '';
    if (number === 0 && result.value === '0') {
        result.value = '0';
        return;
    }
    result.value += number.toString();
}

function backspace() {
    equ.focus();
    result.value = result.value.substring(0, result.value.length - 1);
    if (result.value === '') result.value = '0';
}

function clickOperator(operator) {
    equ.focus();
    switch (operator) {
        case '=':
            calc();
            break;
        case '(':
        case ')':
            if (result.value === '0') result.value = '';
            result.value += operator;
            break;
        default: result.value += operator; break;
    }
}

function clearResult() {
    equ.focus();
    result.value = '0';
}

function calc() {
    try {
        result.value = eval(result.value);
    }
    catch (err) {
        result.value = err;
    }
}