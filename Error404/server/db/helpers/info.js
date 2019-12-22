const Firebase=require('firebase-admin');
const mail=require('../../utils/mail');


var serviceAccount = require('../../firebasesdk.json');
Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    databaseURL: "https://fir-76656.firebaseio.com",
    storageBucket: "gs://fir-76656.appspot.com"
  });


var db = Firebase.database();
var usersRef = db.ref("users");
var policeRef=db.ref("policestation");




  // sendmail=(req,res, next)=>{
  //   policeRef.on("child_changed", function(snapshot,key) {
  //     idref=policeRef.child(snapshot.key);
  //   idref.once("child_changed",function(snap){
  //     var changedcase=snap.val();
  //     console.log("The updated post title is " ,changedcase); 
  //     mail(changedcase.id,"gargsolo.hg@gmail.com");
     
  //   })
  // })
  // next();
  // };
const changed={
  sendmail(){
    console.log("sendmail is called ");
    policeRef.on("child_changed", function(snapshot,key) {
      idref=policeRef.child(snapshot.key);
    idref.once("child_changed",function(snap){
      var changedcase=snap.val();
      console.log("The updated post title is " ,changedcase); 
   mailRef=   usersRef.child(changedcase.stationcode);
   mailRef.once('value',function(snap){
     if(snap.val()){
       var mailid=snap.val().email;
       console.log(mailid);
       mail(changedcase.id,mailid);
     }else{console.log("error occured");}
   })
     // mail(changedcase.id,mailid);
    })
  });
  }
}


//working properly belowed code

  // policeRef.on("child_changed", function(snapshot,key) {
  //       idref=policeRef.child(snapshot.key);
  //     idref.once("child_changed",function(snap){
  //       var changedcase=snap.val();
  //       console.log("The updated post title is " ,changedcase); 
  //       mail(changedcase.id,"gargsolo.hg@gmail.com");
  //     })
  //   })

  module.exports=changed;