const { readFileSync, existsSync } = require("fs");

function static(request, response, current, data) {
    if (data.staticFile && !!data.file) {
        let ext = data.file.substring(data.file.lastIndexOf('.')).toLowerCase();
        let contentType = 'application/octet-stream';
        switch (ext) {
            case '.js':
                contentType = 'application/javascript'; break;
            case '.css':
                contentType = 'text/css'; break;
            case '.eot':
                contentType = 'font/eot'; break;
            case '.svg':
                contentType = 'image/svg+xml'; break;
            case '.ttf':
                contentType = 'font/ttf'; break;
            case '.woff':
                contentType = 'font/woff'; break;
            case '.json':
                contentType = 'application/json'; break;
        }
        if (existsSync('wwwroot/' + data.file)) {
            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.write(readFileSync('wwwroot/' + data.file), 'utf-8');
        }
        else {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            response.write(readFileSync('pages/404.html'), 'utf-8');
        }
    }
    else if (current['next'])
        current['next'](request, response, current['next'], data);
}

module.exports = {
    static
}