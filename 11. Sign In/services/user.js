const { sha256 } = require('js-sha256');
const { getDb } = require('./db');
const uuidv1 = require('uuid/v1');

function hashPassword(password) {
    const salt = "Sign-In Web Homework Salt";
    return sha256(sha256(password + salt) + salt);
}

async function login(req, res, username, password) {
    const db = await getDb();
    let collection = db.collection('user');
    if (!collection)
        collection = await db.createCollection('user');

    const data = await collection.findOne({ 'username': username });
    if (!data) return 0;
    const hashedPassword = hashPassword(password);
    if (data.password != hashedPassword) return 1;
    const token = uuidv1();
    res.cookie('user', JSON.stringify({ username, token }));
    req.session[token] = username;
    return 2;
}

async function getUserData(req, token) {
    const username = req.session[token];
    const db = await getDb();
    let collection = db.collection('user');
    if (!collection)
        collection = await db.createCollection('user');

    const data = await collection.findOne({ 'username': username });
    if (!data) return null;
    return { number: data.number, phone: data.phone, email: data.email };
}

async function regist(req, res, username, password, userdata) {
    const db = await getDb();
    let collection = db.collection('user');
    if (!collection)
        collection = await db.createCollection('user');
    
    const { number, email, phone } = userdata;

    const data = await collection.findOne({ 'username': username });
    if (data) return 'username';

    for (const key in userdata) {
        const entry = await collection.findOne({ [key]: userdata[key] });
        if (entry) return key;
    }

    const hashedPassword = hashPassword(password);
    collection.insertOne({ username, password: hashedPassword, number, email, phone });
    const token = uuidv1();
    res.cookie('user', JSON.stringify({ username, token }));
    req.session[token] = username;
    return null;
}

async function logout(req, res) {
    await new Promise((res, rej) => req.session.regenerate(() => { res() }));
    res.clearCookie('user');
    return true;
}

module.exports = {
    login, regist, logout, getUserData
};