/*
    Author: Steven He
    School: Sun Yat-sen University
    Student Number: 17364025
    Date: 12/19/2019
*/

window.onload = () => {
    let mutex = 0;

    const sumClick = e => {
        const self = e.target || e;
        if (!self.getAttribute('valid')) return;
        let sum = 0;
        document.querySelectorAll('#control-ring li .unread').forEach(v => sum += parseInt(v.innerText));
        document.querySelector('#sum').innerText = sum;
        self.removeAttribute('valid');
    };

    document.querySelector('#info-bar').addEventListener('click', sumClick);

    document.querySelector('#bottom-positioner').addEventListener('mouseenter', e => {
        mutex++;
        document.querySelector('#sum').innerText = '';
        document.querySelector('#info-bar').removeAttribute('valid');
        document.querySelector('#control-ring').removeAttribute('calculating');
        document.querySelectorAll('#control-ring li').forEach(v => {
            v.removeAttribute('value');
            v.removeAttribute('calculating');
            v.removeAttribute('calculated');
        })
        document.querySelectorAll('#control-ring li .unread').forEach(v => v.innerText = '...');
    });

    document.querySelector('#bottom-positioner').addEventListener('mouseleave', e => mutex++);

    const request = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => callback(xhr.response);
        xhr.send();
    }

    const buttonClick = callback => e => {
        let self = e.target || e;
        let pre = mutex;

        while (!self.querySelector('.unread'))
            self = self.parentElement;

        if (self.getAttribute('value') || document.querySelector('#control-ring').getAttribute('calculating')) return;

        self.querySelector('.unread').innerText = '...';

        self.setAttribute('calculating', 'calculating');
        self.setAttribute('value', '...');
        document.querySelector('#control-ring').setAttribute('calculating', 'calculating');

        request('http://localhost:3000/api', data => {
            if (mutex !== pre) return;

            self.querySelector('.unread').innerText = data;

            self.removeAttribute('calculating');
            self.setAttribute('calculated', 'calculated');
            self.setAttribute('value', data);

            document.querySelector('#control-ring').removeAttribute('calculating');

            let left = [];
            document.querySelectorAll('#control-ring li').forEach(li => {
                if (li.getAttribute('value') === '...' || !li.getAttribute('value')) left.push(li);
            });

            if (left.length == 0) document.querySelector('#info-bar').setAttribute('valid', 'valid');

            if (callback) callback();
        });
    };

    document.querySelectorAll('#control-ring li').forEach(v => {
        v.addEventListener('click', buttonClick(null));
    });

    const clickButton = index => {
        const lis = document.querySelectorAll('#control-ring li');
        buttonClick(index === 4 ? () => setTimeout(() => sumClick(document.querySelector('#info-bar')), 500) : () => clickButton(index + 1))(lis[index]);
    };

    document.querySelector('.apb').addEventListener('click', () => clickButton(0));
};