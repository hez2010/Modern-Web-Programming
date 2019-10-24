/*
  Author: Steven He
  School: Sun Yat-sen University
  Student Number: 17364025
  Date: 10/24/2019
*/

window.onload = () => {
  const maze = document.querySelector("#maze");
  const walls = document.querySelectorAll(".wall");
  const start = document.querySelector(".start");
  const end = document.querySelector(".end");
  const status = document.querySelector("#status");

  let started = false;
  let isCheat = false;

  let setWall = wall => {
    wall.setAttribute("moved", "");
  }

  let resetWall = wall => {
    wall.removeAttribute("moved");
  }

  let setStatus = message => {
    status.textContent = message;
    status.setAttribute("show", "");
  }

  let resetStatus = () => {
    status.removeAttribute("show");
  }

  maze.addEventListener("mouseleave", () => {
    if (!started) return;
    isCheat = true;
  });

  walls.forEach(v => {
    v.addEventListener("mouseover", () => {
      if (started) {
        setWall(v);
        setStatus("You Lose!");
        started = false;
      }
    });
  })

  start.addEventListener("mouseover", () => {
    walls.forEach(v => resetWall(v));

    resetStatus();
    started = true;
    isCheat = false;
  });

  end.addEventListener("mouseover", () => {
    if (!started) return;

    setStatus(isCheat ? "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!" : "You Win!");
    started = false;
  });
};