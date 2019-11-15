/*
  Author: Steven He
  School: Sun Yat-sen University
  Student Number: 17364025
  Date: 10/24/2019
*/

$(window).load(() => {
  $("#maze").mouseleave(() => {
    if (!started) return;
    isCheat = true;
  });
  const walls = $(".wall");
  const status = $("#status");

  let started = false;
  let isCheat = false;

  let setStatus = message => {
    status.text(message);
    status.attr({ show: "" });
  }

  walls.mouseover((e) => {
    if (!started) return;
    $(e.target).attr({ touched: "" });
    setStatus("You Lose!");
    started = false;
  });

  $(".start").mouseover(() => {
    walls.removeAttr("touched");
    status.removeAttr("show");
    started = true;
    isCheat = false;
  });

  $(".end").mouseover(() => {
    if (!started) return;
    setStatus(isCheat ? "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!" : "You Win!");
    started = false;
  });
});