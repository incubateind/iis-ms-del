const constants = require('../bin/constants');
const Request = require("request");

module.exports = {
    sendJson,
    getToken,
    getLocation

}



function sendJson(res, statusCode, data, message, error = false) {
    return res.status(statusCode)
        .json({
            data: data,
            error: error,
            message: message,
            statusCode: statusCode
        });
}

function getToken(id, role) {
    let token  = "abc." + id + ".xyz." + role;
    return token;
}

function getLocation(address) {
    return new Promise(async function (resolve, reject) {
        try {

            let url = "https://atlas.mapmyindia.com/api/places/geocode?address="+address;
            //let token = "9fecc9db-f0f8-4a85-aacc-836476651059";
            let token = await getMMIToken();
            Request.get({
                "headers": {
                    "content-type": "application/json",
                    "authorization": token
                },
                "url": url
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                resolve(JSON.parse(body));
            });

        } catch (error) {
            reject(error);
        }
    });
}


function getMMIToken() {      //mapmyindia token
    return new Promise(async function (resolve, reject) {
        try {

            let url = "https://outpost.mapmyindia.com/api/security/oauth/token";
            let clientId = "_kj7R-xTIsyzN5HDhYbyiAMZh7sSfHr3GF8onRebzpPOm7llaXFVcTXqC6UGX7d-wTKpSCrzYH6Hhi4-5NMQlw==";
            let clientSecret = "ebEc8GH231cJ6jJmaTed2gDVay-2Use8cinNI5RftGXLFHKi-0rigpw_WhjTGcHPqdmjEAPakqXBmM0nqy5EpcEe2nI7v_jk";

            Request.post({
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "formData" : {
                    grant_type : "client_credentials",
                    client_id : clientId,
                    client_secret : clientSecret
                },
                "url": url
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                let token = (JSON.parse(body)).access_token;
                resolve(token);
            });

        } catch (error) {
            reject(error);
        }
    });
}