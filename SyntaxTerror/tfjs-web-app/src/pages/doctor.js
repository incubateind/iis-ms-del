import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './About.css';

import {
    Alert, Button, Collapse, Container, Form, Spinner, ListGroup, Tabs, Tab
  } from 'react-bootstrap';
/**
 * Class to handle the rendering of the Home page.
 * @extends React.Component
 */

 

var buttonStyle = {
  margin: '100px 50px 30px 50px'
};

  
function fetchAPI()
      {
          //let auth_token = Cookies.get("21605da4-18ab-43e8-853a-c543f24eb196");
          //let header_obj = {'Authorization' : auth_token};
    fetch("https://atlas.mapmyindia.com/api/places/nearby/json?access_token=21605da4-18ab-43e8-853a-c543f24eb196&keywords=coffee;beer&refLocation=28.631460,77.217423",
                ).then(res=>res.json()).then((data)=>{
                   // this.state.result = data;
                    console.log(data);
                })

                
      } 

function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    
                }
                else
                {
                    console.log("sal");
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
           // console.log("data");
            return data;
        });
    }
export default class Home extends Component {
 
    
    state = { result:null,
    result1:null,
result2:null,
result3:null,result4:null,
result5:null };
    //state = {res:'abc'};
    toggleButtonState = () => {
        //this.res='bcd';
        fetch("https://atlas.mapmyindia.com/api/places/nearby/json?access_token=21605da4-18ab-43e8-853a-c543f24eb196&keywords=Hospitals;Skin&refLocation=28.4921054,77.0909955",
        ).then(res=>res.json()).then((data)=>{
            
       // this.setState({ result: data.suggestedLocations});
        this.setState({ result1: data.suggestedLocations[1].placeName});
        this.setState({ result2: data.suggestedLocations[2].placeName});
        this.setState({ result3: data.suggestedLocations[3].placeName});
        this.setState({ result4: data.suggestedLocations[4].placeName});
        this.setState({ result5: data.suggestedLocations[5].placeName});
            //this.state.result = data.suggestedLocations[0].distance;
            //console.log(data.suggestedLocations[0].distance);
            //console.log(this.state.result);
           // ReactDOM.render(this.state.result);
          // this.render();
        })
        // fetchAPI()//.then;
        //let selectedWord = window.getSelection().toString();
        //window.open("https://apis.mapmyindia.com/advancedmaps/v1/fu5rxmcxj37wvqhzxz9s9dq6856bdmmr/map_load?v=1.3");
        //return data;
      };

      

  render() {
    return (
      <div>
      <button
        style={buttonStyle}
        onClick={this.toggleButtonState}> Near By Hospitals</button>
        
        <div>{this.state.result}</div>
        <div>{this.state.result1}</div>
        <div>{this.state.result2}</div>
        <div>{this.state.result3}</div>
        <div>{this.state.result4}</div>
       {/* //<p>{this.toggleButtonState}</p> */}
      </div>
    );
  }
}

