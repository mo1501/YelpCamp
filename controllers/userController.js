const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

module.exports.renderlogin =
    (req, res) => {
        res.render('user/login');
    }

    ;

module.exports.renderRegister =
    (req, res) => {
        res.render('user/register');
    };


module.exports.registerUser =
    async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'You are now registered');
                res.redirect('/campgrounds');

            })

        } catch (e) {
            req.flash('error', e.message);
            res.redirect('register');
        }

    };

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Login success');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);

};
module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}