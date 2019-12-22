const express=require('express');
const route=express.Router();
const adminOperation=require('../db/helpers/userCrud');

route.post('/login',(req,res)=>{
    adminOperation.login(req.body,res);
});

route.post('/logout',(req,res)=>{
    adminOperation.logout(req.body,res);
})
module.exports=route;