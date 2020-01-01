const { regist, login, logout, getUserData } = require('../services/user');
const { isLogin } = require('../middlewares/auth');

class HomeController {
    req = null;
    res = null;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    index() {
        return this.res.render("index.pug")
    }

    async signup_post() {
        const { username, password, number, phone, email } = this.req.body;
        const data = await regist(this.req, this.res, username, password,
            { number, phone, email });

        if (data) this.res.redirect('/user');
        else this.res.render('signup.pug', { username, password, number, phone, email });
    }

    signup_get() {
        this.res.render('signup.pug');
    }

    signin_get() {
        this.res.render('signin.pug');
    }

    async signin_post() {
        const { username, password } = this.req.body;
        const data = await login(this.req, this.res, username, password)
        if (data) this.res.redirect('/user');
        else this.res.render('signin.pug', { username, password });
    }

    async user() {
        const token = isLogin(this.req);
        if (!token) this.res.send("not signed in");
        else {
            const data = await getUserData(this.req, token);
            this.res.send(JSON.stringify(data));
        }
    }

    signout() {
        logout(this.req, this.res);
        this.res.redirect('/');
    }
}

module.exports = {
    HomeController
};