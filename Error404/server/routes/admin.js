const express=require('express');
const route=express.Router();
const adminOperation=require('../db/helpers/adminCrud');

route.post('/addadmin',(req,res)=>{
    adminOperation.addadmin(req.body,res);
});

route.post('/addstation',(req,res)=>{
    adminOperation.addstation(req.body,res);
});
// route.post('/addcase',(req,res)=>{
//     adminOperation.addcase(req.body,res);
// });

route.get('/getrecords',(req,res)=>{
    adminOperation.getrecords(res);
})

route.get('/getstation',(req,res)=>{
    adminOperation.getstation(res);
})

module.exports=route;