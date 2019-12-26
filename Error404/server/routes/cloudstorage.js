const policeOperation=require('../db/helpers/policeCrud');
const shortid=require('shortid');

exports.upload = (req, res) => {
  console.log("Req body is file",req.body);
  console.log("req file",req.file);
  let file = req.file;
  let extname=file.originalname.split('.')[1];
  req.body.status=0;
  req.body.id=req.body.stationcode+shortid();
  req.body.img=req.body.id+"."+extname;
  var d = new Date();
  var time=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" at "+d.getHours()+":"+d.getMinutes();
  req.body.seen=["case created at "+time];
  console.log("Req body id.......... file",req.body.id);
  data = JSON.parse(JSON.stringify(req.body));
  policeOperation.case(data,res);
//let file = req.file;
    if(!file) {
      res.status(500);
      res.json('file not found');
      return;
    }
//    let extname=file.originalname.split('.')[1];
    let fileUpload = req.bucket.file(req.body.id+"."+extname);
    /*
   req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(   //<-- if we have to upload local file, pass path of that file
  */
  // Get File from request Form data.
  fileUpload.save(new Buffer(file.buffer)).then(  
      result => {
        console.log("file uploaded sucessfully");
      //  res.status(200);
      //  res.json('file uploaded successfully');
      },
      error => {
        res.status(500);
        console.log(error);
        res.json({error: error});
      }
    );
  };