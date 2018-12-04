/**
 * Created by Omar on 3/21/2018.
 */
var User = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('Authorization');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send('Wrong token');
    });
};

module.exports = {authenticate};
