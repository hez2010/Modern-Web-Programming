const { readFileSync } = require("fs");
const { signup } = require('./routes/signup');
const { home } = require('./routes/home');
const qs = require('querystring');

const routeTable = [
    {
        map: '/',
        method: /^get$/g,
        handle: home
    },
    {
        map: '/signup',
        method: /^post$/g,
        handle: signup
    }
];

function router(request, response, current, data) {
    let [path, query] = request.url.split('?', 2);
    let staticFile = path.indexOf('.') !== -1;
    data['query'] = qs.parse(query);
    data['staticFile'] = staticFile;
    if (staticFile) data.file = path.substring(1);

    if (staticFile) {
        if (current['next'])
            current['next'](request, response, current['next'], data);
        return;
    }

    for (let i of routeTable) {
        if (i.map === path && request.method.toLowerCase().match(i.method)) {
            i.handle(request, response, current['next'], data);
            return;
        }
    }
    notfound(response);
}

function notfound(response) {
    response.writeHead(404, {
        'Content-Type': 'text/html'
    });
    response.write(readFileSync('pages/404.html'), 'utf-8');
}

module.exports = {
    router
}