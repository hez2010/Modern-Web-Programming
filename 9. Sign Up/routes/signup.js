const qs = require('querystring');
const { readFileSync } = require("fs");
function signup(request, response, current, data) {
    const userService = data.services.user;
    const body = qs.parse(request.body);
    const result = userService.createUser(body.userName, body.schoolNumber, body.phone, body.email);

    let html = readFileSync('pages/signup.html').toString();
    if (result.length === 0) {
        response.writeHead(301, {
            'Location': `/?username=${body.userName}`
        });
    }
    else {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        html = html.replace(/{signupSuccessClass}/g, 'error');
        let total = result.find(i => i.name === 'total');
        if (total) {
            html = html.replace(/<div>{totalError}<\/div>/g, `<div class="ui error message">
            <div class="header">注册失败</div>
            <p>${total.message}</p>
          </div>`);
        }
        for (let i in body) {
            html = html.replace(new RegExp(`name='${i}' value=''`, 'g'), `name='${i}' value='${body[i]}'`);
        }
    }
    for (let i of result) {
        html = html.replace(new RegExp('<div>{' + i.name + 'Error}<\/div>', 'g'),
            `<p><span class="ui text red">${i.message}</span></p>`);
        html = html.replace(new RegExp('{' + i.name + 'ErrorClass}', 'g'),
            'error');
    }
    let final = html.replace(/<div>{.*?Error}<\/div>/g, '')
        .replace(/{.*?ErrorClass}/g, '');
    response.write(final, 'utf-8');
}

module.exports = {
    signup
}