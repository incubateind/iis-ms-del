from random import *
from datetime import *
import json

USER_COUNT = 5
MIN_TRIPS = 4
MAX_TRIPS = 5
READINGS_COUNT = 100

names = ['Alfonzo', 'Sajan', 'Juliet', 'Kate', 'Emma']

data = []

good_class = 'c0'
prediction_classes = [f'c{i}' for i in range(1, 10)]

seed(69)

trip_id_idx = 1

# user loop
for i in range(1, USER_COUNT + 1):
    date = datetime(2019, 12, 1, 6, 0)
    trips_json = []

    # trip loop
    for j in range(0, randint(MIN_TRIPS, MAX_TRIPS)):
        readings_json = []

        # reading loop
        for k in range(READINGS_COUNT):

            if randint(0, 100) < 60:
                classes = [good_class]
            else:
                classes = sample(prediction_classes, randint(1, 4))

            reading_json = {
                'timestamp': str(date),
                'predictionClasses': classes
            }
            date = date + timedelta(seconds=15)
            readings_json.append(reading_json)

        date = date + timedelta(seconds=randint(60*60*2, 60*60*5))

        trip_json = {
            'tripId': trip_id_idx,
            'readings': readings_json,
        }
        trip_id_idx += 1
        trips_json.append(trip_json)

    user_json = {
        'userId': i,
        'username': names[i % 5],
        'trips': trips_json,
    }
    data.append(user_json)

json.dump(data, open("data.json", 'w'))
