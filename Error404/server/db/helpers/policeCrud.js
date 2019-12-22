const Firebase=require('firebase-admin');

// var serviceAccount = require('../../firebasesdk.json');
// Firebase.initializeApp({
//     credential: Firebase.credential.cert(serviceAccount),
//     databaseURL: "https://fir-76656.firebaseio.com"
//   });

var db = Firebase.database();
//var usersRef = db.ref("users");
var policeRef=db.ref("policestation");

const policeOperation={
case(object,res){
    if(object.stationcode && object.id){
    stationRef=policeRef.child(object.stationcode);
  //  object.id=object.stationcode+shortid();
    detailRef=stationRef.child(object.id);
    detailRef.update(object,(err,doc)=>{
        if(err){
         res.json({"msg":"Error while adding case","error":err});
        }
        else{
         res.json({"status":"200","msg":"added case sucessfully","data":doc});
        }
    })
    }else{res.status(402).json({"msg":"please enter correct details"})}
},
getstatus(object,res){
if(object.stationcode){
    stationRef = policeRef.child(object.stationcode);
    stationRef.once('value',function(snap){
        if(snap.val()){
        var result = Object.keys(snap.val()).map(function(key) {
            return snap.val()[key];
        });
        if(result){
            res.json({"data": result});
        }
        else{
            res.json({"status":"400", "data": []})
        }
    }else{res.status(200).json({"data":[]})}
    })
}else{res.status(402).json({"msg":"please send correct station code"});}
},

personfound(object,res){
    if(object.stationcode && object.id){
    console.log("peson found body is",object);
    stationRef=policeRef.child(object.stationcode);
    infoRef=stationRef.child(object.id);
  var result=  infoRef.update({"status":1});
  result.then(function(data){
      console.log(data);
  })
  console.log("result in personfound ",result);
    res.json({"status":"200","msg":"congrats! you found the person","result":result});
}else{res.status(402).json({"msg":"please send correct station code and id"});}
},

caseid(object,res){
    if(object.stationcode && object.id){
    stationRef=policeRef.child(object.stationcode);
    infoRef=stationRef.child(object.id);
    infoRef.once('value',function(snap){
        if(snap.val()){
            res.status(200).json({"data":snap.val()});
        }
        else{
            res.status(301).json({"msg":"case id invalid"})
        }
    })
  }else{res.status(402).json({"msg":"invalid station code and id"});}
 }
};


module.exports=policeOperation;