import React, { Component } from 'react';
import {Container, Card, CardBody, CardText, CardImg} from 'reactstrap';
import axios from '../constants/axios'

class Login extends Component {

  state ={
    code: '',
    password: '',
    token: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  } 
  handleLoginSubmit = (e) =>{
    e.preventDefault();
    axios.post('login',{
      stationcode: this.state.code,
      password: this.state.password
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('code',this.state.code)
        window.location.pathname = "/"
      }
      else {
        throw new Error()
      }
      
    })
    .catch((err) => {
      console.log(err.response)
      alert('Something Went Wrong, Try Login Again')
    })
  }

  render() {
    return (
      
      <div style={{display: 'flex', justifyContent: 'center'}} className="loginBackGround">
        
      <Container style={{width: "500px", alignSelf: 'center' }} className="mt-4"   >
        <Card className="shadow">
          <CardImg top src={require('../constants/images/satya.jpg')}/>
          <CardBody className="p-5">
            <h3 style={{textAlign: 'center'}}><CardText className="mb-4 bold">Police Surveillance Portal</CardText></h3>
            <form>
              <div className="form-group">
                <label htmlFor="code"><b >Police Station Code</b></label>
                <input type="text" className="form-control" name="code" id="code" maaria-describedby="code" placeholder="Enter Police Station Code" onChange={(e) => this.handleInputChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={(e) => this.handleInputChange(e)}/>
              </div>
              <div style={{textAlign: 'center'}}>
              <button type="submit" className="btn btn-success" onClick={(e) => this.handleLoginSubmit(e)}>Submit</button>
              </div>
            </form>
          </CardBody>
         </Card>
         
          
       
      </Container>
      </div>
  
    );
  }
}
export default Login;
