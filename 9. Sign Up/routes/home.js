const { readFileSync } = require("fs");
function home(request, response, current, data) {
    if (!data.query || !data.query.username) {
        signup(response);
        return;
    }
    const userService = data.services.user;
    const user = userService.getUser(data.query.username);
    if (!user) signup(response);
    else showUser(user, response);
}

function signup(response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    const html = readFileSync('pages/signup.html');
    response.write(html.toString()
        .replace(/<div>{.*?Error}<\/div>/g, '')
        .replace(/{.*?}/g, ''), 'utf-8');
}

function showUser(user, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    let html = readFileSync('pages/user.html').toString();
    for (let i in user) {
        html = html.replace(new RegExp(`{${i}}`, 'g'), user[i]);
    }
    response.write(html, 'utf-8');
}

module.exports = {
    home
}