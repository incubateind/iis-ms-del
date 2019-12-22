const Firebase=require('firebase-admin');
const jwt = require('../../utils/jwt');

// var serviceAccount = require('../../firebasesdk.json');
// Firebase.initializeApp({
//     credential: Firebase.credential.cert(serviceAccount),
//     databaseURL: "https://fir-76656.firebaseio.com",
//     storageBucket: "gs://fir-76656.appspot.com"
//   });

var db = Firebase.database();
var usersRef = db.ref("users");
//var policeRef=db.ref("policestation");

const userOperation={
    login(object,res){
        if(object.stationcode && object.password){
        console.log("body in login", object);
detailRef=usersRef.child(object.stationcode);
        detailRef.once('value',function(snap){
            if(snap.val()){
                if(snap.val().password==object.password){
                    var token = jwt.generateToken(object.stationcode);
            detailRef.update({"token":token});
             res.json({"status":"200","msg":"sucessfully signed in","token":token});
             }
             else{
                res.status(402).json({"msg":"incorrect username and password"});
            }
               // console.log(snap.val().password);
            }
            
        })
    }
    else{
        res.status(402).json({"msg":"please send valid sationcode and password"});
    }
    },
// detailRef.orderByChild("password").equalTo(object.password).on("value", function(snapshot) {
//   // console.log(snapshot.key);
//   console.log("snapshot is ",snapshot.val());
//    if(snapshot.val()){
//     var token = jwt.generateToken(object.stationcode);
//     detailRef.update({"token":token});
//     res.json({"status":"200","msg":"sucessfully signed in","token":token});
//    }
//    else{
//        res.json({"msg":"incorrect username and password"});
//    }
//   });
    
    logout(object,res){
        detailRef=usersRef.child(object.stationcode);
        detailRef.update({"token":""});
        res.json({"msg":"sucessfully loged out"});
    }
}

module.exports=userOperation;