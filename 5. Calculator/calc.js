/*
  Author: Steven He
  School: Sun Yat-sen University
  Student Number: 17364025
  Date: 10/17/2019
*/

const result = $('#result');
const equ = $('#btn-equ');
$('#btn-back').click(backspace); $('#btn-ce').click(clearResult);
$('.number-btn').click(clickNumber); $('.operator-btn').click(clickOperator);

$(document).keydown(e => {
    let { key, keyCode } = e;
    if (key.charCodeAt(0) >= '0'.charCodeAt(0) && key.charCodeAt(0) <= '9'.charCodeAt(0)) {
        clickNumber(parseInt(key)); return;
    }
    switch (key) {
        case '+': case '-': case '*': case '/': case '.': case '(': case ')':
            clickOperator(key); break;
        default:
            if (keyCode === 8) backspace(); if (keyCode === 13) calc(); break;
    }
});

function clickNumber(e) {
    let number = parseInt($(e.target).text()) || e;
    equ.focus();
    if (result.val() === '0') result.val('');
    if (number === 0 && result.val() === '0') { result.val('0'); return; }
    result.val(result.val() + number.toString());
}
function backspace() {
    equ.focus();
    result.val(result.val().substring(0, result.val().length - 1));
    if (result.val() === '') result.val('0');
}
function clickOperator(e) {
    let operator = $(e.target).text() || e;
    equ.focus();
    switch (operator) {
        case '=': calc(); break;
        case '(': case ')':
            if (result.val() === '0') result.val('');
            result.val(result.val() + operator);
            break;
        default: result.val(result.val() + operator); break;
    }
}
function clearResult() {
    equ.focus(); result.val('0');
}
function calc() {
    try { result.val(eval(result.val())); }
    catch (err) { result.val(err); alert('计算表达式有误'); }
}