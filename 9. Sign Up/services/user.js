let users = [];

function createUser(userName, schoolNumber, phone, email) {
    let err = [];
    if (!userName || !userName.match(/^([a-zA-Z])([a-zA-Z0-9_]){5,17}$/g)) err.push({ name: 'userName', message: '请填写正确的用户名' });
    if (!schoolNumber || !schoolNumber.match(/^(?!0)[0-9]{8}$/g)) err.push({ name: 'schoolNumber', message: '请填写正确的学号' });
    if (!phone || !phone.match(/^(?!0)[0-9]{11}$/g)) err.push({ name: 'phone', message: '请填写正确的电话' });
    if (!email || !email.match(/^[a-zA-Z0-9]+@[a-z0-9]+.*?\.[a-zA-Z\u4e00-\u9fa5]{2,4}$/g)) err.push({ name: 'email', message: '请填写正确的邮箱' });

    if (err.length > 0) {
        err.push({ name: 'total', message: '请填写正确的注册信息' });
        return err;
    }

    err = [];
    if (users.find(i => i.userName === userName))
        err.push({ name: 'userName', message: `用户名 ${userName} 已被注册` });
    if (users.find(i => i.schoolNumber === schoolNumber))
        err.push({ name: 'schoolNumber', message: `学号 ${schoolNumber} 已被注册` });
    if (users.find(i => i.phone === phone))
        err.push({ name: 'phone', message: `电话 ${phone} 已被注册` });
    if (users.find(i => i.email === email))
        err.push({ name: 'email', message: `邮箱 ${email} 已被注册` });

    if (err.length > 0) {
        err.push({ name: 'total', message: '提供的注册信息已被使用' });
        return err;
    }
    users.push({ userName, schoolNumber, phone, email });
    return err;
}

function getUser(userName) {
    return users.find(i => i.userName === userName);
}

const user = { createUser, getUser };

module.exports = {
    user
}