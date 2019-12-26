
var commonHelper = require('../helper/common');
const constants = require('../bin/constants');

module.exports = {
    verifyToken
}

function verifyToken(req, res, next) {

    var token = req.headers.authorization;

    if (token != null) {

        let arr = token.split('.');
        if (arr[0] == 'abc' && arr[2] == 'xyz') {
            req.userId = arr[1];
            req.role = arr[3];
            next();
        } else {
            commonHelper.sendJson(res, constants.AUTH_FAIL, "auth failed", 'authentication failed....', false)
        }

    } else {
        commonHelper.sendJson(res, constants.AUTH_FAIL, "No token", 'No token provided.', false);
    }

}
