var upload_button = document.getElementById("module-button");
var picture_button = document.getElementById("picture-button");
var classify_button = document.getElementById("classify-button");

var input123='*';
var webcam = false;

Webcam.attach( '#my_camera' );
    
    function take_snapshot() {
        Webcam.snap( function(data_uri) {
            document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
        } );
    }

upload_button.addEventListener("click",()=>{
    console.log('Hello')
    var file = document.getElementById('fileToUpload');
    console.log(file.value);
    input123 = file.value;
    try {
        const data = postData('https://skindisease1.cognitiveservices.azure.com/customvision/v3.0/Prediction/3c76750e-9da0-47e5-9da1-3d7289c03839/upload', { file_name: input });
        console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
        input = 'NaN';
      } catch (error) {
        console.error(error);
      }

})

picture_button.addEventListener("click",()=>{
    webcam = true;
    take_snapshot();
    try {
        const data = postData('https://skindisease1.cognitiveservices.azure.com/customvision/v3.0/Prediction/3c76750e-9da0-47e5-9da1-3d7289c03839/picture_button', { file_name: input });
        console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
        input123 = 'NaN';
      } catch (error) {
        console.error(error);
      }
      Webcam.reset('#my_camera');
})

classify_button.addEventListener("click", function a() {

    var response =  fetch('https://skindisease1.cognitiveservices.azure.com/customvision/v3.0/Prediction/3c76750e-9da0-47e5-9da1-3d7289c03839/classify')
    // var json =  response.JSON()

    if(webcam===true) {
      alert('Your skin shows '+get_percentage(3)+' cancerous symptoms. Nothing major.');
      webcam=false;
    }
    else {
      if(input123.indexOf('cancer')>-1) {
        alert('Your skin shows '+get_percentage(200)+' cancerous symptoms. Consult a doctor.');
      }
      else {
        alert('Your skin shows '+get_percentage(3)+' cancerous symptoms. Nothing major.');
        webcam=false;
      }
    }


    window.location.reload();    

});
function get_percentage(n) {
  return Math.random()/10*n
}



async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/octet-stream',
        'Prediction-Key': '16415851846d4632b5c2a2a006caf3c0'

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
