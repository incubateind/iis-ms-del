var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./router/routes');
var verifyUser = require('./auth/verifyUser');


var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(verifyUser.verifyToken);


app.use('/', routes);


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("Server is started!");
});

module.exports = app;
