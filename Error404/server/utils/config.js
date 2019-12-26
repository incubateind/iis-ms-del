var shortid = require('shortid');
module.exports = {
    adminobject: 
    { 
    'userId': "AD"+shortid.generate(),
    'userType': "admin",
    'userName': "admin",
    'email': "admin@email.com",
    'password': "admin",
    'firstym': true
    },
}