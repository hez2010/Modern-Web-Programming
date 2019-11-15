/*
  Author: Steven He
  School: Sun Yat-sen University
  Student Number: 17364025
  Date: 10/24/2019
*/

$(window).load(() => {
  const moles = $('.mole span');
  const result = $('#result');
  const time = $('#time');
  const score = $('#score');

  let lastActive = -1;
  let timer = 0;
  let currentScore = 0;
  let currentTime = 30;
  let clicked = true;

  const stopGame = () => {
    result.val('Game Over')
    if (lastActive !== -1) {
      $(moles[lastActive]).removeAttr('active');
      $(moles[lastActive]).removeAttr('touched');
    }
    clearInterval(timer);
    timer = 0; clicked = true; lastActive = -1
  }
  const startGame = () => {
    if (timer) return;
    currentTime = 30;
    currentScore = 0;
    time.val(currentTime.toString());
    score.val(currentScore.toString());
    result.val('');
    timer = setInterval(() => {
      if (!clicked && currentScore > 0) {
        currentScore--;
        score.val(currentScore.toString());
      }
      if (currentTime <= 0) { stopGame(); return; }
      currentTime--;
      clicked = false;
      if (lastActive !== -1) {
        $(moles[lastActive]).removeAttr('active');
        $(moles[lastActive]).removeAttr('touched');
      }
      lastActive = parseInt(Math.random() * moles.length);
      $(moles[lastActive]).attr({ active: '' });
      time.val(currentTime.toString());
    }, 1000);
  }
  for (let i = 0; i < moles.length; i++) {
    let v = $(moles[i]);
    v.attr({ index: i.toString() });
    v.click(() => {
      if (!clicked && parseInt(v.attr('index')) === lastActive) {
        v.removeAttr('active'); v.attr({ touched: '' });
        currentScore++;
        score.val(currentScore.toString());
        clicked = true;
      }
    })
  }
  $('#start').click(startGame); 
  $('#stop').click(stopGame);
});