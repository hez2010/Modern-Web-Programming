const { regist, login, logout, getUserData } = require('../services/user');
const { isLogin } = require('../middlewares/auth');
const { validateInput } = require('../services/validation');

class HomeController {
    req = null;
    res = null;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    index() {
        if (isLogin(this.req)) this.res.render("signedinindex.pug", { username: this.req.user.username });
        else this.res.render("index.pug")
    }

    async signup_post() {
        if (isLogin(this.req)) 
            await logout(this.req, this.res);
        const { username, password, number, phone, email } = this.req.body;
        const validationResult = validateInput({ username, password, number, phone, email });
        if (validationResult.length > 0) {
            const model = { username, number, phone, email, signupSuccessClass: 'error' };
            for (const r of validationResult) {
                model[r.field + 'ErrorClass'] = 'error';
                model[r.field + 'Error'] = r.message;
            }
            this.res.render('signup.pug', model);
            return;
        }

        const result = await regist(this.req, this.res, username, password,
            { number, phone, email });

        if (result) {
            const model = { username, number, phone, email, signupSuccessClass: 'error' };
            switch (result) {
                case 'username':
                    model.usernameError = '该用户名已被注册';
                    model.usernameErrorClass = 'error';
                    break;
                case 'number':
                    model.numberError = '该学号已被注册';
                    model.numberErrorClass = 'error';
                    break;
                case 'phone':
                    model.phoneError = '该电话已被注册';
                    model.phoneErrorClass = 'error';
                    break;
                case 'email':
                    model.emailError = '该邮箱已被注册';
                    model.emailErrorClass = 'error';
                    break;
            }
            this.res.render('signup.pug', model);
            return;
        }

        this.res.redirect('/user');
    }

    signup_get() {
        if (isLogin(this.req)) this.res.redirect('/user');
        else this.res.render('signup.pug');
    }

    signin_get() {
        if (isLogin(this.req)) this.res.redirect('/user');
        else this.res.render('signin.pug');
    }

    async signin_post() {
        if (isLogin(this.req)) 
            await logout(this.req, this.res);
        const { username, password } = this.req.body;
        
        const validationResult = validateInput({ username, password });
        if (validationResult.length > 0) {
            const model = { username, signupSuccessClass: 'error' };
            for (const r of validationResult) {
                model[r.field + 'ErrorClass'] = 'error';
                model[r.field + 'Error'] = r.message;
            }
            this.res.render('signin.pug', model);
            return;
        }
        const data = await login(this.req, this.res, username, password)
        if (data === 2) this.res.redirect('/user');
        else {
            const model = { username, signupSuccessClass: 'error' };
            if (data === 0) {
                model.usernameErrorClass = 'error';
                model.usernameError = '该用户未注册';
            } else {
                model.passwordErrorClass = 'error';
                model.passwordError = '密码不正确';
            }
            this.res.render('signin.pug', model);
        }
    }

    async user() {
        const token = isLogin(this.req);
        if (!token) this.res.render('notsignin.pug');
        else {
            const data = await getUserData(this.req, token);
            data.username = this.req.user.username;
            this.res.render('user.pug', data);
        }
    }

    async signout() {
        await logout(this.req, this.res);
        this.res.redirect('/');
    }
}

module.exports = {
    HomeController
};