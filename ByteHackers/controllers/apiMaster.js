const models = require('../models/index');
const commonHelper = require('../helper/common');
const constants = require('../bin/constants');
const sequelize = require('sequelize');
const Op = sequelize.Op;
// var jwt = require('jsonwebtoken');

module.exports = {
    doLogin,
    doSignup,
    addProblem,
    getProblems,
    addVote
};


async function doLogin(req, res, next) {
    try {
        let body = req.body;

        const getData = await models.users.findAndCountAll({
            attributes: ['id', 'name', 'role'],
            where: {
                [Op.or]: [{email: body.username} , {mobile: body.username}],
                password: body.password
            },
        });

        if(getData.count > 0) {
            var getToken = commonHelper.getToken(getData.rows[0].dataValues.id, getData.rows[0].dataValues.role);
        }


        var sendData = {};
        sendData.token = getToken;

        commonHelper.sendJson(res, constants.SUCCESS, sendData, 'Data fetched Successfully......', false);
    } catch (error) {
        console.log(error);
        commonHelper.sendJson(res, constants.SERVER_ERROR, "error", 'Data fetching failed......', true);
    }
}

async function doSignup(req, res, next) {
    try {
        let body = req.body;

        let addUser = {};
        addUser.email = body.email;
        addUser.mobile = body.mobile;
        addUser.password = body.password;
        addUser.name = body.name;
        addUser.gender = body.gender;
        addUser.city = body.city;
        addUser.pincode = body.pincode;
        addUser.department = body.department;
        addUser.role = body.role;
        let addResult = await models.users.build(addUser).save();
        let userId = addResult.dataValues.id;
        
        var sendData = {};
        sendData.token = commonHelper.getToken(userId, body.role);

        commonHelper.sendJson(res, constants.SUCCESS, sendData, 'Data fetched Successfully......', false);
    } catch (error) {
        console.log(error);
        commonHelper.sendJson(res, constants.SERVER_ERROR, "error", 'Data fetching failed......', true);
    }
}


async function addProblem(req, res, next) {
    try {
        let body = req.body;

        let locData = await commonHelper.getLocation(body.address);

        let addProb = {};
        addProb.title = body.title;
        addProb.department = body.department;
        addProb.description = body.description;
        addProb.address = body.address;
        addProb.city = body.city;
        addProb.lat = locData.copResults.latitude;
        addProb.long = locData.copResults.longitude;
        addProb.impact = body.impact;
        addProb.language = body.language;
        addProb.image = body.department;
        let addResult = await models.problems.build(addProb).save();
        let probId = addResult.dataValues.id;
        
        var sendData = {};
        sendData.probId = probId;

        commonHelper.sendJson(res, constants.SUCCESS, sendData, 'Data fetched Successfully......', false);
    } catch (error) {
        console.log(error);
        commonHelper.sendJson(res, constants.SERVER_ERROR, "error", 'Data fetching failed......', true);
    }
}


async function getProblems(req, res, next) {
    try {
        let body = req.body;
        let whereObj = {};

        if(req.role == 1) {
            let getData = await models.users.findAndCountAll({
                attributes: ['department'],
                where: {
                    id: req.userId
                }
            });
            whereObj.department = getData.rows[0].dataValues.department;
        }

        let getData = await models.problems.findAndCountAll({
            //attributes: [],
            where: whereObj
        });


        let sendData = {};
        sendData.count = getData.count;
        sendData.values = [];

        for (let i of getData.rows) {
            let temp_obj = {};
            temp_obj.id = i.dataValues.id;
            temp_obj.title = i.dataValues.title;
            temp_obj.department = i.dataValues.department;
            temp_obj.description = i.dataValues.description;
            temp_obj.city = i.dataValues.city;
            temp_obj.lat = i.dataValues.lat;
            temp_obj.long = i.dataValues.long;
            temp_obj.upvote = i.dataValues.upvote;
            temp_obj.downvote = i.dataValues.downvote;
            temp_obj.impact = i.dataValues.impact;
            temp_obj.language = i.dataValues.language;
            temp_obj.image = i.dataValues.image;

            sendData.values.push(temp_obj);
        }


        commonHelper.sendJson(res, constants.SUCCESS, sendData, 'Data fetched Successfully......', false);
    } catch (error) {
        console.log(error);
        commonHelper.sendJson(res, constants.SERVER_ERROR, "error", 'Data fetching failed......', true);
    }
}


async function addVote(req, res, next) {
    try {
        let type = req.param("type");
        let probId = req.param("probId");
        
        let updateProb = {};
        if( type == 'up' ) {
            updateProb.upvote = sequelize.literal('upvote + 1');
        } else if( type == 'down') {
            updateProb.downvote = sequelize.literal('downvote + 1');
        }
        
        let updateResult = await models.problems.update(updateProb, {
            where: {
                id: probId
            }
        });
        
        var sendData = {};
        sendData.probId = probId;

        commonHelper.sendJson(res, constants.SUCCESS, sendData, 'Data fetched Successfully......', false);
    } catch (error) {
        console.log(error);
        commonHelper.sendJson(res, constants.SERVER_ERROR, "error", 'Data fetching failed......', true);
    }
}


