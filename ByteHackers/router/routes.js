const express = require('express');

const router = express.Router();
const apiMaster = require('../controllers/apiMaster');

module.exports = router;

router.post('/login', apiMaster.doLogin);
router.post('/signup', apiMaster.doSignup);
router.post('/addProblem', apiMaster.addProblem);
router.post('/getProblems', apiMaster.getProblems);
router.post('/addVote/:type/:probId', apiMaster.addVote);
