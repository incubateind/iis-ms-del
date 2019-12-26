from flask import Flask, render_template, request, jsonify
import requests
import sys

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/square/', methods=['GET','POST'])
def square():
    source = request.form.get('source')
    destination = request.form.get('destination')

    #oauth tokens api
    # oauth = "https://outpost.mapmyindia.com/api/security/oauth/token"
    # parameters = {"grant_type": "client_credentials",
    #                 "client_id": "O3wMiHiw95v3LsJ-IiCHxZ2HM2c8F5H8xfdzLnrPdbEkNGsIbvSqKhFUmMHjOz3u1eeu1aIREb42bpDzRij_bA==",
    #                 "client_secret": "QJcH6ymTGazxFG8ml9UT-UFotuIYSvB-rWynBvJFd1HJULek4Si3KfyimmwjmlKcQVMHwVW8e-rO7J9VaufHgY6XBMp0LC1O"}

    parameters = {"grant_type": "client_credentials",
                  "client_id": "uGlZhB6jaQrOIDDpMHcVhtkKs2dwLw6fpxd13ixBaSSSUg3EiW_je679AipUqKc2C4znacDnV7s9Gtc9YrrOZQ==",
                  "client_secret": "9K_q_9Q2GHOu0mO9quT6-F5hcdWkz01xynIjefCM2iBgTgkWb0Ores6ov9ov0E502XLF8UUDyy9bakh2N0bzSaBNYjC-nFAF"}

    resp = requests.post("https://outpost.mapmyindia.com/api/security/oauth/token", params=parameters)
    tokens = resp.json()
    access_token = tokens['access_token']
    token_type = tokens['token_type']
    print(access_token)
    print(token_type)

    #geocoding api
    address_source = "https://atlas.mapmyindia.com/api/places/geocode?address={}".format(source)
    headers = '{}'.format(token_type+" "+access_token)
    location_source = requests.get(address_source, headers={'Authorization':headers})
    json_source = location_source.json()
    source_longitude = json_source['copResults']['longitude']
    source_latitude = json_source['copResults']['latitude']
    print(json_source)

    address_destination = "https://atlas.mapmyindia.com/api/places/geocode?address={}".format(destination)
    headers = '{}'.format(token_type + " " + access_token)
    location_destination = requests.get(address_destination, headers={'Authorization': headers})
    json_destination = location_destination.json()
    destination_longitude = json_destination['copResults']['longitude']
    destination_latitude = json_destination['copResults']['latitude']
    print(json_destination)

    #distance matrix api
    str = "https://apis.mapmyindia.com/advancedmaps/v1/9kibr32m4r29uw8sgsjan8rdu89v9yit/distance_matrix/driving/{},{};{},{}?rtype=0&region=ind".format(source_longitude, source_latitude, destination_longitude, destination_latitude)
    predict = requests.get(str)
    print(predict)
    data = predict.json()
    print(data)
    distance = data['results']['distances'][0][1]
    duration = data['results']['durations'][0][1]

    #routing api
    str = "https://apis.mapmyindia.com/advancedmaps/v1/9kibr32m4r29uw8sgsjan8rdu89v9yit/route_adv/driving/{},{};{},{}?steps=false&rtype=1".format(source_longitude, source_latitude, destination_longitude, destination_latitude)

    resp = requests.get(str)
    # print(resp)
    route = resp.json()
    geometry = ''
    min = sys.maxsize
    time = 0
    print(route)
    for element in route['routes']:
        if element['distance']-1000 <= distance and element['distance']+1000 >= distance:
            if element['distance'] < min:
                min = element['distance']
                time = element['duration']
                geometry = element['geometry']
                print(min)

    arr = {'geometry': geometry, 'time': time}
    arr = jsonify(arr)
    return arr

if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True, port=8000, host='0.0.0.0')