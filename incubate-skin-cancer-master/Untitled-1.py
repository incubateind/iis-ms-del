from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from azure.cognitiveservices.vision.customvision.training import CustomVisionTrainingClient
from azure.cognitiveservices.vision.customvision.training.models import ImageFileCreateEntry

from flask import *
import os
from werkzeug import secure_filename
app = Flask(__name__)

@app.route('/', methods =['GET', 'POST'])
def index():
    if request.method == "POST":
        if request.form["submit"] =='add':
            f = request.files['file']
            print(f.filename)
            f.save(secure_filename(f.filename))

            ENDPOINT = "https://eastus2.api.cognitive.microsoft.com/"

            training_key = "2d973f1217ca449b804c689d9d02b635"
            prediction_key = "2d973f1217ca449b804c689d9d02b635"
            prediction_resource_id = "/subscriptions/710cff9e-6696-4d9f-944d-eac6dcff9965/resourceGroups/RAHULGARG/providers/Microsoft.CognitiveServices/accounts/RAHULGARG"

            publish_iteration_name = "classifyModel"

            trainer = CustomVisionTrainingClient(training_key, endpoint=ENDPOINT)

            # Create a new project
            print ("Creating project...")
            #project = trainer.create_project("incubate")
            # Replace with a valid key
            prediction_key = "2d973f1217ca449b804c689d9d02b635"

            predictor = CustomVisionPredictionClient(prediction_key, endpoint=ENDPOINT)
            base_image_url = f.filename
            #print(project.id)
            with open(base_image_url, "rb") as image_contents:
                results = predictor.classify_image(
                    "285fbf98-b8ac-4dcf-8f7a-d67358836965", "Iteration2", image_contents.read())

                # Display the results.
                ls=[]
                for prediction in results.predictions:
                    ls.append({prediction.tag_name :
                        ": {0:.2f}%".format(prediction.probability * 100)})
            return render_template('pred.html',t=ls)

    return render_template('index.html')


def doctorcall():
    if request.method == "POST":
        if request.form["submit"] =='add':
            name = request.form['name']
            db.child("doctor").push(name)
            todo = db.child("doctor").get()
            # return todo.val()
            to = todo.val()
            return render_template('doctor.html', t= to.values())

    return render_template('doctor.html')



    


if __name__ == '__main__':
    app.run(debug=True)   