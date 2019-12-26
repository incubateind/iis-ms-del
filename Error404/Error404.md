# City Surveillance

## Used case Description
With a burgeoning population and a challenging crime rate, Indian Law enforcement agencies want to leverage technology to help solve some typical issues like identify criminals on the run, find missing children and victims of human trafficking or keep an eye on person of interest. As long as missing individuals are added to a database, law enforcement can become alerted as soon as they are recognized by face recognition—be it an airport, retail store or other public space The objective is to build a predictive model used to recognize the appearance of a certain person.

## Context
The objective of this arrangement is to assess face detection and recognition procedures and give a total arrangement for picture based face detection and recognition with higher exactness, better reaction rate and an underlying advance for video reconnaissance which help experts during searching and investigation. It has applications extending from security and reconnaissance to stimulation sites, ultimately increasing law enforcement in the country.

## content of projects
+ Face Recognition System: 

The Face Recognition system is based on Azure's Cognitive Services. Which uses it's Face API to  process the images provided by the CCTV cameras from all over the city. The Face API provide various methods for face recognition and face validation. The whole Porcess is carried out in threee steps. fist of all we will discover all faces in the live feed of the cameras,and then compare them to the wanted or missing people's face. if we found the match we will update the databse with the last seen location and the nearest police station. Parellaly we are using multithreading to check the firebase regularly for the real time updates. In short, we are levragin power of cloud but not exploiting it.


+ Police Web Portal

The Web is majorly divided into two sections:
1. Admin
2. PoliceStation

i) Admin(SHO) can only register all the policestation on the portal.
ii)Now Registred portal policestation can lodge missing or crimal cases to the portal with image and necessary details of person.
iii)With given details Map My India API is used to find the latitude and longitude of the missing place.
iv)As soon as case is lodged it goes to machine learning program to search the missing person through installed cameras in the city.
v) If there is an update of a case it sends mail to the Respective police station with CaseID.
vi)Map My India API fetches the nearest police station according to the given coordinates using Search Nearby API.
vii)And portal shows the nearest police station to the missing one.


+ Public use Chatbot
chatbot is used to provide the details about the case to the concerned person

## way to host the project

create confg.py with the following contents apiKey, authDomain, databaseURL, storageBucket from firebase and KEY of Face API from Azure Cognitive Services along with its ENDPOINTS. You can find more details in Jupyter notebook. We also require some potential confidential credentials from firebase.

### Hosting of web App

Backend is hosted on Azure Platform(Nodejs,Express).

BASEURL(for backend): https://teamerror.azurewebsites.net/

1. To run server on localhost,
In the server folder:
```bash
npm install
npm start
```

2. To run client on localhost,
In the client folder:
```bash
npm install
npm start
```
