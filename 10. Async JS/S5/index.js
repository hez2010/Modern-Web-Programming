/*
    Author: Steven He
    School: Sun Yat-sen University
    Student Number: 17364025
    Date: 12/19/2019
*/

window.onload = () => {
    let mutex = 0;

    const clickButton = (li, cur, reason) => new Promise((resolve, reject) => {
        while (li.tagName !== 'LI') {
            li = li.parentElement;
            if (!li) return;
        }
        if (li.getAttribute('value')) return;
        if (document.querySelector('#control-ring').getAttribute('calculating')) return;
        li.querySelector('.unread').innerText = '...';
        li.setAttribute('value', '...');
        li.setAttribute('calculating', 'calculating');

        document.querySelector('#control-ring').setAttribute('calculating', 'calculating');

        fetch('http://localhost:3000/')
            .then(res => res.text())
            .then(data => {
                if (cur !== mutex) return;
                if (Math.random() < 0.5) {
                    li.removeAttribute('value');
                    li.removeAttribute('calculating');
                    document.querySelector('#control-ring').removeAttribute('calculating');
                    reject(reason);
                    return;
                }

                li.querySelector('.unread').innerText = data;
                li.setAttribute('value', data)
                li.setAttribute('calculated', 'calculated')
                li.removeAttribute('calculating');
                document.querySelector('#control-ring').removeAttribute('calculating');

                if (Array.from(document.querySelectorAll('#control-ring li')).find(x => x.getAttribute('value') === '...' || x.getAttribute('value')))
                    document.querySelector('#info-bar').setAttribute('valid', 'valid');

                resolve(data);
            })
            .catch(err => reject(err));
    });

    const aHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        display('这是个天大的秘密');

        clickButton(document.querySelector('#control-ring li:nth-child(1)'), pre, { message: '这不是个天大的秘密', currentSum })
            .then(res => resolve(currentSum + parseInt(res)))
            .catch(err => reject(err));
    }

    const bHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        display('我不知道');

        clickButton(document.querySelector('#control-ring li:nth-child(2)'), pre, { message: '我知道', currentSum })
            .then(res => resolve(currentSum + parseInt(res)))
            .catch(err => reject(err));
    }

    const cHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        display('你不知道');

        clickButton(document.querySelector('#control-ring li:nth-child(3)'), pre, { message: '你知道', currentSum })
            .then(res => resolve(currentSum + parseInt(res)))
            .catch(err => reject(err));
    }

    const dHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        display('他不知道');

        clickButton(document.querySelector('#control-ring li:nth-child(4)'), pre, { message: '他知道', currentSum })
            .then(res => resolve(currentSum + parseInt(res)))
            .catch(err => reject(err));
    }

    const eHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        display('才怪');

        clickButton(document.querySelector('#control-ring li:nth-child(5)'), pre, { message: '是这样', currentSum })
            .then(res => resolve(currentSum + parseInt(res)))
            .catch(err => reject(err));
    }

    const bubbleHandler = (currentSum, pre, display, resolve, reject) => {
        if (pre !== mutex) return;
        if (Math.random() < 0.5)
            display('楼主异步调用战斗力感人，目测不超过' + currentSum, currentSum);
        else
            reject({ message: '楼主异步调用战斗力太强，目测超过' + currentSum, currentSum })
    };

    const display = (msg, sum) => {
        document.querySelector('#message').innerText = msg;
        if (sum) document.querySelector('#sum').innerText = sum.toString();
    }

    const execute = (callChain, index, currentSum, display, currentTime) => {
        if (index >= callChain.length) return;

        callChain[index](currentSum, currentTime, display, nextSum => {
            execute(callChain, index + 1, nextSum, display, currentTime);
        }, err => {
            if (currentTime !== mutex) return;
            display(err.message, currentSum);
        });
    }

    document.querySelector('#bottom-positioner').addEventListener('mouseenter', () => {
        ++mutex;
        document.querySelector('#order').innerText = '';
        document.querySelector('#message').innerText = '';
        document.querySelector('#sum').innerText = '';
        document.querySelector('#info-bar').removeAttribute('valid');
        document.querySelector('#control-ring').removeAttribute('calculating');
        document.querySelectorAll('#control-ring li').forEach(v => {
            v.removeAttribute('value');
            v.removeAttribute('calculating')
            v.removeAttribute('calculated');
        });
        document.querySelectorAll('#control-ring li .unread').forEach(v => v.innerText = '...');
    });
    document.querySelector('#bottom-positioner').addEventListener('mouseleave', e => mutex++);

    document.querySelector('.apb').addEventListener('click', () => {
        let pre = mutex;
        let handlers = [aHandler, bHandler, cHandler, dHandler, eHandler]
            .map((action, i) => ({ action, i }));
        handlers = handlers.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
        document.querySelector('#order').innerText = (handlers.map(li => String.fromCharCode(65 + li.i)).join(", "));
        handlers.push({ action: bubbleHandler });
        execute(handlers.map(({ action }) => action), 0, 0, display, pre);
    });
};