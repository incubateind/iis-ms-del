const jwt = require('../utils/jwt');
const chalk=require('chalk');

const JWTMiddleware = (req,res, next)=>{
    res.set({"Content-Type": "application/json"});
  //  var token = req.headers['token'];
  var token=req.body.token;
    console.log(chalk.red(req.body+""));
    console.log("Inside Middleware ",token);
    var stationcode = jwt.verifyToken(token);
   
    if(stationcode){
        req.body.stationcode = stationcode;
       next();
    }
    else{
        res.json({"msg":"Invalid Token"});
    }
}
module.exports = JWTMiddleware;