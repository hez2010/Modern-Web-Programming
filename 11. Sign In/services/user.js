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
    if (!data) return false;
    const hashedPassword = hashPassword(password);
    if (data.password != hashedPassword) return false;
    const token = uuidv1();
    res.cookie('user', JSON.stringify({ username, token }));
    req.session[token] = username;
    return true;
}

async function getUserData(req, token) {
    const username = req.session[token];
    const db = await getDb();
    let collection = db.collection('user');
    if (!collection)
        collection = await db.createCollection('user');

    const data = await collection.findOne({ 'username': username });
    if (!data) return null;
    return data.userdata;
}

async function regist(req, res, username, password, userdata) {
    const db = await getDb();
    let collection = db.collection('user');
    if (!collection)
        collection = await db.createCollection('user');

    const data = await collection.findOne({ 'username': username });
    if (data) return false;
    const hashedPassword = hashPassword(password);
    collection.insertOne({ username, password: hashedPassword, userdata });
    const token = uuidv1();
    res.cookie('user', JSON.stringify({ username, token }));
    req.session[token] = username;
    return true;
}

function logout(req, res) {
    req.session.regenerate();
    res.clearCookie('user');
    return true;
}

module.exports = {
    login, regist, logout, getUserData
};