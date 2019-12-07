function auth(request, response, current, data) {
    if (current['next'])
        current['next'](request, response, current['next'], data);
}

module.exports = {
    auth
}