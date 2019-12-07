const http = require('http');
const { router } = require('./router');
const { auth } = require('./auth');
const { static } = require('./static');
const { user } = require('./services/user');

const PORT = 8000;
const middlewares = [
    auth, router, static
];

let root = {};
let root_backup = root;
for (let i of middlewares) {
    root['next'] = i;
    root = root['next'];
}

let services = {
    user
}

root = root_backup;

http.createServer((request, response) => {
    let data = {};
    let method = request.method.toLowerCase();
    if (method === 'get' || method === 'delete') {
        data['services'] = services;
        root['next'](request, response, root['next'], data);
        response.end();
    }
    else request.on('data', body => {
            request.body = body.toString();
            data['services'] = services;
            root['next'](request, response, root['next'], data);
            response.end();
        });
}).listen(PORT);