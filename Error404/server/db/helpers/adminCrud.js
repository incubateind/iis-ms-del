const Firebase=require('firebase-admin');
const chalk=require('chalk');
const mail=require('../../utils/mail2');

// var serviceAccount = require('../../firebasesdk.json');
// Firebase.initializeApp({
//     credential: Firebase.credential.cert(serviceAccount),
//     databaseURL: "https://fir-76656.firebaseio.com",
//     storageBucket: "gs://fir-76656.appspot.com"
//   });

var db = Firebase.database();
var usersRef = db.ref("users");
var policeRef=db.ref("policestation");

const adminOperation={
addadmin(object,res){
    userRef=usersRef.child(object.stationcode);
    userRef.update(object,(err,doc)=>{
        if(err){
            res.json({"msg":"Error while adding admin station","error":err});
        }
        else{
            res.json({"status":"200","msg":"added admin station","data":doc});
        }
    })
},
addstation(object,res){
    if(object.stationcode){
    userRef=usersRef.child(object.stationcode);
    userRef.update(object,(err,doc)=>{
        if(err){
            res.json({"msg":"Error while adding admin station","error":err});
        }
        else{
            mail(object.email,object.stationcode,object.password);
            res.json({"status":"200","msg":"added admin station","data":doc});
        }
    })
 }else{res.status(402).json({"msg":"empty station code"});}
},

getstation(res){
    usersRef.once('value',function(snap){
    if(snap.val()){
        console.log(chalk.green("the key is ",snap.key));
        console.log(chalk.red("value is "+snap.val()));
        var rese=snap.val();
        let allstation=[];
        for(let key in rese){
         //   console.log(chalk.green("station may be ",key));
            allstation.push(key);
          //  console.log(chalk.cyan("station may be ",allstation));
        }
        res.json({"data":allstation});
    }
    else{
        res.json({"msg":"something went wrong"});
    }
})
},
// addcase(object,res){
//    stationRef=policeRef.child(object.stationcode);
//    object.id=object.stationcode+shortid();
//    detailRef=stationRef.child(object.id);
//    detailRef.update(object,(err,doc)=>{
//        if(err){
//         res.json({"msg":"Error while adding case","error":err});
//        }
//        else{
//         res.json({"status":"200","msg":"added case sucessfully","data":doc});
//        }
//    }) 
   
// },
getrecords(res){
policeRef.once('value',function(snap){
    if(snap.val()){
        var result = Object.keys(snap.val()).map(function(key) {
            return snap.val()[key];
        });
        if(result){
            res.json({"data": result});
        }
        else{
            res.json({"status":"400", "data": "Empty"})
        }
    }
    else{
        res.status(402).json({"msg":"error occured during fetching all reccords"});
        console.log("some error find in geting all record ");
    }
   // res.json({"status":"200","data":snap.val()});
})
},

}

module.exports=adminOperation;