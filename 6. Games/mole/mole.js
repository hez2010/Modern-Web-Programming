window.onload = () => {
  const moles = document.querySelectorAll('.mole span');
  var lastActive = -1;
  setInterval(() => {
    if (lastActive !== -1) moles[lastActive].removeAttribute('active');
    lastActive = parseInt(Math.random() * moles.length);
    moles[lastActive].setAttribute('active', '');
  }, 1000);
};