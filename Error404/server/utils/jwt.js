const jwt = require('jsonwebtoken');
const jwtOperations = {
    SECRETKEY:'UCANTSEEME',
    generateToken(stationcode){
        var token = jwt.sign({stationcode }, this.SECRETKEY);//,{ expiresIn: '1h' });
        return token;
    },
    verifyToken(clientTokenNumber){
        var decoded = jwt.verify(clientTokenNumber, this.SECRETKEY);
        if(decoded){
        console.log('Verified ',decoded.stationcode);
        return decoded.stationcode;
        }
        else{
            console.log('Token Not Matched...');
            return undefined;
        }
    }
}
module.exports = jwtOperations;