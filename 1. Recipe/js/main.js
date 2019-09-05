// remove preloader mask if page loaded
document.body.onload = function () {
    const preloader = document.querySelector('preloader');
    preloader.setAttribute('class', 'fadeout-preloader');
    setTimeout(function () { preloader.remove(); }, 500);
};

// event listener for togglers
document.querySelectorAll('.toggler')
    .forEach(function (v) {
        v.addEventListener('click', function () { toggleBlock(v) });
    });

function toggleBlock(target) {
    const element = document.querySelector('#' + target.getAttribute('data-target'));
    if (element.style.display === 'block') {
        element.style.display = 'none';
        target.setAttribute('class', 'toggler toggler-collapsed');
    }
    else {
        element.style.display = 'block';
        target.setAttribute('class', 'toggler toggler-expanded');
    }
}
