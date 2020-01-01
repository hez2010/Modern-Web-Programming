const mongo = require('mongodb');

async function getDb() {
    const conn = await mongo.connect('mongodb://localhost:27017/sign_in_stevehe',
        { useNewUrlParser: true, useUnifiedTopology: true });
    const db = conn.db('sign_in_stevehe');
    return db;
}

module.exports = {
    getDb
}