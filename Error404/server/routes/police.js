const express=require('express');
const route=express.Router();
const policeOperation=require('../db/helpers/policeCrud');
const Firebase=require('firebase-admin');
const Multer=require('multer');

const cloudStorageCtrl = require('./cloudstorage');

//var serviceAccount = require('../firebasesdk.json');
// Firebase.initializeApp({
//     credential: Firebase.credential.cert(serviceAccount),
//     storageBucket: "gs://fir-76656.appspot.com"
//   });

  var bucket = Firebase.storage().bucket();

  route.use(function(req, res, next) {
    if (!req.Firebase) {
      req.Firebase = Firebase;
    }
    if (!req.bucket) {
      req.bucket = bucket;
    }
    next();
  });


  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024 // no larger than 10mb, you can change as needed.
    }
  });
  // URL /upload
  route.post("/upload", multer.single("file"), cloudStorageCtrl.upload);

  route.post('/getstatus',(req,res)=>{
      policeOperation.getstatus(req.body,res);
  });

  route.post('/personfound',(req,res)=>{
    policeOperation.personfound(req.body,res);
  });

  route.post('/caseid',(req,res)=>{
    policeOperation.caseid(req.body,res);
  })

  module.exports = route;